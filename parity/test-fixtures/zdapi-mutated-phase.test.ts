import test from "node:test";
import { browserCaseSkipReason } from "./support/persistent-harness.js";

const skip = browserCaseSkipReason(true);
skip.phase = "headless1";

test("ZDAPI-MUTATED-PHASE", { skip }, () => {});
