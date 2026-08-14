import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import { NativeConnection } from "@vertile-ai/jsdriver-runtime-native";
import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import {
  BaseFetchInterception,
  BaseRequestExpectation,
  Browser,
  discoverChromeExecutable,
  DownloadExpectation,
  FetchInterception,
  RequestExpectation,
  ResponseExpectation,
  type ConnectionMode,
  type Tab,
} from "../src/index.js";

let executable = "";
let server: Server;
let baseUrl = "";

const json = JSON.stringify({ name: "Zendriver", value: 42 });
const page = `<!doctype html><title>Expectation API parity</title><a id="download" href="/download" download>Download</a>`;

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((request, response) => {
    if (request.url === "/api") {
      response.setHeader("content-type", "application/json");
      response.end(json);
      return;
    }
    if (request.url === "/start") {
      response.writeHead(302, { location: "/final" });
      response.end();
      return;
    }
    if (request.url === "/final") {
      response.setHeader("content-type", "application/json");
      response.end(json);
      return;
    }
    if (request.url === "/download") {
      response.setHeader("content-type", "application/octet-stream");
      response.setHeader("content-disposition", "attachment; filename=closure.txt");
      response.end("closure download");
      return;
    }
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(page);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

test("ZDAPI-EXPECT-001 BaseRequestExpectation, RequestExpectation, and ResponseExpectation expose matched data and reset", { timeout: 45_000 }, async () => {
  await usingMatrix(async (tab) => {
    const requestExpectation = tab.expectRequest(`${baseUrl}/api`);
    const responseExpectation = tab.expectResponse(`${baseUrl}/api`);
    assert.ok(requestExpectation instanceof RequestExpectation);
    assert.ok(requestExpectation instanceof BaseRequestExpectation);
    assert.ok(responseExpectation instanceof ResponseExpectation);
    assert.ok(responseExpectation instanceof BaseRequestExpectation);
    assert.equal(await requestExpectation.aenter(), requestExpectation);
    assert.equal(await responseExpectation.aenter(), responseExpectation);
    const firstFetch = fetchText(tab, `${baseUrl}/api`);
    assert.equal((await requestExpectation.request).url, `${baseUrl}/api`);
    assert.equal((await requestExpectation.value).request.url, `${baseUrl}/api`);
    assert.equal((await requestExpectation.response).status, 200);
    assert.deepEqual(await requestExpectation.responseBody, [json, false]);
    assert.equal((await responseExpectation.request).url, `${baseUrl}/api`);
    assert.equal((await responseExpectation.value).response.status, 200);
    assert.equal((await responseExpectation.response).status, 200);
    assert.deepEqual(await responseExpectation.responseBody, [json, false]);
    assert.equal(await firstFetch, json);

    await requestExpectation.reset();
    const secondFetch = fetchText(tab, `${baseUrl}/api`);
    assert.equal((await requestExpectation.value).request.url, `${baseUrl}/api`);
    assert.equal(await secondFetch, json);
    await requestExpectation.aexit();
    await responseExpectation.aexit();

    const baseExpectation = new BaseRequestExpectation(tab, `${baseUrl}/api`);
    assert.equal("value" in baseExpectation, false);
    assert.equal(await baseExpectation.aenter(), baseExpectation);
    const baseFetch = fetchText(tab, `${baseUrl}/api`);
    assert.equal((await baseExpectation.request).url, `${baseUrl}/api`);
    assert.equal((await baseExpectation.response).status, 200);
    assert.deepEqual(await baseExpectation.responseBody, [json, false]);
    assert.equal(await baseFetch, json);
    await baseExpectation.aexit();
  });
});

test("ZDAPI-EXPECT-002 DownloadExpectation captures a download and restores browser behavior", { timeout: 45_000 }, async () => {
  await usingMatrix(async (tab) => {
    const download = tab.expectDownload();
    assert.ok(download instanceof DownloadExpectation);
    assert.equal(await download.aenter(), download);
    const link = await tab.select("#download");
    await link.click();
    assert.equal((await download.value).suggestedFilename, "closure.txt");
    await download.aexit();
  });
});

test("ZDAPI-EXPECT-003 ResponseExpectation matches the initial URL across a redirect", { timeout: 45_000 }, async () => {
  await usingMatrix(async (tab) => {
    const expectation = tab.expectResponse(`${baseUrl}/start`);
    await expectation.ready;
    const action = fetchText(tab, `${baseUrl}/start`);
    assert.equal((await expectation.request).url, `${baseUrl}/start`);
    assert.equal((await expectation.response).url, `${baseUrl}/final`);
    assert.deepEqual(await expectation.responseBody, [json, false]);
    assert.equal(await action, json);
    await expectation[Symbol.asyncDispose]();
  });
});

test("ZDAPI-INTERCEPT-001 Fetch interception iterates, fulfills, and disables on iterator return", { timeout: 45_000 }, async () => {
  await usingMatrix(async (tab) => {
    const fulfill = tab.intercept("*/fulfilled", "Request", "XHR");
    assert.ok(fulfill instanceof FetchInterception);
    assert.ok(fulfill instanceof BaseFetchInterception);
    await fulfill.ready;
    const iterator = fulfill[Symbol.asyncIterator]();
    const fulfilledAction = fetchStatusText(tab, `${baseUrl}/fulfilled`);
    const fulfilled = await iterator.next();
    assert.equal(fulfilled.done, false);
    assert.equal(fulfilled.value.response, undefined);
    assert.equal(fulfilled.value.error, undefined);
    await fulfilled.value.fulfillRequest(
      201,
      [{ name: "content-type", value: "text/plain" }],
      undefined,
      Buffer.from("intercepted").toString("base64"),
    );
    assert.equal(await fulfilledAction, "201:intercepted");
    await iterator.return?.();
    assert.equal(await fetchText(tab, `${baseUrl}/fulfilled`), page);
  });
});

test("ZDAPI-INTERCEPT-002 BaseFetchInterception exposes response body and resets", { timeout: 45_000 }, async () => {
  await usingMatrix(async (tab) => {
    const responseInterception = new BaseFetchInterception(tab, "*/api", "Response", "XHR");
    assert.equal(await responseInterception.aenter(), responseInterception);
    const responseAction = fetchText(tab, `${baseUrl}/api`);
    const interceptedResponse = await responseInterception.next();
    assert.equal(interceptedResponse.response?.statusCode, 200);
    assert.equal((await interceptedResponse.body()).toString("utf8"), json);
    await interceptedResponse.continueResponse();
    assert.equal(await responseAction, json);
    await responseInterception.reset();
    const resetAction = fetchText(tab, `${baseUrl}/api`);
    assert.equal((await responseInterception.request).url, `${baseUrl}/api`);
    assert.equal(decodeBody(await responseInterception.responseBody), json);
    await responseInterception.continueResponse();
    assert.equal(await resetAction, json);
    await responseInterception.aexit();
  });
});

test("ZDAPI-INTERCEPT-003 InterceptedRequest modifies, fails, and cleans up requests", { timeout: 45_000 }, async () => {
  await usingMatrix(async (tab) => {
    const modified = tab.intercept("*/modified", "Request", "XHR");
    await modified.ready;
    const modifiedAction = fetchText(tab, `${baseUrl}/modified`);
    await (await modified.next()).continueRequest(`${baseUrl}/api`);
    assert.equal(await modifiedAction, json);
    await modified[Symbol.asyncDispose]();

    const failed = tab.intercept("*/failed", "Request", "XHR");
    await failed.ready;
    const failedAction = fetchOutcome(tab, `${baseUrl}/failed`);
    await (await failed.next()).failRequest("Failed");
    assert.equal(await failedAction, "failed");
    await failed.close();
  });
});

function fetchText(tab: Tab, url: string): Promise<string> {
  return tab.evaluate<string>(`fetch(${JSON.stringify(url)}).then((response) => response.text())`, true);
}

function fetchStatusText(tab: Tab, url: string): Promise<string> {
  return tab.evaluate<string>(`fetch(${JSON.stringify(url)}).then(async (response) => response.status + ':' + await response.text())`, true);
}

function fetchOutcome(tab: Tab, url: string): Promise<string> {
  return tab.evaluate<string>(`fetch(${JSON.stringify(url)}).then(() => 'completed', () => 'failed')`, true);
}

function decodeBody([body, base64Encoded]: readonly [string, boolean]): string {
  return Buffer.from(body, base64Encoded ? "base64" : "utf8").toString("utf8");
}

async function usingMatrix(action: (tab: Tab) => Promise<void>): Promise<void> {
  for (const backend of [undefined, NativeConnection] satisfies readonly (RuntimeBackendFactory | undefined)[]) {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      await usingBrowser(backend, connectionMode, async (tab) => {
        await tab.get(`${baseUrl}/`);
        await action(tab);
      });
    }
  }
}

async function usingBrowser(
  backend: RuntimeBackendFactory | undefined,
  connectionMode: ConnectionMode,
  action: (tab: Tab) => Promise<void>,
): Promise<void> {
  const browser = await Browser.start({
    executable,
    headless: true,
    connectionTimeoutMs: 2_000,
    connectionMode,
    ...(backend === undefined ? {} : { backend }),
  });
  try {
    const tab = browser.mainTab;
    assert.ok(tab);
    await action(tab);
  } finally {
    await browser.stop();
  }
}
