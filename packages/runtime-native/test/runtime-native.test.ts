import assert from "node:assert/strict";
import { createServer, type Socket } from "node:net";
import test from "node:test";
import { WebSocket, WebSocketServer } from "ws";
import {
  CdpAbortError,
  CdpConnectionClosedError,
  CdpConnectionLostError,
  CdpProtocolError,
  CdpTimeoutError,
} from "@nodriver/runtime-js";
import { NativeConnection } from "../src/index.js";

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
