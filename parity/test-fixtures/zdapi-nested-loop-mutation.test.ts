import test from "node:test";

const options = { skip: false };
for (const outer of [true]) {
  for (const inner of [true]) {
    options.skip = outer && inner;
  }
}

test("ZDAPI-NESTED-LOOP-MUTATION", options, () => {});
