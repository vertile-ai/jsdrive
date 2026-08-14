import test from "node:test";

for (const value of [process.exit(0)]) {
  test("ZDAPI-ITERABLE-EXIT", () => value);
}
