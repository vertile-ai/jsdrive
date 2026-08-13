import { mkdir, rename } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import type { Protocol } from "@nodriver/protocol";
import { CdpAbortError, CdpTimeoutError } from "@nodriver/runtime-js";
import type { Expectation, UrlMatcher } from "./network.js";
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
  downloadPath: string | undefined,
  matcher: UrlMatcher<Protocol.Browser.Events.DownloadWillBeginEvent> = () => true,
  options: DownloadOptions = {},
): Expectation<DownloadResult> {
  if (downloadPath === undefined) throw new Error("Call setDownloadPath with an explicit absolute directory before expecting a download");
  if (options.destination !== undefined) assertAbsolute(options.destination, "Download destination");
  const timeoutMs = options.timeoutMs ?? 10_000;
  let begin: Protocol.Browser.Events.DownloadWillBeginEvent | undefined;
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
  };
  const fail = (reason: unknown): void => {
    if (settled) return;
    settled = true;
    cleanup();
    rejectValue(reason);
  };
  const frameId = tab.send("Page.getFrameTree").then(({ frameTree }) => frameTree.frame.id);
  const offBegin = tab.browserConnection.on("Browser.downloadWillBegin", async (event) => {
    if (event.frameId === await frameId && await matches(matcher, event.url, event)) begin = event;
  });
  const offProgress = tab.browserConnection.on("Browser.downloadProgress", async (event) => {
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
  });
  const timeout = setTimeout(() => fail(new CdpTimeoutError("Wait for download", timeoutMs)), timeoutMs);
  const abort = (): void => fail(new CdpAbortError("Wait for download", { cause: options.signal?.reason }));
  options.signal?.addEventListener("abort", abort, { once: true });
  if (options.signal?.aborted === true) abort();
  return {
    ready: frameId.then(() => undefined),
    value,
    cancel: async (reason?: unknown) => fail(new CdpAbortError("Wait for download", { cause: reason })),
  };
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
