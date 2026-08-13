import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { CdpConnection, type RuntimeBackendFactory } from "@nodriver/runtime-js";
import { NativeConnection } from "@nodriver/runtime-native";
import {
  Browser,
  CdpTraceRecorder,
  captureNetworkBootstrap,
  compareTraces,
  extractRuntimeValue,
  hasTrace,
  runProviderPage,
  type NormalizedTraceEntry,
} from "../src/index.js";
import { startProviderFixture } from "./fixture.js";

interface Outcome {
  readonly qwenRuntimeToken: string;
  readonly lmArenaRequestHeader: string;
  readonly lmArenaLocalStorage: string;
  readonly openaiCapture: boolean;
  readonly geminiSessionCookie: string;
  readonly grokBootstrapHeader: string;
  readonly grokBootstrapBody: string;
}

interface RunResult {
  readonly backend: string;
  readonly outcome: Outcome;
  readonly trace: readonly NormalizedTraceEntry[] | "unavailable";
}

const fixture = await startProviderFixture();
try {
  const js = await runScenario("js", CdpConnection);
  const native = await runScenario("native", NativeConnection);
  assert.deepEqual(native.outcome, js.outcome);
  const traceDifferences = compareOutbound(js, native);
  assert.deepEqual(traceDifferences, []);
  const zendriver = await runZendriver(fixture.url);
  if (zendriver.status === "available") assert.deepEqual(zendriver.outcome, js.outcome);
  console.log(JSON.stringify({ scenario: "provider-bootstrap", runs: [js, native, zendriver], traceDifferences }, null, 2));
} finally {
  await fixture.close();
}

async function runScenario(backend: string, factory: RuntimeBackendFactory): Promise<RunResult> {
  const browser = await Browser.start({ backend: factory, domainPolicy: "reference-counted" });
  try {
    let trace: readonly NormalizedTraceEntry[] | "unavailable" = "unavailable";
    const outcome = await runProviderPage<Outcome>(browser, {
      url: fixture.url,
      bootstrap: async (tab) => { await tab.waitForReadyState("complete"); },
      action: async (tab) => {
        const captured = await captureNetworkBootstrap(browser, tab, "/openai-bootstrap", () => tab.evaluate("bootstrapProvider()"), {
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
    return { backend, outcome, trace };
  } finally {
    await browser.close();
  }
}

function compareOutbound(left: RunResult, right: RunResult): readonly unknown[] {
  if (left.trace === "unavailable" || right.trace === "unavailable") return [{ reason: "trace unavailable" }];
  return compareTraces(left.trace, right.trace);
}

async function runZendriver(url: string): Promise<
  { readonly backend: "zendriver-0.15.5"; readonly status: "available"; readonly outcome: Outcome; readonly trace: "unavailable" }
  | { readonly backend: "zendriver-0.15.5"; readonly status: "unavailable"; readonly reason: string; readonly trace: "unavailable" }
> {
  const referencePython = resolve(".tmp/zendriver-ref/bin/python");
  const localPython = resolve(".tmp/zendriver-0.15.5/bin/python");
  let python = process.env.ZENDRIVER_PYTHON ?? "python3";
  if (process.env.ZENDRIVER_PYTHON === undefined) {
    try { await access(referencePython); python = referencePython; } catch {
      try { await access(localPython); python = localPython; } catch { /* Try the active Python environment. */ }
    }
  }
  try {
    await promisify(execFile)(python, ["-c", "import importlib.metadata; assert importlib.metadata.version('zendriver') == '0.15.5'"]);
  } catch (error) {
    return { backend: "zendriver-0.15.5", status: "unavailable", reason: String(error), trace: "unavailable" };
  }
  const { stdout } = await promisify(execFile)(python, [resolve("packages/api/differential/zendriver_runner.py"), url]);
  return { backend: "zendriver-0.15.5", status: "available", outcome: JSON.parse(stdout) as Outcome, trace: "unavailable" };
}
