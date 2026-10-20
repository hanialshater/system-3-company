# Session composer `base`: keep it in v1/v3, score one EDP-base variant beside them (W-2002)

owner: vp-personalization (Mateo)
date: 2026-10-20
run: vp-w2002-1020 · board: W-2002 (raised by applied-scientist-personalization, W-2000 "Routed" 1)
status: **decided (offline only).** Nothing is served, deployed or committed by this record. Serving still needs every gate in company/decisions/2026-10-20-founder-edp-faithful-personalization.md and company/engineering/edd/EDD-016-session-composer-serving.md §10.
class: product (objective and constraints of the session composer; keep/kill comparisons written before any result)
inputs read: company/personalization/policies/gam-session-params.md (W-2000 section, "Routed" 1, sensitivity table); company/personalization/policies/gam-session-build-note.md (§2, §3 `base·rank` row, §8); company/roles/memory/applied-scientist-personalization/2026-10-20-as-w2000-1020.md; company/decisions/2026-10-20-founder-edp-faithful-personalization.md; company/personalization/model/model.ts §4b (`COMPOSER_SESSION.v1.base`, `edits`, `sessionCoefficients`); company/personalization/model/sim/composer-session.ts line 180 (how `base·rank` is computed); company/personalization/model/sim/simulate.mjs (`SESSION_VARIANTS`); EDD-016 §4.2, §10.
not read: any recall, score, `simulated` or `groundTruth` field, any `compare` output. No session readout or criterion exists yet.
rules: independence rule (company/ceo-office/2026-10-16-personalization-org-proposal.md §2): I set the objective, constraints and keep/kill comparisons; I write no number, no code, no criterion and no readout.

## 1. What the question really is

`base` in the session composer is `base × rank(l)`, where rank is 1 for the next default-order card and falls linearly to 0 over the unshown eligible default list (composer-session.ts line 180). At 1.0 it equals phase A's `COMPOSER.weights.defaultRank`.

`base` is **not the holdout.** The readout's holdout is the `default-order` policy arm, which is head-of-product's default order (company/personalization/policies/default-order-rule.md, `defaultOrderPolicy` in sim/composer.ts). Changing a candidate's `base` does not touch that arm. Every session variant is compared against the same, byte-identical default order whatever its `base`. What `base` does control is **how far a candidate drifts from the default order**: how much need pull a departure must carry to leave it. That is a product constraint (mine), which is why the scientist was right not to move it as a tuning number.

So the choice is about drift, not about the comparison. At 1.0 the gradient (median gap .15, p90 .27 at the blocked slots) is several times a typical primary need pull (.18 to .21), so the composer rarely spends two picks on two different needs. EDP's need widgets carry a base spread of about .1 of a primary pull (gam-session-params.md "Routed" 1), so in EDP the needs decide the order and the base mostly breaks ties.

## 2. Decision

**Option 3: keep `base` 1.0 in the existing variants, and add one separate variant to be scored, `gam-session-v3-edpbase`.**

1. `gam-session`, `gam-session-v3` and `gam-session-no-cov` keep `base` 1.0. No number changes in them.
2. A new variant `gam-session-v3-edpbase` = v3 (the current v3 edits, unchanged) plus one edit row `["session", "base", 1.0, β, reason]`.
3. **β is applied-scientist-personalization's number**, set by this rule, written before any result: β is the EDP ratio of need-widget base spread to a typical primary pull (about .1, from orchestrator-inline.js `makeModulesV1`), times our typical primary pull (onRem × median need, about .18 to .21). It must be read off EDP and our need medians, not off a layout probe or any recall field. The sensitivity table's `base .5` row is not a candidate value. β must be > 0 (`checkModel` requires it), so the default order stays the tie-break among cards with equal need terms. That is "an EDP-shaped flat prior with the default order as tie-break". My expectation, which does not bind the scientist: β lands near .02.
4. Nothing else differs from v3: the 1-in-3 anti-bubble floor, stretch readiness, stated-subject and less-of-this filters, due revisits first, surprise and novelty gated off, attentionCost, slotDecay, addrUse, onRem and onCov are all v3's.
5. A new trace field on every moved slot, for every session variant (spec in §5): `reasonCarriesMove`.
6. This is the **only** variant this decision adds. No further session variant enters this readout cycle after any result, whatever it shows (O4).

### Why not the other two options

- **Keep only (option 1).** The founder asked for a faithful EDP implementation. "First picks across needs" is one of EDP's main behaviours (8 of 8 personas), and at base 1.0 it forms in only 16 (v1) and 43 (v3) of about 170 moving sessions. If we kept only base 1.0, the readout could not tell whether EDP's shape helps recall. All it could say is that a default-anchored composer with EDP machinery does or does not.
- **Lower base inside v1/v3 (option 2).** That would remove the one contrast that isolates the anchor. Every W-2000 number was reviewed at base 1.0, so their reasons ("below a typical unaddressed pull", "above the slot-4 bar") would change meaning at once. v1 would also move further from gam: since attentionCost .06 it is already not "gam plus session machinery only". A separate variant changes exactly one number from v3, so `v3-edpbase` against `v3` measures the anchor and nothing else.

## 3. Constraints the new variant must meet (objective owner)

- **Drift.** The floor still forces the next default-order card after two consecutive moves. So at least 1 in 3 served new cards in a personalised session is the default-order card, whatever β is. The off control still gives the default order exactly (EDD-016 G5).
- **Anti-bubble.** The breadth need and the floor are unchanged. The readout must also show the variant does not narrow the served subject mix compared with default-order (§4 K4). A variant that cannot be shown not to narrow is not recommended for serving.
- **Reason honesty.** At base 1.0 the default gradient soaks up most small pulls, so a move usually happens because one need's term is large. With a flat prior, a departure can win on several small terms, none of which would move the card alone. Its "why this pick" line would then name a cause that did not cause the move. With β small, the move bar is attentionCost + slotDecay × slot, and phase A's `moveThreshold` role (a move must be worth a reason) rests on that bar plus the reason rule. So every moved slot must record whether the named reason alone carries the move (§5). No variant goes to learner-visible copy while any served move fails that check.
- **Comparison.** Every variant is compared with the same default-order arm (head-of-product's). This record does not change, and cannot change, what default-order is.

## 4. Keep/kill comparisons for the session readout (W-1996 / W-1988), written before any result

This list is mine (keep/kill authority). The criterion, its statistics, cells and margins are personalization-eval's and frozen by eval. Where I name a margin below, I mean the one eval freezes. I ask that δ_min be no weaker than phase A's 0.01. Arms: `default-order`, `gam-session`, `gam-session-v3`, `gam-session-no-cov`, `gam-session-v3-edpbase`, plus whatever context arms eval keeps. Measure: simulated recall from the independent learner.

| # | Comparison | Role | Rule I will apply |
|---|---|---|---|
| K1 | each session variant vs `default-order`, base cell | **gate** | Kept for the serving path only if it passes eval's frozen criterion against default-order. FAIL kills that variant for serving, reported unedited. |
| K2 | each session variant vs `default-order`, every persona, base cell and any harm cell eval names | **veto** | A clear loss for any persona (upper 95% end below 0) kills the variant, even if K1 passes. |
| K3a | `gam-session` vs `gam-session-no-cov` | attribution (cov terms) | Used only to choose among K1/K2 passers. The more complex variant is preferred only if its direct paired contrast with the simpler one is ≥ δ_min with no persona clear loss in that contrast. Otherwise the simpler one is kept. |
| K3b | `gam-session-v3` vs `gam-session` | attribution (v3 synergies) | same rule |
| K3c | `gam-session-v3-edpbase` vs `gam-session-v3` | attribution (the anchor, this record) | Same rule. A tie goes to `gam-session-v3` (base 1.0, less drift). |
| K4 | served subject mix of each variant vs `default-order` (a non-circular measure of the served order, as eval defines and freezes it, e.g. the share of served new cards outside the learner's most-studied domain) | **guardrail** | A variant narrower than default-order beyond eval's frozen margin is not recommended for serving. If eval freezes no such measure, I record anti-bubble as unmeasured and recommend nothing for serving from this readout. |
| K5 | share of served moved cards with `reasonCarriesMove` false, per variant | **copy gate**, not a recall verdict | Above 0: the variant may not go to learner-visible copy until the reason rule is fixed and re-checked. It may still be kept offline. |

Not used for keep/kill, reported as context only:
- the circular coverage and diversity diagnostics (labelled "circular: diagnostic only", never a pass score);
- engagement (a guardrail, never a term);
- vs `gam` (confounded by attentionCost .06; W-2000);
- vs `draft-rules` and `random`;
- non-base cells other than eval's named harm cells;
- any contrast chosen after results (exploratory, and it cannot keep a variant).

If no variant passes K1 and K2, the session composer is closed for serving. Re-tuned numbers do not enter this readout. A new candidate needs a new frozen criterion and a note to the founder. Several passers are resolved by K3 in the order a, b, c. The survivor then still needs K4 and K5 before any serving brief names it.

Order of work: the variant is built and its number set before eval freezes the criterion. EDD-016 G0 needs the frozen single file's hash, and §4.2 needs the readout to score exactly what would serve. If the variant is not built when eval is otherwise ready to freeze, eval freezes without it, and I withdraw it in writing here. Eval does not wait without limit.

## 5. Specs routed (I do not edit model.ts)

- **learner-model-engineer** (variant and trace field): add `gam-session-v3-edpbase` to `SESSION_VARIANTS` (sim/simulate.mjs) as v3 + one `["session", "base", 1.0, β, reason]` edit row, kept apart from `COMPOSER_SESSION.edits` (for example a named `edpBaseEdits` list, `sessionCoefficients("v3-edpbase")` = applyEdits(v3, edpBaseEdits)), so v3 stays byte-identical. Not in model.ts `POLICIES` (build note §1). Add `reasonCarriesMove` to every moved slot in the session trace for all session variants: true iff the named reason's term value (the sum of the `need:`/`cov:` terms the reason names) is greater than `score(winner) − score(default card)`, so that without it the default card would have won that comparison. Add tests: the variant's coefficients equal v3's except `base`; existing policies are byte-identical (golden, c2 fingerprint); `reasonCarriesMove` is computed on a fixture where it is false and one where it is true. The HQ sandbox variant list (`--variant=v1|v3`) may gain the variant later (hq-engineer). It is not needed for the readout.
- **applied-scientist-personalization** (number): set β and its "guess" reason in the edit row by the rule in §2.3, record the derivation in gam-session-params.md, and add a model-version row. Do not read any recall field, and do not use a layout probe to pick β. A probe may only report the resulting layout afterwards.
- **personalization-eval** (criterion, independent): put the arms and the K1 to K5 roles of §4 into the session criterion before it freezes (W-1996, W-1988), or record in the criterion why one cannot be measured. Nothing in this record binds eval's statistics.

## Objections

They travel with this decision (numbered as §6).

- **O1 Drift from the default order (head-of-product's interest; raised by me on their behalf).** With β near .02, the personalised order of new cards is mostly sorted by need, and the default order decides only floor slots and ties. **Answer:** this is offline only. The default order stays the comparison arm and the exact result of the off control. K3c's tie rule prefers base 1.0. Any serving brief that names `v3-edpbase` must go to head-of-product for a read of copy volume, because more moved cards means more "why" lines. head-of-product's ownership of the default order is untouched.
- **O2 Anti-bubble floor.** A flatter prior moves more cards, and needs come from history, so the order could narrow towards what the learner already studies. **Answer:** the floor and the breadth need are unchanged, and K4 is a guardrail that can block serving. Without a measure, nothing serves.
- **O3 The move threshold and reason honesty.** Phase A's moveThreshold existed so that every move was worth a stated reason. A flat base leaves that job to attentionCost .06 alone, which since W-2000 is below phase A's .1. **Answer:** `reasonCarriesMove` (§5) and K5. Copy waits until the reason is the cause on every served move. I do not raise attentionCost myself. Numbers are the scientist's.
- **O4 Forking paths.** A variant added after layout probes, before results, is still a degree of freedom. **Answer:** nobody has seen a recall number. β comes from a fixed EDP ratio, not from the probe. There is one variant and no more this cycle (§2.6). The comparisons are fixed here, before any results. Eval's multiplicity treatment is accepted as frozen.
- **O5 My standing objection (founder decision record).** The one-card GAM failed phase A at +0.001. More departures make any effect bigger in either direction, not more likely positive. **Answer:** K2's harm veto applies per persona, and a FAIL is reported unedited. Faithfulness is the founder's goal. The readout decides what serves.
- **O6 applied-scientist-personalization (W-2000): v1 is no longer gam plus session machinery.** **Answer:** accepted. For that reason vs-gam is context only in §4, never a keep/kill comparison.

## 7. Addendum (W-2007, 2026-10-20, run vp-w2007-1020): the equality edge of `reasonCarriesMove` is ≥

Raised by learner-model-engineer (company/personalization/policies/gam-session-build-note.md §9.4; company/roles/memory/learner-model-engineer/2026-10-20-lme-w2003-1020.md). Ruled before any session result exists: no `compare` has been run on the session variants, and I read no recall, score, `simulated` or `groundTruth` field for this ruling. Read: composer-session.ts (the `wouldMove` line and the `carries` line), sandbox-reference.mjs (`recompose`), composer-session.test.mjs test 12 (e) and (f).

**Ruling: ≥.** For a moved card, `reasonCarriesMove` is true iff the named reason's term value (as §5: `need:n + cov:n` for a need reason n; the term itself for surprise or novelty; 0 if no positive named term) is **greater than or equal to** `score(winner) − score(default card)` (the slot's margin). §5's "is greater than" is replaced by this.

Why: §5 defines the field by its purpose, "so that without it the default card would have won that comparison". The composer moves only if the departure's score is strictly greater than the default card's (`wouldMove = best.score > def.score`, composer-session.ts). Remove a reason whose value equals the margin and the departure only ties, and a tie keeps the default card. So at equality the reason did carry the move, and ≥ is the only test that matches the definition. The rule is tied to the composer's tie rule: if the move test ever becomes `≥`, this must become `>` in the same change.

Spec routed (learner-model-engineer; I edit no code): `>` to `>=` in the `carries` line of composer-session.ts and in sandbox-reference.mjs `recompose`, with both doc comments ("strictly greater" → "greater than or equal to"); test 12 (e)'s recomputation uses `>=`; fixture (f) now expects `true` (equality carries); the mutation check gains "`>` instead of `≥`", which (f) must catch; build note §9.3 and §9.4, and §9.5 item 4 (the port spec for hq-engineer, W-2006: compare with `>=`, not strictly); the model-v0.4.2 change-line row records the rule (a new version row or an amendment of the uncommitted v0.4.2 row is the engineer's call). Test 10's pin is unaffected (it drops the field). This must be built before eval freezes the session criterion, as with the variant itself (§4, last paragraph).

Objections (travel with this ruling):

- **O7 `>` is the cautious side for the K5 copy gate (learner-model-engineer, §9.4).** **Answer: not adopted.** Caution in K5 is about never letting copy name a reason that did not cause the move. At equality the reason did cause it, by the composer's own tie rule, so `false` there is a wrong label, not a cautious one. A field whose definition contradicts its stated meaning would also invite a "fix" after results, which O4 forbids. The cost of the change is one exact-arithmetic edge; in real floats equality is rare (fixture (f) needs base 0 and no costs), so this ruling is about the field meaning what it says, not about moving K5.
- **O8 Float rounding (mine).** The reason's value (a left-to-right sum of named terms) and the margin (a difference of two scores) are computed along different paths, so a true tie can round either way, and so can a near-tie. Either operator mislabels some rounding-level near-ties. **Answer:** accepted as a residue under either rule. ≥ is the faithful test up to rounding. I set no tolerance (that would be a number, and K5 is read on the field as built). Eval may report near-ties as context if it chooses; nothing here binds eval.
- **O9 Necessity on the score comparison only (mine).** The test asks whether the default card would have won against this departure. It does not ask whether, with the reason removed, a different departure would have won, or whether the departure would still pass the attention budget (`gain > attentionCost`). **Answer:** unchanged. A different departure winning does not make the named reason less the cause of *this* card's move. The budget path can only turn a `false` into a carried move, so ignoring it errs towards `false`, the safe side for K5. Not worth a new spec this cycle.

Board: W-2007 done; the build item goes to learner-model-engineer.
