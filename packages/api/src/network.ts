import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import { CdpAbortError, CdpTimeoutError, type SendOptions } from "@vertile-ai/jsdriver-runtime-js";
import type { Tab, WaitOptions } from "./tab.js";

export type UrlMatcher<T> = string | RegExp | ((event: T) => boolean | Promise<boolean>);

export type ExpectedRequest = Protocol.Network.Events.RequestWillBeSentEvent;

export type ExpectedResponse = Protocol.Network.Events.ResponseReceivedEvent;

export interface Expectation<T> {
  readonly ready: Promise<void>;
  readonly value: Promise<T>;
  cancel(reason?: unknown): Promise<void>;
  reset(): Promise<void>;
  [Symbol.asyncDispose](): Promise<void>;
}

interface BaseRequestExpectationState<T> extends Expectation<T> {
  readonly request: Promise<Protocol.Network.Request>;
  readonly response: Promise<Protocol.Network.Response>;
  readonly responseBody: Promise<readonly [string, boolean]>;
}

export class BaseRequestExpectation<T extends ExpectedRequest | ExpectedResponse = ExpectedRequest> {
  protected readonly state: BaseRequestExpectationState<T>;

  public constructor(
    tab: Tab,
    matcher: UrlMatcher<Protocol.Network.Events.RequestWillBeSentEvent>,
    options?: WaitOptions,
  );
  public constructor(
    tab: Tab,
    matcher: UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>,
    options?: WaitOptions,
  );
  public constructor(
    tab: Tab,
    matcher: UrlMatcher<Protocol.Network.Events.RequestWillBeSentEvent> | UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>,
    options: WaitOptions = {},
  ) {
    this.state = (new.target === ResponseExpectation
      ? createResponseExpectationState(tab, matcher as UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>, options)
      : createRequestExpectationState(tab, matcher as UrlMatcher<Protocol.Network.Events.RequestWillBeSentEvent>, options)) as BaseRequestExpectationState<T>;
  }

  public get ready(): Promise<void> { return this.state.ready; }
  public get request(): Promise<Protocol.Network.Request> { return this.state.request; }
  public get response(): Promise<Protocol.Network.Response> { return this.state.response; }
  public get responseBody(): Promise<readonly [string, boolean]> { return this.state.responseBody; }
  public cancel(reason?: unknown): Promise<void> { return this.state.cancel(reason); }
  public reset(): Promise<void> { return this.state.reset(); }
  public async aenter(): Promise<this> {
    await this.ready;
    return this;
  }
  public aexit(..._args: readonly unknown[]): Promise<void> { return this.cancel(); }
  public [Symbol.asyncDispose](): Promise<void> { return this.state[Symbol.asyncDispose](); }
}

export class RequestExpectation extends BaseRequestExpectation<ExpectedRequest> implements Expectation<ExpectedRequest> {
  public get value(): Promise<ExpectedRequest> { return this.state.value; }
}

export class ResponseExpectation extends BaseRequestExpectation<ExpectedResponse> implements Expectation<ExpectedResponse> {
  public get value(): Promise<ExpectedResponse> { return this.state.value; }
}

export interface InterceptionOptions {
  readonly url?: string | RegExp | ((event: Protocol.Fetch.Events.RequestPausedEvent) => boolean | Promise<boolean>);
  readonly urlPattern?: string;
  readonly stage?: Protocol.Fetch.RequestStage;
  readonly resourceType?: Protocol.Network.ResourceType;
}

export interface NextInterceptionOptions extends WaitOptions {}

export class BaseFetchInterception {
  readonly #tab: Tab;
  readonly #options: InterceptionOptions;
  readonly #queued: InterceptedRequest[] = [];
  readonly #active = new Set<InterceptedRequest>();
  readonly #waiters: Array<{
    readonly resolve: (request: InterceptedRequest) => void;
    readonly reject: (reason: unknown) => void;
    readonly cleanup: () => void;
  }> = [];
  #off: () => void = () => {};
  #closed = false;
  #ready: Promise<void> = Promise.resolve();
  #current: InterceptedRequest | undefined;
  #currentPromise: Promise<InterceptedRequest> | undefined;

  public get ready(): Promise<void> { return this.#ready; }

  public constructor(tab: Tab, options?: InterceptionOptions);
  public constructor(
    tab: Tab,
    urlPattern: string,
    requestStage: Protocol.Fetch.RequestStage,
    resourceType: Protocol.Network.ResourceType,
  );
  public constructor(
    tab: Tab,
    optionsOrPattern: InterceptionOptions | string = {},
    requestStage?: Protocol.Fetch.RequestStage,
    resourceType?: Protocol.Network.ResourceType,
  ) {
    this.#tab = tab;
    if (typeof optionsOrPattern === "string") {
      if (requestStage === undefined || resourceType === undefined) {
        throw new TypeError("requestStage and resourceType are required with a URL pattern");
      }
      this.#options = { urlPattern: optionsOrPattern, stage: requestStage, resourceType };
    } else {
      this.#options = optionsOrPattern;
    }
    this.#install();
  }

  #install(): void {
    this.#closed = false;
    this.#off = this.#tab.on("Fetch.requestPaused", (event) => this.#paused(event));
    const pattern: Protocol.Fetch.RequestPattern = {
      ...(this.#options.urlPattern === undefined ? {} : { urlPattern: this.#options.urlPattern }),
      ...(this.#options.stage === undefined ? {} : { requestStage: this.#options.stage }),
      ...(this.#options.resourceType === undefined ? {} : { resourceType: this.#options.resourceType }),
    };
    this.#ready = this.#tab.send("Fetch.enable", { patterns: [pattern] }).then(() => undefined).catch((error: unknown) => {
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

  /** The current paused request, matching Zendriver's awaitable interception facade. */
  public get request(): Promise<Protocol.Network.Request> {
    return this.#currentRequest().then((request) => request.request);
  }

  public get responseBody(): Promise<readonly [string, boolean]> {
    return this.#currentRequest().then((request) => request.responseBody);
  }

  public continueRequest(params?: Omit<Protocol.Fetch.Commands.ContinueRequestParams, "requestId">): Promise<void>;
  public continueRequest(
    url?: string,
    method?: string,
    postData?: string,
    headers?: Protocol.Fetch.HeaderEntry[],
    interceptResponse?: boolean,
  ): Promise<void>;
  public continueRequest(
    paramsOrUrl?: Omit<Protocol.Fetch.Commands.ContinueRequestParams, "requestId"> | string,
    method?: string,
    postData?: string,
    headers?: Protocol.Fetch.HeaderEntry[],
    interceptResponse?: boolean,
  ): Promise<void> {
    const params = paramsOrUrl !== undefined && typeof paramsOrUrl === "object"
      ? paramsOrUrl
      : {
          ...(paramsOrUrl === undefined ? {} : { url: paramsOrUrl }),
          ...(method === undefined ? {} : { method }),
          ...(postData === undefined ? {} : { postData }),
          ...(headers === undefined ? {} : { headers }),
          ...(interceptResponse === undefined ? {} : { interceptResponse }),
        };
    return this.#currentRequest().then((request) => request.continueRequest(params));
  }

  public continueResponse(params?: Omit<Protocol.Fetch.Commands.ContinueResponseParams, "requestId">): Promise<void>;
  public continueResponse(
    responseCode?: number,
    responsePhrase?: string,
    responseHeaders?: Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
  ): Promise<void>;
  public continueResponse(
    paramsOrCode?: Omit<Protocol.Fetch.Commands.ContinueResponseParams, "requestId"> | number,
    responsePhrase?: string,
    responseHeaders?: Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
  ): Promise<void> {
    const params = paramsOrCode !== undefined && typeof paramsOrCode === "object"
      ? paramsOrCode
      : {
          ...(paramsOrCode === undefined ? {} : { responseCode: paramsOrCode }),
          ...(responsePhrase === undefined ? {} : { responsePhrase }),
          ...(responseHeaders === undefined ? {} : { responseHeaders }),
          ...(binaryResponseHeaders === undefined ? {} : { binaryResponseHeaders }),
        };
    return this.#currentRequest().then((request) => request.continueResponse(params));
  }

  public failRequest(errorReason: Protocol.Network.ErrorReason): Promise<void> {
    return this.#currentRequest().then((request) => request.failRequest(errorReason));
  }

  public fulfillRequest(
    responseCode: number,
    options?: Omit<Protocol.Fetch.Commands.FulfillRequestParams, "requestId" | "responseCode">,
  ): Promise<void>;
  public fulfillRequest(
    responseCode: number,
    responseHeaders?: Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
    body?: string,
    responsePhrase?: string,
  ): Promise<void>;
  public fulfillRequest(
    responseCode: number,
    optionsOrHeaders?: Omit<Protocol.Fetch.Commands.FulfillRequestParams, "requestId" | "responseCode"> | Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
    body?: string,
    responsePhrase?: string,
  ): Promise<void> {
    const options = optionsOrHeaders === undefined || Array.isArray(optionsOrHeaders)
      ? {
          ...(optionsOrHeaders === undefined ? {} : { responseHeaders: optionsOrHeaders }),
          ...(binaryResponseHeaders === undefined ? {} : { binaryResponseHeaders }),
          ...(body === undefined ? {} : { body }),
          ...(responsePhrase === undefined ? {} : { responsePhrase }),
        }
      : optionsOrHeaders;
    return this.#currentRequest().then((request) => request.fulfillRequest(responseCode, options));
  }

  async #currentRequest(): Promise<InterceptedRequest> {
    if (this.#current?.handled === true) {
      this.#current = undefined;
      this.#currentPromise = undefined;
    }
    if (this.#current !== undefined) return this.#current;
    if (this.#currentPromise === undefined) {
      this.#currentPromise = this.next().then((request) => {
        this.#current = request;
        return request;
      });
    }
    return this.#currentPromise;
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

  public async aenter(): Promise<this> {
    await this.ready;
    return this;
  }

  public aexit(..._args: readonly unknown[]): Promise<void> {
    return this.close();
  }

  public async reset(): Promise<void> {
    await this.close();
    this.#queued.length = 0;
    this.#active.clear();
    this.#current = undefined;
    this.#currentPromise = undefined;
    this.#install();
    await this.#ready;
  }

  public [Symbol.asyncIterator](): AsyncIterator<InterceptedRequest> {
    return {
      next: async (): Promise<IteratorResult<InterceptedRequest>> => ({ value: await this.next(), done: false }),
      return: async (): Promise<IteratorResult<InterceptedRequest>> => {
        await this.close();
        return { value: undefined, done: true };
      },
    };
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
      matchesUrl = this.#options.urlPattern !== undefined
        ? true
        : typeof this.#options.url === "string"
        ? event.request.url.includes(this.#options.url)
        : await matches(this.#options.url, event.request.url, event);
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

export class FetchInterception extends BaseFetchInterception {}

export class InterceptedRequest {
  #handled = false;
  #responseBody: Promise<readonly [string, boolean]> | undefined;

  public constructor(
    private readonly tab: Tab,
    public readonly event: Protocol.Fetch.Events.RequestPausedEvent,
    public readonly stage: Protocol.Fetch.RequestStage,
    private readonly onHandled: () => void = () => {},
  ) {}

  public get request(): Protocol.Network.Request { return this.event.request; }
  public get resourceType(): Protocol.Network.ResourceType { return this.event.resourceType; }
  public get responseStatusCode(): number | undefined { return this.event.responseStatusCode; }
  public get response(): Readonly<{
    statusCode?: number;
    statusText?: string;
    headers?: readonly Protocol.Fetch.HeaderEntry[];
  }> | undefined {
    if (this.stage !== "Response") return undefined;
    return {
      ...(this.event.responseStatusCode === undefined ? {} : { statusCode: this.event.responseStatusCode }),
      ...(this.event.responseStatusText === undefined ? {} : { statusText: this.event.responseStatusText }),
      ...(this.event.responseHeaders === undefined ? {} : { headers: this.event.responseHeaders }),
    };
  }
  public get error(): Protocol.Network.ErrorReason | undefined { return this.event.responseErrorReason; }
  public get handled(): boolean { return this.#handled; }

  public get responseBody(): Promise<readonly [string, boolean]> {
    if (this.#responseBody === undefined) {
      this.#responseBody = this.tab.send("Fetch.getResponseBody", { requestId: this.event.requestId }).then((result) => [result.body, result.base64Encoded] as const);
    }
    return this.#responseBody;
  }

  public continueRequest(params?: Omit<Protocol.Fetch.Commands.ContinueRequestParams, "requestId">): Promise<void>;
  public continueRequest(
    url?: string,
    method?: string,
    postData?: string,
    headers?: Protocol.Fetch.HeaderEntry[],
    interceptResponse?: boolean,
  ): Promise<void>;
  public continueRequest(
    paramsOrUrl?: Omit<Protocol.Fetch.Commands.ContinueRequestParams, "requestId"> | string,
    method?: string,
    postData?: string,
    headers?: Protocol.Fetch.HeaderEntry[],
    interceptResponse?: boolean,
  ): Promise<void> {
    const params = paramsOrUrl !== undefined && typeof paramsOrUrl === "object"
      ? paramsOrUrl
      : {
          ...(paramsOrUrl === undefined ? {} : { url: paramsOrUrl }),
          ...(method === undefined ? {} : { method }),
          ...(postData === undefined ? {} : { postData }),
          ...(headers === undefined ? {} : { headers }),
          ...(interceptResponse === undefined ? {} : { interceptResponse }),
        };
    return this.#handle("Fetch.continueRequest", { requestId: this.event.requestId, ...params });
  }

  public continueResponse(params?: Omit<Protocol.Fetch.Commands.ContinueResponseParams, "requestId">): Promise<void>;
  public continueResponse(
    responseCode?: number,
    responsePhrase?: string,
    responseHeaders?: Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
  ): Promise<void>;
  public continueResponse(
    paramsOrCode?: Omit<Protocol.Fetch.Commands.ContinueResponseParams, "requestId"> | number,
    responsePhrase?: string,
    responseHeaders?: Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
  ): Promise<void> {
    const params = paramsOrCode !== undefined && typeof paramsOrCode === "object"
      ? paramsOrCode
      : {
          ...(paramsOrCode === undefined ? {} : { responseCode: paramsOrCode }),
          ...(responsePhrase === undefined ? {} : { responsePhrase }),
          ...(responseHeaders === undefined ? {} : { responseHeaders }),
          ...(binaryResponseHeaders === undefined ? {} : { binaryResponseHeaders }),
        };
    return this.#handle("Fetch.continueResponse", { requestId: this.event.requestId, ...params });
  }

  public continue(): Promise<void> {
    return this.stage === "Response" ? this.continueResponse() : this.continueRequest();
  }

  public failRequest(errorReason: Protocol.Network.ErrorReason): Promise<void> {
    return this.#handle("Fetch.failRequest", { requestId: this.event.requestId, errorReason });
  }

  public fulfillRequest(
    responseCode: number,
    options?: Omit<Protocol.Fetch.Commands.FulfillRequestParams, "requestId" | "responseCode">,
  ): Promise<void>;
  public fulfillRequest(
    responseCode: number,
    responseHeaders?: Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
    body?: string,
    responsePhrase?: string,
  ): Promise<void>;
  public fulfillRequest(
    responseCode: number,
    optionsOrHeaders?: Omit<Protocol.Fetch.Commands.FulfillRequestParams, "requestId" | "responseCode"> | Protocol.Fetch.HeaderEntry[],
    binaryResponseHeaders?: string,
    body?: string,
    responsePhrase?: string,
  ): Promise<void> {
    const options = optionsOrHeaders === undefined || Array.isArray(optionsOrHeaders)
      ? {
          ...(optionsOrHeaders === undefined ? {} : { responseHeaders: optionsOrHeaders }),
          ...(binaryResponseHeaders === undefined ? {} : { binaryResponseHeaders }),
          ...(body === undefined ? {} : { body }),
          ...(responsePhrase === undefined ? {} : { responsePhrase }),
        }
      : optionsOrHeaders;
    return this.#handle("Fetch.fulfillRequest", { requestId: this.event.requestId, responseCode, ...options });
  }

  public async body(): Promise<Buffer> {
    if (this.stage !== "Response") throw new Error("Response body is only available at the response interception stage");
    if (this.#handled) throw new Error("Intercepted request was already handled");
    const [body, base64Encoded] = await this.responseBody;
    return Buffer.from(body, base64Encoded ? "base64" : "utf8");
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

function createRequestExpectationState(
  tab: Tab,
  matcher: UrlMatcher<Protocol.Network.Events.RequestWillBeSentEvent>,
  options: WaitOptions = {},
): BaseRequestExpectationState<ExpectedRequest> {
  const bodies = new Map<Protocol.Network.RequestId, Promise<readonly [string, boolean]>>();
  const responses = new Map<Protocol.Network.RequestId, Promise<Protocol.Network.Response>>();
  const responseEvents = new Map<Protocol.Network.RequestId, Protocol.Network.Response>();
  const finished = new Set<Protocol.Network.RequestId>();
  const failures = new Map<Protocol.Network.RequestId, Error>();
  const bodyStates = new Map<Protocol.Network.RequestId, {
    readonly resolve: (value: readonly [string, boolean]) => void;
    readonly reject: (reason: unknown) => void;
    started: boolean;
  }>();
  const responseStates = new Map<Protocol.Network.RequestId, {
    readonly resolve: (value: Protocol.Network.Response) => void;
    readonly reject: (reason: unknown) => void;
  }>();
  const loadBody = async (requestId: Protocol.Network.RequestId): Promise<void> => {
    const state = bodyStates.get(requestId);
    if (state === undefined || state.started || !finished.has(requestId)) return;
    state.started = true;
    try {
      const body = await tab.send("Network.getResponseBody", { requestId }, commandOptions(options));
      state.resolve([body.body, body.base64Encoded]);
    } catch (error) {
      state.reject(error);
    }
  };
  const expectation = networkExpectation(tab, `request matching ${describeMatcher(matcher)}`, options, (finish, _fail, control) => [
    tab.on("Network.requestWillBeSent", async (event) => {
      if (await matches(matcher, event.request.url, event) !== true) return;
      let resolveBody: (value: readonly [string, boolean]) => void = () => {};
      let rejectBody: (reason: unknown) => void = () => {};
      let resolveResponse: (value: Protocol.Network.Response) => void = () => {};
      let rejectResponse: (reason: unknown) => void = () => {};
      const bodyPromise = new Promise<readonly [string, boolean]>((resolve, reject) => { resolveBody = resolve; rejectBody = reject; });
      const responsePromise = new Promise<Protocol.Network.Response>((resolve, reject) => { resolveResponse = resolve; rejectResponse = reject; });
      bodies.set(event.requestId, bodyPromise);
      responses.set(event.requestId, responsePromise);
      bodyStates.set(event.requestId, { resolve: resolveBody, reject: rejectBody, started: false });
      responseStates.set(event.requestId, { resolve: resolveResponse, reject: rejectResponse });
      const response = responseEvents.get(event.requestId);
      if (response !== undefined) resolveResponse(response);
      const failure = failures.get(event.requestId);
      if (failure !== undefined) {
        rejectResponse(failure);
        rejectBody(failure);
      } else {
        void loadBody(event.requestId);
      }
      control.keepAlive(Promise.allSettled([bodyPromise, responsePromise]));
      control.onAbandon(() => {
        const error = new Error("Request expectation was reset");
        rejectResponse(error);
        rejectBody(error);
      });
      void finish(event);
    }),
    tab.on("Network.responseReceived", (event) => {
      responseEvents.set(event.requestId, event.response);
      responseStates.get(event.requestId)?.resolve(event.response);
    }),
    tab.on("Network.loadingFinished", (event) => {
      finished.add(event.requestId);
      void loadBody(event.requestId);
    }),
    tab.on("Network.loadingFailed", (event) => {
      const error = new Error(`Network request failed: ${event.errorText}`);
      failures.set(event.requestId, error);
      responseStates.get(event.requestId)?.reject(error);
      bodyStates.get(event.requestId)?.reject(error);
    }),
  ]) as BaseRequestExpectationState<ExpectedRequest>;
  Object.defineProperty(expectation, "responseBody", {
    enumerable: true,
    get: (): Promise<readonly [string, boolean]> => expectation.value.then((event) => bodies.get(event.requestId) ?? Promise.reject(new Error("Request body is unavailable"))).then((body) => body),
  });
  Object.defineProperty(expectation, "request", {
    enumerable: true,
    get: (): Promise<Protocol.Network.Request> => expectation.value.then((event) => event.request),
  });
  Object.defineProperty(expectation, "response", {
    enumerable: true,
    get: (): Promise<Protocol.Network.Response> => expectation.value.then((event) => responses.get(event.requestId) ?? Promise.reject(new Error("Response is unavailable"))).then((response) => response),
  });
  return expectation;
}

function createResponseExpectationState(
  tab: Tab,
  matcher: UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>,
  options: WaitOptions = {},
): BaseRequestExpectationState<ExpectedResponse> {
  const bodies = new Map<Protocol.Network.RequestId, Promise<readonly [string, boolean]>>();
  const bodyStates = new Map<Protocol.Network.RequestId, {
    readonly resolve: (value: readonly [string, boolean]) => void;
    readonly reject: (reason: unknown) => void;
    started: boolean;
  }>();
  const finished = new Set<Protocol.Network.RequestId>();
  const failures = new Map<Protocol.Network.RequestId, Error>();
  const requests = new Map<Protocol.Network.RequestId, Protocol.Network.Events.RequestWillBeSentEvent>();
  const matchedRequests = new Map<Protocol.Network.RequestId, Protocol.Network.Request>();
  const expectation = networkExpectation(tab, `response matching ${describeMatcher(matcher)}`, options, (finish, fail, control) => {
    const matchedRequestIds = new Set<Protocol.Network.RequestId>();
    const loadBody = async (requestId: Protocol.Network.RequestId): Promise<void> => {
      const state = bodyStates.get(requestId);
      if (state === undefined || state.started || !finished.has(requestId)) return;
      state.started = true;
      try {
        const body = await tab.send("Network.getResponseBody", { requestId }, commandOptions(options));
        state.resolve([body.body, body.base64Encoded]);
      } catch (error) {
        state.reject(error);
      }
    };
    return [
      tab.on("Network.requestWillBeSent", (event) => {
        requests.set(event.requestId, event);
        if (typeof matcher === "function" || matchedRequestIds.has(event.requestId)) return;
        if (matchesUrlPattern(matcher, event.request.url)) {
          matchedRequestIds.add(event.requestId);
          matchedRequests.set(event.requestId, event.request);
        }
      }),
      tab.on("Network.responseReceived", async (event) => {
        if (typeof matcher === "function") {
          if (await matcher(event) !== true) return;
          matchedRequestIds.add(event.requestId);
          const request = requests.get(event.requestId)?.request;
          if (request !== undefined) matchedRequests.set(event.requestId, request);
        } else if (!matchedRequestIds.has(event.requestId)) {
          return;
        }
        let resolveBody: (value: readonly [string, boolean]) => void = () => {};
        let rejectBody: (reason: unknown) => void = () => {};
        const bodyPromise = new Promise<readonly [string, boolean]>((resolve, reject) => { resolveBody = resolve; rejectBody = reject; });
        bodies.set(event.requestId, bodyPromise);
        bodyStates.set(event.requestId, { resolve: resolveBody, reject: rejectBody, started: false });
        matchedRequestIds.add(event.requestId);
        const failure = failures.get(event.requestId);
        if (failure !== undefined) rejectBody(failure);
        else void loadBody(event.requestId);
        control.keepAlive(bodyPromise);
        control.onAbandon(() => { rejectBody(new Error("Response expectation was reset")); });
        await finish(event);
      }),
      tab.on("Network.loadingFinished", (event) => {
        finished.add(event.requestId);
        void loadBody(event.requestId);
      }),
      tab.on("Network.loadingFailed", async (event) => {
        const error = new Error(`Network request failed: ${event.errorText}`);
        failures.set(event.requestId, error);
        bodyStates.get(event.requestId)?.reject(error);
        if (matchedRequestIds.has(event.requestId)) await fail(error);
      }),
    ];
  }) as BaseRequestExpectationState<ExpectedResponse>;
  Object.defineProperty(expectation, "responseBody", {
    enumerable: true,
    get: (): Promise<readonly [string, boolean]> => expectation.value.then((event) => bodies.get(event.requestId) ?? Promise.reject(new Error("Response body is unavailable"))).then((body) => body),
  });
  Object.defineProperty(expectation, "request", {
    enumerable: true,
    get: (): Promise<Protocol.Network.Request> => expectation.value.then((event) => matchedRequests.get(event.requestId) ?? Promise.reject(new Error("Request is unavailable"))).then((request) => request),
  });
  Object.defineProperty(expectation, "response", {
    enumerable: true,
    get: (): Promise<Protocol.Network.Response> => expectation.value.then((event) => event.response),
  });
  return expectation;
}

export function expectRequest(
  tab: Tab,
  matcher: UrlMatcher<Protocol.Network.Events.RequestWillBeSentEvent>,
  options: WaitOptions = {},
): RequestExpectation {
  return new RequestExpectation(tab, matcher, options);
}

export function expectResponse(
  tab: Tab,
  matcher: UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>,
  options: WaitOptions = {},
): ResponseExpectation {
  return new ResponseExpectation(tab, matcher, options);
}

function networkExpectation<T>(
  tab: Tab,
  description: string,
  options: WaitOptions,
  listen: (
    finish: (value: T) => Promise<void>,
    fail: (reason: unknown) => Promise<void>,
    control: {
      keepAlive(promise: Promise<unknown>): void;
      onAbandon(cleanup: () => void): void;
    },
  ) => readonly (() => void)[],
): Expectation<T> {
  type Cycle = {
    readonly ready: Promise<void>;
    readonly value: Promise<T>;
    readonly fail: (reason: unknown) => Promise<void>;
    readonly abandon: () => Promise<void>;
  };
  const timeoutMs = options.timeoutMs ?? 10_000;
  let cycle: Cycle;
  let activeReady: Promise<void>;
  let activeValue: Promise<T>;
  const createCycle = (): Cycle => {
    let resolveValue: (value: T) => void = () => {};
    let rejectValue: (reason: unknown) => void = () => {};
    let release: (() => Promise<void>) | undefined;
    let settled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let abort: () => void = () => {};
    let listeners: readonly (() => void)[] = [];
    let cleanupPromise: Promise<void> | undefined;
    let abandoned = false;
    const keepAlive: Promise<unknown>[] = [];
    const abandoners: (() => void)[] = [];
    const value = new Promise<T>((resolve, reject) => { resolveValue = resolve; rejectValue = reject; });
    const cleanup = (): Promise<void> => {
      if (cleanupPromise !== undefined) return cleanupPromise;
      if (timeout !== undefined) clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abort);
      cleanupPromise = (async () => {
        await Promise.allSettled(keepAlive);
        for (const off of listeners) off();
        await release?.();
      })();
      return cleanupPromise;
    };
    const finish = async (result: T): Promise<void> => {
      if (settled) return;
      settled = true;
      resolveValue(result);
      try { await cleanup(); } catch { /* The matched result still settles the expectation. */ }
    };
    const fail = async (reason: unknown): Promise<void> => {
      if (settled) return;
      settled = true;
      try { await cleanup(); } catch { /* Preserve the original failure. */ }
      rejectValue(reason);
    };
    const abandon = async (): Promise<void> => {
      if (abandoned) return cleanup();
      abandoned = true;
      for (const cleanup of abandoners) cleanup();
      if (!settled) {
        settled = true;
        rejectValue(new CdpAbortError(`Wait for ${description}`));
      }
      try { await cleanup(); } catch { /* Reset must preserve the next cycle. */ }
    };
    listeners = listen(finish, fail, {
      keepAlive: (promise) => { keepAlive.push(promise); },
      onAbandon: (cleanup) => { abandoners.push(cleanup); },
    });
    timeout = setTimeout(() => { void fail(new CdpTimeoutError(`Wait for ${description}`, timeoutMs)); }, timeoutMs);
    abort = (): void => { void fail(new CdpAbortError(`Wait for ${description}`, { cause: options.signal?.reason })); };
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
    return { ready, value, fail, abandon };
  };
  cycle = createCycle();
  activeReady = cycle.ready;
  activeValue = cycle.value;
  const dispose = async (): Promise<void> => {
    if (cycle.value === activeValue) {
      await cycle.fail(new CdpAbortError(`Wait for ${description}`));
      await cycle.abandon();
    }
  };
  const expectation: Expectation<T> = {
    get ready(): Promise<void> { return activeReady; },
    get value(): Promise<T> { return activeValue; },
    cancel: async (reason?: unknown) => {
      if (reason === undefined) return dispose();
      await cycle.fail(new CdpAbortError(`Wait for ${description}`, { cause: reason }));
      await cycle.abandon();
    },
    reset: async () => {
      void activeValue.catch(() => undefined);
      await cycle.abandon();
      cycle = createCycle();
      activeReady = cycle.ready;
      activeValue = cycle.value;
      await activeReady;
    },
    [Symbol.asyncDispose]: dispose,
  };
  return expectation;
}

function commandOptions(options: WaitOptions): SendOptions {
  return {
    ...(options.timeoutMs === undefined ? {} : { timeoutMs: options.timeoutMs }),
    ...(options.signal === undefined ? {} : { signal: options.signal }),
  };
}

async function matches<T>(matcher: UrlMatcher<T> | undefined, url: string, event: T): Promise<boolean> {
  if (matcher === undefined) return true;
  if (typeof matcher !== "function") return matchesUrlPattern(matcher, url);
  return matcher(event);
}

function matchesUrlPattern(matcher: string | RegExp, url: string): boolean {
  if (typeof matcher === "string") return new RegExp(`^(?:${matcher})$`).test(url);
  matcher.lastIndex = 0;
  const match = matcher.exec(url);
  return match?.[0] === url;
}

function describeMatcher<T>(matcher: UrlMatcher<T>): string {
  return typeof matcher === "string" ? JSON.stringify(matcher) : matcher.toString();
}
