import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Browser } from "../../src/index.js";
import { runDifferential } from "../../differential/run.js";

const lockPath = requiredEnvironment("NODRIVER_DIFFERENTIAL_PRODUCTION_LOCK");
const statePath = requiredEnvironment("NODRIVER_DIFFERENTIAL_PRODUCTION_STATE");
const sigintListenerBaseline = process.listenerCount("SIGINT");
const sigtermListenerBaseline = process.listenerCount("SIGTERM");
const originalStart = Browser.start;

Object.defineProperty(Browser, "start", {
  configurable: true,
  value: async () => startSyntheticBrowser(),
});

try {
  try {
    await runDifferential({ lockPath });
  } catch (error) {
    assert.equal(process.listenerCount("SIGINT"), sigintListenerBaseline);
    assert.equal(process.listenerCount("SIGTERM"), sigtermListenerBaseline);
    throw error;
  }
} finally {
  Object.defineProperty(Browser, "start", { configurable: true, value: originalStart });
}

async function startSyntheticBrowser(): Promise<Browser> {
  const profile = await mkdtemp(join(tmpdir(), "nodriver-production-signal-browser-"));
  const child = spawn(process.execPath, ["--input-type=commonjs", "-e", "setInterval(() => {}, 1_000)"], {
    stdio: "ignore",
  });
  if (child.pid === undefined) throw new Error("Synthetic production browser did not expose a PID");
  const childPid = child.pid;
  const childExited = new Promise<void>((resolveExit, rejectExit) => {
    child.once("error", rejectExit);
    child.once("exit", () => resolveExit());
  });
  let stopped = false;
  let rejectProvider: (reason: unknown) => void = () => {};
  await writeFile(statePath, JSON.stringify({ childPid, profile }), "utf8");
  return {
    process: { pid: childPid, profile },
    get stopped() { return stopped; },
    get: () => new Promise((_resolve, reject) => { rejectProvider = reject; }),
    close: async () => {
      await new Promise<void>((resolveWait) => setTimeout(resolveWait, 4_700));
      child.kill("SIGTERM");
      await childExited;
      await rm(profile, { recursive: true, force: true });
      stopped = true;
      rejectProvider(new Error("provider stopped after synthetic browser cleanup"));
    },
  } as unknown as Browser;
}

function requiredEnvironment(name: string): string {
  const value = process.env[name];
  if (value === undefined) throw new Error(`${name} is required`);
  return value;
}
