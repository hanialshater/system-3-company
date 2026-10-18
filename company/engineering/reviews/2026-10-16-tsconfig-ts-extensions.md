# Tier review: `allowImportingTsExtensions` in tsconfig.json

date: 2026-10-16 · reviewer: principal-engineer (run pe-tsext-1016) · tier: 2 (`tsconfig.json`, company/engineering/readiness/paths.json "build config")

## Problem

After the merge of the personalization review-timing candidate (W-1726, frozen at a0bd249, sha256 recorded for the eval's criterion 2), `npm run typecheck` failed with TS5097 at
`company/personalization/model/sim/review-timing.ts:24` (`import { REVIEW_TIMING_CURVES, ... } from "../review-timing-curves.ts"`).
The `.ts` extension is required: the model/sim code runs under Node type stripping (no bundler) and imports a runtime value.

## Options

- (a) `"allowImportingTsExtensions": true` in compilerOptions. Legal because `noEmit: true`. Candidate file and its hash unchanged.
- (b) Candidate changes its import (e.g. curves passed as a parameter). Costs a re-freeze and a new hash for an eval in flight.
- (c) Exclude `company/**` from the root tsconfig. Loses type-checking of the learner model. Rejected.

## Ruling: (a), approved

One line, reversible, makes no change to emit (there is none) or to resolution of existing imports. It also matches how the
model code actually runs (Node type stripping needs real extensions), so the next runtime-value import in `company/**`
will not hit the same wall. (b) spends an eval freeze to work around a compiler flag.

## Results (after the change)

- `npm run typecheck`: exit 0, no errors (~34 s).
- `npm run build`: exit 0 (~54 s); Next did not rewrite tsconfig.json.
- `npm run check`: exit 0.
- Frozen candidate `company/personalization/model/sim/review-timing.ts` not touched.

## src/ reliance on `.ts`-extension imports

Searched `src/` and `tests/` for `from "...\.ts(x)"`: none. The only such import in the repo is the candidate line above.
**No lint/test guard needed.** If a `src/` file did use one, webpack/Turbopack under `moduleResolution: bundler` resolves
it the same as an extensionless import, so it would be a style inconsistency, not a breakage; a guard would be ceremony.
Revisit only if the flag is ever removed (then typecheck itself is the guard: TS5097 comes back at every such site).

## Objections

None raised.
