import { mkdir, rename } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import { CdpAbortError, CdpTimeoutError } from "@vertile-ai/jsdriver-runtime-js";
import type { UrlMatcher } from "./network.js";
import type { Tab, WaitOptions } from "./tab.js";

export interface DownloadResult {
  readonly guid: string;
  readonly url: string;
  readonly suggestedFilename: string;
  readonly path: string;
  readonly totalBytes: number;
}

export interface DownloadOptions extends WaitOptions {
  readonly destination?: string;
}

export interface DownloadResultExpectation {
  readonly ready: Promise<void>;
  readonly value: Promise<DownloadResult>;
  cancel(reason?: unknown): Promise<void>;
  reset(): Promise<DownloadResultExpectation>;
}

export interface DownloadWillBeginExpectation {
  readonly ready: Promise<void>;
  readonly value: Promise<Protocol.Browser.Events.DownloadWillBeginEvent>;
  cancel(reason?: unknown): Promise<void>;
  close(): Promise<void>;
  [Symbol.asyncDispose](): Promise<void>;
}

export class DownloadExpectation implements DownloadWillBeginExpectation {
  readonly #state: DownloadWillBeginExpectation;

  public constructor(
    tab: Tab,
    matcher: UrlMatcher<Protocol.Browser.Events.DownloadWillBeginEvent> = () => true,
    options: DownloadOptions = {},
    previousDownloadPath?: string,
  ) {
    this.#state = createDownloadWillBeginState(tab, matcher, options, previousDownloadPath);
  }

  public get ready(): Promise<void> { return this.#state.ready; }
  public get value(): Promise<Protocol.Browser.Events.DownloadWillBeginEvent> { return this.#state.value; }
  public cancel(reason?: unknown): Promise<void> { return this.#state.cancel(reason); }
  public close(): Promise<void> { return this.#state.close(); }
  public [Symbol.asyncDispose](): Promise<void> { return this.#state[Symbol.asyncDispose](); }
}

export async function setDownloadPath(tab: Tab, path: string): Promise<string> {
  assertAbsolute(path, "Download directory");
  await mkdir(path, { recursive: true });
  await tab.browserConnection.send("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: path,
    eventsEnabled: true,
  });
  return resolve(path);
}

export function expectDownload(
  tab: Tab,
  downloadPath: string,
  matcher?: UrlMatcher<Protocol.Browser.Events.DownloadWillBeginEvent>,
  options?: DownloadOptions,
  previousDownloadPath?: string,
): DownloadResultExpectation;
export function expectDownload(
  tab: Tab,
  downloadPath: undefined,
  matcher?: UrlMatcher<Protocol.Browser.Events.DownloadWillBeginEvent>,
  options?: DownloadOptions,
  previousDownloadPath?: string,
): DownloadWillBeginExpectation;
export function expectDownload(
  tab: Tab,
  downloadPath: string | undefined,
  matcher: UrlMatcher<Protocol.Browser.Events.DownloadWillBeginEvent> = () => true,
  options: DownloadOptions = {},
  previousDownloadPath?: string,
): DownloadResultExpectation | DownloadWillBeginExpectation {
  if (downloadPath === undefined) return new DownloadExpectation(tab, matcher, options, previousDownloadPath);
  if (options.destination !== undefined) assertAbsolute(options.destination, "Download destination");
  const timeoutMs = options.timeoutMs ?? 10_000;
  let begin: Protocol.Browser.Events.DownloadWillBeginEvent | undefined;
  const pendingProgress = new Map<string, Protocol.Browser.Events.DownloadProgressEvent>();
  let resolveValue: (value: DownloadResult) => void = () => {};
  let rejectValue: (reason: unknown) => void = () => {};
  let settled = false;
  const value = new Promise<DownloadResult>((resolvePromise, rejectPromise) => {
    resolveValue = resolvePromise;
    rejectValue = rejectPromise;
  });
  const cleanup = (): void => {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", abort);
    offBegin();
    offProgress();
    pendingProgress.clear();
  };
  const fail = (reason: unknown): void => {
    if (settled) return;
    settled = true;
    cleanup();
    rejectValue(reason);
  };
  const frameId = tab.send("Page.getFrameTree").then(({ frameTree }) => frameTree.frame.id);
  const finish = async (event: Protocol.Browser.Events.DownloadProgressEvent): Promise<void> => {
    if (begin?.guid !== event.guid || event.state === "inProgress") return;
    if (event.state === "canceled") {
      fail(new Error(`Download canceled: ${begin.url}`));
      return;
    }
    const started = begin;
    const safeFilename = safeDownloadName(started.suggestedFilename, started.guid);
    const currentPath = event.filePath ?? join(downloadPath, safeFilename);
    const destination = options.destination === undefined ? currentPath : resolve(options.destination);
    try {
      if (resolve(currentPath) !== destination) await rename(currentPath, destination);
      if (settled) return;
      settled = true;
      cleanup();
      resolveValue({
        guid: started.guid,
        url: started.url,
        suggestedFilename: safeFilename,
        path: destination,
        totalBytes: event.totalBytes,
      });
    } catch (error) {
      fail(error);
    }
  };
  const offBegin = tab.browserConnection.on("Browser.downloadWillBegin", async (event) => {
    if (settled || event.frameId !== await frameId || !(await matches(matcher, event.url, event))) return;
    begin = event;
    const progress = pendingProgress.get(event.guid);
    if (progress !== undefined) await finish(progress);
  });
  const offProgress = tab.browserConnection.on("Browser.downloadProgress", async (event) => {
    if (event.state === "inProgress") return;
    if (begin?.guid === event.guid) {
      await finish(event);
      return;
    }
    pendingProgress.set(event.guid, event);
  });
  const timeout = setTimeout(() => fail(new CdpTimeoutError("Wait for download", timeoutMs)), timeoutMs);
  const abort = (): void => fail(new CdpAbortError("Wait for download", { cause: options.signal?.reason }));
  options.signal?.addEventListener("abort", abort, { once: true });
  if (options.signal?.aborted === true) abort();
  return {
    ready: frameId.then(() => undefined),
    value,
    cancel: async (reason?: unknown) => fail(new CdpAbortError("Wait for download", { cause: reason })),
    reset: async () => {
      void value.catch(() => undefined);
      fail(new CdpAbortError("Reset download expectation"));
      const fresh = expectDownload(tab, downloadPath, matcher, options);
      await fresh.ready;
      return fresh;
    },
  };
}

function createDownloadWillBeginState(
  tab: Tab,
  matcher: UrlMatcher<Protocol.Browser.Events.DownloadWillBeginEvent>,
  options: DownloadOptions,
  previousDownloadPath?: string,
): DownloadWillBeginExpectation {
  const timeoutMs = options.timeoutMs ?? 10_000;
  let resolveValue: (value: Protocol.Browser.Events.DownloadWillBeginEvent) => void = () => {};
  let rejectValue: (reason: unknown) => void = () => {};
  let settled = false;
  let restored = false;
  let off = (): void => {};
  const value = new Promise<Protocol.Browser.Events.DownloadWillBeginEvent>((resolve, reject) => {
    resolveValue = resolve;
    rejectValue = reject;
  });
  const control = tab.browserConnection;
  const frameId = tab.send("Page.getFrameTree", undefined, { timeoutMs }).then(({ frameTree }) => frameTree.frame.id);
  const ready = Promise.all([
    frameId,
    control.send("Browser.setDownloadBehavior", { behavior: "deny", eventsEnabled: true }, { timeoutMs }),
  ]).then(([expectedFrameId]) => {
    off = control.on("Browser.downloadWillBegin", async (event) => {
      if (settled || event.frameId !== expectedFrameId || !(await matches(matcher, event.url, event))) return;
      settled = true;
      off();
      resolveValue(event);
    });
  }).catch((error: unknown) => {
    settled = true;
    rejectValue(error);
    throw error;
  });
  const timeout = setTimeout(() => {
    if (settled) return;
    settled = true;
    off();
    rejectValue(new CdpTimeoutError("Wait for download", timeoutMs));
  }, timeoutMs);
  const restore = async (): Promise<void> => {
    if (restored) return;
    restored = true;
    clearTimeout(timeout);
    off();
    await control.send("Browser.setDownloadBehavior", previousDownloadPath === undefined
      ? { behavior: "default" }
      : { behavior: "allow", downloadPath: previousDownloadPath, eventsEnabled: true }, { timeoutMs });
  };
  const close = async (): Promise<void> => {
    if (!settled) {
      settled = true;
      void value.catch(() => undefined);
      rejectValue(new CdpAbortError("Download expectation closed"));
    }
    await restore();
  };
  const expectation: DownloadWillBeginExpectation = {
    ready,
    value,
    cancel: async (reason?: unknown) => {
      if (!settled) {
        settled = true;
        void value.catch(() => undefined);
        rejectValue(new CdpAbortError("Wait for download", { cause: reason }));
      }
      await restore();
    },
    close,
    [Symbol.asyncDispose]: close,
  };
  void ready.catch(() => undefined);
  return expectation;
}

export async function downloadFile(tab: Tab, url: string, destination: string, options: WaitOptions = {}): Promise<DownloadResult> {
  assertAbsolute(destination, "Download destination");
  const directory = await setDownloadPath(tab, dirname(destination));
  const expectation = expectDownload(tab, directory, url, { ...options, destination });
  try {
    await expectation.ready;
    await tab.send("Page.navigate", { url }, {
      ...(options.timeoutMs === undefined ? {} : { timeoutMs: options.timeoutMs }),
      ...(options.signal === undefined ? {} : { signal: options.signal }),
    });
    return await expectation.value;
  } catch (error) {
    await expectation.cancel(error);
    throw error;
  }
}

function assertAbsolute(path: string, label: string): void {
  if (!isAbsolute(path)) throw new TypeError(`${label} must be an absolute path`);
}

function safeDownloadName(suggestedFilename: string, guid: string): string {
  const name = basename(suggestedFilename);
  return name === "" || name === "." || name === ".." ? `${guid}.download` : name;
}

async function matches<T>(matcher: UrlMatcher<T>, url: string, event: T): Promise<boolean> {
  if (typeof matcher === "string") return url.includes(matcher);
  if (matcher instanceof RegExp) {
    matcher.lastIndex = 0;
    return matcher.test(url);
  }
  return matcher(event);
}
