import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { Browser, discoverChromeExecutable, type ConnectionMode } from "../src/index.js";

const fixture = `<!doctype html>
<html><head><title>nodriver conformance</title></head>
<body style="min-height:1800px">
  <h1 id="heading" data-kind="primary">Nodriver fixture</h1>
  <div id="stable"><span class="child">before</span></div>
  <button id="rerender">Rerender stable region</button>
  <button id="clicker">Click target</button>
  <span id="hidden-text" style="display:none">Delayed exact text</span>
  <input id="controlled" value="start">
  <input id="upload" type="file">
  <select id="choice"><option value="a">Alpha</option><option value="b">Beta</option></select>
  <div id="tall" style="margin-top:1000px">Scroll destination</div>
  <script type="application/json">Script conformance text</script>
  <script>
    window.fixtureState = { clicks: 0, pointers: 0, input: '', hover: 0 };
    clicker.addEventListener('click', () => fixtureState.clicks++);
    clicker.addEventListener('pointerdown', () => fixtureState.pointers++);
    clicker.addEventListener('mousemove', () => fixtureState.hover++);
    controlled.addEventListener('input', () => fixtureState.input = controlled.value);
    rerender.addEventListener('click', () => stable.innerHTML = '<span class="child">after</span>');
    setTimeout(() => { const item = document.createElement('p'); item.id = 'delayed'; item.textContent = 'Delayed visible text'; document.body.append(item); }, 150);
  </script>
</body></html>`;

test("DOM, input, and capture journey works in direct and flattened modes", { timeout: 60_000 }, async () => {
  const server = createServer((request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(request.url === "/second" ? "<!doctype html><title>second</title><p>Second page</p>" : fixture);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const executable = await discoverChromeExecutable();
  const output = await mkdtemp(join(tmpdir(), "nodriver-conformance-"));
  const uploadPath = join(output, "upload.txt");
  await writeFile(uploadPath, "fixture upload", "utf8");

  try {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      const browser = await Browser.start({ executable, headless: true, connectionTimeoutMs: 30_000, connectionMode, domainPolicy: "zendriver-compatible" });
      try {
        const tab = await browser.get(baseUrl);
        assert.match(await tab.getContent(), /Nodriver fixture/);
        assert.equal(await tab.evaluate<string>("document.title"), "nodriver conformance");
        const typedEvaluation = await tab.send("Runtime.evaluate", { expression: "6 * 7", returnByValue: true });
        assert.equal(typedEvaluation.result.value, 42);
        const rawEvaluation = await tab.sendRaw("Runtime.evaluate", { expression: "7 * 8", returnByValue: true });
        assert.equal((rawEvaluation.result as { readonly value: number }).value, 56);
        assert.equal(await tab.waitForReadyState("complete"), true);
        await tab.waitForIdle({ idleMs: 50 });

        const heading = await tab.select("#heading");
        assert.equal(heading.tag, "h1");
        assert.equal(heading.attributes["data-kind"], "primary");
        assert.equal(await heading.getText(), "Nodriver fixture");
        assert.match(await heading.getHtml(), /^<h1/);
        assert.equal((await tab.querySelectorAll("button")).length, 2);
        assert.equal((await tab.selectAll("button")).length, 2);
        const delayed = await tab.select("#delayed");
        assert.equal(delayed.tag, "p");
        assert.equal(delayed.attributes.id, "delayed");
        const textMatches = await tab.findAll("Delayed exact text");
        assert.ok(textMatches.some((element) => element.attributes.id === "hidden-text"));
        assert.equal((await tab.find("Script conformance text")).tag, "script");
        assert.equal((await tab.find("Delayed exact text")).attributes.id, "hidden-text");
        assert.equal((await tab.waitFor({ text: "Delayed visible text", bestMatch: true })).attributes.id, "delayed");
        assert.equal((await tab.xpath("//h1"))[0]?.backendNodeId, heading.backendNodeId);
        const aborted = new AbortController();
        aborted.abort("fixture cancellation");
        await assert.rejects(tab.waitFor("#never", { signal: aborted.signal }), { name: "CdpAbortError" });

        const stable = await tab.select("#stable");
        const stableIdentity = stable.backendNodeId;
        await (await tab.select("#rerender")).click();
        await stable.refresh();
        assert.equal(stable.backendNodeId, stableIdentity);
        assert.equal(await (await stable.querySelector(".child"))?.getText(), "after");

        const clicker = await tab.select("#clicker");
        await clicker.domClick();
        assert.deepEqual(await tab.evaluate("fixtureState"), { clicks: 1, pointers: 0, input: "", hover: 0 });
        await clicker.mouseClick();
        await clicker.mouseMove();
        const clickState = await tab.evaluate<{ clicks: number; pointers: number; hover: number }>("fixtureState");
        assert.equal(clickState.clicks, 2);
        assert.equal(clickState.pointers, 1);
        assert.ok(clickState.hover >= 1);

        const input = await tab.select("#controlled");
        await input.setValue("reset");
        await input.clearInput();
        await input.sendKeys("A👨‍👩‍👧‍👦é");
        assert.equal(await input.getValue(), "A👨‍👩‍👧‍👦é");
        await input.clearInputByDeleting();
        assert.equal(await input.getValue(), "");

        const upload = await tab.select("#upload");
        await upload.uploadFiles([uploadPath]);
        assert.equal(await upload.apply<string>("function () { return this.files[0].name; }"), "upload.txt");
        await (await tab.select("option[value=b]")).selectOption();
        assert.equal(await (await tab.select("#choice")).getValue(), "b");

        await tab.setLocalStorage({ mode: connectionMode, removed: null });
        assert.equal((await tab.getLocalStorage()).mode, connectionMode);
        await tab.setUserAgent(`nodriver-${connectionMode}`);
        assert.equal(await tab.evaluate<string>("navigator.userAgent"), `nodriver-${connectionMode}`);

        assert.ok((await tab.screenshotB64({ format: "png", fullPage: true })).length > 100);
        assert.ok((await heading.screenshotB64()).length > 100);
        assert.match(await tab.saveSnapshot(), /Content-Type: text\/html/i);
        assert.ok((await tab.printToPdf()).length > 100);
        await tab.saveScreenshot(join(output, `${connectionMode}.png`), { format: "png" });

        await tab.scrollDown(800);
        assert.ok(await tab.evaluate<number>("scrollY") > 0);
        await tab.scrollUp(800);
        await tab.mouseMove(1, 1);
        assert.ok((await tab.getWindow()).bounds.windowState !== undefined);
        await tab.setWindowSize(900, 700);
        await tab.maximize();
        await tab.setWindowState("normal");
        await tab.minimize();
        await tab.setWindowState("normal");
        await tab.fullscreen();
        await tab.setWindowState("normal");
        const removable = await tab.select("#tall");
        await removable.setText("Changed before removal");
        assert.equal(await removable.getText(), "Changed before removal");
        await removable.removeFromDom();
        assert.equal(await tab.querySelector("#tall"), null);

        await tab.get(`${baseUrl}/second`);
        assert.equal(await tab.evaluate<string>("document.title"), "second");
        assert.equal(await tab.back(), true);
        assert.equal(await tab.evaluate<string>("document.title"), "nodriver conformance");
        assert.equal(await tab.forward(), true);
        let loadEvents = 0;
        const offLoad = tab.on("Page.loadEventFired", () => { loadEvents += 1; });
        await tab.reload();
        offLoad();
        assert.equal(loadEvents, 1);
        assert.equal(await tab.evaluate<string>("document.title"), "second");

        await browser.closeTab(tab);
      } finally {
        await browser.close();
      }
    }
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
  }
});
