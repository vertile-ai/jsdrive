import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

test("vendored schemas and generated metadata match the official pin", async () => {
  const provenance = JSON.parse(
    await readFile(resolve(repositoryRoot, "packages/protocol-schema/PROVENANCE.json"), "utf8"),
  ) as { readonly files: Readonly<Record<string, string>> };
  for (const file of ["browser_protocol.json", "js_protocol.json"] as const) {
    const bytes = await readFile(resolve(repositoryRoot, "packages/protocol-schema", file));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), provenance.files[file]);
  }
  const generated = await readFile(
    resolve(repositoryRoot, "packages/protocol/src/generated/protocol.ts"),
    "utf8",
  );
  assert.match(generated, /domainCount: 58,/);
  assert.match(generated, /typeCount: 607,/);
  assert.match(generated, /commandCount: 663,/);
  assert.match(generated, /eventCount: 233,/);

  const schemaFiles = await Promise.all([
    readFile(resolve(repositoryRoot, "packages/protocol-schema/browser_protocol.json"), "utf8"),
    readFile(resolve(repositoryRoot, "packages/protocol-schema/js_protocol.json"), "utf8"),
  ]);
  const enumNodeCount = schemaFiles.reduce((count, json) => count + countEnumNodes(JSON.parse(json)), 0);
  const generatedRust = await readFile(resolve(repositoryRoot, "crates/protocol/src/generated.rs"), "utf8");
  assert.equal(enumNodeCount, 239);
  assert.equal(generatedRust.match(/^\s*\/\/ Protocol enum$/gm)?.length, enumNodeCount);
});

function countEnumNodes(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((count, item) => count + countEnumNodes(item), 0);
  }
  if (typeof value !== "object" || value === null) {
    return 0;
  }
  const record = value as Readonly<Record<string, unknown>>;
  return (Array.isArray(record.enum) ? 1 : 0)
    + Object.values(record).reduce<number>((count, item) => count + countEnumNodes(item), 0);
}
