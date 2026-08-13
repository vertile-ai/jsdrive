import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import WebSocket from "ws";
import {
  CdpConnection,
  CdpConnectionClosedError,
  CdpProtocolError,
  type ConnectOptions as RuntimeConnectOptions,
  type EventMetadata,
} from "./connection.js";

/** A raw command descriptor accepted by the Zendriver-shaped Connection facade. */
export interface CommandDescriptor<T = unknown> {
  readonly method: string;
  readonly params?: unknown;
  readonly decode?: (result: Readonly<Record<string, unknown>>) => T;
}

export type ConnectionCommand<T = unknown> = CommandDescriptor<T> | string;

export interface ConnectionTarget {
  readonly targetId?: string;
  readonly target_id?: string;
  readonly type?: string;
  readonly type_?: string;
  readonly title?: string;
  readonly url?: string;
  readonly attached?: boolean;
  readonly canAccessOpener?: boolean;
  readonly can_access_opener?: boolean;
  readonly openerId?: string;
  readonly opener_id?: string;
  readonly openerFrameId?: string;
  readonly opener_frame_id?: string;
  readonly browserContextId?: string;
  readonly browser_context_id?: string;
  readonly subtype?: string;
}

export type ConnectionHandler = (event: unknown, metadata: EventMetadata) => void | Promise<void>;

/** CDP error shape used by the Python runtime's ProtocolException. */
export interface ProtocolErrorPayload {
  readonly code?: number;
  readonly message?: string;
  readonly data?: unknown;
}

/** Equivalent of zendriver.core.connection.ProtocolException. */
export class ProtocolException extends Error {
  public readonly code: number | null;
  public readonly data: unknown;

  public constructor(...args: readonly unknown[]) {
    if (args.length === 0) throw new RangeError("tuple index out of range");
    const first = args[0];
    let message: string;
    let code: number | null = null;
    let data: unknown;
    if (isProtocolErrorPayload(first)) {
      code = first.code ?? null;
      data = first.data;
      const detail = first.message ?? "Unknown CDP protocol error";
      message = code === null ? detail : `${detail} [code: ${code}]`;
    } else if (args.length === 1) {
      message = String(first);
    } else {
      message = args.map((value) => String(value)).join("| ");
    }
    super(message);
    this.name = "ProtocolException";
    this.code = code;
    this.data = data;
  }

  public override toString(): string {
    return this.message;
  }
}

/** Permission error raised by the Python metaclass when a class variable is changed. */
export class SettingClassVarNotAllowedException extends Error {
  public constructor(message = "") {
    super(message);
    this.name = "SettingClassVarNotAllowedException";
  }
}

/** Equivalent of asyncio.CancelledError for Future-like transactions. */
export class CancelledError extends Error {
  public constructor(message = "") {
    super(message);
    this.name = "CancelledError";
  }
}

/** JavaScript equivalent of Zendriver's metaclass guard.
 *
 * JavaScript has no metaclasses with Python's `__setattr__` hook. Callers that
 * need the same guard can use `rejectClassAssignment`; normal instance fields
 * remain freely assignable.
 */
export class CantTouchThis {
  private constructor() {
    throw new TypeError("CantTouchThis is a class-assignment guard, not an instance");
  }

  public static rejectClassAssignment(className: string, attribute: string): never {
    throw new SettingClassVarNotAllowedException(
      `don't set '${attribute}' on the ${className} class directly, as those are shared with other objects.\nuse \`my_object.${attribute} = 1\`  instead`,
    );
  }
}

/** A Future-like transaction with the observable Zendriver response semantics. */
export class Transaction<T = unknown> implements PromiseLike<T> {
  readonly #command: CommandDescriptor<T>;
  readonly #promise: Promise<T>;
  #resolve: ((value: T | PromiseLike<T>) => void) | undefined;
  #reject: ((reason?: unknown) => void) | undefined;
  #done = false;
  #cancelled = false;
  #error: Error | undefined;
  #value: T | undefined;
  readonly #callbacks: Array<(future: Transaction<T>) => void> = [];

  public readonly [Symbol.toStringTag] = "Promise";

  public constructor(command: CommandDescriptor<T> | string, params?: unknown) {
    this.#command = typeof command === "string"
      ? { method: command, ...(params === undefined ? {} : { params }) }
      : command;
    this.#promise = new Promise<T>((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
    void this.#promise.catch(() => undefined);
  }

  /** Command envelope, with the same null id placeholder used by Zendriver. */
  public get message(): string {
    return JSON.stringify({
      method: this.#command.method,
      ...(this.#command.params === undefined ? {} : { params: this.#command.params }),
      id: null,
    });
  }

  public get has_exception(): boolean {
    return !this.#done || this.#error !== undefined;
  }

  public get hasException(): boolean {
    return this.has_exception;
  }

  public done(): boolean {
    return this.#done;
  }

  public cancelled(): boolean {
    return this.#cancelled;
  }

  public call(response: Readonly<Record<string, unknown>>): void {
    if (this.#done) throw new Error("Transaction is already complete");
    const error = response.error;
    if (isProtocolErrorPayload(error)) {
      this.set_exception(new ProtocolException(error));
      return;
    }
    const raw = response.result as Readonly<Record<string, unknown>> | undefined;
    const value = this.#command.decode === undefined ? raw as T : this.#command.decode(raw ?? {});
    this.set_result(value);
  }

  public resolve(response: Readonly<Record<string, unknown>>): void {
    this.call(response);
  }

  public set_result(value: T): void {
    if (this.#done) throw new Error("Transaction is already complete");
    this.#done = true;
    this.#value = value;
    this.#resolve?.(value);
    this.#notifyCallbacks();
  }

  public setResult(value: T): void {
    this.set_result(value);
  }

  public set_exception(error: unknown): void {
    if (this.#done) throw new Error("Transaction is already complete");
    const normalized = error instanceof Error ? error : new Error(String(error));
    this.#done = true;
    this.#error = normalized;
    this.#reject?.(normalized);
    this.#notifyCallbacks();
  }

  public setException(error: unknown): void {
    this.set_exception(error);
  }

  public cancel(reason?: unknown): boolean {
    if (this.#done) return false;
    this.#cancelled = true;
    const message = reason === undefined ? "" : String(reason);
    this.set_exception(new CancelledError(message));
    return true;
  }

  public result(): T {
    if (!this.#done) throw new Error("Result is not set.");
    if (this.#error !== undefined) throw this.#error;
    return this.#value as T;
  }

  public exception(): Error | undefined {
    if (!this.#done) throw new Error("Exception is not set.");
    if (this.#cancelled) throw this.#error;
    return this.#error;
  }

  public add_done_callback(callback: (future: Transaction<T>) => void): void {
    if (this.#done) queueMicrotask(() => callback(this));
    else this.#callbacks.push(callback);
  }

  public addDoneCallback(callback: (future: Transaction<T>) => void): void {
    this.add_done_callback(callback);
  }

  public remove_done_callback(callback: (future: Transaction<T>) => void): number {
    let removed = 0;
    for (let index = this.#callbacks.length - 1; index >= 0; index -= 1) {
      if (this.#callbacks[index] === callback) {
        this.#callbacks.splice(index, 1);
        removed += 1;
      }
    }
    return removed;
  }

  public removeDoneCallback(callback: (future: Transaction<T>) => void): number {
    return this.remove_done_callback(callback);
  }

  /** Node has no user-visible asyncio loop; the transaction is loop-independent. */
  public get_loop(): undefined {
    return undefined;
  }

  public getLoop(): undefined {
    return this.get_loop();
  }

  #notifyCallbacks(): void {
    const callbacks = this.#callbacks.splice(0);
    for (const callback of callbacks) queueMicrotask(() => callback(this));
  }

  public then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.#promise.then(onfulfilled, onrejected);
  }

  public catch<TResult = never>(onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult> {
    return this.#promise.catch(onrejected);
  }

  public finally(onfinally?: (() => void) | null): Promise<T> {
    return this.#promise.finally(onfinally);
  }

  public toString(): string {
    const status = this.#done ? "finished" : "pending";
    const success = this.#error === undefined;
    return `<Transaction\n\tmethod: ${this.#command.method}\n\tstatus: ${status}\n\tsuccess: ${success}>`;
  }
}

/** Event transactions are already resolved with the event payload. */
export class EventTransaction<T = unknown> extends Transaction<T> {
  public readonly event: T;
  public readonly value: T;

  public constructor(eventObject: T) {
    super({ method: "event", decode: () => eventObject });
    this.event = eventObject;
    this.value = eventObject;
    this.set_result(eventObject);
  }

  public override toString(): string {
    return `EventTransaction\n\tevent: ${typeof this.event}\n\tstatus: finished\n\tsuccess: true>`;
  }
}

/** Lightweight event listener state machine used by Connection. */
export class Listener {
  readonly #connection: ConnectionImpl;
  readonly #history: unknown[] = [];
  #running = true;
  #lastEventAt = Date.now();
  public readonly max_history = 1000;
  public readonly maxHistory = this.max_history;
  #timeBeforeConsideredIdle = 0.1;

  public constructor(connection: ConnectionImpl) {
    this.#connection = connection;
  }

  public run(): void {
    this.#running = true;
  }

  public cancel(): void {
    this.#running = false;
  }

  public get running(): boolean {
    return this.#running;
  }

  public get time_before_considered_idle(): number {
    return this.#timeBeforeConsideredIdle;
  }

  public get timeBeforeConsideredIdle(): number {
    return this.#timeBeforeConsideredIdle;
  }

  public observe(event: unknown): void {
    if (!this.#running) return;
    this.#history.push(event);
    if (this.#history.length > this.max_history) this.#history.shift();
    this.#lastEventAt = Date.now();
  }

  public async listener_loop(): Promise<void> {
    await this.waitIdle();
  }

  public listenerLoop(): Promise<void> {
    return this.listener_loop();
  }

  public async waitIdle(): Promise<void> {
    const idleMs = this.#timeBeforeConsideredIdle * 1000;
    while (this.#running) {
      const remaining = idleMs - (Date.now() - this.#lastEventAt);
      if (remaining <= 0) return;
      await new Promise<void>((resolve) => setTimeout(resolve, remaining));
    }
  }

  public toString(): string {
    return `Listener [running: ${this.#running}] [busy] [cache size: ${this.#history.length}]>`;
  }

  public get connection(): ConnectionImpl {
    return this.#connection;
  }
}

/** Zendriver-shaped connection facade over the raw JS CDP backend. */
class ConnectionImpl {
  readonly #url: string;
  readonly #targetInput: ConnectionTarget | Protocol.Target.TargetInfo | undefined;
  readonly #owner: unknown;
  readonly #options: RuntimeConnectOptions;
  readonly #handlers = new Map<string, Array<{ readonly handler: ConnectionHandler; off: () => void }>>();
  #backend: CdpConnection | undefined;
  #listener: Listener | undefined;
  #target: ConnectionTarget | Protocol.Target.TargetInfo | undefined;

  public constructor(
    websocket_url: string,
    target?: ConnectionTarget | Protocol.Target.TargetInfo,
    _owner?: unknown,
    options: RuntimeConnectOptions = {},
  ) {
    this.#url = websocket_url;
    this.#targetInput = target;
    this.#target = target;
    this.#owner = _owner;
    this.#options = options;
  }

  public get websocket_url(): string { return this.#url; }
  public get websocket(): WebSocket | null { return this.#backend?.websocket ?? null; }
  public get target(): ConnectionTarget | Protocol.Target.TargetInfo | undefined { return this.#target; }
  public get target_id(): string | undefined { return targetValue(this.#target, "targetId", "target_id"); }
  public get targetId(): string | undefined { return this.target_id; }
  public get type_(): string | undefined { return targetValue(this.#target, "type", "type_"); }
  public get type(): string | undefined { return this.type_; }
  public get title(): string | undefined { return targetValue(this.#target, "title"); }
  public get url(): string | undefined { return targetValue(this.#target, "url"); }
  public get attached(): boolean | undefined { return targetValue(this.#target, "attached"); }
  public get can_access_opener(): boolean | undefined { return targetValue(this.#target, "canAccessOpener", "can_access_opener"); }
  public get canAccessOpener(): boolean | undefined { return this.can_access_opener; }
  public get opener_id(): string | undefined { return targetValue(this.#target, "openerId", "opener_id"); }
  public get openerId(): string | undefined { return this.opener_id; }
  public get opener_frame_id(): string | undefined { return targetValue(this.#target, "openerFrameId", "opener_frame_id"); }
  public get openerFrameId(): string | undefined { return this.opener_frame_id; }
  public get browser_context_id(): string | undefined { return targetValue(this.#target, "browserContextId", "browser_context_id"); }
  public get browserContextId(): string | undefined { return this.browser_context_id; }
  public get subtype(): string | undefined { return targetValue(this.#target, "subtype"); }
  public get closed(): boolean { return this.#backend?.closed ?? true; }
  public get owner(): unknown { return this.#owner; }
  public get listener(): Listener | undefined { return this.#listener; }

  public async aopen(): Promise<void> {
    if (this.#backend !== undefined && !this.#backend.closed) return;
    this.#backend = await CdpConnection.connect(this.#url, this.#options);
    this.#listener = new Listener(this);
    this.#listener.run();
    for (const [method, registrations] of this.#handlers) {
      for (const registration of registrations) registration.off = this.#registerHandler(method, registration.handler);
    }
  }

  public aOpen(): Promise<void> {
    return this.aopen();
  }

  public async aclose(): Promise<void> {
    this.#listener?.cancel();
    for (const registrations of this.#handlers.values()) {
      for (const registration of registrations) {
        registration.off();
        registration.off = () => {};
      }
    }
    this.#backend?.close();
    this.#backend = undefined;
  }

  public aClose(): Promise<void> {
    return this.aclose();
  }

  public async aenter(): Promise<this> {
    return this;
  }

  public async aexit(_excType?: unknown, _excVal?: unknown, _excTb?: unknown): Promise<void> {
    await this.aclose();
  }

  public [Symbol.asyncDispose](): Promise<void> {
    return this.aclose();
  }

  /** Awaiting a connection refreshes target metadata and waits for event idle. */
  public then<TResult1 = void, TResult2 = never>(
    onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    const ready = this.update_target().then(() => this.wait()).then(() => undefined);
    return ready.then(onfulfilled, onrejected);
  }

  public sleep(t = 0.25): Promise<void> {
    return this.aopen().then(() => new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, t) * 1000)));
  }

  public async wait(t?: number): Promise<void> {
    const listener = this.#listener;
    if (listener === undefined) throw new Error("No listener created yet");
    if (t !== undefined) {
      await new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, t) * 1000));
      return;
    }
    await listener.waitIdle();
  }

  public async update_target(): Promise<void> {
    const result = await this.send<Protocol.Target.TargetInfo>({
      method: "Target.getTargetInfo",
      params: this.target_id === undefined ? {} : { targetId: this.target_id },
      decode: (raw) => raw.targetInfo as Protocol.Target.TargetInfo,
    });
    this.#target = result;
  }

  public updateTarget(): Promise<void> {
    return this.update_target();
  }

  public async send<T = unknown>(command: ConnectionCommand<T>, paramsOrUpdate?: unknown, _is_update = false): Promise<T> {
    const backend = this.#backend;
    if (backend === undefined || backend.closed) throw new CdpConnectionClosedError();
    const positionalUpdate = typeof paramsOrUpdate === "boolean" && _is_update === false;
    const params = positionalUpdate ? undefined : paramsOrUpdate;
    const isUpdate = positionalUpdate ? paramsOrUpdate : _is_update;
    const descriptor: CommandDescriptor<T> = typeof command === "string"
      ? { method: command, ...(params === undefined ? {} : { params }) }
      : command;
    const transaction = new Transaction(descriptor);
    try {
      const result = await backend.sendRaw(descriptor.method, descriptor.params);
      transaction.call({ result });
      const value = transaction.result();
      if (isUpdate === true && descriptor.method === "Target.getTargetInfo") this.#target = value as ConnectionTarget;
      return value;
    } catch (error) {
      const normalized = error instanceof CdpProtocolError
        ? new ProtocolException({ code: error.code, message: error.message.replace(/^CDP error -?\d+: /, ""), data: error.data })
        : error;
      transaction.set_exception(normalized);
      throw transaction.exception();
    }
  }

  public feed_cdp<T = unknown>(command: ConnectionCommand<T>, params?: unknown): void {
    void this.send(command, params);
  }

  public feedCdp<T = unknown>(command: ConnectionCommand<T>, params?: unknown): void {
    this.feed_cdp(command, params);
  }

  public add_handler(event_type_or_domain: string | { readonly events: readonly string[] }, handler: ConnectionHandler): void {
    const methods = typeof event_type_or_domain === "string" ? [event_type_or_domain] : event_type_or_domain.events;
    for (const method of methods) {
      const registration = { handler, off: this.#backend === undefined ? () => {} : this.#registerHandler(method, handler) };
      const registrations = this.#handlers.get(method) ?? [];
      registrations.push(registration);
      this.#handlers.set(method, registrations);
    }
  }

  public remove_handlers(event_type?: string, handler?: ConnectionHandler): void {
    if (handler !== undefined && event_type === undefined) throw new TypeError("if handler is provided, event_type should be provided as well");
    const methods = event_type === undefined ? [...this.#handlers.keys()] : [event_type];
    for (const method of methods) {
      const registrations = this.#handlers.get(method) ?? [];
      const remaining = handler === undefined ? [] : registrations.filter((registration) => registration.handler !== handler);
      for (const registration of registrations) if (handler === undefined || !remaining.includes(registration)) registration.off();
      if (remaining.length === 0) this.#handlers.delete(method);
      else this.#handlers.set(method, remaining);
    }
  }

  public addHandler(eventTypeOrDomain: string | { readonly events: readonly string[] }, handler: ConnectionHandler): void {
    this.add_handler(eventTypeOrDomain, handler);
  }

  public removeHandlers(eventType?: string, handler?: ConnectionHandler): void {
    this.remove_handlers(eventType, handler);
  }

  #registerHandler(method: string, handler: ConnectionHandler): () => void {
    const backend = this.#backend;
    if (backend === undefined || backend.closed) return () => {};
    const wrapped = (event: unknown, metadata: EventMetadata): void | Promise<void> => {
      this.#listener?.observe({ method, event });
      return handler(event, metadata);
    };
    return backend.on(method, wrapped);
  }
}

export type Connection = ConnectionImpl;

/**
 * Python's Connection metaclass rejects class-variable assignments. A Proxy
 * provides the same observable guard for direct JavaScript assignments.
 */
export const Connection: typeof ConnectionImpl = new Proxy(ConnectionImpl, {
  set(_target, property): boolean {
    CantTouchThis.rejectClassAssignment("Connection", String(property));
  },
});

function isProtocolErrorPayload(value: unknown): value is ProtocolErrorPayload {
  return typeof value === "object" && value !== null && (
    "code" in value || "message" in value || "data" in value
  );
}

function targetValue<T extends string | boolean>(
  target: ConnectionTarget | Protocol.Target.TargetInfo | undefined,
  ...keys: readonly string[]
): T | undefined {
  if (target === undefined) return undefined;
  for (const key of keys) {
    const value = (target as Record<string, unknown>)[key];
    if (typeof value === "string" || typeof value === "boolean") return value as T;
  }
  return undefined;
}
