# Phase A evaluation harness (eval-owned learner, scorer, tests)

owner: personalization-eval (Uma) · built in run eval-c1-1016 (lane 14 batch 2 C1; board W-1513, W-1516 (a)(b)(c), W-1496)
criterion: `company/personalization/eval/2026-10-16-phase-a-criterion.md` (frozen in C4, run eval-c4-1016; C4 changes in its §10)
decision: `company/personalization/eval/2026-10-16-learner-scorer-decision.md`
Offline only. Node 22.18 or later (type stripping), no dependencies, nothing in `src/` imports this folder.

## Files

| File | Role | Judge module (imports nothing, T5) |
|---|---|---|
| `learner.mjs` | Simulated learner (SimLearner interface + `recallProb`), hidden per-lesson pull, simulated msr-v1 ratings at fidelity ρ, keyed random numbers | yes |
| `scorer.mjs` | Episode score (R expected-value primary, G1 to G4, engagement and descriptive fields), paired intervals, S rule, the criterion §2 rule | yes |
| `world-inputs.mjs` | Every number the world uses: the B2 block (named input), unsourced constants, the episode definition, the criterion thresholds, the sweep cells, the persona derivation rules | yes |
| `personas.copy.mjs` | Verbatim copy of the six personas' `fingerprintMeans` and `latent` (personas-v0.1, commit 92b9a6d). Never edited | yes |
| `harness.mjs` | Glue: catalog, the composer's pool, the visible pre-history, one episode, the freeze lock, CLI (`seeds`, `episode`, `world`) | no (imports the policies) |
| `checks.mjs` | T1 to T7 as functions | no |
| `run.mjs`, `run-worker.mjs` | The full criterion run (C4), in worker threads | no |
| `tests.test.mjs` | The tests runnable before the freeze (T5 to T7 on the judge; T1 to T4 on default-order and fixtures only) | no |
| `records/` | Committed records: the S computation (`2026-10-16-seeds-c1.json`, rechecked in C4: `2026-10-16-seeds-c4.json`) and the C4 run outputs (`2026-10-16-readout-1/`) | |

The policies are imported read-only from `company/personalization/model/` (`model.ts` POLICIES and COMPOSER, `sim/composer.ts`, `sim/catalog.mjs`). Nothing in `model/` or `sim/` is edited. The provisional `sim/learner.ts`, `sim/score.ts` and `sim/simulate.mjs` are not imported: the parts used (the episode loop, the pre-history generator, epsilon-greedy's exploration) are copies in `harness.mjs`, so a later edit there cannot change the judge's world unseen.

## The freeze lock

While the criterion's `status:` line is not `frozen`, `harness.mjs` and `run.mjs` score only `default-order` and `fixture-*` policies and refuse every other policy before any episode runs. The test file checks this.

## How to run

All commands from the repository root, with `NODE_NO_WARNINGS=1` to silence Node's type-stripping notice.

```sh
# tests (about 15 s): T5-T7 must pass; T1-T4 run on default-order and on fixtures that must fail
NODE_NO_WARNINGS=1 node --test company/personalization/eval/harness/tests.test.mjs

# S from the default-order arm only, at the base cell (prints SDs only, no mean, no other policy)
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/harness.mjs seeds --pilot=500 --out=company/personalization/eval/harness/records/2026-10-16-seeds-c1.json

# one episode's hash (T1 uses this in two processes)
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/harness.mjs episode --persona=wanderer --seed=1001 --cell=base --policy=default-order

# the judge's hidden world for one seed: pull distribution and rating levels at rho
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/harness.mjs world --seed=1001 --rho=0.5

# runner self-check before the freeze: every policy served by a fixture (verdicts meaningless by construction)
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/run.mjs --seeds=3 --plumbing --out=/tmp/eval-plumbing

# C4 only, after `status: frozen`: the full run (S = 200). --kinds=base,one-at-a-time runs only the pass-relevant cells
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/run.mjs --seeds=200 --jobs=4 [--kinds=<kinds>] [--inputs=<B2 block as JSON>] --out=<dir>
```

`--inputs=<file.json>` replaces the B2 block of `world-inputs.mjs` (same keys). C4 uses it, or edits the block, to put in the C0-corrected values; the manifest records the hash of the block used.

## Reproduction (for learner-model-engineer, C5)

Determinism only, not judgement (independence rule §2.5).

1. Fresh worktree at the commit named in the readout's manifest (`manifest.json` `commit`). `npm ci` is not needed for the harness (no dependencies), but harmless.
2. Check that `sha256sum company/personalization/eval/2026-10-16-phase-a-criterion.md` equals the manifest's `criterionSha256`, and that each file in `fileSha256` matches.
3. If the manifest's `inputs` differ from `world-inputs.mjs` B2, write `manifest.inputs` to a JSON file and pass it with `--inputs=`.
4. Run `run.mjs` with the manifest's `S` (seeds `1001..1000+S`) and any `--jobs` value, in a separate process, to a new `--out` directory. If the manifest has `kinds` other than "all" (readout 1 ran `base,one-at-a-time` and `corner,novelty,rho` as two runs), pass the same `--kinds=` for each. `readout-tables.mjs <out dirs>` regenerates the readout's §6 tables from verdicts.json.
5. Compare `results.json` and `verdicts.json` byte for byte (`cmp` or `sha256sum`). `manifest.json` differs only in `seconds` and, if the worktree differs, `commit`. Report every other difference.
6. Spot check without the full run: `harness.mjs episode` for any (persona, seed, cell, policy) prints a hash that must be the same in every process and every worktree at that commit.

Every random draw is a hash of a string key (seed, persona, concept or card, event, occurrence; `learner.mjs` `u01`), and every policy random draw is keyed by (seed, persona, policy, draw number). Nothing reads the clock, `Math.random` or the environment, so results do not depend on worker count, order or machine.

## What the judge models, and where each number comes from

See the criterion §1 and §4 and the header of `learner.mjs`. In short: binary knowledge per in-pilot concept; prior knowledge from the copied latents rescaled to B2's mean and spread; exponential forgetting at a per-persona rate rescaled to B2's base and spread; a hidden per-lesson misconception pull (B2 range as a triangular distribution) plus a per-persona modifier (B2 range); encoding cut by the prerequisite penalty when any in-pilot prerequisite is unknown (B2); a hypercorrection boost to first-revisit recall after a misconception error (B2; 0 at base by the criterion rule); a novelty boost to encoding on a domain switch from the previous completed card (B2; 0 at base; C4, C2 F3); a constant prediction-feedback boost (B2 base); a learn rate from B2's C2 row (base 0.70 guess, low cell 0.35; C4, C2 F2); five unsourced constants copied from the provisional learner and labelled (`UNSOURCED`). Forgetting acts on the increment above the guess floor (C4, C2 F1). The composer's rating of each lesson is generated from the hidden pull at fidelity ρ and never read by the learner.

C2 (W-1533) reviewed fidelity: company/personalization/evidence/2026-10-16-simulator-fidelity-review.md. Its blocking findings F1 to F3 were fixed in C4 (criterion §10); its notes stay open there.
