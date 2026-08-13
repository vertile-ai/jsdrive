import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import { Browser, ZendriverNetworkDomain, discoverChromeExecutable, type ConnectionMode, type Tab, type TabEventHandler } from "../src/index.js";
import { browserCaseSkipReason } from "./support/persistent-harness.js";

// Stable parity case IDs retained individually for the inventory validator:
// ZDTEST-0043 ZDTEST-0045 ZDTEST-0047 ZDTEST-0049 ZDTEST-0051 ZDTEST-0053 ZDTEST-0069 ZDTEST-0071 ZDTEST-0073

let server: Server;
let pageUrl = "";
let executable = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((_request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end("<!doctype html><title>handlers</title><button id=button>ready</button>");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  pageUrl = `http://127.0.0.1:${address.port}/page`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

for (const [label, headless] of [["headless0", true], ["headless1", false]] as const) {
  const skip = browserCaseSkipReason(headless);
  const addHandlerId = headless ? "ZDTEST-0042" : "ZDTEST-0043";
  const networkDomainId = headless ? "ZDTEST-0044" : "ZDTEST-0045";
  const removeAllId = headless ? "ZDTEST-0046" : "ZDTEST-0047";
  const removeEventId = headless ? "ZDTEST-0048" : "ZDTEST-0049";
  const removeSpecificId = headless ? "ZDTEST-0050" : "ZDTEST-0051";
  const removeWithoutEventId = headless ? "ZDTEST-0052" : "ZDTEST-0053";
  const customFetchId = headless ? "ZDTEST-0068" : "ZDTEST-0069";
  const manualDisableId = headless ? "ZDTEST-0070" : "ZDTEST-0071";
  const autoEnableId = headless ? "ZDTEST-0072" : "ZDTEST-0073";

  test(`${addHandlerId} [${label}] addHandler keeps typed event handlers and dispatches them`, { timeout: 30_000, skip }, async () => {
    for (const connectionMode of ["direct", "flattened"] as const) await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      let first = 0;
      let second = 0;
      const handler1: TabEventHandler = () => { first += 1; };
      const handler2: TabEventHandler = () => { second += 1; };
      tab.addHandler("Network.requestWillBeSent", handler1);
      tab.addHandler("Network.requestWillBeSent", handler2);
      assert.equal(tab.handlers.size, 1);
      assert.equal(tab.handlers.get("Network.requestWillBeSent")?.length, 2);
      await tab.get(pageUrl);
      assert.ok(first > 0);
      assert.ok(second > 0);
    }, connectionMode);
  });

  test(`${networkDomainId} [${label}] ZendriverNetworkDomain registers exact pinned 29 inert slots`, { timeout: 30_000, skip }, async () => {
    await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      const handler: TabEventHandler = () => {};
      tab.addHandler(ZendriverNetworkDomain, handler);
      assert.deepEqual(ZendriverNetworkDomain.events, [
        "Network.AlternateProtocolUsage", "Network.BlockedReason", "Network.CertificateTransparencyCompliance",
        "Network.ConnectionType", "Network.ContentEncoding", "Network.ContentSecurityPolicySource",
        "Network.CookieBlockedReason", "Network.CookieExemptionReason", "Network.CookiePriority",
        "Network.CookieSameSite", "Network.CookieSourceScheme", "Network.CorsError",
        "Network.CrossOriginEmbedderPolicyValue", "Network.CrossOriginOpenerPolicyValue",
        "Network.DeviceBoundSessionFetchResult", "Network.DirectSocketDnsQueryType", "Network.ErrorReason",
        "Network.IPAddressSpace", "Network.InterceptionStage", "Network.LocalNetworkAccessRequestPolicy",
        "Network.RenderBlockingBehavior", "Network.ReportStatus", "Network.ResourcePriority",
        "Network.ResourceType", "Network.ServiceWorkerResponseSource", "Network.ServiceWorkerRouterSource",
        "Network.SetCookieBlockedReason", "Network.SignedExchangeErrorField", "Network.TrustTokenOperationType",
      ]);
      assert.equal(tab.handlers.size, 29);
      assert.equal(tab.enabledDomains.has("Network"), false);
      for (const method of ZendriverNetworkDomain.events) assert.equal(tab.handlers.get(method)?.length, 1);
      await tab.get(pageUrl);
      assert.equal(tab.enabledDomains.has("Network"), false);
    });
  });

  test(`${removeAllId} [${label}] removeHandlers clears every handler`, { timeout: 30_000, skip }, async () => {
    await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      tab.addHandler("Network.requestWillBeSent", () => {});
      await tab.get(pageUrl);
      tab.removeHandlers();
      assert.equal(tab.handlers.size, 0);
      await tab.send("Runtime.enable");
      assert.equal(tab.enabledDomains.has("Network"), false);
    });
  });

  test(`${removeEventId} [${label}] removeHandlers(event) clears one event`, { timeout: 30_000, skip }, async () => {
    await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      tab.addHandler("Network.requestWillBeSent", () => {});
      tab.addHandler("Network.responseReceived", () => {});
      tab.removeHandlers("Network.requestWillBeSent");
      assert.equal(tab.handlers.has("Network.requestWillBeSent"), false);
      assert.equal(tab.handlers.has("Network.responseReceived"), true);
    });
  });

  test(`${removeSpecificId} [${label}] removeHandlers(event, handler) removes only one`, { timeout: 30_000, skip }, async () => {
    await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      const first: TabEventHandler = () => {};
      const second: TabEventHandler = () => {};
      tab.addHandler("Network.requestWillBeSent", first);
      tab.addHandler("Network.requestWillBeSent", second);
      tab.removeHandlers("Network.requestWillBeSent", first);
      assert.deepEqual(tab.handlers.get("Network.requestWillBeSent"), [second]);
    });
  });

  test(`${removeWithoutEventId} [${label}] removeHandlers(handler) reports the Zendriver error`, { timeout: 30_000, skip }, async () => {
    await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      const handler: TabEventHandler = () => {};
      tab.addHandler("Network.requestWillBeSent", handler);
      assert.throws(() => tab.removeHandlers(undefined, handler), {
        name: "TypeError",
        message: "if handler is provided, event_type should be provided as well",
      });
    });
  });

  test(`${customFetchId} [${label}] custom manual Fetch enable is not replaced`, { timeout: 30_000, skip }, async () => {
    await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      tab.addHandler("Fetch.requestPaused", () => {});
      const pattern = { urlPattern: "*/never-match", requestStage: "Response" as const, resourceType: "XHR" as const };
      await tab.send("Fetch.enable", { patterns: [pattern] });
      assert.equal(tab.manuallyEnabledDomains.has("Fetch"), true);
      await tab.get(pageUrl);
      assert.equal(tab.manuallyEnabledDomains.has("Fetch"), true);
      const enables = (tab.connection as { readonly trace?: readonly { readonly direction: string; readonly message: Readonly<Record<string, unknown>> }[] }).trace
        ?.filter((entry) => entry.direction === "send" && entry.message.method === "Fetch.enable") ?? [];
      assert.equal(enables.length, 1);
      assert.deepEqual((enables[0]?.message.params as { readonly patterns?: readonly unknown[] }).patterns, [pattern]);
    });
  });

  test(`${manualDisableId} [${label}] explicit domain disable clears auto and manual views`, { timeout: 30_000, skip }, async () => {
    for (const connectionMode of ["direct", "flattened"] as const) await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      tab.addHandler("Network.requestWillBeSent", () => {});
      await tab.get(pageUrl);
      assert.equal(tab.enabledDomains.has("Network"), true);
      await tab.send("Network.disable");
      assert.equal(tab.enabledDomains.has("Network"), false);
      assert.equal(tab.manuallyEnabledDomains.has("Network"), false);
      await tab.send("Runtime.enable");
      assert.equal(tab.enabledDomains.has("Network"), true);
    }, connectionMode);
  });

  test(`${autoEnableId} [${label}] handler automatically enables its domain`, { timeout: 30_000, skip }, async () => {
    for (const connectionMode of ["direct", "flattened"] as const) await withBrowser(headless, async (browser) => {
      const tab = browser.mainTab;
      assert.ok(tab);
      tab.addHandler("Network.requestWillBeSent", () => {});
      let pageEvents = 0;
      tab.addHandler("Page.frameNavigated", () => { pageEvents += 1; });
      assert.equal(tab.enabledDomains.has("Network"), false);
      await tab.get(pageUrl);
      assert.equal(tab.enabledDomains.has("Network"), true);
      assert.equal(tab.manuallyEnabledDomains.has("Network"), false);
      assert.ok(pageEvents > 0);
      assert.equal(tab.enabledDomains.has("Page"), true);
      assert.equal(tab.manuallyEnabledDomains.has("Page"), false);
    }, connectionMode);
  });
}

test("flattened handler and domain state stays isolated per target session", { timeout: 30_000, skip: browserCaseSkipReason(true) }, async () => {
  await withBrowser(true, async (browser) => {
    const first = browser.mainTab;
    assert.ok(first);
    const second = await browser.newTab();
    let firstEvents = 0;
    let secondEvents = 0;
    first.addHandler("Network.requestWillBeSent", () => { firstEvents += 1; });
    second.addHandler("Network.responseReceived", () => { secondEvents += 1; });
    await first.get(pageUrl);
    assert.equal(first.enabledDomains.has("Network"), true);
    assert.equal(second.enabledDomains.has("Network"), false);
    await second.get(pageUrl);
    assert.equal(second.enabledDomains.has("Network"), true);
    assert.ok(firstEvents > 0);
    assert.ok(secondEvents > 0);
  }, "flattened");
});

async function withBrowser(headless: boolean, action: (browser: Browser) => Promise<void>, connectionMode: ConnectionMode = "direct"): Promise<void> {
  const browser = await Browser.start({ executable, headless, connectionMode });
  try {
    await action(browser);
  } finally {
    await browser.stop();
  }
}
