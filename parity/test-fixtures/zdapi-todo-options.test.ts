import test from "node:test";
import { browserCaseSkipReason } from "./support/persistent-harness.js";

declare function unresolvedTodo(): boolean;

test("ZDAPI-TODO-TRUE", { todo: true }, () => {});
test("ZDAPI-TODO-STRING", { todo: "not gating" }, () => {});
test("ZDAPI-PHASE-TODO-TRUE", { skip: browserCaseSkipReason(true), todo: true }, () => {});
test("ZDAPI-TODO-UNKNOWN", { todo: unresolvedTodo() }, () => {});
test("ZDAPI-TODO-FALSE", { todo: false }, () => {});
