import assert from "node:assert/strict";
import test from "node:test";
import type { CdpConnection } from "@nodriver/runtime-js";
import { Tab, TargetClosedError, TargetCrashedError } from "../src/browser.js";

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
