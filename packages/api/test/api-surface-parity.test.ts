import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer, type Server } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { NativeConnection } from "@vertile-ai/jsdriver-runtime-native";
import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import {
  Browser,
  Config,
  HTTPApi,
  discoverChromeExecutable,
  findBinary,
  findExecutable,
  isRoot,
  tempProfileDir,
  start,
  type ConnectionMode,
} from "../src/index.js";

test("ZDAPI-CONFIG-001", async () => {
  const config = new Config({ executable: process.execPath, browserArgs: ["--fixture"] });
  assert.equal(config.headless, false);
  assert.equal(config.disableWebrtc, true);
  assert.equal(config.browserConnectionTimeout, 0.25);
  assert.equal(config.browserConnectionMaxTries, 10);
  assert.equal(config.usesCustomDataDir, false);
  assert.deepEqual(config.toBrowserArgs(), ["--fixture"]);
  assert.equal(config.addArgument("--fixture-2"), undefined);
  assert.throws(() => config.addArgument("--headless=new"), TypeError);
  assert.equal(findBinary(["/path/that/does/not/exist", process.execPath]), process.execPath);
  assert.equal(findExecutable("auto"), findExecutable("auto"));
  assert.equal(typeof isRoot(), "boolean");
  const profile = tempProfileDir();
  try {
    assert.match(profile, /uc_/);
    assert.equal(config.configuredUserDataDir, undefined);
  } finally {
    await rm(profile, { recursive: true, force: true });
  }
});

test("ZDAPI-HTTP-001", async () => {
  let server: Server | undefined;
  server = createServer((request, response) => {
    response.setHeader("content-type", "application/json");
    if (request.method === "POST") {
      let body = "";
      request.on("data", (chunk: Buffer) => { body += chunk.toString(); });
      request.on("end", () => response.end(JSON.stringify({ method: request.method, body: JSON.parse(body) })));
      return;
    }
    response.end(JSON.stringify({ endpoint: request.url }));
  });
  await new Promise<void>((resolve) => server?.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  const api = new HTTPApi(["127.0.0.1", address.port]);
  assert.deepEqual(await api.get("version"), { endpoint: "/json/version" });
  assert.deepEqual(await api.post("close", { reason: "fixture" }), { method: "POST", body: { reason: "fixture" } });
  await assert.rejects(api._request("version", "get", { invalid: "data" }), TypeError);
  await new Promise<void>((resolve, reject) => server?.close((error) => error === undefined ? resolve() : reject(error)));
});

test("ZDAPI-BROWSER-001", { timeout: 90_000 }, async () => {
  const executable = await discoverChromeExecutable();
  const rootBrowser = await start({ executable, headless: true });
  try {
    assert.ok(rootBrowser.mainTab);
  } finally {
    await rootBrowser.stop();
  }
  for (const [backendName, backend] of [["js", undefined], ["native", NativeConnection]] as const satisfies readonly [string, RuntimeBackendFactory | undefined][]) {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      const browser = await Browser.create({ executable, headless: true, connectionMode, ...(backend === undefined ? {} : { backend }) });
      try {
        assert.equal(await browser.testConnection(), true, `${backendName}/${connectionMode}`);
        assert.match((await browser.getVersion()).product, /Chrome|Chromium/i);
        assert.equal(await browser.wait(0.001), browser);
        assert.equal(await browser.sleep(0.001), browser);
        const tab = await browser.get("data:text/html,<title>api</title><main>api</main>");
        assert.equal(browser.mainTab, tab);
        assert.equal(browser.tabs.includes(tab), true);
        assert.equal((await browser.updateTargets()).some(({ targetId }) => targetId === tab.targetId), true);
        assert.equal(await browser.get("about:blank"), tab);
        const created = await browser.get("about:blank", true);
        assert.notEqual(created.targetId, tab.targetId);
        await created.close();
        await browser.cookies.setAll([{ name: "surface", value: `${backendName}-${connectionMode}`, url: "https://example.com/" }]);
        const cookieDir = await mkdtemp(join(tmpdir(), "nodriver-cookie-"));
        const cookiePath = join(cookieDir, "session.json");
        try {
          await browser.cookies.save(cookiePath, "surface");
          const saved = JSON.parse(await readFile(cookiePath, "utf8")) as readonly { readonly name: string }[];
          assert.deepEqual(saved.map(({ name }) => name), ["surface"]);
          await browser.cookies.clear();
          await browser.cookies.load(cookiePath, "surface");
          assert.equal((await browser.cookies.getAll()).some(({ name }) => name === "surface"), true);
        } finally {
          await rm(cookieDir, { recursive: true, force: true });
        }
      } finally {
        await browser.stop();
      }
    }
  }
});
