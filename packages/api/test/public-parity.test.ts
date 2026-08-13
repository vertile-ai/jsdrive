import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import {
  Browser,
  Config,
  discoverChromeExecutable,
  KeyEvents,
  KeyModifiers,
  SpecialKeys,
  type ConnectionMode,
} from "../src/index.js";

test("Config exposes explicit launch flags and mutable arguments", () => {
  const config = new Config({ userDataDir: "/tmp/nodriver-profile", headless: false });
  config.addArgument("--window-size=800,600").addExtension("/tmp/extension");
  assert.equal(config.usesCustomDataDir, true);
  assert.deepEqual(config.browserArgs, ["--window-size=800,600"]);
  assert.deepEqual(config.extensions, ["/tmp/extension"]);
});

test("Config userDataDir assignment updates custom-profile state", () => {
  const config = new Config();
  assert.equal(config.usesCustomDataDir, false);
  config.userDataDir = "/tmp/nodriver-assigned-profile";
  assert.equal(config.usesCustomDataDir, true);
});

test("lifecycle, special keys, and iframe queries work in both connection modes", { timeout: 60_000 }, async () => {
  const cross = createServer((_request, response) => response.end("<!doctype html><div class=hit data-kind=cross>cross</div>"));
  await new Promise<void>((resolve) => cross.listen(0, "127.0.0.1", resolve));
  const crossAddress = cross.address();
  assert.ok(typeof crossAddress === "object" && crossAddress !== null);
  const main = createServer((request, response) => {
    if (request.url === "/same") {
      response.end("<!doctype html><div class=hit data-kind=same>same</div><iframe src=/nested></iframe>");
    } else if (request.url === "/nested") {
      response.end("<!doctype html><div class=hit data-kind=nested>nested</div>");
    } else {
      response.end(`<!doctype html><input id=input><button id=next>next</button><div class=hit data-kind=main>main</div><iframe src=/same></iframe><iframe src=http://127.0.0.1:${crossAddress.port}></iframe><script>input.onkeydown=e=>document.title=e.key+":"+e.ctrlKey</script>`);
    }
  });
  await new Promise<void>((resolve) => main.listen(0, "localhost", resolve));
  const mainAddress = main.address();
  assert.ok(typeof mainAddress === "object" && mainAddress !== null);
  const executable = await discoverChromeExecutable();
  try {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      const browser = await Browser.start({ executable, connectionMode });
      try {
        const initial = browser.mainTab;
        assert.ok(initial);
        const tab = await browser.get(`http://localhost:${mainAddress.port}`);
        assert.equal(tab, initial);
        const targetInfo = await tab.updateTarget();
        assert.equal(targetInfo.targetId, tab.targetId);
        assert.equal(tab.type, "page");
        assert.match(tab.url, /^http:\/\/localhost:/);
        const input = await tab.select("#input");
        assert.equal(input.tagName, "input");
        assert.equal(input.isSvg, false);
        await input.sendKeys(["abc", SpecialKeys.ArrowLeft, SpecialKeys.Backspace, SpecialKeys.Delete, SpecialKeys.Enter, SpecialKeys.Tab]);
        await input.focus();
        await input.sendKeys(KeyEvents.chord(KeyModifiers.Control, "a"));
        assert.equal(await input.getValue(), "a");
        assert.equal(await tab.evaluate("document.title"), "a:true");
        await new Promise<void>((resolve) => setTimeout(resolve, 250));
        const kinds = await Promise.all((await tab.querySelectorAll(".hit", { includeFrames: true })).map(async (element) => element.get("data-kind")));
        assert.deepEqual(new Set(kinds), new Set(["main", "same", "nested", "cross"]));
        const extra = await browser.newTab();
        await extra.close();
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        assert.equal(browser.tabs.some(({ targetId }) => targetId === extra.targetId), false);
      } finally {
        await browser.close();
      }
    }
  } finally {
    await new Promise<void>((resolve) => main.close(() => resolve()));
    await new Promise<void>((resolve) => cross.close(() => resolve()));
  }
});
