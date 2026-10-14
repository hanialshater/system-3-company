# Fact-check LH-1: all 200 Life Hacks lessons (PR #2)

- **Checked by:** fact-checker, session 2, 2026-10-14, against the PR head `71e99fee` (eight batches B1–B8).
- **Received:** by message ("S2 XFER 2/5"), because session 2's pushes are blocked. The per-claim JSON originals (`fact-check-B1..B8.json`) and the 200 per-lesson notes remain on session 2's local commits.
- **Applied:** by session 1's chief of staff on 2026-10-14, after the PR #2 integration merge (73f1676), with `checkedBy: fact-checker`, `checkedOn: 2026-10-14` and an "FC LH-1" source note. Script: transcribed lists below.
- **Totals (session 2):** 803 verified, 26 disputed, 54 unverified (source unreachable or recall), plus 25 hook lines with no claim yet.
- **Applied here:** 800 verified, 17 disputed. **Not applied (12):** `elastic-loop-release` (c1 c2 c3 c4), `group-cables-with-ends` (c1 c2 c3 c4) and `lh-percentage-overage` (c1 c2 c3 c4) were being fixed by demo-builder (W-357, W-358) at the time and are re-checked after the fix.
- Claims added during integration (the 9 safety warning lines, `apply-not-quote` c5) were not in LH-1 and stay unverified.

## Not verified (unverified, not disputed)

### B1 recall c5 (24)
The keyed answer is the generic option 0 "Check the mechanism and its stated constraints", which doesn't answer the question. The recall patch replaces them all. Affected c5 claims: bag-weight-before-volume, box-handle-clearance, breeze-is-not-extra-surface, care-label-first-choice, circle-tray-square-corners, cm-to-inches, coiled-cord-bend-radius, desk-supply-near-use, door-swing-clearance, drawer-divider-cost, drying-room-water-load, duplicates-two-stations, elastic-loop-release, file-fold-see-each-shirt, fitted-sheet-corners-nest, flat-pack-volume-dimensions, folded-shirt-stack-height, furniture-through-door, garment-overlap-hides-face, group-cables-with-ends, half-size-two-towels, heavy-book-close-to-back, humidity-evaporation-gap, jacket-last-first.

### Source unreachable (accept on corroboration, or re-check from a connected host)
- care-label-first-choice.c1: ginetex.net blocked. Snippets agree on the ISO 3758 natural-drying symbols (horizontal line = flat dry). The claim itself is a hypothetical and logically true.
- cm-to-inches.c1: nist.gov blocked. The 1959 agreement gives inch = 2.54 cm exactly. Arithmetic checked: 30 cm → 12.000 in (/2.5) vs 11.811 in (/2.54).
- humidity-evaporation-gap.c1: openstax.org blocked. Snippets of section 13.6 agree. The claim (gap = (1−RH)·p_sat) is standard.
- square-bow-stays-tied.c1 and c5: Fieggen page blocked. Wikipedia, Fieggen quotes and Daily-Diamond 2017 (Proc. R. Soc. A) agree.
- mail-exact-phrase.c2/c4, mail-minus-noise.c2/c4, mail-or-vs-and.c2/c4: Gmail Help 7190 blocked. Fixtures re-derived correctly. Operators agree per secondary sources. Low risk.
- search-the-document-body.c2/c4: Drive Help blocked. Fixture correct, and a search summary agrees that Drive searches content. Low risk.
- plain-text-paste-scope.c2/c4 and selection-not-focus.c2/c4: fixtures correct. The "varies between applications" sentence is unsourced, because the cited WinUI accelerators page doesn't cover it.
- version-nine-and-ten.c2/c4: fixture correct. The sentence "many real file browsers already use natural numeric sorting" is unsourced. Fix: cite the learn.microsoft.com StrCmpLogicalW page and soften it to "some file browsers, such as Windows File Explorer, sort digit runs numerically".
- lh-align-price-units.c5, lh-big-pack-price.c5, lh-count-sheets-not-rolls.c5: NIST SP 1181 (2025) blocked. It exists, and HB 130 IV.C corroborates it.
- lh-annual-label-cost.c5, lh-duty-cycle-energy.c5, lh-fixed-energy-charge.c5, lh-idle-versus-active.c5, lh-purchase-plus-running.c5, lh-same-energy-new-tariff.c5, lh-standby-days-add-up.c5, lh-watts-hours-trade.c5: energy.gov.au blocked. kWh = W×h/1000 and cost = kWh×price are correct by definition, and sa.gov.au corroborates them.

### Hooks with no claim (25)
The hook/title holds but is not recorded as a claim: lh-count-before-dispatch through lh-pay-for-used-quantity (the 25 B7 resource lessons). The builder records each as an unverified claim.

## Disputed (26): each needs a fix and then a re-check
- elastic-loop-release.c1/c3/c4: "the shown/drawn/depicted crossing" refers to a drawing that doesn't exist. View 'cord' has no branch in HomeLesson.tsx Scene() and falls to the default box with an X (found by reading the code; confirm in QA). The cited Raymer & Smith 2007 doesn't support slide-off. FIX: add a cord/loop drawing for view 'cord', or remove "shown/drawn/depicted" from c1/c3/c4 and the stage question. Retype support to derivation (topology). *(W-358, in progress.)*
- group-cables-with-ends.c1/c3/c4: the same missing drawing ("the drawing distinguishes…", "depicted"). The arithmetic is right (ends 2×cords → 0). FIX: add a cord-bundle drawing (loose ends vs secured ends), or drop the drawing wording, then source-check Raymer & Smith p.16435. QA should also check coiled-cord-bend-radius, which has the same box picture. *(W-358, in progress.)*
- flat-pack-volume-dimensions.c3: "6panels=40×30×t" is wrong, because a 40×30×30 box needs 4 panels of 40×30 plus 2 of 30×30. FIX the input line to "4 panels 40×30 + 2 panels 30×30, thickness t; stack envelope 40×30×6t; assembled reference 40×30×30".
- folded-shirt-stack-height.c4: the options don't answer "What changes when you halve the footprint again?". FIX: "Which fold count gives the taller stack of the same shirts?" (key: Two folds), or change the options to taller/shorter/same.
- rolled-or-folded-volume.c3: the slider unit renders "12shirts" but the model is a 30×20×0.2 cm sheet. FIX: spec.unit " sheets" with label "Sheets", or state on the stage that each shirt is modelled as one sheet.
- suitcase-rotate-block.c3: the formula says floor(24/itemH) but the bag is 36 cm tall. FIX the c3 text and the formula string in home-lessons.ts to "Count=floor(W/itemW)×floor(36/itemH), item=18×12 or 12×18 cm". Also cap the slider at 35, or add "(from W=36 cm both orientations fit 6)".
- agenda-needs-an-outcome.c1: "Three discussion topics…" but the stage shows one topic. FIX the hook and c1 to "A topic alone does not name the decision needed."
- apply-not-quote.c2: "the target uses new values" is wrong (the target is the same 2, 5, 9), and the cited R&K 2006 is irrelevant. FIX the claim and principle to "The target is 2, 5, 9 in ascending order, smallest to largest. Matching it requires applying the rule to the numbers shown." and cite the exercise fixture.
- file-type-then-owner.c1: "Four files match one clue." is false (2 PDFs, 2 Ana files, list.txt matches neither). FIX the hook in studyCatalog.ts and c1 to "Four files; two are PDFs and two are Ana's. Which one matches both?"
- fragmented-time-does-not-fit.c1: "Three gaps total thirty minutes." contradicts the calendar, which has two 10-min gaps before minute 40. FIX to "Before minute 40 the calendar has two separate ten-minute gaps. A thirty-minute task needs one continuous gap." (Optional: change the recall distractor to "Any two 10-minute gaps"; the recall patch replaces it anyway.)
- keep-the-error-feedback.c1: "useful evidence only if you compare it" is contradicted by R&K 2006. FIX the hook and c1 to "Comparing your attempt with the target shows which item you got wrong."
- link-label-names-the-target.c2/c4: "scope" should be "section", because the stage fields are Artifact/Version/Section. FIX it in the principle (studyCatalog.ts), c2, c4 and recall.why.
- preview-replace-all.c3: the preview reveal says "The highlighted position is 1; finding did not rewrite the tokens.", but both "red" tokens (positions 1 and 3) are highlighted. FIX observation() in StudyLesson.tsx for this slug at step 1 to read "The preview marks 2 exact matches, at positions 1 and 3; previewing did not rewrite the tokens."
- size-is-not-recency.c1/c4: the day-number direction is never stated ("90MB d1"). FIX the caption to "d = day modified; higher = more recent" (or show "day 9 (latest)"). The Drive help citation is also off-topic.
- work-in-process-limit.c2/c4: the bars in the opening view are 5-min round-robin slices, and the first job does finish (at minute 15). FIX the text to "In the whole-job view each bar is one job run to completion. Slicing the same 30 minutes of work into 5-minute turns delays the first completion from minute 5 to minute 15; starting and finishing are different counts." Also, "Swap first" gives a first completion of 10, not 5.
- lh-percentage-overage.c2/c3/c4: (a) Float bug: the stage shows 56/100/111/122 at Required 50/90/100/110, where the right values are 55/99/110/121; full scale shows 133, should be 132. FIX resource-specs.json formulaA → ["ceil",["/",["*","x",11],10]]. (b) "The formulas match only at that crossover" is false: they are equal for 91 to 100. FIX the principle, recall.why and the c3/c4 text to "The two orders are equal for requirements from 91 to 100 (95 and 100 on this slider); above 100 the percentage order is larger." *(W-357, in progress.)*
- lh-subtract-openings-area.c2: at Width=1 m the 2 m-wide opening is drawn wider than the panel. FIX: variable.min 1 → 3 in resource-specs.json (start 4 and recall 7 unchanged).
