# Build note: debt-grows-ratio-falls

builder: wave-i-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #59

- Intent: one line of debt-to-GDP per year (0-10, 40%-160%), no target or limit lines; readouts Year, Debt, GDP, Ratio above it. Gridlines 50 / 100 / 150% appear only after the commit. Model (Demo.tsx run()): GDP_t = GDP_{t−1} × (1 + g); debt_t = debt_{t−1} + b × GDP_t.
- Controls: Next year, Run to year 10 (which becomes "Back to year 0" at year 10: that is the reset), and two sliders side by side (Borrowing 0-6%, Growth 0-8%, steps of 1). Sliders apply to all years; the line is recomputed up to the current year. The button row is not rendered at the reveal (phone fit; the reveal does not refer to it).
- Deviation from the brief, on purpose: the brief's m2 was "growth below 3% and year 10". QA presses sliders to the right, so a growth slider can never reach 2% on the QA path. m2 is "year 10 with the ratio above 100%" (any setting), which the QA path reaches by raising borrowing to 5% (101.9%). The reveal quotes the learner's own rates and ratio. The idea taught is the same: the ratio climbs when borrowing outruns growth. The Reset is a toggle on the Run button for the same reason (a separate Reset before the sliders would send the QA path to year 0 before the sliders act).
- Once recorded, the question's path (3%, 5%) stays as a dashed ghost when other rates are set; a record row keeps "Year 10, borrow 3%, grow 5%: debt $140, GDP $163, 85.7%" and the climb record.
- The brief's year-1 sentence (95.2% → 98.2%) was cut: it is not on the stage unless the learner steps year by year at 3%/5%.
- EU 3%/60% reference values kept out of learner text, as the brief asks.

## Pre-flight v1

1. **Title and hook.** "Does yearly borrowing raise the burden?" / "A government borrows every single year. Does its debt-to-GDP have to rise?" Questions only; no direction given.
2. **Options.** "Above 100%" · "Still 100%" · "Below 100%". Each names 100% with the same precision.
3. **Locked stage.** Chip "Model: start debt $100, GDP $100. Each year GDP grows, then borrowing adds a % of it.", readouts "?", empty axes (year ticks only), no line, point or % gridlines, empty record row, sliders disabled at 3% and 5% (from the question).
4. **Reveal values.** "$100 to $140", "fell to 85.7%", "GDP grew from $100 to $163": (b) recorded at milestone question (year 10 at 3%/5%), record row line 1. "At 5% borrowing and 5% growth, your ratio climbed to 101.9%": (b) recorded at milestone climb, record row line 2.
5. **QA path.** DOM order: Next year (year 1), Run to year 10 (question), Borrowing two right presses (4%: 93.8%, then 5%: 101.9%, climb), Growth two right presses (6%, 7%: 88.4%). Both milestones in 4 presses, including the question's case; both record lines are on the stage at the reveal.
6. **Reset.** The reset is "Back to year 0" (the Run button at year 10). Records are not cleared by it. Reveal text (QA path, and after Back to year 0): "Debt rose every year, from $100 to $140, yet the ratio fell to 85.7%, because GDP grew from $100 to $163. The ratio is a fraction: borrowing adds to the top, growth enlarges the bottom. / At 5% borrowing and 5% growth, your ratio climbed to 101.9%. A toy model with fixed rates, not any real country."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 debt-grows-ratio-falls` (dev server, 2026-10-14): first run crop 76 px with "debt" off screen; then 30 px; final after hiding the button row at the reveal, putting the sliders in one row and renaming the 4th readout "Ratio" (it wrapped): verdict fit, **crop 0 px**, hiddenBelow 0, namedHidden 0 (year, debt, ratio, 100%, borrowing, growth visible), phoneFit true, **62 words**.

Not run (per dispatch): next build, QA, walkthrough. tsc and check pass.
