import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access } from "node:fs/promises";
import { promisify } from "node:util";
import test from "node:test";
import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import { CdpConnection } from "@vertile-ai/jsdriver-runtime-js";
import { NativeConnection } from "@vertile-ai/jsdriver-runtime-native";
import { Browser, discoverChromeExecutable, type ConnectionMode, type Tab } from "../src/index.js";

const TARGET_URL = "https://www.browserscan.net/bot-detection";
const OBSERVATION = String.raw`
(() => {
  const label = [...document.querySelectorAll("body *")]
    .find((element) => element.children.length === 0
      && element.textContent?.trim().replace(/:$/, "") === "Test Results");
  const lines = label?.parentElement?.innerText
    ?.split("\n").map((line) => line.trim()).filter(Boolean) ?? [];
  return {
    label: label?.textContent?.trim() ?? null,
    result: lines[1] ?? null,
    userAgent: navigator.userAgent,
    webdriver: navigator.webdriver,
  };
})()`;

interface Observation {
  readonly label: string | null;
  readonly result: string | null;
  readonly userAgent: string;
  readonly webdriver: boolean;
}

interface ZendriverObservation extends Observation {
  readonly runtime: "zendriver";
  readonly version: "0.15.5";
}

let executable = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
});

for (const [id, parameter, headless] of [
  ["ZDTEST-0001", "headless0", true],
  ["ZDTEST-0002", "headless1", false],
] as const) {
  test(`${id} BrowserScan reports Normal [${parameter}]`, { timeout: 240_000 }, async () => {
    const reference = await observeZendriver(headless);
    assert.equal(reference.result, "Normal", JSON.stringify(reference));

    for (const [backend, factory] of [
      ["js", CdpConnection],
      ["native", NativeConnection],
    ] as const) {
      for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
        const browser = await Browser.start({ executable, headless, connectionMode, backend: factory });
        try {
          const initialTab = browser.mainTab;
          assert.ok(initialTab !== undefined);
          assert.deepEqual([...initialTab.enabledDomains], []);
          assert.deepEqual([...initialTab.manuallyEnabledDomains], []);
          const observation = await observeTab(await browser.get(TARGET_URL));
          const evidence = { id, parameter, backend, connectionMode, headless, reference, observation };
          assert.equal(observation.result, reference.result, JSON.stringify(evidence));
          assert.equal(observation.result, "Normal", JSON.stringify(evidence));
          console.log(JSON.stringify(evidence));
        } finally {
          await browser.stop();
        }
      }
    }
  });
}

async function observeTab(tab: Tab): Promise<Observation> {
  let observation: Observation | undefined;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    observation = await tab.evaluate<Observation>(OBSERVATION);
    if (observation.result === "Normal" || observation.result === "Robot") return observation;
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
  }
  assert.fail(`BrowserScan did not publish Test Results: ${JSON.stringify(observation)}`);
}

async function observeZendriver(headless: boolean): Promise<ZendriverObservation> {
  const python = await resolveZendriverPython();
  const script = new URL("../../test/bot-detection-zendriver.py", import.meta.url);
  const { stdout } = await promisify(execFile)(python, [script.pathname, String(headless), executable], {
    timeout: 120_000,
  });
  return JSON.parse(stdout) as ZendriverObservation;
}

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
    } catch { /* Try the next explicitly supported environment. */ }
  }
  throw new Error(
    configured === undefined
      ? "Zendriver 0.15.5 Python was not found; set ZENDRIVER_PYTHON or install .tmp/zendriver-ref"
      : `ZENDRIVER_PYTHON is not accessible: ${configured}`,
  );
}
