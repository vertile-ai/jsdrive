import test from "node:test";

let title = "ZDTEST-0001 mutable title must not be trusted";
title = "different title";
test(title, () => {});

const titles = ["ZDTEST-0002 mutated const value must not be trusted"];
titles[0] = "different title";
test(titles[0], () => {});
