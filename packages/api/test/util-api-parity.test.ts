import assert from "node:assert/strict";
import test from "node:test";
import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import {
  cdict,
  cdp,
  cdp_get_module,
  cdpGetModule,
  cf_find_interactive_challenge,
  cf_is_interactive_challenge_present,
  cf_wait_for_interactive_challenge,
  cfFindInteractiveChallenge,
  cfIsInteractiveChallengePresent,
  cfWaitForInteractiveChallenge,
  circle,
  compareTargetInfo,
  compare_target_info,
  ContraDict,
  core,
  filterRecurse,
  filterRecurseAll,
  filter_recurse,
  filter_recurse_all,
  freePort,
  free_port,
  htmlFromTree,
  html_from_tree,
  loop,
  removeFromTree,
  remove_from_tree,
  util,
  verifyCf,
  verify_cf,
  type Element,
  type Tab,
} from "../src/index.js";

test("ZDAPI-UTIL-001", async () => {
  assert.equal(cdpGetModule("dom").name, "DOM");
  assert.equal(cdp_get_module, cdpGetModule);
  assert.equal(compare_target_info, compareTargetInfo);
  assert.equal(filter_recurse, filterRecurse);
  assert.equal(filter_recurse_all, filterRecurseAll);
  assert.equal(free_port, freePort);
  assert.equal(html_from_tree, htmlFromTree);
  assert.equal(remove_from_tree, removeFromTree);
  assert.equal(cdpGetModule("page").command("navigate"), "Page.navigate");
  assert.equal(cdp.dom?.event("documentUpdated"), "DOM.documentUpdated");
  assert.equal(util.cdpGetModule, cdpGetModule);
  assert.equal(core.Tab.name, "Tab");

  const points = [...circle(10, 20, 2, 4)].map(([x, y]) => [Math.round(x), Math.round(y)]);
  assert.deepEqual(points, [[6, 18], [8, 16], [6, 14], [4, 16], [6, 18]]);

  const previous = targetInfo({ title: "A", url: "one", attached: false, canAccessOpener: false });
  const current = targetInfo({ title: "B", url: "two", attached: true, canAccessOpener: true, openerId: "opener" });
  assert.deepEqual(compareTargetInfo(previous, current), [
    ["title", "A", "B"],
    ["url", "one", "two"],
    ["attached", false, true],
    ["can_access_opener", false, true],
    ["opener_id", undefined, "opener"],
  ]);
  assert.deepEqual(compareTargetInfo(null, current), []);

  const fourth = node(4, "SPAN");
  const third = node(3, "P", [fourth]);
  const second = node(2, "DIV");
  const root = node(1, "HTML", [second, third]);
  assert.equal(filterRecurse(root, (item) => item.nodeId === 4), fourth);
  assert.deepEqual(filterRecurseAll(root, (item) => item.nodeId % 2 === 0).map(({ nodeId }) => nodeId), [2, 4]);
  assert.equal(removeFromTree(root, third), root);
  assert.deepEqual(root.children?.map(({ nodeId }) => nodeId), [2]);

  const sends: unknown[] = [];
  const target = {
    send: async (_method: string, params: unknown) => {
      sends.push(params);
      return { outerHTML: `<node-${(params as { backendNodeId: number }).backendNodeId}>` };
    },
  } as unknown as Tab;
  const htmlRoot = node(10, "#document", [node(11, "MAIN"), node(12, "FOOTER")]);
  assert.equal(await htmlFromTree(htmlRoot, target), "<node-11><node-12>");
  assert.deepEqual(sends, [{ backendNodeId: 11 }, { backendNodeId: 12 }]);

  const port = await freePort();
  assert.equal(Number.isInteger(port) && port > 0 && port <= 65_535, true);
  let queued = false;
  const eventLoop = loop();
  await new Promise<void>((resolve) => eventLoop.queue(() => { queued = true; resolve(); }));
  assert.equal(queued, true);
  await eventLoop.delay(0);
});

test("ZDAPI-CONTRADICT-001", () => {
  const value = cdict({ a: 1, nested: { b: 2 }, items: [{ c: 3 }] });
  assert.ok(value instanceof ContraDict);
  assert.ok(value.nested instanceof ContraDict);
  assert.ok(Array.isArray(value.items));
  assert.ok(value.items[0] instanceof ContraDict);
  value.set("extra", { ok: true });
  assert.equal((value.extra as ContraDict).ok, true);
  assert.deepEqual(JSON.parse(JSON.stringify(value)), {
    a: 1,
    nested: { b: 2 },
    items: [{ c: 3 }],
    extra: { ok: true },
  });
});

test("ZDAPI-CLOUDFLARE-001", async () => {
  const actions: string[] = [];
  assert.equal(cf_find_interactive_challenge, cfFindInteractiveChallenge);
  assert.equal(cf_is_interactive_challenge_present, cfIsInteractiveChallengePresent);
  assert.equal(cf_wait_for_interactive_challenge, cfWaitForInteractiveChallenge);
  assert.equal(verify_cf, verifyCf);
  const container = {
    flash: async () => { actions.push("flash"); },
    mouseClick: async () => { actions.push("click"); },
  } as unknown as Element;
  const frame = {} as Element;
  const response = {} as Element;
  const tab = {
    querySelector: async (selector: string) => selector.includes("iframe")
      ? frame
      : selector.includes("input")
        ? response
        : container,
    verifyCf: async (selector: string, options: unknown) => { actions.push(`${selector}:${JSON.stringify(options)}`); },
  } as unknown as Tab;
  assert.deepEqual(await cfFindInteractiveChallenge(tab), [container, frame, response]);
  assert.equal(await cfIsInteractiveChallengePresent(tab, 0), true);
  assert.deepEqual(await cfWaitForInteractiveChallenge({ querySelector: async () => null } as unknown as Tab, 0), [null, null, null]);
  await verifyCf(tab, 0, 0, undefined, true);
  await verifyCf(tab, 0.01, 0.02, "#challenge");
  assert.deepEqual(actions, [
    "flash",
    "click",
    "#challenge:{\"timeoutMs\":20,\"clickDelayMs\":10}",
  ]);
});

function node(nodeId: number, nodeName: string, children?: Protocol.DOM.Node[]): Protocol.DOM.Node {
  return {
    nodeId,
    backendNodeId: nodeId,
    nodeType: nodeName === "#document" ? 9 : 1,
    nodeName,
    localName: nodeName.toLowerCase(),
    nodeValue: "",
    ...(children === undefined ? {} : { children }),
  };
}

function targetInfo(overrides: Partial<Protocol.Target.TargetInfo>): Protocol.Target.TargetInfo {
  return {
    targetId: "target",
    type: "page",
    title: "",
    url: "about:blank",
    attached: false,
    canAccessOpener: false,
    ...overrides,
  };
}
