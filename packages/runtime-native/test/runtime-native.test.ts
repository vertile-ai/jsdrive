import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { readFile, mkdtemp, writeFile } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import { createServer, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { Browser, discoverChromeExecutable, SpecialKeys, type ConnectionMode } from "@nodriver/api";
import { WebSocket, WebSocketServer } from "ws";
import {
  CdpAbortError,
  CdpConnectionClosedError,
  CdpConnectionLostError,
  CdpProtocolError,
  CdpTimeoutError,
} from "@nodriver/runtime-js";
import { NativeConnection } from "../src/index.js";

const nativeAddon = fileURLToPath(new URL(`../../native/nodriver.${process.platform}-${process.arch}.node`, import.meta.url));
const nativeBinding = createRequire(import.meta.url)(nativeAddon) as {
  activeConnectionCount(): Promise<number>;
};

test("aborts a stalled WebSocket handshake and releases the TCP socket", async () => {
  const sockets = new Set<Socket>();
  const server = createServer((socket) => {
    sockets.add(socket);
    socket.once("close", () => sockets.delete(socket));
    socket.resume();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (typeof address !== "object" || address === null) throw new Error("TCP server has no address");
  try {
    const controller = new AbortController();
    const connecting = NativeConnection.connect(`ws://127.0.0.1:${address.port}`, {
      timeoutMs: 10_000,
      signal: controller.signal,
    });
    await waitFor(() => sockets.size === 1, 500);
    controller.abort(new Error("cancel handshake"));
    await assert.rejects(connecting, CdpAbortError);
    await waitFor(() => sockets.size === 0, 500);
  } finally {
    for (const socket of sockets) socket.destroy();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("preserves protocol, explicit timeout, local close, and remote loss error types", async () => {
  const peer = await createPeer((message, socket) => {
    if (message.method === "Invalid.command") {
      socket.send(JSON.stringify({
        id: message.id,
        error: { code: -32601, message: "Method not found", data: "invalid" },
      }));
    } else if (message.method === "Delayed.command") {
      setTimeout(() => socket.send(JSON.stringify({ id: message.id, result: { delayed: true } })), 30);
    } else if (message.method === "Lost.command") {
      socket.terminate();
    }
  });
  try {
    await assert.rejects(
      peer.connection.sendRaw("Invalid.command"),
      (error: unknown) => error instanceof CdpProtocolError
        && error.code === -32601
        && error.data === "invalid",
    );
    await assert.rejects(peer.connection.sendRaw("Never.command", {}, { timeoutMs: 5 }), CdpTimeoutError);
    assert.deepEqual(await peer.connection.sendRaw("Delayed.command"), { delayed: true });
    await assert.rejects(peer.connection.sendRaw("Lost.command"), CdpConnectionLostError);
  } finally {
    await peer.close();
  }

  const closed = await createPeer(() => {});
  await closed.connection.closeAsync();
  await assert.rejects(closed.connection.sendRaw("After.close"), CdpConnectionClosedError);
  await closed.closeServer();
});

test("closed becomes true when the WebSocket peer closes without a command", async () => {
  const initialHandles = await nativeBinding.activeConnectionCount();
  const peer = await createPeer(() => {});
  assert.equal(await nativeBinding.activeConnectionCount(), initialHandles + 1);
  await peer.closeServer();
  await waitFor(() => peer.connection.closed, 500);
  assert.equal(peer.connection.closed, true);
  await waitForAsync(async () => await nativeBinding.activeConnectionCount() === initialHandles, 500);
  await peer.connection.closeAsync();
  assert.equal(await nativeBinding.activeConnectionCount(), initialHandles);
});

test("serialization failures do not retain cancellation registrations", async () => {
  const peer = await createPeer((message, socket) => {
    socket.send(JSON.stringify({ id: message.id, result: { ok: true } }));
  });
  try {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    await assert.rejects(peer.connection.sendRaw("Circular.command", circular, {
      signal: new AbortController().signal,
    }), TypeError);
    await assert.rejects(peer.connection.sendRaw("BigInt.command", { value: 1n }, {
      signal: new AbortController().signal,
    }), TypeError);
    assert.deepEqual(await peer.connection.sendRaw("Valid.command", {}, {
      signal: new AbortController().signal,
    }), { ok: true });
  } finally {
    await peer.close();
  }
});

test("records backend-neutral command results and events in the native wrapper", async () => {
  const peer = await createPeer((message, socket) => {
    socket.send(JSON.stringify({ id: message.id, result: { ok: true } }));
    socket.send(JSON.stringify({ method: "Runtime.consoleAPICalled", params: { type: "log" }, sessionId: "fixture-session" }));
  });
  try {
    await peer.connection.sendRaw("Runtime.evaluate", { expression: "42" }, { sessionId: "fixture-session" });
    await waitFor(() => peer.connection.trace.length === 3, 500);
    const outbound = peer.connection.trace.filter(({ direction }) => direction === "send");
    assert.deepEqual(outbound.map(({ message }) => message.method), ["Runtime.evaluate"]);
    const commandId = outbound[0]?.message.id;
    assert.equal(peer.connection.trace.some(({ direction, message }) => direction === "receive"
      && message.id === commandId && message.sessionId === "fixture-session"), true);
    assert.equal(peer.connection.trace.some(({ direction, message }) => direction === "receive"
      && message.method === "Runtime.consoleAPICalled" && message.sessionId === "fixture-session"), true);
  } finally {
    await peer.close();
  }
});

test("native handlers and domain bookkeeping stay scoped to a CDP session", async () => {
  const peer = await createPeer((message, socket) => {
    socket.send(JSON.stringify({ id: message.id, result: {} }));
    socket.send(JSON.stringify({
      method: "Runtime.consoleAPICalled",
      params: { type: "log" },
      ...(typeof message.sessionId === "string" ? { sessionId: message.sessionId } : {}),
    }));
  });
  try {
    let handled = 0;
    const errors: unknown[] = [];
    peer.connection.onHandlerError((event) => errors.push(event.error));
    peer.connection.on("Runtime.consoleAPICalled", () => { throw new Error("native sync handler failure"); });
    peer.connection.on("Runtime.consoleAPICalled", (_event, metadata) => {
      if (metadata.sessionId === "native-a") handled += 1;
    });
    await peer.connection.enableDomain("Network", { sessionId: "native-a" }, "auto");
    assert.deepEqual([...peer.connection.enabledDomainsFor?.("native-a") ?? []], ["Network"]);
    assert.deepEqual([...peer.connection.enabledDomainsFor?.("native-b") ?? []], []);
    assert.deepEqual([...peer.connection.manuallyEnabledDomainsFor?.("native-a") ?? []], []);
    await peer.connection.send("Network.disable", undefined, { sessionId: "native-a" });
    assert.deepEqual([...peer.connection.enabledDomainsFor?.("native-a") ?? []], []);
    await peer.connection.sendRaw("Runtime.enable", undefined, { sessionId: "native-a" });
    await waitFor(() => handled > 0, 500);
    await waitFor(() => errors.length > 0, 500);
    assert.equal(errors[0] instanceof Error && errors[0].message, "native sync handler failure");
    await peer.connection.closeAsync();
    assert.deepEqual([...peer.connection.enabledDomainsFor?.("native-a") ?? []], []);
    assert.deepEqual([...peer.connection.manuallyEnabledDomainsFor?.("native-a") ?? []], []);
  } finally {
    await peer.close();
  }
});

test("native backend runs DOM, input, capture, cookies, network, and download in both modes", { timeout: 60_000 }, async () => {
  const server = createHttpServer((request, response) => {
    if (request.url === "/api") { response.setHeader("content-type", "application/json"); response.end('{"ok":true}'); return; }
    if (request.url === "/download") { response.setHeader("content-disposition", "attachment; filename=native.txt"); response.end("native download"); return; }
    response.end("<!doctype html><input id=input><input id=file type=file><div id=result></div>");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const output = await mkdtemp(join(tmpdir(), "nodriver-native-high-level-"));
  const upload = join(output, "upload.txt");
  await writeFile(upload, "native upload");
  const executable = await discoverChromeExecutable();
  try {
    for (const connectionMode of ["direct", "flattened"] satisfies readonly ConnectionMode[]) {
      const browser = await Browser.start({ executable, connectionMode, backend: NativeConnection });
      try {
        const tab = await browser.get(baseUrl);
        const input = await tab.select("#input");
        await input.sendKeys(["native", SpecialKeys.Backspace, "e"]);
        assert.equal(await input.getValue(), "native");
        await (await tab.select("#file")).uploadFiles([upload]);
        assert.equal(await tab.evaluate("document.querySelector('#file').files[0].name"), "upload.txt");
        assert.ok((await tab.screenshotB64()).length > 100);
        assert.ok((await tab.printToPdf()).length > 100);
        assert.match(await tab.saveSnapshot(), /multipart\/related/i);
        await browser.cookies.setAll([{ name: "native", value: connectionMode, url: baseUrl }]);
        assert.equal((await browser.cookies.getAll()).find(({ name }) => name === "native")?.value, connectionMode);
        const expectation = tab.expectResponse("/api");
        await expectation.ready;
        const fetchAction = tab.evaluate(`fetch(${JSON.stringify(`${baseUrl}/api`)}).then(r => r.json())`, true);
        assert.deepEqual((await expectation.value).json(), { ok: true });
        assert.deepEqual(await fetchAction, { ok: true });
        const interception = tab.intercept({ url: "/local" });
        await interception.ready;
        const interceptAction = tab.evaluate<string>(`fetch(${JSON.stringify(`${baseUrl}/local`)}).then(r => r.text())`, true);
        await (await interception.next()).fulfillRequest(200, { body: Buffer.from("native fulfilled").toString("base64") });
        assert.equal(await interceptAction, "native fulfilled");
        await interception.close();
        const destination = join(output, `${connectionMode}.txt`);
        await tab.downloadFile(`${baseUrl}/download`, destination);
        assert.equal(await readFile(destination, "utf8"), "native download");
      } finally {
        await browser.close();
      }
    }
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

interface Peer {
  readonly connection: NativeConnection;
  readonly close: () => Promise<void>;
  readonly closeServer: () => Promise<void>;
}

async function createPeer(
  receive: (message: Readonly<Record<string, unknown>>, socket: WebSocket) => void,
): Promise<Peer> {
  const server = new WebSocketServer({ host: "127.0.0.1", port: 0 });
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  if (typeof address !== "object" || address === null) throw new Error("WebSocket server has no address");
  server.on("connection", (socket) => socket.on("message", (data) => {
    receive(JSON.parse(data.toString()) as Readonly<Record<string, unknown>>, socket);
  }));
  const connection = await NativeConnection.connect(`ws://127.0.0.1:${address.port}`);
  const closeServer = async (): Promise<void> => {
    for (const socket of server.clients) socket.terminate();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  };
  return {
    connection,
    closeServer,
    close: async () => {
      await connection.closeAsync();
      await closeServer();
    },
  };
}

async function waitFor(predicate: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!predicate()) {
    if (Date.now() >= deadline) throw new Error("Condition did not become true");
    await new Promise<void>((resolve) => setTimeout(resolve, 5));
  }
}

async function waitForAsync(predicate: () => Promise<boolean>, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!await predicate()) {
    if (Date.now() >= deadline) throw new Error("Condition did not become true");
    await new Promise<void>((resolve) => setTimeout(resolve, 5));
  }
}
