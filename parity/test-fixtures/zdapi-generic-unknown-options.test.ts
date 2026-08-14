import test from "node:test";

declare function makeOptions(): object;

const options = makeOptions();

test("ZDAPI-GENERIC-UNKNOWN-OPTIONS", options, () => {});
