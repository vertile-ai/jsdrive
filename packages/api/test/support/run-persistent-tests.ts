import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PersistentHarnessOwner } from "./harness-owner.js";
import {
  HARNESS_ENDPOINT_ENV,
  HARNESS_METADATA_ENV,
  HARNESS_PHASE_ENV,
  HEADFUL_REQUEST_ENV,
} from "./persistent-harness.js";

const testFiles = process.argv.slice(2);
const expectFailure = testFiles[0] === "--expect-failure";
if (expectFailure) testFiles.shift();
const headful = testFiles[0] === "--headful";
if (headful) testFiles.shift();
if (testFiles.length === 0) throw new Error("Provide at least one compiled test file to the persistent harness");

const childEnvironment: NodeJS.ProcessEnv = {
  ...process.env,
  [HARNESS_PHASE_ENV]: headful ? "headful" : "headless",
  ...(headful ? { [HEADFUL_REQUEST_ENV]: "1" } : {}),
};

const owner = await PersistentHarnessOwner.start(!headful, undefined, childEnvironment);
let exitCode = 0;
let observedFailure = false;
try {
  const preload = fileURLToPath(new URL("./preload-persistent-harness.js", import.meta.url));
  for (const file of testFiles) {
    const code = await runTest(resolve(file), preload, {
      ...childEnvironment,
      [HARNESS_ENDPOINT_ENV]: JSON.stringify({ host: owner.metadata.host, port: owner.metadata.port }),
      [HARNESS_METADATA_ENV]: JSON.stringify(owner.metadata),
    });
    if (code !== 0) {
      observedFailure = true;
      exitCode = expectFailure ? 0 : code;
      break;
    }
    await owner.reset();
  }
} finally {
  await owner.close();
}
if (expectFailure && !observedFailure) throw new Error("Expected child test failure did not occur");
process.exitCode = exitCode;

async function runTest(file: string, preload: string, environment: NodeJS.ProcessEnv): Promise<number> {
  const child = spawn(process.execPath, ["--import", preload, "--test", "--test-concurrency=1", file], {
    env: environment,
    stdio: "inherit",
  });
  return new Promise<number>((resolveCode, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal !== null) reject(new Error(`Test process was terminated by ${signal}`));
      else resolveCode(code ?? 1);
    });
  });
}
