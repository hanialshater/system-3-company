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

## v3 (2026-10-14): neutral title, reuse shown, Seen row

Problems (learner r7): title "Cut the rod for more money" answered the question; reuse of shorter rows was told, not shown; "best-priced piece" unclear; quoted best(1..4) vanished after Start over.
Changes: title "What is a length-4 rod worth?", hook "Sell it whole for $9, or cut it into pieces first. Which pays, and how much?". Each cut line now names the row it reads ("1 + best(3): $1 + $8 = $9"; "whole 4: $9 + $0 = $9"), and the row the kept cut reuses is outlined in green (row 2 at length 4). Readout "Seen: best(1..4)" records $1, $5, $8, $10 when best(4) is reached and survives Start over. Reveal says "most expensive piece" and points at the cut-line notation. Claims c2, c3, c4 reworded and set unverified. Version 2 -> 3.
Not run here: next build, QA, walkthrough, tsc (caller's order).

## Pre-flight v3

1. Title and hook: "What is a length-4 rod worth?" / "Sell it whole for $9, or cut it into pieces first. Which pays, and how much?" Neither rules out $9 whole, $10 or $13.
2. Options: "$9, sell it whole", "$10", "$13": all carry one dollar figure; none numbered.
3. Locked stage: note "Prices: length 1 $1, 2 $5, 3 $8, 4 $9.", four dashed rows with "?", readouts Whole rod $9 and Seen: best(1..4) ?. Nothing matches $10.
4. Reveal values: $1, $5, $8, $10 (b) best-4 milestone, recorded in the Seen readout; $5 + $5, $9, $8 + $1 (b) length-4 cut list at best(4) and price note; "1 + best(3)" (b) the length-4 cut line; $22 / 2 + 6 told context from solve(BIG), claim c5.
5. QA path: Start over (disabled) -> Fill best(1) (first-fill) -> Fill the rest (best-4). Both milestones; length-4 rows, cut list with "1 + best(3)", outline on row 2, and Seen $1, $5, $8, $10 visible when the reveal opens.
6. Reset: after Start over the rows empty, but Seen still reads "$1, $5, $8, $10" and Whole rod $9. Reveal: "You filled best(1) to best(4): $1, $5, $8, $10. For length 4, two pieces of length 2 ($5 + $5) beat selling it whole for $9, and beat cutting off the most expensive piece (length 3, $8) and selling the leftover for $1. The best price of a rod is the best over first-cut sizes of (piece price + best price of the rest). Each cut line read a filled row, like best(3) in "1 + best(3)": each shorter rod is solved once and reused. With prices 1, 5, 8, 9, 10, 17, 17, 20 for lengths 1 to 8, a length-8 rod sells for $22 (pieces 2 + 6), not $20 whole." The "1 + best(3)" line is gone from the stage after Start over; it is history the learner saw on the required path.
