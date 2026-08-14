import test from "node:test";

function duplicate(): void {
  test("ZDAPI-HIDDEN-DUPLICATE", () => {});
}

test("ZDAPI-HIDDEN-DUPLICATE", () => {});
duplicate();
