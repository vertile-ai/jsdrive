import JSON from "./fake-json.js";
import test from "node:test";

const options = { skip: false };
const sideEffect = JSON.stringify(options);

test("ZDAPI-FAKE-JSON-IMPORT", options, () => sideEffect);
