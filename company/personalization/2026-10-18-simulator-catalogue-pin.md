# Decision: the simulator reads a pinned lesson catalogue (2026-10-18)

owner: learner-model-engineer (Ifeoma) · status: in effect on merge-default · board ids below keep their old numbers (company/ops/2026-10-18-board-renumber.md)

## Problem

`sim/catalog.mjs` built the simulator's pilot catalogue from the live tree (`src/demos/{probability,cs}/*/meta.json`, `content/curriculum/{probability,cs}.json`). The merge of the default branch (d212efa2) changed 203 of those files (the Algorithms 200 lessons and curriculum edits; 230 → 231 visible pilot lessons). With nothing in the model or policies changed:

- `npm run check` failed in test:personalization at "every existing policy gives byte-identical compose output and episode traces to 4e13ef1": the default order moved, so the golden hashes in `sim/policy-golden.json` no longer matched.
- `node tools/hq-lab-precompute.mjs --check` reported the HQ lab data STALE (68 files), failing tests/hq 41 and 55.

A lesson landing is not a change to a policy. The golden test exists to catch policy changes, and the lab data should change when the simulator changes, not every time a category manager publishes.

## Decision

The simulator reads a committed snapshot of its catalogue inputs, `company/personalization/model/sim/catalog-pin/`, laid out like the repo root, through the **unchanged** `loadCatalog(root)` of `sim/catalog.mjs` (that file, `model.ts` and `composer.ts` are hashed in every readout manifest and were not touched).

- Pinned at **b210adeb** (the work line's head before the merge). The pilot inputs there last changed at 4d800b8c, and are identical at 4e13ef1 (golden), b89f259 (readout 2), b1ae294 (readout 3) and e210144 (current HQ lab data): `catalog-pin.mjs --diff=<commit>` reports 0 files differ for each.
- The snapshot's catalogue hash (the c3b harness's `catalogSha` formula) is **27b535da…dc7872**, equal to readout 3b's `catalogSha256` and `CATALOG_SHA256_C3`.
- Snapshot content: the two curriculum files verbatim; each pilot `meta.json` trimmed to the fields `loadCatalog` and the lab read (`title`, `status`, `concept`, `curriculum.{primary, prerequisites, level}`). No claims, no new field, no new input (privacy: no new input; the lab's data inputs are still personas.ts and the lesson catalogue).
- `PIN.json` names the commit, the reason and the hash. `loadPinnedCatalog()` refuses a snapshot that no longer hashes to it, and `self-check.mjs` (in `npm run check`) calls it, so a hand edit of the snapshot fails check.

Readers switched to the pin: `sim/hq-cli.mjs`, `sim/run.mjs`, `sim/policy-golden.mjs`, `sim/review-timing.test.mjs`, `sim/privacy-n1-n3.test.mjs`, and `tools/hq-lab-candidates.mjs` (dims and titles, only when run on this repository's root). hq-cli.mjs and hq-lab-candidates.mjs call `loadCatalog(<pin dir>)` directly rather than importing `catalog-pin.mjs`, so the lab privacy test's import allowlist (tests/hq/personalization-privacy.test.mjs) is unchanged.

Result on merge-default: `policy-golden.json` and the HQ lab data under `src/data/hq-personalization/` are current **without regeneration**.

## What still reads the live tree, on purpose

- The frozen eval harness (`eval/harness/harness.mjs` calls `loadCatalog()` with the default root). It is hashed and was not touched. A frozen readout is reproduced by checking out its own commit (as R2 and R3 did), where the live tree is the catalogue it was scored on. On merge-default the harness would see the new catalogue and 3b-ID0's catalogue check would say so: that is the check doing its job, not a regression.
- `tests/personalization/dims-index.test.mjs` 5b and `company/personalization/dims/build-index.mjs` (lesson-dims-owner): the client dims index follows the live catalogue. Not regenerated here.
- The real feed (src/lib/feed-index.ts) is untouched. The pin is offline only.

## Moving the pin

Moving the pin is a deliberate, recorded change, never a way to make a test pass:

1. `node company/personalization/model/sim/catalog-pin.mjs --diff=<commit>` to see what changes (files, lesson count, default order).
2. `node company/personalization/model/sim/catalog-pin.mjs --move=<commit> --reason="…"` rewrites the snapshot and `PIN.json`.
3. In the same commit: `node company/personalization/model/sim/policy-golden.mjs --write` if the hashes moved (edit its hard-coded `recordedAt` to name the new pin; it says 4e13ef1 today), and `node tools/hq-lab-precompute.mjs` (personalization-engineer owns that tool).
4. Add a line to the log below. A candidate already scored on the old pin keeps its readout; a new readout names the pin it ran on.

`catalog-pin.mjs --check` compares the snapshot with git at the pinned commit. It needs that commit in the clone, so it is a manual check, not part of `npm run check` (CI clones are shallow).

## Log

| date | pin | why |
|---|---|---|
| 2026-10-18 | b210adeb (inputs last changed 4d800b8c), 230 lessons, 27b535da… | merge d212efa2 changed the live catalogue; frozen studies and the lab data were on this one |

## Open

- `tools/hq-lab-precompute.mjs` still lists `src/demos` and `content/curriculum` in its INPUTS (dirty check and the manifest's `inputsCommit`). Its `--check` compares data files only, so it reports current; the INPUTS list should name `company/personalization/model/sim/catalog-pin` instead. Owner: personalization-engineer (W-1847).
- The lab's L2 re-read rule covers hq-cli.mjs and hq-lab-candidates.mjs changes (comment + catalogue root only). Owner: hq-engineer (W-1848).
