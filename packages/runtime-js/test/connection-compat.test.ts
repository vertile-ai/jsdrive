import assert from "node:assert/strict";
import test from "node:test";
import { WebSocketServer, type WebSocket } from "ws";
import {
  CdpConnectionClosedError,
  CancelledError,
  CantTouchThis,
  Connection,
  EventTransaction,
  Listener,
  ProtocolException,
  SettingClassVarNotAllowedException,
  Transaction,
} from "../src/index.js";

test("ZDAPI-CONNECTION-001", async () => {
  const server = new WebSocketServer({ host: "127.0.0.1", port: 0 });
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  const socketPromise = new Promise<WebSocket>((resolve) => server.once("connection", resolve));
  const connection = new Connection(`ws://127.0.0.1:${address.port}`);
  const eventPromise = new Promise<unknown>((resolve) => {
    connection.add_handler("Runtime.consoleAPICalled", (event) => resolve(event));
  });
  assert.equal(connection.closed, true);
  await connection.aopen();
  assert.equal(connection.closed, false);
  assert.ok(connection.websocket);
  const socket = await socketPromise;

  try {
    socket.send(JSON.stringify({ method: "Runtime.consoleAPICalled", params: { type: "log" } }));
    assert.deepEqual(await eventPromise, { type: "log" });
    await connection.wait();

    const sleepStarted = Date.now();
    await connection.sleep();
    assert.ok(Date.now() - sleepStarted >= 200);

    const command = connection.send<{ readonly value: number }>({
      method: "Runtime.evaluate",
      params: { expression: "1 + 1" },
      decode: (result) => result.result as { readonly value: number },
    });
    const message = await nextMessage(socket);
    assert.equal(message.method, "Runtime.evaluate");
    socket.send(JSON.stringify({ id: message.id, result: { result: { value: 2 } } }));
    assert.deepEqual(await command, { value: 2 });

    const fed = connection.feed_cdp({ method: "Runtime.enable" });
    const fedMessage = await nextMessage(socket);
    socket.send(JSON.stringify({ id: fedMessage.id, result: {} }));
    assert.equal(fed, undefined);

    const targetUpdate = connection.update_target();
    const targetMessage = await nextMessage(socket);
    assert.equal(targetMessage.method, "Target.getTargetInfo");
    assert.deepEqual(targetMessage.params, {});
    socket.send(JSON.stringify({ id: targetMessage.id, result: { targetInfo: { targetId: "target-1", type: "page", title: "Fixture", url: "about:blank" } } }));
    await targetUpdate;
    assert.equal(connection.target_id, "target-1");
    assert.equal(connection.title, "Fixture");

    const awaited = connection.then();
    const awaitedMessage = await nextMessage(socket);
    assert.equal(awaitedMessage.method, "Target.getTargetInfo");
    socket.send(JSON.stringify({ id: awaitedMessage.id, result: { targetInfo: { targetId: "target-1", type: "page", title: "Fixture", url: "about:blank" } } }));
    await awaited;
  } finally {
    await connection.aclose();
    for (const client of server.clients) client.terminate();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("ZDAPI-TRANSACTION-001", async () => {
  const transaction = new Transaction<{ readonly ok: boolean }>({ method: "Fixture.command" });
  assert.equal(transaction.done(), false);
  assert.equal(transaction.has_exception, true);
  assert.throws(() => transaction.exception(), /Exception is not set\./);
  assert.deepEqual(JSON.parse(transaction.message), { method: "Fixture.command", id: null });
  transaction.call({ result: { ok: true } });
  assert.equal(transaction.done(), true);
  assert.equal(transaction.has_exception, false);
  assert.deepEqual(await transaction, { ok: true });
  assert.deepEqual(transaction.result(), { ok: true });

  const failed = new Transaction("Fixture.command");
  failed.call({ error: { code: -32601, message: "Method not found" } });
  assert.equal(failed.hasException, true);
  assert.equal(failed.exception()?.message, "Method not found [code: -32601]");
  await assert.rejects(failed, ProtocolException);

  const event = new EventTransaction({ type: "log" });
  assert.equal(event.done(), true);
  assert.deepEqual(event.event, { type: "log" });
  assert.deepEqual(await event, { type: "log" });
  assert.match(event.toString(), /EventTransaction/);
});

test("ZDAPI-EVENT-TRANSACTION-THENABLE-001", async () => {
  const thenableEvent = {
    then(resolve: (value: string) => void): void {
      resolve("assimilated-event");
    },
  };
  const event = new EventTransaction(thenableEvent);
  assert.equal(event.event, thenableEvent);
  assert.equal(event.result(), thenableEvent);
  // ECMAScript await assimilates arbitrary thenables even when the transaction preserves identity.
  assert.equal(await (event as PromiseLike<unknown>), "assimilated-event");
});

test("ZDAPI-TRANSACTION-FUTURE-001", async () => {
  const transaction = new Transaction("Fixture.command");
  let callbackCount = 0;
  const callback = (): void => { callbackCount += 1; };
  transaction.add_done_callback(callback);
  transaction.set_result({ ok: true });
  await new Promise<void>((resolve) => queueMicrotask(resolve));
  assert.equal(callbackCount, 1);
  assert.equal(transaction.remove_done_callback(callback), 0);
  assert.equal(transaction.getLoop(), undefined);

  const cancelled = new Transaction("Fixture.command");
  assert.equal(cancelled.cancel(), true);
  assert.equal(cancelled.cancelled(), true);
  assert.throws(() => cancelled.result(), CancelledError);
  assert.throws(() => cancelled.exception(), CancelledError);
  await assert.rejects(cancelled, CancelledError);
});

test("ZDAPI-CONNECTION-ERRORS-001", () => {
  assert.throws(() => new ProtocolException(), RangeError);
  const protocol = new ProtocolException({ code: -32000, message: "bad", data: { reason: "fixture" } });
  assert.equal(protocol.code, -32000);
  assert.equal(protocol.message, "bad [code: -32000]");
  assert.deepEqual(protocol.data, { reason: "fixture" });
  assert.equal(new ProtocolException("first", "second").toString(), "first| second");
  assert.throws(() => CantTouchThis.rejectClassAssignment("Fixture", "value"), SettingClassVarNotAllowedException);
  assert.throws(() => {
    (Connection as unknown as { fixtureValue: number }).fixtureValue = 1;
  }, SettingClassVarNotAllowedException);
});

test("ZDAPI-CONNECTION-CLOSED-001", async () => {
  const connection = new Connection("ws://127.0.0.1:1");
  await assert.rejects(connection.send("Runtime.enable"), CdpConnectionClosedError);
});

test("ZDAPI-CONNECTION-LIFECYCLE-001", async () => {
  const connection = new Connection("ws://127.0.0.1:1", {
    target_id: "target-1",
    type_: "page",
    title: "Fixture",
    url: "about:blank",
    attached: true,
    can_access_opener: false,
    opener_id: "opener-1",
    opener_frame_id: "frame-1",
    browser_context_id: "context-1",
    subtype: "prerender",
  });
  assert.equal(connection.aenter(), connection);
  assert.equal(connection.target_id, "target-1");
  assert.equal(connection.targetId, "target-1");
  assert.equal(connection.type_, "page");
  assert.equal(connection.title, "Fixture");
  assert.equal(connection.url, "about:blank");
  assert.equal(connection.attached, true);
  assert.equal(connection.can_access_opener, false);
  assert.equal(connection.opener_id, "opener-1");
  assert.equal(connection.opener_frame_id, "frame-1");
  assert.equal(connection.browser_context_id, "context-1");
  assert.equal(connection.subtype, "prerender");
  await assert.rejects(connection.wait(), /No listener created yet/);
  await assert.rejects(connection.sleep(0), /WebSocket|connection|timed out/i);
  await connection.aexit();
});

test("ZDAPI-LISTENER-001", async () => {
  const connection = new Connection("ws://127.0.0.1:1");
  const listener = new Listener(connection);
  assert.equal(listener.connection, connection);
  assert.equal(listener.running, true);
  assert.equal(listener.time_before_considered_idle, 0.1);
  listener.observe({ type: "fixture" });
  assert.match(listener.toString(), /cache size: 1/);
  listener.cancel();
  assert.equal(listener.running, false);
  listener.run();
  await listener.listener_loop();
  assert.equal(listener.running, true);
  listener.cancel();
});

test("ZDAPI-CONNECTION-HANDLERS-001", async () => {
  const server = new WebSocketServer({ host: "127.0.0.1", port: 0 });
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(typeof address === "object" && address !== null);
  const firstSocket = new Promise<WebSocket>((resolve) => server.once("connection", resolve));
  const connection = new Connection(`ws://127.0.0.1:${address.port}`);
  const events: unknown[] = [];
  connection.add_handler("Runtime.consoleAPICalled", (event) => { events.push(event); });
  try {
    await connection.aopen();
    const first = await firstSocket;
    first.send(JSON.stringify({ method: "Runtime.consoleAPICalled", params: { count: 1 } }));
    await waitFor(() => events.length === 1);
    await connection.aclose();
    const secondSocket = new Promise<WebSocket>((resolve) => server.once("connection", resolve));
    await connection.aopen();
    const second = await secondSocket;
    second.send(JSON.stringify({ method: "Runtime.consoleAPICalled", params: { count: 2 } }));
    await waitFor(() => events.length === 2);
    assert.deepEqual(events, [{ count: 1 }, { count: 2 }]);
    connection.remove_handlers("Runtime.consoleAPICalled");
    second.send(JSON.stringify({ method: "Runtime.consoleAPICalled", params: { count: 3 } }));
    await new Promise<void>((resolve) => setTimeout(resolve, 10));
    assert.equal(events.length, 2);
    assert.throws(() => connection.remove_handlers(undefined, () => {}), /event_type/);
  } finally {
    await connection.aclose();
    for (const client of server.clients) client.terminate();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

async function nextMessage(socket: WebSocket): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    socket.once("message", (data) => resolve(JSON.parse(data.toString()) as Record<string, unknown>));
  });
}

async function waitFor(predicate: () => boolean): Promise<void> {
  const deadline = Date.now() + 1_000;
  while (!predicate() && Date.now() < deadline) await new Promise<void>((resolve) => setTimeout(resolve, 5));
  assert.equal(predicate(), true);
}
