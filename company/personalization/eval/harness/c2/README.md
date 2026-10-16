# Criterion 2 harness (eval-owned)

owner: personalization-eval (Uma) · built in run eval-k1-1016 (lane 14 batch 3 K1, board W-1545)
criterion: `company/personalization/eval/2026-10-16-criterion-2.md`. Builders read its §I only.
Offline only. Node 22.18 or later, no dependencies. Phase A's harness (`..`) is not edited; readout 1 is reproduced there, at 5725b10a.

## Files

| File | Role | Judge module (imports nothing, T5) |
|---|---|---|
| `world2.mjs` | The E1 block (**placeholder until K2**), unsourced constants, the episode, thresholds, cells, persona mapping | yes |
| `learner2.mjs` | The criterion 2 learner (phase A's plus L1 to L6, criterion §1.2), the final-test read, and the oracle view | yes |
| `scorer2.mjs` | Episode score, R_H = K(T_H)/N_ref, intervals, the §2 rule, headroom reading | yes |
| `harness2.mjs` | Glue: arms (order + review), the fixed schedule, the review input and its checks, the oracles, the freeze lock, CLI | no |
| `checks2.mjs` | T1 to T4, R1 to R4, T5 to T9 | no |
| `run2.mjs`, `run2-worker.mjs` | The full run (K2), in worker threads | no |
| `tests2.test.mjs` | Tests runnable before the freeze | no |
| `gam-v0.2.2.sha256` | Fingerprint of model-v0.2.2's COMPOSER and curves (pre-commitment 1) | |
| `phase-a-identity.mjs` | Phase A episode hashes at two trees (criterion §9) | no |

## How to run (from the repository root, `NODE_NO_WARNINGS=1`)

```sh
node --test company/personalization/eval/harness/c2/tests2.test.mjs           # about 3 s
node company/personalization/eval/harness/c2/harness2.mjs seeds --pilot=500 --out=company/personalization/eval/harness/records/2026-10-16-seeds-c2-k1.json
node company/personalization/eval/harness/c2/harness2.mjs episode --persona=wanderer --seed=1001 [--cell=base] [--arm=default-order+fixed] [--candidate=<path>]
node company/personalization/eval/harness/c2/run2.mjs --seeds=3 --plumbing --jobs=2 --out=/tmp/c2-plumbing   # fixtures only, verdicts meaningless
# K2 only, after `status: frozen`:
node company/personalization/eval/harness/c2/run2.mjs --seeds=<S> --candidate=<P2 file> --jobs=4 [--inputs=<e1.json>] [--kinds=base,one-at-a-time|corner] --out=<dir>
```

## Reproduction (for R2, learner-model-engineer; determinism only)

1. Fresh worktree at the manifest's `commit`. Check `sha256sum` of the criterion file against `criterionSha256`, each `fileSha256` entry, and `candidate.sha256` of the candidate file.
2. If `manifest.inputs` differs from `world2.mjs` `E1`, write it to a JSON file and pass `--inputs=`.
3. Run `run2.mjs` with the manifest's `S`, the same `--candidate` path, the same `--kinds` for each part, any `--jobs`, in a separate process.
4. Compare `results.json` and `verdicts.json` byte for byte. `manifest.json` may differ only in `seconds` (and `commit`/paths if the worktree differs). The oracle θ choice is part of the run and must match `oracleReviewTheta`.
5. Spot check: `harness2.mjs episode` prints a hash that must match across processes and worktrees.

Every random draw is a hash of a string key. No clock, `Math.random` or environment is read by the judge or the reference arms.
