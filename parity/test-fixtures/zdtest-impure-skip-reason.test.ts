import test from "node:test";
import { browserCaseSkipReason } from "./support/persistent-harness.js";

const titles = ["ZDTEST-0001 impure skip helper arguments must fail closed"];
const mutate = (values: string[]): boolean => {
  values[0] = "different title";
  return true;
};
const skip = browserCaseSkipReason(mutate(titles));
test(titles[0], { skip }, () => {});
