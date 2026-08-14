import test from "node:test";

const candidate = "ZDTEST-0001 hooks with extra arguments must fail closed";
test.before(() => {}, candidate);
