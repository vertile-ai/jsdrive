import test from "node:test";

const prefix = "ZD";
const suffix = "API-SPLIT-TEMPLATE-MUTATION";
const options = { skip: false };
options.skip = true;

test(`${prefix}${suffix}`, options, () => {});
