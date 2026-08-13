import assert from "node:assert/strict";
import { readFile, mkdtemp } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { Browser, discoverChromeExecutable, type ConnectionMode } from "../src/index.js";

test("cookies, network expectations, interception, and downloads work in direct and flattened modes", { timeout: 60_000 }, async () => {
  const server = createServer((request, response) => {
    if (request.url === "/api") {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({ source: "server", method: request.method, header: request.headers["x-test"] ?? null }));
      return;
    }
    if (request.url === "/redirect") {
      response.writeHead(302, { location: "/api" });
      response.end();
      return;
    }
    if (request.url === "/stream") {
      response.setHeader("content-type", "text/plain");
      response.write("first-");
      setTimeout(() => response.end("second"), 50);
      return;
    }
    if (request.url === "/download") {
      response.setHeader("content-type", "application/octet-stream");
      response.setHeader("content-disposition", "attachment; filename=fixture.txt");
      response.end("download fixture");
      return;
    }
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end("<!doctype html><title>network fixture</title>");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const executable = await discoverChromeExecutable();
  const output = await mkdtemp(join(tmpdir(), "nodriver-network-"));

  try {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      const browser = await Browser.start({ executable, connectionMode, domainPolicy: "reference-counted" });
      try {
        const tab = await browser.newTab(baseUrl);
        assert.equal((await browser.testConnection()).protocolVersion.length > 0, true);
        assert.equal(browser.targetInfo(tab)?.targetId, tab.targetId);
        assert.ok([...browser].includes(tab));

        await browser.cookies.setAll([{ name: "roundtrip", value: connectionMode, url: baseUrl }]);
        assert.equal((await browser.cookies.getAll()).find(({ name }) => name === "roundtrip")?.value, connectionMode);
        const cookiePath = join(output, `${connectionMode}-cookies.json`);
        await browser.cookies.save(cookiePath);
        await browser.cookies.clear();
        assert.equal((await browser.cookies.getAll()).some(({ name }) => name === "roundtrip"), false);
        await browser.cookies.load(cookiePath);
        assert.equal((await browser.cookies.getAll()).find(({ name }) => name === "roundtrip")?.value, connectionMode);

        const requestExpectation = tab.expectRequest(/\/api$/);
        const responseExpectation = tab.expectResponse((event) => event.response.url.endsWith("/api"));
        await Promise.all([requestExpectation.ready, responseExpectation.ready]);
        const apiAction = tab.evaluate(`fetch(${JSON.stringify(`${baseUrl}/api`)}, { headers: { "x-test": "expected" } }).then(r => r.json())`);
        assert.equal((await requestExpectation.value).request.headers["x-test"], "expected");
        const expectedResponse = await responseExpectation.value;
        assert.deepEqual(expectedResponse.json(), { source: "server", method: "GET", header: "expected" });
        assert.deepEqual(await apiAction, { source: "server", method: "GET", header: "expected" });

        const streamExpectation = tab.expectResponse("/stream");
        await streamExpectation.ready;
        const streamAction = tab.evaluate<string>(`fetch(${JSON.stringify(`${baseUrl}/stream`)}).then(r => r.text())`);
        assert.equal((await streamExpectation.value).body, "first-second");
        assert.equal(await streamAction, "first-second");

        const fulfill = tab.intercept({ url: "/intercept", stage: "Request" });
        await fulfill.ready;
        const fulfillAction = tab.evaluate<string>(`fetch(${JSON.stringify(`${baseUrl}/intercept`)}).then(r => r.text())`);
        await (await fulfill.next()).fulfillRequest(200, {
          responseHeaders: [{ name: "content-type", value: "text/plain" }],
          body: Buffer.from("fulfilled locally").toString("base64"),
        });
        assert.equal(await fulfillAction, "fulfilled locally");
        await fulfill.close();

        const rewrite = tab.intercept({ url: "/rewrite", stage: "Request" });
        await rewrite.ready;
        const rewriteAction = tab.evaluate<{ source: string }>(`fetch(${JSON.stringify(`${baseUrl}/rewrite`)}).then(r => r.json())`);
        await (await rewrite.next()).continueRequest({ url: `${baseUrl}/api` });
        assert.equal((await rewriteAction).source, "server");
        await rewrite.close();

        const failure = tab.intercept({ url: "/fail", stage: "Request" });
        await failure.ready;
        const failureAction = tab.evaluate<string>(`fetch(${JSON.stringify(`${baseUrl}/fail`)}).then(() => "unexpected", () => "failed")`);
        await (await failure.next()).failRequest("BlockedByClient");
        assert.equal(await failureAction, "failed");
        await failure.close();

        const downloadPath = join(output, `${connectionMode}-download.txt`);
        const download = await tab.downloadFile(`${baseUrl}/download`, downloadPath);
        assert.equal(download.path, downloadPath);
        assert.equal(await readFile(download.path, "utf8"), "download fixture");

        await browser.closeTab(tab);
      } finally {
        await browser.close();
      }
    }
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
  }
});
