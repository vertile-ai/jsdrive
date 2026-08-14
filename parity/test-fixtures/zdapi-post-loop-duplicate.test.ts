import test from "node:test";

function duplicate(): void {
  test("ZDAPI-POST-LOOP-DUPLICATE", () => {});
}

test("ZDAPI-POST-LOOP-DUPLICATE", () => {});
for (const _ of [0]) {
  duplicate();
}
