import assert from "node:assert/strict";
import { createServer, type Socket } from "node:net";
import test from "node:test";
import { WebSocket as ServerSocket, WebSocketServer } from "ws";
import {
  CdpAbortError,
  CdpConnection,
  CdpConnectionLostError,
  CdpProtocolError,
  CdpTimeoutError,
  type ConnectOptions,
} from "../src/connection.js";

interface Peer {
  readonly connection: CdpConnection;
  readonly socket: ServerSocket;
  readonly nextMessage: () => Promise<Record<string, unknown>>;
  readonly close: () => Promise<void>;
}

async function createPeer(options: ConnectOptions = {}): Promise<Peer> {
  const server = new WebSocketServer({ host: "127.0.0.1", port: 0 });
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  if (typeof address !== "object" || address === null) throw new Error("WebSocket server has no TCP address");
  const socketPromise = new Promise<ServerSocket>((resolve) => server.once("connection", resolve));
  const connectionPromise = CdpConnection.connect(`ws://127.0.0.1:${address.port}`, options);
  const socket = await socketPromise;
  const connection = await connectionPromise;
  const queued: Record<string, unknown>[] = [];
  const waiters: Array<(message: Record<string, unknown>) => void> = [];
  socket.on("message", (data) => {
    const message = JSON.parse(data.toString()) as Record<string, unknown>;
    const waiter = waiters.shift();
    if (waiter === undefined) queued.push(message);
    else waiter(message);
  });
  return {
    connection,
    socket,
    nextMessage: async () => queued.shift() ?? await new Promise((resolve) => waiters.push(resolve)),
    close: async () => {
      connection.close();
      for (const client of server.clients) client.terminate();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    },
  };
}

test("routes typed/raw commands, sessions, responses, protocol errors, and trace", async () => {
  const peer = await createPeer();
  try {
    const typed = peer.connection.send("Runtime.evaluate", { expression: "1 + 1" }, { sessionId: "s1" });
    const first = await peer.nextMessage();
    assert.equal(first.method, "Runtime.evaluate");
    assert.equal(first.sessionId, "s1");
    peer.socket.send(JSON.stringify({ id: first.id, result: { result: { type: "number", value: 2 } }, sessionId: "s1" }));
    assert.equal((await typed).result.value, 2);

    const failed = peer.connection.sendRaw("No.suchCommand");
    const second = await peer.nextMessage();
    peer.socket.send(JSON.stringify({ id: second.id, error: { code: -32601, message: "Method not found" } }));
    await assert.rejects(failed, (error: unknown) => error instanceof CdpProtocolError && error.code === -32601);
    assert.deepEqual(peer.connection.trace.map((entry) => entry.direction), ["send", "receive", "send", "receive"]);
  } finally {
    await peer.close();
  }
});

test("isolates event handler failures and reports them without closing", async () => {
  const peer = await createPeer();
  try {
    const errors: unknown[] = [];
    let handled = 0;
    peer.connection.onHandlerError((event) => errors.push(event.error));
    peer.connection.on("Runtime.consoleAPICalled", () => { throw new Error("handler failed"); });
    peer.connection.on("Runtime.consoleAPICalled", (_event, metadata) => {
      assert.equal(metadata.sessionId, "s2");
      handled += 1;
    });
    peer.socket.send(JSON.stringify({ method: "Runtime.consoleAPICalled", params: {}, sessionId: "s2" }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(handled, 1);
    assert.equal(errors.length, 1);

    const command = peer.connection.sendRaw("Runtime.enable");
    const sent = await peer.nextMessage();
    peer.socket.send(JSON.stringify({ id: sent.id, result: {} }));
    await command;
  } finally {
    await peer.close();
  }
});

test("command timeout, AbortSignal, and local close are observable", async () => {
  const peer = await createPeer();
  try {
    await assert.rejects(
      peer.connection.sendRaw("Runtime.enable", undefined, { timeoutMs: 5 }),
      (error: unknown) => error instanceof CdpTimeoutError && error.operation.includes("Runtime.enable"),
    );
    await peer.nextMessage();

    const controller = new AbortController();
    const pending = peer.connection.sendRaw("Runtime.enable", undefined, { signal: controller.signal });
    controller.abort(new Error("cancelled"));
    await assert.rejects(pending, (error: unknown) => error instanceof CdpAbortError);
    await peer.nextMessage();

    const interrupted = peer.connection.sendRaw("Runtime.enable");
    peer.connection.close();
    await assert.rejects(interrupted, /connection closed/);
  } finally {
    await peer.close();
  }
});

test("remote WebSocket closure rejects commands with a typed connection-lost error", async () => {
  const peer = await createPeer();
  try {
    const pending = peer.connection.sendRaw("Runtime.enable");
    await peer.nextMessage();
    peer.socket.terminate();
    await assert.rejects(pending, (error: unknown) => error instanceof CdpConnectionLostError);
  } finally {
    await peer.close();
  }
});

test("WebSocket open timeout terminates a real stalled TCP connection", async () => {
  const accepted = new Set<Socket>();
  let acceptedAtLeastOne = false;
  const server = createServer((socket) => {
    acceptedAtLeastOne = true;
    accepted.add(socket);
    socket.once("close", () => accepted.delete(socket));
    socket.resume();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (typeof address !== "object" || address === null) throw new Error("TCP server has no address");
  try {
    await assert.rejects(
      CdpConnection.connect(`ws://127.0.0.1:${address.port}`, { timeoutMs: 30 }),
      (error: unknown) => error instanceof CdpTimeoutError,
    );
    await waitFor(() => accepted.size === 0, 500);
    assert.equal(acceptedAtLeastOne, true);
    assert.equal(accepted.size, 0);
  } finally {
    for (const socket of accepted) socket.destroy();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("domain policies expose enabled domains and reference-count releases", async () => {
  const manual = await createPeer({ domainPolicy: "manual" });
  try {
    const release = await manual.connection.acquireDomain("Page");
    assert.deepEqual([...manual.connection.enabledDomains], []);
    await release();
  } finally {
    await manual.close();
  }

  const compatible = await createPeer({ domainPolicy: "zendriver-compatible" });
  try {
    const lease = compatible.connection.acquireDomain("Page");
    const enable = await compatible.nextMessage();
    assert.equal(enable.method, "Page.enable");
    compatible.socket.send(JSON.stringify({ id: enable.id, result: {} }));
    const release = await lease;
    assert.deepEqual([...compatible.connection.enabledDomains], ["Page"]);
    await release();
  } finally {
    await compatible.close();
  }

  const referenced = await createPeer({ domainPolicy: "reference-counted" });
  try {
    const firstLease = referenced.connection.acquireDomain("Network", { sessionId: "s1" });
    const enable = await referenced.nextMessage();
    referenced.socket.send(JSON.stringify({ id: enable.id, result: {} }));
    const releaseFirst = await firstLease;
    const releaseSecond = await referenced.connection.acquireDomain("Network", { sessionId: "s1" });
    await releaseFirst();
    assert.deepEqual([...referenced.connection.enabledDomains], ["Network"]);
    const finalRelease = releaseSecond();
    const disable = await referenced.nextMessage();
    assert.equal(disable.method, "Network.disable");
    assert.equal(disable.sessionId, "s1");
    referenced.socket.send(JSON.stringify({ id: disable.id, result: {} }));
    await finalRelease;
    assert.deepEqual([...referenced.connection.enabledDomains], []);
  } finally {
    await referenced.close();
  }
});

async function waitFor(predicate: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!predicate()) {
    if (Date.now() >= deadline) throw new Error("Condition did not become true");
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}
