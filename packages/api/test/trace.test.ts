import assert from "node:assert/strict";
import test from "node:test";
import { compareTraces, normalizeTrace } from "../src/index.js";

test("trace normalization removes volatile ids, timestamps, and session values", () => {
  const one = normalizeTrace([
    { direction: "send", timestamp: 1, message: { id: 7, method: "Runtime.evaluate", sessionId: "random-a", params: { targetId: "a" } } },
    { direction: "receive", timestamp: 2, message: { id: 7, result: { value: 42 } } },
  ]);
  const two = normalizeTrace([
    { direction: "send", timestamp: 99, message: { id: 81, method: "Runtime.evaluate", sessionId: "random-b", params: { targetId: "b" } } },
    { direction: "receive", timestamp: 100, message: { id: 81, result: { value: 42 } } },
  ]);
  assert.deepEqual(one, two);
  assert.deepEqual(compareTraces(one, two), []);
});
