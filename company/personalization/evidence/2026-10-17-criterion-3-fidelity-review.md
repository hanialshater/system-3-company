# Criterion 3 fidelity review (F3): the new parts of the judge's world against E3 and E1

owner: learning-scientist-personalization (Oskar) · run: ls-f3-1017 · date: 2026-10-17
board: W-1566 · brief: company/personalization/batches/2026-10-17-batch-4.md §F3 (anchor `#f3`); mail 20261017T083747688Z-vp-personalization-91217fdf
reader: **personalization-eval** (K4 answers every **blocking** row in writing: fixed, or refused with a reason; criterion 3 §10 item 2). Copy to vp-personalization.
status: **fidelity review, not a learner-facing claim and not a verdict on any policy.** I set no world value. Where a row names a number, it is either my E3/E1 range or arithmetic on the world's own equations (marked "derived"), offered so K4 can check its own fill; choosing the value is the eval's.

**Read:** criterion 3 in full (company/personalization/eval/2026-10-17-criterion-3.md, status draft); harness/c3 `world3.mjs`, `learner3.mjs` (and its diff against c2/learner2.mjs: one change, line 96), `reachable-oracle.mjs`, `harness3.mjs`, `README.md`; c2/world2.mjs `EPISODE2` and the E1 block (constants only); src/components/Feed.tsx (lines 24, 63–106) and src/kit/progress.ts `revisitDue`; src/components/DemoCard.tsx and src/lib/feed-index.ts (grep only: neither reads local progress). My E3 (…/evidence/2026-10-17-criterion-3-ranges.md), E1 (…/2026-10-16-criterion-2-ranges.md §3) and F1 rows B6, N7, O1 (…/2026-10-16-criterion-2-fidelity-review.md lines 30, 37, 45).
**Ran:** `node --test harness/c3/tests3.test.mjs` (14 of 14 pass). Scratch arithmetic in `node -e` on the learner's kept-share formula with E1 base constants (k 0.08, forgetShape 0.27, L9 factor 1, effective learnRate 0.66), no harness import, no episode.
**Not run, not read:** no arm, no oracle, no default-order or reference episode, no `run3.mjs` (not even `--plumbing`), nothing under harness/records/, no readout, no K3 report or reasoning beyond the criterion text.

## Summary

| # | Part | Departure | Mark | Could move an ordering Δ? |
|---|---|---|---|---|
| B1 | L11 `priorAgeDays` | Age only adds a starting deficit to a prior-known trace; under L8 it changes no rate past day 7. "Long-held" becomes "mostly forgotten", the opposite of E3 item 2 | **blocking** | yes, in the age cells and in the reachable oracle's refresh value |
| B2 | L11 fill of `priorRateMult` | E3's m row (0.22 / 0.036 / 0.009) is a constant-rate quantity; under L8's piecewise form it does not transfer as written; the placeholder's labels and its high 2 sit outside E3 | **blocking** | yes, it sets the refresh value in every cell |
| B3 | N7 cells | Once E3 fills the rows, criterion 2's L4 (m 1, age 0) leaves the cell list; E3 §4 item 3 asked for it as an outer cell, and the O1 split needs it to answer N7 | **blocking** | it is the cell that shows how much of the gain rests on L4 |
| B4 | Interleave cell vs Feed.tsx (D1) | Feed.tsx counts `i % 3 === 1` over catalogue positions, completed lessons included; a returning learner meets the fetched revisits among completed cards before the first new one, close to `first`. §2.0 reason 1 for the base cell depends on this | **blocking** | yes |
| N1 | L11 refresh gain | Modelled only as decay avoided (clock reset); no stabilisation term; zero on day 0 by construction | note | yes, in size |
| N2 | `predict` ignores kept share | A known concept predicts right at 1 − slip whatever its kept share (bites only with B1's deficit) | note (resolves with B1) | via the reachable oracle's π posterior |
| N3 | `revisitSlotCost` | Form fits E3 row 1a; fill 0.15 / 0.3 / 0.5 is below the placeholder's whole range; interleave barely reads it | note | small in interleave, larger in `first` |
| N4 | `revisitStopScale` | Per-card form matches E3 row 1b's unit; high 1.5 vs E3 2.0; the miss-versus-hit dependence is not modelled | note | small |
| N5 | `slots` | Fill 4 / 8 / 15 moves the base from 12 to 8; S must be recomputed (§1.4 already says so) | note | yes, through the number of new picks |
| N6 | One-at-a-time sweep of the price rows | Does not reach the joint corners of the analytics rows (high stop × short session × cost) | note | only outside the base cell |
| N7 | E3 placement row (encoding × 0.9 / 1.0 / 1.1) | Not in the world; base 1.0 = absent, so consistent at base; no cells | note | not within a placement |
| N8 | D2, D3, D4, per-visit queue | Small or none | note | D2 slightly; D3 and D4 no; per-visit not under daily returns |
| N9 | Reachable oracle, inputs | Matches §I.3 minus `fixedDue`; nothing hidden read (code read and tests RS1–RS8 pass) | note (no departure) | — |
| N10 | Reachable oracle, the 14-day horizon and the age priorAgeDays + 6.5 | Both consistent with the world and with E3's 14-day frame; one Jensen caveat if ages ever vary | note | small |
| N11 | O1 arms | Under an E3-filled world `oracle-refresh` gains mostly by *skipping* known lessons, not refreshing them; the readout must say which | note | it changes how Δ_refresh is read, not its value |
| N12 | O1 counting by origin | Adequate for N7 (the refresh side is nearly all prior-known), given B3; the "episode" counter also counts pre-history-learned concepts | note | — |

---

## 1. L11 (F1 N7): the prior-known trace as built

**As built** (learner3.mjs line 96, 99–102): a prior-known concept starts with `{ at: startTime − priorAgeDays·DAY, mult: priorRateMult }`, and kept = exp(−k·kf·mult·f(a)), with f(a) = min(a, 7) + shape·max(0, a − 7) (criterion 2 L8). Study of a known concept resets the clock and keeps `mult` (line 170). A revisit retrieval resets it and multiplies `mult` by the strengthening factor (line 115). A known concept predicts right at 1 − slip, whatever its kept share (line 165).

### B1 (blocking). `priorAgeDays` can only add a deficit, and that runs against E3 item 2

Two facts about the form:
1. **Past day 7, age changes no rate.** Under L8 the rate after day 7 is k·m·shape whatever the age. A trace aged 30 or 90 days at the episode start loses the same share over the episode (derived: m 1, kept over the 20 days from the start to the H = 7 read = 0.649 at age 30 and at age 90). Jost's law and the power fits (E3 §2a, [R]/[F] via E1) say the opposite: an older trace decays more slowly. This is the limit my E3 §2a "note on the world's form" named; L11 does not lift it.
2. **What age does do is lower the starting kept share.** Derived, E1 base: kept at the episode start = 0.348 at age 30 and **0.095 at age 90** for m = 1 (the `priorAgeDays-high` cell as placeholdered), 0.555 at age 90 for m = 0.25. So in that cell a "prior-known" concept is about 90% forgotten on day 0, yet predicts right 90% of the time (N2).

Against the evidence: E1's prior-knowledge rows (E1 §3 and table line 131, "P(knows a lesson's concept)") are rates of **current** knowledge, read from not-studied baselines (Fazio 2010 [F], others). E3 item 2 is about knowledge that is *held* and stable. Adding a starting deficit on top of a current-knowledge rate double counts the forgetting that had already happened before the baseline was read, and it raises the refresh value (studying restores the deficit). Derived refresh-to-new ratio at mid-episode (day 6.5, read at day 20): m 1 age 0 → 0.20; **m 1 age 90 → 1.33**; m 0.12 age 90 → 0.62; m 0.036 age 90 → 0.22. E3's range is 0.03 / 0.12 / 0.8, with "medium confidence that the ratio is well below 1 for knowledge held for months". The age-90 cell at m 1 sits above E3's high and moves in the direction E3 argues against.

**So L11 as built cannot represent E3's long-held stability through age.** It can represent E3's decay range through `priorRateMult` alone, at age 0 (B2). What would fit E3 (the choice is the eval's): (a) drop `priorAgeDays` as a sweep axis (keep 0) and carry N7 through `priorRateMult`; or (b) keep age but start a prior trace at full kept share at the episode start and let age set only its rate (an age-dependent rate, the Jost direction); or (c) keep the cell and label it in the readout as "decayed prior knowledge, outside E3 item 2", with the predict law made consistent (N2). Whatever is chosen, the reachable oracle's `refreshPrior` (reachable-oracle.mjs line 54) uses the same age, so it moves with the fix.

### B2 (blocking). Filling `priorRateMult` from E3: the m row does not transfer as written

E3's m row (0.22 / 0.036 / 0.009) was derived at a **constant** rate over 14 days (exp(−0.08·m·14) = kept). The world's rate is piecewise (L8). The quantity that transfers is E3's **kept row** (0.78 / 0.96 / 0.99 of the increment kept over the 14-day episode, no revisit). Mapped through the world's own f (derived, k 0.08, shape 0.27, L9 factor 1):

| E3 kept over 14 d | E3 m (constant rate) | equivalent `priorRateMult` at age 0 | at age ≥ 7 (rate k·m·shape) |
|---|---|---|---|
| 0.78 (E3 low) | 0.22 | **0.35** | 0.82, but then B1's deficit applies (kept 0.15 at the start at age 90) |
| 0.96 (E3 base) | 0.036 | **0.057** | 0.135 (kept 0.73 at the start at age 90) |
| 0.99 (E3 high) | 0.009 | **0.014** | 0.033 (kept 0.93 at the start at age 90) |

Three things for K4's fill: (i) map from the kept row through f, and state the span (my kept row is 14 days; the world's read is 20 days after the start), not by copying the m column; (ii) the labels invert: E3's **low** kept is the **high** m, so "priorRateMult-low" and "-high" cells must be named by what they mean; (iii) the placeholder's high of 2 (prior traces forgetting faster than fresh ones) has no support in E3, whose whole range is at or below about 0.35 at age 0.

### B3 (blocking). Keep criterion 2's L4 as an outer cell

E3 §4 item 3: "keep criterion 2's fresh-trace rule (ratio ≈ 1) as an outer cell so the O1 split can show how much of the oracle's gain depends on it." `cells3` (world3.mjs lines 47–51) builds only E3's low and high per row. Once K4 fills `priorRateMult` from E3, m = 1 at age 0 is no longer a cell, and N7 (F1 line 37) cannot be answered from the readout: the O1 split would be measured only inside E3's range, with nothing to compare against the world readout 2 used. Add one reported cell at m 1, age 0 (both placements, or at least `interleave`), or say why not.

### N1 (note). Refresh gain is modelled, but only as decay avoided

The brief asks whether refresh *gain* is modelled at all. It is, implicitly: studying or retrieving a known concept resets its clock, so the gain is the loss since the last reset that is avoided at the read. There is no separate gain: no strengthening on study of a known concept (mult kept, line 170), and no stabilisation term of the kind Cantor 2015 and Berger 1999 describe for marginal knowledge (E3 §2b, [A]/[S] only). That matches how E3 derived its ratio (an **upper bound**: "Refreshing a well-held concept can at most restore what it would have lost before the read"), so I do not ask for a term. Two consequences K4 should state in the readout:
- At age 0 the refresh value is **zero on day 0 by construction** (the prior trace's clock is the episode start) and grows with the day index. Derived ratio at day 0 / 6.5 / 13: m 0.35 → 0 / 0.115 / 0.204; m 0.057 → 0 / 0.023 / 0.041; m 0.014 → 0 / 0.006 / 0.010. So with E3's kept row at age 0, the world's ratio sits at or below E3's ratio low (0.03) at E3 base, and near E3's ratio base (0.12) only at E3's kept low. That is inside E3 (its ratio row is an upper bound), but it is the episode clock that sets it, not an age.
- Every prior trace has one age. E3 §4 item 3 says ages vary from weeks to years and the evidence cannot pick one. A single point is a simplification to state, not a departure to fix.

### N2 (note, resolves with B1). Predict ignores the kept share

learner3 line 165 predicts from the known flag alone. At age 0 that is harmless (kept is near 1 on day 0). With B1's deficit it makes predictions inconsistent with recall, and the reachable oracle's prior-knowledge posterior (step 1) is built from those predictions. If B1 is fixed by (a) or (b) this goes away.

## 2. E3's price rows in the world

Form (harness3.mjs lines 212–223): a revisit adds `revisitSlotCost` to `used`; a card may start while `used < slots`; time advances by the fixed `revisitMinutes` (1) whatever the cost; the stop draw after a revisit is the per-card hazard × `revisitStopScale`, independent of whether the revisit was right.

### N3. `revisitSlotCost`
Form fits E3 row 1a (a revisit's time as a share of a lesson's). Fill: E3 **0.15 / 0.3 / 0.5**, against the placeholder's 0.5 / 1 / 1 (world3.mjs line 19): every E3 value is at or below the placeholder's low. In `interleave` the cost matters only at the session's end, because the 1-in-3 rule, not the budget, caps revisits (derived, 8 slots: cost 1 → 6 new + 2 revisits; cost 0.3 → 8 new + 3 revisits). In `first` it sets how many new cards follow the revisits, so it matters a lot more there.

### N4. `revisitStopScale`
The per-card multiplier is E3 row 1b's unit ("per card"; per minute it would be divided by the time ratio). Fill: **0.5 / 1.0 / 2.0** against the placeholder's high of 1.5. E3's "miss vs hit" row (stop more likely after a missed revisit: direction [S], unsized) is not modelled. Under the interleave, an order rule changes which concepts are known when they come back, and so the miss rate. A miss-dependent stop would pass part of that difference into stopping, so it could move an ordering Δ a little. E3 gives no size, so I do not ask for it. Name it as an unmodelled direction in the readout.

### N5. `slots`
Fill **4 / 8 / 15** against 6 / 12 / 20. The base moves from 12 to 8. That changes the number of new picks per session in the base cell, so it changes the room any ordering has, and criterion 3 §1.4 already makes K4 recompute S. Confidence on this row is "none to low" and it is an analytics question (analytics-steward), so a verdict in `interleave:base` that differs from `slots-low` or `slots-high` should be reported as such.

### N6. One-at-a-time sweeps do not reach the wide rows' corners
Each E3 row gets its low and high cells (world3.mjs lines 47–51), so each wide row is reached alone. The three price rows are analytics rows with direction-only support, and they act together: a short session with a high stop multiplier and a costly revisit is the case where revisits crowd out new cards most. One-at-a-time cells from the base never reach it. A single reported-only "price corner" (stop 2.0, slots 4, cost 0.5) would show whether the base reading leans on the price rows' centre. It is a request, not a block: rule 3 reads only the base.

### N7. E3 placement row
E3 row 3 (encoding multiplier of a new card right after a revisit: 0.9 / 1.0 / 1.1, centred on no effect, low confidence) is not in the world. At base that is the same as modelling it. With no cells, the interleave-vs-first comparison has no learning term for placement, only stopping and slot structure. That is what E3 §4 item 5 asked to attribute differences to. It does not move an ordering Δ within one placement.

## 3. The interleave cell against Feed.tsx

Matches (code read): `i % 3 === 1`, one revisit per qualifying index (Feed.tsx line 98; harness3 line 223); at most 12 fetched (line 24; harness3 line 211); the fixed queue in progress-key order, i.e. first completion (line 66; `feedDue`, harness3 lines 70–74); unserved revisits wait and stay due (`revisitDue` is recomputed per visit); leftovers appended only when the catalogue ends (line 104; harness3 line 244). In the world the leftovers are capped by `slots`; Feed.tsx has no cap. With D4 that is the same thing.

### B4 (blocking). D1: the shipped feed counts completed lessons, so a returning learner meets revisits before new ones

Confirmed in code: Feed.tsx `list.items` is the server's page list (lines 49–57, 96), and neither Feed.tsx nor DemoCard.tsx nor src/lib/feed-index.ts reads local progress, so completed lessons are rendered again, in catalogue order, from the top. The `i % 3 === 1` rule counts those positions. Under the default order, a returning learner's completed lessons are a prefix of the catalogue. From the second session on, the fetched revisits (up to 12, at positions 1, 4, 7, …, 34) land among cards the learner has already done, before the first new lesson once about 35 lessons are complete. **For the reference arm, the shipped placement for a returning learner is close to `first`** (revisits, then new), plus the cost of scrolling past completed cards. Nothing in learning science sizes that scroll cost, and whether learners scroll past or stop is an analytics question.

Why it is blocking: criterion 3 §2.0 names `interleave:base` the base cell for rule 3, and its reason 1 is "It is the placement the product ships". Under D1 the interleave-over-new-cards cell is the shipped placement for a first visit, not for the returning learners every episode is made of. D1 could move an ordering Δ: it changes how many revisits come before the first new pick and how many new picks fit in a session. It also has no defined form for a non-default order, because the product serves one catalogue order and the completed set of a reordered learner is not a prefix. K4 to answer: model the scroll-past (and say how it applies to non-default orders), or restate reason 1 (e.g. "the interleave cell is Feed.tsx's rule as it would run over new lessons only", a proposed feed, not the shipped one), or show why D1 does not change the reading. This is fidelity only. Which cell is the base stays the eval's choice.

### N8. D2, D3, D4 and the per-visit queue
- **D2** (`revisitFrom = active + 2` when metas arrive): if they arrive after the learner has moved, the first revisit comes later. That moves at most one revisit per session. Slight.
- **D3** (subject chips; drafts and retired lessons dropping out): no effect on ordering in a pilot with no chip use.
- **D4** (no session length in Feed.tsx): `slots` is the world's (N5). It affects the Δ only through N5.
- Not listed in §1.1: Feed.tsx builds its queue per visit (page load), not per day. Under criterion 2's daily single session they are the same. Under an irregular-return cell (F1 N13; none exists) they would differ.

## 4. The reachable-signal oracle

### N9 (no departure). What it sees
Code read: `reachableInput` (harness3.mjs lines 144–149) gives `now`, `slots`, `dims`, and history with `slug`, `completedAt`, `predictedCorrectly` and recalls from the last 30 days. It is deep-frozen. `decide` reads only those (reachable-oracle.mjs lines 56–141). Population constants come from `reachablePop` (harness3 lines 132–141), which reads the cell and E1 bases, never the persona's own world (`pullBarByRating` averages the persona modifiers). It reads `dims[slug].misconceptionStrength`, a lesson field the privacy ruling lists as not personal (criterion 3 §2.2 table). Tests RS1–RS8 and T5c pass. I found no hidden-state read.

### N10. Its two constants against E3
- **14-day valuation horizon.** A pick on day d is read at 20 − d days (H = 7 after day 13), so 7 to 20 days, mean about 13.5. E3 §2a–2b derived its prior-knowledge rows at a 14-day read. Consistent.
- **Assumed prior-trace age priorAgeDays + 6.5.** `refreshPrior = κ_m(14) − κ_m(14 + age)` (line 54) prices the refresh of a prior trace by the loss since its last reset. In the world, that is the time since `startTime − priorAgeDays`, i.e. priorAgeDays + the day index, with mean day index 6.5. So the constant is the world's own mean, a population value under a single shared age, and fair under "knows the world's equations and population values". Two caveats: (i) it moves with B1, since today the age term includes the starting deficit; (ii) if K4 ever gives prior traces an age distribution, the oracle should average the gain over ages, not take the gain at the mean age (kept is convex in age). The oracle could infer the day from its history's timestamps and does not. That keeps it a lower bound, as §2.2 says.

## 5. O1: the split's arms and counting

### N11. Under an E3-filled world, Δ_refresh is mostly the value of skipping
`oracle-refresh` (harness3.mjs lines 92–104) chooses between the default order's next unknown-concept lesson and every eligible known-concept lesson. With E3's rows, a refresh is worth about 0.01 to 0.2 of a new pick (N1). So `oracle-refresh` will mostly take the next new lesson and **skip** known ones. Its gain is then the value of a freed slot (knowing what the learner already knows), not the value of refreshing. `oracle-new` serves the default's refreshes as they come (line 85), so it cannot skip. The definitions are sound. But N7's question ("does the oracle's gain rest on the refresh value of prior knowledge?") is answered by Δ_refresh only if the readout separates *taken* from *skipped*. The per-episode refresh-pick counts beside default-order's (criterion 3 §2.1, `extra.refreshPicks`) allow that. The readout should state it in words for each N7 cell, including B3's outer cell, where refreshes are worth taking.

### N12. Counting by origin is adequate for N7, given B3
230 lessons and 223 concepts, with completed lessons ineligible, means ordering can reach an episode-learned refresh only through the 7 two-lesson concepts. The measured refresh side is therefore nearly all prior-known, and that is the side N7 is about. A fourth arm would have almost nothing to choose. Counting is adequate. One naming point: `extra.refreshEpisode` (harness3 line 248) counts a refresh as "episode" whenever any completed lesson shares the concept, and history includes the visible pre-history. "Learned before this pick (episode or pre-history)" is the accurate label.

## What K4 is asked to answer in writing
B1, B2, B3, B4: each fixed, or refused with a reason (criterion 3 §10 item 2). The notes need no answer, but N1, N4, N5, N11 and N12 each ask for a sentence in the readout.

## Sources
E3 company/personalization/evidence/2026-10-17-criterion-3-ranges.md (§1a, §1b, §1c, §2a, §2b, §3, §4, ranges table); E1 company/personalization/evidence/2026-10-16-criterion-2-ranges.md (§3, table lines 131–133); F1 company/personalization/evidence/2026-10-16-criterion-2-fidelity-review.md (B6 line 30, N7 line 37, O1 line 45). Product code: src/components/Feed.tsx, src/kit/progress.ts. Eval artifact: company/personalization/eval/2026-10-17-criterion-3.md and harness/c3/*. No new literature was consulted. Every number here is from those rows or derived from the world's equations.
