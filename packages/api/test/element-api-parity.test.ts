import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer, type Server } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import type { RuntimeBackendFactory } from "@vertile-ai/jsdriver-runtime-js";
import { NativeConnection } from "@vertile-ai/jsdriver-runtime-native";
import {
  Browser,
  create,
  discoverChromeExecutable,
  Element,
  Position,
  resolveNode,
  type ConnectionMode,
  type Tab,
} from "../src/index.js";

const fixture = `<!doctype html><title>Element API parity</title>
<button id="subject" data-kind="fixture">direct<span>child</span><iframe srcdoc="<p>iframe-only</p>"></iframe></button>
<div id="box" style="position:absolute;left:40px;top:60px;width:100px;height:30px"></div>
<script>
  const subject = document.querySelector('#subject');
  subject.addEventListener('click', () => document.body.dataset.clicked = 'yes');
  subject.attachShadow({ mode: 'open' }).innerHTML = '<span>shadow</span>';
</script>`;

let executable = "";
let server: Server;
let baseUrl = "";

test.before(async () => {
  executable = await discoverChromeExecutable();
  server = createServer((_request, response) => {
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(fixture);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error)));
});

test("ZDAPI-POSITION-001", () => {
  const position = new Position([1, 2, 5, 2, 5, 8, 1, 8]);
  assert.ok(position instanceof Array);
  assert.deepEqual([...position], [1, 2, 5, 2, 5, 8, 1, 8]);
  assert.deepEqual(position.toJSON(), [1, 2, 5, 2, 5, 8, 1, 8]);
  assert.deepEqual(position.toJson(), [1, 2, 5, 2, 5, 8, 1, 8]);
  assert.deepEqual(Position.fromJson([1, 2, 5, 2, 5, 8, 1, 8]), position);
  assert.deepEqual(position.center, [3, 5]);
  assert.deepEqual(position.toViewport(2), { x: 1, y: 2, width: 4, height: 6, scale: 2 });
  assert.equal(position.includes(5), true);
  assert.equal(position[0], 1);
  position[0] = 0;
  assert.equal(position.length, 8);
  assert.deepEqual([...position].reverse(), [8, 1, 8, 5, 2, 5, 2, 0]);
  assert.equal(position.toString(), "<Position(x=1, y=2, width=4, height=6)>");
  const identityMap = new Map<Position, string>([[position, "position"]]);
  assert.equal(identityMap.get(position), "position");
  const list = new Position([1, 2, 3, 4, 5, 6, 7, 8]);
  list.append(9);
  list.extend([10, 11]);
  assert.equal(list.count(1), 1);
  assert.equal(list.index(9), 8);
  list.insert(-1, 12);
  assert.equal(list.pop(-2), 12);
  list.remove(11);
  assert.deepEqual(list.copy(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  list.reverse().sort((left, right) => left - right);
  assert.deepEqual(list.copy(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  list.clear();
  assert.deepEqual(list.copy(), []);
  assert.throws(() => list.pop(), /empty/);
  assert.throws(() => new Position([1, 2, 3]), RangeError);
});

test("ZDAPI-ELEMENT-METADATA-001", () => {
  const text = (nodeId: number, value: string): Protocol.DOM.Node => ({
    nodeId,
    backendNodeId: nodeId,
    nodeType: 3,
    nodeName: "#text",
    localName: "",
    nodeValue: value,
  });
  const nested = (nodeId: number, nodeName: string): Protocol.DOM.Node => ({
    nodeId,
    backendNodeId: nodeId,
    nodeType: 1,
    nodeName,
    localName: nodeName.toLowerCase(),
    nodeValue: "",
  });
  const node: Protocol.DOM.Node = {
    ...nested(2, "DIV"),
    parentId: 1,
    childNodeCount: 1,
    children: [text(3, "visible")],
    attributes: ["id", "subject", "class", "fixture"],
    documentURL: "https://example.test/document",
    baseURL: "https://example.test/",
    publicId: "public",
    systemId: "system",
    internalSubset: "subset",
    xmlVersion: "1.0",
    pseudoType: "before",
    pseudoIdentifier: "fixture-pseudo",
    shadowRootType: "open",
    frameId: "frame",
    contentDocument: nested(4, "#document"),
    shadowRoots: [nested(5, "#document-fragment")],
    templateContent: nested(6, "#document-fragment"),
    pseudoElements: [nested(7, "SPAN")],
    importedDocument: nested(8, "#document"),
    distributedNodes: [{ backendNodeId: 9, nodeType: 1, nodeName: "SLOT" }],
    isSVG: true,
    compatibilityMode: "LimitedQuirksMode",
    assignedSlot: { backendNodeId: 10, nodeType: 1, nodeName: "SLOT" },
  };
  const tree: Protocol.DOM.Node = { ...nested(1, "BODY"), children: [node] };
  const tab = {} as Tab;
  const element = create(node, tab, tree);
  const equal = create(structuredClone(node), tab, tree);

  assert.equal(element.nodeId, 2);
  assert.equal(element.backendNodeId, 2);
  assert.equal(element.node, node);
  assert.equal(element.parentId, 1);
  assert.equal(element.parent?.tag, "body");
  assert.equal(element.nodeType, 1);
  assert.equal(element.nodeName, "DIV");
  assert.equal(element.localName, "div");
  assert.equal(element.nodeValue, "");
  assert.equal(element.tag, "div");
  assert.equal(element.tagName, "div");
  assert.equal(element.text, "visible");
  assert.equal(element.textAll, "visible");
  assert.equal(element.documentUrl, "https://example.test/document");
  assert.equal(element.baseUrl, "https://example.test/");
  assert.equal(element.publicId, "public");
  assert.equal(element.systemId, "system");
  assert.equal(element.internalSubset, "subset");
  assert.equal(element.xmlVersion, "1.0");
  assert.equal(element.pseudoType, "before");
  assert.equal(element.pseudoIdentifier, "fixture-pseudo");
  assert.equal(element.shadowRootType, "open");
  assert.equal(element.frameId, "frame");
  assert.equal(element.childNodeCount, 1);
  assert.equal(element.compatibilityMode, "LimitedQuirksMode");
  assert.equal(element.isSvg, true);
  assert.equal(element.assignedSlot?.backendNodeId, 10);
  assert.equal(element.distributedNodes[0]?.backendNodeId, 9);
  assert.equal(element.children[0]?.nodeValue, "visible");
  assert.equal(element.shadowRoots[0]?.nodeId, 5);
  assert.equal(element.pseudoElements[0]?.nodeId, 7);
  assert.equal(element.contentDocument?.nodeId, 4);
  assert.equal(element.templateContent?.nodeId, 6);
  assert.equal(element.importedDocument?.nodeId, 8);
  assert.equal(element.tree, tree);
  assert.deepEqual(element.attrs, { id: "subject", class: "fixture" });
  assert.equal(element.get("id"), "subject");
  assert.equal(element.equals(equal), true);
  assert.equal(element.equals({}), false);
  element.set("id", "changed");
  element.set("data-state", "ready");
  assert.equal(element.get("id"), "changed");
  assert.equal(element.get("data-state"), "ready");
  assert.equal(element.value, undefined);
  assert.equal(element.remoteObject, undefined);
  assert.equal(element.objectId, undefined);
  assert.equal(element.tab, tab);
  assert.equal(element.toString(), '<div id="changed" class="fixture" data-state="ready">visible</div>');
});

test("textAll visits DOM children and shadow roots but not iframe documents", () => {
  const text = (nodeId: number, value: string): Protocol.DOM.Node => ({ nodeId, backendNodeId: nodeId, nodeType: 3, nodeName: "#text", localName: "", nodeValue: value });
  const element = create({
    nodeId: 1,
    backendNodeId: 1,
    nodeType: 1,
    nodeName: "DIV",
    localName: "div",
    nodeValue: "",
    children: [text(2, "child")],
    shadowRoots: [{ nodeId: 3, backendNodeId: 3, nodeType: 11, nodeName: "#document-fragment", localName: "", nodeValue: "", children: [text(4, "shadow")] }],
    contentDocument: { nodeId: 5, backendNodeId: 5, nodeType: 9, nodeName: "#document", localName: "", nodeValue: "", children: [text(6, "iframe")] },
  }, {} as Tab);
  assert.equal(element.textAll, "child shadow");
});

test("ZDAPI-ELEMENT-ACTIONS-001", { timeout: 45_000 }, () => usingBrowser(undefined, "direct", exerciseElementSurface));

for (const [backendName, backend] of [["js", undefined], ["native", NativeConnection]] satisfies readonly [string, RuntimeBackendFactory | undefined][]) {
  for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
    if (backendName === "js" && connectionMode === "direct") continue;
    test(`Element public surface runs on controlled DOM [${backendName}/${connectionMode}]`, { timeout: 45_000 }, () => usingBrowser(backend, connectionMode, exerciseElementSurface));
  }
}

async function exerciseElementSurface(tab: Tab): Promise<void> {
  await tab.get(baseUrl);
  const selected = await tab.select("#subject");
  await tab.send("DOM.enable", {});
  const { root } = await tab.send("DOM.getDocument", { depth: -1, pierce: true });
  const subjectNode = findByBackendNodeId(root, selected.backendNodeId);
  assert.ok(subjectNode);
  const subject = create(subjectNode, tab, root);
  assert.ok(subject instanceof Element);
  assert.equal(subject.tag, "button");
  assert.equal(subject.get("data-kind"), "fixture");
  assert.equal(subject.text, "direct");
  assert.equal(subject.textAll, "direct child");
  assert.equal(subject.textAll.includes("iframe-only"), false);
  assert.equal(subject.children.length, 3);
  assert.equal(subject.contentDocument, undefined);
  assert.match(await subject.getHtml(), /^<button/);
  assert.equal((await subject.getJsAttributes())?.id, "subject");
  assert.equal((await subject.getRemoteObject()).subtype, "node");
  assert.equal(subject.remoteObject?.subtype, "node");
  assert.ok(subject.objectId);
  assert.equal((await subject.getParent())?.tag, "body");
  assert.equal((await subject.querySelector("span"))?.tag, "span");
  assert.equal((await subject.querySelectorAll("span")).length, 1);

  const recreated = create(subjectNode, tab, root);
  assert.equal(recreated.tree, root);
  assert.equal(recreated.parent?.tag, "body");
  assert.equal((await resolveNode(tab, subject.nodeId)).backendNodeId, subject.backendNodeId);
  assert.equal(await subject.update(subject.node), subject);

  assert.equal(await subject.apply<string>("element => element.id"), "subject");
  assert.equal(await subject.apply<string>("element => Promise.resolve(element.id)", true, { awaitPromise: true }), "subject");
  const remote = await subject.apply<Protocol.Runtime.RemoteObject>("element => element", false);
  assert.equal(remote.subtype, "node");
  assert.ok(remote.objectId);
  assert.equal(await subject.apply("element => { throw new Error('fixture'); }"), undefined);

  await subject.click();
  assert.equal(await tab.evaluate("document.body.dataset.clicked"), "yes");
  assert.equal(await subject.isRecording(), undefined);
  await subject.focus();
  await subject.scrollIntoView();
  await subject.flash(0);
  await subject.highlightOverlay();
  await subject.highlightOverlay();

  const box = await tab.select("#box");
  const position = await box.getPosition();
  assert.ok(position instanceof Position);
  assert.deepEqual(position.toJSON(), [40, 60, 140, 60, 140, 90, 40, 90]);
  assert.deepEqual(position.center, [90, 75]);
  assert.deepEqual((await box.getPosition(true))?.toJSON(), position.toJSON());
  await box.mouseMove();
  await box.mouseDrag([90, 75]);

  const output = await mkdtemp(join(tmpdir(), "nodriver-element-"));
  try {
    const screenshot = join(output, "box.png");
    assert.equal(await box.saveScreenshot(screenshot, "png", 1), screenshot);
    assert.ok((await readFile(screenshot)).byteLength > 100);
    assert.ok((await box.screenshotB64("jpeg", 1)).length > 100);
    const recording = await box.recordVideo(join(output, "recording"));
    assert.equal(Array.isArray(await recording.stop()), true);
  } finally {
    await rm(output, { recursive: true, force: true });
  }
}

async function usingBrowser(
  backend: RuntimeBackendFactory | undefined,
  connectionMode: ConnectionMode,
  action: (tab: Tab) => Promise<void>,
): Promise<void> {
  const browser = await Browser.start({
    executable,
    headless: true,
    connectionMode,
    ...(backend === undefined ? {} : { backend }),
  });
  try {
    const tab = browser.mainTab;
    assert.ok(tab);
    await action(tab);
  } finally {
    await browser.stop();
  }
}

function findByBackendNodeId(node: Protocol.DOM.Node, backendNodeId: Protocol.DOM.BackendNodeId): Protocol.DOM.Node | undefined {
  if (node.backendNodeId === backendNodeId) return node;
  for (const child of [...(node.children ?? []), ...(node.shadowRoots ?? [])]) {
    const found = findByBackendNodeId(child, backendNodeId);
    if (found !== undefined) return found;
  }
  return node.contentDocument === undefined ? undefined : findByBackendNodeId(node.contentDocument, backendNodeId);
}
