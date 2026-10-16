# Phase A offline simulator (W-1494) and per-step trace (W-1504)

owner: learner-model-engineer (Ifeoma) · date: 2026-10-16 · inputs: `../model.ts`, `../personas.ts` (W-1493) · design: company/personalization/2026-10-16-brief-response.md §1 C5, §2.4, §2.5, §3

Offline only. Nothing in `src/` imports this folder (`../self-check.mjs` fails if it does). No dependencies; Node 22.18 or later.

```
node company/personalization/model/sim/run.mjs                    # full: base table, sensitivity, traces (~4 min)
node company/personalization/model/sim/run.mjs --seeds=5 --no-sens # quick smoke run
```

**Status of the numbers: UNSCORED.** There is no committed pass criterion (W-1496, analytics-steward). The runner prints numbers and draws no conclusion about which policy is better.

**PROVISIONAL learner and scorer.** `learner.ts` and `score.ts` are placeholders by the builder, to be replaced or owned by personalization-eval (independence rule, company/ceo-office/2026-10-16-personalization-org-proposal.md §2: builders never build the thing that grades them). Results from them are smoke tests, not evidence. They sit behind the `SimLearner` interface and `scoreEpisode()` so the evaluator can swap them without touching the composer.

| File | What | Owner |
|---|---|---|
| `catalog.mjs` | Pilot dims (probability + cs, published + review: 230 lessons) from meta.json + content/curriculum; successors as reverse edges; default order = today's interleave (src/lib/feed-index.ts) on the pilot; **`misconceptionStrength` is a placeholder hash, not a rating** | learner-model-engineer (dims home: W-1498) |
| `composer.ts` | `composeExplained()` and `gamCompose: ComposeFn`; draft rules, default order, random baselines; ablations by switching terms off | learner-model-engineer |
| `simulate.mjs` | One episode: pre-history drawn from jittered fingerprint means, daily sessions, due first revisits first, recompute after every card; the trace | learner-model-engineer |
| `learner.ts` | **PROVISIONAL** simulated learner (`SimLearner`) from the persona's latent block | personalization-eval (pending) |
| `score.ts` | **PROVISIONAL** episode metrics: recall over all lessons, breadth, prerequisite-first share, reveal proxy, gain | personalization-eval (pending) |
| `run.mjs` | Runner: replay test, base table, per-persona table, sensitivity table, writes `out/` (gitignored) | learner-model-engineer |

## Composer (port of edp-engine.js compose())

Since model-v0.2 (W-1512, decision record): compose ONE card (`COMPOSER.slotsAhead` 1, `servingMode: compose-one-recompute`), serve it, recompute. Terms per candidate (all from `COMPOSER` in model.ts): `defaultRank`, `need:<n>` = onRem·remaining·addr (repair hops on missed concepts, build successor with prerequisites done, breadth unseen/other domain, stretch one/two levels up), `surprise` = w·strength/3·readiness **only if `surpriseGate` is active and the lesson has a real `strengthSource`** (inactive in v0.2, so it is 0 everywhere and `gam-off-surprise` = `gam`), `novelty`. `overlap` and `slot` were removed (they were 0 in every served pick); the `gam-off-overlap` ablation is gone with them. Remaining need is reduced by the winner's addr (EDP's `remaining`). Hard constraints, in order: due revisits first; default when every need is 0 (dampener) or switched off; 1-in-3 default share (the moved streak is reconstructed purely from history and the default order); stretch readiness; stated-subject filter; move threshold. Engagement is never a term; the reveal-completion floor is phase B and every slot trace says "inactive".

## Trace (W-1504), schema `personalization-sim-trace-v0`

`out/traces/<persona>.<policy>.seed1.json` for gam, default-order and draft-rules. Top level: model version, persona (means, jittered means, home domain), `groundTruth` (latent + params, marked simulator-only), initial fingerprint, `steps[]`, episode score, `model` (= `inspect()`: curves with reasons and privacy status). Each `new` step: fingerprint; `needs` (= `explainNeeds()` minus repeated reason text: x, y, w, contribution, dampener); `slots[]` with default card and score, the constraint that decided it, top 10 candidates with every term, winner, moved, reason, margin, rejected candidates with why, remaining need before/after; the served card; `simulated` {predictedRight, revealed, stopped, firstRecall (filled when the revisit happens)}. `revisit` steps: slug, recalled. About 0.3 to 0.6 MB per file.

## Known simplifications (each a reason to distrust the numbers)

- Pre-simulation history is drawn from the persona's jittered fingerprint means; frontierOpen is not controlled.
- Only the first revisit is simulated; later revisits (3, 7, 21 days) are not.
- Prerequisites outside the pilot (math:, economics:) are ignored for readiness and learning.
- The catalog runs out: ~70 new cards in 7 days out of 230 lessons. Longer runs converge as every policy exhausts the pool.
- `misconceptionStrength` is noise, so the surprise term ranks by noise; the learner does not read it.
