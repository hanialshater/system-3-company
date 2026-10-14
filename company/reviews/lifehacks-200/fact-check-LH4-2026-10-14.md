# Fact-check LH-4: Life Hacks re-checks after W-367 and the resource recall patch (W-380)

- **Checked by:** fact-checker (fresh instance), 2026-10-14. I wrote none of these claims, the FC LH-1 FIX wording, or the recall patch.
- **Method:** read src/lib/lifehacks/* (resource-model.ts, resource-specs.json, home-models.ts, home-lessons.ts, studyCatalog.ts, studyModels.ts) and the three engines in src/components/lifehacks/, plus every target meta.json. I re-ran the numbers in node (`--experimental-strip-types`) against the lessons' own code: `evaluateResource` over every slider step for the 25 hook lessons, `evaluateHome`, `queueResult`/`roundRobinQueue`, `fileResult`, `editResult` and `calendarResult`. Every resource recall item was recomputed independently, and also through the lesson formula where its constants match.
- **What I did not see:** the rendered stage. There are no walkthroughs for these lessons (artifacts/walkthroughs has only three lh-* lessons), and the brief says not to build. Stage text below is taken from the code that renders it, not from a screenshot.
- **Sources:** every verdict here rests on derivation from repository code or on a stipulated scenario. None rests on an external source, so nothing was verified on a source I could not open.
- **Scope:** the home and study `.recall` claims are excluded (LH-3A, LH-3B). Also excluded are the claims W-369/LH-2 owns: the NIST/energy.gov.au c5 claims, the tariff warning c6 claims, lh-scale-recipe-portions c5, and lh-percentage-overage c5 (already disputed).

## Totals

| Group | Claims | Verified | Disputed |
|---|---|---|---|
| (a) reopened by W-367 | 17 | 15 | 2 |
| (b) B7 hook claims | 25 | 25 | 0 |
| (c) lh-* c4 recall claims | 58 open (+2 already verified by LH-2) | 58 | 0 |
| **Total changed** | **100** | **98** | **2** |

Group (a) count: the brief says 18, but W-380 and the meta.json sources list 17 claims carrying the W-367 marker in the 14 lessons. These are flat-pack c3, folded-shirt c4, rolled c3, suitcase c3, agenda c1, apply-not-quote c2, file-type c1, fragmented c1, keep-the-error c1, link-label c2 and c4, preview c3, size c1 and c4, work-in-process c2 and c4, and lh-subtract-openings-area c2. The other open non-recall claims in those lessons are flat-pack c5, folded-shirt c5, apply-not-quote c5 and lh-subtract c4. flat-pack c5 and folded-shirt c5 are B1 transfer prompts that W-367 did not touch, apply-not-quote c5 is an integration boundary claim, and lh-subtract c4 belongs to group (c). I left the first three unchanged.

Group (c) count: 60 lessons. lh-scale-recipe-portions c4 and lh-percentage-overage c4 were already verified by FC LH-2, so 58 were open. A script confirmed that for all 60 lessons the meta.json recall, the resource-specs.json recall and the c4 text (`<question> Correct: <option>. <why>`) match the patch line (OVERRIDE used for lh-percentage-overage). It also confirmed that no "recall at x=" clause remains.

## Disputed (2)

- **work-in-process-limit c2 and c4** (same sentence, also the principle in studyCatalog.ts): "Slicing the same 30 minutes of work into 5-minute turns delays the first completion from minute 5 to minute 15". The numbers on the stage are right. The round-robin in order three, two, one ends at 30, 25 and 15, so the first completion is at 15. The whole-job run in order one, two, three first completes at 5. The causal claim is false, though: slicing does not move the first completion here, the job order does. With the same order, sliced or whole, three, two, one gives 15 both ways and one, two, three gives 5 both ways (checked in node with queueResult and roundRobinQueue). The reason is that job one is 5 minutes long and fits in a single 5-minute turn. **Fix (builder and cm decide):** either (1) compare the same order in both views, with a first job longer than one turn (e.g. three 10-minute jobs: whole-job 10, round-robin 20, as the new recall already does), or (2) reword to name the order (e.g. "The opening view starts the 15-minute job first; run the 5-minute job first and it finishes at minute 5."). **Related, not re-statused:** c1, the predict question "Which completes the first five-minute job at minute five?", was verified in LH-1, but on this fixture splitting also finishes the five-minute job at minute five if it goes first. Re-word it with the same fix and re-open it then.

## Verified, group (a)

- flat-pack-volume-dimensions c3: a closed 40×30×30 box is 4 panels of 40×30 plus 2 of 30×30. Assembled 36,000 cm³; stacked 40×30×6t, which is 7,200 cm³ at t=1 and 21,600 at t=3, still smaller. The stage inputs line matches.
- folded-shirt-stack-height c4: 2 layers vs 4 layers, so Two folds gives the taller stack at every count from 4 to 12. The keyed answer is the only correct one.
- rolled-or-folded-volume c3: 30×20×0.2 = 120 cm³ per sheet; count×120 in both layouts; unit " sheets", label Sheets.
- suitcase-rotate-block c3: the long way fits floor(W/18)×3 = 3 and the quarter-turn fits floor(W/12)×2 = 4 at every W from 28 to 35. The formula string matches the model.
- agenda-needs-an-outcome c1: the stage shows one topic (plan) and no outcome or owner.
- apply-not-quote c2: target 2, 5, 9; after "Try values" the input shows 5, 9, 2 and the attempt row can only be rearranged from then on. The fixture test exists.
- file-type-then-owner c1: 2 PDFs, 2 of Ana's, and only plan.pdf matches both.
- fragmented-time-does-not-fit c1: the gaps 0–10 and 20–30 are the two 10-minute gaps before minute 40; the 30-minute block fits at 40–70. The hook is 84 characters.
- keep-the-error-feedback c1: after Check, each position is marked against the revealed target.
- link-label-names-the-target c2 and c4: the fields are Artifact/Version/Section.
- preview-replace-all c3: at step 1 both "red" tokens are highlighted, and the step-1 reveal text matches the claim word for word.
- size-is-not-recency c1 and c4: the caption reads "d = day modified; higher = more recent". The size order (movie, slides, notes) is the reverse of the day order.
- lh-subtract-openings-area c2: 3x−2 and 3x give 10 and 12 at x=4. With min 3 the drawn opening (x 55–83) stays inside the wall at every width, and the drawn area ratio equals 2/(3x).

## Verified, group (b): 25 hooks

All 25 hook texts are identical in meta.json and resource-specs.json, and each holds on the stage numbers over the whole slider range: lh-count-sheets-not-rolls c6, fixed-coupon c5, free-shipping c5, discount-round-trip c5, pay-for-used c5, deposit-checkout c5, indivisible-shares c5, coverage-whole-cans c5, each-cut-allowance c5, lead-time-stock c5, merge-overlapping c5, count-before-dispatch c5, idle-versus-active c7, duty-cycle c7, fixed-energy-charge c7, flow-times-minutes c5, flow-duration-offset c5, fixed-volume-fill c5, jug-rounding c5, double-container-radius c5, overlap-material c5, duplex-sheet c5, offcuts c5, material-reuse c5 and parcel-fee c5. Each claim's source carries the specific numbers. For the question-form hooks, I checked that the stage answers the question the way the lesson teaches. One wording note: lh-overlap-material-area says "repeats along a 20cm edge", which reads as "runs the full edge". That is accurate, so I did not dispute it.

## Verified, group (c): 58 recall claims

For every item the keyed option is the only correct one. Each claim's source has the arithmetic. These are worth highlighting:
- lh-water-meter-units now keys 1.8 m³, so the safety B8 wrong-digits key is gone.
- lh-same-energy-new-tariff: 6 kWh both times.
- lh-round-lines-versus-total relies on the question stating half-up rounding (banker's rounding would give €0.12 per line).
- lh-fixed-coupon-percent, lh-fixed-energy-charge, lh-material-reuse-account, lh-pay-for-used-quantity, lh-coverage-whole-cans, lh-indivisible-shares, lh-jug-rounding-extra, lh-duplex-sheet-rounding and lh-parcel-fee-repeats were also checked through the lesson's own formula.

## Found on the way (not claims in my groups; routed)

- **flat-pack-volume-dimensions:** the choice label "Assembled cube" (predict option and toggle) names a 40×30×30 box, which is not a cube. It is a learner-visible inaccuracy that no claim records. Fix: "Assembled box". Its home `.recall` uses a 40×40×40 cube, which is consistent with itself (that claim belongs to LH-3A).
- **apply-not-quote c5** ("One short reconstruction; not a retention experiment.") is recorded as a stage line, but StudyLesson.tsx never renders `spec.boundary`, so the learner does not see it. Either render it or drop the claim.
- **lh-scale-recipe-portions c4** source still cites the old ten-portion recall (750 g), as LH-2 noted. The builder updates it.

## Next

- demo-builder: work-in-process-limit c1/c2/c4 fix; flat-pack label; apply-not-quote boundary (board).
- Walkthrough and QA of the 14 W-367 lessons are still owed (W-371-style). My stage reading came from the code, not from rendered pages.
