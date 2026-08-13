import type {
  CommandParams,
  CommandResult,
  EventPayload,
  ProtocolCommand,
  ProtocolEvent,
} from "@nodriver/protocol";
import WebSocket, { type RawData } from "ws";

export interface SendOptions {
  readonly sessionId?: string;
  readonly timeoutMs?: number;
  readonly signal?: AbortSignal;
}

function delay(milliseconds: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted === true) return Promise.reject(signal.reason);
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, milliseconds);
    signal?.addEventListener("abort", () => { clearTimeout(timeout); reject(signal.reason); }, { once: true });
  });
}

export type DomainPolicy = "manual" | "zendriver-compatible" | "reference-counted";

export interface ConnectOptions extends Pick<SendOptions, "timeoutMs" | "signal"> {
  readonly domainPolicy?: DomainPolicy;
}

export interface EventMetadata {
  readonly sessionId?: string;
}

export type DomainEnableSource = "manual" | "auto";

export interface TraceEntry {
  readonly direction: "send" | "receive";
  readonly timestamp: number;
  readonly message: Readonly<Record<string, unknown>>;
}

export interface HandlerError {
  readonly error: unknown;
  readonly method: string;
  readonly params: unknown;
  readonly sessionId?: string;
}

export class CdpProtocolError extends Error {
  public constructor(
    public readonly code: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(`CDP error ${code}: ${message}`);
    this.name = "CdpProtocolError";
  }
}

export class CdpConnectionClosedError extends Error {
  public constructor(message = "CDP connection closed") {
    super(message);
    this.name = "CdpConnectionClosedError";
  }
}

export class CdpConnectionLostError extends Error {
  public constructor(message = "CDP connection lost") {
    super(message);
    this.name = "CdpConnectionLostError";
  }
}

export class CdpTimeoutError extends Error {
  public constructor(public readonly operation: string, public readonly timeoutMs: number) {
    super(`${operation} timed out after ${timeoutMs}ms`);
    this.name = "CdpTimeoutError";
  }
}

export class CdpAbortError extends Error {
  public constructor(public readonly operation: string, options: ErrorOptions = {}) {
    super(`${operation} was aborted`, options);
    this.name = "CdpAbortError";
  }
}

type EventHandler = (params: unknown, metadata: EventMetadata) => void | Promise<void>;
type ErrorHandler = (event: HandlerError) => void;

export interface RuntimeBackend {
  readonly domainPolicy: DomainPolicy;
  readonly enabledDomains: ReadonlySet<string>;
  readonly manuallyEnabledDomains: ReadonlySet<string>;
  readonly enabledDomainsFor?: (sessionId?: string) => ReadonlySet<string>;
  readonly manuallyEnabledDomainsFor?: (sessionId?: string) => ReadonlySet<string>;
  readonly forgetAutoDomain?: (domain: string, options?: SendOptions) => void;
  readonly closed: boolean;
  send<M extends ProtocolCommand>(
    method: M,
    ...args: CommandParams<M> extends undefined
      ? [params?: undefined, options?: SendOptions]
      : [params: CommandParams<M>, options?: SendOptions]
  ): Promise<CommandResult<M>>;
  sendRaw(
    method: string,
    params?: unknown,
    options?: SendOptions,
  ): Promise<Readonly<Record<string, unknown>>>;
  on<E extends ProtocolEvent>(
    method: E,
    handler: (params: EventPayload<E>, metadata: EventMetadata) => void | Promise<void>,
  ): () => void;
  on(
    method: string,
    handler: (params: unknown, metadata: EventMetadata) => void | Promise<void>,
  ): () => void;
  removeHandlers(method?: string): void;
  wait(milliseconds: number, signal?: AbortSignal): Promise<void>;
  sleep(milliseconds: number, signal?: AbortSignal): Promise<void>;
  enableDomain(domain: string, options?: SendOptions, source?: DomainEnableSource): Promise<void>;
  disableDomain(domain: string, options?: SendOptions): Promise<void>;
  acquireDomain(domain: string, options?: SendOptions): Promise<() => Promise<void>>;
  close(): void;
}

export interface RuntimeBackendFactory {
  connect(url: string, options?: ConnectOptions): Promise<RuntimeBackend>;
}

interface Pending {
  readonly resolve: (value: Readonly<Record<string, unknown>>) => void;
  readonly reject: (reason: unknown) => void;
  readonly cleanup: () => void;
  readonly method: string;
  readonly options: SendOptions;
  readonly source: DomainEnableSource;
}

export class CdpConnection implements RuntimeBackend {
  readonly #socket: WebSocket;
  readonly #pending = new Map<number, Pending>();
  readonly #handlers = new Map<string, Set<EventHandler>>();
  readonly #errorHandlers = new Set<ErrorHandler>();
  readonly #trace: TraceEntry[] = [];
  readonly #domainReferences = new Map<string, number>();
  readonly #domainEnables = new Map<string, Promise<void>>();
  readonly #domainDisables = new Map<string, Promise<void>>();
  readonly #domainEnableInFlight = new Map<string, Set<Promise<Readonly<Record<string, unknown>>>>>();
  readonly #enabledDomainKeys = new Set<string>();
  readonly #autoEnabledDomainKeys = new Set<string>();
  readonly #manuallyEnabledDomainKeys = new Set<string>();
  readonly #autoEnablingDomainKeys = new Map<string, number>();
  public readonly domainPolicy: DomainPolicy;
  #nextId = 1;
  #closed = false;

  private constructor(socket: WebSocket, domainPolicy: DomainPolicy) {
    this.#socket = socket;
    this.domainPolicy = domainPolicy;
    socket.on("message", (data) => this.#receive(data));
    socket.on("close", () => this.#failClosed(new CdpConnectionLostError()));
    socket.on("error", () => this.#failClosed(new CdpConnectionLostError("CDP WebSocket failed")));
  }

  public static async connect(url: string, options: ConnectOptions = {}): Promise<CdpConnection> {
    const socket = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
      const timeoutMs = options.timeoutMs ?? 10_000;
      const timeout = setTimeout(() => {
        discard();
        reject(new CdpTimeoutError(`WebSocket open: ${url}`, timeoutMs));
      }, timeoutMs);
      const cleanup = (): void => {
        clearTimeout(timeout);
        socket.off("open", opened);
        socket.off("error", failed);
        options.signal?.removeEventListener("abort", abort);
      };
      const ignoreTerminationError = (): void => {};
      const discard = (): void => {
        cleanup();
        socket.on("error", ignoreTerminationError);
        socket.once("close", () => socket.off("error", ignoreTerminationError));
        socket.terminate();
      };
      const opened = (): void => {
        cleanup();
        resolve();
      };
      const failed = (error: Error): void => {
        discard();
        reject(new CdpConnectionLostError(`WebSocket open failed: ${url}: ${error.message}`));
      };
      const abort = (): void => {
        discard();
        reject(new CdpAbortError(`WebSocket open: ${url}`, { cause: options.signal?.reason }));
      };
      socket.once("open", opened);
      socket.once("error", failed);
      options.signal?.addEventListener("abort", abort, { once: true });
      if (options.signal?.aborted === true) abort();
    });
    return new CdpConnection(socket, options.domainPolicy ?? "manual");
  }

  public get trace(): readonly TraceEntry[] {
    return this.#trace;
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

  public send<M extends ProtocolCommand>(
    method: M,
    ...args: CommandParams<M> extends undefined
      ? [params?: undefined, options?: SendOptions]
      : [params: CommandParams<M>, options?: SendOptions]
  ): Promise<CommandResult<M>> {
    return this.sendRaw(method, args[0], args[1]) as Promise<CommandResult<M>>;
  }

  public sendRaw(
    method: string,
    params?: unknown,
    options: SendOptions = {},
  ): Promise<Readonly<Record<string, unknown>>> {
    return this.#sendRawWithSource(method, params, options, "manual");
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
      const key = this.#domainKey(match[1], options.sessionId);
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
    source: DomainEnableSource,
  ): Promise<Readonly<Record<string, unknown>>> {
    if (this.#closed) return Promise.reject(new CdpConnectionClosedError());
    if (options.signal?.aborted === true) {
      return Promise.reject(new CdpAbortError(method, { cause: options.signal.reason }));
    }
    const id = this.#nextId++;
    const message: Record<string, unknown> = { id, method };
    if (params !== undefined) message.params = params;
    if (options.sessionId !== undefined) message.sessionId = options.sessionId;
    this.#record("send", message);

    return new Promise((resolve, reject) => {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const abort = (): void => {
        this.#pending.delete(id);
        cleanup();
        reject(new CdpAbortError(method, { cause: options.signal?.reason }));
      };
      const cleanup = (): void => {
        if (timeout !== undefined) clearTimeout(timeout);
        options.signal?.removeEventListener("abort", abort);
      };
      if (options.timeoutMs !== undefined) {
        const timeoutMs = options.timeoutMs;
        timeout = setTimeout(() => {
          this.#pending.delete(id);
          cleanup();
          reject(new CdpTimeoutError(`CDP command ${method}`, timeoutMs));
        }, timeoutMs);
      }
      options.signal?.addEventListener("abort", abort, { once: true });
      this.#pending.set(id, { resolve, reject, cleanup, method, options, source });
      try {
        this.#socket.send(JSON.stringify(message));
      } catch (error) {
        this.#pending.delete(id);
        cleanup();
        reject(error);
      }
    });
  }

  public async enableDomain(domain: string, options: SendOptions = {}, source: DomainEnableSource = "manual"): Promise<void> {
    const key = this.#domainKey(domain, options.sessionId);
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
    const key = this.#domainKey(domain, options.sessionId);
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
    const key = this.#domainKey(domain, options.sessionId);
    if (this.#manuallyEnabledDomainKeys.has(key)) return async () => {};
    await this.#domainDisables.get(key);
    const references = this.#domainReferences.get(key) ?? 0;
    this.#domainReferences.set(key, references + 1);
    let enabling = this.#domainEnables.get(key);
    if (enabling === undefined && !this.#enabledDomainKeys.has(key)) {
      enabling = this.enableDomain(domain, options, "auto");
      this.#domainEnables.set(key, enabling);
      void enabling.then(
        () => { if (this.#domainEnables.get(key) === enabling) this.#domainEnables.delete(key); },
        () => { if (this.#domainEnables.get(key) === enabling) this.#domainEnables.delete(key); },
      );
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
      }
      else this.#domainReferences.set(key, remaining);
    };
  }

  public forgetAutoDomain(domain: string, options: SendOptions = {}): void {
    const key = this.#domainKey(domain, options.sessionId);
    if (this.#domainReferences.has(key) || this.#manuallyEnabledDomainKeys.has(key)) return;
    this.#autoEnabledDomainKeys.delete(key);
    this.#enabledDomainKeys.delete(key);
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

  public wait(milliseconds: number, signal?: AbortSignal): Promise<void> { return delay(milliseconds, signal); }
  public sleep(milliseconds: number, signal?: AbortSignal): Promise<void> { return this.wait(milliseconds, signal); }

  public onHandlerError(handler: ErrorHandler): () => void {
    this.#errorHandlers.add(handler);
    return () => this.#errorHandlers.delete(handler);
  }

  public close(): void {
    if (this.#closed) return;
    this.#failClosed(new CdpConnectionClosedError());
    this.#socket.terminate();
  }

  #receive(data: RawData): void {
    void this.#decode(data).then((text) => {
      const message = JSON.parse(text) as Record<string, unknown>;
      this.#record("receive", message);
      if (typeof message.id === "number") {
        const pending = this.#pending.get(message.id);
        if (pending === undefined) return;
        this.#pending.delete(message.id);
        pending.cleanup();
        const error = message.error as { code?: unknown; message?: unknown; data?: unknown } | undefined;
        if (error !== undefined) {
          pending.reject(new CdpProtocolError(Number(error.code), String(error.message), error.data));
        } else {
          this.#recordDomainCommand(pending.method, pending.options, pending.source);
          pending.resolve((message.result ?? {}) as Readonly<Record<string, unknown>>);
        }
        return;
      }
      if (typeof message.method !== "string") return;
      const metadata: EventMetadata = typeof message.sessionId === "string" ? { sessionId: message.sessionId } : {};
      for (const handler of this.#handlers.get(message.method) ?? []) {
        Promise.resolve().then(() => handler(message.params ?? {}, metadata)).catch((error: unknown) => {
          const event: HandlerError = metadata.sessionId === undefined
            ? { error, method: message.method as string, params: message.params ?? {} }
            : { error, method: message.method as string, params: message.params ?? {}, sessionId: metadata.sessionId };
          for (const errorHandler of this.#errorHandlers) errorHandler(event);
        });
      }
    }).catch((error: unknown) => this.#failClosed(new CdpConnectionLostError(`Invalid CDP message: ${String(error)}`)));
  }

  async #decode(data: RawData): Promise<string> {
    if (data instanceof ArrayBuffer) return new TextDecoder().decode(data);
    if (Array.isArray(data)) return Buffer.concat(data).toString("utf8");
    return data.toString("utf8");
  }

  #record(direction: TraceEntry["direction"], message: Readonly<Record<string, unknown>>): void {
    this.#trace.push({ direction, timestamp: Date.now(), message });
  }

  #domainKey(domain: string, sessionId?: string): string {
    return `${sessionId ?? "browser"}:${domain}`;
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

  #recordDomainCommand(method: string, options: SendOptions, source: DomainEnableSource): void {
    const match = /^(.*)\.(enable|disable)$/.exec(method);
    if (match === null) return;
    const domain = match[1];
    if (domain === undefined) return;
    const key = this.#domainKey(domain, options.sessionId);
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

  #failClosed(error: CdpConnectionClosedError | CdpConnectionLostError): void {
    if (this.#closed) return;
    this.#closed = true;
    for (const pending of this.#pending.values()) {
      pending.cleanup();
      pending.reject(error);
    }
    this.#pending.clear();
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
