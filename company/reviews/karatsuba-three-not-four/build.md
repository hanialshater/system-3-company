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

## v4 (2026-10-14): halves that differ

Problem (learner r7 top finding): with 11111111 x 11111111 every half was 1111, so a·c, a·d, b·c and b·d were all 1,234,321 and the check line could not tell the cross terms from the products Karatsuba already has. Minor: box text about 6 px; "ideal no-carry count" unexplained.
Changes: example is now 11141313 x 13111224 (halves a 1114, b 1313, c 1311, d 1224, all different), chosen by a search that keeps 64 / 27 one-digit leaves with no half-sum carries (disclosed in c1). The check box now has three lines: "(a+b)(c+d) = a·c + a·d + b·c + b·d", "Schoolbook's a·d + b·c: 1,363,536 + 1,721,343 = 3,084,879", "Karatsuba's (a+b)(c+d) − a·c − b·d: 6,152,445 − 1,460,454 − 1,607,112 = 3,084,879". Reveal quotes those values and says "if no half-sum like a+b gains a digit" instead of "ideal no-carry count". Box fonts up (labels 8 px, numbers 10 px, level 2 8.5 px). Locked-frame table header cut: not changed (kit phone scroll fix in progress). Claims c1-c5 reworded, set unverified. Version 3 -> 4.
Not run here: next build, QA, walkthrough, tsc (caller's order).

## Pre-flight v4

1. Title and hook: "Three products where four seemed needed" / "Can two numbers be multiplied with fewer digit products than n × n?" Every option (16, 27, 48) is fewer than 64, so neither singles out 27.
2. Options: "16", "27", "48": all bare numbers.
3. Locked stage: top box "11141313 × 13111224", column heads "Schoolbook: 4 per split" / "Karatsuba: 3 per split" (stated in the stem too), table of "?", prompt "Where did a·d and b·c go? Check the middle." Nothing shows 27.
4. Reveal values: 64 and 27 (b) one-digit-leaves milestone, table row "1-digit products" and dot squares; 6,152,445, 1,460,454, 1,607,112, 3,084,879, 1,363,536, 1,721,343 (b) middle-checked milestone, computed from the top split and printed in the check lines; 59,049 / 1,048,576 / n^1.58 told context, claims c5 and c6.
5. QA path: Split one level (4 | 3) -> Split down to 1 digit (steps at 120 ms to 64 | 27, under the 450 ms wait) -> Check the middle (three check lines). Both milestones; table and check lines visible when the reveal opens.
6. Reset: there is no Reset; nothing un-reaches. Reveal: "Schoolbook needed 64 one-digit products; Karatsuba 27. One product fewer at each split: 4·4·4 against 3·3·3. The trick is the third box. Your check lines showed it: (a+b)(c+d) holds all four products, a·c + a·d + b·c + b·d. Take away a·c and b·d, which Karatsuba already has: 6,152,445 − 1,460,454 − 1,607,112 = 3,084,879, the same as schoolbook's a·d + b·c (1,363,536 + 1,721,343). Saving one product at every split compounds: for 1,024-digit numbers, if no half-sum like a+b gains a digit, that is 59,049 products against 1,048,576 (3^10 against 4^10), and in general about n^1.58 instead of n^2 for n digits."

## Pre-flight v5 (demo-builder, 2026-10-14, wave H, r8 cs-learner, W-292, W-329)

Fixes: (revise 1) the reveal no longer names "the third box". It points at the check lines ("Your check lines show why: ..."), which are on screen with the box row, the dots, the table and the buttons. Stage compaction (W-329 cause PICTURE):
- The viewBox went from 340×274 to 340×190. The schoolbook one-digit dots are packed 16 per row (4 rows), and Karatsuba's are 3×3 under each box at 10 px pitch. The two "= 146,076,250,397,112" lines under the columns became one top box, "11141313 × 13111224 = 146,076,250,397,112 (both)", printed only when both trees reach 1 digit and the two values are equal.
- Labels are 10 to 11 px (were 8 to 9.5), so the r7/r8 "6 px box text" minor is fixed.
- The table is transposed (Products: 4-digit / 2-digit / 1-digit; rows Schoolbook and Karatsuba), so it is 3 rows instead of 4.
- The check lines are 4 short lines. The separate a·d and b·c terms (1,363,536 + 1,721,343) are no longer printed, only their sum 3,084,879, because the old lines wrapped to 5.
- The buttons read "Split once" / "Split to 1 digit" / "Check middle" and fit in one row (horizontal padding 7 px, gap 4 px; tap height 44 px unchanged).
- The notation line "Split each number into halves: a b and c d. ..." shows in predict and explore and hides when the reveal opens.
(revise 1, words) the reveal went from 100 to 45 words. Cut: the 1,024-digit sentence (told context, already disputed once in W-207; c5 withdrawn). Kept: n^1.58 against n^2, which is in the objective. **cm-cs should confirm the cut** (board). (should fix 2) the explore box-row clipping came from the stage being taller than the card. The stage is now about 130 px shorter; I did not re-check the explore frames in a walkthrough.
1. Title and hook: unchanged.
2. Options: unchanged ("16" / "27" / "48").
3. Locked stage: the notation line, the top box "11141313 × 13111224", the two column heads, the table of "?", "Where did a·d and b·c go? Check the middle." and the locked buttons. The product, the counts and the check values are hidden.
4. Reveal values: 64 and 27: computed from the trees (COUNTS[DEPTH]), in the table once milestone one-digit-leaves fires. 6,152,445 − 1,460,454 − 1,607,112 = 3,084,879: milestone middle-checked, in the check lines.
5. QA path: Split once, Split to 1 digit (one-digit-leaves), Check middle (middle-checked). At the reveal the boxes, including the highlighted (a+b)(c+d), the dots, the table and the check lines are on screen.
6. Reset: no Reset control. Reveal at the end of the reveal-fit path: "Schoolbook needed 64 one-digit products; Karatsuba 27: 4·4·4 against 3·3·3. / Your check lines show why: (a+b)(c+d) holds all four products, so 6,152,445 − 1,460,454 − 1,607,112 = 3,084,879 leaves schoolbook's a·d + b·c. One product saved per split compounds: about n^1.58 instead of n^2."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 karatsuba-three-not-four`, dev server): before, crop 361 px, 100 words, namedHidden 3. After, **crop 0 px**, hiddenBelow 0, **45 words**, namedHidden 0, picture 179 px at scale 1 (no shrink), phoneFit true. Parts: picture 179, table 54, controls 44, text 66. Screenshot: artifacts/reveal-fit/karatsuba-three-not-four.png.
- meta.json 4 -> 5. Reopened (unverified): c1, c2, c3, c4, c6. Withdrawn: c5. c7 is unchanged. Not run: build, QA, walkthrough.
