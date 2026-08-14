# Zendriver v0.15.5 Parity Gap Report

This is an inventory baseline, not a parity completion claim.

## Fixed baseline

- Tag: `v0.15.5`
- Commit: `f0bd943853a35b9394289ba80027ca26c8bd4d16`
- Installed reference: `0.15.5`
- Pytest collection: `101 tests collected`

## Current gaps

- Upstream parametrized cases: 101
- Unmapped Node parity cases: 0
- Not-run Node parity cases: 0
- Cases requiring a live network host: 41
- API mapping statuses: {"coreMembers": {"VERIFIED": 472}, "coreSymbols": {"VERIFIED": 45}, "rootExports": {"VERIFIED": 16}, "total": {"VERIFIED": 533}}
- API mappings with execution-gated evidence for explicitly listed dimensions: 533/533
- Listed semantic dimension counts: {"defaults": 21, "errors": 22, "return": 524, "signature": 35, "state": 493}
- API evidence source files present in root/parity execution gates: 15/15
- Phase-bound ZDTEST evidence IDs: {"<none>": 2, "headless0": 39, "headless1": 39}

## Reference environment observations

- Environment: `Chromium 145.0.7632.159`; platform `darwin-arm64`
- Exact headless core reference: 41 passed, 1 failed in 265.01 seconds; process exit code 1.
- The only failure was `test_visible_events[headless0]`: upstream expected 4 children after keyboard operations and observed 2 on Chromium 145.
- This upstream environment failure remains a parity case; it is not counted as a nodriver pass or used to weaken the inventory.
- Exact command and structured provenance are recorded in `reference-observations.json`.

## Test categories

- `bot_detection`: 2
- `core`: 81
- `docs`: 18

## Interpretation

`VERIFIED` on an API mapping claims only the exact dimensions in that mapping's `semanticsCoverage`; it is not a claim of complete semantic equivalence. `CANDIDATE` means only that a runtime export or public TypeScript declaration has an equivalent name. `UNKNOWN`, `MISSING`, `UNMAPPED`, and `NOT_RUN` remain blocking gaps for PAR-001/PAR-002.
