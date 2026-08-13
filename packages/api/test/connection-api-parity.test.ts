import assert from "node:assert/strict";
import test from "node:test";
import { Connection as RuntimeConnection } from "@vertile-ai/jsdriver-runtime-js";
import { Connection } from "../src/index.js";

test("ZDAPI-CONNECTION-EXPORT-001", () => {
  assert.equal(Connection, RuntimeConnection);
  const connection = new Connection("ws://127.0.0.1:1");
  assert.equal(connection.websocket_url, "ws://127.0.0.1:1");
  assert.equal(connection.closed, true);
});
