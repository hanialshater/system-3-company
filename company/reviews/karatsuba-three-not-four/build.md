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
