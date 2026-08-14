import test from "node:test";

test("ZDAPI-PERMANENT-SKIP-001", { skip: true }, () => {
  throw new Error("permanently skipped evidence must not be registered");
});
