# Build note: first-payment-mostly-interest

builder: demo-builder · 2026-10-13

- Intent: one figure, two stacked bars: this payment ($1,199.10) split into interest (red) and "to loan", above the $200,000 loan bar with the paid-off part in green. A dashed "even pace" marker sits at k/360 of the loan, so the straight-line belief is drawn next to the real progress.
- Milestone: 60 payments made. Controls in DOM order: Back to 0 (disabled at 0, so QA skips it), +5 yr (snaps to the next multiple of 60), +1 yr, +1 month. QA lands on 60 with its first press and ends at 73.
- Hidden while locked: the payment split and "Paid in"/"Paid off" (the split hints at the answer).
- The reveal quotes the 60-payment state (gated) and payment 1 (the start state); the crossover at payment 223 is quoted only if the learner stepped that far.
- After screenshots: the first QA run ended on "Start over", so the reveal described 60 payments on a stage reset to 0. The reset is now the first control.
- Changed from the brief: step buttons instead of a month slider, so the QA path (and a hurried learner) reaches month 60 exactly.
