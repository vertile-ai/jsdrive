import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import type {
  CommandParams,
  CommandResult,
  EventPayload,
  ProtocolCommand,
  ProtocolEvent,
} from "@nodriver/protocol";
import {
  CdpAbortError,
  CdpConnectionClosedError,
  CdpConnectionLostError,
  CdpProtocolError,
  CdpTimeoutError,
  RUNTIME_BACKEND_INTERNAL_SEND,
  type ConnectOptions as RuntimeConnectOptions,
  type DomainPolicy,
  type DomainEnableSource,
  type EventMetadata,
  type HandlerError,
  type RuntimeBackend,
  type SendOptions,
  type TraceEntry,
} from "@nodriver/runtime-js";

type CommandSource = DomainEnableSource | "internal";

interface NativeBinding {
  connect(endpoint: string, timeoutMs?: number, cancellationId?: number): Promise<number>;
  send(
    handle: number,
    method: string,
    paramsJson?: string,
    sessionId?: string,
    timeoutMs?: number,
    cancellationId?: number,
  ): Promise<string>;
  pollEvents(handle: number, maxEvents?: number): Promise<readonly string[]>;
  connectionClosed(handle: number): Promise<boolean>;
  activeConnectionCount(): Promise<number>;
  close(handle: number): Promise<void>;
  createCancellation(): number;
  cancel(cancellationId: number): void;
  disposeCancellation(cancellationId: number): void;
}

interface NativeErrorPayload {
  readonly kind: "aborted" | "closed" | "lost" | "protocol" | "timeout";
  readonly code?: number;
  readonly message?: string;
  readonly data?: unknown;
  readonly timeoutMs?: number;
}

interface WireEvent {
  readonly method: string;
  readonly params: unknown;
  readonly sessionId?: string;
}

type EventHandler = (params: unknown, metadata: EventMetadata) => void | Promise<void>;
type ErrorHandler = (event: HandlerError) => void;

const require = createRequire(import.meta.url);
const addonName = `nodriver.${process.platform}-${process.arch}.node`;
const addonPath = existsSync(new URL(`../native/${addonName}`, import.meta.url))
  ? `../native/${addonName}`
  : `../../native/${addonName}`;
const binding = require(addonPath) as NativeBinding;

export type NativeConnectOptions = RuntimeConnectOptions;

export class NativeConnection implements RuntimeBackend {
  readonly #handle: number;
  readonly #handlers = new Map<string, Set<EventHandler>>();
  readonly #errorHandlers = new Set<ErrorHandler>();
  readonly #domainEnableInFlight = new Map<string, Set<Promise<Readonly<Record<string, unknown>>>>>();
  readonly #enabledDomainKeys = new Set<string>();
  readonly #autoEnabledDomainKeys = new Set<string>();
  readonly #manuallyEnabledDomainKeys = new Set<string>();
  readonly #autoEnablingDomainKeys = new Map<string, number>();
  readonly #domainReferences = new Map<string, number>();
  readonly #domainEnables = new Map<string, Promise<void>>();
  readonly #domainDisables = new Map<string, Promise<void>>();
  readonly #trace: TraceEntry[] = [];
  #nextTraceId = 1;
  #closed = false;
  #disposed = false;
  #disposePromise: Promise<void> | undefined;

  private constructor(
    handle: number,
    public readonly domainPolicy: DomainPolicy,
  ) {
    this.#handle = handle;
    void this.#pumpEvents();
  }

  public static async connect(endpoint: string, options: NativeConnectOptions = {}): Promise<NativeConnection> {
    const operation = `WebSocket open: ${endpoint}`;
    const signal = options.signal;
    if (signal?.aborted === true) {
      throw new CdpAbortError(operation, { cause: signal.reason });
    }
    const cancellationId = signal === undefined ? undefined : binding.createCancellation();
    let wasAborted = false;
    const abort = (): void => {
      wasAborted = true;
      if (cancellationId !== undefined) binding.cancel(cancellationId);
    };
    signal?.addEventListener("abort", abort, { once: true });
    try {
      const handle = await binding.connect(endpoint, options.timeoutMs, cancellationId);
      if (wasAborted) {
        await binding.close(handle);
        throw new CdpAbortError(operation, { cause: signal?.reason });
      }
      return new NativeConnection(handle, options.domainPolicy ?? "manual");
    } catch (error) {
      if (wasAborted) throw new CdpAbortError(operation, { cause: signal?.reason });
      throw typedError(error, operation);
    } finally {
      signal?.removeEventListener("abort", abort);
      if (cancellationId !== undefined) binding.disposeCancellation(cancellationId);
    }
  }

  public get enabledDomains(): ReadonlySet<string> {
    return new Set([...this.#enabledDomainKeys].map((key) => key.slice(key.indexOf(":") + 1)));
  }

  public get manuallyEnabledDomains(): ReadonlySet<string> {
    return new Set([...this.#manuallyEnabledDomainKeys].map((key) => key.slice(key.indexOf(":") + 1)));
  }

  public enabledDomainsFor(sessionId?: string): ReadonlySet<string> {
    return this.#domainsFor(this.#enabledDomainKeys, sessionId);
  }

  public manuallyEnabledDomainsFor(sessionId?: string): ReadonlySet<string> {
    return this.#domainsFor(this.#manuallyEnabledDomainKeys, sessionId);
  }

  public get closed(): boolean {
    return this.#closed;
  }

  public get trace(): readonly TraceEntry[] {
    return this.#trace;
  }

  public send<M extends ProtocolCommand>(
    method: M,
    ...args: CommandParams<M> extends undefined
      ? [params?: undefined, options?: SendOptions]
      : [params: CommandParams<M>, options?: SendOptions]
  ): Promise<CommandResult<M>> {
    return this.sendRaw(method, args[0], args[1]) as Promise<CommandResult<M>>;
  }

  public async sendRaw(
    method: string,
    params?: unknown,
    options: SendOptions = {},
  ): Promise<Readonly<Record<string, unknown>>> {
    return this.#sendRawWithSource(method, params, options, "manual");
  }

  public [RUNTIME_BACKEND_INTERNAL_SEND](
    method: string,
    params?: unknown,
    options: SendOptions = {},
  ): Promise<Readonly<Record<string, unknown>>> {
    return this.#sendRaw(method, params, options, "internal");
  }

  #sendRawWithSource(
    method: string,
    params: unknown,
    options: SendOptions,
    source: DomainEnableSource,
  ): Promise<Readonly<Record<string, unknown>>> {
    const operation = this.#sendRaw(method, params, options, source);
    const match = /^(.*)\.enable$/.exec(method);
    if (match !== null && match[1] !== undefined) {
      const key = domainKey(match[1], options.sessionId);
      const operations = this.#domainEnableInFlight.get(key) ?? new Set<Promise<Readonly<Record<string, unknown>>>>();
      operations.add(operation);
      this.#domainEnableInFlight.set(key, operations);
      void operation.then(
        () => this.#removeDomainEnableInFlight(key, operation),
        () => this.#removeDomainEnableInFlight(key, operation),
      );
    }
    return operation;
  }

  async #sendRaw(
    method: string,
    params: unknown,
    options: SendOptions,
    source: CommandSource,
  ): Promise<Readonly<Record<string, unknown>>> {
    if (this.#closed) throw new CdpConnectionClosedError();
    const signal = options.signal;
    if (signal?.aborted === true) {
      throw new CdpAbortError(method, { cause: signal.reason });
    }
    const paramsJson = params === undefined ? undefined : JSON.stringify(params);
    const traceId = this.#nextTraceId++;
    this.#trace.push({
      direction: "send",
      timestamp: Date.now(),
      message: {
        id: traceId,
        method,
        ...(params === undefined ? {} : { params }),
        ...(options.sessionId === undefined ? {} : { sessionId: options.sessionId }),
      },
    });
    const cancellationId = signal === undefined ? undefined : binding.createCancellation();
    let wasAborted = false;
    const abort = (): void => {
      wasAborted = true;
      if (cancellationId !== undefined) binding.cancel(cancellationId);
    };
    signal?.addEventListener("abort", abort, { once: true });
    try {
      const resultJson = await binding.send(
        this.#handle,
        method,
        paramsJson,
        options.sessionId,
        options.timeoutMs,
        cancellationId,
      );
      const result = JSON.parse(resultJson) as Readonly<Record<string, unknown>>;
      this.#recordDomainCommand(method, options, source);
      this.#trace.push({
        direction: "receive",
        timestamp: Date.now(),
        message: { id: traceId, result, ...(options.sessionId === undefined ? {} : { sessionId: options.sessionId }) },
      });
      return result;
    } catch (error) {
      if (wasAborted) {
        throw new CdpAbortError(method, { cause: signal?.reason });
      }
      throw typedError(error, `CDP command ${method}`);
    } finally {
      signal?.removeEventListener("abort", abort);
      if (cancellationId !== undefined) binding.disposeCancellation(cancellationId);
    }
  }

  public on<E extends ProtocolEvent>(
    method: E,
    handler: (params: EventPayload<E>, metadata: EventMetadata) => void | Promise<void>,
  ): () => void;
  public on(method: string, handler: EventHandler): () => void;
  public on(method: string, handler: EventHandler): () => void {
    const handlers = this.#handlers.get(method) ?? new Set<EventHandler>();
    handlers.add(handler);
    this.#handlers.set(method, handlers);
    return () => handlers.delete(handler);
  }

  public removeHandlers(method?: string): void {
    if (method === undefined) this.#handlers.clear();
    else this.#handlers.delete(method);
  }

  public wait(milliseconds: number, signal?: AbortSignal): Promise<void> {
    if (signal?.aborted === true) return Promise.reject(signal.reason);
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, milliseconds);
      signal?.addEventListener("abort", () => { clearTimeout(timeout); reject(signal.reason); }, { once: true });
    });
  }
  public sleep(milliseconds: number, signal?: AbortSignal): Promise<void> { return this.wait(milliseconds, signal); }

  public onHandlerError(handler: ErrorHandler): () => void {
    this.#errorHandlers.add(handler);
    return () => this.#errorHandlers.delete(handler);
  }

  public async enableDomain(domain: string, options: SendOptions = {}, source: DomainEnableSource = "manual"): Promise<void> {
    const key = domainKey(domain, options.sessionId);
    if (source === "auto" && (this.#enabledDomainKeys.has(key) || this.#manuallyEnabledDomainKeys.has(key))) return;
    if (source === "manual" && this.#manuallyEnabledDomainKeys.has(key)) return;
    if (source === "auto") this.#incrementAutoEnabling(key);
    try {
      await this.#sendRawWithSource(`${domain}.enable`, {}, options, source);
    } finally {
      if (source === "auto") this.#decrementAutoEnabling(key);
    }
  }

  public async disableDomain(domain: string, options: SendOptions = {}): Promise<void> {
    const key = domainKey(domain, options.sessionId);
    const inFlight = [...(this.#domainEnableInFlight.get(key) ?? [])];
    if (inFlight.length > 0) await Promise.allSettled(inFlight);
    if (!this.#enabledDomainKeys.has(key) && !this.#manuallyEnabledDomainKeys.has(key)) return;
    await this.sendRaw(`${domain}.disable`, {}, options);
    this.#enabledDomainKeys.delete(key);
    this.#manuallyEnabledDomainKeys.delete(key);
    this.#domainReferences.delete(key);
  }

  public async acquireDomain(domain: string, options: SendOptions = {}): Promise<() => Promise<void>> {
    if (this.domainPolicy === "manual") return async () => {};
    const key = domainKey(domain, options.sessionId);
    if (this.#manuallyEnabledDomainKeys.has(key)) return async () => {};
    await this.#domainDisables.get(key);
    const references = this.#domainReferences.get(key) ?? 0;
    this.#domainReferences.set(key, references + 1);
    let enabling = this.#domainEnables.get(key);
    if (enabling === undefined && !this.#enabledDomainKeys.has(key)) {
      enabling = this.enableDomain(domain, options, "auto");
      this.#domainEnables.set(key, enabling);
      void enabling.finally(() => {
        if (this.#domainEnables.get(key) === enabling) this.#domainEnables.delete(key);
      }).catch(() => {});
    }
    try {
      await enabling;
    } catch (error) {
      const remaining = (this.#domainReferences.get(key) ?? 1) - 1;
      if (remaining === 0) this.#domainReferences.delete(key);
      else this.#domainReferences.set(key, remaining);
      throw error;
    }
    let released = false;
    return async () => {
      if (released || this.domainPolicy === "zendriver-compatible") return;
      released = true;
      const remaining = (this.#domainReferences.get(key) ?? 1) - 1;
      if (remaining === 0) {
        this.#domainReferences.delete(key);
        if (this.#manuallyEnabledDomainKeys.has(key)) return;
        const disabling = this.disableDomain(domain, options);
        this.#domainDisables.set(key, disabling);
        try {
          await disabling;
        } finally {
          if (this.#domainDisables.get(key) === disabling) this.#domainDisables.delete(key);
        }
      } else {
        this.#domainReferences.set(key, remaining);
      }
    };
  }

  public close(): void {
    this.#markClosed();
    void this.#dispose();
  }

  public async closeAsync(): Promise<void> {
    this.#markClosed();
    await this.#dispose();
  }

  async #pumpEvents(): Promise<void> {
    while (!this.#closed) {
      let batch: readonly string[];
      try {
        batch = await binding.pollEvents(this.#handle, 100);
        if (await binding.connectionClosed(this.#handle)) {
          this.#markClosed();
          await this.#dispose();
          return;
        }
      } catch {
        this.#markClosed();
        return;
      }
      for (const json of batch) this.#dispatch(JSON.parse(json) as WireEvent);
      await new Promise<void>((resolve) => setTimeout(resolve, batch.length === 0 ? 5 : 0));
    }
  }

  #dispose(): Promise<void> {
    if (this.#disposed) return this.#disposePromise ?? Promise.resolve();
    this.#disposed = true;
    this.#disposePromise = binding.close(this.#handle);
    return this.#disposePromise;
  }

  #dispatch(event: WireEvent): void {
    this.#trace.push({
      direction: "receive",
      timestamp: Date.now(),
      message: {
        method: event.method,
        params: event.params,
        ...(event.sessionId === undefined ? {} : { sessionId: event.sessionId }),
      },
    });
    const metadata: EventMetadata = event.sessionId === undefined ? {} : { sessionId: event.sessionId };
    for (const handler of this.#handlers.get(event.method) ?? []) {
      Promise.resolve().then(() => handler(event.params, metadata)).catch((error: unknown) => {
        const report: HandlerError = event.sessionId === undefined
          ? { error, method: event.method, params: event.params }
          : { error, method: event.method, params: event.params, sessionId: event.sessionId };
        for (const errorHandler of this.#errorHandlers) errorHandler(report);
      });
    }
  }

  public forgetAutoDomain(domain: string, options: SendOptions = {}): void {
    const key = domainKey(domain, options.sessionId);
    if (this.#domainReferences.has(key) || this.#manuallyEnabledDomainKeys.has(key)) return;
    this.#autoEnabledDomainKeys.delete(key);
    this.#enabledDomainKeys.delete(key);
  }

  #recordDomainCommand(method: string, options: SendOptions, source: CommandSource): void {
    if (source === "internal") return;
    const match = /^(.*)\.(enable|disable)$/.exec(method);
    if (match === null || match[1] === undefined) return;
    const key = domainKey(match[1], options.sessionId);
    if (match[2] === "enable") {
      if (source === "auto") {
        if (this.#manuallyEnabledDomainKeys.has(key)) return;
        this.#enabledDomainKeys.add(key);
        this.#autoEnabledDomainKeys.add(key);
      } else {
        this.#enabledDomainKeys.delete(key);
        this.#autoEnabledDomainKeys.delete(key);
        this.#manuallyEnabledDomainKeys.add(key);
      }
      return;
    }
    this.#enabledDomainKeys.delete(key);
    this.#autoEnabledDomainKeys.delete(key);
    this.#manuallyEnabledDomainKeys.delete(key);
    this.#domainReferences.delete(key);
  }

  #domainsFor(keys: ReadonlySet<string>, sessionId?: string): ReadonlySet<string> {
    const prefix = `${sessionId ?? "browser"}:`;
    return new Set([...keys].filter((key) => key.startsWith(prefix)).map((key) => key.slice(prefix.length)));
  }

  #removeDomainEnableInFlight(key: string, operation: Promise<Readonly<Record<string, unknown>>>): void {
    const operations = this.#domainEnableInFlight.get(key);
    if (operations === undefined) return;
    operations.delete(operation);
    if (operations.size === 0) this.#domainEnableInFlight.delete(key);
  }

  #incrementAutoEnabling(key: string): void {
    this.#autoEnablingDomainKeys.set(key, (this.#autoEnablingDomainKeys.get(key) ?? 0) + 1);
  }

  #decrementAutoEnabling(key: string): void {
    const remaining = (this.#autoEnablingDomainKeys.get(key) ?? 1) - 1;
    if (remaining <= 0) this.#autoEnablingDomainKeys.delete(key);
    else this.#autoEnablingDomainKeys.set(key, remaining);
  }

  #markClosed(): void {
    this.#closed = true;
    this.#enabledDomainKeys.clear();
    this.#autoEnabledDomainKeys.clear();
    this.#manuallyEnabledDomainKeys.clear();
    this.#domainReferences.clear();
    this.#domainEnables.clear();
    this.#domainDisables.clear();
    this.#domainEnableInFlight.clear();
    this.#autoEnablingDomainKeys.clear();
    this.#handlers.clear();
    this.#errorHandlers.clear();
  }
}

function domainKey(domain: string, sessionId?: string): string {
  return `${sessionId ?? "browser"}:${domain}`;
}

function typedError(error: unknown, operation: string): unknown {
  if (!(error instanceof Error)) return error;
  const prefix = "NODRIVER_CDP_ERROR:";
  const start = error.message.indexOf(prefix);
  if (start === -1) return error;
  let payload: NativeErrorPayload;
  try {
    payload = JSON.parse(error.message.slice(start + prefix.length)) as NativeErrorPayload;
  } catch {
    return error;
  }
  switch (payload.kind) {
    case "aborted": return new CdpAbortError(operation);
    case "closed": return new CdpConnectionClosedError();
    case "lost": return new CdpConnectionLostError(payload.message);
    case "timeout": return new CdpTimeoutError(operation, payload.timeoutMs ?? 0);
    case "protocol": return new CdpProtocolError(payload.code ?? 0, payload.message ?? "Unknown CDP error", payload.data);
  }
}
