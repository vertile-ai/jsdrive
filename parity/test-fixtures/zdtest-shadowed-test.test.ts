import test from "node:test";

{
  function test(_title: string, _callback: () => void): void {}
  test("ZDTEST-0001 block function shadows the runtime import", () => {});
}
