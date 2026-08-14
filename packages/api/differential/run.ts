import assert from "node:assert/strict";
import { access, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { CdpConnection, type RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import {
  Browser,
  CdpTraceRecorder,
  captureNetworkBootstrap,
  compareTraces,
  discoverChromeExecutable,
  extractRuntimeValue,
  hasTrace,
  runProviderPage,
  type NormalizedTraceEntry,
} from "../src/index.js";
import {
  acquireHarnessLock,
  HARNESS_LOCK_PATH,
  pathExists,
  processExists,
} from "../test/support/persistent-harness.js";
import { startProviderFixture, type ProviderFixture } from "./fixture.js";
import {
  ReferenceProcessError,
  removeOwnedDifferentialProfile,
  runBoundedReferenceProcess,
} from "./reference-process.js";

const ABORT_SETTLEMENT_GRACE_MS = 4_000;
const ABORT_DIAGNOSTIC_DRAIN_MS = 250;

export interface Outcome {
  readonly qwenRuntimeToken: string;
  readonly lmArenaRequestHeader: string;
  readonly lmArenaLocalStorage: string;
  readonly openaiCapture: boolean;
  readonly geminiSessionCookie: string;
  readonly grokBootstrapHeader: string;
  readonly grokBootstrapBody: string;
}

export interface CleanupEvidence {
  readonly stopped: boolean;
  readonly profileRemoved: boolean;
  readonly profile: string;
  readonly processStopped?: boolean;
  readonly pid?: number;
  readonly childPid?: number;
  readonly processGroupId?: number;
}

export interface RunResult {
  readonly backend: string;
  readonly outcome: Outcome;
  readonly trace: readonly NormalizedTraceEntry[] | "unavailable";
  readonly status?: "available";
  readonly cleanup: CleanupEvidence;
}

export interface DifferentialReport {
  readonly scenario: "provider-bootstrap";
  readonly executionOrder: readonly ["zendriver-0.15.5", "js", "native"];
  readonly runs: readonly [RunResult, RunResult, RunResult];
  readonly traceDifferences: readonly unknown[];
  readonly cleanup: {
    readonly fixtureClosed: boolean;
    readonly lockReleased: boolean;
  };
}

export interface DifferentialSteps {
  resolveReferencePython(signal: AbortSignal): Promise<string>;
  discoverExecutable(signal: AbortSignal): Promise<string>;
  startFixture(signal: AbortSignal): Promise<ProviderFixture>;
  runReference(url: string, python: string, executable: string, signal: AbortSignal): Promise<RunResult>;
  runJs(url: string, executable: string, signal: AbortSignal): Promise<RunResult>;
  runNative(url: string, executable: string, signal: AbortSignal): Promise<RunResult>;
}

const realSteps: DifferentialSteps = {
  resolveReferencePython: resolveZendriverPython,
  discoverExecutable: async (signal) => {
    signal.throwIfAborted();
    const executable = await discoverChromeExecutable();
    signal.throwIfAborted();
    return executable;
  },
  startFixture: startDifferentialFixture,
  runReference: runZendriver,
  runJs: (url, executable, signal) => runScenario("js", CdpConnection, url, executable, signal),
  runNative: async (url, executable, signal) => {
    signal.throwIfAborted();
    const { NativeConnection } = await import("@vertile-ai/jsdriver-runtime-native");
    signal.throwIfAborted();
    return runScenario("native", NativeConnection, url, executable, signal);
  },
};

export class DifferentialSignalError extends Error {
  public constructor(public readonly signalName: "SIGINT" | "SIGTERM") {
    super(`Differential run received ${signalName}`);
    this.name = "DifferentialSignalError";
  }
}

export async function runDifferential(options: {
  readonly lockPath?: string;
  readonly steps?: DifferentialSteps;
} = {}): Promise<DifferentialReport> {
  const lockPath = options.lockPath ?? HARNESS_LOCK_PATH;
  const productionSteps = options.steps === undefined;
  const steps = options.steps ?? realSteps;
  const controller = new AbortController();
  const interrupt = (signalName: "SIGINT" | "SIGTERM"): void => {
    if (!controller.signal.aborted) controller.abort(new DifferentialSignalError(signalName));
  };
  const onSigint = (): void => interrupt("SIGINT");
  const onSigterm = (): void => interrupt("SIGTERM");
  process.on("SIGINT", onSigint);
  process.on("SIGTERM", onSigterm);

  let releaseLock: (() => Promise<void>) | undefined;
  let lockReleasedByFinally = false;
  let fixture: ProviderFixture | undefined;
  let fixtureClosed = false;
  let completed: Omit<DifferentialReport, "cleanup"> | undefined;
  try {
    releaseLock = await acquireHarnessLock(lockPath);
    controller.signal.throwIfAborted();
    const runStep = async <T>(stepName: string, step: () => Promise<T>): Promise<T> => {
      controller.signal.throwIfAborted();
      return raceDifferentialAbort(
        step(),
        controller.signal,
        productionSteps ? undefined : ABORT_SETTLEMENT_GRACE_MS,
        stepName,
      );
    };

    try {
      const python = await runStep("resolveReferencePython", () => steps.resolveReferencePython(controller.signal));
      controller.signal.throwIfAborted();
      const executable = await runStep("discoverExecutable", () => steps.discoverExecutable(controller.signal));
      controller.signal.throwIfAborted();
      fixture = await runStep("startFixture", () => steps.startFixture(controller.signal));
      controller.signal.throwIfAborted();
      const fixtureUrl = fixture.url;

      const zendriver = await runStep("runReference", () => steps.runReference(fixtureUrl, python, executable, controller.signal));
      controller.signal.throwIfAborted();
      const js = await runStep("runJs", () => steps.runJs(fixtureUrl, executable, controller.signal));
      controller.signal.throwIfAborted();
      const native = await runStep("runNative", () => steps.runNative(fixtureUrl, executable, controller.signal));
      controller.signal.throwIfAborted();

      assert.deepEqual(js.outcome, zendriver.outcome);
      assert.deepEqual(native.outcome, js.outcome);
      const traceDifferences = compareOutbound(js, native);
      assert.deepEqual(traceDifferences, []);
      completed = {
        scenario: "provider-bootstrap",
        executionOrder: ["zendriver-0.15.5", "js", "native"],
        runs: [zendriver, js, native],
        traceDifferences,
      };
    } finally {
      try {
        if (fixture !== undefined) {
          await fixture.close();
          fixtureClosed = true;
        }
      } finally {
        await releaseLock();
        lockReleasedByFinally = true;
      }
    }

    controller.signal.throwIfAborted();
    assert.ok(completed);
    const lockReleased = !(await pathExists(lockPath));
    assert.equal(lockReleased, true, `Differential harness lock ${lockPath} still exists after cleanup`);
    controller.signal.throwIfAborted();
    return { ...completed, cleanup: { fixtureClosed, lockReleased } };
  } finally {
    if (releaseLock !== undefined && !lockReleasedByFinally) await releaseLock();
    process.off("SIGINT", onSigint);
    process.off("SIGTERM", onSigterm);
  }
}

async function runScenario(
  backend: string,
  factory: RuntimeBackendFactory,
  url: string,
  executable: string,
  signal: AbortSignal,
): Promise<RunResult> {
  signal.throwIfAborted();
  const browser = await Browser.start({
    backend: factory,
    domainPolicy: "reference-counted",
    executable,
    headless: true,
  });
  const metadata = browser.process;
  let outcome: Outcome | undefined;
  let trace: readonly NormalizedTraceEntry[] | "unavailable" = "unavailable";
  let cleanup: CleanupEvidence | undefined;
  let providerWork: Promise<Outcome> | undefined;
  try {
    signal.throwIfAborted();
    if (metadata?.pid === undefined) throw new Error(`${backend} differential browser did not expose owned process metadata`);
    providerWork = runProviderPage<Outcome>(browser, {
      url,
      bootstrap: async (tab) => { await tab.waitForReadyState("complete"); },
      action: async (tab) => {
        const captured = await captureNetworkBootstrap(browser, tab, ".*/openai-bootstrap", () => tab.evaluate("bootstrapProvider()"), {
          cookieNames: ["geminiSession"], localStorageKeys: ["lmArenaAuth"],
        });
        const token = await extractRuntimeValue<string>(tab, "qwenRuntimeToken");
        const body = captured.json<{ readonly openaiCapture: boolean; readonly grokBootstrap: string }>();
        if (hasTrace(tab.connection)) trace = new CdpTraceRecorder(tab.connection).outbound();
        return {
          qwenRuntimeToken: token,
          lmArenaRequestHeader: String(captured.request.headers["x-lmarena-auth"]),
          lmArenaLocalStorage: String(captured.session.localStorage.lmArenaAuth),
          openaiCapture: body.openaiCapture,
          geminiSessionCookie: String(captured.session.cookies.geminiSession),
          grokBootstrapHeader: String(captured.response.headers["x-grok-bootstrap"]),
          grokBootstrapBody: body.grokBootstrap,
        };
      },
    });
    outcome = await raceDifferentialAbort(providerWork, signal, 0);
    signal.throwIfAborted();
  } finally {
    let closeError: unknown;
    try {
      await browser.close();
    } catch (error) {
      closeError = error;
    }
    await providerWork?.catch(() => undefined);
    if (metadata?.pid !== undefined) {
      cleanup = {
        stopped: browser.stopped,
        processStopped: !processExists(metadata.pid),
        profileRemoved: !(await pathExists(metadata.profile)),
        profile: metadata.profile,
        pid: metadata.pid,
      };
      assert.equal(cleanup.stopped, true, `${backend} browser did not report stopped after cleanup`);
      assert.equal(cleanup.processStopped, true, `${backend} Chromium PID ${metadata.pid} is still running after cleanup`);
      assert.equal(cleanup.profileRemoved, true, `${backend} Chromium profile ${metadata.profile} still exists after cleanup`);
    }
    if (closeError !== undefined) throw closeError;
  }
  signal.throwIfAborted();
  assert.ok(outcome);
  assert.ok(cleanup);
  return { backend, outcome, trace, cleanup };
}

function compareOutbound(left: RunResult, right: RunResult): readonly unknown[] {
  if (left.trace === "unavailable" || right.trace === "unavailable") return [{ reason: "trace unavailable" }];
  return compareTraces(left.trace, right.trace);
}

async function resolveZendriverPython(signal: AbortSignal): Promise<string> {
  signal.throwIfAborted();
  const referencePython = resolve(".tmp/zendriver-ref/bin/python");
  const localPython = resolve(".tmp/zendriver-0.15.5/bin/python");
  let python = process.env.ZENDRIVER_PYTHON ?? "python3";
  if (process.env.ZENDRIVER_PYTHON === undefined) {
    try { await access(referencePython); python = referencePython; } catch {
      try { await access(localPython); python = localPython; } catch { /* Try the active Python environment. */ }
    }
  }
  try {
    await runBoundedReferenceProcess(
      python,
      ["-c", "import importlib.metadata; assert importlib.metadata.version('zendriver') == '0.15.5'"],
      10_000,
      signal,
    );
  } catch (error) {
    throw new Error("Differential requires an installed Zendriver 0.15.5 reference", { cause: error });
  }
  signal.throwIfAborted();
  return python;
}

async function runZendriver(url: string, python: string, executable: string, signal: AbortSignal): Promise<RunResult> {
  signal.throwIfAborted();
  const profile = await mkdtemp(join(tmpdir(), "nodriver-differential-zendriver-"));
  let processResult: Awaited<ReturnType<typeof runBoundedReferenceProcess>> | undefined;
  let result: { readonly outcome: Outcome; readonly cleanup: { readonly stopped: boolean; readonly profile: string } } | undefined;
  let processStopped = true;
  try {
    signal.throwIfAborted();
    processStopped = false;
    processResult = await runBoundedReferenceProcess(python, [
      resolve("packages/api/differential/zendriver_runner.py"),
      url,
      executable,
      profile,
    ], 90_000, signal);
    processStopped = processResult.processStopped;
    signal.throwIfAborted();
    result = JSON.parse(processResult.stdout) as {
      readonly outcome: Outcome;
      readonly cleanup: { readonly stopped: boolean; readonly profile: string };
    };
  } catch (error) {
    if (error instanceof ReferenceProcessError) processStopped = error.processStopped;
    throw error;
  } finally {
    if (processStopped) await removeOwnedDifferentialProfile(profile);
  }
  assert.ok(processResult);
  assert.ok(result);
  signal.throwIfAborted();
  assert.equal(result.cleanup.stopped, true, "Zendriver did not report stopped after cleanup");
  assert.equal(resolve(result.cleanup.profile), resolve(profile), "Zendriver reported a different profile than the Node-owned profile");
  const profileRemoved = !(await pathExists(profile));
  assert.equal(profileRemoved, true, `Zendriver profile ${profile} still exists after Node cleanup`);
  return {
    backend: "zendriver-0.15.5",
    status: "available",
    outcome: result.outcome,
    trace: "unavailable",
    cleanup: {
      stopped: result.cleanup.stopped,
      processStopped: processResult.processStopped,
      profileRemoved,
      profile,
      childPid: processResult.childPid,
      processGroupId: processResult.processGroupId,
    },
  };
}

async function startDifferentialFixture(signal: AbortSignal): Promise<ProviderFixture> {
  signal.throwIfAborted();
  const fixture = await startProviderFixture();
  if (signal.aborted) {
    await fixture.close();
    signal.throwIfAborted();
  }
  return fixture;
}

async function raceDifferentialAbort<T>(
  operation: Promise<T>,
  signal: AbortSignal,
  settlementGraceMs: number | undefined,
  stepName?: string,
): Promise<T> {
  signal.throwIfAborted();
  let rejectAbort: (reason: unknown) => void = () => {};
  const aborted = new Promise<never>((_resolve, reject) => { rejectAbort = reject; });
  const abort = (): void => rejectAbort(signal.reason);
  signal.addEventListener("abort", abort, { once: true });
  try {
    return await Promise.race([operation, aborted]);
  } catch (error) {
    if (signal.aborted) {
      if (settlementGraceMs === undefined) {
        try {
          await operation;
        } catch (settlementError) {
          throw settlementError;
        }
        throw signal.reason;
      }
      const settlement = await waitForSettlement(operation, settlementGraceMs);
      if (settlement?.status === "rejected") throw settlement.reason;
      if (settlement === undefined && stepName !== undefined) {
        const diagnosticSettlement = await waitForSettlement(operation, ABORT_DIAGNOSTIC_DRAIN_MS);
        if (diagnosticSettlement?.status === "rejected") {
          throw cleanupSettlementFailure(stepName, signal.reason, diagnosticSettlement.reason);
        }
        if (diagnosticSettlement === undefined) {
          throw new DifferentialCleanupSettlementError(
            `Cleanup settlement timeout for differential step "${stepName}" after ${signalMessage(signal.reason)}: `
              + `the step remained pending for ${settlementGraceMs + ABORT_DIAGNOSTIC_DRAIN_MS}ms; `
              + "fixture and lock will be released without confirmed step cleanup",
            signal.reason,
          );
        }
      }
      throw signal.reason;
    }
    throw error;
  } finally {
    signal.removeEventListener("abort", abort);
  }
}

class DifferentialCleanupSettlementError extends Error {
  public constructor(message: string, cause: unknown) {
    super(message, { cause });
    this.name = "DifferentialCleanupSettlementError";
  }
}

function cleanupSettlementFailure(stepName: string, signalReason: unknown, failure: unknown): Error {
  const detail = failure instanceof Error ? failure.message : String(failure);
  return new DifferentialCleanupSettlementError(
    `Cleanup settlement failure for differential step "${stepName}" after ${signalMessage(signalReason)}: ${detail}`,
    failure,
  );
}

function signalMessage(reason: unknown): string {
  return reason instanceof Error ? reason.message : String(reason ?? "abort requested");
}

async function waitForSettlement<T>(
  operation: Promise<T>,
  timeoutMs: number,
): Promise<PromiseSettledResult<T> | undefined> {
  if (timeoutMs === 0) return undefined;
  let timeout: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      operation.then<PromiseSettledResult<T>, PromiseSettledResult<T>>(
        (value) => ({ status: "fulfilled", value }),
        (reason: unknown) => ({ status: "rejected", reason }),
      ),
      new Promise<undefined>((resolveTimeout) => { timeout = setTimeout(resolveTimeout, timeoutMs, undefined); }),
    ]);
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
  }
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  console.log(JSON.stringify(await runDifferential(), null, 2));
}
