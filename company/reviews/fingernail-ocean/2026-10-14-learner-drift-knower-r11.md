# Learner review r11: fingernail-ocean (screenshot re-review)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v4
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: drift-knower (same tag as r6/r8). Knows continents drift and the Atlantic separates South America and Africa; does not know how slow plates move or how much time such a speed needs to make an ocean.
artifact: `WALKTHROUGH_URL=http://localhost:3590 npm run walkthrough -- fingernail-ocean` against a release build I started on :3590. transcript.md read first, then sheet.png.

**Screenshots: I looked at the screenshots.** sheet.png (all 7 frames) was read as an image, and I cropped and compared the map in 02-step-1.png (3,000 km) and 05-step-4.png (5,775 km) to check that the drawn shift scales with the readout. This review is written from what the images show. It answers the publish hold (company/ops/publish-holds.json).

path walked: chose 12 million years; Run to 3,000 km; +1 million years; +10 million years; +100 million years; Back to today; reveal.

## Findings (written before reading meta.json)

- **r8's Finding 1 is fixed in the images:** the locked caption (frame 1) now reads only "Toy: South America rides its plate west at 2.5 cm a year. Dashed: today." The "= 25 km per million years" conversion appears only after the commit (frame 2 on). The question is no longer answered before I lock in.
- **Prediction:** 12 million / 120 million / 1.2 billion are factor-of-ten apart, so the choice tests the unit conversion, which is the hard part for this mind. Good tension.
- **The map moves in proportion:** blue South America sits about one country-width west of the dashed outline at 3,000 km, and about twice as far at 5,775 km. +1 million years (25 km) is invisible on the map, which itself makes the "too slow to see" point.
- **Weak spot (not a blocker): the button does the sum.** "Run to 3,000 km" jumps straight to 120 million years, so on this path I never work out the number; I read it. The reveal then gives the arithmetic (300 million cm; 25 km per million years). The step buttons let me feel the rate afterwards, but the computation itself is told.
- **Weak spot:** the "new ocean" is a readout, not a labelled region. The picture shows South America sliding away from its dashed outline (and over Central America and into the Pacific, as a toy), not the Atlantic visibly widening against Africa. For this boundary, which knows the Atlantic sits between them, a picture of the gap to Africa would match the question better.
- Trust link reads "4/5 claims checked"; one claim is withdrawn (seen after reading meta), which a learner may read as unchecked. Not a learner-model issue.
- Reveal fits the phone frame with the stage visible; no clipping in any frame.

## After reading the brief

The objective says the learner "can compute" 120 million years. On this path the stage computes it and the reveal explains it; the learner's own computation happens only in the prediction. That is the main gap between intent and experience, and it is a weak spot rather than a fatal flaw: no false claim, no dead control, and the misconception (moves fast enough to notice, or not at all) is answered by the 25 km per million years rate and "about 2 metres in a lifetime".
