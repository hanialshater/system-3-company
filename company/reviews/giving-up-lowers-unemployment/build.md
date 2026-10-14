# Build note: giving-up-lowers-unemployment

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #62

- Intent: a 10 × 10 grid of people inside a "counted" box (filled = working, red ring = looking); people who stop looking slide (CSS transform transition, 0.35 s, off under reduced motion) to a grey "not looking" box outside it. Rate and jobs are big numbers beside the grid (folded into the picture, not a readout row); "start 10%" sits under the rate. Dots are 12 viewBox units (about 13 px on a 390 px phone) with 4-unit gaps, as the brief asks.
- Controls (DOM order): [4 stop looking] [4 find jobs] presets (each from the base 90 / 10), then a slider "Stop looking" (0 to 10, from the base; moving it clears "find jobs").
- Milestones: "gave-up" (4 stop looking: 6.25%, jobs 90 recorded) and "found" (4 find jobs: 6%, jobs 94 recorded); the record row keeps both lines, so the QA path's final slider state (2 stopped looking, 8.16%) does not hide them.
- "Discouraged workers", ILO and BLS kept out of learner text; the chip says the rule as the lesson's own count.

## Pre-flight v1

1. **Title and hook.** "4 people stop looking. What happens?" / "Nobody finds a job, but 4 people stop searching. What does the unemployment rate do?" Questions; no direction.
2. **Options.** "rises" · "stays at 10%" · "falls". Only the middle option has a number, and it is the wrong one (the base value from the question), so the right option is not the precise one.
3. **Locked stage.** Chip with the counting rule, the 10 × 10 grid at the base (90 filled, 10 rings), "counted" box, empty "not looking" box, rate and jobs "?", "start 10%" (the question's own base). No 6.25, no moved dots.
4. **Reveal values.** "from 10%": the base, printed "start 10%" under the rate. "to 6.25% and jobs stayed at 90": (b) milestone gave-up, record line 1. "fell to 6% and jobs rose to 94": (b) milestone found, record line 2.
5. **QA path.** DOM order: 4 stop looking (gave-up), 4 find jobs (found), Stop looking slider two right presses (0 → 2: 8.16%, jobs 90). Both milestones in 2 presses; both record lines on the stage at the reveal. Probe confirmed every press changed the stage.
6. **Reset.** No Reset control; presets rebuild from the base, records persist. Reveal text from the QA path: "When 4 people gave up, the rate fell from 10% to 6.25% and jobs stayed at 90: the 4 left the count, so the top and the bottom both shrank. When 4 found jobs, the rate fell to 6% and jobs rose to 94. / Two almost equal rates, two different stories. A falling rate alone cannot tell you which happened; the number of jobs can. A toy town of 100."
