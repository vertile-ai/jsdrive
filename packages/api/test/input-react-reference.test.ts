import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access } from "node:fs/promises";
import test from "node:test";
import { promisify } from "node:util";
import { discoverChromeExecutable } from "../src/index.js";
import {
  readReactInputReference,
  startReactInputFixtureServer,
  type ReactInputFixtureServer,
  type ReactInputReference,
} from "./support/react-input-fixture.js";

let fixture: ReactInputFixtureServer;

test.before(async () => {
  fixture = await startReactInputFixtureServer();
});

test.after(async () => {
  await fixture.close();
});

test("Zendriver 0.15.5 records real React controlled-input behavior headlessly", { timeout: 120_000 }, async () => {
  const python = await resolveZendriverPython();
  const script = new URL("../../test/input-react-zendriver.py", import.meta.url);
  const { stdout } = await promisify(execFile)(python, [script.pathname, fixture.url, await discoverChromeExecutable()], {
    timeout: 90_000,
  });
  const result = JSON.parse(stdout) as ReactInputReference;
  assert.deepEqual({
    runtime: result.runtime,
    version: result.version,
    headless: result.headless,
    cleanup: result.cleanup,
  }, {
    runtime: "zendriver",
    version: "0.15.5",
    headless: true,
    cleanup: { stopped: true, profileRemoved: true },
  });
  assert.deepEqual(result, await readReactInputReference());
  assert.deepEqual(Object.keys(result.observations), ["clearInput", "clearInputByDeleting", "controlledFill"]);
  for (const observation of Object.values(result.observations)) {
    assert.deepEqual(observation.fixture, {
      reactVersion: "18.3.1",
      rootMode: "createRoot",
      rootMarker: "createRoot",
      reactOwnedRoot: true,
      ready: true,
    });
  }
  console.log(JSON.stringify(result));
});

async function resolveZendriverPython(): Promise<string> {
  const configured = process.env.ZENDRIVER_PYTHON;
  const candidates = configured === undefined
    ? [
        new URL("../../../../.tmp/zendriver-ref/bin/python", import.meta.url).pathname,
        new URL("../../../../.tmp/zendriver-0.15.5/bin/python", import.meta.url).pathname,
      ]
    : [configured];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch { /* Try the next pinned environment. */ }
  }
  throw new Error("Zendriver 0.15.5 Python is unavailable; set ZENDRIVER_PYTHON or install .tmp/zendriver-ref");
}
