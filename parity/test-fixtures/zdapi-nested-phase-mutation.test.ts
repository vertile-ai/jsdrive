import test from "node:test";
import { browserCaseSkipReason } from "./support/persistent-harness.js";

const skip = browserCaseSkipReason(true);
for (const outer of [true]) {
  for (const inner of [true]) {
    skip.phase = outer && inner ? "headless1" : "headless0";
  }
}

test("ZDAPI-NESTED-PHASE-MUTATION", { skip }, () => {});
