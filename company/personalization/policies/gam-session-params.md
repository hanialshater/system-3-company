# Session composer parameters (composer-v0.3-session, model-v0.4.1)

owner: applied-scientist-personalization (Juno) · date: 2026-10-20 · board: W-2000 (this review), W-1995 (the first) · status: reviewed numbers, UNSCORED, not frozen, not committed
reviews: company/personalization/policies/gam-session-build-note.md §5 and §8 · code: company/personalization/model/model.ts §4b (`COMPOSER_SESSION`)
change lines: company/decisions/2026-10-16-personalization-model-v0.md, rows `model-v0.3.1` and `model-v0.4.1`
reference: company/personalization/reference/edp-orchestrator/src/orchestrator-inline.js (`makeModulesV1`, `EDITS_V3`, `compose`), edp-engine.js (`compose`, cost .06)

## W-2000 re-review at model-v0.4.0 → model-v0.4.1

### How these were chosen

- **Not from any recall result.** I ran no `compare` and read no recall, score, `simulated` or `groundTruth` field. Probes (scratchpad, not committed) call `runEpisode({trace: true, days: 7})` and read only `kind`, `session.slot`/`id`, `moved`, `reason`, `personalised`, and the slot trace (`candidates` with `terms`, `gain`, `note`, `addr`; `constraint`, `margin`, `defaultScore`, `remainingBefore/After`).
- **Numbers from EDP's numbers.** Each value below is a ratio read off EDP's own widgets or engine and converted to our units. I chose them before the probe; the probe checks the layout, it did not pick the values. The only alternatives I probed were one-at-a-time reversions (sensitivity table), and none was adopted from it.
- **Learning science:** still nothing on within-session order for self-contained lessons (see the W-1995 section). Every value stays "guess".

### EDP's own target shapes (EDP `compose()` run headless on its 8 personas)

- inline `compose` (no budget, 6 slots) and EDPEngine `compose` (budget, cost .06), v1 and v3.
- **First picks across needs:** in 8 of 8 personas slots 0 to 2 are primaries of different problems (e.g. comparison_shopper v3: comparison_card F41, customers_chose, price_history F45, brand_story F33).
- **Synergy follow-ons (v3):** 1 to 2 per session (size_anxious 2, comparison 2, price 1, outfit 2, paralyzed 2, returner 1, confident 0, browser 1; mean 1.4), at slots 1 to 5, each after a widget that covered part of the need. The follow-on's cov term (.2 to .55) is of the size of the remaining-need pulls of other primaries, and its gain (resolvable need left) is .09 to .41.
- **Budget:** stops filling in 3 of 8 sessions (v1) and 2 of 8 (v3), always at the last slot, always the low-need personas (confident_buyer, browser_lurker, outfit_seeker).
- **Residual need is not EDP's chain driver.** A primary (addr ~.5) almost uses up a ~.5 need; the second card on a problem comes from on_cov synergy, or from a high need (paralyzed F51 .67). So "leftover need pulls .02 to .05, under the bar" is EDP-like; what was not EDP-like was that the synergies were too weak (×.35 coverage) and the bar too high to let them act.

### The numbers (model-v0.4.0 → model-v0.4.1)

| Number | Was | Now | Why ("guess"; one EDP ratio each) |
|---|---|---|---|
| addrUse | .35 | **.45** | EDP widget addr is need mass. Its 18 need widgets' primary addr has median .45, their secondary addr median .20. Our relational addr is 1 (primary) or .5 (partial): .45 maps them to .45 and .225, EDP's two medians. One primary pick about uses up a median repair (.41) or build (.46) need, as EDP's .5 widget on a .5 need does; a p90 need (.6 to .7) keeps .15 to .25. |
| attentionCost | .1 | **.06** | EDP's cost (edp-engine.js). Since model-v0.4.0 the budget's gain is EDP's need mass, so EDP's number applies in the same units. As a score cost, in need units the bar is .06 / mean onRem .39 = .15; EDP's own bar (defaults' base .30 to .45 over need widgets' .05 to .20, ≈ .3, over median on_rem 1.75) is ≈ .17. **Cost:** v1's slot-0 bar is no longer phase A's `moveThreshold` .1, so v1 is no longer "gam plus session machinery only". I accept that for the founder's goal (EDP behaviour); personalization-eval should know it when comparing v1 with gam. |
| slotDecay | .02 | **.01** | EDP's need widgets' slot_decay averages .058, defaults' .035: a .023 per-slot differential on a median on_rem of 1.75, .013 per unit of need mass. Ours in those units is slotDecay / .39, so EDP's own would be .005. .01 keeps a 2× O2 premium (later slots rest on assumed coverage), down from 4×. It no longer ends a chain by itself: the budget does, as in EDP. |
| v3 build.onCov | +.15 | **+.28** | EDP's 8 v3 synergy widgets carry on_cov at .50 to 1.43 of their own on_rem, median .71. .71 × onRem.build .4 = .28. After one addr-1 build pick (coverage .45): .28 × .45 = .13, below a typical unaddressed primary pull (build .18, repair .21), so other needs still come first, and above the slot-4 bar (.06 + .04 = .10). |
| v3 repair.onCov | +.15 | **+.35** | Same rule: .71 × .5 = .35; .35 × .45 = .16 after one repair pick. |
| base, onRem, v1 onCov, sessionSize | | unchanged | See the W-1995 section. base: see "Routed" below. |

**Where a chain now ends (EDP's mechanism):** a follow-on card clears the score bar through slot 4, but must also resolve more than .06 of need mass. After one primary on a median need nothing is left, so the budget refuses a pure synergy card ("a weak departure"). After a primary on a high need, or after a partial (addr .5) card, there is room for one follow-on. The 1-in-3 floor caps a run of moves at 2 anyway.

### Layout (6 personas × seeds 1 to 3 × 7 days; composition mechanics only, not a result, says nothing about recall)

Departure share of served personalised new cards, by session slot 0 to 4:

| Build | gam-session (v1) | gam-session-v3 | gam-session-no-cov |
|---|---|---|---|
| model-v0.4.0 (before) | .43 .11 .02 .00 .00 | .42 .11 .03 .01 .00 | .44 .13 .04 .00 .00 |
| **model-v0.4.1 (now)** | **.51 .15 .03 .01 .00** | **.53 .25 .07 .03 .00** | .53 .19 .04 .02 .00 |

| Count (v3 unless named) | before | now |
|---|---|---|
| same-reason chains of 2 (consecutive moves for one need in a session) | 1 | **22** |
| synergy picks (moved, positive cov, margin < cov), by slot | 0 0 1 1 0 | **0 26 7 1 0** |
| sessions with a synergy pick / sessions with ≥ 1 move | 2 / 137 | **34 / 171** |
| sessions with ≥ 2 moves (first two for different needs): v1 | 10 (10) | 16 (16) |
| sessions with ≥ 2 moves (first two for different needs): v3 | 11 (10) | 43 (16) |
| slots where the budget changed the pick, by slot | 0 0 0 0 0 | **0 1 7 5 4** (11 sessions of 262; every persona but the crammer) |
| v1 budget changes | 0 | 0 (v1 has no positive cov, so its departures always resolve need) |
| why a personalised v3 slot stayed default, slots 0-4: floor / stretch / budget / score | 20/7/7/1/0 · 23/26/15/6/3 · 0/0/0/0/0 · 114/192/153/161/153 | 29/10/22/1/0 · 28/27/18/10/11 · 0/1/1/5/4 · 67/147/127/147/145 |

Served personalised cards per slot (v3, now): 262/246/181/168/160.

Against EDP's shapes: synergy follow-ons now form, one per chain, mostly at slot 1 (EDP: slots 1 to 5, mean 1.4 per session; ours 34 of 171 moving sessions, about .2). The budget now binds on weak departures at late slots, as EDP's does. **Not met: first picks across needs.** Only 16 (v1) and 43 (v3) of about 170 moving sessions move twice. The next bullet says why, and it is not one of the four numbers.

### Sensitivity (one number reverted at a time, v3; same probe)

| Reverted | slot shares | chains | sessions with synergy | budget sessions |
|---|---|---|---|---|
| none (shipped) | .53 .25 .07 .03 .00 | 22 | 34 | 11 |
| addrUse back to .35 | .52 .27 .08 .01 .00 | 24 | 31 | 2 |
| attentionCost back to .1 | .41 .14 .06 .01 .00 | 5 | 9 | 3 |
| slotDecay back to .02 | .52 .20 .04 .01 .00 | 14 | 19 | 6 |
| synergies back to +.15 | .51 .18 .06 .02 .00 | 4 | 8 | 0 |
| (not adopted) base 1 → .5 | .62 .35 .13 .05 .02 | 32 | 46 | 34 (v1 ≥2-move sessions 38) |

attentionCost and the synergy size matter most; addrUse mostly moves how often the budget binds (at .35 a primary leaves residual mass, so few follow-ons are refused).

### Routed (not changed here)

1. **base (the default-order weight) is now the main blocker, and it is a holdout decision, not a tuning one (vp-personalization).** In about a third of unconstrained personalised slots (436 of 1,230, v3) a traced eligible departure out-pulls the default card's need terms after cost, and loses only to the default-rank gradient: median gap .15, p90 .27. EDP's need widgets' base spread (.05 to .20) is about .1 of a typical primary pull (≈ 1.5); ours (base 1.0 over the whole list against pulls of .15 to .3) is several times the pull. base = `COMPOSER.weights.defaultRank` keeps the default order as the base and the holdout, which is why I did not move it. If the founder's "faithful EDP" goal is to include first picks across needs, base is the number, and it needs a decision on what the session holdout is (a probe at .5 doubles ≥2-move sessions). Board W-2002 (vp-personalization).
2. Unchanged from W-1995: `COMPOSER.addr` stays phase A input.

## W-1995 review (model-v0.3.1), kept as written

### How these were chosen

- **Not from any recall result.** I did not run `compare` and read no recall, score, `simulated` or `groundTruth` field. One slip: a grep for the version string printed part of a precomputed compare file (`src/data/hq-personalization/compare/returning-expert…json`), which showed phase A rows only. No number here uses it.
- **From the EDP reference.** I ran EDP's own `compose()` on its 8 personas with v1 and v3. Its needs were .25 to .72 and its addr .2 to .6, so one widget used up about half a need. v1 put one primary per need in slots 0 to 3 and filled the end with defaults. v3 added secondary widgets after the primaries: other needs' primaries came first, chain cards came later, and chains were 1 primary plus 1 to 2 secondaries.
- **From the mechanics.** I read `hq-cli run` traces (6 personas, seeds 1 to 3, the composition fields only) and ran a probe over the edit table (in the scratchpad, not committed). In our runs, need medians were repair .41, build .46, breadth .23 and stretch .27, with p90 between .40 and .70. The build note's "needs rarely exceed .5" is low for repair and build. addr is 1 or .5, so 97% of the (winner, need) picks zeroed that need. The builder's §4 (a) holds.
- **Learning science.** The evidence folder has no study of order within a session for self-contained lessons. Brunmair & Richter 2019 (interleaving helps only for similar categories) and the prerequisite-order direction (company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md) give no sign for any number here. So every value stays "guess".

## The numbers

| Number | v1 | v3 | Why |
|---|---|---|---|
| sessionSize | 5 | 5 | Unchanged. About 5 minutes at 60 s a card. EDP fills 6, but a shorter session puts fewer cards on assumed coverage (O2), and in v1 slots 3 to 4 already move on only 4 to 6% of cards. |
| base | 1.0 | 1.0 | Unchanged. It equals `COMPOSER.weights.defaultRank`, so the default order stays the base and the holdout. EDP's per-widget base has no counterpart here. EDP's v3 base lifts were chosen from EDP's own coverage numbers, so I did not port them (we may not tune that way). |
| onRem repair / build / breadth / stretch | .5 / .4 / .35 / .3 | same | Unchanged. They equal phase A `onRem`, so v1 differs from `gam` only by the session machinery, which keeps the comparison clean. |
| onCov.repair | −.2 | **+.15** (kept) | v1: EDP's v1 gives every primary a negative on_cov (ratio to on_rem −.36 to −.7). v3: kept, by the same scale rule as build (next rows). |
| onCov.build | −.1 | **+.15 (was +.3)** | **Changed.** Our cov term is onCov × coverage × addr, and after one addr-1 pick that is onCov itself. At +.3 a chain card outranked a typical unaddressed need (median primary pull: build .4 × .46 = .18, repair .5 × .41 = .21). That reverses EDP, whose synergy cards come after other needs' primaries (EDP returner_anxious: return_explainer, then fit_reassurance, then easy_returns_promise). At +.15 a chain card sits below those pulls and clears the move bar (.1 + .02 × slot) only up to session slot 2, so a chain is 1 primary plus at most 2 cards, EDP's chain length. The reason string is also corrected. addr is fixed from history for the session, so the second build card is another successor of a recalled concept, not a successor of the first card. |
| onCov.breadth | −.3 | **−.3 (row removed; was −.5)** | **Changed.** EDP's `EDITS_V3` adds synergies and base lifts and makes no overlap penalty stronger, so v3 should differ from v1 by complementarity only. Mechanically, −.5 could not stop a second breadth departure, because at −.3 its gain is already below 0. Its one effect was a bigger penalty on the default card when that card was in the covered other domain. That made leaving the default order easier, which works against breadth. Probe count: departures over a default card that carried a negative cov:breadth term fell from 137 to 75 when the row was removed. This is a mechanics count, not a result. |
| onCov.stretch | −.3 | −.3 | Unchanged. One stretch card per session (O8). |
| slotDecay | .02 | .02 | Unchanged; reason extended. Relative to the need terms it is about 3× EDP's per-slot gap between need widgets (~.06) and defaults (~.035). That is on purpose: later slots rest on assumed coverage (O2). It now has a job in v3, because it is what ends a chain (.15 − .1 − .02 × slot > 0 only up to slot 2). |
| attentionCost | .1 | .1 | Unchanged. It equals `COMPOSER.moveThreshold`, so slot 0 keeps phase A's move bar and v1 stays comparable with gam. The budget gate rarely binds (build note §4 b), and no number can change that, because the gate threshold and the score cost are the same number. See "Routed". |
| (inherited) COMPOSER.addr | 1 / 1 / .5, 1, 1 / .5, 1 / .5 | same | Not mine to move here. It is phase A input, and changing it would break `gam` byte-identity and `PHASE_A_MODEL_VERSION`. See "Routed". |

## What the change does, mechanically (probe, 6 personas × seeds 1 to 3 × 7 days; departure share by session slot)

- v1 (unchanged): .40 .13 .10 .06 .04
- v3 before (+.3 / +.15 / −.5): .34 .16 .23 .20 .14, with 30 chains of length 2
- v3 now (+.15 / +.15): .37 .11 .16 .11 .08, with 10 chains of length 2

v3 now differs from v1 by complementarity alone. Chain cards come after typical primaries, and slot decay ends them. These are compositions, not outcomes, and they say nothing about recall. personalization-eval scores both variants.

## Routed (not numbers; engine code is learner-model-engineer's)

1. **A session-only addr consumption scale.** EDP's addr/need ratio is about .5 to 1. Ours is 2 to 5, so one pick zeroes a need, the need terms act only on the first pick per need, and later slots move only through cov terms. A session coefficient such as `addrUse` (remaining −= addrUse × addr, guess about .35) would leave a residual need, as EDP does, without touching `COMPOSER.addr`. With it, the EDP gain (Σ min(remaining, addr)) could replace the score-based gain, and the budget gate would become EDP's real stopping rule instead of a check that is nearly always implied.
2. **The default card carries cov terms; EDP's default widgets do not** (`on_cov: {}` on every `type: 'default'` widget). Is that intended? It is the channel through which overlap penalties push the composer off the default order.
