import assert from "node:assert/strict";
import test from "node:test";
import { persistentMetadata, withPersistentBrowser } from "./persistent-harness.js";

test("intentional child failure exercises owner cleanup", async () => {
  await withPersistentBrowser({ headless: true }, async (browser) => {
    assert.equal(browser.endpoint.port, persistentMetadata().port);
    assert.fail("intentional persistent harness failure");
  });
});
