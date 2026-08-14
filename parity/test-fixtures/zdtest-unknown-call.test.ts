import test from "node:test";

function unknownSideEffect(): void {}

const titles = ["ZDTEST-0001 unknown calls must invalidate the registration scope"];
unknownSideEffect();
test(titles[0], () => {});
