import test from "node:test";
import { browserCaseSkipReason } from "./support/persistent-harness.js";

const prefix = "ZD";
const suffix = "API-SPLIT-TEMPLATE-PHASE";
const skip = browserCaseSkipReason(true);
skip.phase = "headless1";

test(`${prefix}${suffix}`, { skip }, () => {});
