# F6 (Q-R1): is EDD-010 §6.3's moving-reason rule true against every passed card?

owner: learning-scientist-personalization (Oskar), run ls-f6-1017 · asked by vp-personalization (dispatch 20261017T194207930Z-vp-personalization-26420593, batch 5 §14.2)
artifact: company/personalization/policies/reachable-v2.ts (sha256 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714, checked) · rule: company/engineering/edd/EDD-010-personalised-new-lesson-order.md §5.4 steps 5-6 and §6.3, read on branch ccr-3744965a-rfmufj at b5d55ae
order of work: §1 was written and saved before any probe ran. EDD-010 §3.2 and S1's report were not read before §2-§4 were written.
status: check only. Nothing here is a verified learner-facing claim; copy is RC's (fact-checker).

## 1. Truth test (written before any probe output)

**Which cards a moved card passed.** The display is §5.4's: pilot slots keep their positions, a slot whose default lesson was completed before the page load keeps that lesson, every other pilot slot takes the next slug of `R = rank(...)`, and the cards before the pin horizon `h` keep the server's card. On the pilot slots only, write `def(x)` for x's slot in the default order and `disp(x)` for its slot in the display. A card x is *shown earlier* if `disp(x) < def(x)`, *shown later* if `disp(x) > def(x)`.
- x shown earlier **passed** y if `def(y) < def(x)` and `disp(y) > disp(x)`.
- x shown later **was passed by** y if `def(y) > def(x)` and `disp(y) < disp(x)`.
- Only cards `rank` ranked count (lessons not yet completed). Completed lessons that keep their slot, non-pilot cards and pinned cards are not passed in any sense a reason can be about; §4 counts them separately.

**When "x is ahead of y because of code C" is true.** For an ordered pair (upper u, lower l) with u shown above l:
- T0 (a reason exists): `value(u) > value(l)`. If the values are equal, u is above only by default index (or by pin), and no term reason is true.
- T1 (decisive, the strong form): C is the code `rank` itself would give if l were the next row after u: the term among {prerequisites, q, refresh} whose swap of l's value into u's terms closes the most of the gap, with q mapped to `concept-known` if u has a concept state and to `domain-estimate` otherwise. This is the candidate's own definition of "decided the order", applied to the pair rather than to the neighbour.
- T2 (contributing, the weaker form): C's swap closes a positive part of the gap (`closed_C > 0`): the term favours u over l, even if another term favours it more.
- For "x shown earlier because C": u = x, l = each card x passed. For "x shown later because C": u = each card that passed x, l = x, and C is read against each such pair.

**Copy strengths** (descriptions of what a line could assert, not copy):
- S-all-decisive: "ahead of (behind) the lessons it passed (that passed it) because of C". True for a card iff T0 and T1 hold against every passed card.
- S-all-contributing: "C is one reason it is ahead of (behind) the lessons it passed". True iff T0 and T2 hold against every passed card.
- S-some-decisive: "ahead of (behind) some lessons because of C". True iff T0 and T1 hold against at least one passed card.
- S-some-contributing: "C helped it move ahead of (behind) some lessons". True iff T0 and T2 hold against at least one passed card.
- S-boundary: the rule's own claim, true by construction: C decided the order at its run's lower (upper) boundary. A boundary card need not be a card x passed, so S-boundary alone is not a truth about the move.

**Rule (from the brief).** Blocking if, for some code and direction in some probe, no copy strength above is true for every card assigned that pair. Otherwise a note. Also flagged: any moved card the rule leaves at `default-order`, `last` or with no row.

## 2. Method

- Dims: D2's index at 4a559d6 (`src/lib/learner/dims-index.generated.ts`), pilot entries only, built as EDD-010 §5.2 and the S1 probe build them (no rating fields, successors filtered). The pilot default order is 230 slugs and hashes to `04bf48f4…3853`, the T2 vector. No draft is among the 946 entries, so the R6 question does not arise in this read.
- Display: §5.4 step 5 over the 230 pilot slots. At first render `h` covers the first lesson card; the all feed's first lesson is `a-birthday-like-mine`, a pilot lesson, so pilot slot 0 is pinned. P3h repeats P3 with 10 pinned slots. Completed lessons keep their default slot. Non-pilot positions never change, so the order among pilot slots is the whole question.
- Terms per row: `rank` returns `value` and `reason` only. A scratch copy of `reachable-v2.ts` adds `terms` and `hasState` to the two `return` lines of `rank`'s final map and changes nothing else. On every probe, the script asserts that the copy's `{slug, value, reason}` output is identical (JSON-equal) to the frozen file's. The pair test reuses `rank`'s own swap rule (`valueOf` and the three swaps, with ties going to the first term as in `rank`). The frozen file was not edited.
- Script: scratch `f6.mts` (sha256 4145ddb1…3908) and its patched copy `rv2t.ts` (sha256 cce2460f…5918). The scratchpad is not in the repository, so §6 carries the pair function, enough to rebuild the script.
- Probes (NOW = 1.8e12 ms): P0 cold start; P0b cold start with no pin; S1's three, built exactly as EDD-010-probe.mts builds them (P1 5 done, mixed predictions; P2 20 done, all predictions wrong; P3 20 done 3 days ago, one recall each, every third wrong). Added: P3h (P3 with 10 pinned slots); P4 (20 done, all predictions right); P5 (every 10th default lesson, 23 done, mixed predictions, ages 0-18 d, half with one recall); P6 (12 lessons whose concepts are the pilot's most-used prerequisites, all predictions wrong); P7 (the same 12, all right, 10 d ago, one recall miss 2 d ago); P8 (the first 60 probability lessons, mixed, ages 0-29 d, a third with a recall).

## 3. Per-probe shares (cards moved under each code-direction; count of cards where the strength is true / n)

Columns: n = moved cards assigned that pair; all-dec = S-all-decisive; all-con = S-all-contributing; some-dec = S-some-decisive; some-con = S-some-contributing; passed = ranked cards passed (or passing), min-max; row=x = cards whose assigned row is the card itself; facts=x = cards whose row's facts field (prerequisite set, domain, concept) equals the card's own.

| probe | pair | n | all-dec | all-con | some-dec | some-con | passed | row=x | facts=x |
|---|---|---|---|---|---|---|---|---|---|
| P0 cold | earlier:prerequisites | 126 | 126 | 126 | 126 | 126 | 1-172 | 3 | 45 |
| P0 cold | later:prerequisites | 102 | 102 | 102 | 102 | 102 | 12-190 | 0 | 0 |
| P0b no pin | earlier:prerequisites | 126 | 126 | 126 | 126 | 126 | 2-173 | 3 | 45 |
| P0b no pin | later:prerequisites | 103 | 103 | 103 | 103 | 103 | 12-190 | 0 | 0 |
| P1 | earlier:prerequisites | 104 | 14 | 14 | 104 | 104 | 32-130 | 4 | 18 |
| P1 | earlier:domain-estimate | 26 | 2 | 2 | **24** | 26 | 2-188 | 2 | 26 |
| P1 | later:prerequisites | 46 | 35 | 35 | 46 | 46 | 30-212 | 0 | 0 |
| P1 | later:domain-estimate | 49 | 5 | 5 | 49 | 49 | 19-169 | 0 | 0 |
| P2 | earlier:prerequisites | 84 | 3 | 5 | 84 | 84 | 6-162 | 8 | 40 |
| P2 | earlier:domain-estimate | 19 | 0 | 0 | **17** | 19 | 3-116 | 3 | 19 |
| P2 | later:prerequisites | 47 | 43 | 43 | 47 | 47 | 29-179 | 0 | 0 |
| P2 | later:domain-estimate | 58 | 2 | 2 | **43** | **45** | 12-167 | 0 | 1 |
| P2 | later:concept-known | 1 | 0 | 0 | 1 | 1 | 128 | 0 | 0 |
| P3 | earlier:prerequisites | 96 | 2 | 3 | 96 | 96 | 11-179 | 12 | 55 |
| P3 | earlier:domain-estimate | 10 | 0 | 0 | 10 | 10 | 54-156 | 3 | 10 |
| P3 | later:prerequisites | 53 | 47 | 48 | 53 | 53 | 12-164 | 0 | 0 |
| P3 | later:domain-estimate | 48 | 7 | 7 | 48 | 48 | 40-196 | 0 | 0 |
| P3 | later:concept-known | 1 | 0 | 0 | **0** | **0** | 67 | 0 | 0 |
| P3h pin 10 | (identical to P3: the 10 pinned slots hold completed lessons) | | | | | | | | |
| P4 | earlier:prerequisites | 93 | 5 | 6 | 93 | 93 | 11-179 | 8 | 45 |
| P4 | earlier:domain-estimate | 15 | 0 | 0 | 15 | 15 | 32-170 | 3 | 15 |
| P4 | later:prerequisites | 54 | 48 | 48 | 54 | 54 | 12-164 | 0 | 0 |
| P4 | later:domain-estimate | 46 | 5 | 5 | 46 | 46 | 26-196 | 0 | 0 |
| P4 | later:concept-known | 1 | 0 | 0 | 1 | 1 | 128 | 0 | 0 |
| P5 | earlier:prerequisites | 94 | 6 | 13 | 94 | 94 | 26-110 | 7 | 17 |
| P5 | earlier:domain-estimate | 25 | 1 | 1 | 25 | 25 | 6-172 | 3 | 25 |
| P5 | later:prerequisites | 51 | 37 | 39 | 51 | 51 | 26-189 | 0 | 0 |
| P5 | later:domain-estimate | 35 | 5 | 5 | 35 | 35 | 18-162 | 0 | 0 |
| P6 | earlier:prerequisites | 105 | 8 | 8 | 105 | 105 | 44-188 | 13 | 50 |
| P6 | earlier:domain-estimate | 2 | 0 | 0 | 2 | 2 | 69-153 | 2 | 2 |
| P6 | later:prerequisites | 53 | 42 | 42 | 53 | 53 | 34-199 | 0 | 0 |
| P6 | later:domain-estimate | 56 | 11 | 11 | 56 | 56 | 30-163 | 0 | 0 |
| P7 | earlier:prerequisites | 118 | 35 | 52 | **117** | 118 | 1-122 | 15 | 60 |
| P7 | earlier:domain-estimate | 7 | 7 | 7 | 7 | 7 | 34-61 | 1 | 7 |
| P7 | later:prerequisites | 86 | 31 | 32 | 86 | 86 | 5-202 | 0 | 0 |
| P7 | later:domain-estimate | 2 | 2 | 2 | 2 | 2 | 30-41 | 0 | 1 |
| P8 | earlier:prerequisites | 93 | 12 | 13 | 93 | 93 | 3-133 | 4 | 26 |
| P8 | later:prerequisites | 73 | 60 | 60 | 73 | 73 | 13-126 | 0 | 0 |
| P8 | later:domain-estimate | 4 | 4 | 4 | 4 | 4 | 77-90 | 0 | 0 |

Totals: 11 probe runs (9 distinct histories; P0b and P3h are display variants), 2,320 moved cards, 165,162 ranked passed pairs. T0 never failed: no card passed a card of equal value. No `refresh` code was assigned in any probe.

**Sensitivity: which state maps the q term for "later".** §1 maps the q term by the upper card's state (u = the card that passed), as `rank` does for its own rows. Mapping it by the moved card's own state instead changes later:domain-estimate in P2 to 44/58 some-con (from 45) and costs one card in each of P3-P7 (P3 47/48, P4 45/46, P5 34/35, P6 55/56, P7 1/2 some-con). It changes later:concept-known to 1/1 at every strength in P2, P3 and P4. Earlier rows do not change.

**What the P2 later:domain-estimate failures are.** All 13 are cs lessons from default slots 155-214 that were pushed down 2-58 slots. The row just before each run is a probability lesson (for example `significant-but-false`) that sits ahead on its lower domain q. Every card that actually passed them (12-60 each) won on the prerequisite factor (the decisive pair code was `prerequisites` for every one), and the domain term does not favour any passer at all (its swap closes 0 of the gap), so the domain estimate is no reason, decisive or partial, that these cards fell behind the lessons that passed them.

**What the P3 later:concept-known card is.** `pennies-dont-add-up` (q 0.987, its concept already studied) falls from default slot 162 to 228. The row before its run is `hash-bucket-pileup` (concept-known, about that lesson's own concept). The 67 cards that passed it are all new lessons, ahead on the domain estimate. The true reason is the card's own concept state, but the row's facts describe another lesson's concept.

## 4. Findings

Strength that stays true for every card assigned the pair, across all 11 probes (descriptions, not copy; copy is RC's):

| pair | strongest strength true for every card | fails at the next stronger |
|---|---|---|
| earlier:prerequisites | S-some-contributing ("prerequisites helped it move ahead of some lessons") | S-some-decisive 117/118 in P7; outside cold start S-all-decisive 2-30%, S-all-contributing 3-44% |
| earlier:domain-estimate | S-some-contributing | S-some-decisive 24/26 (P1), 17/19 (P2); S-all-* 0-8% except P7 (7/7) |
| later:prerequisites | S-some-decisive ("behind some lessons because of their prerequisites") | S-all-decisive 36-100% |
| later:domain-estimate | **none** | S-some-contributing 45/58 in P2 |
| later:concept-known | **none** under the row's facts (1/1 only if read as the card's own concept state) | S-some-contributing 0/1 in P3 |
| earlier:refresh, later:refresh, others | not assigned in any probe; unchecked | |

Cold start (P0, P0b) is a special case: q and refresh are the same for every lesson, so only the prerequisite factor differs, and both pairs hold at S-all-decisive for every card.

### Blocking

- **B1 · later:domain-estimate.** P2: for 13 of 58 cards (22%), no strength is true. The domain term favours none of the cards that passed them, so "behind because of the domain estimate" is false of each card that passed. Under the moved-card mapping it is 14 of 58, plus one card in each of P3-P7. The rule's code here explains the boundary above the run, set by a lesson in another domain, and not the move. **Per the brief's rule this is blocking.** It needs either a candidate that emits its own moving reasons or a change to the rule. Both are outside this check (stop-if): they belong to vp-personalization, with RC.
- **B2 · later:concept-known** (one card per probe in P2, P3, P4). In P3 no strength is true under the rule's mapping: the row's code and facts are about `hash-bucket-pileup`'s concept, and every card that passed was ahead on the domain estimate. It holds only if the line is read as "this card's own concept is likely known", which is a different fact from the one §6.3 passes (the row's `concept`, `completedSlugs` and `recalls*`). Blocking as §6.3 is written. It would become a note if the later-direction q code were taken from the moved card's own state. That is a rule change, not mine to make.

### Notes

- **N1 · The strong forms are false almost everywhere outside cold start.** "Ahead of (behind) the lessons it passed because of C", meaning every passed card, held for 2-30% of earlier:prerequisites cards and 0-8% of earlier:domain-estimate cards (P7's 7 of 7 the exception) in every non-cold probe, and for 36-100% of later:prerequisites cards. A moved card passes 1-212 ranked cards, and the run-end code is decisive against only some of them. Whatever RC writes must be a "some lessons" form. For earlier pairs it must also be a "helped" form, not a "because" form (S-some-decisive fails in P1, P2 and P7).
- **N2 · Facts belong to the row, not to the card (copy condition; it becomes blocking if the copy uses facts).** The assigned row is the card itself for 2-15% of earlier cards and never for later cards. The row's prerequisite set equals the card's own for 14-57% of earlier:prerequisites cards. For later rows the facts are always another lesson's. The one exception found is earlier:domain-estimate, where the row's `domain` was the card's own in every case (a run shares the domain q). A line that names prerequisites, a concept, completed lessons or recall counts from `ReasonFacts` would state facts about another lesson for most cards. Today only the code, and for earlier:domain-estimate the domain, are true of the card.
- **N3 · No `default-order`, `last` or missing row for any moved card** in any of the 11 probes, and no moved card that passed no ranked card. This is observed, not proven. T6 remains the guard, and a probe with deep mid-scroll pins (`h` well past the completed lessons) was not run (P3h's pin covered only completed slots).
- **N4 · Unranked cards are also passed.** In P5-P8, moved cards jump over completed lessons kept in place (454-1,596 such crossings per probe), and in the all feed over every non-pilot card. These are not comparisons `rank` made, so no reason is about them. A line must not read as "ahead of lessons you have done" or as ahead of other subjects.
- **N5 · `refresh` never appeared** in any probe. Under §6.3 its line is unchecked against passed cards. A history built to produce it (studied concepts whose refresh term beats the new gain) should be probed before RC's line for it is accepted.
- **N6 · Cold start is clean.** Both pairs are true at S-all-decisive, so any of the strengths above would be true at cold start.
- **N7 · Sensitivity to the "later" mapping** is small for later:domain-estimate (one card per probe) and decisive for later:concept-known (§3). Whoever owns the rule should state which state the q code is read from for a "later" card.

## 5. Within the privacy ceiling (Q-P5 / E10)

Added on the chief of staff's note, after §1-§4. The ceiling (company/reviews/_privacy/2026-10-17-edd-010-design-read.md, Q-P5, E10) allows three fact classes in a reason line: (a) a named lesson the learner finished, (b) a count of finished lessons in a subject or concept, (c) a catalogue relation ("Y builds on X"). It refuses prediction tallies, estimates, probabilities, traits, comparisons to other learners, time gaps and pressure language, it puts "know" and "behind" on the deny-list, and it lets no number from `rank` reach the copy layer. So the question in §4 becomes: which statement built only from (a)-(c) is true for every card assigned each pair, and is it a reason for the move or only a fact placed next to it?

The same scratch script with a fact layer added (scratch `f6p.mts`, sha256 7413abc9…1613) counts, per moved card: a prerequisite concept with a finished lesson (pre-done); no prerequisite inside the pilot (no-pilot-pre); a finished lesson in the card's domain (dom-done) or on its concept (con-done); at least one unfinished in-pilot prerequisite (x-unmet); and, against the cards it passed, fewer unfinished in-pilot prerequisites than they have (fewer-unmet, all or some). Shares are cards / n:

| pair | true for every card in every probe | not true for every card |
|---|---|---|
| earlier:prerequisites | (c, some) it has fewer unfinished prerequisite lessons than some of the lessons it moved ahead of: fewer-unmet-some = n in all 11 | builds on a lesson you finished (pre-done): 0-42%; that or "needs no lesson from this set first": 13-65%; fewer than all it passed: 0-100% (all only at cold start) |
| later:prerequisites | (c) it builds on a named pilot lesson (no-pilot-pre = 0 in every probe, so every such card has an in-pilot prerequisite) | it builds on a lesson you have not finished (x-unmet): 44/47, 50/53, 50/54, 48/51, 46/53, 67/86, 65/73 in P2-P8; some passer needs fewer unfinished lessons: 44/47 to 65/73 |
| earlier:domain-estimate | (b) you finished at least one lesson in this subject: dom-done = n in P1-P7 | as a *reason*, nothing in (a)-(c): the cause is first-prediction results, which Q-P5 refuses to show. dom-done is equally true of the later:domain-estimate cards (also n in every probe), so the same fact sits on cards moved both ways |
| later:domain-estimate | (b) the same subject count is true for every card | the cause is again prediction results; plus B1 (for 13/58 cards in P2 the domain term is no reason at all) |
| later:concept-known | (a)/(b) you finished a lesson on this idea: con-done 1/1 in P2, P3, P4, but only when read from the card's own concept | under §6.3 the facts are the row's concept (another lesson's), so the line would name the wrong idea (B2) |

**B3 · domain-estimate, both directions, under the privacy ceiling (blocking; added in §5).** For either domain-estimate pair, no allowed fact class states the cause. The order moves because first predictions in a subject were right or wrong, and Q-P5 refuses to show that, correctly. The one allowed fact that is true for every card ("you finished N lessons in this subject") is just as true for cards moved the other way, so a line built on it reads as a reason when it is not one. Under the brief's rule (a strength true for every card), no causal strength survives the ceiling for `earlier:domain-estimate` or `later:domain-estimate`. That makes B3 blocking. It is a joint finding with RC and privacy-reviewer: if RC rules that a non-causal juxtaposition ("you've finished lessons in this subject") is acceptable reason copy, B3 falls to a note. Whether it is acceptable is RC's ruling, not mine. privacy-reviewer flagged this risk at Q-P5 ("whether even that is true for every card is F6's and RC's to prove").

**What stays true within the ceiling, per pair:**
- earlier:prerequisites: a catalogue-plus-completion relation in the "some lessons" form only. Every card has fewer unfinished prerequisite lessons than some of the lessons it moved ahead of, and this matches §4's S-some-contributing. It is a lesson-to-lesson comparison, not a comparison to other learners. Whether Q-P5's "comparison" covers it is privacy-reviewer's to say (the chief of staff's note lists "comparisons" without that qualifier).
- later:prerequisites: only the bare catalogue relation "it builds on X" (named lesson) is true for every card. "X is unfinished" fails for 6-22% of cards (P2-P8). The word "behind" is on E10's deny-list, so later-direction copy cannot use it whatever the strength.
- domain-estimate (both): no causal line (B3, plus B1 for later).
- concept-known (later): "you finished a lesson on this idea" is true only if the idea is the card's own, which needs a rule change (B2).
- No line may carry a number from `rank` (E10). The counts above (b) come from the history, not from `rank`, and must be built by the glue from `progress`, not taken from `ReasonFacts` (the `rightPredictions`, `wrongPredictions`, `recallsRight`, `recallsWrong`, `pKnown`, `estimate` and `daysSinceLastEvent` fields are all refused).

## 6. After reading S1's account (EDD-010 §3.2, mailbox 20261017T193738472Z-personalization-engineer-a2bb2da8)

Read only after §1-§5 were written. S1's moved counts agree with mine: 229 at cold start with no pin (my P0b), 225, 209 and 208 for the three histories. With §5.4's first-card pin, cold start is 228 (P0). S1 says the rule covers every moved card in its four probes and leaves truth unproven. N3 agrees on coverage, and §3-§5 answer the truth question. One difference of method: S1's probe compares rank position with the position in the default list once completions are removed. This read compares positions in §5.4's display, where completions keep their slots and the first card is pinned. The pairs assigned are the same, and so are the counts for the three shared histories.

## 7. Reproduction (pair test, verbatim from the scratch script)

```ts
const valueOf = (t) => (1 - t.q) * t.newGain * t.prereqFactor + t.q * t.refresh;
function pairCode(u, l, mapBy = u) {           // u shown above l
  if (!(u.value > l.value)) return { code: null, contrib: new Set() };   // T0
  const sw = [
    { c: "prerequisites", v: u.value - valueOf({ ...u.terms, prereqFactor: l.terms.prereqFactor }) },
    { c: "q",             v: u.value - valueOf({ ...u.terms, q: l.terms.q }) },
    { c: "refresh",       v: u.value - valueOf({ ...u.terms, refresh: l.terms.refresh }) },
  ];
  let b = sw[0]; for (const s of sw) if (s.v > b.v) b = s;            // rank's own tie rule
  const m = (c) => (c === "q" ? (mapBy.hasState ? "concept-known" : "domain-estimate") : c);
  return { code: m(b.c), contrib: new Set(sw.filter((s) => s.v > 0).map((s) => m(s.c))) }; // T1, T2
}
```
To get `terms` and `hasState`, add `terms: row.terms, hasState: !!row.s` to the two `return` objects in `rank`'s final `rows.map` of a scratch copy, and assert that the copy's `{slug, value, reason}` equals the frozen file's on every probe. The display walk is §5.4 step 5 as described in §2. Dims come from `git show 4a559d6:src/lib/learner/dims-index.generated.ts`, filtered as EDD-010-probe.mts filters them.

## 8. Verdict

**Blocking: 3** (B1 later:domain-estimate; B2 later:concept-known, as §6.3 passes facts; B3 domain-estimate in both directions under the Q-P5 ceiling, which falls to a note if RC rules that a non-causal juxtaposition is acceptable). **Notes: 7** (N1-N7). §6.3's rule is true at its run boundaries by construction. Against the cards a moved card actually passed, it is true only in "some lessons" forms, and for later:domain-estimate not even that for every card. Within the privacy ceiling, the only causal statements that stay true for every card are the prerequisite ones (earlier: fewer unfinished prerequisite lessons than some lessons it moved ahead of; later: the bare catalogue relation). Per the brief's stop-if, the fix (a v3 candidate that emits its own moving reasons, or a changed rule, for example one that reads q from the moved card's own state, or that withholds domain-estimate moves from reason lines) is not designed here. It goes to vp-personalization with RC and privacy-reviewer.

Confidence: high on the counts (deterministic, and the frozen output was asserted equal on every probe). Medium on the truth test's mapping of the q term for later cards (N7), which decides B2. Medium on B3, which rests on RC's reading of "reason".
