import test from "node:test";

function mutate(options: { skip: boolean }): void {
  options.skip = true;
}

const options = { skip: false };
void mutate(options);

test("ZDAPI-WRAPPED-CALL", options, () => {});
