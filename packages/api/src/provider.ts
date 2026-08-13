import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import { CdpAbortError } from "@vertile-ai/jsdriver-runtime-js";
import type { Browser } from "./browser.js";
import type { ExpectedResponse, UrlMatcher } from "./network.js";
import type { Tab, WaitOptions } from "./tab.js";

export interface ProviderPageOptions<T> {
  readonly url: string;
  readonly bootstrap?: (tab: Tab) => void | Promise<void>;
  readonly action: (tab: Tab) => T | Promise<T>;
}

export interface SessionMaterial {
  readonly cookies: Readonly<Record<string, string>>;
  readonly localStorage: Readonly<Record<string, string>>;
}

export interface NetworkBootstrap {
  readonly request: Protocol.Network.Request;
  readonly response: Protocol.Network.Response;
  readonly body: string;
  readonly bodyBase64Encoded: boolean;
  readonly session: SessionMaterial;
  json<T = unknown>(): T;
  bytes(): Buffer;
}

export async function runProviderPage<T>(browser: Browser, options: ProviderPageOptions<T>): Promise<T> {
  const tab = await browser.get(options.url);
  await options.bootstrap?.(tab);
  return options.action(tab);
}

export async function extractRuntimeValue<T>(tab: Tab, expression: string, options: WaitOptions = {}): Promise<T> {
  return tab.evaluate<T>(expression, true, true, options);
}

export async function waitForSessionMaterial(
  browser: Browser,
  tab: Tab,
  options: WaitOptions & { readonly cookieNames?: readonly string[]; readonly localStorageKeys?: readonly string[] } = {},
): Promise<SessionMaterial> {
  const cookieNames = options.cookieNames ?? [];
  const localStorageKeys = options.localStorageKeys ?? [];
  const timeoutMs = options.timeoutMs ?? 10_000;
  const intervalMs = options.intervalMs ?? 50;
  const deadline = Date.now() + timeoutMs;
  while (true) {
    if (options.signal?.aborted === true) throw new CdpAbortError("Wait for provider session material", { cause: options.signal.reason });
    const [cookies, localStorage] = await Promise.all([browser.cookies.getAll(), tab.getLocalStorage()]);
    const cookieValues = Object.fromEntries(cookies.map(({ name, value }) => [name, value]));
    if (cookieNames.every((name) => cookieValues[name] !== undefined)
        && localStorageKeys.every((key) => localStorage[key] !== undefined)) {
      return { cookies: cookieValues, localStorage };
    }
    if (Date.now() >= deadline) throw new Error("Timed out waiting for provider session material");
    await delay(Math.min(intervalMs, Math.max(0, deadline - Date.now())), options.signal);
  }
}

export async function captureNetworkBootstrap(
  browser: Browser,
  tab: Tab,
  matcher: UrlMatcher<Protocol.Network.Events.ResponseReceivedEvent>,
  action: () => void | Promise<void>,
  options: WaitOptions & { readonly cookieNames?: readonly string[]; readonly localStorageKeys?: readonly string[] } = {},
): Promise<NetworkBootstrap> {
  const expectation = tab.expectResponse(matcher, options);
  await expectation.ready;
  try {
    await action();
  } catch (error) {
    const cancelled = expectation.value.catch(() => undefined);
    await expectation.cancel(error);
    await cancelled;
    throw error;
  }
  const captured = await expectation.value;
  const request = await expectation.request;
  const [body, bodyBase64Encoded] = await expectation.responseBody;
  const session = await waitForSessionMaterial(browser, tab, options);
  return networkBootstrap(request, captured, session, body, bodyBase64Encoded);
}

function networkBootstrap(request: Protocol.Network.Request, captured: ExpectedResponse, session: SessionMaterial, body: string, bodyBase64Encoded: boolean): NetworkBootstrap {
  return {
    request,
    response: captured.response,
    body,
    bodyBase64Encoded,
    session,
    json<T = unknown>(): T { return JSON.parse(Buffer.from(body, bodyBase64Encoded ? "base64" : "utf8").toString("utf8")) as T; },
    bytes(): Buffer { return Buffer.from(body, bodyBase64Encoded ? "base64" : "utf8"); },
  };
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted === true) {
    return Promise.reject(new CdpAbortError("Wait for provider session material", { cause: signal.reason }));
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, ms);
    const abort = (): void => {
      clearTimeout(timeout);
      reject(new CdpAbortError("Wait for provider session material", { cause: signal?.reason }));
    };
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted === true) abort();
  });
}
