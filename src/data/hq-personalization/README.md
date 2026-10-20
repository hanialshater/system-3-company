# HQ Personalization Lab: precomputed runs

owner: personalization-engineer · board: W-1572 (batch 5 H1, company/personalization/batches/2026-10-17-batch-5.md) · privacy: company/personalization/lab/2026-10-16-lab-privacy-dod.md

A released HQ build (`NODE_ENV=production`, `HQ_PUBLIC=1`) never runs the simulator. The lab at `/hq/personalization` serves only the files in this folder. Locally (`npm run dev`) the lab still runs the simulator live; set `HQ_LAB_PRECOMPUTED=1` to preview the released behaviour.

**Simulated personas only.** Every file here is output of the simulator's JSON CLI (`company/personalization/model/sim/hq-cli.mjs`) for the six personas in `company/personalization/model/personas.ts`. No learner data, no saved local traces (`meta.json` has `saved: []`).

## Regenerate

```
node tools/hq-lab-precompute.mjs           # rewrite this folder (refuses if the simulator's inputs have uncommitted changes)
node tools/hq-lab-precompute.mjs --check   # regenerate in memory; exit 1 and name the stale files if this folder is out of date
```

Regenerate after any change to `company/personalization/model/`, `content/curriculum/` or `src/demos/` that should reach a released lab, then commit this folder. Output is deterministic (same inputs, same bytes), so an unchanged model gives no diff. It takes about a minute.

## Format

| File | What |
|---|---|
| `manifest.json` | schema `personalization-hq-precomputed-v1`. `inputsCommit` / `inputsCommitDate`: the last commit touching the inputs (`+dirty` only if generated with `--allow-dirty`). Model, personas and composer versions. What is served: `personas`, `policies`, `seeds`, `days`, `compare` (`seeds`, `days`, `sets`, `scopes`), the `runs` and `compares` entry lists, what is `excluded` and why, and `files`: the sha256 of every data file. |
| `meta.json` | `hq-cli.mjs meta` (schema `personalization-hq-meta-v0`), with `saved` emptied. |
| `runs/<persona>.<policy>.seed<k>.days<d>.json.gz` | `hq-cli.mjs run` (schema `personalization-sim-trace-v0`), gzipped. One per persona × policy × seed. |
| `compare/<persona or all>.<main or all>.seeds<k>.days<d>.json` | `hq-cli.mjs compare` (schema `personalization-hq-compare-v0`), `ms` set to 0. |
| `sandbox/<persona>.<v1 or v3>.seed<k>.json.gz` | `hq-cli.mjs sandbox` (schema `personalization-hq-sandbox-v0`, unrounded), gzipped; listed in the manifest's `sandboxes`. The session lab ("EDP-faithful session composer") recomputes from these in the browser (`src/lib/hq-personalization-sandbox.ts`); nothing is saved. 6 personas × v1, v3 × seed 1. |
| `candidates/<persona>.<reachable-v2 or reachable-v3>.seed<k>.days<d>.json.gz` | `tools/hq-lab-candidates.mjs` (schema `personalization-hq-candidate-v1`), gzipped; listed in the manifest's `candidates` with the candidate's frozen sha256. |

Set today: 6 personas × the 7 ordering policies of `model.ts` POLICIES (`review-timing` is not an ordering policy) × seed 1 × 7 days; comparisons for each persona and for all, `main` and `all` policy sets, 5 seeds, 7 days. No `reachable-*` policy from the simulator's own set: the generator refuses if one appears there.

**Frozen candidates (W-1648, batch 5 §20.2).** `candidates/<persona>.<reachable-v2|reachable-v3>.seed1.days7.json.gz` (schema `personalization-hq-candidate-v1`): 6 simulated personas × the two frozen candidates, written by `tools/hq-lab-candidates.mjs`, which imports `company/personalization/policies/reachable-v2.ts` (sha256 `2666271f…6714`) and `reachable-v3.ts` (`53981ab0…c195`) unchanged, only if the bytes hash to those values before and after the import; a mismatch exits 3 and nothing is written. Every other `reachable-*` file stays out, reachable-v1 included. Each document carries the label "Not live. Website go/no-go: NO-GO (company/decisions/2026-10-17-vp-personalization-readout-3b-g.md). Simulated personas only. Lab simulator, not the eval's scored world." (batch 5 §20.2 as changed at G, §21.4) (also `candidateLabel` in the manifest), the order at the first new card next to the default order with `rank`'s reason codes (code and `versus` slug only, no numbers), the served card at each new step next to the default card, and for v3 `moves`' key, direction and named lesson. No simulated outcome or score is stored for a candidate. Served at `/hq/personalization/candidates`, from these files only, locally and in production. The episode loop is the lab simulator's (default-order parity test in `tests/hq/personalization-candidates.test.mjs`); adapter choices are listed in the adapter's header.

The Evaluation view (`/hq/personalization/evaluation`) is not in this folder: its index is `src/data/hq-personalization-eval/evaluation.json` (`node tools/hq-eval-index.mjs`; quotes and hashes checked by `tests/hq/personalization-evaluation.test.mjs`).

## How it is served

`src/lib/hq-personalization-precomputed.ts` reads only files listed in `manifest.json`, by name pattern, inside this folder, and checks each against its sha256. A missing, damaged or wrong-shaped file is an error with a plain message; it never falls back to a live run. Requests outside the stored set (another seed, days, an ablation run, a saved trace) are refused with the list of what is stored. The page shows where the data came from (inputs commit, model version, seed, days) and offers only stored choices. Tests: `tests/hq/personalization.test.mjs` (production never calls execFile/spawn; data loads; fails closed) and `tests/hq/personalization-privacy.test.mjs` (this folder is scanned, gz files decompressed).
