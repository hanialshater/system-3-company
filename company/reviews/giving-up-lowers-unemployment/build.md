# Build note: giving-up-lowers-unemployment

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #62

- Intent: a 10 × 10 grid of people inside a "counted" box (filled = working, red ring = looking); people who stop looking slide (CSS transform transition, 0.35 s, off under reduced motion) to a grey "not looking" box outside it. Rate and jobs are big numbers beside the grid (folded into the picture, not a readout row); "start 10%" sits under the rate. Dots are 12 viewBox units (about 13 px on a 390 px phone) with 4-unit gaps, as the brief asks.
- Controls (DOM order): [4 stop looking] [4 find jobs] presets (each from the base 90 / 10), then a slider "Stop looking" (0 to 10, from the base; moving it clears "find jobs").
- Milestones: "gave-up" (4 stop looking: 6.25%, jobs 90 recorded) and "found" (4 find jobs: 6%, jobs 94 recorded); the record row keeps both lines, so the QA path's final slider state (2 stopped looking, 8.16%) does not hide them.
- "Discouraged workers", ILO and BLS kept out of learner text; the chip says the rule as the lesson's own count.
