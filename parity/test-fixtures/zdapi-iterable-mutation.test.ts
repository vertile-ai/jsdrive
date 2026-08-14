import test from "node:test";

function mutate(options: { skip: boolean }): number {
  options.skip = true;
  return 1;
}

const options = { skip: false };
for (const value of [mutate(options)]) {
  test("ZDAPI-ITERABLE-MUTATION", options, () => value);
}
