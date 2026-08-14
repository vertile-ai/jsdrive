import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runDifferential, type DifferentialSteps, type Outcome, type RunResult } from "../../differential/run.js";
import {
  removeOwnedDifferentialProfile,
  runBoundedReferenceProcess,
} from "../../differential/reference-process.js";

type SignalWindow = "active-reference" | "blocked-js" | "late-js" | "pre-reference";

const lockPath = requiredEnvironment("NODRIVER_DIFFERENTIAL_SIGNAL_LOCK");
const statePath = requiredEnvironment("NODRIVER_DIFFERENTIAL_SIGNAL_STATE");
const fixtureClosedPath = requiredEnvironment("NODRIVER_DIFFERENTIAL_SIGNAL_FIXTURE_CLOSED");
const sentinel = requiredEnvironment("NODRIVER_DIFFERENTIAL_SIGNAL_SENTINEL");
const signalWindow = requiredEnvironment("NODRIVER_DIFFERENTIAL_SIGNAL_WINDOW") as SignalWindow;
let fixtureProfile: string | undefined;
let referenceProfile: string | undefined;
let activeReference: Promise<RunResult> | undefined;
const sigintListenerBaseline = process.listenerCount("SIGINT");
const sigtermListenerBaseline = process.listenerCount("SIGTERM");
let unhandledRejection: unknown;
const onUnhandledRejection = (reason: unknown): void => { unhandledRejection ??= reason; };
process.on("unhandledRejection", onUnhandledRejection);
const outcome: Outcome = {
  qwenRuntimeToken: "qwen-runtime-token",
  lmArenaRequestHeader: "lmarena-request-material",
  lmArenaLocalStorage: "lmarena-storage-material",
  openaiCapture: true,
  geminiSessionCookie: "gemini-cookie-material",
  grokBootstrapHeader: "grok-response-material",
  grokBootstrapBody: "ready",
};

const steps: DifferentialSteps = {
  resolveReferencePython: async () => process.execPath,
  discoverExecutable: async () => "/synthetic/chromium",
  startFixture: async () => {
    if (signalWindow === "pre-reference") {
      fixtureProfile = await mkdtemp(join(tmpdir(), "nodriver-differential-zendriver-"));
    }
    return {
      url: "http://127.0.0.1:1",
      close: async () => {
        assert.equal(process.listenerCount("SIGINT"), sigintListenerBaseline + 1);
        assert.equal(process.listenerCount("SIGTERM"), sigtermListenerBaseline + 1);
        if (fixtureProfile !== undefined) await removeOwnedDifferentialProfile(fixtureProfile);
        await writeFile(fixtureClosedPath, "closed", "utf8");
      },
    };
  },
  runReference: async (_url, _python, _executable, signal) => {
    if (signalWindow === "pre-reference") {
      await writeState({ profile: requiredProfile(fixtureProfile) });
      return new Promise<RunResult>(() => {});
    }
    if (signalWindow === "blocked-js" || signalWindow === "late-js") {
      referenceProfile = await mkdtemp(join(tmpdir(), "nodriver-differential-zendriver-"));
      await removeOwnedDifferentialProfile(referenceProfile);
      return fakeResult("zendriver-0.15.5", "unavailable", referenceProfile);
    }
    activeReference = runActiveReference(signal);
    return activeReference;
  },
  runJs: async (_url, _executable, signal) => {
    if (signalWindow !== "blocked-js" && signalWindow !== "late-js") throw new Error("Signal wrapper unexpectedly reached JS");
    await writeState({ profile: requiredProfile(referenceProfile) });
    if (signalWindow === "late-js") {
      return new Promise<RunResult>((_resolve, reject) => {
        signal.addEventListener("abort", () => {
          setTimeout(() => reject(new Error("late cleanup failure sentinel")), 4_200);
        }, { once: true });
      });
    }
    return new Promise<RunResult>(() => {});
  },
  runNative: async () => { throw new Error("Signal wrapper unexpectedly reached native"); },
};

const keepAlive = setInterval(() => {}, 1_000);
try {
  try {
    await runDifferential({ lockPath, steps });
  } catch (error) {
    await new Promise<void>((resolveWait) => setImmediate(resolveWait));
    assert.equal(unhandledRejection, undefined);
    await activeReference?.catch((referenceError: unknown) => {
      process.stderr.write(`${referenceError instanceof Error ? referenceError.message : String(referenceError)}\n`);
    });
    assert.equal(process.listenerCount("SIGINT"), sigintListenerBaseline);
    assert.equal(process.listenerCount("SIGTERM"), sigtermListenerBaseline);
    throw error;
  }
} finally {
  process.off("unhandledRejection", onUnhandledRejection);
  clearInterval(keepAlive);
}

async function runActiveReference(signal: AbortSignal): Promise<RunResult> {
  const profile = await mkdtemp(join(tmpdir(), "nodriver-differential-zendriver-"));
  const grandchild = "process.on('SIGTERM', () => {}); setInterval(() => {}, 1_000)";
  const script = `
    const { spawn } = require("node:child_process");
    const { writeFileSync } = require("node:fs");
    process.on("SIGTERM", () => {});
    process.stderr.write(${JSON.stringify(`${sentinel}\n`)});
    spawn(process.execPath, ["--input-type=commonjs", "-e", ${JSON.stringify(grandchild)}], { stdio: "ignore" });
    writeFileSync(${JSON.stringify(statePath)}, JSON.stringify({ processGroupId: process.pid, profile: ${JSON.stringify(profile)} }));
    setInterval(() => {}, 1_000);
  `;
  try {
    await runBoundedReferenceProcess(process.execPath, ["--input-type=commonjs", "-e", script], 60_000, signal);
    throw new Error("Synthetic signal reference unexpectedly completed");
  } finally {
    await removeOwnedDifferentialProfile(profile);
  }
}

async function writeState(state: { readonly processGroupId?: number; readonly profile: string }): Promise<void> {
  await writeFile(statePath, JSON.stringify(state), "utf8");
}

function fakeResult(backend: string, trace: RunResult["trace"], profile: string): RunResult {
  return { backend, outcome, trace, cleanup: { stopped: true, processStopped: true, profileRemoved: true, profile } };
}

function requiredProfile(profile: string | undefined): string {
  if (profile === undefined) throw new Error("Signal wrapper profile is unavailable");
  return profile;
}

function requiredEnvironment(name: string): string {
  const value = process.env[name];
  if (value === undefined) throw new Error(`${name} is required`);
  return value;
}
