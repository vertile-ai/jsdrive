import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import { CdpConnection } from "@vertile-ai/jsdriver-runtime-js";
import { Browser, Config, discoverChromeExecutable, getRegisteredInstances } from "../src/index.js";
import {
  browserCaseSkipReason,
  HARNESS_LOCK_PATH,
  HARNESS_PHASE_ENV,
  pathExists,
  processExists,
} from "./support/persistent-harness.js";
import { transportNotApplicable } from "./support/transport-matrix.js";

interface LifecycleObservation {
  readonly run: number;
  readonly phase: "before-start" | "started" | "navigated" | "stopped";
  readonly activeManagedPids: readonly number[];
  readonly port?: number;
  readonly profile?: string;
  readonly url?: string;
  readonly title?: string;
}

interface NavigationOutcome {
  readonly run: number;
  readonly url: string;
  readonly title: string;
}

let executable = "";
let server: Server;
let fixtureUrl = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((_request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><head><title>Example Domain</title></head><body>serial browser parity fixture</body></html>");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  fixtureUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

test("ZDTEST-0020 serially launches three isolated browsers under the single-managed-process policy", {
  timeout: 60_000,
  skip: browserCaseSkipReason(true),
}, async (context) => {
  assert.equal(process.env[HARNESS_PHASE_ENV], "headless", "ZDTEST-0020 must run through the headless exclusive harness");
  assert.equal(await pathExists(HARNESS_LOCK_PATH), true, "ZDTEST-0020 must hold the canonical browser lock");
  transportNotApplicable("ZDTEST-0020", {
    code: "serial-managed-process-equivalence",
    detail: "The repository single-managed-Chromium policy permits only a serial equivalence: three non-overlapping managed processes with distinct ports, profiles, and navigation outcomes. Upstream concurrent multi-browser behavior is not verified.",
  });

  const shared = new Config({ executable, headless: true, backend: CdpConnection, connectionMode: "direct" });
  const ports = new Set<number>();
  const profiles = new Set<string>();
  const outcomes: NavigationOutcome[] = [];
  const trace: LifecycleObservation[] = [];
  let maxManagedProcessConcurrency = 0;

  const observe = (
    run: number,
    phase: LifecycleObservation["phase"],
    detail: Omit<LifecycleObservation, "run" | "phase" | "activeManagedPids"> = {},
  ): readonly number[] => {
    const activeManagedPids = managedProcessPids();
    maxManagedProcessConcurrency = Math.max(maxManagedProcessConcurrency, activeManagedPids.length);
    trace.push({ ...detail, run, phase, activeManagedPids });
    return activeManagedPids;
  };

  assert.deepEqual(observe(0, "before-start"), []);
  for (let run = 1; run <= 3; run += 1) {
    assert.deepEqual(observe(run, "before-start"), [], `run ${run} overlapped a managed browser`);
    const browser = await Browser.start(shared);
    let pid: number | undefined;
    let profile: string | undefined;
    try {
      const metadata = browser.process;
      assert.ok(metadata?.pid !== undefined, `run ${run} did not expose managed process metadata`);
      pid = metadata.pid;
      profile = metadata.profile;
      assert.equal(processExists(pid), true);
      assert.equal(browser.config.usesCustomDataDir, false);
      assert.equal(browser.config.port, metadata.port);
      assert.equal(browser.config.userDataDir, profile);
      assert.deepEqual(observe(run, "started", {
        port: metadata.port,
        profile,
      }), [pid]);

      const expectedUrl = `${fixtureUrl}/run-${run}`;
      const target = await (await browser.get(expectedUrl)).updateTarget();
      assert.equal(target.url, expectedUrl);
      assert.equal(target.title, "Example Domain");
      outcomes.push({ run, url: target.url, title: target.title });
      ports.add(metadata.port);
      profiles.add(profile);
      assert.deepEqual(observe(run, "navigated", {
        port: metadata.port,
        profile,
        url: target.url,
        title: target.title,
      }), [pid]);
    } finally {
      await browser.stop();
      if (pid !== undefined) assert.equal(processExists(pid), false, `run ${run} PID ${pid} survived stop`);
      if (profile !== undefined) assert.equal(await pathExists(profile), false, `run ${run} profile survived stop`);
      assert.deepEqual(observe(run, "stopped", {
        ...(browser.process === undefined ? {} : {
          port: browser.process.port,
          profile: browser.process.profile,
        }),
      }), []);
    }
  }

  assert.equal(shared.port, undefined);
  assert.equal(shared.configuredUserDataDir, undefined);
  assert.equal(ports.size, 3);
  assert.equal(profiles.size, 3);
  assert.equal(outcomes.length, 3);
  assert.equal(new Set(outcomes.map((outcome) => outcome.url)).size, 3);
  assert.deepEqual(outcomes.map((outcome) => outcome.title), ["Example Domain", "Example Domain", "Example Domain"]);
  assert.equal(maxManagedProcessConcurrency, 1);
  assert.deepEqual(managedProcessPids(), []);
  assert.equal(await pathExists(HARNESS_LOCK_PATH), true, "exclusive harness released its lock before ZDTEST-0020 completed");
  context.diagnostic(JSON.stringify({ maxManagedProcessConcurrency, outcomes, lifecycleTrace: trace }));
});

function managedProcessPids(): readonly number[] {
  return [...getRegisteredInstances()]
    .flatMap((browser) => {
      const pid = browser.process?.pid;
      return pid !== undefined && processExists(pid) ? [pid] : [];
    })
    .sort((left, right) => left - right);
}
