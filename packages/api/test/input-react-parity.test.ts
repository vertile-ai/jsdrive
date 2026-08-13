import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import test from "node:test";
import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import { NativeConnection } from "@vertile-ai/jsdriver-runtime-native";
import {
  Browser,
  discoverChromeExecutable,
  KeyEvents,
  KeyModifiers,
  KeyPressEvent,
  SpecialKeys,
  type ConnectionMode,
  type Tab,
} from "../src/index.js";
import { browserCaseSkipReason } from "./support/persistent-harness.js";

const controlledInputPage = `<!doctype html>
<title>Controlled field parity</title>
<label>Amount <input id="amount" type="text"></label>
<output id="model"></output>
<output id="updates"></output>
<script>
  const field = document.querySelector('#amount');
  const modelOutput = document.querySelector('#model');
  const updatesOutput = document.querySelector('#updates');
  const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  const readNativeValue = descriptor.get;
  const writeNativeValue = descriptor.set;
  let model = '10';
  let trackedValue = '';
  let updates = 0;

  Object.defineProperty(field, 'value', {
    configurable: true,
    get() { return readNativeValue.call(this); },
    set(value) {
      trackedValue = String(value);
      writeNativeValue.call(this, value);
    },
  });

  field.value = model;
  modelOutput.textContent = model;
  updatesOutput.textContent = String(updates);

  field.addEventListener('input', () => {
    const current = readNativeValue.call(field);
    if (current === trackedValue) return;
    model = current;
    trackedValue = current;
    updates += 1;
    modelOutput.textContent = model;
    updatesOutput.textContent = String(updates);
  });

  window.commitControlledModel = () => {
    writeNativeValue.call(field, model);
    trackedValue = model;
  };
</script>`;

const escapePage = `<!doctype html>
<title>Escape parity</title>
<button id="open" type="button">Open panel</button>
<div id="panel" tabindex="-1" hidden>Dismiss with Escape</div>
<output id="status">ready</output>
<script>
  const open = document.querySelector('#open');
  const panel = document.querySelector('#panel');
  const status = document.querySelector('#status');
  const events = [];
  let expanded = false;

  open.addEventListener('click', () => {
    expanded = true;
    panel.hidden = false;
    panel.focus();
    status.textContent = 'open';
  });

  document.addEventListener('keydown', (event) => {
    events.push('keydown:' + event.key);
    if (expanded && event.key === 'Escape') {
      expanded = false;
      panel.hidden = true;
      status.textContent = 'closed';
      event.preventDefault();
    }
  });
  document.addEventListener('keyup', (event) => events.push('keyup:' + event.key));
  window.escapeEventLog = events;
</script>`;

const editorPage = `<!doctype html>
<title>Visible editing parity</title>
<style>#draft { width: 100%; height: 100vh; outline: none; }</style>
<div id="draft" contenteditable="true"></div>`;

let executable = "";
let server: Server;
let baseUrl = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(request.url === "/escape" ? escapePage : request.url === "/editor" ? editorPage : controlledInputPage);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

test("keyboard payload normalization retains the pinned key event ordering", () => {
  assert.deepEqual(KeyEvents.fromMixedInput(["A! ,.é👨‍👩‍👧‍👦", ["a", KeyModifiers.Control]]).toCdpEvents(), [
    { key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, nativeVirtualKeyCode: 16, modifiers: KeyModifiers.Shift, type: KeyPressEvent.KeyDown },
    { key: "A", code: "KeyA", text: "A", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65, modifiers: KeyModifiers.Shift, type: KeyPressEvent.KeyDown },
    { key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, nativeVirtualKeyCode: 16, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { key: "a", code: "KeyA", text: "a", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, nativeVirtualKeyCode: 16, modifiers: KeyModifiers.Shift, type: KeyPressEvent.KeyDown },
    { key: "!", code: "Digit1", text: "!", windowsVirtualKeyCode: 49, nativeVirtualKeyCode: 49, modifiers: KeyModifiers.Shift, type: KeyPressEvent.KeyDown },
    { key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, nativeVirtualKeyCode: 16, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { key: "1", code: "Digit1", text: "1", windowsVirtualKeyCode: 49, nativeVirtualKeyCode: 49, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { key: " ", code: " ", text: " ", windowsVirtualKeyCode: 32, nativeVirtualKeyCode: 32, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyDown },
    { key: " ", code: " ", text: " ", windowsVirtualKeyCode: 32, nativeVirtualKeyCode: 32, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { key: ",", code: "Comma", text: ",", windowsVirtualKeyCode: 188, nativeVirtualKeyCode: 188, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyDown },
    { key: ",", code: "Comma", text: ",", windowsVirtualKeyCode: 188, nativeVirtualKeyCode: 188, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { key: ".", code: "Period", text: ".", windowsVirtualKeyCode: 190, nativeVirtualKeyCode: 190, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyDown },
    { key: ".", code: "Period", text: ".", windowsVirtualKeyCode: 190, nativeVirtualKeyCode: 190, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { text: "é", modifiers: KeyModifiers.None, type: KeyPressEvent.Char },
    { text: "👨‍👩‍👧‍👦", modifiers: KeyModifiers.None, type: KeyPressEvent.Char },
    { key: "Control", code: "ControlLeft", windowsVirtualKeyCode: 17, nativeVirtualKeyCode: 17, modifiers: KeyModifiers.Control, type: KeyPressEvent.KeyDown },
    { key: "a", code: "KeyA", text: "a", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65, modifiers: KeyModifiers.Control, type: KeyPressEvent.KeyDown },
    { key: "Control", code: "ControlLeft", windowsVirtualKeyCode: 17, nativeVirtualKeyCode: 17, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
    { key: "a", code: "KeyA", text: "a", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65, modifiers: KeyModifiers.None, type: KeyPressEvent.KeyUp },
  ]);
});

for (const [parameter, headless, ids] of [
  ["headless0", true, { visible: "ZDTEST-0016", clear: "ZDTEST-0021", deleting: "ZDTEST-0023", fill: "ZDTEST-0025", escape: "ZDTEST-0018" }],
  ["headless1", false, { visible: "ZDTEST-0017", clear: "ZDTEST-0022", deleting: "ZDTEST-0024", fill: "ZDTEST-0026", escape: "ZDTEST-0019" }],
] as const) {
  const skip = browserCaseSkipReason(headless);
  test(`${ids.visible} preserves the visible editing structure after copy, cursor motion, and paste [${parameter}]`, { timeout: 60_000, skip }, async () => {
    await forEachBrowser(headless, async (tab, label) => {
      await open(tab, "/editor");
      const editor = await tab.select("#draft");
      await editor.mouseClick();
      await wait(1_000);
      await editor.sendKeys("Hello, world!");
      await editor.sendKeys(KeyEvents.fromMixedInput([
        " This is another sentence",
        SpecialKeys.Enter,
        ["a", KeyModifiers.Control],
        ["c", KeyModifiers.Control],
        SpecialKeys.ArrowUp,
        ["v", KeyModifiers.Control],
        " This is pasted text. 👍",
      ]));

      await editor.refresh();
      const actual = await Promise.all(editor.children.map(async (child) => child.getHtml()));
      assert.deepEqual(actual, [
        "Hello, world! This is another sentence",
        "<div>&nbsp;This is pasted text. 👍</div>",
        "Hello, world! This is another sentence",
        "<div><br></div>",
      ], label);
    });
  });

  test(`${ids.clear} clears a controlled field through the native value setter [${parameter}]`, { timeout: 60_000, skip }, async () => {
    await forEachBrowser(headless, async (tab, label) => {
      await open(tab, "/controlled");
      const field = await tab.select("#amount");
      assert.equal(await tab.evaluate<string>("document.querySelector('#model').textContent"), "10", label);
      assert.equal(await tab.evaluate<string>("document.querySelector('#updates').textContent"), "0", label);

      await field.clearInput();

      assert.equal(await field.getValue(), "", label);
      assert.equal(await tab.evaluate<string>("document.querySelector('#model').textContent"), "", label);
      assert.equal(await tab.evaluate<string>("document.querySelector('#updates').textContent"), "1", label);
    });
  });

  test(`${ids.deleting} removes a controlled value with visible Backspace input [${parameter}]`, { timeout: 60_000, skip }, async () => {
    await forEachBrowser(headless, async (tab, label) => {
      await open(tab, "/controlled");
      const field = await tab.select("#amount");

      await field.clearInputByDeleting();

      assert.equal(await field.getValue(), "", label);
      assert.equal(await tab.evaluate<string>("document.querySelector('#model').textContent"), "", label);
      assert.ok(Number(await tab.evaluate<string>("document.querySelector('#updates').textContent")) >= 1, label);
    });
  });

  test(`${ids.fill} fills a controlled field after a render commit [${parameter}]`, { timeout: 60_000, skip }, async () => {
    await forEachBrowser(headless, async (tab, label) => {
      await open(tab, "/controlled");
      const field = await tab.select("#amount");

      await field.clearInputByDeleting();
      await tab.evaluate("window.commitControlledModel()");
      await field.sendKeys("25");

      assert.equal(await field.getValue(), "25", label);
      assert.equal(await tab.evaluate<string>("document.querySelector('#model').textContent"), "25", label);
    });
  });

  test(`${ids.escape} dispatches Escape as keydown then keyup and closes the panel [${parameter}]`, { timeout: 60_000, skip }, async () => {
    await forEachBrowser(headless, async (tab, label) => {
      await open(tab, "/escape");
      assert.equal(await tab.evaluate<string>("document.querySelector('#status').textContent"), "ready", label);
      await (await tab.select("#open")).mouseClick();
      assert.equal(await tab.evaluate<string>("document.querySelector('#status').textContent"), "open", label);

      await (await tab.select("#panel")).sendKeys(SpecialKeys.Escape);

      assert.equal(await tab.evaluate<string>("document.querySelector('#status').textContent"), "closed", label);
      assert.deepEqual(await tab.evaluate<readonly string[]>("window.escapeEventLog"), ["keydown:Escape", "keyup:Escape"], label);
    });
  });
}

const backends = [
  ["js", undefined],
  ["native", NativeConnection],
] as const satisfies readonly [string, RuntimeBackendFactory | undefined][];

const connectionModes = ["direct", "flattened"] as const satisfies readonly ConnectionMode[];

async function forEachBrowser(
  headless: boolean,
  action: (tab: Tab, label: string) => Promise<void>,
): Promise<void> {
  const requestedBackend = process.env.NODRIVER_PARITY_BACKEND;
  const requestedMode = process.env.NODRIVER_PARITY_CONNECTION_MODE;
  for (const [backendName, backend] of backends) {
    if (requestedBackend !== undefined && requestedBackend !== backendName) continue;
    for (const connectionMode of connectionModes) {
      if (requestedMode !== undefined && requestedMode !== connectionMode) continue;
      const browser = await Browser.start({
        executable,
        headless,
        connectionMode,
        ...(backend === undefined ? {} : { backend }),
      });
      try {
        const tab = browser.mainTab;
        assert.ok(tab, `${backendName}/${connectionMode} has a main tab`);
        await action(tab, `${backendName}/${connectionMode}`);
      } finally {
        await browser.stop();
      }
    }
  }
}

async function wait(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

async function open(tab: Tab, path: string): Promise<void> {
  await tab.get(`${baseUrl}${path}`);
  await wait(250);
}
