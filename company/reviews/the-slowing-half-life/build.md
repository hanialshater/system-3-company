# Build note: the-slowing-half-life
- Key state: second order halved twice (waits 10 then 20 min, milestone 'second-twice'), then first order halved twice (10, 10, milestone 'first-twice'). QA path: slider (two presses = two halvings) then the '1st order' chip.
- Design change from the brief: halvings on a slider (0-3) rather than a 'wait for half' button, so QA's two arrow presses land on the key state; the other order's curve stays as a dashed ghost so both curves share one chart.
- All times from timeTo() (1/[A] = 1/A0 + kt, k = 1/800 L/(mmol min)); question options computed from wait().
- After screenshots: 'mmol/L' collided with the 80 tick and then clipped; widened the left margin. Wait brackets alternate colour so adjacent waits read as separate.

## Revision v2

Review 2026-10-13: 'order' and k[A] undefined, the why told. Question defines half-life and second order (molecules must meet in pairs); buttons renamed; k[A] formula dropped; new 'Rate vs start' readout shows 1/4 per halving (2nd order) against 1/2 (1st order). c2, c4 reworded, unverified.

## Pre-flight v4

Revision for r6 (adult-beginner): the reveal quoted a 2nd-order "1/4" that the two-press slider sweep passed in one step. Now each order has a rate row that keeps every halving reached, and the reveal quotes the rows. Title renamed (it said "slows down", which pointed at 20 min). Locked chart shrunk (34dvh) so the readout row is less cropped. c4 reopened.

1. **Title and hook.** "Does the next half take as long?" / "Half gone in 10 minutes. Is the next half gone in 10 more?" Both ask; neither says longer or shorter. No.
2. **Options.** "5 min", "10 min", "20 min": all numbered, same precision.
3. **Locked stage.** Axes (0/20/40/80 mmol/L; 0/20/40/60 min), the start dot at 80, label "2nd order", readouts "none yet", "—", "—". No curve, no wait bars, no 20. Nothing matches.
4. **Reveal values.** Waits "10, 20 min": computed from seen[2] (max halvings reached in 2nd order, ≥ 2 by milestone "second-twice"). "10 min every time" (1st order): milestone "first-twice". "1/4 … 1/16": rate(2,1), rate(2,2), shown in the "2nd-order rate" row once seen[2] ≥ 2 (milestone). "(1/2 → 1/4)": the "1st-order rate" row, computed from seen[1] (≥ 2 by "first-twice").
5. **QA path.** Slider two presses: n = 1 ("second-once"), n = 2 ("second-twice"); "Pairs must meet" is disabled (already active); "Steady (1st order)": "first-twice". All 3 milestones. At reveal both rate rows read "1/4 → 1/16" and "1/2 → 1/4", the 2nd-order curve is the dashed ghost, the 1st-order bars read 10, 10.
6. **Reset.** There is no Reset control; the rows only grow. Reveal from that run: "You saw the second-order waits grow: 10, 20 min. Each half takes twice as long as the last. The first-order run kept the same 10 min every time. A second-order reaction needs two reactant molecules to meet, so halving the crowd makes meetings four times rarer: your 2nd-order rate row reads 1/4 after one halving and 1/16 after two. As the line under it said, each halving leaves half as much to lose at a quarter of the rate, so the wait doubles. In 1st order the rate only halved (1/2 → 1/4), so the wait stayed the same. Radioactive decay is first order: one fixed half-life."
