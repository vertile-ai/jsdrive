import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import { Browser, Config, discoverChromeExecutable } from "../src/index.js";

let executable = "";
let server: Server;
let fixtureUrl = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((_request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><head><title>Example Domain</title></head><body>browser parity fixture</body></html>");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  fixtureUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

test("ZDTEST-0003 startup connection failure includes Chrome stderr", { timeout: 30_000 }, async () => {
  const controlledFailure: RuntimeBackendFactory = {
    connect: async () => { throw new Error("controlled connection failure"); },
  };
  await assert.rejects(
    Browser.start({ executable, backend: controlledFailure, connectionTimeoutMs: 5_000 }),
    (error: unknown) => error instanceof Error
      && /Failed to start Chrome.*controlled connection failure/s.test(error.message)
      && /Browser stderr:\s+\S/s.test(error.message)
      && !error.message.endsWith("(empty)"),
  );
});

for (const [parameter, headless, ids] of [
  ["headless0", true, ["ZDTEST-0004", "ZDTEST-0006", "ZDTEST-0008", "ZDTEST-0010", "ZDTEST-0012", "ZDTEST-0014"]],
  ["headless1", false, ["ZDTEST-0005", "ZDTEST-0007", "ZDTEST-0009", "ZDTEST-0011", "ZDTEST-0013", "ZDTEST-0015"]],
] as const) {
  test(`${ids[0]} content begins with a doctype [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (browser) => {
      const content = await (await browser.get(fixtureUrl)).getContent();
      assert.equal(content.toLowerCase().startsWith("<!doctype html>"), true);
    });
  });

  test(`${ids[1]} refreshing target metadata exposes the document title [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (browser) => {
      const tab = await browser.get(fixtureUrl);
      assert.equal((await tab.updateTarget()).title, "Example Domain");
      assert.equal(tab.title, "Example Domain");
    });
  });

  test(`${ids[2]} stop succeeds after the browser connection is closed [${parameter}]`, { timeout: 30_000 }, async () => {
    const browser = await Browser.start({ executable, headless });
    await browser.get(fixtureUrl);
    assert.equal(browser.connection.closed, false);
    browser.connection.close();
    assert.equal(browser.connection.closed, true);
    await browser.stop();
    assert.equal(browser.stopped, true);
  });

  test(`${ids[3]} stop is idempotent [${parameter}]`, { timeout: 30_000 }, async () => {
    const browser = await Browser.start({ executable, headless });
    await browser.get(fixtureUrl);
    await browser.stop();
    assert.equal(browser.stopped, true);
    await browser.stop();
    assert.equal(browser.stopped, true);
  });

  test(`${ids[4]} stopped becomes true after stop [${parameter}]`, { timeout: 30_000 }, async () => {
    const browser = await Browser.start({ executable, headless });
    await browser.get(fixtureUrl);
    assert.equal(browser.stopped, false);
    await browser.stop();
    assert.equal(browser.stopped, true);
  });

  test(`${ids[5]} stopped tracks an external Browser.close [${parameter}]`, { timeout: 30_000 }, async () => {
    const browser = await Browser.start({ executable, headless });
    await browser.get(fixtureUrl);
    assert.equal(browser.stopped, false);
    await browser.connection.send("Browser.close");
    await waitUntil(() => browser.stopped, 10_000);
    assert.equal(browser.stopped, true);
    assert.equal(browser.connection.closed, true);
    await browser.stop();
  });
}

test("ZDTEST-0020 one Config launches three isolated browsers", { timeout: 60_000 }, async () => {
  const shared = new Config({ executable, headless: true });
  const browsers: Browser[] = [];
  try {
    browsers.push(await Browser.start(shared), await Browser.start(shared), await Browser.start(shared));
    assert.equal(shared.port, undefined);
    assert.equal(shared.configuredUserDataDir, undefined);
    assert.equal(browsers.every((browser) => !browser.config.usesCustomDataDir), true);
    assert.equal(new Set(browsers.map((browser) => browser.config.port)).size, 3);
    assert.equal(new Set(browsers.map((browser) => browser.config.userDataDir)).size, 3);
    const pages = await Promise.all(browsers.map((browser, index) => browser.get(`${fixtureUrl}/${index + 1}`)));
    assert.deepEqual(await Promise.all(pages.map(async (page) => (await page.updateTarget()).title)), [
      "Example Domain",
      "Example Domain",
      "Example Domain",
    ]);
  } finally {
    await Promise.all(browsers.map(async (browser) => browser.stop()));
  }
});

async function usingBrowser(headless: boolean, action: (browser: Browser) => Promise<void>): Promise<void> {
  const browser = await Browser.start({ executable, headless });
  try {
    await action(browser);
  } finally {
    await browser.stop();
  }
}

async function waitUntil(predicate: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!predicate() && Date.now() < deadline) await new Promise<void>((resolve) => setTimeout(resolve, 25));
  assert.equal(predicate(), true, `condition was not met within ${timeoutMs}ms`);
}
