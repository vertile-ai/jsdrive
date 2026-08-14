import test from "node:test";

const titles = ["ZDTEST-0001 aliased mutable title must not be trusted"];
const alias = titles;
alias[0] = "different title";
test(titles[0], () => {});
