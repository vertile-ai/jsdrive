import test from "node:test";

const titles = ["ZDTEST-0001 hook factory may mutate registration data"];
const makeHook = (_values: string[]): (() => void) => () => {};
test.before(makeHook(titles));
