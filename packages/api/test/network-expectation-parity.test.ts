import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import type { Protocol } from "@nodriver/protocol";
import { Browser, discoverChromeExecutable, type ConnectionMode, type Tab } from "../src/index.js";
import { NativeConnection } from "@nodriver/runtime-native";
import type { RuntimeBackendFactory } from "@nodriver/runtime-js";

const pageHtml = `<!doctype html>
<title>Network parity fixture</title>
<button id="fetch-user" type="button">Fetch user data</button>
<a id="download-file" href="/download" download>Download</a>
<script>
  document.querySelector('#fetch-user').addEventListener('click', () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/user-data.json');
    request.onload = () => {
      const value = JSON.parse(request.responseText);
      document.title = value.name;
    };
    request.send();
  });
</script>`;

let executable = "";
let server: Server;
let baseUrl = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((request, response) => {
    if (request.url === "/api") {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({ name: "Zendriver", value: 42 }));
      return;
    }
    if (request.url === "/user-data.json") {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({ name: "Zendriver", value: 42 }));
      return;
    }
    if (request.url === "/download") {
      response.setHeader("content-type", "application/octet-stream");
      response.setHeader("content-disposition", "attachment; filename=network-parity.txt");
      response.end("network parity download");
      return;
    }
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(pageHtml);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

for (const [parameter, headless, ids] of [
  ["headless0", true, ["ZDTEST-0056", "ZDTEST-0058", "ZDTEST-0060", "ZDTEST-0062", "ZDTEST-0064", "ZDTEST-0066"]],
  ["headless1", false, ["ZDTEST-0057", "ZDTEST-0059", "ZDTEST-0061", "ZDTEST-0063", "ZDTEST-0065", "ZDTEST-0067"]],
] as const) {
  test(`${ids[0]} expectRequest resolves the matching request [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (tab) => {
      const expectation = tab.expectRequest(`${baseUrl}/api`);
      await expectation.ready;
      let rawEvent: Protocol.Network.Events.RequestWillBeSentEvent | undefined;
      const offRaw = tab.on("Network.requestWillBeSent", (event) => {
        if (event.request.url === `${baseUrl}/api`) rawEvent = event;
      });
      const bodyPromise = expectation.responseBody;
      const requestPromise = expectation.request;
      const responsePromise = expectation.response;
      await tab.get(`${baseUrl}/api`);
      const result = await expectation.value;
      offRaw();
      assert.strictEqual(result, rawEvent);
      assert.equal(result.request.url, `${baseUrl}/api`);
      assert.ok(result.requestId.length > 0);
      assert.deepEqual(await requestPromise, result.request);
      assert.equal((await responsePromise).url, `${baseUrl}/api`);
      assert.deepEqual(await bodyPromise, [JSON.stringify({ name: "Zendriver", value: 42 }), false]);
    });
  });

  test(`${ids[1]} expectResponse resolves the response and body tuple [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (tab) => {
      const expectation = tab.expectResponse(`${baseUrl}/api`);
      await expectation.ready;
      let rawEvent: Protocol.Network.Events.ResponseReceivedEvent | undefined;
      const offRaw = tab.on("Network.responseReceived", (event) => {
        if (event.response.url === `${baseUrl}/api`) rawEvent = event;
      });
      const bodyPromise = expectation.responseBody;
      const requestPromise = expectation.request;
      const responsePromise = expectation.response;
      await tab.get(`${baseUrl}/api`);
      const result = await expectation.value;
      offRaw();
      assert.strictEqual(result, rawEvent);
      const [body, base64Encoded] = await bodyPromise;
      assert.equal(result.response.url, `${baseUrl}/api`);
      assert.deepEqual(await responsePromise, result.response);
      assert.equal((await requestPromise).url, `${baseUrl}/api`);
      assert.equal(base64Encoded, false);
      assert.equal(body, JSON.stringify({ name: "Zendriver", value: 42 }));
      assert.deepEqual(JSON.parse(body) as { name: string; value: number }, { name: "Zendriver", value: 42 });
    });
  });

  test(`${ids[2]} expectResponse reset observes a subsequent reload [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (tab) => {
      const expectation = tab.expectResponse((event) => event.response.url === `${baseUrl}/`);
      await expectation.ready;
      await tab.get(`${baseUrl}/`);
      assert.equal(await expectation.reset(), undefined);
      await tab.reload();
      const result = await expectation.value;
      const [body, base64Encoded] = await expectation.responseBody;
      assert.equal(result.response.url, `${baseUrl}/`);
      assert.equal(base64Encoded, false);
      assert.equal(body, pageHtml);
    });
  });

  test(`${ids[3]} expectDownload resolves the next DownloadWillBegin event [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (tab) => {
      const expectation = tab.expectDownload();
      await expectation.ready;
      await tab.get(`${baseUrl}/`);
      const link = await tab.select("#download-file");
      await link.click();
      const result = await expectation.value;
      assert.equal(result.url, `${baseUrl}/download`);
      assert.ok(result.guid.length > 0);
      assert.equal(result.suggestedFilename, "network-parity.txt");
      await expectation.close();
    });
  });

  test(`${ids[4]} response interception exposes body and continues [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (tab) => {
      const interception = tab.intercept("*/user-data.json", "Response", "XHR");
      await interception.ready;
      await tab.get(`${baseUrl}/`);
      const bodyPromise = interception.responseBody;
      const requestPromise = interception.request;
      const action = tab.evaluate<string>(`new Promise((resolve, reject) => { const request = new XMLHttpRequest(); request.open('GET', ${JSON.stringify(`${baseUrl}/user-data.json`)}); request.onload = () => resolve(request.responseText); request.onerror = reject; request.send(); })`, true);
      assert.equal((await requestPromise).url, `${baseUrl}/user-data.json`);
      assert.equal(decodeBody(await bodyPromise), JSON.stringify({ name: "Zendriver", value: 42 }));
      await interception.continueRequest();
      assert.equal(await action, JSON.stringify({ name: "Zendriver", value: 42 }));
      await interception.close();
    });
  });

  test(`${ids[5]} response interception reset observes a subsequent fetch [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (tab) => {
      const interception = tab.intercept("*/user-data.json", "Response", "XHR");
      await interception.ready;
      await tab.get(`${baseUrl}/`);
      const firstBody = interception.responseBody;
      const firstAction = tab.evaluate<string>(`new Promise((resolve, reject) => { const request = new XMLHttpRequest(); request.open('GET', ${JSON.stringify(`${baseUrl}/user-data.json`)}); request.onload = () => resolve(request.responseText); request.onerror = reject; request.send(); })`, true);
      assert.equal(decodeBody(await firstBody), JSON.stringify({ name: "Zendriver", value: 42 }));
      await interception.continueRequest();
      assert.equal(await firstAction, JSON.stringify({ name: "Zendriver", value: 42 }));
      assert.equal(await interception.reset(), undefined);
      const secondBody = interception.responseBody;
      const secondAction = tab.evaluate<string>(`new Promise((resolve, reject) => { const request = new XMLHttpRequest(); request.open('GET', ${JSON.stringify(`${baseUrl}/user-data.json`)}); request.onload = () => resolve(request.responseText); request.onerror = reject; request.send(); })`, true);
      assert.equal(decodeBody(await secondBody), JSON.stringify({ name: "Zendriver", value: 42 }));
      await interception.continueRequest();
      assert.equal(await secondAction, JSON.stringify({ name: "Zendriver", value: 42 }));
      await interception.close();
    });
  });
}

function decodeBody([body, base64Encoded]: readonly [string, boolean]): string {
  return Buffer.from(body, base64Encoded ? "base64" : "utf8").toString("utf8");
}

async function usingBrowser(headless: boolean, action: (tab: Tab) => Promise<void>): Promise<void> {
  for (const [backend, backendFactory] of [["js", undefined], ["native", NativeConnection]] satisfies readonly [string, RuntimeBackendFactory | undefined][]) {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      const browser = await Browser.start({
        executable,
        headless,
        connectionMode,
        ...(backendFactory === undefined ? {} : { backend: backendFactory }),
      });
      try {
        const tab = browser.mainTab;
        assert.ok(tab, `${backend}/${connectionMode} has a main tab`);
        await action(tab);
      } finally {
        await browser.stop();
      }
    }
  }
}
