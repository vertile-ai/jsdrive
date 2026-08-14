import test from "node:test";

const titles = ["ZDTEST-0001 destructured alias must not preserve an old title"];
const [alias] = [titles];
alias[0] = "different title";
test(titles[0], () => {});
