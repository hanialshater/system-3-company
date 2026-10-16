# Phase A offline simulator (W-1494) and per-step trace (W-1504)

owner: learner-model-engineer (Ifeoma) · date: 2026-10-16 · inputs: `../model.ts`, `../personas.ts` (W-1493) · design: company/personalization/2026-10-16-brief-response.md §1 C5, §2.4, §2.5, §3

Offline only. Nothing in `src/` imports this folder (`../self-check.mjs` fails if it does). No dependencies; Node 22.18 or later.

```
node company/personalization/model/sim/run.mjs                    # full: base table, sensitivity, traces (~4 min)
node company/personalization/model/sim/run.mjs --seeds=5 --no-sens # quick smoke run
node --test company/personalization/model/sim/privacy-n1-n3.test.mjs  # privacy N1 + N3 on the shipped composer (W-1526, <1 s)
node company/personalization/model/sim/privacy-breaks.mjs           # shows each N1/N3 test fails on a deliberate break (~10 s)
```

Run the privacy tests after any change to `composer.ts`, `../model.ts` (fingerprint, needs, `FORBIDDEN_INPUTS`) or `catalog.mjs`, alongside `node company/personalization/model/self-check.mjs` (which holds P1, P2 and N6; not repeated here).

**Status of the numbers: UNSCORED.** There is no committed pass criterion (W-1496, analytics-steward). The runner prints numbers and draws no conclusion about which policy is better.

**PROVISIONAL learner and scorer.** `learner.ts` and `score.ts` are placeholders by the builder, to be replaced or owned by personalization-eval (independence rule, company/ceo-office/2026-10-16-personalization-org-proposal.md §2: builders never build the thing that grades them). Results from them are smoke tests, not evidence. They sit behind the `SimLearner` interface and `scoreEpisode()` so the evaluator can swap them without touching the composer.

| File | What | Owner |
|---|---|---|
| `catalog.mjs` | Pilot dims (probability + cs, published + review: 230 lessons) from meta.json + content/curriculum; successors as reverse edges; default order = today's interleave (src/lib/feed-index.ts) on the pilot; **`misconceptionStrength` is a placeholder hash, not a rating** | learner-model-engineer (dims home: W-1498) |
| `composer.ts` | `composeExplained()` and `gamCompose: ComposeFn`; draft rules, default order, random baselines; ablations by switching terms off | learner-model-engineer |
| `simulate.mjs` | One episode: pre-history drawn from jittered fingerprint means, daily sessions, due first revisits first, recompute after every card; the trace | learner-model-engineer |
| `learner.ts` | **PROVISIONAL** simulated learner (`SimLearner`) from the persona's latent block | personalization-eval (pending) |
| `score.ts` | **PROVISIONAL** episode metrics: recall over all lessons, breadth, prerequisite-first share, reveal proxy, gain | personalization-eval (pending) |
| `hq-cli.mjs` | JSON CLI for the HQ lab `/hq/personalization` (W-1503): `meta`, `run`, `compare`, `saved`; the only way the app reaches the simulator (W-1498, ../README.md) | learner-model-engineer |
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

## Privacy tests N1 and N3 (W-1526; ruling company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §3)

`privacy-n1-n3.test.mjs` runs the served pipeline per card (`fingerprintFrom` → `detect` / `explainNeeds` → `composeExplained` with the sim's pilot set, and `gamCompose`, the `ComposeFn` contract, beside it), 10 cards per case, recomputing after each, over 8 synthetic histories on the real pilot catalog (cold start, misses, successes, one-domain, null predictions, stated subjects, "less of this", switched off). No learner data and no persona `latent`.

- **N1 (computed, not stored).** Stubs every write and network path: `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `navigator.sendBeacon`, `localStorage`, `sessionStorage`, `indexedDB`, `caches`, `document.cookie`; Node `fs` writes (sync, callback, promises, named imports via `syncBuiltinESMExports`), `http`/`https`/`net`/`tls`/`dgram`, `child_process`; `console.*` and `process.stdout/stderr.write` (a log is a write). Asserts zero writes and zero fetches, zero storage reads (the composer takes history as an argument), and no mutation of its deep-frozen input. A control asserts the stubs do record a write and a fetch.
- **N3 (forbidden-input invariance).** Every `FORBIDDEN_INPUTS` entry, `ageBand` included, is set to two different values at four places a serving build could carry it (each history item, the fingerprint, `fingerprintFrom` opts, `ComposeInput`). Asserts the same order, and the stricter same composition (reasons, terms, scores, slot traces, need scores), and that no forbidden key is read by name (a `Proxy` records reads). The test fails if `FORBIDDEN_INPUTS` gains an entry it does not vary. Controls: the cases do move cards (16 of 80), and flipping one permitted input (the latest `predictedCorrectly`) does change the order.
- **Deliberate breaks.** `privacy-breaks.mjs` copies this folder to a temp root, breaks the copy of `composer.ts` 12 ways (storage write, fetch, fs log, console, caching on the input, `ageBand` and `dwell` changing scores, a bare read of `device`), runs the tests from the copy, and checks each break is caught. The `-o` rows weaken the copy of the test to order-only, the ruling's literal check: a uniform `ageBand` shift passes it, which is why the composition and read checks exist.
- **Limits.** The tests see what runs in this process: they cannot see a write made by code the composer does not call, and a forbidden value read through a renamed key (for example a field called `age`) is caught only if it changes the composition. Serving code (phase B) needs its own N1 test where it runs; this one covers the composer and the model functions it calls.
- **Grep note for the privacy read (ruling §1).** These two files contain `fetch`, `localStorage`, `http` and `fs` writes as stub names and, in `privacy-breaks.mjs`, as break text written only to a temp copy. They are the only such hits in this folder besides `run.mjs` writing `out/`.

## A2: no calibration on real data without a privacy read (to W-1497 and W-1513)

Ruling A2 (company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §1): phase A stays seeded from invented personas and lesson data. Calibrating the simulated learner or its parameters (W-1497 evidence ranges, W-1513 learner adopt/replace) against real events, real progress rows, any learner's `s3c:progress:v1`, or **even aggregates** from W-706 is a new read: ask privacy-reviewer before any such number enters `learner.ts`, `BASE_PARAMS`, a persona or a curve. Aggregate-only calibration (counts, cells under 20 not used, no per-learner row, no session id) is expected to pass quickly; anything per-learner is expected to be refused.

