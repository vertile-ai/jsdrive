import test from "node:test";

while (false) {
  // Unsupported registration-scope control flow must fail closed.
}

test("ZDAPI-UNSUPPORTED-STATEMENT", () => {});
