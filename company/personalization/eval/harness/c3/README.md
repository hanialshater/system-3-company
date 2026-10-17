# Criterion 3 harness (eval-owned)

owner: personalization-eval (Uma) · built in run eval-k3-1017 (lane 14 batch 4 K3, board W-1565)
criterion: `company/personalization/eval/2026-10-17-criterion-3.md` (draft until K4 freezes it). Offline only, Node 22.18 or later, no dependencies.
**Reuses the criterion 2 harness by import; edits no file in `../c2/` or `..`** (test C3-ID2 pins readout 2's file hashes).

## Files

| File | Role | Imports |
|---|---|---|
| `world3.mjs` | E3 block (filled in K4 from E3, F3 B1-B3 applied), placements, Feed.tsx constants, `cells3`, the c2-equivalent world, N7 rows | nothing (judge) |
| `learner3.mjs` | copy of `../c2/learner2.mjs` plus L11 (N7); identical at criterion 2's values | nothing (judge) |
| `reachable-oracle.mjs` | the reachable-signal oracle: sees only the §I.3 object; population constants passed in | nothing |
| `harness3.mjs` | glue: `runEpisode3` (placements, slot cost, O1 oracles, reachable arm), `feedDue`, the freeze lock, CLI | c2 harness, world2, learner2, scorer2, phase A glue |
| `checks3.mjs` | C3-ID1/ID2, T5c, RS1–RS6, T1 replay | |
| `run3.mjs`, `run3-worker.mjs` | the full run (K4), worker threads; `--plumbing` self-check | |
| `tests3.test.mjs` | tests (hold before and after the freeze) | |
| `readout3-tables.mjs` | the readout formatter (K4, written before the freeze; computes no verdict) | |

## How to run (from the repository root, `NODE_NO_WARNINGS=1`)

```sh
node --test company/personalization/eval/harness/c3/tests3.test.mjs        # about 25 s (C3-ID1 runs 576 episode pairs)
node --test company/personalization/eval/harness/c2/tests2.test.mjs        # criterion 2's, unchanged
node company/personalization/eval/harness/c3/harness3.mjs seeds --pilot=500 --out=company/personalization/eval/harness/records/2026-10-17-seeds-c3-k4.json   # K4 record (K3's -k3 record superseded)
node company/personalization/eval/harness/c3/harness3.mjs cells
node company/personalization/eval/harness/c3/harness3.mjs episode --persona=wanderer --seed=1001 [--cell=interleave:base]   # hash only
node company/personalization/eval/harness/c3/run3.mjs --seeds=3 --plumbing --jobs=4 --out=/tmp/c3-plumbing   # every arm = reference; readings meaningless
# K4 only, after `status: frozen`:
NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/c3/run3.mjs --seeds=<S> --jobs=4 [--e3=<e3.json>] [--placements=interleave,first] --out=<dir>
node company/personalization/eval/harness/c3/readout3-tables.mjs --parts=<dir1>,<dir2>   # markdown tables, unedited into the readout
```

## Reproduction (R3, learner-model-engineer; determinism only)

1. Fresh worktree at the manifest's `commit`; `npm ci`. Check `sha256sum` of the criterion file against `criterionSha256` and every `fileSha256` entry (paths relative to this directory).
2. If `manifest.e3` differs from `world3.mjs` `E3`, write it to a JSON file and pass `--e3=`.
3. Run `run3.mjs` with the manifest's `S` and the same `--placements` for each part, any `--jobs`, in a separate process.
4. Compare `results.ndjson` and `verdicts.json` byte for byte. `manifest.json` may differ only in `seconds` (and `commit`/paths if the worktree differs). θ (`oracleReviewTheta`) is chosen inside the run and must match.
5. Spot check: `harness3.mjs episode` prints a hash that must match across processes and worktrees.

Every random draw is a hash of a string key (learner2's scheme, unchanged). No clock, `Math.random` or environment is read by the judge or any reference arm.
