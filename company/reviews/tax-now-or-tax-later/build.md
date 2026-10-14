# Build note: tax-now-or-tax-later

builder: wave-i-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #57

- Intent: one bar chart, two groups (A: tax, then grows / B: grows, then tax), each with a start bar and an end bar on one $0-$40,000 axis. The tax slice is hatched red on the bar where it is taken: A's on its start bar, B's on top of its end bar. Kept amounts labelled above each bar.
- Controls: growth chips "Grows ×2" / "Grows ×4" (active one disabled) and one slider "Tax rate later" (10% to 40%, steps of 5, starts at 25%). Today's rate is fixed at 25% and printed on the chip.
- The stage opens at ×2 so the question's case (×4, 25%) needs one press (the ×2 tie at $15,000 is visible first; it is the same lesson, not the answer to a different question).
- Milestones: "question" (×4 and 25% later: both $30,000, recorded) and "rate" (later rate moved off 25%; the latest such state is recorded with its growth, A and B).
- Record row under the chart: "25% later, ×4: A $30,000 · B $30,000" and "35% later, ×4: A $30,000 · B $26,000".
- No real account is named (brief: the fact-checker cannot reach irs.gov or gov.uk).

## Pre-flight v1

1. **Title and hook.** "Tax first or tax last?" / "Pay tax now and the growth is tax-free. Or let more money grow, and pay at the end?" States both arguments (A and B) and neither result; "They tie" is not hinted.
2. **Options.** "Account A" · "Account B" · "They tie". No numbers.
3. **Locked stage.** Chip "Model: made-up flat tax. Today 25%. Later: slider.", four equal dashed $10,000 frames with start / end labels and the group labels "A: tax, then grows", "B: grows, then tax", no values, no hatching, empty record row; chips and slider disabled (slider "25%", from the question).
4. **Reveal values.** "Both ended at $30,000": (b) recorded at milestone question, record row line 1. "$2,500 up front", "$7,500", "$40,000", "a quarter", "$10,000 × 0.75 × 4": the question's own case (the milestone), constants of the rule; $2,500 is on A's start bar at any growth. "at a 35% later rate, B ended at $26,000 against A's $30,000": (b) recorded at milestone rate (latest off-25% state), record row line 2.
5. **QA path.** DOM order: "Grows ×2" (disabled, active), "Grows ×4" (question), slider two right presses (30%, 35%: rate). Both milestones in 3 presses; both record lines are on the stage at the reveal.
6. **Reset.** No Reset control; records persist. Reveal after the QA path: "Both ended at $30,000. A paid $2,500 tax up front, and its $7,500 grew to $30,000. B grew $10,000 to $40,000, then handed a quarter back. Both are $10,000 × 0.75 × 4, multiplied in a different order. / Only a change of rate decides it: at a 35% later rate, B ended at $26,000 against A's $30,000. Not advice about any real account."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 tax-now-or-tax-later` (dev server, 2026-10-14): verdict fit, **crop 0 px**, hiddenBelow 0, namedHidden 0 (the tool detected no named labels), phoneFit true, **67 words**. Fix before the final run: groups spread so A's "−$2,500 tax" label no longer runs into the end bar; records on two lines.

Known soft spot: "$40,000" and B's tax slice show only while growth is ×4. If the learner switches back to ×2 before the reveal, the first paragraph's $40,000 is not on the stage (the $30,000 record is). Not changed; reviewers may call it.

Not run (per dispatch): next build, QA, walkthrough. tsc and check pass.
