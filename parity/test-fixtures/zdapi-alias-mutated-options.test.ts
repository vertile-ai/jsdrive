import test from "node:test";

const options = { skip: false };
const alias = options;
alias.skip = true;

test("ZDAPI-ALIAS-MUTATED-OPTIONS", options, () => {});
