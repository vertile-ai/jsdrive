import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { Browser, captureNetworkBootstrap, extractRuntimeValue, runProviderPage, type NetworkBootstrap } from "../src/index.js";

test("provider primitives capture runtime, network, cookie, and storage material", { timeout: 30_000 }, async () => {
  const server = createServer((request, response) => {
    if (request.url === "/bootstrap") {
      response.setHeader("content-type", "application/json");
      response.setHeader("x-session", "response-material");
      response.end(JSON.stringify({ provider: "fixture", ok: true }));
      return;
    }
    response.setHeader("content-type", "text/html");
    response.end(`<!doctype html><script>
      window.runtimeToken = "runtime-token";
      window.runProviderAction = async () => {
        localStorage.setItem("auth", "storage-material");
        document.cookie = "session=cookie-material; SameSite=Lax";
        return fetch("/bootstrap", { headers: { "x-auth": "request-material" } }).then(r => r.json());
      };
    </script>`);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  let browser: Browser | undefined;
  try {
    browser = await Browser.start({ domainPolicy: "reference-counted" });
    const result = await runProviderPage<{ readonly token: string; readonly capture: NetworkBootstrap }>(browser, {
      url: `http://127.0.0.1:${address.port}`,
      bootstrap: async (tab) => { await tab.waitForReadyState(); },
      action: async (tab) => ({
        token: await extractRuntimeValue<string>(tab, "window.runtimeToken"),
        capture: await captureNetworkBootstrap(browser as Browser, tab, "/bootstrap", () => tab.evaluate("runProviderAction()"), {
          cookieNames: ["session"], localStorageKeys: ["auth"],
        }),
      }),
    });
    assert.equal(result.token, "runtime-token");
    assert.equal(result.capture.request.headers["x-auth"], "request-material");
    assert.equal(result.capture.response.headers["x-session"], "response-material");
    assert.deepEqual(result.capture.json(), { provider: "fixture", ok: true });
    assert.equal(result.capture.session.cookies.session, "cookie-material");
    assert.equal(result.capture.session.localStorage.auth, "storage-material");
  } finally {
    await browser?.close();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
