import assert from "node:assert/strict";
import test from "node:test";
import { NativeConnection } from "@vertile-ai/jsdriver-runtime-native";
import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import { Browser, type ConnectionMode } from "../src/index.js";
import { persistentMetadata, withPersistentBrowser } from "./support/persistent-harness.js";

test("HAR-002/HAR-003 sequential backend and mode leases share one owned Chromium", { timeout: 60_000 }, async () => {
  const owned = persistentMetadata();
  const observations: Array<{ host: string; port: number; pid: number; label: string }> = [];
  let activeLeases = 0;
  let maximumActiveLeases = 0;
  await Promise.all([0, 1].map(async () => withPersistentBrowser({ headless: true }, async () => {
    activeLeases += 1;
    maximumActiveLeases = Math.max(maximumActiveLeases, activeLeases);
    await new Promise<void>((resolve) => setTimeout(resolve, 20));
    activeLeases -= 1;
  })));
  assert.equal(maximumActiveLeases, 1);

  for (const [backendName, backend] of [["js", undefined], ["native", NativeConnection]] satisfies readonly [string, RuntimeBackendFactory | undefined][]) {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      await withPersistentBrowser({
        headless: true,
        connectionMode,
        ...(backend === undefined ? {} : { backend }),
      }, async (browser) => {
        assert.equal(await browser.testConnection(), true);
        assert.match(await (await browser.get("data:text/html,<title>persistent harness</title>")).getContent(), /persistent harness/);
        observations.push({ ...browser.endpoint, pid: owned.pid, label: `${backendName}/${connectionMode}` });
      });
    }
  }
  assert.deepEqual(observations.map(({ label }) => label), ["js/direct", "js/flattened", "native/direct", "native/flattened"]);
  assert.equal(new Set(observations.map(({ host, port, pid }) => `${host}:${port}:${pid}`)).size, 1);

  const guarded = await Browser.start({ headless: true });
  try {
    assert.equal(guarded.endpoint.host, owned.host);
    assert.equal(guarded.endpoint.port, owned.port);
    assert.equal(guarded.process, undefined);
  } finally {
    await guarded.close();
  }
});
