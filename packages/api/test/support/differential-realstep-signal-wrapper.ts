import { runDifferential } from "../../differential/run.js";

await runDifferential({
  lockPath: requiredEnvironment("NODRIVER_DIFFERENTIAL_REALSTEP_LOCK"),
});

function requiredEnvironment(name: string): string {
  const value = process.env[name];
  if (value === undefined) throw new Error(`${name} is required`);
  return value;
}
