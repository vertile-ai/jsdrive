import { writeFile } from "node:fs/promises";
import type {
  CommandParams,
  CommandResult,
  EventPayload,
  Protocol,
  ProtocolCommand,
  ProtocolEvent,
} from "@nodriver/protocol";
import {
  CdpAbortError,
  CdpConnection,
  CdpTimeoutError,
  type EventMetadata,
  type SendOptions,
} from "@nodriver/runtime-js";
import { Element } from "./element.js";
import {
  downloadFile as downloadFileToPath,
  expectDownload as createDownloadExpectation,
  setDownloadPath as configureDownloadPath,
  type DownloadOptions,
  type DownloadResult,
} from "./download.js";
import {
  expectRequest as createRequestExpectation,
  expectResponse as createResponseExpectation,
  FetchInterception,
  type Expectation,
  type ExpectedRequest,
  type ExpectedResponse,
  type InterceptionOptions,
  type UrlMatcher,
} from "./network.js";

export interface WaitOptions {
  readonly timeoutMs?: number;
  readonly intervalMs?: number;
  readonly signal?: AbortSignal;
}

export interface WaitForOptions extends WaitOptions {
  readonly selector?: string;
  readonly text?: string;
  readonly bestMatch?: boolean;
}

export interface ScreenshotOptions extends Protocol.Page.Commands.CaptureScreenshotParams {
  readonly fullPage?: boolean;
}

export type ReadyState = "loading" | "interactive" | "complete";
export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen";

export class TargetClosedError extends Error {
  public constructor(public readonly targetId: string) {
    super(`CDP target closed: ${targetId}`);
    this.name = "TargetClosedError";
  }
}

export class TargetCrashedError extends Error {
  public constructor(
    public readonly targetId: string,
    public readonly status: string,
    public readonly errorCode: number,
  ) {
    super(`CDP target crashed: ${targetId} (${status}, ${errorCode})`);
    this.name = "TargetCrashedError";
  }
}

export class Tab {
  #failure: TargetClosedError | TargetCrashedError | undefined;
  #downloadPath: string | undefined;

  public constructor(
    public readonly targetId: string,
    public readonly connection: CdpConnection,
    public readonly sessionId?: string,
    public readonly browserConnection: CdpConnection = connection,
    public readonly webSocketUrl?: string,
  ) {}

  public get enabledDomains(): ReadonlySet<string> {
    return this.connection.enabledDomains;
  }

  public get closed(): boolean {
    return this.#failure instanceof TargetClosedError;
  }

  public get crashed(): boolean {
    return this.#failure instanceof TargetCrashedError;
  }

  public send<M extends ProtocolCommand>(
    method: M,
    ...args: CommandParams<M> extends undefined
      ? [params?: undefined, options?: SendOptions]
      : [params: CommandParams<M>, options?: SendOptions]
  ): Promise<CommandResult<M>> {
    this.#assertAvailable();
    const options = this.#mergeOptions(args[1]);
    return this.connection.sendRaw(method, args[0], options) as Promise<CommandResult<M>>;
  }

  public sendRaw(method: string, params?: unknown, options?: SendOptions): Promise<Readonly<Record<string, unknown>>> {
    this.#assertAvailable();
    return this.connection.sendRaw(method, params, this.#mergeOptions(options));
  }

  public on<E extends ProtocolEvent>(
    method: E,
    handler: (params: EventPayload<E>, metadata: EventMetadata) => void | Promise<void>,
  ): () => void;
  public on(
    method: string,
    handler: (params: unknown, metadata: EventMetadata) => void | Promise<void>,
  ): () => void;
  public on(
    method: string,
    handler: (params: unknown, metadata: EventMetadata) => void | Promise<void>,
  ): () => void {
    return this.connection.on(method, (params: unknown, metadata: EventMetadata) => {
      if (metadata.sessionId === this.sessionId) return handler(params, metadata);
    });
  }

  public async acquireDomain(domain: string, options: SendOptions = {}): Promise<() => Promise<void>> {
    const bound = this.#mergeOptions(options);
    if (this.connection.domainPolicy === "manual") {
      await this.connection.enableDomain(domain, bound);
      return async () => {};
    }
    return this.connection.acquireDomain(domain, bound);
  }

  public expectRequest(
    matcher: UrlMatcher<Protocol.Network.Events.RequestWillBeSentEvent>,
    options: WaitOptions = {},
  ): Expectation<ExpectedRequest> {
    return createRequestExpectation(this, matcher, options);
  }

  public expectResponse(
    matcher: UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>,
    options: WaitOptions = {},
  ): Expectation<ExpectedResponse> {
    return createResponseExpectation(this, matcher, options);
  }

  public intercept(options: InterceptionOptions = {}): FetchInterception {
    return new FetchInterception(this, options);
  }

  public async setDownloadPath(path: string): Promise<string> {
    this.#downloadPath = await configureDownloadPath(this, path);
    return this.#downloadPath;
  }

  public expectDownload(
    matcher: UrlMatcher<Protocol.Browser.Events.DownloadWillBeginEvent> = () => true,
    options: DownloadOptions = {},
  ): Expectation<DownloadResult> {
    return createDownloadExpectation(this, this.#downloadPath, matcher, options);
  }

  public downloadFile(url: string, destination: string, options: WaitOptions = {}): Promise<DownloadResult> {
    return downloadFileToPath(this, url, destination, options);
  }

  public async get(url: string, options: WaitOptions = {}): Promise<Protocol.Page.Commands.NavigateResult> {
    return this.navigate(url, options.timeoutMs ?? 10_000, options.signal);
  }

  public async navigate(url: string, timeoutMs = 10_000, signal?: AbortSignal): Promise<Protocol.Page.Commands.NavigateResult> {
    this.#assertAvailable();
    const options = this.#options(timeoutMs, signal);
    const release = this.connection.domainPolicy === "manual"
      ? (await this.connection.enableDomain("Page", options), async () => {})
      : await this.connection.acquireDomain("Page", options);
    const load = this.#waitForLoad(timeoutMs, signal);
    try {
      let result: Protocol.Page.Commands.NavigateResult;
      try {
        result = await this.connection.send("Page.navigate", { url }, options);
      } catch (error) {
        load.cancel();
        await load.promise;
        throw error;
      }
      if (result.errorText !== undefined) throw new Error(`Navigation failed: ${result.errorText}`);
      const loaded = await load.promise;
      if (loaded === "aborted") throw new CdpAbortError("Page load", { cause: signal?.reason });
      if (loaded !== "loaded") throw new CdpTimeoutError("Page load", timeoutMs);
      return result;
    } finally {
      load.cancel();
      await release();
    }
  }

  public async reload(ignoreCache = false, options: WaitOptions = {}): Promise<void> {
    const timeoutMs = options.timeoutMs ?? 10_000;
    const load = this.#waitForLoad(timeoutMs, options.signal);
    try {
      await this.send("Page.reload", { ignoreCache }, this.#options(timeoutMs, options.signal));
      const loaded = await load.promise;
      if (loaded === "aborted") throw new CdpAbortError("Page reload", { cause: options.signal?.reason });
      if (loaded !== "loaded") throw new CdpTimeoutError("Page reload", timeoutMs);
    } finally {
      load.cancel();
      await load.promise;
    }
  }

  public async back(options: WaitOptions = {}): Promise<boolean> {
    return this.#history(-1, options);
  }

  public async forward(options: WaitOptions = {}): Promise<boolean> {
    return this.#history(1, options);
  }

  public async activate(): Promise<void> {
    await this.browserConnection.send("Target.activateTarget", { targetId: this.targetId });
  }

  public bringToFront(): Promise<Protocol.Page.Commands.BringToFrontResult> {
    return this.send("Page.bringToFront");
  }

  public async evaluate<T = unknown>(expression: string, timeoutMs = 10_000, signal?: AbortSignal): Promise<T> {
    const result = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    }, this.#options(timeoutMs, signal));
    if (result.exceptionDetails !== undefined) throw new Error(result.exceptionDetails.text);
    return result.result.value as T;
  }

  public async getContent(): Promise<string> {
    const { root } = await this.send("DOM.getDocument", { depth: 0, pierce: true });
    return (await this.send("DOM.getOuterHTML", { nodeId: root.nodeId, includeShadowDOM: true })).outerHTML;
  }

  public async querySelector(selector: string): Promise<Element | null> {
    const { root } = await this.send("DOM.getDocument", { depth: 0, pierce: true });
    const { nodeId } = await this.send("DOM.querySelector", { nodeId: root.nodeId, selector: selector.trim() });
    return nodeId === 0 ? null : this.elementFromNodeId(nodeId);
  }

  public async querySelectorAll(selector: string): Promise<readonly Element[]> {
    const { root } = await this.send("DOM.getDocument", { depth: 0, pierce: true });
    const { nodeIds } = await this.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: selector.trim() });
    return Promise.all(nodeIds.map((nodeId) => this.elementFromNodeId(nodeId)));
  }

  public select(selector: string, options: WaitOptions = {}): Promise<Element> {
    return this.waitFor(selector, options);
  }

  public async selectAll(selector: string, options: WaitOptions = {}): Promise<readonly Element[]> {
    return this.#poll(async () => {
      const elements = await this.querySelectorAll(selector);
      return elements.length === 0 ? undefined : elements;
    }, `elements matching ${selector}`, options);
  }

  public async find(text: string, bestMatch = false, options: WaitOptions = {}): Promise<Element> {
    return this.#poll(async () => {
      const elements = await this.#search(text, true);
      if (elements.length === 0) return undefined;
      if (!bestMatch) return elements[0];
      const ranked = await Promise.all(elements.map(async (element) => ({ element, length: (await element.getText()).length })));
      ranked.sort((a, b) => Math.abs(a.length - text.length) - Math.abs(b.length - text.length));
      return ranked[0]?.element;
    }, `text ${JSON.stringify(text)}`, options);
  }

  public async findAll(text: string, bestMatch = false, options: WaitOptions = {}): Promise<readonly Element[]> {
    const elements = await this.#poll(async () => {
      const found = await this.#search(text, true);
      return found.length === 0 ? undefined : found;
    }, `text ${JSON.stringify(text)}`, options);
    if (!bestMatch) return elements;
    const ranked = await Promise.all(elements.map(async (element) => ({ element, length: (await element.getText()).length })));
    ranked.sort((a, b) => Math.abs(a.length - text.length) - Math.abs(b.length - text.length));
    return ranked.map(({ element }) => element);
  }

  public async xpath(expression: string, options: WaitOptions = {}): Promise<readonly Element[]> {
    return this.#poll(async () => {
      const elements = await this.#search(expression);
      return elements.length === 0 ? undefined : elements;
    }, `XPath ${expression}`, options);
  }

  public waitFor(selector: string, options?: WaitOptions): Promise<Element>;
  public waitFor(options: WaitForOptions): Promise<Element>;
  public waitFor(selectorOrOptions: string | WaitForOptions, options: WaitOptions = {}): Promise<Element> {
    if (typeof selectorOrOptions === "string") {
      return this.#poll(async () => (await this.querySelector(selectorOrOptions)) ?? undefined, `element matching ${selectorOrOptions}`, options);
    }
    if (selectorOrOptions.selector !== undefined) {
      const selector = selectorOrOptions.selector;
      return this.#poll(
        async () => (await this.querySelector(selector)) ?? undefined,
        `element matching ${selector}`,
        selectorOrOptions,
      );
    }
    if (selectorOrOptions.text !== undefined) {
      return this.find(selectorOrOptions.text, selectorOrOptions.bestMatch ?? false, selectorOrOptions);
    }
    return Promise.reject(new TypeError("waitFor requires selector or text"));
  }

  public async waitForReadyState(state: ReadyState = "complete", options: WaitOptions = {}): Promise<ReadyState> {
    const order: readonly ReadyState[] = ["loading", "interactive", "complete"];
    return this.#poll(async () => {
      const current = await this.evaluate<ReadyState>("document.readyState", options.timeoutMs, options.signal);
      return order.indexOf(current) >= order.indexOf(state) ? current : undefined;
    }, `document readyState ${state}`, options);
  }

  public async waitForIdle(options: WaitOptions & { readonly idleMs?: number } = {}): Promise<void> {
    const idleMs = options.idleMs ?? 500;
    let count = -1;
    let unchangedSince = Date.now();
    await this.#poll(async () => {
      if (await this.evaluate<ReadyState>("document.readyState", options.timeoutMs, options.signal) !== "complete") return undefined;
      const current = await this.evaluate<number>("performance.getEntriesByType('resource').length", options.timeoutMs, options.signal);
      if (current !== count) {
        count = current;
        unchangedSince = Date.now();
      }
      return Date.now() - unchangedSince >= idleMs ? true : undefined;
    }, "page idle", options);
  }

  public getLocalStorage(): Promise<Record<string, string>> {
    return this.evaluate<Record<string, string>>("Object.fromEntries(Object.entries(localStorage))");
  }

  public async setLocalStorage(values: Readonly<Record<string, string | null>>): Promise<void> {
    await this.evaluate(`(() => { for (const [key, value] of Object.entries(${JSON.stringify(values)})) value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); })()`);
  }

  public setUserAgent(userAgent: string, acceptLanguage?: string, platform?: string): Promise<Protocol.Emulation.Commands.SetUserAgentOverrideResult> {
    const params: Protocol.Emulation.Commands.SetUserAgentOverrideParams = {
      userAgent,
      ...(acceptLanguage === undefined ? {} : { acceptLanguage }),
      ...(platform === undefined ? {} : { platform }),
    };
    return this.send("Emulation.setUserAgentOverride", params);
  }

  public async screenshotB64(options: ScreenshotOptions = {}): Promise<string> {
    const { fullPage = false, ...capture } = options;
    let params: Protocol.Page.Commands.CaptureScreenshotParams = { ...capture };
    if (fullPage) {
      const { cssContentSize } = await this.send("Page.getLayoutMetrics");
      params = { ...capture, clip: { ...cssContentSize, scale: 1 }, captureBeyondViewport: true };
    }
    return (await this.send("Page.captureScreenshot", params)).data;
  }

  public async saveScreenshot(path: string, options: ScreenshotOptions = {}): Promise<string> {
    await writeFile(path, Buffer.from(await this.screenshotB64(options), "base64"));
    return path;
  }

  public async printToPdf(path?: string, options: Protocol.Page.Commands.PrintToPDFParams = {}): Promise<string> {
    const data = (await this.send("Page.printToPDF", { ...options, transferMode: "ReturnAsBase64" })).data;
    if (path !== undefined) await writeFile(path, Buffer.from(data, "base64"));
    return data;
  }

  public async saveSnapshot(path?: string): Promise<string> {
    const data = (await this.send("Page.captureSnapshot", { format: "mhtml" })).data;
    if (path !== undefined) await writeFile(path, data, "utf8");
    return data;
  }

  public async scrollDown(amount = 500): Promise<void> {
    await this.evaluate(`window.scrollBy({ top: ${amount}, behavior: "instant" })`);
  }

  public async scrollUp(amount = 500): Promise<void> {
    await this.scrollDown(-amount);
  }

  public getWindow(): Promise<Protocol.Browser.Commands.GetWindowForTargetResult> {
    return this.browserConnection.send("Browser.getWindowForTarget", { targetId: this.targetId });
  }

  public async setWindowState(windowState: WindowState): Promise<void> {
    const { windowId } = await this.getWindow();
    await this.browserConnection.send("Browser.setWindowBounds", { windowId, bounds: { windowState } });
  }

  public async setWindowSize(width: number, height: number): Promise<void> {
    const { windowId } = await this.getWindow();
    await this.browserConnection.send("Browser.setWindowBounds", { windowId, bounds: { width, height } });
  }

  public maximize(): Promise<void> { return this.setWindowState("maximized"); }
  public minimize(): Promise<void> { return this.setWindowState("minimized"); }
  public fullscreen(): Promise<void> { return this.setWindowState("fullscreen"); }

  public async mouseMove(x: number, y: number): Promise<void> {
    await this.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  }

  public async mouseClick(x: number, y: number, button: Protocol.Input.MouseButton = "left"): Promise<void> {
    const buttons = mouseButtonMask(button);
    await this.send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button, buttons, clickCount: 1 });
    await this.send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button, buttons: 0, clickCount: 1 });
  }

  public async elementFromNodeId(nodeId: Protocol.DOM.NodeId): Promise<Element> {
    const { node } = await this.send("DOM.describeNode", { nodeId, depth: 0, pierce: true });
    return new Element(this, node.backendNodeId, node);
  }

  public close(): void {
    if (this.sessionId === undefined) this.connection.close();
  }

  public markClosed(): void {
    this.#failure = new TargetClosedError(this.targetId);
    this.close();
  }

  public markCrashed(status: string, errorCode: number): void {
    this.#failure = new TargetCrashedError(this.targetId, status, errorCode);
  }

  #options(timeoutMs: number, signal?: AbortSignal): SendOptions {
    return {
      timeoutMs,
      ...(signal === undefined ? {} : { signal }),
      ...(this.sessionId === undefined ? {} : { sessionId: this.sessionId }),
    };
  }

  #mergeOptions(options: SendOptions = {}): SendOptions {
    if (options.sessionId !== undefined) {
      if (this.sessionId === undefined) {
        throw new Error(`Direct Tab ${this.targetId} cannot send to CDP session ${options.sessionId}`);
      }
      if (options.sessionId !== this.sessionId) {
        throw new Error(`Tab ${this.targetId} cannot send to CDP session ${options.sessionId}`);
      }
    }
    if (this.sessionId === undefined) return options;
    return { ...options, sessionId: this.sessionId };
  }

  async #history(offset: -1 | 1, options: WaitOptions): Promise<boolean> {
    const history = await this.send("Page.getNavigationHistory");
    const entry = history.entries[history.currentIndex + offset];
    if (entry === undefined) return false;
    const timeoutMs = options.timeoutMs ?? 10_000;
    const load = this.#waitForLoad(timeoutMs, options.signal);
    try {
      await this.send("Page.navigateToHistoryEntry", { entryId: entry.id }, this.#options(timeoutMs, options.signal));
      const loaded = await load.promise;
      if (loaded === "aborted") throw new CdpAbortError("History navigation", { cause: options.signal?.reason });
      if (loaded !== "loaded") throw new CdpTimeoutError("History navigation", timeoutMs);
      return true;
    } finally {
      load.cancel();
      await load.promise;
    }
  }

  async #search(query: string, visibleTextOnly = false): Promise<readonly Element[]> {
    await this.send("DOM.getDocument", { depth: 0, pierce: true });
    const { searchId, resultCount } = await this.send("DOM.performSearch", { query, includeUserAgentShadowDOM: true });
    try {
      if (resultCount === 0) return [];
      const { nodeIds } = await this.send("DOM.getSearchResults", { searchId, fromIndex: 0, toIndex: resultCount });
      const found = await Promise.all(nodeIds.map(async (nodeId) => {
        const element = await this.elementFromNodeId(nodeId);
        if (element.nodeType === 1) return element;
        if (element.parentNodeId !== undefined) return this.elementFromNodeId(element.parentNodeId);
        const { object } = await this.send("DOM.resolveNode", { nodeId });
        const nodeObjectId = object.objectId;
        if (nodeObjectId === undefined) return undefined;
        try {
          const parent = await this.send("Runtime.callFunctionOn", {
            objectId: nodeObjectId,
            functionDeclaration: "function () { return this.parentElement; }",
            returnByValue: false,
          });
          const parentObjectId = parent.result.objectId;
          if (parentObjectId === undefined) return undefined;
          try {
            const requested = await this.send("DOM.requestNode", { objectId: parentObjectId });
            return requested.nodeId === 0 ? undefined : this.elementFromNodeId(requested.nodeId);
          } finally {
            await this.send("Runtime.releaseObject", { objectId: parentObjectId });
          }
        } finally {
          await this.send("Runtime.releaseObject", { objectId: nodeObjectId });
        }
      }));
      const elements = [...new Map(
        found
          .filter((element): element is Element => element?.nodeType === 1)
          .map((element) => [element.backendNodeId, element]),
      ).values()];
      if (!visibleTextOnly) return elements;
      const content = elements.filter((element) => !["script", "style", "noscript"].includes(element.tag));
      const visibility = await Promise.all(content.map((element) => element.apply<boolean>(
        "function () { const style = getComputedStyle(this); return style.display !== 'none' && style.visibility !== 'hidden' && style.visibility !== 'collapse' && this.getClientRects().length > 0; }",
      )));
      return content.filter((_element, index) => visibility[index] === true);
    } finally {
      await this.send("DOM.discardSearchResults", { searchId });
    }
  }

  async #poll<T>(operation: () => Promise<T | undefined>, description: string, options: WaitOptions): Promise<T> {
    const timeoutMs = options.timeoutMs ?? 10_000;
    const deadline = Date.now() + timeoutMs;
    while (true) {
      if (options.signal?.aborted === true) throw new CdpAbortError(`Wait for ${description}`, { cause: options.signal.reason });
      const value = await operation();
      if (value !== undefined) return value;
      if (Date.now() >= deadline) throw new CdpTimeoutError(`Wait for ${description}`, timeoutMs);
      await delay(Math.min(options.intervalMs ?? 100, Math.max(0, deadline - Date.now())), options.signal);
    }
  }

  #waitForLoad(timeoutMs: number, signal?: AbortSignal): {
    readonly promise: Promise<"loaded" | "timed-out" | "cancelled" | "aborted">;
    readonly cancel: () => void;
  } {
    let finish: (result: "loaded" | "timed-out" | "cancelled" | "aborted") => void = () => {};
    let settled = false;
    const promise = new Promise<"loaded" | "timed-out" | "cancelled" | "aborted">((resolve) => { finish = resolve; });
    const complete = (result: "loaded" | "timed-out" | "cancelled" | "aborted"): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      off();
      signal?.removeEventListener("abort", abort);
      finish(result);
    };
    const off = this.connection.on("Page.loadEventFired", (_params, metadata) => {
      if (metadata.sessionId !== this.sessionId) return;
      complete("loaded");
    });
    const timeout = setTimeout(() => complete("timed-out"), timeoutMs);
    const abort = (): void => complete("aborted");
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted === true) abort();
    return { promise, cancel: () => complete("cancelled") };
  }

  #assertAvailable(): void {
    if (this.#failure !== undefined) throw this.#failure;
  }
}

async function delay(ms: number, signal?: AbortSignal): Promise<void> {
  await new Promise<void>((resolve) => {
    const timeout = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => { clearTimeout(timeout); resolve(); }, { once: true });
  });
}

function mouseButtonMask(button: Protocol.Input.MouseButton): number {
  switch (button) {
    case "left": return 1;
    case "right": return 2;
    case "middle": return 4;
    case "back": return 8;
    case "forward": return 16;
    case "none": return 0;
  }
}
