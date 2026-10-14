# Build note: bending-frontier

builder: demo-builder · 2026-10-13

- Intent: the frontier corn = 100 − wheat² as a dashed curve, with a staircase from 0 wheat to the point. Each red drop is the corn lost for one ton; the current one is thicker and labelled.
- Milestone: wheat reaches 10 tons (last ton costs 19). The slider starts at 8, so QA's two presses reach 10; the staircase still shows every drop from the first ton (1) up.
- Changed from the brief: a slider plus ±1 instead of a free-drag point (snaps to whole tons, so every drop is a whole ton).
- c3 (why frontiers bow: unlike land) is the textbook explanation, stated in the reveal; this curve itself is invented.
- After the screenshots: the "corn" axis title collided with "100" and the drop label sat on the staircase. I moved the title up and the label to the right of the drop.

## Revision v3 (wave E, r6 learner review)

- r6 #1 (W-154, the locked dashed frontier showed the last drop): no curve is drawn while locked. After the commit the dashed frontier and the staircase are drawn only from 0 to the furthest wheat the learner has reached; stepping back leaves the further steps as a faint trace.
- r6 #3 (slider resting at 8): wheat starts at 0. New step button "All 10 fields" after −1, so pressing each control once reaches the key state (milestone last-ton).
- r6 #2 (colour word "yellow" did not match): wheat fields are now crossed out and dashed; key reads "number = corn the field grew · crossed out = now wheat".
- r6 #4 (hook "So does the tenth. Right?" leaned to "no"): hook is "The first ton of wheat costs 1 ton of corn. What does the tenth cost?"
- r5 #3 (chart cropped at reveal): not changed; it is the kit's reveal layout over a tall stage. Left for the walkthrough to confirm.
- No claim text changed (c1 already covers the hook's "first ton costs 1").

## Pre-flight v3

1. Title and hook: "Does each ton of wheat cost the same?" / "The first ton of wheat costs 1 ton of corn. What does the tenth cost?" Both are open questions; neither leans to 1, 10 or 19.
2. Options: "1" / "10" / "19". All bare numbers.
3. Locked stage: axes (corn 0/50/100, wheat 0/5/10), ten plain field tiles labelled "the 10 fields", readouts "?", slider at 0. No curve, no staircase, no field numbers.
4. Reveal values: "reached 10 tons … corn hit 0 … last ton cost 19, from 19 down to 0": milestone last-ton (b); the staircase to 10 stays drawn (full or as a trace) and the 19 field is on the strip. "The first ton cost 1" and "1, 3, 5, … 19": the field numbers and steps on the stage once far = 10 (b). "the field worst for corn grew only 1; the best grew 19": the strip numbers (b).
5. QA path: slider two ArrowRight (0 → 2) → +1 (3) → −1 (2) → All 10 fields (10: last-ton). At the reveal the stage is at 10 with "−19", corn 0, all ten fields crossed out with their numbers.
6. Reset: there is no reset control. If the learner steps back after 10, the reveal still says "When you reached 10" and the faint staircase to 10 is still drawn. Reveal on the QA path: "When you reached 10 tons of wheat, corn hit 0, and that last ton cost 19 tons of corn: from 19 down to 0. The first ton cost 1. The drops grew by 2 every step: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19. / Look at the fields under the chart: they are not all alike. The first wheat went on the field worst for corn, which grew only 1; the last took the best corn field, which grew 19. Each drop on the staircase is the corn its field used to grow, and that is why the frontier bends. / A model: the curve is made up to show the shape, not data from a real farm."

## Revision v4 (W-265, phone fit, 2026-10-14)

- Decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`: at 390×844 the stage top was cropped by 33 px at the reveal (after the kit's picture shrink, 256 → 102 px). Fix: reveal trim only; the stage is unchanged.
- Reveal 119 → 88 words (548 → about 418 characters). Cut: "from 19 down to 0" (the corn readout and the 19 field show it), the repeated "The first ton cost 1" (the next paragraph says the worst field grew only 1), the full list of ten drops (now "1, 3, 5, … 19"), "on the staircase", "best corn field" → "best", and "to show the shape" in the model line. No teaching sentence removed; the claim about why the frontier bends is still the second paragraph.
- Estimated saving: 3 to 4 reveal lines, about 60 to 80 px (estimate at ~21 px and ~48 characters per line; not measured, no build in this session). The 33 px crop should go to 0 with room to spare.
- Claims c1–c4 reopened (learner sentences reworded); c4 text now "The curve is made up, not data from a real farm." Status published → review so the gate holds them until the fact-checker re-checks.

## Pre-flight v4

1. Title and hook: unchanged ("Does each ton of wheat cost the same?" / "The first ton of wheat costs 1 ton of corn. What does the tenth cost?").
2. Options: unchanged, "1" / "10" / "19".
3. Locked stage: unchanged (axes, ten plain tiles "the 10 fields", readouts "?", slider at 0; no curve, staircase or numbers).
4. Reveal values: "At 10 tons … corn hit 0 … the last ton cost 19": milestone last-ton (b). "1, 3, 5, … 19": stepCost() of the steps the stage has drawn once far = 10 (b). "worst field grew only 1; the best grew 19": the strip numbers (b).
5. QA path: unchanged (slider two ArrowRight → +1 → −1 → All 10 fields: last-ton). At the reveal the stage is at 10 with "−19", corn 0, all ten fields crossed out with their numbers.
6. Reset: no reset control. Reveal on the QA path: "At 10 tons of wheat, corn hit 0, and the last ton cost 19 tons of corn. The drops grew by 2 every step: 1, 3, 5, … 19. / The fields under the chart are not alike: the first wheat went on the field worst for corn, which grew only 1; the last took the best, which grew 19. Each drop is the corn its field used to grow: that is why the frontier bends. / A model: the curve is made up, not data from a real farm."
7. Phone fit: reveal 88 words. Named by the reveal: the field strip under the chart, the staircase drops. Stage-top crop: not measured (no build or walkthrough allowed this session; W-242 not landed). Estimated 33 px → 0 px. Needs a 390×844 screenshot of the open reveal from the next build.
