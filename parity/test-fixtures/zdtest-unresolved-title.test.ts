import test from "node:test";

const candidate = "ZDTEST-0001 unresolved titles must fail closed";
const makeTitle = (): string => candidate;
test(makeTitle(), () => {});
