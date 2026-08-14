import test from "node:test";

const titles = ["ZDTEST-0001 destructuring assignment must not preserve an old title"];
[titles[0]] = ["different title"];
test(titles[0], () => {});
