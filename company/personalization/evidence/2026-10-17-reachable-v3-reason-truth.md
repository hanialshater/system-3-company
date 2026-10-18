# F7: are reachable-v3's emitted move reasons true? (diff, passed-known, shown frame, juxtaposition)

owner: learning-scientist-personalization (Oskar), run ls-f7-1017 · asked by vp-personalization (dispatch 20261017T201940302Z-vp-personalization-53e53a7c, batch 5 §17, lane 14)
artifact: company/personalization/policies/reachable-v3.ts, sha256 53981ab02a240900a5fa2c9c1d62a1e0c49a9add07a3a35c26656f0a8e01c195 (checked), read on branch ccr-3744965a-rfmufj at 25085a0 (after 8d37d7a). Compared with reachable-v2.ts (sha256 2666271f…6906714, checked) and the unfrozen build `git show 1d5ad46:…/reachable-v3.ts` (sha256 271c2fd6…7b37434, checked).
order of work: §1 and §2 were written and saved before any probe ran. The build note, the v3 test file, EDD-010 §12 and batch 5 §15-§16 were not read before §3-§6 were written. F6 (2026-10-17-edd010-reason-rule-truth.md) was used for its §1 method only.
status: check only. Nothing here is a verified learner-facing claim; copy is RC's. No candidate, EDD, criterion, harness or readout was edited. No scored number from any world.

## 1. Diff

### 1a. v3 against v2 (frozen)
1. **Ungraded estimate.** `estimate` no longer reads `predictedCorrectly` or `recalls`. Every domain uses the prior (no domain posterior is formed: `domains` is always empty), every completion takes v2's no-prediction branch, the recall branch and the 30-day recall window are gone, and `strengthen`, `pRightGivenPi`, `expectedPull`, `ratingOf`, `knownBeforeFirstPrediction` are removed. `estimate` no longer reads `now`. Consequence: `rank`'s order equals v2's only on histories with no predictions and no recalls; on any graded history it can differ. P (the parameter object) is unchanged, so `pullByRating`, `slip`, `floor`, `relearn`, strengthen rows and `recallWindowDays` are now dead constants.
2. **`rankRows` extracted.** v2's rank body up to the sort is moved into `rankRows` unchanged; `rank` maps its rows as v2 did. `domain-estimate` can still be emitted by `rank` (when q decides and the row has no state), with `rightPredictions`/`wrongPredictions` always 0 and `estimate` the prior mean. `concept-known` reasons still carry `recallsRight`/`recallsWrong` (always 0) and `pKnown` (a number).
3. **`shown`** added to the input type, read only by `moves`.
4. **`moves`** added (new export), with codes prerequisites | concept-known | refresh | passed-known; **`internals.rows`** added (terms and hasState per ranked row).
5. Header comments only otherwise.

### 1b. v3 frozen against the unfrozen build (1d5ad46)
1. `rank`, `rankRows`, `estimate` and `defaultOrder` are textually identical: the diff touches no line above `moves` except comments and the optional `shown` field, which `rank` does not read. **`rank`'s order is identical to the unfrozen build's** for every input (by inspection of the diff; the probes in §3 also assert equality of `rank` output between the two files).
2. `moves` frame: the unfrozen build computed D' as default order minus history; the frozen file also removes `shown` from both R' and D', and returns entries only for unshown ranked slugs.
3. New code `passed-known` (earlier only): q's swap is mapped to `passed-known` when the passed card's concept has a finished lesson; `decisive` becomes a list, so one q-decisive pair counts for both concept-known and passed-known when both apply. CODE_ORDER appends passed-known last; ties in decisive count go to the earlier code in CODE_ORDER.
4. New fact `finishedOnPassedConcepts`.

## 2. Truth test (written before any probe output)

**Frame.** For a probe with history H and shown set S: R' = rank's rows minus S; D' = R' in default order. x is moved earlier if its R' index < its D' index, later if greater. Passed pairs, in R'/D' only: earlier x passed y if D'(y) < D'(x) and R'(y) > R'(x); later x was passed by u if D'(u) > D'(x) and R'(u) < R'(x). Because the §5.4 walk fills unshown, unfinished slots after the pin with R' in order, and D's pilot slots hold D' in order, a passed pair in R'/D' is exactly a pair whose display order differs from its default order among the cards still to be shown. So the pair relation is the display relation for every card after the pin.

**Causal strengths per card (F6 §1 method, on v3's own terms from `internals.rows`).** For the card's code C:
- T0: u.value > l.value (always true for a passed pair under rank's sort; checked).
- T1 (decisive): C is in the decisive mapping of the pair (the term whose swap closes most of the gap, q mapped as v3 maps it).
- T2 (contributing): C's swap closes a positive part of the gap.
- **some-con** = T0 and T2 against at least one passed pair; **some-dec** = T0 and T1 against at least one; **all-con** / **all-dec** = against every passed pair. For passed-known the pair set is restricted to pairs whose lower card's concept has a finished lesson (Pk), and all-* is over Pk.
- **cf (counterfactual, new here).** The copy inside the ceiling links a finished lesson to a move. That link is true only if the finished lesson's state is what moves the card. For concept-known and refresh: replace x's terms by the no-state terms (q = prior mean, refresh = refreshPrior, same prereqFactor and newGain) and ask whether at least one of x's passed pairs flips (or ties to a flip under rank's index tie rule). For passed-known: for at least one pair in Pk, replace the passed card y's terms by its no-state terms and ask whether the pair flips. For prerequisites: replace x's prereqFactor by the passed (passing) card's and ask whether the pair flips (some-flip).

**Copy shapes inside the ceiling (V1-V5), and their truth conditions.** Shapes are descriptions of what a line could assert, not copy. All are "some lessons" forms; position is relative to lessons still ahead; no number, no quantity word, the lesson is the subject, nothing about knowing, no time gap.
- prerequisites, earlier: "needs fewer unfinished lessons first than some lessons it moved ahead of" (V3 form). Literal truth L: exists passed y with T2(prereq) and U(x) < U(y), where U(z) = lessons in dims on z's prerequisite concepts that are not in H. Later: "some lessons that need fewer unfinished lessons first moved ahead of it": exists passing u with T2 and U(u) < U(x).
- concept-known, either direction: "[finished title], on the same idea, is one you have finished" next to the relative position. Literal: finishedOnConcept non-empty. Causal: some-con, and cf for "because".
- refresh: inside the ceiling the time gap cannot be said, so refresh has only the same completion shape as concept-known. Literal and causal as for concept-known. Noted in advance: the two codes then share one sentence shape and differ only in direction, which is the juxtaposition question.
- passed-known (earlier only): "moved ahead of some lessons on ideas you have already finished", optionally naming finished titles from finishedOnPassedConcepts. Literal L: exists passed y whose concept has a finished lesson; per named title z, exists passed y on z's concept (named-true). Causal: some-con over Pk, and cf.

**Blocking rule (brief).** Blocking if, for some code-direction in some probe, no strength inside the ceiling (some-con or some-dec, with the shape's literal L) is true for every card assigned to it, or if any card that `moves` marks moved has code null. cf failing is reported as a note on the word "because"; the brief's rule is on the some forms.

**Shown frame checks.** (i) every display-moved card after the pin: does `moves` mark it moved, and is its `moves` direction equal to its display direction (display slot vs its default slot among the pilot slots)? (ii) display-moved cards with `moves.moved = false` get no line (a note, not a truth failure).

**Juxtaposition.** For each finished lesson z, collect the lines that would name it: concept-known and refresh name z via finishedOnConcept with the card's direction; passed-known names z via finishedOnPassedConcepts with the sense "z's idea is behind". A case is two lines naming the same z with opposite senses for z's idea (concept-known/refresh earlier = ahead; later = behind; passed-known = behind). Counted within one display and within a window of 6 display slots.

## 3. Method and probes

- Dims: D2's index at 4a559d6 (`src/lib/learner/dims-index.generated.ts`), pilot entries only, built as EDD-010-probe.mts builds them. Pilot default order: 230 slugs, sha256 prefix 04bf48f4 (the T2 vector).
- Inputs read from the frozen file only: `rank`, `moves` and `internals.rows` (terms and hasState). No patched copy was needed (v3 exposes terms). On every probe the script asserts: `rank` output of the frozen file is JSON-equal to the unfrozen build's (§1b.1); `internals.rows` order equals `rank`'s; `moves` returns one entry per unshown ranked slug.
- Display: EDD-010 §5.4 step 5 as EDD-010-probe.mts implements it (pinned slots keep their card; a slot whose default lesson was done at mount keeps it; every other slot takes the next unshown slug of R). `shown` = the pinned slugs (the first card at mount; slots 0-79 for B2).
- Probes (NOW = 1.8e12 ms). Under v3 predictions and recalls are not read, so the probes differ only by which lessons are finished, when, and the pin. P0 cold start, pin 1. P1, P2, P3: S1's three histories (5 done; 20 done; 20 done 3 days ago), built as the probe builds them. PR: the probe's refresh history (the first lesson, by slug, of each of the 7 pilot concepts that have two lessons, done 60 days ago). G1: the same 7 done today (age 0). G1b: one of them done today. PRG: 4 of them 60 days ago and 3 today. P5: every 10th default lesson, ages 0-18 days. B2: the probe's deep pin (mount on P3, scroll to slot 80 finishing every 6th unfinished card on the way, 10 completions, then recompute with slots 0-79 as `shown`). B2': the B2 history with no `shown` (a frame check, not a display the product makes). RAND: 400 seeded random histories (each two-lesson concept finished at one lesson with probability 0.6, plus 0-39 random default lessons, ages 0-89 days, pin 1 or a random 1-60 prefix).
- Script: scratch `f7.mts` (not in the repository). The pair test is F6 §7's with v3's q mapping (copied from `pairCodes`), plus the cf and literal checks in §2.

## 4. Per-probe shares

Columns: n = cards `moves` assigns that code-direction; all-dec / all-con / some-dec / some-con as in §2 (passed-known over Pk); lit = the shape's literal truth together with some-con on the same pair; cf = the counterfactual flip on at least one pair; passed = passed pairs per card (min-max); facts = cards whose named facts field for the shape is non-empty (prerequisites: always counted).

| probe | pair | n | all-dec | all-con | some-dec | some-con | lit (V3 "fewer unfinished") | cf | passed | facts |
|---|---|---|---|---|---|---|---|---|---|---|
| P0 | earlier:prerequisites | 126 | 126 | 126 | 126 | 126 | 126 | 126 | 1-172 | 126 |
| P0 | later:prerequisites | 102 | 102 | 102 | 102 | 102 | 102 | 102 | 12-190 | 102 |
| P1 | earlier:prerequisites | 124 | 124 | 124 | 124 | 124 | 124 | 124 | 2-169 | 124 |
| P1 | later:prerequisites | 99 | 99 | 99 | 99 | 99 | 99 | 99 | 12-185 | 99 |
| P2 | earlier:prerequisites | 96 | 12 | 15 | 96 | 96 | 96 | 96 | 3-162 | 96 |
| P2 | later:prerequisites | 109 | 109 | 109 | 109 | 109 | **103** | 109 | 12-175 | 109 |
| P2 | later:concept-known | 3 | 2 | 2 | 3 | 3 | 3 | 3 | 67-140 | 3 |
| P3 | earlier:prerequisites | 96 | 12 | 15 | 96 | 96 | 96 | 96 | 3-162 | 96 |
| P3 | later:prerequisites | 109 | 109 | 109 | 109 | 109 | **103** | 109 | 12-175 | 109 |
| P3 | later:concept-known | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 67-139 | 3 |
| PR | earlier:refresh | 7 | 4 | 7 | 7 | 7 | 7 | 7 | 12-208 | 7 |
| PR | later:refresh | 2 | 2 | 2 | 2 | 2 | 2 | **0** | 7 | **0** |
| PR | earlier:prerequisites | 92 | 92 | 92 | 92 | 92 | 92 | 92 | 8-165 | 92 |
| PR | later:prerequisites | 118 | 1 | 36 | 118 | 118 | 118 | 118 | 5-190 | 118 |
| G1 | earlier:prerequisites | 100 | 4 | 4 | 100 | 100 | 100 | 100 | 1-171 | 100 |
| G1 | later:prerequisites | 114 | 114 | 114 | 114 | 114 | 114 | 114 | 13-183 | 114 |
| G1 | earlier:passed-known | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 7 | 1 (7 of 7 named titles true) |
| G1 | later:concept-known | 7 | 4 | 4 | 7 | 7 | 7 | 7 | 9-208 | 7 |
| G1b | earlier:prerequisites | 116 | 21 | 21 | 116 | 116 | 116 | 116 | 1-173 | 116 |
| G1b | later:prerequisites | 110 | 110 | 110 | 110 | 110 | 110 | 110 | 12-190 | 110 |
| G1b | later:concept-known | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 128 | 1 |
| PRG | earlier:refresh | 4 | 3 | 4 | 4 | 4 | 4 | 4 | 12-152 | 4 |
| PRG | later:refresh | 1 | 1 | 1 | 1 | 1 | 1 | **0** | 4 | **0** |
| PRG | earlier:prerequisites | 99 | 19 | 19 | 99 | 99 | 99 | 99 | 5-167 | 99 |
| PRG | later:prerequisites | 115 | 11 | 35 | 115 | 115 | 115 | 115 | 13-187 | 115 |
| PRG | later:concept-known | 3 | 2 | 2 | 3 | 3 | 3 | 3 | 9-129 | 3 |
| P5 | earlier:prerequisites | 116 | 16 | 39 | 116 | 116 | **105** | 116 | 1-159 | 116 |
| P5 | later:prerequisites | 89 | 89 | 89 | 89 | 89 | **85** | 89 | 11-178 | 89 |
| P5 | later:concept-known | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 134 | 1 |
| B2 | earlier:prerequisites | 73 | 8 | 8 | 73 | 73 | 73 | 73 | 6-130 | 73 |
| B2 | later:prerequisites | 72 | 72 | 72 | 72 | 72 | 72 | 72 | 10-120 | 72 |
| B2 | later:concept-known | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 49-95 | 3 |
| B2' | earlier:prerequisites | 94 | 2 | 2 | 94 | 94 | 94 | 94 | 3-159 | 94 |
| B2' | later:prerequisites | 98 | 98 | 98 | 98 | 98 | **93** | 98 | 12-168 | 98 |
| B2' | earlier:passed-known | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 4 | 3 (12 of 12 named true) |
| B2' | later:concept-known | 4 | 3 | 3 | 4 | 4 | 4 | 4 | 65-187 | 4 |

RAND (400 histories, card totals): earlier:prerequisites 35,310 (some-con 35,310; V3 literal 35,065; false in 134 histories); later:prerequisites 40,245 (some-con 40,245; V3 literal 39,285; false in 314 histories); earlier:refresh 995 (some-con 995; facts 995; cf 962); later:refresh 281 (some-con 281; own-concept facts non-empty in 5; cf 0); later:concept-known 551 (some-con 551; cf 536); earlier:passed-known 14 (some-con 14; 50 of 50 named titles true; cf 14). earlier:concept-known never occurred. Moved cards with code null: 0 in every probe and every RAND history. Every moved card has at least one passed pair, and T0 held on every pair.

**Alternative shapes (tested after the V3-literal failures; single template per key, literal and some-con on the same pair).**
- earlier:prerequisites, "moved ahead of some lessons that build on other lessons first" (the passed card has lessons in dims on its prerequisite concepts): true for every card in every probe and in RAND (35,310 of 35,310). It must be so: a passed card whose prerequisite term favours x has a factor below 1, which needs a prerequisite concept with a lesson in dims.
- later:prerequisites, "it builds on other lessons first" next to "some lessons moved ahead of it" (`facts.prerequisiteLessons` non-empty): true for every card (40,245 of 40,245), for the same reason.
- later:refresh, "some lessons on ideas you have finished moved ahead of it" (a passing card has its own concept state, and its refresh term favours it): true for every card (281 of 281 in RAND, 3 of 3 in PR/PRG). Removing that passing card's state flips the pair for every card (281 of 281). No title can be named from v3's facts: `finishedOnConcept` is about the moved card's own idea, and v3 carries no list of finished lessons on the ideas of the cards that passed it.

## 5. Shown frame, deep pin, juxtaposition

- **Frame pairs are display pairs.** In every probe and RAND history, every passed pair `moves` uses is a pair whose display order is the reverse of its default order among the cards after the pin (0 failures). So a "some lessons still ahead" line is true in the display the learner sees, whenever it is true in the frame.
- **Display-moved and frame-moved disagree on a few cards (B2).** After the deep pin, 148 cards are display-moved (slug differs from the slot's default). 2 of them are not moved in the frame (`moved: false`, so no code), and 2 frame-moved cards sit in their own default slot. In P0-P5, PR, G1, G1b and PRG the two notions agree on every card.
- **Direction (step 4).** In B2, 27 frame-moved cards have a `moves` direction opposite to their display direction (display slot against the slot's default lesson in D). All 27 are earlier:prerequisites in the frame and sit behind their default slot in the display: the pinned 80 slots already hold cards that rank pulled forward, so a card that passes some unshown lessons can still land behind the slot it had in D. With no `shown` (B2'), 8 cards mismatch in the other sense, which shows the `shown` frame changes which cards are flagged. Because the frame pairs are display pairs (first bullet), the "some lessons" line on each of the 27 is still true. What it cannot be is a statement about the card's slot. Before the pin (P0-PRG) no card mismatches.
- **Juxtaposition (step 5).** Cases where two lines name the same finished lesson with opposite senses for its idea: 0 in every probe, 0 within 6 slots and 0 in the whole display, over all 411 histories. earlier:concept-known never occurred. In G1, passed-known names the 7 finished lessons (their ideas are behind) and the 7 later:concept-known siblings name the same 7 (behind as well): same sense, not contradictory. Not excluded analytically: an earlier:refresh sibling passed by a passed-known card would name one lesson both ways. The random search did not find one.

## 6. Findings (written before the build note, the test file, EDD-010 §12 and batch 5 §15-§16 were read)

**Blocking: 0** under the brief's rule. Every moved card has a code (0 null in 411 histories). Every code-direction that occurred has at least one strength inside the ceiling that is true for every card assigned to it: **some-contributing**, in the shapes below. some-decisive is also true for every card in every named probe (RAND did not aggregate some-decisive). The all-* strengths are false for many cards (for example earlier:prerequisites all-con 12-39 of 96-116 once a history exists), so only "some lessons" forms stay true. That matches the frame the brief sets.

Which shape stays true, per key:

| key | true shape inside the ceiling (description, not copy) | V-form or own-lesson shape |
|---|---|---|
| earlier:prerequisites | "moved ahead of some lessons that build on other lessons first" (100%) | V3 "needs fewer unfinished lessons first than some it moved ahead of" is **false** for some cards (N2) |
| later:prerequisites | "some lessons moved ahead of it; it builds on other lessons first" (100%) | V3 mirrored form **false** for some cards (N2) |
| later:concept-known | "some lessons moved ahead of it; [finished title], on the same idea, is one you have finished" (100%, juxtaposition; not "because" for every card, N3) | n/a |
| earlier:refresh | "moved ahead of some lessons; [finished title], on the same idea, is one you have finished" (100%, juxtaposition; not "because" for every card, N3) | no time gap may be said |
| later:refresh | only "some lessons on ideas you have finished moved ahead of it", **with no title** (100%) | the own-lesson shape is empty or false for 276 of 281 RAND cards and 3 of 3 probe cards (N1) |
| earlier:passed-known | "moved ahead of some lessons on ideas you have already finished", naming any title in finishedOnPassedConcepts (100%; 62 of 62 named titles true; cf 100%) | V-form true |
| earlier:concept-known | never occurred in 411 histories; untested | |

Notes:
- **N1 (later:refresh; conditional).** The cards are later because a card on an idea the learner finished long ago (refresh) passed them. In 276 of 281 cases the card itself has no finished lesson on its own idea, so a line that names its own finished lesson has nothing true to name, and cf is 0 for every card. The one true shape names the passing cards' ideas, and v3's facts give no titles for them. It is a completion fact plus "some lessons", the same class as V-ruling Q1's passed-known shape, but privacy-reviewer has not ruled on it for this key. **If privacy-reviewer rules it outside V1-V4, or RC needs a title, later:refresh has no true shape and becomes blocking.** That fix would need a candidate change (facts for the passing cards' finished lessons, or withholding the line), which is outside this check.
- **N2 (prerequisites: the V3 sentence is not always true).** "Needs fewer unfinished lessons first" fails where the prerequisite term reflects how strongly finished prerequisite ideas are estimated, not how many prerequisite lessons are unfinished. Example (P2/P3, later): doubling-finds-the-edge has 0 unfinished prerequisite lessons (its prerequisite idea, cs:binary-search, is finished). It is later because lessons with no prerequisites passed it. Earlier example (P5): dice-that-chase-each-other, 0 unfinished, passed only cards with 0 unfinished whose finished prerequisites carry a lower estimate. Counts: P2 and P3 6 of 109 later; P5 11 of 116 earlier and 4 of 89 later; B2' 5 of 98 later; RAND 245 of 35,310 earlier (134 of 400 histories) and 960 of 40,245 later (314 of 400). Counting ideas instead of lessons fails as well (RAND later 1,411). The catalogue shapes in the table hold for every card. Privacy-reviewer's ruling allowed V3's comparison "in this form only", so the catalogue shapes need RC's and privacy-reviewer's read (catalogue class (c)).
- **N3 (no "because" on concept-known and refresh).** cf fails for 33 of 995 earlier:refresh and 15 of 551 later:concept-known cards in RAND. Removing the card's own finished-lesson state flips none of its passed pairs. The term still contributes (some-con), but the finished lesson is not what moved the card. Copy may juxtapose the finished title with the position. It may not say the finished lesson is why. passed-known's cf held for every card.
- **N4 (deep pin direction).** B2: 27 frame-moved cards (all earlier:prerequisites) sit behind their default slot in the display. Their lines are still true, because every frame pair is a display pair among the cards after the pin. Glue must take direction from `moves`, never from the display slot, and no line may imply a slot or "earlier than usual" (already V4). 2 display-moved cards have `moved: false`, and 2 frame-moved cards sit in their own default slot. §5.4 step 6's "moved" (slug differs from D[i]) is therefore not `moves`' "moved", and the glue must key lines on `moves`. Without `shown` (B2'), 8 cards mismatch the other way, so passing `shown` matters.
- **N5 (passed-known is true but rare).** 18 cards over 411 histories (14 in RAND, against about 77,000 moved cards). Every named title is true, and removing the passed card's state flips the pair for every card.
- **N6 (juxtaposition).** 0 cases of one finished lesson named with opposite senses, within 6 slots or in the whole display. Not excluded analytically (§5).
- **N7 (some-con is by construction).** v3's code is chosen among the contributing codes, so some-con on the assigned code holds by construction. This read recomputed it independently from `internals.rows` and found 0 exceptions, which confirms the implementation. The truth question beyond that rests on the shapes (N1, N2) and on cf (N3).
- **N8 (rank's own reasons).** `rank` still emits `domain-estimate`, and `concept-known` with `pKnown` and zero `recallsRight`/`recallsWrong`. `moves` facts carry no numbers. Glue must read `moves` only (V2's scan).
- **N9 (diff).** On graded histories v3's `rank` order differs from v2's, because predictions and recalls are no longer read. `rank` is identical to the unfrozen build's (asserted on every probe). P keeps dead constants (pullByRating, slip, floor, relearn, strengthen rows, recallWindowDays). Harmless, but they look like live parameters to a reader.

## 7. After reading the build note (§9.5 C9 near-ties, and its G1 definition)

Read only after §1-§6 were written. The build note's §9.5 reports no adjacent near-tie within 1e-12 relative, and no pair whose T0 gap, T2 closing or T1 top-two margin falls within 1e-12 relative, in five histories (smallest relative gap between distinct values 1.7e-4). **This does not affect any line's truth here.** N1-N3 are structural, not rounding. The V3-literal failures come from cards with equal unfinished counts and different finished-prerequisite estimates, which differ by well above 1e-12. The cf failures are flips that do not occur at all, not flips at the margin. I did not measure near-ties in RAND. If an engine ever broke one of the many exact `===` ties between rows with different prerequisite lists (identical factors from the same prior mean), that would turn an unmoved card into a moved one resting on rounding. That is C9's WebKit run (personalization-engineer), and it matters to truth only if that run finds a tie broken. The build note's spec gap G1 (an earlier move caused only by passed lessons on finished ideas) is what passed-known now covers. My G1 probe (7 lessons finished at age 0) produces it, and it is true there (7 of 7 titles). Its row 3 confirms that the q term maps by the moved lesson for later moves. Refresh is not mapped that way: it is a term code, so a later:refresh card gets the code even when only the passing card has a finished idea. That is N1, the refresh analogue of the gap G1 closed for q.

## 8. Verdict

**Blocking: 0. Notes: 9 (N1-N9).** N1 is conditional: later:refresh is blocking if privacy-reviewer rules "some lessons on ideas you have finished moved ahead of it" (no title) outside V1-V4, or if RC needs a title for that key. The copy strength that stays true for every card of every key is **some-contributing**, in "some lessons" forms only. For prerequisites the true shapes are the catalogue ones in §6, not V3's "fewer unfinished lessons first", which is false for a minority of cards in both directions (N2). For concept-known and refresh, the finished title can be shown beside the position but not as its cause (N3). passed-known is true wherever it occurs, including every named title. The `shown` frame holds: every frame pair is a display pair after the pin. 27 deep-pin cards have a display direction opposite to `moves`' direction, and their lines stay true because no line claims a slot (N4). Juxtapositions: 0.

Confidence: high on the counts (deterministic; frozen-file outputs asserted against the unfrozen `rank`; 0 frame/display pair failures). Medium-high on the shape table, because the shapes are my descriptions and RC writes the copy. Medium on N1's conditional, which rests on privacy-reviewer's reading of a shape it has not ruled on.

Routes: N1 and N2 to RC and privacy-reviewer via vp-personalization (copy keys later:refresh, earlier/later:prerequisites). N4 to personalization-engineer (glue keys lines on `moves`, not on §5.4 step 6's display "moved"). C9 WebKit tie run to personalization-engineer (unchanged).
