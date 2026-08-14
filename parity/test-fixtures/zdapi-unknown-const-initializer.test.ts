import test from "node:test";

function mutate(options: { skip: boolean }): number {
  options.skip = true;
  return 1;
}

const options = { skip: false };
const unused = mutate(options);

test("ZDAPI-UNKNOWN-CONST-INITIALIZER", options, () => {});
