import test from "node:test";

const options = { skip: false };
if (true) {
  options.skip = true;
}

test("ZDAPI-IF-MUTATION", options, () => {});
