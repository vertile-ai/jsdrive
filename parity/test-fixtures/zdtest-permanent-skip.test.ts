import test from "node:test";

test("ZDTEST-0001 permanently skipped evidence", { skip: "permanent" }, () => {
  throw new Error("permanently skipped evidence must not be registered");
});
