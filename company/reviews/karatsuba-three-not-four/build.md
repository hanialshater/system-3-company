# Build note: karatsuba-three-not-four (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #53 (after W-179: 11111111 x 11111111) and spec company/design/specs/karatsuba-three-not-four.md (+ .svg).

## What was built
- Top box "11111111 × 11111111"; two columns (Schoolbook: 4 per split, Karatsuba: 3 per split). Level 1 boxes carry labels and numbers (the Karatsuba (a+b)(c+d) box has a "+" glyph), level 2 boxes sit under their parents, level 3 is dots: an 8×8 block against three 3×3 blocks. Answer line under each column at level 3. Count table (4-digit, 2-digit, 1-digit products) with "?" until reached.
- The trees are built by real BigInt recursion (split at half the longer length, base case when either factor < 10); every count and label on the stage comes from the trees, not constants.
- Controls in DOM order (3, as spec): Split one level · Split down to 1 digit (120 ms per level) · Check the middle: off/on (aria-pressed; shows the identity line with both sides computed, outlines the (a+b)(c+d) box).
- Milestone (minInteractions 1): one-digit-leaves.

## Checks run
- Node and the Demo's own trees: counts 4|3, 16|9, 64|27; both trees give 123,456,787,654,321; a·d + b·c = 2,468,642 both ways; the same code needs 33 for 12345678 x 87654321. 3^10 = 59,049, 4^10 = 1,048,576.
- No test file was added for "assert 27" (tests are out of my scope); the assertion lives in the node check and in the claim source.

## Not run
next build, typecheck, QA, walkthrough (as instructed). All claims unverified.

## Revision v3 (wave E r6, 2026-10-14)

r6 (cs learner, revise): the cross-term trick was told. "Check the middle" was off the required path and wrote its line above the visible stage; the first-row box numbers overflowed at about 6 px; the stem was dense. Fixes:
- "Check the middle" is now a one-way button (no on/off relabel, disabled once pressed) and a second milestone, middle-checked (minInteractions 2). Its output sits under the table, next to the controls, and prints both sides with their parts: "Schoolbook's a·d + b·c: 1111·1111 + 1111·1111 = 2,468,642" and "Karatsuba's (a+b)(c+d) − a·c − b·d: 4,937,284 − 1,234,321 − 1,234,321 = 2,468,642". Before the press it reads "Where did a·d and b·c go? Check the middle."
- The reveal quotes that line.
- First-row boxes are 40 high, with the label, the first factor and "×" plus the second factor on three lines at 8.5 px.
- The stem was cut to plain words and the carry disclaimer dropped (it is still in claim c1's scope: these numbers).
- c4 reworded and reopened. Not run: build, QA, walkthrough, tsc.

## Pre-flight v3

1. Title and hook: "Three products where four seemed needed" / "Can two numbers be multiplied with fewer digit products than n × n?" They name the per-split 3 (also in the stem), not the 27.
2. Options: "16", "27", "48". All bare numbers.
3. Locked stage: top box "11111111 × 11111111", the two column heads "Schoolbook: 4 per split" / "Karatsuba: 3 per split", table of "?", the line "Where did a·d and b·c go? Check the middle." Nothing shows 27 or 3·3·3.
4. Reveal values: 64 and 27: (b) milestone one-digit-leaves (table row "1-digit products 64 | 27"); 4·4·4 / 3·3·3: the table rows 4|3, 16|9, 64|27 filled on the same path; 4,937,284 − 1,234,321 − 1,234,321 = 2,468,642: (b) milestone middle-checked (the check line); 59,049 / 1,048,576 / n^1.58: told context, claimed (c5, c6), not presented as seen.
5. QA path: Split one level (4|3), Split down to 1 digit (two 120 ms steps, one-digit-leaves), Check the middle (middle-checked). Both milestones reached, the question's own case (27 at 1 digit) included. The table and the check line stay on stage at the reveal.
6. Reset: no Reset control; nothing un-splits and the check line stays. Reveal on the QA path: "Schoolbook needed 64 one-digit products; Karatsuba 27. One product fewer at each split: 4·4·4 against 3·3·3. / The trick is the third box. Your check line showed it: 4,937,284 − 1,234,321 − 1,234,321 = 2,468,642, the same as schoolbook's a·d + b·c. One product of the sums, minus two products Karatsuba already has, gives both cross terms, so one multiplication is saved at every split. Saved at every level, that compounds: for 1,024-digit numbers the ideal no-carry count is 59,049 products against 1,048,576 (3^10 against 4^10), and in general about n^1.58 instead of n^2 for n digits."
