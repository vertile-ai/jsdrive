import test from "node:test";
import { transportNotApplicable } from "./support/transport-matrix.js";

test("ZDTEST-0003 wrong transport case ID", () => {
  transportNotApplicable(
    "ZDTEST-0020",
    {
      code: "controlled-backend-failure",
      detail: "The assertion injects one intentionally failing backend, so substituting transport quadrants would change the behavior under test.",
    },
  );
});
