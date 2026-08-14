import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  runDifferential,
  type DifferentialSteps,
  type Outcome,
  type RunResult,
} from "../differential/run.js";
import {
  ReferenceProcessError,
  removeOwnedDifferentialProfile,
  runBoundedReferenceProcess,
} from "../differential/reference-process.js";
import { acquireHarnessLock, HARNESS_LOCK_PATH, pathExists, processExists } from "./support/persistent-harness.js";

const outcome: Outcome = {
  qwenRuntimeToken: "qwen-runtime-token",
  lmArenaRequestHeader: "lmarena-request-material",
  lmArenaLocalStorage: "lmarena-storage-material",
  openaiCapture: true,
  geminiSessionCookie: "gemini-cookie-material",
  grokBootstrapHeader: "grok-response-material",
  grokBootstrapBody: "ready",
};

test("AUD-006 differential owns the browser lock before work and releases it on success and failure", async () => {
  const parent = await mkdtemp(join(tmpdir(), "nodriver-differential-lock-test-"));
  const lockPath = join(parent, "harness.lock");
  const firstEvents: string[] = [];
  let releaseReference = (): void => {};
  const referenceGate = new Promise<void>((resolve) => { releaseReference = resolve; });
  let markReferenceStarted = (): void => {};
  const referenceStarted = new Promise<void>((resolve) => { markReferenceStarted = resolve; });
  let first: ReturnType<typeof runDifferential> | undefined;

  try {
    first = runDifferential({
      lockPath,
      steps: fakeSteps(firstEvents, {
        runReference: async () => {
          firstEvents.push("zendriver:start");
          markReferenceStarted();
          await referenceGate;
          firstEvents.push("zendriver:stop");
          return fakeResult("zendriver-0.15.5", "unavailable");
        },
      }),
    });
    await referenceStarted;

    const blockedEvents: string[] = [];
    await assert.rejects(
      runDifferential({ lockPath, steps: fakeSteps(blockedEvents) }),
      /already owns/,
    );
    assert.deepEqual(blockedEvents, []);

    releaseReference();
    const report = await first;
    assert.deepEqual(report.executionOrder, ["zendriver-0.15.5", "js", "native"]);
    assert.deepEqual(firstEvents, [
      "reference:resolve",
      "chromium:discover",
      "fixture:start",
      "zendriver:start",
      "zendriver:stop",
      "js:start",
      "js:stop",
      "native:start",
      "native:stop",
      "fixture:close",
    ]);
    assert.deepEqual(report.cleanup, { fixtureClosed: true, lockReleased: true });
    await proveLockIsFree(lockPath);

    const failureEvents: string[] = [];
    await assert.rejects(
      runDifferential({
        lockPath,
        steps: fakeSteps(failureEvents, {
          runNative: async () => {
            failureEvents.push("native:start");
            throw new Error("native failed");
          },
        }),
      }),
      /native failed/,
    );
    assert.deepEqual(failureEvents, [
      "reference:resolve",
      "chromium:discover",
      "fixture:start",
      "zendriver:start",
      "zendriver:stop",
      "js:start",
      "js:stop",
      "native:start",
      "fixture:close",
    ]);
    await proveLockIsFree(lockPath);
  } finally {
    releaseReference();
    await first?.catch(() => undefined);
    await rm(parent, { recursive: true, force: true });
  }
});

test("AUD-006 reference timeout cleans its real child process group and releases the canonical lock", {
  skip: process.platform === "win32" ? "POSIX process-group evidence is required" : false,
}, async () => {
  const sigintListeners = process.listenerCount("SIGINT");
  const sigtermListeners = process.listenerCount("SIGTERM");
  const events: string[] = [];
  let failedGroup: number | undefined;
  await assert.rejects(
    runDifferential({
      steps: fakeSteps(events, {
        runReference: async () => {
          events.push("zendriver:start");
          try {
            await runSyntheticReference(timeoutParentScript, 150);
          } catch (error) {
            assert.ok(error instanceof ReferenceProcessError);
            failedGroup = error.processGroupId;
            assert.equal(error.processStopped, true);
            assert.match(error.message, /timeout-stderr-sentinel/);
            throw error;
          }
          throw new Error("Synthetic timeout unexpectedly completed");
        },
      }),
    }),
    /timed out/,
  );
  assert.equal(typeof failedGroup, "number");
  assert.equal(processGroupExists(failedGroup), false);
  assert.deepEqual(events, [
    "reference:resolve",
    "chromium:discover",
    "fixture:start",
    "zendriver:start",
    "fixture:close",
  ]);
  await proveLockIsFree(HARNESS_LOCK_PATH);
  assert.equal(process.listenerCount("SIGINT"), sigintListeners);
  assert.equal(process.listenerCount("SIGTERM"), sigtermListeners);
});

test("AUD-006 nonzero reference exit cleans its real descendant process group", {
  skip: process.platform === "win32" ? "POSIX process-group evidence is required" : false,
}, async () => {
  let failedGroup: number | undefined;
  await assert.rejects(
    runDifferential({
      steps: fakeSteps([], {
        runReference: async () => {
          try {
            await runSyntheticReference(nonzeroParentScript, 2_000);
          } catch (error) {
            assert.ok(error instanceof ReferenceProcessError);
            failedGroup = error.processGroupId;
            assert.equal(error.processStopped, true);
            throw error;
          }
          throw new Error("Synthetic nonzero reference unexpectedly completed");
        },
      }),
    }),
    (error: unknown) => {
      assert.ok(error instanceof ReferenceProcessError);
      assert.match(error.message, /status 7/);
      assert.match(error.message, /nonzero-stderr-sentinel/);
      return true;
    },
  );
  assert.equal(typeof failedGroup, "number");
  assert.equal(processGroupExists(failedGroup), false);
  await proveLockIsFree(HARNESS_LOCK_PATH);
});

test("AUD-006 parent signals clean active-reference and blocked-step windows through outer finally blocks", {
  skip: process.platform === "win32" ? "POSIX process-group evidence is required" : false,
}, async () => {
  await assertSignalCleanup("SIGTERM", "active-reference", "SIGINT");
  await assertSignalCleanup("SIGTERM", "pre-reference");
  await assertSignalCleanup("SIGTERM", "blocked-js");
  await assertSignalCleanup("SIGTERM", "late-js");
});

test("AUD-006 real reference signal cleanup retains stderr diagnostics through a second signal", {
  skip: process.platform === "win32" ? "POSIX process-group evidence is required" : false,
}, async () => {
  const parent = await mkdtemp(join(tmpdir(), "nodriver-differential-realstep-signal-test-"));
  const lockPath = join(parent, "harness.lock");
  const statePath = join(parent, "state.json");
  const pythonPath = join(parent, "synthetic-python");
  const wrapperPath = fileURLToPath(new URL("./support/differential-realstep-signal-wrapper.js", import.meta.url));
  await writeFile(pythonPath, realStepSyntheticPython, "utf8");
  await chmod(pythonPath, 0o755);
  const wrapper = spawn(process.execPath, [wrapperPath], {
    env: {
      ...process.env,
      ZENDRIVER_PYTHON: pythonPath,
      NODRIVER_DIFFERENTIAL_REALSTEP_LOCK: lockPath,
      NODRIVER_DIFFERENTIAL_REALSTEP_STATE: statePath,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const exit = waitForChildExit(wrapper, 8_000);
  let stderr = "";
  wrapper.stderr?.setEncoding("utf8");
  wrapper.stderr?.on("data", (chunk: string) => { stderr = (stderr + chunk).slice(-65_536); });
  let state: { readonly processGroupId: number; readonly profile: string } | undefined;
  let completed = false;
  try {
    try {
      state = await waitForSignalState(statePath, 3_000) as { readonly processGroupId: number; readonly profile: string };
    } catch (error) {
      throw new Error(`Real-step signal wrapper did not become ready. Captured stderr:\n${stderr}`, { cause: error });
    }
    assert.equal(await pathExists(lockPath), true);
    assert.equal(await pathExists(state.profile), true);
    assert.equal(processGroupExists(state.processGroupId), true);
    assert.equal(wrapper.kill("SIGTERM"), true, `Real-step wrapper exited before SIGTERM. Captured stderr:\n${stderr}`);
    await new Promise<void>((resolveWait) => setTimeout(resolveWait, 5));
    assert.equal(wrapper.kill("SIGINT"), true, `Real-step wrapper exited before SIGINT. Captured stderr:\n${stderr}`);

    const result = await exit;
    assert.equal(result.signal, null);
    assert.notEqual(result.code, 0);
    assert.match(stderr, /Differential run received SIGTERM/);
    assert.match(stderr, /realstep-signal-stderr-sentinel/);
    assert.equal(processGroupExists(state.processGroupId), false);
    assert.equal(await pathExists(state.profile), false);
    assert.equal(await pathExists(lockPath), false);
    completed = true;
  } finally {
    if (!completed) {
      if (wrapper.exitCode === null && wrapper.signalCode === null) wrapper.kill("SIGKILL");
      if (state !== undefined && processGroupExists(state.processGroupId)) {
        try { process.kill(-state.processGroupId, "SIGKILL"); } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
        }
      }
      if (state !== undefined && !processGroupExists(state.processGroupId)) {
        await removeOwnedDifferentialProfile(state.profile);
      }
      await rm(lockPath, { recursive: true, force: true });
      await exit.catch(() => undefined);
    }
    await rm(parent, { recursive: true, force: true });
  }
});

test("AUD-006 production scenario retains its lock until owned browser cleanup fully settles", {
  skip: process.platform === "win32" ? "POSIX signal evidence is required" : false,
}, async (context) => {
  const parent = await mkdtemp(join(tmpdir(), "nodriver-differential-production-signal-test-"));
  const lockPath = join(parent, "harness.lock");
  const statePath = join(parent, "state.json");
  const pythonPath = join(parent, "synthetic-python");
  const wrapperPath = fileURLToPath(new URL("./support/differential-production-signal-wrapper.js", import.meta.url));
  await writeFile(pythonPath, productionSyntheticPython, "utf8");
  await chmod(pythonPath, 0o755);
  const wrapper = spawn(process.execPath, [wrapperPath], {
    env: {
      ...process.env,
      ZENDRIVER_PYTHON: pythonPath,
      NODRIVER_DIFFERENTIAL_PRODUCTION_LOCK: lockPath,
      NODRIVER_DIFFERENTIAL_PRODUCTION_STATE: statePath,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const exit = waitForChildExit(wrapper, 10_000);
  let stderr = "";
  wrapper.stderr?.setEncoding("utf8");
  wrapper.stderr?.on("data", (chunk: string) => { stderr = (stderr + chunk).slice(-65_536); });
  let state: { readonly childPid: number; readonly profile: string } | undefined;
  let completed = false;
  try {
    try {
      state = await waitForProductionState(statePath, 3_000);
    } catch (error) {
      throw new Error(`Production signal wrapper did not become ready. Captured stderr:\n${stderr}`, { cause: error });
    }
    assert.equal(await pathExists(lockPath), true);
    assert.equal(await pathExists(state.profile), true);
    assert.equal(processExists(state.childPid), true);
    const signaledAt = Date.now();
    assert.equal(wrapper.kill("SIGTERM"), true, `Production wrapper exited before SIGTERM. Captured stderr:\n${stderr}`);
    await new Promise<void>((resolveWait) => setTimeout(resolveWait, 5));
    assert.equal(wrapper.kill("SIGINT"), true, `Production wrapper exited before SIGINT. Captured stderr:\n${stderr}`);

    await new Promise<void>((resolveWait) => setTimeout(resolveWait, 4_300));
    const heldCheckMs = Date.now() - signaledAt;
    assert.equal(wrapper.exitCode, null, `Production wrapper exited before browser cleanup. Captured stderr:\n${stderr}`);
    assert.equal(wrapper.signalCode, null);
    assert.equal(await pathExists(lockPath), true);
    assert.equal(await pathExists(state.profile), true);
    assert.equal(processExists(state.childPid), true);

    const result = await exit;
    const elapsedMs = Date.now() - signaledAt;
    assert.equal(result.signal, null);
    assert.notEqual(result.code, 0);
    assert.ok(elapsedMs >= 4_600, `Production cleanup settled too early after ${elapsedMs}ms`);
    assert.match(stderr, /Differential run received SIGTERM/);
    assert.doesNotMatch(stderr, /Cleanup settlement timeout/);
    assert.equal(processExists(state.childPid), false);
    assert.equal(await pathExists(state.profile), false);
    assert.equal(await pathExists(lockPath), false);
    context.diagnostic(`production cleanup timing: lock/resources held at ${heldCheckMs}ms; wrapper exited after ${elapsedMs}ms`);
    completed = true;
  } finally {
    if (!completed) {
      if (wrapper.exitCode === null && wrapper.signalCode === null) wrapper.kill("SIGKILL");
      if (state !== undefined && processExists(state.childPid)) {
        try { process.kill(state.childPid, "SIGKILL"); } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
        }
      }
      if (state !== undefined) await rm(state.profile, { recursive: true, force: true });
      await rm(lockPath, { recursive: true, force: true });
      await exit.catch(() => undefined);
    }
    await rm(parent, { recursive: true, force: true });
  }
});

test("AUD-006 profile cleanup refuses an arbitrary sentinel directory", async () => {
  const sentinel = await mkdtemp(join(tmpdir(), "nodriver-reference-sentinel-"));
  const marker = join(sentinel, "marker.txt");
  await writeFile(marker, "keep", "utf8");
  try {
    await assert.rejects(removeOwnedDifferentialProfile(sentinel), /Refusing to remove non-differential profile/);
    assert.equal(await readFile(marker, "utf8"), "keep");
  } finally {
    await rm(sentinel, { recursive: true, force: true });
  }
});

function fakeSteps(
  events: string[],
  overrides: Partial<Pick<DifferentialSteps, "runReference" | "runNative">> = {},
): DifferentialSteps {
  return {
    resolveReferencePython: async () => {
      events.push("reference:resolve");
      return "/pinned/zendriver/python";
    },
    discoverExecutable: async () => {
      events.push("chromium:discover");
      return "/shared/chromium";
    },
    startFixture: async () => {
      events.push("fixture:start");
      return {
        url: "http://127.0.0.1:1",
        close: async () => { events.push("fixture:close"); },
      };
    },
    runReference: overrides.runReference ?? (async () => {
      events.push("zendriver:start", "zendriver:stop");
      return fakeResult("zendriver-0.15.5", "unavailable");
    }),
    runJs: async () => {
      events.push("js:start", "js:stop");
      return fakeResult("js", []);
    },
    runNative: overrides.runNative ?? (async () => {
      events.push("native:start", "native:stop");
      return fakeResult("native", []);
    }),
  };
}

function fakeResult(backend: string, trace: RunResult["trace"]): RunResult {
  return {
    backend,
    outcome,
    trace,
    cleanup: { stopped: true, profileRemoved: true, profile: `/tmp/${backend}` },
  };
}

async function proveLockIsFree(lockPath: string): Promise<void> {
  const release = await acquireHarnessLock(lockPath);
  await release();
}

function runSyntheticReference(script: string, timeoutMs: number): ReturnType<typeof runBoundedReferenceProcess> {
  return runBoundedReferenceProcess(process.execPath, ["--input-type=commonjs", "-e", script], timeoutMs);
}

function processGroupExists(processGroupId: number | undefined): boolean {
  if (processGroupId === undefined) throw new Error("Synthetic reference did not report a process group");
  try {
    process.kill(-processGroupId, 0);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ESRCH") return false;
    throw error;
  }
}

const grandchildScript = "setInterval(() => {}, 1_000)";
const timeoutParentScript = `
  const { spawn } = require("node:child_process");
  process.stderr.write("timeout-stderr-sentinel\\n");
  spawn(process.execPath, ["--input-type=commonjs", "-e", ${JSON.stringify(grandchildScript)}], { stdio: "ignore" });
  setInterval(() => {}, 1_000);
`;
const nonzeroParentScript = `
  const { spawn } = require("node:child_process");
  process.stderr.write("nonzero-stderr-sentinel\\n");
  spawn(process.execPath, ["--input-type=commonjs", "-e", ${JSON.stringify(grandchildScript)}], { stdio: "ignore" });
  setTimeout(() => process.exit(7), 50);
`;

const realStepSyntheticPython = `#!/usr/bin/env node
const { spawn } = require("node:child_process");
const { writeFileSync } = require("node:fs");
if (process.argv[2] === "-c") process.exit(0);
const statePath = process.env.NODRIVER_DIFFERENTIAL_REALSTEP_STATE;
const profile = process.argv.at(-1);
process.on("SIGTERM", () => {});
process.stderr.write("realstep-signal-stderr-sentinel\\n");
const grandchild = "process.on('SIGTERM', () => {}); setInterval(() => {}, 1_000)";
spawn(process.execPath, ["--input-type=commonjs", "-e", grandchild], { stdio: "ignore" });
writeFileSync(statePath, JSON.stringify({ processGroupId: process.pid, profile }));
setInterval(() => {}, 1_000);
`;

const productionSyntheticPython = `#!/usr/bin/env node
if (process.argv[2] === "-c") process.exit(0);
const profile = process.argv.at(-1);
const outcome = ${JSON.stringify(outcome)};
process.stdout.write(JSON.stringify({ outcome, cleanup: { stopped: true, profile } }));
`;

async function assertSignalCleanup(
  signal: "SIGINT" | "SIGTERM",
  signalWindow: "active-reference" | "blocked-js" | "late-js" | "pre-reference",
  secondarySignal?: "SIGINT" | "SIGTERM",
): Promise<void> {
  const parent = await mkdtemp(join(tmpdir(), "nodriver-differential-signal-test-"));
  const lockPath = join(parent, "harness.lock");
  const statePath = join(parent, "state.json");
  const fixtureClosedPath = join(parent, "fixture-closed");
  const sentinel = `signal-stderr-sentinel-${signalWindow}-${signal}`;
  const wrapperPath = fileURLToPath(new URL("./support/differential-signal-wrapper.js", import.meta.url));
  const wrapper = spawn(process.execPath, [wrapperPath], {
    env: {
      ...process.env,
      NODRIVER_DIFFERENTIAL_SIGNAL_LOCK: lockPath,
      NODRIVER_DIFFERENTIAL_SIGNAL_STATE: statePath,
      NODRIVER_DIFFERENTIAL_SIGNAL_FIXTURE_CLOSED: fixtureClosedPath,
      NODRIVER_DIFFERENTIAL_SIGNAL_SENTINEL: sentinel,
      NODRIVER_DIFFERENTIAL_SIGNAL_WINDOW: signalWindow,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const exit = waitForChildExit(wrapper, 8_000);
  let stderr = "";
  wrapper.stderr?.setEncoding("utf8");
  wrapper.stderr?.on("data", (chunk: string) => { stderr = (stderr + chunk).slice(-65_536); });
  let state: { readonly processGroupId?: number; readonly profile: string } | undefined;
  let completed = false;
  try {
    try {
      state = await waitForSignalState(statePath, 3_000);
    } catch (error) {
      throw new Error(`Signal wrapper did not become ready. Captured stderr:\n${stderr}`, { cause: error });
    }
    assert.equal(await pathExists(lockPath), true);
    assert.equal(await pathExists(state.profile), signalWindow !== "blocked-js" && signalWindow !== "late-js");
    if (signalWindow === "active-reference") assert.equal(processGroupExists(state.processGroupId), true);
    else assert.equal(state.processGroupId, undefined);
    assert.equal(wrapper.kill(signal), true, `${signalWindow} wrapper exited before ${signal}. Captured stderr:\n${stderr}`);
    if (secondarySignal !== undefined) {
      await new Promise<void>((resolveWait) => setTimeout(resolveWait, 5));
      assert.equal(wrapper.kill(secondarySignal), true, `${signalWindow} wrapper exited before ${secondarySignal}. Captured stderr:\n${stderr}`);
    }

    const result = await exit;
    assert.equal(result.signal, null);
    assert.notEqual(result.code, 0);
    assert.match(stderr, new RegExp(`received ${signal}`));
    if (signalWindow === "active-reference") assert.match(stderr, new RegExp(sentinel));
    if (signalWindow === "pre-reference") assert.match(stderr, /Cleanup settlement timeout for differential step "runReference"/);
    if (signalWindow === "blocked-js") assert.match(stderr, /Cleanup settlement timeout for differential step "runJs"/);
    if (signalWindow === "late-js") {
      assert.match(stderr, /Cleanup settlement failure for differential step "runJs"/);
      assert.match(stderr, /late cleanup failure sentinel/);
      assert.doesNotMatch(stderr, /Cleanup settlement timeout/);
    }
    if (state.processGroupId !== undefined) assert.equal(processGroupExists(state.processGroupId), false);
    assert.equal(await pathExists(state.profile), false);
    assert.equal(await pathExists(lockPath), false);
    assert.equal(await readFile(fixtureClosedPath, "utf8"), "closed");
    completed = true;
  } finally {
    if (!completed) {
      if (wrapper.exitCode === null && wrapper.signalCode === null) wrapper.kill("SIGKILL");
      if (state?.processGroupId !== undefined && processGroupExists(state.processGroupId)) {
        try { process.kill(-state.processGroupId, "SIGKILL"); } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
        }
      }
      if (state !== undefined && (state.processGroupId === undefined || !processGroupExists(state.processGroupId))) {
        await removeOwnedDifferentialProfile(state.profile);
      }
      await rm(lockPath, { recursive: true, force: true });
      await exit.catch(() => undefined);
    }
    await rm(parent, { recursive: true, force: true });
  }
}

async function waitForSignalState(
  statePath: string,
  timeoutMs: number,
): Promise<{ readonly processGroupId?: number; readonly profile: string }> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      return JSON.parse(await readFile(statePath, "utf8")) as { readonly processGroupId?: number; readonly profile: string };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT" && !(error instanceof SyntaxError)) throw error;
    }
    await new Promise<void>((resolveWait) => setTimeout(resolveWait, 25));
  }
  throw new Error(`Timed out waiting for synthetic reference state at ${statePath}`);
}

async function waitForProductionState(
  statePath: string,
  timeoutMs: number,
): Promise<{ readonly childPid: number; readonly profile: string }> {
  return waitForSignalState(statePath, timeoutMs) as Promise<{ readonly childPid: number; readonly profile: string }>;
}

function waitForChildExit(
  child: ChildProcess,
  timeoutMs: number,
): Promise<{ readonly code: number | null; readonly signal: NodeJS.Signals | null }> {
  return new Promise((resolveExit, rejectExit) => {
    const timeout = setTimeout(() => rejectExit(new Error(`Signal wrapper did not exit within ${timeoutMs}ms`)), timeoutMs);
    child.once("error", (error) => {
      clearTimeout(timeout);
      rejectExit(error);
    });
    child.once("exit", (code, signal) => {
      clearTimeout(timeout);
      resolveExit({ code, signal });
    });
  });
}
