# Build note: biased-judge-noisy-judge (v1)

builder: demo-builder (builder-books-pilot) · 2026-10-14 · W-631 · brief `company/domains/briefs/books.md` #14 (W-556 pilot exemption, ruling 2) · status draft · every claim unverified. Kept from evaluators until they report.

## What was built
Single card, no `<CardSequence>`. Strips per judge, ten dots each (one per case, a lane each) placed by years off a green "fair sentence" line; a dashed tick at each judge's mean; axis −4 to +6 years (ticks −2 to +6 labelled). Presets in brief order: "Judge A: biased", "Judge B: noisy", "Judge C: both". Each sets the focused judge; the focused preset is disabled (QA rule 3). Readout for the focused judge: "Judge C: error 8.0 = bias² 4 + noise² 4". Each judge's strip keeps "error 4.0" once shown, and a Seen row lists "Seen: A 4.0 · B 4.0 · C 8.0". Errors from `books-strategy-wave1-check.mjs` #14: A all +2; B −3, −3, −1, −1, 0, 0, 1, 1, 3, 3 (fixed shuffle across lanes); C = B + 2. noise² is the population variance. Locked frame: two empty strips (A, B) and the fair-sentence line; C's strip appears when C is first shown.

## Departures from the brief (for cm-books)
- **The reveal gates on a-seen, b-seen and c-seen**, not only a and b. The reveal quotes C's score ("scored 8.0"), and the standard says every quoted value is from a milestone on the required path. QA presses all three, so the path is the same.
- Reveal text is the brief's draft unchanged (78 words; 86 measured with the kit header), split into three paragraphs so the "Does it hold up?" line is separate.
- Squared errors shown with one decimal (4.0, 8.0) everywhere, including the reveal, as in the brief's readout.

## Copyright checklist (books-strategy §6)
1. [x] No sentence of the book. 2. [x] No quote. 3. [x] The book's target-shooting figure is not copied or imitated; our picture is dot strips against a line. 4. [x] No scenes or characters. 5. [x] No artwork. 6. [x] Title "Two judges, two kinds of error" and hook do not name the book. 7. [x] One idea. 8. [x] c3, c4 name Part II / ch. 1 or 2, unconfirmed. 9. [x] The sentencing study is cited to Partridge & Eldridge 1974, not the book. 10. [x] c5 is the separate, labelled verdict, "holds up". 11. [x] No advice. 12. [x] 2021.

## Pre-flight v1
1. **Title and hook.** "Two judges, two kinds of error" / "One judge is always too harsh. The other is right on average. Who errs more?" No hint that they tie. No.
2. **Options.** "Judge A's" / "Judge B's" / "They are the same": none numbered. Yes.
3. **Locked stage.** Two empty strips labelled Judge A and Judge B, a "fair sentence" line, axis ticks, and the three preset labels. Nothing matches "the same". No.
4. **Reveal values.** "4.0" = `rec.A`, recorded at milestone `a-seen` (B's 4.0 is recorded at `b-seen` and shown beside it); "8.0" = `rec.C`, recorded at `c-seen`. All are on the stage at the reveal (strip labels, Seen row, readout).
5. **QA path.** Three presses in DOM order reach all three milestones; the question's case (A and B) is reached by the first two.
6. **Reset.** No Reset (brief). Recorded values are set once and never cleared.
7. **Phone fit.** reveal-fit at 390x844: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0 (Judge A/B/C visible), phoneFit true, 86 measured words. Screenshot `artifacts/reveal-fit/biased-judge-noisy-judge.png`. SVG labels 11 px, picture drawn at scale 1 (196 px tall).

## Measurement note
Same as total-signups-hide-the-slide: the dev server's 50-105 s loads exceeded reveal-fit's 15 s wait, so I measured with a temporary copy of the tool with only the load timeouts raised (then deleted it), and ran QA with `--timeout=400000`. I fixed a "years off"/"−4" label overlap after that measurement (dropped the −4 tick); the final re-measure below is on the fixed code.

## QA (local, dev server 3530)
`QA_BASE_URL=http://localhost:3530 QA_ONLY=total-signups-hide-the-slide,biased-judge-noisy-judge QA_OUT=artifacts/qa-books-pilot npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=400000`: 4 passed (phone and desktop, both lessons), report `artifacts/qa-books-pilot/qa-report.json`. Final reveal-fit re-run on the current code: both fit, crop 0, namedHidden 0, phoneFit true (89 and 86 measured words).
