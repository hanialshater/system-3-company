# Session criterion harness (eval-owned)

owner: personalization-eval (Uma) · built in run eval-s1-1020 (board W-2005, W-1996, W-1988)
criterion: `company/personalization/eval/2026-10-20-session-criterion.md`. Offline only, Node 22.18 or later, no dependencies.
**Reuses criteria 2, 3 and 3b by import; edits no file in `../c3/`, `../c3b/` or `..`.** In `../c2/`, W-1996 changed only the GAM version pin (harness2.mjs `gamModelVersion`, run2.mjs, tests2.test.mjs); see the criterion §10.

## Files

| File | Role |
|---|---|
| `harnessS.mjs` | glue: `runEpisodeS` (criterion 3's episode plus the session serving mode), the session fixtures, the freeze lock, the candidate pin, cells, CLI |
| `checksS.mjs` | S-ID0 (judge files = readout 3's manifest), S-ID1 (runEpisodeS = runEpisode3), S-ID2 (the session loop with the default order = the reference arm), T1, T2S, T3S, NM, T4S, GAM pin, K-e |
| `runS.mjs`, `runS-worker.mjs` | the full run in worker threads, in parts (`--cells`) and a merge (`--merge`); every reading (K1 to K5, context) |
| `testsS.test.mjs` | tests (hold before and after the freeze; about 11 s) |

The policies are imported read-only: `model/model.ts`, `model/sim/composer-session.ts` (through `model/sim/simulate.mjs` `composeSessionFor`, the builder's own glue, which the simulator and the HQ sandbox also call), `model/sim/composer.ts`, `model/sim/catalog.mjs`. Their sha256 and the built catalogue's sha256 are the candidate pin (criterion §6); `runS.mjs` refuses if the tree differs from the pin frozen in the criterion.

## How to run (from the repository root, `NODE_NO_WARNINGS=1`)

```sh
node --test company/personalization/eval/harness/cs/testsS.test.mjs
node company/personalization/eval/harness/cs/harnessS.mjs seeds --pilot=500 --out=company/personalization/eval/harness/records/2026-10-20-seeds-session-s1.json   # reference arm only
node company/personalization/eval/harness/cs/harnessS.mjs pin            # the candidate pin of this tree
node company/personalization/eval/harness/cs/harnessS.mjs cells
node company/personalization/eval/harness/cs/harnessS.mjs episode --persona=wanderer --seed=70001 [--cell=interleave:base] [--arm=default-order+fixed]   # hash only
node company/personalization/eval/harness/cs/runS.mjs --seeds=3 --plumbing --jobs=4 --out=<tmp>   # session arms = fixture-session-default, others = reference; readings meaningless
# after `status: frozen`, at the freeze commit (criterion §8: three parts, then the merge):
NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=<part list> --out=<dir>
node company/personalization/eval/harness/cs/runS.mjs --merge=<dirA>,<dirB>,<dirC> --out=<dir>
```

## Reproduction (learner-model-engineer; determinism only)

1. Fresh worktree at the manifest's `commit`. Check `sha256sum` of the criterion against the freeze record (criterion §11), every `fileSha256` entry, and `candidatePin` (`harnessS.mjs pin` must print the same).
2. Run the same three parts with the same `--cells` lists and `--seeds=2000`, any `--jobs`, then the merge.
3. Compare each part's `results.ndjson` and the merged `verdicts.json` byte for byte. `manifest.json` may differ only in `seconds` (and paths).
4. Spot check: `harnessS.mjs episode` prints a hash that must match across processes and worktrees.

Every random draw is a hash of a string key (learner2's scheme). The session composer draws nothing. No clock, `Math.random` or environment is read by the judge or any arm under test (T1, T2S).
