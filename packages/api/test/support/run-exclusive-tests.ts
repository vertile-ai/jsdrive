import { spawn } from "node:child_process";
import { resolve } from "node:path";
import {
  acquireHarnessLock,
  assertHeadfulAuthorized,
  HARNESS_PHASE_ENV,
  HEADFUL_REQUEST_ENV,
} from "./persistent-harness.js";

const testFiles = process.argv.slice(2);
const headful = testFiles[0] === "--headful";
if (headful) testFiles.shift();
if (testFiles.length === 0) throw new Error("Provide at least one compiled test file to the exclusive harness");

const environment: NodeJS.ProcessEnv = {
  ...process.env,
  [HARNESS_PHASE_ENV]: headful ? "headful" : "headless",
  ...(headful ? { [HEADFUL_REQUEST_ENV]: "1" } : {}),
};
assertHeadfulAuthorized(!headful, environment);

const releaseLock = await acquireHarnessLock();
let exitCode = 0;
try {
  for (const file of testFiles) {
    exitCode = await runTest(resolve(file), environment);
    if (exitCode !== 0) break;
  }
} finally {
  await releaseLock();
}
process.exitCode = exitCode;

async function runTest(file: string, childEnvironment: NodeJS.ProcessEnv): Promise<number> {
  const child = spawn(process.execPath, ["--test", "--test-concurrency=1", file], {
    env: childEnvironment,
    stdio: "inherit",
  });
  return new Promise<number>((resolveCode, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal !== null) reject(new Error(`Exclusive test process was terminated by ${signal}`));
      else resolveCode(code ?? 1);
    });
  });
}
