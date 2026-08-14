import type test from "node:test";
import { type test as namedTest } from "node:test";

test("ZDTEST-0001 type-only default import is not a runtime registration", () => {});
namedTest("ZDTEST-0002 type-only named import is not a runtime registration", () => {});
