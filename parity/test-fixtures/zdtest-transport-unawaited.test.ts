import test from "node:test";
import { runTransportMatrix } from "./support/transport-matrix.js";

test("ZDTEST-0001 unawaited transport matrix", async () => {
  runTransportMatrix(
    "ZDTEST-0001",
    { executable: "chrome", headless: true },
    async () => {},
  );
});
