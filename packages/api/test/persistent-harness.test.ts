import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  acquirePersistentBrowser,
  acquireHarnessLock,
  assertHeadfulAuthorized,
  browserCaseSkipReason,
  connectOptionsForLease,
  HARNESS_ENDPOINT_ENV,
} from "./support/persistent-harness.js";
import type { Browser, ConnectOptions, Tab } from "../src/index.js";

test("HAR-001 concurrent persistent harness ownership is rejected", async () => {
  const parent = await mkdtemp(join(tmpdir(), "nodriver-harness-test-"));
  const lockPath = join(parent, "owner.lock");
  const release = await acquireHarnessLock(lockPath);
  try {
    await assert.rejects(acquireHarnessLock(lockPath), /already owns/);
  } finally {
    await release();
  }
});

test("HAR-004 headful leases require explicit per-run authorization", () => {
  assert.throws(() => assertHeadfulAuthorized(false, {}), /NODRIVER_ALLOW_HEADFUL=1/);
  assert.throws(() => assertHeadfulAuthorized(false, { NODRIVER_ALLOW_HEADFUL: "1" }), /explicit --headful request/);
  assert.doesNotThrow(() => assertHeadfulAuthorized(false, { NODRIVER_ALLOW_HEADFUL: "1", NODRIVER_HARNESS_HEADFUL: "1" }));
  assert.equal(browserCaseSkipReason(false, { NODRIVER_HARNESS_PHASE: "headless" }), "Headful case is excluded from the headless harness phase");
  assert.equal(browserCaseSkipReason(true, { NODRIVER_HARNESS_PHASE: "headful" }), "Headless case is excluded from the headful harness phase");
});

test("lease options preserve the shared endpoint and requested backend mode", () => {
  const environment = {
    NODRIVER_ALLOW_HEADFUL: "1",
    NODRIVER_HARNESS_HEADFUL: "1",
    [HARNESS_ENDPOINT_ENV]: JSON.stringify({ host: "127.0.0.7", port: 9222 }),
  };
  assert.deepEqual(connectOptionsForLease({ headless: false, connectionMode: "flattened" }, environment), {
    host: "127.0.0.7",
    port: 9222,
    connectionMode: "flattened",
    domainPolicy: "manual",
    timeoutMs: 10_000,
  });
});

test("lock release refuses to remove ownership replaced by another token", async () => {
  const parent = await mkdtemp(join(tmpdir(), "nodriver-harness-token-test-"));
  const lockPath = join(parent, "owner.lock");
  const release = await acquireHarnessLock(lockPath);
  await writeFile(join(lockPath, "owner"), "replacement", "utf8");
  await assert.rejects(release(), /ownership changed/);
  await rm(parent, { recursive: true, force: true });
});

test("serialized browser acquisition releases after connect and close failures", async () => {
  const environment = { [HARNESS_ENDPOINT_ENV]: JSON.stringify({ host: "127.0.0.1", port: 9222 }) };
  const options = { headless: true };
  let active = 0;
  let maximumActive = 0;
  const fakeConnect = async (_options: ConnectOptions): Promise<Browser> => {
    active += 1;
    maximumActive = Math.max(maximumActive, active);
    return fakeBrowser(() => { active -= 1; });
  };
  const savedEndpoint = process.env[HARNESS_ENDPOINT_ENV];
  process.env[HARNESS_ENDPOINT_ENV] = environment[HARNESS_ENDPOINT_ENV];
  try {
    await assert.rejects(acquirePersistentBrowser(options, async () => { throw new Error("connect failed"); }), /connect failed/);
    const first = await acquirePersistentBrowser(options, fakeConnect);
    const secondPending = acquirePersistentBrowser(options, fakeConnect);
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(active, 1);
    await first.close();
    const second = await secondPending;
    assert.equal(maximumActive, 1);
    await second.close();

    const failedClose = await acquirePersistentBrowser(options, async () => fakeBrowser(() => { throw new Error("close failed"); }));
    await assert.rejects(failedClose.close(), /close failed/);
    const afterFailure = await acquirePersistentBrowser(options, fakeConnect);
    await afterFailure.close();
  } finally {
    if (savedEndpoint === undefined) delete process.env[HARNESS_ENDPOINT_ENV];
    else process.env[HARNESS_ENDPOINT_ENV] = savedEndpoint;
  }
});

function fakeBrowser(close: () => void): Browser {
  const kept = { get: async () => kept } as unknown as Tab;
  return {
    tabs: [kept],
    updateTargets: async () => [],
    close: async () => close(),
  } as unknown as Browser;
}
