# Zendriver parity inventory

This directory records the fixed Zendriver v0.15.5 API and pytest baselines required by PAR-001 and PAR-002. It is an inventory and gap-reporting surface, not a parity completion claim.

Run the dependency-free generator and validator from the repository root:

```sh
npm run parity:inventory
```

The command adds no package or production dependency. It uses the Python standard library and the repository's already-pinned TypeScript compiler API to parse `.d.ts` files structurally. It reads the ignored fixed checkout at `.tmp/zendriver-upstream`, public runtime metadata from `.tmp/zendriver-ref`, and the built public surface in `packages/api/dist`. It does not inspect or translate Zendriver implementation source.

Validate the checked-in/generated artifacts without regenerating them:

```sh
python3 parity/generate.py --validate-only
```

Generated artifacts:

- `baseline.json`: fixed tag, commit, installed version, and stable pytest node IDs with an elapsed-time-free summary.
- `test-inventory.json`: one stable record per collected parametrized pytest case, including category, dependencies, mapping, and execution state.
- `api-inventory.json`: public Zendriver root/core runtime signatures, defaults, inherited members, behavior-bearing dunders, current Node runtime/declaration surface, and conservative structural mappings.
- `validation.json`: fixed upstream fingerprints, schema/count checks, mutation probes, and blocking gap counts.
- `gap-report.md`: human-readable first gap report.
- `reference-observations.json`: exact coordinator-run reference evidence, kept separate from pytest collection evidence and fingerprinted against accidental edits.

Mapping status definitions:

- `CANDIDATE`: a TypeScript AST declaration has a compatible symbol/member kind and, for methods, compatible required arity; behavior and exceptions remain unverified.
- `UNKNOWN`: no class-local mechanical comparison was possible; an equivalent may exist elsewhere.
- `MISSING`: the inspected Node public surface has no equivalent symbol/member name.
- `UNMAPPED`: no independently expressed one-to-one Node parity test is recorded.

Only executable per-item behavior checks may promote a structural candidate to verified parity.
