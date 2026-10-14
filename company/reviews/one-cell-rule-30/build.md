# Build note: one-cell-rule-30

builder: algo2-sb · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/one-cell-rule-30.md` (+ svg) and brief #78 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (builder's own node script, same rule code as Demo.tsx)
Next cell = bit (l*4 + c*2 + r) of the rule number, 17-cell row, dead beyond the edges. Rule 30 counts steps 0-8: 1, 3, 3, 6, 4, 9, 5, 12, 7; centre column 110111001. Rule 90: 1, 2, 2, 4, 2, 4, 4, 8, 2; centre column 100000000. Answer B (7) holds; option A (2) is Rule 90's row 8.

## Built as specced
One SVG with two panels of 17 x 9 cells at 10 px, Rule 30 left (with the question's 8 rule tiles drawn as cells: three above, result below), Rule 90 right ("alive if exactly one / neighbour is"). Faint centre guide line, live count beside every row (newest bold). Only rows reached are drawn, so at predict there is just row 0. 3 controls in DOM order: Step, Step to 8 (50 ms per row, <= 400 ms), Centre column: off/on (`aria-pressed`, dashed `--domain` outline plus the printed bits under each panel). Milestone `step-8`; minInteractions 1. The reveal's centre-column paragraph appears only if the toggle was ever turned on.

## Choices and deviations
- The SVG is 400 units wide (two panels, two count columns, 16 px gap) and scales to the card width, so on a 390 px phone the cells draw at about 8.5 px. They are drawings, not controls.
- The centre-column bits show the rows reached so far (if the toggle is pressed before step 8, the string is shorter).
- Claim c3 adds "no simple formula for its counts is known" (the brief's payoff); sourced to Wolfram NKS and the 2019 Rule 30 prize problems, not opened. Claim c6 (Mathematica random source, NKS p. 317) is still unchecked, as the spec warned.

## Problems found in the brief or spec
None blocking. The fact-checker must open NKS for c6's page number.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.
