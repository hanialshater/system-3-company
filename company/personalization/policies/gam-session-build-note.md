# Build note: the session composer (composer-v0.3-session, model-v0.3.0)

owner: learner-model-engineer (Ifeoma) · date: 2026-10-20 · status: built, offline only, UNSCORED, not frozen
decision: company/decisions/2026-10-20-founder-edp-faithful-personalization.md (founder: "better and more faithful implementation")
change line: company/decisions/2026-10-16-personalization-model-v0.md, row `model-v0.3.0`
reference: company/personalization/reference/edp-orchestrator/src/ (edp-engine.js, orchestrator-inline.js, policies.js)
next: applied-scientist-personalization (numbers, §5) → personalization-eval (scoring, independent) → hq-engineer / personalization-engineer (HQ sandbox, §6)

## 1. What was built

A new composer version beside the phase A one. `composer.ts` and every existing policy are unchanged: `sim/policy-golden.json` is unchanged and still matches (review-timing.test.mjs). The c2 harness's GAM fingerprint (`eval/harness/c2/gam-v0.2.2.sha256`) also still matches when it is computed with `PHASE_A_MODEL_VERSION` (composer-session.test.mjs test 8).

| File | Change |
|---|---|
| `company/personalization/model/model.ts` | `MODEL_VERSION` model-v0.3.0; `PHASE_A_MODEL_VERSION` model-v0.2.2; §4b `COMPOSER_SESSION`, `SessionTermName`, `SessionCoefficients`, `SessionEdit`, `applyEdits()`, `sessionCoefficients()`; session invariants in `checkModel()`; `inspect().composerSession` |
| `company/personalization/model/sim/composer-session.ts` | new: `composeSession()`, `applyAddr()`, `addrAll()`, `sandboxPool()`, trace types |
| `company/personalization/model/sim/simulate.mjs` | `PHASE_A_POLICIES` (the old list), `SESSION_VARIANTS`, `ALL_POLICIES` = both; `composeSessionFor()`; `runSessionEpisode()` (session serving mode); opt-in `diagnostics` (`circularDiagnostics()`); `firstComposeInput()`, `sandboxDocument()`. Phase A trace now writes `PHASE_A_MODEL_VERSION` (same string as before) |
| `company/personalization/model/sim/hq-cli.mjs` | `meta.policies.session`, `meta.session`; `compare` rows `circular`; new `sandbox` command |
| `company/personalization/model/sim/sandbox-reference.mjs` | new: plain-JS `detect()` + `recompose()` from the sandbox document only |
| `company/personalization/model/sim/composer-session.test.mjs` | new: 10 tests, wired into `gate.mjs` |
| `company/personalization/model/sim/policy-golden.mjs` | iterates `PHASE_A_POLICIES` (was `ALL_POLICIES`). Hashes and JSON unchanged |
| `company/personalization/model/sim/review-timing.test.mjs` | the version pin now reads `PHASE_A_MODEL_VERSION` (see §7, O-1) |
| `company/personalization/model/gate.mjs`, both READMEs, the decision record | wiring and documentation |

Policies: `gam-session` (v1), `gam-session-v3` (v1 + edits), `gam-session-no-cov` (v1 with every `cov:*` term scored 0). They are in `ALL_POLICIES`, not in model.ts `POLICIES`. Adding them there would change the phase A eval harness's policy set (`eval/harness/harness.mjs` reads `M.POLICIES`) and the HQ `main` comparison, which `tests/hq/personalization.test.mjs` pins at 7 rows.

## 2. The rule as built

```
session of N = COMPOSER_SESSION.sessionSize new cards, filled slot s = 0..N-1 greedily:
  remaining ← detected needs; coverage ← 0
  score(l, s) = base·rank(l) + Σn onRem[n]·remaining[n]·addr[l,n] + Σn onCov[n]·coverage[n]·addr[l,n]
              + surprise + novelty                                  (gated off, 0)
              − [l ≠ default card]·(slotDecay·s + attentionCost)
  gain(l)     = Σ need:* + Σ cov:*                                  (the need-term gain)
  a departure l is eligible iff gain(l) > attentionCost, stretch readiness passes, the filters pass
  winner      = best eligible departure if its score > the default card's score, else the default card (reason "default")
  then the anti-bubble floor (streak from history, then this session's moves) can force the default ("breadth-floor")
  applyAddr(winner): remaining[n] = max(0, remaining[n] − addr[w,n]); coverage[n] = min(1, coverage[n] + addr[w,n])
serving (simulator): serve the N in order; recompose after N served cards or at the end of the day
```

## 3. Mapping to EDP

| Ours | EDP line | Same / different, and why |
|---|---|---|
| `applyAddr()` (composer-session.ts) | policies.js 12-17 `applyAddr`; orchestrator-inline.js 271-274 | **Same**, exactly: floor 0, cap 1. Test 2 runs EDP's function copied verbatim against ours. edp-engine.js 30 scales by `attention` (max(.5, 1 − .08·slot)). We follow applyAddr, as the brief asks |
| remaining starts at needs, coverage at 0 | orchestrator-inline.js 254-256; policies.js 20-26 `initState` | Same |
| greedy slot loop, no repeats | orchestrator-inline.js 259-275 | Same, ties: orchestrator-inline.js keeps the first maximum in registry order, edp-engine.js 21 breaks by name; we break by slug |
| `base·rank` | `mod.base` (orchestrator-inline.js 245) | Different: EDP gives a hand-set base per widget. Our base is the default-order rank, so the default order stays the base and the holdout |
| `need:n` = onRem[n]·remaining[n]·addr[l,n] | `on_rem[p]·remaining[p]` (orchestrator-inline.js 246) | EDP's on_rem is per widget. Ours is per need × relational addr, because we cannot hand-author 230 lessons (brief response C3) |
| `cov:n` = onCov[n]·coverage[n]·addr[l,n] | `on_cov[p]·coverage[p]` (orchestrator-inline.js 247); labels edp-engine.js 8 | Same meaning (> 0 complementarity, < 0 overlap penalty). Per need × addr, for the same reason as `need:n`. The addr factor means a lesson that does not address the covered need gets no cov term, as EDP widgets only carry on_cov for problems they address |
| `slotDecay` | `slot_decay·slot` (orchestrator-inline.js 248) | Charged to departures only. EDP's per-widget decay reorders widgets. A uniform decay on every candidate would shift all scores equally and be identically 0 in every decision, which was phase A finding 1 for the old slot term. On departures only, it raises the move bar at later slots, where needs rest on assumed coverage |
| `attentionCost` | `cost` and `gain > cost` (edp-engine.js 9, 17, 23) | Two parts: a −cost term on departures, and the budget gate. EDP's gain is resolved need mass (Σ min(remaining, addr)). Ours is the need-term score (Σ need:* + cov:*). Our addr is 0/.5/1, so one pick usually zeroes a need's `remaining`, and under EDP's gain a positive on_cov could never pass the budget. EDP stops filling when no widget clears the cost (line 24). We cannot leave a feed slot empty, so the default card fills it with no reason claimed: this is COMPOSER.moveThreshold's rule. moveThreshold itself is not read |
| v1 / v3, `edits`, `applyEdits()` | orchestrator-inline.js 164-205 `EDITS_V3`, `applyEdits`; 377-378 | Same row shape [target, path, from, to, reason] and pure deep clone. Stricter in one way: ours throws if `from` is not the current value, so a stale edit (or a sandbox "copy as code diff" made against old numbers) cannot apply silently |
| coverage diagnostics (`compare … circular`) | edp-engine.js 33-34 `coverageRate`; policies.js 241-247 entropy | needCoverageRate = Σ min(need, addr) / Σ need per served card (EDP resolved / initial mass), the same for every policy. domainDiversity = entropy over domains / log2(domains). Labelled "circular: diagnostic only" |
| not ported | edp-engine.js 18 `repeatPenalty`, 25-27 fixed/independent/noisy/epsilon policies, attention scaling; detect()'s `confirmed` factor (line 7) | Repeats are impossible (taken set). Baselines already exist (default-order, random, epsilon-greedy). `confirmed` would need a per-learner store of confirmed problems, which the privacy ruling refuses (§4) |

What stays as phase A, as the brief asks: due revisits first; default when dampened or switched off; the 1-in-3 floor; stretch readiness; stated-subject and less-of-this filters; surprise and novelty gated off (both terms in every trace as 0); engagement never a term; no forbidden input (test 7, N3 shape).

## 4. Serving mode and the O2 risk

Phase A composes one card and recomputes it from the learner's answer (`COMPOSER.servingMode`). The session mode composes 5 cards and serves them in order. So a wrong prediction on card 1 cannot change cards 2-5; only the next session sees it. Within a session, `remaining` falls because the model assumes a queued card addressed a need, not because the learner showed it. That is the circularity O2 warns about, and it is why the phase A contract dropped it. It is back on purpose (founder decision), and it is scored by the independent learner like any candidate. The coverage numbers it makes possible are diagnostics of the model's own beliefs. They are labelled circular everywhere and are never a pass score.

Descriptive mechanics only. This is not a result, and I drew no recall conclusion from any run. Over 6 personas × seeds 1-3 × 7 days, the share of served cards that were departures, by session slot:
- gam-session: .40, .13, .11, .06, .05
- gam-session-v3: .34, .18, .24, .17, .13
- gam-session-no-cov: .42, .12, .03, .00, .00

Two consequences for the numbers in §5:
- (a) With addr at 1, `applyAddr` zeroes a need after one pick. Slots 2-5 then move only through cov terms, so v1's overlap penalties make most later slots default.
- (b) The budget gate binds only when a cov term makes the default card's own gain negative. A departure's base is never above the default's, so when the default's gain is ≥ 0, out-scoring it already implies gain > attentionCost. The gate never bound in no-cov or at slot 0. It bound on 4-25 cards per slot (v1) and 11-42 (v3) at slots 1-4.

## 5. Numbers to review (applied-scientist-personalization)

Every one is a guess, with its reason in model.ts `COMPOSER_SESSION.why` or in the edit row. None was chosen from a simulator result.

| Number | Value | Why (one line) |
|---|---|---|
| sessionSize | 5 | about 5 minutes of feed at 60 s a card; EDP fills 6 |
| base | 1.0 | = COMPOSER.weights.defaultRank: the default order is the base |
| onRem {repair, build, breadth, stretch} | .5, .4, .35, .3 | = phase A onRem, so v1 differs from gam only by the session machinery |
| onCov.repair (v1) | −.2 | mild overlap; EDP v1 gives every primary need a negative on_cov |
| onCov.build (v1) | −.1 | mildest: two build steps are a path, not a repeat |
| onCov.breadth (v1) | −.3 | one other-domain card meets breadth for a session |
| onCov.stretch (v1) | −.3 | one stretch per session (O8) |
| slotDecay | .02 | departures need +.02 per slot (+.08 by slot 5): later slots rest on assumed coverage |
| attentionCost | .1 | = COMPOSER.moveThreshold, so slot 0 with nothing covered has phase A's move bar; EDP's cost is .06 |
| v3 edit build.onCov | −.1 → +.3 | EDP-style chain synergy: a second successor lesson extends the chain |
| v3 edit repair.onCov | −.2 → +.15 | repair is rarely one card; a second lesson on the missed chain reinforces |
| v3 edit breadth.onCov | −.3 → −.5 | two other-domain cards in a session is a switch, not breadth |
| (inherited, unchanged) COMPOSER.addr | 1 / 1 / .5 hops, 1, 1/.5, 1/.5 | addr's scale versus need scale (needs rarely exceed .5) decides how fast `applyAddr` exhausts a need; see §4 (a). This is the number most worth a look |
| (sim choice) traceTopK | 10 | as composer.ts |

## 6. For the HQ sandbox (hq-engineer, personalization-engineer)

- `node company/personalization/model/sim/hq-cli.mjs sandbox --persona=<id> --variant=v1|v3 [--seed=1]` gives schema `personalization-hq-sandbox-v0`, unrounded. `sim/sandbox-reference.mjs` is the algorithm to port, and it imports nothing. composer-session.test.mjs test 9 holds it equal to the composer for every persona and both variants, and after a drag of the coefficients and of one curve. Test 9b holds the CLI's document equal to the in-process one.
- The document fixes the history, so addr, the pool, stretch readiness and the floor streak are fixed for the session. A drag may change `needShapes`, `dampener` and coefficients only. If `constraints.surpriseGateActive` or `noveltyGateActive` is ever true, the sandbox must refuse (the precomputed values assume both are shut).
- The precomputed lab data (`src/data/hq-personalization/`) is STALE after this change (`node tools/hq-lab-precompute.mjs --check`: 57 files; meta and compare changed). The tool refuses while its inputs are uncommitted, by design, so I did not regenerate it. After the commit, run `node tools/hq-lab-precompute.mjs` and commit the folder (owner: personalization-engineer). It precomputes runs only for `meta.policies.model`, so the session policies appear in compare `all` but get no precomputed runs unless that tool is changed.

## 7. What I did not do, and open issues

- No scoring, no criterion, no claim that any policy is better. personalization-eval scores; a FAIL is reported unedited (decision objections).
- Not served, nothing in `src/`, no deploy, no commit (the chief of staff commits).
- No tuning: the v3 edits are reasoned guesses, not edits chosen from a run (EDP's v3 edits were chosen from simulated coverage; ours deliberately were not).
- **O-1 (personalization-eval):** `MODEL_VERSION` moved to model-v0.3.0, as briefed. The c2 harness checks `M.MODEL_VERSION === "model-v0.2.2"` (`eval/harness/c2/run2.mjs` line 79, `tests2.test.mjs` line 119) and hashes `M.MODEL_VERSION` into `gamFingerprint()`. Run from the live tree, those now refuse or mismatch. Reproductions run at their own commit, so no readout is affected. If the harness must run on the live tree, it should read `M.PHASE_A_MODEL_VERSION`; that is the harness owner's edit. Our own pin (review-timing.test.mjs) moved to `PHASE_A_MODEL_VERSION`. composer-session.test.mjs test 8 checks that the c2 fingerprint, computed with that constant, still equals `gam-v0.2.2.sha256`.
- **O-2:** `npm run test:personalization` now takes about 5.6 s (it was about 4.3 s; the stated `check` budget is 3 s, already exceeded before this change). The ~1 s duplicate golden check runs only with `S3_SESSION_FULL=1`.
- **O-3:** the HQ meta and compare schemas keep their names (`-v0`) because every change is additive. Phase A traces keep `personalization-sim-trace-v0`; session traces are `-v1` (sim/README.md "Session policies").
- **O-4 (privacy-reviewer, before anything live):** the session mode would need a session-local queue of planned cards at serve time. That is in-memory and computed on demand, but it is a served-order list for up to 5 cards, and N4 (no served-order log) needs a read before phase B. Offline, nothing is stored.
