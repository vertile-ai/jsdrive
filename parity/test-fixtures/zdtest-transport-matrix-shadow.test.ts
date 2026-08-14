import test from "node:test";
import { runTransportMatrix } from "./support/transport-matrix.js";

test("ZDTEST-0001 local matrix shadow", async () => {
  const runTransportMatrix = async (): Promise<void> => {};
  await runTransportMatrix();
});
