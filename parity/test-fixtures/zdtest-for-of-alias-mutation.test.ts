import test from "node:test";

const titles = ["ZDTEST-0001 for-of alias must not preserve an old title"];
for (const alias of [titles]) {
  alias[0] = "different title";
  test(titles[0], () => {});
}
