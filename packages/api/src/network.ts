import type { Protocol } from "@nodriver/protocol";
import { CdpAbortError, CdpTimeoutError, type SendOptions } from "@nodriver/runtime-js";
import type { Tab, WaitOptions } from "./tab.js";

export type UrlMatcher<T> = string | RegExp | ((event: T) => boolean | Promise<boolean>);

export interface ExpectedRequest {
  readonly event: Protocol.Network.Events.RequestWillBeSentEvent;
  readonly request: Protocol.Network.Request;
}

export interface ExpectedResponse {
  readonly event: Protocol.Network.Events.ResponseReceivedEvent;
  readonly request?: Protocol.Network.Events.RequestWillBeSentEvent;
  readonly response: Protocol.Network.Response;
  readonly loadingFinished: Protocol.Network.Events.LoadingFinishedEvent;
  readonly body: string;
  readonly bodyBase64Encoded: boolean;
  json<T = unknown>(): T;
  bytes(): Buffer;
}

export interface Expectation<T> {
  readonly ready: Promise<void>;
  readonly value: Promise<T>;
  cancel(reason?: unknown): Promise<void>;
}

export interface InterceptionOptions {
  readonly url?: string | RegExp | ((event: Protocol.Fetch.Events.RequestPausedEvent) => boolean | Promise<boolean>);
  readonly stage?: Protocol.Fetch.RequestStage;
  readonly resourceType?: Protocol.Network.ResourceType;
}

export interface NextInterceptionOptions extends WaitOptions {}

export class FetchInterception {
  readonly #tab: Tab;
  readonly #options: InterceptionOptions;
  readonly #queued: InterceptedRequest[] = [];
  readonly #active = new Set<InterceptedRequest>();
  readonly #waiters: Array<{
    readonly resolve: (request: InterceptedRequest) => void;
    readonly reject: (reason: unknown) => void;
    readonly cleanup: () => void;
  }> = [];
  readonly #off: () => void;
  #closed = false;
  public readonly ready: Promise<void>;

  public constructor(tab: Tab, options: InterceptionOptions = {}) {
    this.#tab = tab;
    this.#options = options;
    this.#off = tab.on("Fetch.requestPaused", (event) => this.#paused(event));
    const pattern: Protocol.Fetch.RequestPattern = {
      ...(options.stage === undefined ? {} : { requestStage: options.stage }),
      ...(options.resourceType === undefined ? {} : { resourceType: options.resourceType }),
    };
    this.ready = tab.send("Fetch.enable", { patterns: [pattern] }).then(() => undefined).catch((error: unknown) => {
      this.#off();
      this.#closed = true;
      throw error;
    });
  }

  public async next(options: NextInterceptionOptions = {}): Promise<InterceptedRequest> {
    await this.ready;
    const queued = this.#queued.shift();
    if (queued !== undefined) return queued;
    if (this.#closed) throw new Error("Fetch interception is closed");
    const timeoutMs = options.timeoutMs ?? 10_000;
    return new Promise<InterceptedRequest>((resolve, reject) => {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const abort = (): void => complete(() => reject(new CdpAbortError("Fetch interception", { cause: options.signal?.reason })));
      const complete = (action: () => void): void => {
        if (timeout !== undefined) clearTimeout(timeout);
        options.signal?.removeEventListener("abort", abort);
        const index = this.#waiters.indexOf(waiter);
        if (index >= 0) this.#waiters.splice(index, 1);
        action();
      };
      const waiter = {
        resolve: (request: InterceptedRequest) => complete(() => resolve(request)),
        reject: (reason: unknown) => complete(() => reject(reason)),
        cleanup: () => complete(() => {}),
      };
      this.#waiters.push(waiter);
      timeout = setTimeout(() => waiter.reject(new CdpTimeoutError("Fetch interception", timeoutMs)), timeoutMs);
      options.signal?.addEventListener("abort", abort, { once: true });
      if (options.signal?.aborted === true) abort();
    });
  }

  public async close(): Promise<void> {
    if (this.#closed) return;
    this.#closed = true;
    this.#off();
    for (const waiter of [...this.#waiters]) waiter.reject(new Error("Fetch interception is closed"));
    this.#queued.length = 0;
    const active = [...this.#active].filter((request) => !request.handled);
    try {
      await Promise.allSettled(active.map((request) => request.continue()));
      await this.ready;
    } finally {
      await this.#tab.send("Fetch.disable");
    }
  }

  public [Symbol.asyncDispose](): Promise<void> {
    return this.close();
  }

  async #paused(event: Protocol.Fetch.Events.RequestPausedEvent): Promise<void> {
    if (this.#closed) return;
    const stage = event.responseStatusCode === undefined && event.responseErrorReason === undefined ? "Request" : "Response";
    const matchesStage = this.#options.stage === undefined || this.#options.stage === stage;
    const matchesType = this.#options.resourceType === undefined || this.#options.resourceType === event.resourceType;
    const request = new InterceptedRequest(this.#tab, event, stage, () => this.#active.delete(request));
    this.#active.add(request);
    let matchesUrl: boolean;
    try {
      matchesUrl = await matches(this.#options.url, event.request.url, event);
    } catch (error) {
      await request.continue();
      this.#waiters.shift()?.reject(error);
      throw error;
    }
    if (this.#closed) {
      await request.continue();
      return;
    }
    if (!matchesStage || !matchesType || !matchesUrl) {
      await request.continue();
      return;
    }
    const waiter = this.#waiters.shift();
    if (waiter === undefined) this.#queued.push(request);
    else waiter.resolve(request);
  }
}

export class InterceptedRequest {
  #handled = false;

  public constructor(
    private readonly tab: Tab,
    public readonly event: Protocol.Fetch.Events.RequestPausedEvent,
    public readonly stage: Protocol.Fetch.RequestStage,
    private readonly onHandled: () => void = () => {},
  ) {}

  public get request(): Protocol.Network.Request { return this.event.request; }
  public get resourceType(): Protocol.Network.ResourceType { return this.event.resourceType; }
  public get responseStatusCode(): number | undefined { return this.event.responseStatusCode; }
  public get handled(): boolean { return this.#handled; }

  public continueRequest(params: Omit<Protocol.Fetch.Commands.ContinueRequestParams, "requestId"> = {}): Promise<void> {
    return this.#handle("Fetch.continueRequest", { requestId: this.event.requestId, ...params });
  }

  public continueResponse(params: Omit<Protocol.Fetch.Commands.ContinueResponseParams, "requestId"> = {}): Promise<void> {
    return this.#handle("Fetch.continueResponse", { requestId: this.event.requestId, ...params });
  }

  public continue(): Promise<void> {
    return this.stage === "Response" ? this.continueResponse() : this.continueRequest();
  }

  public failRequest(errorReason: Protocol.Network.ErrorReason = "Failed"): Promise<void> {
    return this.#handle("Fetch.failRequest", { requestId: this.event.requestId, errorReason });
  }

  public fulfillRequest(
    responseCode: number,
    options: Omit<Protocol.Fetch.Commands.FulfillRequestParams, "requestId" | "responseCode"> = {},
  ): Promise<void> {
    return this.#handle("Fetch.fulfillRequest", { requestId: this.event.requestId, responseCode, ...options });
  }

  public async body(): Promise<Buffer> {
    if (this.stage !== "Response") throw new Error("Response body is only available at the response interception stage");
    if (this.#handled) throw new Error("Intercepted request was already handled");
    const result = await this.tab.send("Fetch.getResponseBody", { requestId: this.event.requestId });
    return Buffer.from(result.body, result.base64Encoded ? "base64" : "utf8");
  }

  async #handle<M extends "Fetch.continueRequest" | "Fetch.continueResponse" | "Fetch.failRequest" | "Fetch.fulfillRequest">(
    method: M,
    params: Protocol.Fetch.Commands.ContinueRequestParams
      | Protocol.Fetch.Commands.ContinueResponseParams
      | Protocol.Fetch.Commands.FailRequestParams
      | Protocol.Fetch.Commands.FulfillRequestParams,
  ): Promise<void> {
    if (this.#handled) throw new Error("Intercepted request was already handled");
    this.#handled = true;
    try {
      await this.tab.sendRaw(method, params);
    } finally {
      this.onHandled();
    }
  }
}

export function expectRequest(
  tab: Tab,
  matcher: UrlMatcher<Protocol.Network.Events.RequestWillBeSentEvent>,
  options: WaitOptions = {},
): Expectation<ExpectedRequest> {
  return networkExpectation(tab, `request matching ${describeMatcher(matcher)}`, options, (finish) => [
    tab.on("Network.requestWillBeSent", async (event) => {
      if (await matches(matcher, event.request.url, event)) {
        void finish({ event, request: event.request });
      }
    }),
  ]);
}

export function expectResponse(
  tab: Tab,
  matcher: UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>,
  options: WaitOptions = {},
): Expectation<ExpectedResponse> {
  const requests = new Map<Protocol.Network.RequestId, Protocol.Network.Events.RequestWillBeSentEvent>();
  const responses = new Map<Protocol.Network.RequestId, Protocol.Network.Events.ResponseReceivedEvent>();
  const responseMatches = new Map<Protocol.Network.RequestId, Promise<boolean>>();
  return networkExpectation(tab, `response matching ${describeMatcher(matcher)}`, options, (finish, fail) => [
    tab.on("Network.requestWillBeSent", (event) => { requests.set(event.requestId, event); }),
    tab.on("Network.responseReceived", (event) => {
      responses.set(event.requestId, event);
      responseMatches.set(event.requestId, matches(matcher, event.response.url, event));
    }),
    tab.on("Network.loadingFinished", async (event) => {
      if (await responseMatches.get(event.requestId) !== true) return;
      try {
        const body = await tab.send("Network.getResponseBody", { requestId: event.requestId }, commandOptions(options));
        const response = responses.get(event.requestId);
        if (response === undefined) return;
        const request = requests.get(event.requestId);
        void finish({
          event: response,
          ...(request === undefined ? {} : { request }),
          response: response.response,
          loadingFinished: event,
          body: body.body,
          bodyBase64Encoded: body.base64Encoded,
          json<T = unknown>(): T { return JSON.parse(Buffer.from(body.body, body.base64Encoded ? "base64" : "utf8").toString("utf8")) as T; },
          bytes(): Buffer { return Buffer.from(body.body, body.base64Encoded ? "base64" : "utf8"); },
        });
      } catch (error) {
        void fail(error);
      }
    }),
    tab.on("Network.loadingFailed", async (event) => {
      if (await responseMatches.get(event.requestId) === true) void fail(new Error(`Network request failed: ${event.errorText}`));
    }),
  ]);
}

function networkExpectation<T>(
  tab: Tab,
  description: string,
  options: WaitOptions,
  listen: (
    finish: (value: T) => Promise<void>,
    fail: (reason: unknown) => Promise<void>,
  ) => readonly (() => void)[],
): Expectation<T> {
  const timeoutMs = options.timeoutMs ?? 10_000;
  let resolveValue: (value: T) => void = () => {};
  let rejectValue: (reason: unknown) => void = () => {};
  let release: (() => Promise<void>) | undefined;
  let settled = false;
  const value = new Promise<T>((resolve, reject) => { resolveValue = resolve; rejectValue = reject; });
  const cleanup = async (): Promise<void> => {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", abort);
    for (const off of listeners) off();
    await release?.();
  };
  const finish = async (result: T): Promise<void> => {
    if (settled) return;
    settled = true;
    try { await cleanup(); } catch { /* The matched result still settles the expectation. */ }
    resolveValue(result);
  };
  const fail = async (reason: unknown): Promise<void> => {
    if (settled) return;
    settled = true;
    try { await cleanup(); } catch { /* Preserve the original failure. */ }
    rejectValue(reason);
  };
  const listeners = listen(finish, fail);
  const timeout = setTimeout(() => { void fail(new CdpTimeoutError(`Wait for ${description}`, timeoutMs)); }, timeoutMs);
  const abort = (): void => { void fail(new CdpAbortError(`Wait for ${description}`, { cause: options.signal?.reason })); };
  options.signal?.addEventListener("abort", abort, { once: true });
  if (options.signal?.aborted === true) abort();
  const ready = tab.acquireDomain("Network", commandOptions(options)).then(async (lease) => {
    release = lease;
    if (settled) await lease();
  }).catch(async (error: unknown) => {
    await fail(error);
    throw error;
  });
  void ready.catch(() => undefined);
  return {
    ready,
    value,
    cancel: async (reason?: unknown) => fail(new CdpAbortError(`Wait for ${description}`, { cause: reason })),
  };
}

function commandOptions(options: WaitOptions): SendOptions {
  return {
    ...(options.timeoutMs === undefined ? {} : { timeoutMs: options.timeoutMs }),
    ...(options.signal === undefined ? {} : { signal: options.signal }),
  };
}

async function matches<T>(matcher: UrlMatcher<T> | undefined, url: string, event: T): Promise<boolean> {
  if (matcher === undefined) return true;
  if (typeof matcher === "string") return url.includes(matcher);
  if (matcher instanceof RegExp) {
    matcher.lastIndex = 0;
    return matcher.test(url);
  }
  return matcher(event);
}

function describeMatcher<T>(matcher: UrlMatcher<T>): string {
  return typeof matcher === "string" ? JSON.stringify(matcher) : matcher.toString();
}
