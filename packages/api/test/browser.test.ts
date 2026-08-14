import assert from "node:assert/strict";
import test from "node:test";
import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import { CdpAbortError, type CdpConnection, type SendOptions } from "@vertile-ai/jsdriver-runtime-js";
import { Tab, TargetClosedError, TargetCrashedError } from "../src/browser.js";
import { expectDownload } from "../src/download.js";
import { Element } from "../src/element.js";

const unusedConnection = {} as CdpConnection;

test("closed and crashed targets fail with typed lifecycle errors", async () => {
  const closed = new Tab("closed-target", unusedConnection, "session");
  closed.markClosed();
  assert.equal(closed.closed, true);
  await assert.rejects(closed.evaluate("1"), (error: unknown) => error instanceof TargetClosedError);

  const crashed = new Tab("crashed-target", unusedConnection);
  crashed.markCrashed("crashed", 5);
  assert.equal(crashed.crashed, true);
  await assert.rejects(
    crashed.navigate("about:blank"),
    (error: unknown) => error instanceof TargetCrashedError && error.errorCode === 5,
  );
});

test("navigation failure cancels and removes its load waiter", async () => {
  let removedListeners = 0;
  const failedConnection = {
    domainPolicy: "manual",
    enableDomain: async () => {},
    on: () => () => { removedListeners += 1; },
    send: async () => { throw new Error("navigation rejected"); },
  } as unknown as CdpConnection;
  const tab = new Tab("failed-navigation", failedConnection, "session");
  await assert.rejects(tab.navigate("https://invalid.test", 5), /navigation rejected/);
  assert.equal(removedListeners, 1);
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(removedListeners, 1);
});

test("reload and history failures always remove their load waiters", async () => {
  let removedListeners = 0;
  const connection = {
    on: () => () => { removedListeners += 1; },
    sendRaw: async (method: string) => {
      if (method === "Page.getNavigationHistory") {
        return { currentIndex: 1, entries: [{ id: 1 }, { id: 2 }] };
      }
      throw new Error(`${method} rejected`);
    },
  } as unknown as CdpConnection;
  const tab = new Tab("waiter-failure", connection, "session");

  await assert.rejects(tab.reload(), /Page\.reload rejected/);
  assert.equal(removedListeners, 1);
  await assert.rejects(tab.back(), /Page\.navigateToHistoryEntry rejected/);
  assert.equal(removedListeners, 2);
});

test("reload and history aborts use CdpAbortError and clean up", async () => {
  let removedListeners = 0;
  const connection = {
    on: () => () => { removedListeners += 1; },
    sendRaw: async (method: string) => method === "Page.getNavigationHistory"
      ? { currentIndex: 1, entries: [{ id: 1 }, { id: 2 }] }
      : {},
  } as unknown as CdpConnection;
  const tab = new Tab("waiter-abort", connection, "session");
  const reloadAbort = new AbortController();
  reloadAbort.abort("reload cancelled");
  await assert.rejects(tab.reload(false, { signal: reloadAbort.signal }), CdpAbortError);

  const historyAbort = new AbortController();
  historyAbort.abort("history cancelled");
  await assert.rejects(tab.back({ signal: historyAbort.signal }), CdpAbortError);
  assert.equal(removedListeners, 2);
});

test("Tab commands force their bound session and reject session mismatches", async () => {
  const calls: Array<{ readonly method: string; readonly options: SendOptions }> = [];
  const connection = {
    sendRaw: async (method: string, _params: unknown, options: SendOptions) => {
      calls.push({ method, options });
      return {};
    },
  } as unknown as CdpConnection;
  const flattened = new Tab("flattened", connection, "bound-session");
  await flattened.sendRaw("Custom.command");
  await flattened.send("Runtime.enable", undefined, { sessionId: "bound-session" });
  assert.deepEqual(calls.map(({ options }) => options.sessionId), ["bound-session", "bound-session"]);
  assert.throws(
    () => flattened.sendRaw("Custom.command", {}, { sessionId: "other-session" }),
    /cannot send to CDP session other-session/,
  );

  const direct = new Tab("direct", connection);
  assert.throws(
    () => direct.sendRaw("Custom.command", {}, { sessionId: "other-session" }),
    /cannot send to CDP session other-session/,
  );
});

test("ZDAPI-TAB-LIFECYCLE-001", async () => {
  const calls: Array<{ readonly method: string; readonly params: unknown }> = [];
  const connection = {
    send: async (method: string, params: unknown) => {
      calls.push({ method, params });
      return method === "Browser.getWindowForTarget" ? { windowId: 7, bounds: {} } : {};
    },
    sendRaw: async (method: string, params: unknown) => {
      calls.push({ method, params });
      return {};
    },
  } as unknown as CdpConnection;
  const target = {
    targetId: "target",
    type: "page",
    title: "Fixture",
    url: "about:blank",
    attached: true,
    canAccessOpener: true,
  } satisfies Protocol.Target.TargetInfo;
  let closed = 0;
  const tab = new Tab(
    target.targetId,
    connection,
    undefined,
    connection,
    "ws://127.0.0.1/devtools/page/target",
    async () => { closed += 1; },
    undefined,
    () => target,
  );

  assert.equal(tab.aenter(), tab);
  await tab.aopen();
  assert.equal(tab.target, target);
  assert.equal(tab.can_access_opener, true);
  assert.equal(tab.websocket, connection);
  assert.equal(tab.feed_cdp("Runtime.enable"), undefined);
  await new Promise<void>((resolve) => setImmediate(resolve));
  await tab.medimize();
  await tab.sleep(0);
  await tab.wait(0);
  await tab.aexit();
  assert.equal(closed, 1);
  assert.deepEqual(calls.map(({ method }) => method), [
    "Runtime.enable",
    "Browser.getWindowForTarget",
    "Browser.setWindowBounds",
  ]);
  assert.deepEqual(calls[2]?.params, { windowId: 7, bounds: { windowState: "minimized" } });
});

test("network expectations ignore other sessions and clean up listeners and domain leases", async () => {
  const handlers = new Map<string, Set<(event: unknown, metadata: { readonly sessionId?: string }) => void>>();
  const calls: string[] = [];
  const connection = {
    domainPolicy: "reference-counted",
    acquireDomain: async (domain: string) => {
      calls.push(`acquire:${domain}`);
      return async () => { calls.push(`release:${domain}`); };
    },
    on: (method: string, handler: (event: unknown, metadata: { readonly sessionId?: string }) => void) => {
      const methodHandlers = handlers.get(method) ?? new Set();
      methodHandlers.add(handler);
      handlers.set(method, methodHandlers);
      return () => { calls.push(`off:${method}`); methodHandlers.delete(handler); };
    },
  } as unknown as CdpConnection;
  const tab = new Tab("network-session", connection, "session-1");
  const expectation = tab.expectRequest(".*/api", { timeoutMs: 100 });
  await expectation.ready;
  const event = {
    requestId: "request",
    loaderId: "loader",
    documentURL: "http://fixture/api",
    request: { url: "http://fixture/api", method: "GET", headers: {}, initialPriority: "High", referrerPolicy: "no-referrer" },
    timestamp: 1,
    wallTime: 1,
    initiator: { type: "other" },
    redirectHasExtraInfo: false,
  } satisfies Protocol.Network.Events.RequestWillBeSentEvent;
  for (const handler of handlers.get("Network.requestWillBeSent") ?? []) handler(event, { sessionId: "session-2" });
  for (const handler of handlers.get("Network.requestWillBeSent") ?? []) handler(event, { sessionId: "session-1" });
  assert.equal((await expectation.value).request.url, "http://fixture/api");
  assert.deepEqual(calls, ["acquire:Network"]);
  await expectation.cancel();
  assert.deepEqual(calls, [
    "acquire:Network",
    "off:Network.requestWillBeSent",
    "off:Network.responseReceived",
    "off:Network.loadingFinished",
    "off:Network.loadingFailed",
    "release:Network",
  ]);
});

test("download completion is retained while an asynchronous matcher resolves", async () => {
  const handlers = new Map<string, (event: unknown) => unknown>();
  const connection = {
    on: (method: string, handler: (event: unknown) => unknown) => {
      handlers.set(method, handler);
      return () => { handlers.delete(method); };
    },
    sendRaw: async (method: string) => method === "Page.getFrameTree"
      ? { frameTree: { frame: { id: "frame" } } }
      : {},
  } as unknown as CdpConnection;
  const tab = new Tab("download-race", connection, "session");
  const expectation = expectDownload(tab, process.cwd(), async () => {
    await Promise.resolve();
    return true;
  }, { timeoutMs: 100 });
  await expectation.ready;

  const begin = handlers.get("Browser.downloadWillBegin");
  const progress = handlers.get("Browser.downloadProgress");
  assert.ok(begin !== undefined && progress !== undefined);
  void begin({ frameId: "frame", guid: "download", url: "https://fixture.test/file", suggestedFilename: "file.txt" });
  void progress({ guid: "download", state: "completed", receivedBytes: 4, totalBytes: 4, filePath: `${process.cwd()}/file.txt` });

  assert.equal((await expectation.value).guid, "download");
});

test("mouse clicks send the correct pressed-button bitmask", async () => {
  const messages: Array<{ readonly method: string; readonly params: unknown }> = [];
  const connection = {
    sendRaw: async (method: string, params: unknown) => {
      messages.push({ method, params });
      return {};
    },
  } as unknown as CdpConnection;
  const tab = new Tab("mouse", connection, "session");
  await tab.mouseClick(1, 2, "left");
  await tab.mouseClick(1, 2, "right");
  await tab.mouseClick(1, 2, "middle");
  const pressed = messages
    .filter(({ params }) => (params as { readonly type?: string }).type === "mousePressed")
    .map(({ params }) => (params as { readonly buttons?: number }).buttons);
  assert.deepEqual(pressed, [1, 2, 4]);
});

test("Element refresh releases its cached Runtime object", async () => {
  const node = {
    nodeId: 1,
    backendNodeId: 10,
    nodeType: 1,
    nodeName: "DIV",
    localName: "div",
    nodeValue: "",
  } satisfies Protocol.DOM.Node;
  const calls: Array<{ readonly method: string; readonly params: unknown }> = [];
  const connection = {
    sendRaw: async (method: string, params: unknown) => {
      calls.push({ method, params });
      if (method === "DOM.resolveNode") return { object: { type: "object", objectId: "cached-object" } };
      if (method === "Runtime.callFunctionOn") return { result: { type: "boolean", value: true } };
      if (method === "DOM.describeNode") return { node: { ...node, nodeId: 2 } };
      return {};
    },
  } as unknown as CdpConnection;
  const element = new Element(new Tab("object-lifecycle", connection, "session"), node.backendNodeId, node);
  await element.apply("function () { return true; }");
  await element.refresh();

  const methods = calls.map(({ method }) => method);
  assert.ok(methods.indexOf("DOM.describeNode") < methods.indexOf("Runtime.releaseObject"));
  assert.deepEqual(
    calls.find(({ method }) => method === "Runtime.releaseObject")?.params,
    { objectId: "cached-object" },
  );
  assert.equal(element.objectId, undefined);
});

test("text search releases temporary text-node and parent Runtime objects", async () => {
  const released: string[] = [];
  const connection = {
    sendRaw: async (method: string, params: unknown) => {
      const values = params as { readonly nodeId?: number; readonly backendNodeId?: number; readonly objectId?: string };
      if (method === "DOM.getDocument") return { root: domNode(1, 1, "#document", 9) };
      if (method === "DOM.performSearch") return { searchId: "search", resultCount: 1 };
      if (method === "DOM.getSearchResults") return { nodeIds: [11] };
      if (method === "DOM.describeNode" && values.nodeId === 11) return { node: domNode(11, 11, "#text", 3) };
      if (method === "DOM.describeNode" && values.nodeId === 12) {
        return { node: { ...domNode(12, 12, "P", 1), attributes: ["id", "visible"] } };
      }
      if (method === "DOM.resolveNode" && values.nodeId === 11) {
        return { object: { type: "object", objectId: "temporary-text" } };
      }
      if (method === "DOM.resolveNode" && values.backendNodeId === 12) {
        return { object: { type: "object", objectId: "content-element" } };
      }
      if (method === "Runtime.callFunctionOn" && values.objectId === "temporary-text") {
        return { result: { type: "object", objectId: "temporary-parent" } };
      }
      if (method === "Runtime.callFunctionOn" && values.objectId === "content-element") {
        return { result: { type: "boolean", value: true } };
      }
      if (method === "DOM.requestNode") return { nodeId: 12 };
      if (method === "Runtime.releaseObject" && values.objectId !== undefined) released.push(values.objectId);
      return {};
    },
  } as unknown as CdpConnection;
  const result = await new Tab("text-release", connection, "session").find("visible", false, true, { timeoutMs: 10 });
  assert.equal(result.attributes.id, "visible");
  assert.deepEqual(released, ["temporary-parent", "temporary-text"]);
});

test("text search can retain a non-element match instead of promoting its parent", async () => {
  const connection = {
    sendRaw: async (method: string, params: unknown) => {
      const values = params as { readonly nodeId?: number; readonly backendNodeId?: number; readonly objectId?: string };
      if (method === "DOM.getDocument") return { root: domNode(1, 1, "#document", 9) };
      if (method === "DOM.performSearch") return { searchId: "search", resultCount: 1 };
      if (method === "DOM.getSearchResults") return { nodeIds: [11] };
      if (method === "DOM.describeNode" && values.nodeId === 11) return { node: { ...domNode(11, 11, "#text", 3), nodeValue: "visible" } };
      if (method === "DOM.resolveNode" && values.nodeId === 11) return { object: { type: "object", objectId: "text" } };
      if (method === "Runtime.callFunctionOn") return { result: { type: "object", objectId: "parent" } };
      if (method === "DOM.requestNode") return { nodeId: 12 };
      if (method === "DOM.describeNode" && values.nodeId === 12) return { node: domNode(12, 12, "P", 1) };
      return {};
    },
  } as unknown as CdpConnection;
  const result = await new Tab("raw-text", connection, "session").find("visible", false, false, { timeoutMs: 10 });
  assert.equal(result.nodeType, 3);
  assert.equal(result.nodeValue, "visible");
});

function domNode(
  nodeId: Protocol.DOM.NodeId,
  backendNodeId: Protocol.DOM.BackendNodeId,
  nodeName: string,
  nodeType: number,
): Protocol.DOM.Node {
  return { nodeId, backendNodeId, nodeType, nodeName, localName: nodeName.toLowerCase(), nodeValue: "" };
}
