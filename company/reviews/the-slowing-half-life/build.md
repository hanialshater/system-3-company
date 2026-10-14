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

## Pre-flight v5

Revision for r7 (adult-beginner): the reveal's "10, 20 min" quoted the 2nd-order wait bars, which vanish once the learner switches to 1st order as the hint asks. Now each order has a persistent "waits" row beside its "rate vs start" row (two rows of readouts), and the reveal quotes the rows. Rate labels now say "vs start" (r7 minor). Chart cap 34dvh -> 30dvh to make room for the extra row. c1, c3 reopened.

1. **Title and hook.** "Does the next half take as long?" / "Half gone in 10 minutes. Is the next half gone in 10 more?" Neither says longer or shorter. No.
2. **Options.** "5 min", "10 min", "20 min": all numbered, same precision.
3. **Locked stage.** Axes (0/20/40/80 mmol/L; 0/20/40/60 min), start dot at 80, label "2nd order", four readouts all "—". No curve, no bars, no 20. Nothing matches.
4. **Reveal values.** "2nd-order waits row reads 10, 20 min": waitRow(2) from seen[2] (>= 2 by milestone "second-twice"), the same string as the row. "1st-order waits row reads 10, 10 min" and "same 10 min": waitRow(1) from seen[1] (>= 2 by "first-twice"). "1/4 ... 1/16": rate(2,1), rate(2,2), on the "2nd-order rate vs start" row once seen[2] >= 2. "(1/2 → 1/4)": rateRow(1), the "1st-order rate vs start" row.
5. **QA path.** Slider two presses: n = 1 ("second-once"), n = 2 ("second-twice"); "Pairs must meet" disabled (active); "Steady (1st order)": "first-twice". All 3 milestones. At reveal the rows read "10, 20 min" / "1/4 → 1/16" and "10, 10 min" / "1/2 → 1/4"; all quoted values are on stage rows.
6. **Reset.** There is no Reset control; the rows only grow, and switching order keeps both. Reveal from that run: "Your 2nd-order waits row reads 10, 20 min: each half takes twice as long as the last. Your 1st-order waits row reads 10, 10 min: the same 10 min every time. A second-order reaction needs two reactant molecules to meet, so halving the crowd makes meetings four times rarer: your 2nd-order rate row (vs the start) reads 1/4 after one halving and 1/16 after two. As the line under it said, each halving leaves half as much to lose at a quarter of the rate, so the wait doubles. In 1st order the rate only halved (1/2 → 1/4), so the wait stayed the same. Radioactive decay is first order: one fixed half-life."

## Pre-flight v6

Revision for W-251 (evaluation-steward ruling on W-247, see 2026-10-14-fact-check.md "Ruling on W-247"): stage-only reword. The reveal's "Radioactive decay is first order" sentence is cut, because its source could not be opened. The reveal now ends "so the wait stayed the same: one fixed half-life." c3 text is now "A first-order reaction keeps one fixed half-life (here 10 min each time)." The IUPAC Gold Book sentence is dropped from c3's source. c3 is unverified and needs a fact-checker re-check. No mechanics changed. Typecheck and check were run. Build, QA and walkthrough were not run (out of this task's scope).

1. **Title and hook.** Unchanged from v5. Neither says longer or shorter.
2. **Options.** Unchanged: "5 min", "10 min", "20 min".
3. **Locked stage.** Unchanged from v5. Nothing matches.
4. **Reveal values.** Unchanged from v5. "one fixed half-life" rests on waitRow(1) ("10, 10 min", >= 2 entries by "first-twice"), which is on stage.
5. **QA path.** Unchanged from v5.
6. **Reset.** No Reset control. Reveal from that run now ends: "In 1st order the rate only halved (1/2 → 1/4), so the wait stayed the same: one fixed half-life."

## Pre-flight v7 (demo-builder, 2026-10-14, answering 2026-10-14-learner-adult-beginner-r8.md, W-291)

Changes: reveal 113 -> 88 words (tool count, verdict line "Not quite: it was "20 min"." included; body about 83). Cut the "As the line under it said, ..." sentence the reviewer named (at the reveal the line under the chart showed the 1st-order wording on the QA path, so it pointed at the wrong line); its reasoning is kept in one clause, "With half as much left to lose at a quarter of the rate, each wait doubles." "Your 2nd-order waits row reads" became "Your 2nd-order waits read"; "A second-order reaction needs two reactant molecules to meet" became "Second order needs two molecules to meet"; the 1st-order ending is "so the half-life stays fixed". cm-chemistry should confirm the cut sentence is the right one. Stage: the four readouts are now one 2x2 table (rows "2nd order" / "1st order"; columns "waits" / "rate vs start"; same values, about 56 px instead of about 150). The why line is not rendered at the reveal (the reveal carries its reasoning for both orders). Slider and order buttons share one `Row foldAtReveal`, so the card folds them behind "Show controls" at the reveal. Chart labels 10/11 -> 12/13 viewBox units; "mmol/L" moved inside the left edge (at 12 px it clipped). Order button "Pairs must meet (2nd order)" -> "Pairs meet (2nd order)". The r6/r7 minor (locked readout row cut at the stage bottom) is gone with the readouts.
1-3. Title, hook, options, locked stage: unchanged, except the table replaces the readouts (it shows "—" while locked).
4. Reveal values: 10, 20 min and 10, 10 min (table, waits); 1/4, 1/16 and 1/2 -> 1/4 (table, rate vs start); 10 min (the bars and the question). All on stage at the reveal.
5. QA path: unchanged.
6. Reset: none.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3530 the-slowing-half-life` (dev server, 2026-10-14): before crop 292 px, 113 words, 3 named labels off screen ("20", "10", "1st order"); after **crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit 1, 88 words**. Stage 350 px + reveal 247 px in a 618 px card; the whole curve, both wait bars and the table are on screen.
- meta.json 6 -> 7; c2, c3, c4, c5 reopened. Not run: build, QA, walkthrough.
