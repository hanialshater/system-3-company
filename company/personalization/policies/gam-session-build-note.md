# Build note: the session composer (composer-v0.3-session, model-v0.3.0; model-v0.4.0 change in §8; model-v0.4.2 in §9)

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

## 8. model-v0.4.0 (W-1999, 2026-10-20): addr consumption scale, EDP's gain, no cov on the default card

Raised by applied-scientist-personalization (company/personalization/policies/gam-session-params.md, "Routed" 1 and 2). Not committed. Status: built, UNSCORED. I ran no `compare` and read no recall, score, `simulated` or `groundTruth` field; every number below is a composition count from traces (`kind`, `session.slot`, `moved`, `reason`, slot candidates' terms, `gain`, `note`, `addr`).

### 8.1 What changed in the algorithm (for the HQ port, src/lib/hq-personalization-sandbox.ts; hq-engineer)

Exactly three changes, all in the session composer; sandbox-reference.mjs carries the same three, and the arithmetic order is the order below.

1. **New coefficient `addrUse`** in `SessionCoefficients` (`COMPOSER_SESSION.v1.addrUse = 0.35`; no v3 edit, so v3 inherits .35; a `["session", "addrUse", from, to, reason]` edit row is allowed). The sandbox document's `session.coefficients`, `session.v1`, `session.v3` gain the field, and `why` gains `"addrUse"`. A port's coefficient key list (`COEF_KEYS`) and its "copy as code diff" need it.
2. **State update after a pick** (personalised sessions only): for each need in the order repair, build, breadth, stretch, `d = addrUse * addr[n]`; `remaining[n] = Math.max(0, remaining[n] - d)`; `coverage[n] = Math.min(1, coverage[n] + d)`. Before: `d = addr[n]`. The `need:*` and `cov:*` terms still use the unscaled `addr`.
3. **The attention-budget gain** is EDP's (edp-engine.js `compose`, the `gain=` line, with addrUse in the place of EDP's `attention`): `gain = 0; for n in NEEDS: gain += Math.min(remaining[n], addrUse * addr[n])`, computed with the slot's `remaining` before the pick. A departure is eligible iff not stretch-blocked and `gain > attentionCost` (unchanged comparison). Before: `gain` was the sum of the candidate's `need:*` and `cov:*` term values. The ineligibility note now reads `attention budget: resolvable need <gain> ≤ attention cost <cost>`.
4. **The default card's `cov:*` terms are 0** (pushed as 0, so the term list is unchanged in shape). Its `need:*` terms are unchanged. Departures' `cov:*` terms are unchanged.

Not changed: `base`, `need:*`, `slotDecay`, `attentionCost` terms; the floor; stretch readiness; filters; tie order; the winner and reason rules; `composer-v0.3-session` as the composer name (precedent: `composer-v0.2` kept its name through model-v0.2.x). New export `resolvableGain()` in composer-session.ts; `applyAddr(a, remaining, coverage, use = 1)` gained the `use` argument (use 1 is EDP's function exactly). `recompose()` slots gain `gain` (the winner's). Drift tests that will fail until the port syncs: tests/hq/personalization-sandbox.test.mjs "drift", "drift after a drag", and "precomputed: the committed sandbox documents" (the precomputed documents are stale too; regenerate after commit, §6).

### 8.2 (a) addrUse, and why both state vectors are scaled

The brief asked for the amount by which a pick lowers remaining and raises coverage. I scale both. In EDP's orchestrator (orchestrator-inline.js `compose`, policies.js `applyAddr`) one addr moves both by the same amount, and that addr is need mass (.2 to .6). Our relational addr (1, .5) is relevance, not mass; addrUse converts it to mass, so both vectors stay in EDP's units and `onCov` keeps EDP's meaning (onCov × mass covered). The alternative, scaling `remaining` only, has a precedent in edp-engine.js (its `attention` factor scales remaining but not exposure), but that factor is a position fatigue, not a unit conversion. Consequence for the numbers: a cov term after one addr-1 pick is now onCov × .35, not onCov. The scientist's v3 chain arithmetic (.15 − .1 − .02 × slot) assumed coverage 1; I added a "model-v0.4.0 note" to those two reason strings (values unchanged) and route the re-review (§8.5).

EDP's gain rule: kept. It is now independent of the score by construction (resolvable mass, not score), so it is EDP's stopping rule: a card that resolves .1 or less of every need cannot depart, whatever its cov terms (test 4). At the current numbers it never decided a served card in the probe (8.4): with onRem ≤ .5 and addrUse .35, a card that outscores the default nearly always resolves more than .1, and v3's +.15 synergy is .05 after scaling. So it binds only when positive cov is large or the cost is raised. The old rule could not bind by construction, so I kept EDP's.

### 8.3 (b) cov terms on the default card: EDP's behaviour, implemented

EDP's `type: 'default'` widgets carry `on_cov: {}` (orchestrator-inline.js 152-159). They also carry `on_rem: {}`, and I did **not** follow that part. Reasons:
- cov off the default card: I looked for a reason not to and found none. The risk I tested was moves off a default card for nothing (a departure with the same addr vector as the default). The probe counted 0 such moves. The scientist's mechanical point stands: overlap penalties on the default card were the channel that pushed sessions off the default order, which is the holdout.
- need terms kept on the default card: removing them too (probe, then reverted) raised v1 slot-0 departures from .43 to .56 and made 7 moves to a card with the same addr as the default. Those are departures from a default card that already serves the need. EDP's defaults are generic fallbacks with near-zero addr; ours is a real lesson with full relational addr, so its need pull is real.

### 8.4 Layout: departure share of served new cards by session slot (6 personas × seeds 1-3 × 7 days)

Composition mechanics only. This is not a result and says nothing about recall.

| Build | gam-session (v1) | gam-session-v3 | gam-session-no-cov |
|---|---|---|---|
| model-v0.3.1 (before) | .40 .13 .11 .06 .05 | .37 .11 .18 .10 .08 | .42 .12 .03 .00 .00 |
| addrUse + EDP gain only, default keeps cov (step, not shipped) | .42 .15 .05 .03 .01 | .41 .15 .08 .03 .03 | .44 .13 .04 .00 .00 |
| **model-v0.4.0 (shipped)** | **.43 .11 .02 .00 .00** | **.42 .11 .03 .01 .00** | .44 .13 .04 .00 .00 |
| rejected variant: default also drops need terms | .56 .08 .01 .00 .00 | .56 .09 .02 .00 .00 | .57 .10 .02 .00 .00 |

Served cards per slot (v0.4.0, v1): 264/244/173/161/148. Same-reason consecutive moves in a session (chains of 2): v3 7 → 1. Why a personalised slot stayed default (v0.4.0, v1, slots 0-4): the floor 20/7/7/0/0, stretch readiness 22/24/10/2/1, the attention budget 0 at every slot, the score (the default card won) 108/185/152/159/147.

What this says mechanically: needs now survive a pick (residual .06 to .11 at median needs), but the residual pull (onRem × residual, about .02 to .05) is below the move bar (.1 + .02 × slot). So at today's numbers the need terms still act mostly on a need's first pick, and EDP-style chains do not form. Which of onRem, attentionCost, slotDecay, addrUse or onCov should move is applied-scientist-personalization's call (§8.5); the engine now lets any of them do it.

Probe: scratch scripts (not committed) calling `runEpisode({trace: true, days: 7})` and reading only the fields named at the top of this section.

### 8.5 Open

- **applied-scientist-personalization:** re-review the session numbers at model-v0.4.0: addrUse (.35 is your guess, now in code), the v3 onCov synergies (now × addrUse), slotDecay's chain bound, and whether the attention budget should bind at these numbers (board, W-1999 follow-up).
- **hq-engineer:** sync src/lib/hq-personalization-sandbox.ts to §8.1 and its drift tests; personalization-engineer regenerates src/data/hq-personalization after the commit (§6).
- **personalization-eval:** nothing scored here; the session candidates still need an independent readout under a criterion frozen first.

## 9. model-v0.4.2 (W-2003, 2026-10-20): `gam-session-v3-edpbase` and `reasonCarriesMove`

Spec: company/decisions/2026-10-20-vp-personalization-session-base.md (VP decision W-2002) §2 and §5. Built on 702e4588 (model-v0.4.1). Not committed. Status: built, UNSCORED. I ran no `compare` and read no recall, score, `simulated` or `groundTruth` field. I ran no layout probe either: β is a placeholder, and the VP record allows a probe only after the scientist sets β (§5).

### 9.1 What changed

| File | Change |
|---|---|
| `company/personalization/model/model.ts` | `MODEL_VERSION` model-v0.4.2; `COMPOSER_SESSION.edpBaseEdits` (one row `["session", "base", 1.0, β, reason]`, apart from `edits`); `SessionVariant` gains `"v3-edpbase"`; `SESSION_COEFFICIENT_VARIANTS`; `sessionCoefficients("v3-edpbase")` = applyEdits(v3, edpBaseEdits); `checkModel()` requires exactly that one row and β > 0 (finite); `inspect().composerSession.coefficients["v3-edpbase"]` |
| `sim/composer-session.ts` | `reasonCarriesMove` on `SessionPick` and `SessionSlotTrace`; exported `reasonTermValue()`; a slot's `candidates` always include the winner (see 9.3) |
| `sim/simulate.mjs` | `SESSION_VARIANTS["gam-session-v3-edpbase"] = { variant: "v3-edpbase", off: [] }` (so `ALL_POLICIES` gains it last); `SANDBOX_VARIANTS` {v1, v3, edpbase}; `sandboxDocument` takes `edpbase` |
| `sim/hq-cli.mjs` | `meta.session["v3-edpbase"]`, `meta.session.edpBaseEdits`, `meta.session.sandboxVariants`; `sandbox --variant=v1\|v3\|edpbase` (`meta.policies.session` gains the variant through `SESSION_VARIANTS`) |
| `sim/sandbox-reference.mjs` | picks and slots carry `reasonCarriesMove` (same formula, same summation order). No other arithmetic change: the edpbase document differs only in its coefficients |
| `sim/composer-session.test.mjs` | test 8 list; 9 and 9b cover edpbase and the new field; new tests 10, 11, 12 |
| `company/decisions/2026-10-16-personalization-model-v0.md` | row model-v0.4.2 |
| `sim/README.md` | a model-v0.4.2 paragraph |

Unchanged: v1, v3, `COMPOSER_SESSION.edits`, every other number, the algorithm, `PHASE_A_MODEL_VERSION`, every phase A policy (`sim/policy-golden.json` still matches, via review-timing.test.mjs; the c2 fingerprint still matches, test 8). **Test 10** pins gam-session, gam-session-v3 and gam-session-no-cov. It hashes every CASE composition, the v1 and v3 sandbox documents' composed sessions per persona, and whole 3-day episodes (steps and score, seed 1) per persona, with `reasonCarriesMove` dropped. The hash `9399c3ab…` was computed by the same code on a `git archive` of 702e4588, so the new field is the only change to those policies' outputs. A .0001 change in v1 slotDecay fails it (checked).

### 9.2 β: a placeholder, not a number

`edpBaseEdits[0]` is `["session", "base", 1.0, 0.02, "placeholder pending W-2004 (rule in the VP record §2.3): …"]`. .02 is the VP's stated expectation, which the record says does not bind the scientist ("My expectation … β lands near .02"). I entered it only so the variant runs and its tests have a base below 1. I did not derive it. applied-scientist-personalization sets β by §2.3's rule (EDP need-widget base spread / primary pull ≈ .1, times our onRem × median need ≈ .18 to .21), rewrites the reason, records the derivation in gam-session-params.md, and adds a model-version row (W-2004). Test 11 asserts that the reason starts with the placeholder text. The scientist's edit must change that assertion to match the new reason. That is deliberate, so the placeholder cannot survive silently into a frozen criterion. `checkModel()` refuses β ≤ 0, NaN, a second row, or a row that is not `session.base` from 1.0 (test 11 mutates each case and restores it).

### 9.3 `reasonCarriesMove`, as built

- **Moved card:** `reasonTermValue(reason, winner.terms) >= winner.score − default.score` (model-v0.4.4, W-2008, VP ruling W-2007 in company/decisions/2026-10-20-vp-personalization-session-base.md §7; built as strictly > at model-v0.4.2). At equality the departure would only tie the default card without the reason, and a tie keeps the default card (`wouldMove` is strict), so the reason carried the move. The two operators are tied: if `wouldMove` ever becomes ≥, this becomes > in the same change. The reason's terms are `need:n + cov:n` for a need reason n, the term itself for `surprise` or `novelty`, and 0 for a moved card with no positive named term (then the field is false). The right-hand side is exactly the slot's `margin` (asserted on every real composition). The default card's own terms stay in its score, as specified.
- **Not moved:** null. That covers default picks, `breadth-floor` (a move the floor refused), due revisits and unpersonalised sessions. It is on every pick and every slot (`slots`, `sessionPlan`, sandbox `composed.picks` and `composed.slots`).
- **Tests (12):** (a) true, one-need move; (b) true only through need + cov (the larger single term is below the margin); (c) false, a two-need move (build + breadth), named for the larger term, with a control: switching build off makes the same move true; (f) the equality edge, exact in floats (base 0, no costs), expects true since model-v0.4.4; (d) due revisit null; (e) on every CASE composition of all four session policies, the field equals the spec formula recomputed from the trace (with ≥ since model-v0.4.4), slot and pick agree, and non-moves (breadth-floor included) are null.
- **Mutation check** (each applied to a scratch-backed copy, then restored): single max term only, need without cov, the comparison flipped, false instead of null for defaults, ≥ instead of > (model-v0.4.2), the margin before cost, the reference without cov, edpbase computed from v1 instead of v3, β ≥ 0 accepted, the winner row dropped. Every one fails at least one test. ≥ was caught only by fixture (f). At model-v0.4.4 (W-2008) the list gains **> instead of ≥**: applied to composer-session.ts's `carries` line, fixture (f) fails (the only test that does; (e) recomputes the same operator from the same values, so it agrees with either). Applied to sandbox-reference.mjs alone, it fails nothing: no sandbox document hits an exact tie, so test 9's drift check cannot tell the operators apart. The reference's operator is held only by reading it against this note.
- **Winner in candidates (a fix the variant exposed):** test 9 crashed on edpbase because the winner was not in the slot's `candidates` (the top 10 by score plus the default card). Under a flat base, the best *eligible* departure can rank below 10 ineligible cards (stretch-blocked or over budget), and its row (terms, gain, addr) was missing. The winner is now appended when it is missing. Test 10 shows this never happened for the three existing policies on the pinned inputs. It could happen there on other inputs, and if so it adds a row and changes no pick.

### 9.4 Open

- **Equality edge: RULED, built at model-v0.4.4 (W-2007 → W-2008).** The VP ruled ≥ (record §7; my O7 "> is the cautious side" not adopted, O8 rounding accepted as residue, O9 unchanged), and it is built as in 9.3. My original note, kept for the record: §5 says "greater than", and that is what was built. But when the reason's value equals the margin exactly, removing the reason leaves the winner tied with the default card, and a tie keeps the default, so the reason did carry the move. By §5's own justification, ≥ is the honest test. Strict > errs towards false, the conservative side for the K5 copy gate. In floats an exact tie needs exact arithmetic (fixture (f): base 0, no costs). Changing to ≥ is one character plus fixture (f)'s expected value. It is the VP's call.
- **β (applied-scientist-personalization, W-2004):** replace the placeholder (9.2). After that, a layout probe may report the resulting departure shares (composition fields only, §8.4 rules).
- **K5 (personalization-eval):** the share of served moved cards with `reasonCarriesMove` false is now readable from every session trace (`steps[].slots[0]` where `moved`). Measuring it is eval's job, not mine.
- **`npm run test:personalization`** now takes about 9 s (composer-session.test.mjs is about 3.7 s, of which test 10 is about 0.9 s). §7 O-2's budget concern grows.

### 9.5 For the browser port and the precompute (hq-engineer, personalization-engineer). I did not touch src/ or tools/

1. **New policy id** `gam-session-v3-edpbase`: in `meta.policies.all` (last) and `meta.policies.session` as `{ variant: "v3-edpbase", off: [] }`. `compare --set=all` gains one row (the HQ "main" set is unchanged at 7). `src/app/hq/personalization/Personalization.tsx` line 273 names the three older session policies.
2. **meta:** `meta.session` gains `"v3-edpbase"` (coefficients), `edpBaseEdits` ([{target, path, from, to, reason}], one row) and `sandboxVariants` ({v1: "gam-session", v3: "gam-session-v3", edpbase: "gam-session-v3-edpbase"}). `meta.model.composerSession` gains `edpBaseEdits` and `coefficients["v3-edpbase"]`.
3. **sandbox:** `--variant=edpbase` is accepted. The document has `variant: "edpbase"`, `policy: "gam-session-v3-edpbase"`, `session.coefficients` = v3 with `base` = β, and, only in this document, `session["v3-edpbase"]` and `session.edpBaseEdits`. The v1 and v3 documents keep their shape, except that every pick and slot gains `reasonCarriesMove`. Places that know only v1|v3: `src/lib/hq-personalization.ts` lines 38 (the `policies.session` type: `variant: "v1" | "v3"`, now also `"v3-edpbase"`), 93 and 134 (`parseSimRequest`); `src/lib/hq-personalization-sandbox.ts` line 34 (`variant: "v1" | "v3"`) and `codeDiff`, whose non-v1 branch writes `COMPOSER_SESSION.edits` rows. For edpbase it must write the `edpBaseEdits` row instead (from = the v3 value, 1.0), and any other dragged coefficient is not an edpbase edit under the VP record §2.4. `src/app/hq/personalization/ComposerLab.tsx` lines 18, 233, 362, 401; `tools/hq-lab-precompute.mjs` line 76 (`SANDBOX_VARIANTS`). The VP record says the lab "may gain the variant later" and that the readout does not need it.
4. **Trace field to port:** `reasonCarriesMove` on each recomposed pick and slot. Compute it in the `wouldMove` branch, after the reason is named. Sum the winner's terms whose name is in [`need:<reason>`, `cov:<reason>`] (or [`surprise`] / [`novelty`]), left to right in term order, then compare with **`>=`** (greater than or equal, not strictly; model-v0.4.4, W-2008, VP record §7) against `best.score − default.score`. Otherwise it is null (sim/sandbox-reference.mjs `recompose`). Do not port it as `>`: no sandbox document hits an exact tie, so the drift test would not catch it (9.3).
5. **Candidates:** a slot may now list one more candidate (the winner, when it ranks below the top 10).
6. **Failing until synced:** in tests/hq/personalization-sandbox.test.mjs, "drift after a drag" (the port's picks lack `reasonCarriesMove`) and "precomputed: the committed sandbox documents are the CLI's output" (stale). `node tools/hq-lab-precompute.mjs --check` reports STALE (69). Regenerate after the commit, as in §6. The other 11 `test:hq` failures also fail at 702e4588 with my files reverted (bt.mjs, room ids, eval hashes/index, releases), so they are unrelated.
