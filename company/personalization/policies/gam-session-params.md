# Session composer parameters (composer-v0.3-session, model-v0.3.1)

owner: applied-scientist-personalization (Juno) · date: 2026-10-20 · board: W-1995 · status: reviewed numbers, UNSCORED, not frozen
reviews: company/personalization/policies/gam-session-build-note.md §5 · code: company/personalization/model/model.ts §4b (`COMPOSER_SESSION`)
change line: company/decisions/2026-10-16-personalization-model-v0.md, row `model-v0.3.1`
reference: company/personalization/reference/edp-orchestrator/src/orchestrator-inline.js (`makeModulesV1`, `EDITS_V3`, `compose`)

## How these were chosen

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
