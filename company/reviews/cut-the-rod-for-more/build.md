# Build note: cut-the-rod-for-more

## v2 (2026-10-14): QA-path fix

Problem (learner r6, QA): one press per control in DOM order hit "Fill best(1)" then "Start over", so the table reset and the reveal never unlocked.
Change: added "Fill the rest" (fills best(next)..best(4), reaches both milestones) and moved "Start over" first in DOM order, where it is disabled on an empty table. Learner path unchanged: "Fill best(n)" still steps one length at a time. No claim text changed, so claim statuses are untouched. Version 1 -> 2.
Not run here: next build, computer-use QA, walkthrough (caller's order).

## Pre-flight v2

1. Title and hook: unchanged from v1 (learner r6: "leans a little toward yes", which hints $9 is wrong but does not single out $10 vs $13).
2. Options: "$9, sell it whole", "$10", "$13": same precision, none numbered.
3. Locked stage: price note "Prices: length 1 $1, 2 $5, 3 $8, 4 $9.", four dashed empty rows with "?", readouts Whole rod $9 and best(4) ?. Nothing matches $10.
4. Reveal values: $1, $5, $8, $10 are (b) best(1)..best(4), on the required path (best-4 milestone); $5 + $5, $9, $8 + $1 are (b) the length-4 cut list shown at best(4); $22 / 2 + 6 is extension from solve(BIG), told in the reveal.
5. QA path: Start over (disabled, skipped) -> Fill best(1) (first-fill) -> Fill the rest (best(1)..best(4), best-4). Both milestones reached; best(4) $10 and the length-4 cut list are on stage when the reveal opens.
6. Reset: Start over is disabled at the end of the QA path. If a learner presses it after filling, the reveal still reads "You filled best(1) to best(4): $1, $5, $8, $10 ..." which is what they saw before resetting; the stage is then empty, so the quoted values are history, not on screen.
