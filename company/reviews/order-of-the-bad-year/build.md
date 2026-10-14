# Build note: order-of-the-bad-year

builder: wave-i-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #56

- Intent: one two-year balance line (start, year 1, year 2), $0 to $160k. The current order is solid; once the learner has seen both orders, the other order is ghosted (dashed) for every flow. End values at the right edge ("both $100k" when they meet).
- Controls: order chips (Loss year first / Gain year first; the current one is active and disabled) and one flow slider (withdraw $20k ... deposit $20k, steps of $10k, starts at withdraw $20k). The stage opens on "loss first", so the first enabled press shows the other order.
- Milestones: "withdraw" (both orders seen at withdraw $20k, the question's case) and "noflow" (flow $0 with both orders shown). Optional deposit $20k with both orders adds the flip sentence; it is not required.
- A record row under the chart keeps each flow case once both orders are shown ("withdraw $20k: gain first $64k, loss first $55k · none: both $100k"), so the reveal's numbers stay on the stage whatever the slider says.
- Brief's terminology claim ("sequence-of-returns risk") left out of learner text, as the brief asks.
- Numbers re-run in node (2026-10-14): -20: 55 / 64; 0: 100 / 100; +20: 145 / 136.

## Pre-flight v1

1. **Title and hook.** "Does the order of the years matter?" / "One year up 25%, one year down 20%, and money comes out each year." Neither says which order wins; "Same either way" stays open.
2. **Options.** "Same either way" · "The gain year first" · "The loss year first". No numbers in any.
3. **Locked stage.** Chip "Model: returns +25% and −20%; money moves at each year-end", empty axis with start / year 1 / year 2, no lines, no gridline values, empty record row, chips and slider disabled (slider reads "withdraw $20k", from the question). Nothing matches "gain first".
4. **Reveal values.** "$100k" (no withdrawals): (b) recorded at milestone noflow, record row "none: both $100k". "$64k" and "$55k": (b) recorded at milestone withdraw, record row "withdraw $20k: gain first $64k, loss first $55k". "×1.25 then ×0.8": the rule on the chip. Optional "$145k": (b) recorded when deposit $20k is shown with both orders, record row.
5. **QA path.** DOM order: "Loss year first" (disabled, active), "Gain year first" (withdraw: both orders seen at -$20k), slider two right presses (-$10k, then $0: noflow). Both milestones in 3 presses, including the question's case; the record row holds both at the reveal.
6. **Reset.** No Reset control; records only accumulate. Reveal after the QA path: "With no withdrawals both orders ended at $100k: ×1.25 then ×0.8 equals ×0.8 then ×1.25. Withdrawing $20k a year, gain first ended at $64k and loss first at $55k. / A withdrawal after the loss comes out of a smaller pot, and that money is not there for the recovery."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 order-of-the-bad-year` (dev server, 2026-10-14): verdict fit, **crop 0 px**, hiddenBelow 0, namedHidden 0 (gain first, loss first visible), phoneFit true, **57 words** (tool count). Fix made before the final run: plot moved left so "both $100k" is not cut at the right edge.

Not run (per dispatch): next build, QA, walkthrough. tsc and check pass.
