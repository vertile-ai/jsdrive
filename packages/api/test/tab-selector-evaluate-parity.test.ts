import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import { CdpProtocolError, CdpTimeoutError, type RuntimeBackend } from "@nodriver/runtime-js";
import { Browser, discoverChromeExecutable, Tab, type ConnectionMode } from "../src/index.js";

const groceries = `<!doctype html><title>Groceries</title><ul>
  <li aria-label="Apples (42)">Apples</li><li>Bananas</li><li>Carrots</li>
  <li id="nested-text">first<span>nested</span>last</li>
</ul><div id="hidden-result" hidden>Hidden parity text</div>
<script type="application/json">Script parity text</script>
<div id="outer">needle <span id="inner">needle</span></div>`;

const complexObject = `<!doctype html><body class="pending"><main id="content">Complex graph</main><script>
  const graph = {}; graph.root = graph; let cursor = graph;
  for (let index = 0; index < 120; index++) { cursor.child = { owner: graph }; cursor = cursor.child; }
  document.body.graph = graph; document.body.self = document.body;
  document.body.classList.remove("pending");
</script></body>`;

const simpleJson = `<!doctype html><pre id="obj">{"a":"x","b":3.14159}</pre>
  <pre id="zero">0</pre><pre id="empty-array">[]</pre><pre id="null">null</pre>`;

let executable = "";
let server: Server;
let crossServer: Server;
let baseUrl = "";
let crossUrl = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  crossServer = createServer((_request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end('<!doctype html><span class="match" data-location="cross">cross</span>');
  });
  await new Promise<void>((resolve) => crossServer.listen(0, "localhost", resolve));
  const crossAddress = crossServer.address();
  assert.ok(typeof crossAddress === "object" && crossAddress !== null);
  crossUrl = `http://localhost:${crossAddress.port}`;
  server = createServer((request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    if (request.url === "/outer") {
      response.end('<!doctype html><span class="match" data-location="outer">outer</span><iframe src="/inner"></iframe>');
    } else if (request.url === "/inner") {
      response.end('<!doctype html><span class="match" data-location="inner">inner</span>');
    } else if (request.url === "/frames") {
      response.end(`<!doctype html><span class="match" data-location="top">top</span><iframe src="/outer"></iframe><iframe src="${crossUrl}"></iframe>`);
    } else if (request.url === "/complex") {
      response.end(complexObject);
    } else if (request.url === "/simple-json") {
      response.end(simpleJson);
    } else {
      response.end(groceries);
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
  await new Promise<void>((resolve, reject) => crossServer.close((error) => error === undefined ? resolve() : reject(error)));
});

for (const [parameter, headless, ids] of [
  ["headless0", true, ["ZDTEST-0027", "ZDTEST-0029", "ZDTEST-0031", "ZDTEST-0033", "ZDTEST-0035", "ZDTEST-0038", "ZDTEST-0040", "ZDTEST-0054", "ZDTEST-0074", "ZDTEST-0076", "ZDTEST-0078", "ZDTEST-0080", "ZDTEST-0082"]],
  ["headless1", false, ["ZDTEST-0028", "ZDTEST-0030", "ZDTEST-0032", "ZDTEST-0034", "ZDTEST-0036", "ZDTEST-0039", "ZDTEST-0041", "ZDTEST-0055", "ZDTEST-0075", "ZDTEST-0077", "ZDTEST-0079", "ZDTEST-0081", "ZDTEST-0083"]],
] as const) {
  test(`${ids[0]} setUserAgent overrides all supplied navigator values [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      assert.equal(await tab.setUserAgent("Test user agent", "testLang", "TestPlatform"), undefined);
      assert.equal(await tab.evaluate("navigator.userAgent"), "Test user agent");
      assert.equal(await tab.evaluate("navigator.language"), "testLang");
      assert.equal(await tab.evaluate("navigator.platform"), "TestPlatform");
      const sentMethods = (tab.connection as RuntimeBackend & { readonly trace: readonly { readonly direction: string; readonly message: Readonly<Record<string, unknown>> }[] }).trace
        .filter(({ direction }) => direction === "send")
        .map(({ message }) => message.method);
      assert.ok(sentMethods.includes("Network.setUserAgentOverride"));
      assert.equal(sentMethods.includes("Emulation.setUserAgentOverride"), false);
    });
  });

  test(`${ids[1]} setUserAgent preserves the current UA when omitted [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      const original = await tab.evaluate<string>("navigator.userAgent");
      await tab.setUserAgent("");
      assert.equal(await tab.evaluate("navigator.userAgent"), original);
      await tab.setUserAgent(undefined, "testLang");
      assert.equal(await tab.evaluate("navigator.userAgent"), original);
      assert.equal(await tab.evaluate("navigator.language"), "testLang");
    });
  });

  test(`${ids[2]} find returns the visible enclosing element with matching text [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/groceries", async (tab) => {
      const result = await tab.find("  Apples  ", true, true);
      assert.equal(result.tag, "li");
      assert.equal(result.text, "Apples");
      const rawResult = await tab.find("Apples", true, false);
      assert.equal(rawResult.nodeType, 1);
      assert.equal(rawResult.tag, "li");
      assert.equal(rawResult.text, "Apples");
      assert.equal((await tab.find("Hidden parity text")).tag, "div");
      assert.equal((await tab.find("Script parity text")).tag, "script");
    });
  });

  test(`${ids[3]} find rejects with the typed timeout error when text is absent [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/groceries", async (tab) => {
      await assert.rejects(tab.find("Clothes", true, true, { timeoutMs: 100 }), CdpTimeoutError);
    });
  });

  test(`${ids[4]} select returns an element with exact tag and text semantics [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/groceries", async (tab) => {
      const result = await tab.select("li[aria-label^='Apples']");
      assert.equal(result.tag, "li");
      assert.equal(result.text, "Apples");
      const nested = await tab.select("#nested-text");
      assert.equal(nested.text, "first");
      assert.equal(nested.textAll, "first nested last");
    });
  });

  test(`${ids[5]} xpath returns the matching element [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/groceries", async (tab) => {
      const results = await tab.xpath('//li[@aria-label="Apples (42)"]');
      assert.equal(results.length, 1);
      assert.equal(results[0]?.tag, "li");
      assert.equal(results[0]?.text, "Apples");
    });
  });

  test(`${ids[6]} xpath returns an empty list after its search window [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/groceries", async (tab) => {
      assert.deepEqual(await tab.xpath('//li[@aria-label="Nonexistent Item"]'), []);
      assert.deepEqual(await tab.xpath("//*[", { timeoutMs: 100 }), []);
    });
  });

  test(`${ids[7]} waitForReadyState resolves true at the exact requested state [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/groceries", async (tab) => {
      assert.equal(await tab.waitForReadyState("complete"), true);
      assert.equal(await tab.evaluate("document.readyState"), "complete");
    });
  });

  test(`${ids[8]} evaluate deep-serializes complex DOM objects without an error [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/complex", async (tab) => {
      assert.ok(await tab.evaluate("document.querySelector('body:not(.pending)')", false, false));
      assert.ok(await tab.evaluate("document.body", false, false));
      assert.equal(await tab.evaluate("Promise.resolve('awaited')", true, true), "awaited");
      await assert.rejects(tab.evaluate("throw new Error('evaluation failed')"), CdpProtocolError);
    });
  });

  test(`${ids[9]} evaluate rejects complex by-value serialization and supports deep serialization [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/complex", async (tab) => {
      const expression = "document.querySelector('body:not(.pending)')";
      await assert.rejects(tab.evaluate(expression, false, true), CdpProtocolError);
      const representation = await tab.evaluate<Record<string, unknown>>(expression, false, false);
      assert.equal(representation.localName, "body");
      assert.equal(representation.nodeType, 1);
    });
  });

  test(`${ids[10]} evaluate returns exact JSON and deep-serialized representations [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/simple-json", async (tab) => {
      const expression = "JSON.parse(document.querySelector('#obj').textContent)";
      assert.deepEqual(await tab.evaluate(expression, false, true), { a: "x", b: 3.14159 });
      assert.deepEqual(await tab.evaluate(expression, false, false), [
        ["a", { type: "string", value: "x" }],
        ["b", { type: "number", value: 3.14159 }],
      ]);
    });
  });

  test(`${ids[11]} evaluate preserves falsy by-value results [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/simple-json", async (tab) => {
      const parsed = (selector: string): Promise<unknown> => tab.evaluate(`JSON.parse(document.querySelector('${selector}').textContent)`);
      assert.equal(await parsed("#zero"), 0);
      assert.deepEqual(await parsed("#empty-array"), []);
      assert.equal(await parsed("#null"), null);
    });
  });

  test(`${ids[12]} evaluate handles repeated complex and scalar expressions [${parameter}]`, { timeout: 30_000 }, async () => {
    await usingPage(headless, "/complex", async (tab) => {
      for (const expression of [
        "document.querySelector('body:not(.pending)')",
        "document.documentElement",
        "document.querySelector('*')",
        "document.body.parentElement",
        "document.getElementById('content')",
      ]) assert.ok(await tab.evaluate(expression, false, false));
      for (const expression of [
        "document.body.graph ? 'has graph' : 'no graph'",
        "document.readyState",
        "navigator.userAgent",
        "window.location.href",
        "document.title",
      ]) assert.equal(typeof await tab.evaluate(expression, false, true), "string");
    });
  });
}

test("ZDTEST-0037 querySelectorAll traverses content documents but excludes cross-origin child targets", { timeout: 30_000 }, async () => {
  for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
    await usingPage(true, "/frames", async (tab) => {
      const results = await tab.querySelectorAll(".match", { includeFrames: true });
      assert.deepEqual(new Set(results.map((element) => element.attrs["data-location"])), new Set(["top", "outer", "inner"]));
      const documents = await Promise.all(results.map((element) => element.apply<string>("function () { return this.ownerDocument.location.pathname; }")));
      assert.deepEqual(new Set(documents), new Set(["/frames", "/outer", "/inner"]));
    }, connectionMode);
  }
});

test("evaluate sends the exact Zendriver serialization controls", async () => {
  let params: unknown;
  const connection = {
    sendRaw: async (method: string, commandParams: unknown) => {
      assert.equal(method, "Runtime.evaluate");
      params = commandParams;
      return { result: { type: "object", deepSerializedValue: { type: "object", value: [] } } };
    },
  } as unknown as RuntimeBackend;
  await new Tab("evaluate-controls", connection, "session").evaluate("({})", false, false);
  assert.deepEqual(params, {
    expression: "({})",
    returnByValue: false,
    awaitPromise: false,
    userGesture: true,
    allowUnsafeEvalBlockedByCSP: true,
    serializationOptions: {
      serialization: "deep",
      maxDepth: 10,
      additionalParameters: { maxNodeDepth: 10, includeShadowTree: "all" },
    },
  });
});

test("waitFor text defaults to the first match and opts into best matching", { timeout: 30_000 }, async () => {
  await usingPage(true, "/groceries", async (tab) => {
    assert.equal((await tab.waitFor({ text: "needle" })).attributes.id, "outer");
    assert.equal((await tab.waitFor({ text: "needle", bestMatch: true })).attributes.id, "inner");
  });
});

async function usingBrowser(headless: boolean, action: (browser: Browser) => Promise<void>, connectionMode?: ConnectionMode): Promise<void> {
  const browser = await Browser.start({ executable, headless, ...(connectionMode === undefined ? {} : { connectionMode }) });
  try {
    await action(browser);
  } finally {
    await browser.stop();
  }
}

async function usingPage(headless: boolean, path: string, action: (tab: Tab) => Promise<void>, connectionMode?: ConnectionMode): Promise<void> {
  await usingBrowser(headless, async (browser) => action(await browser.get(`${baseUrl}${path}`)), connectionMode);
}
