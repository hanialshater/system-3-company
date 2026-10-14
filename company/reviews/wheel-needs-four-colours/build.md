# Build note: wheel-needs-four-colours

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. A centre disc C and five ring sectors 1-5; pick a region by tapping it or with the region buttons. Colour chips offer 3 colours, or 4 after "Allow a 4th colour". A clashing colour is refused: the clashing neighbour flashes and the note names it. There is an Undo. "Let backtracking try k" runs the full backtracking search (regions C,1..5, colours in order). With 3 colours it shows the first dead end and the dead-end count; with 4 it fills in a valid colouring. Milestones: dead-end (with 3 colours, some empty region already sees all 3 among its neighbours) and complete (all six coloured; validity is enforced).
One-press QA path: backtrack(3) -> allow 4th -> pick C..5 (5 last) -> red/blue/yellow clash with C/1/4 -> purple completes -> undo.

## Answers re-run in node
- 5-wheel: 2 and 3 colours fail, 4 succeed (1,2,3,2,3,4). 4-wheel: 3 succeed. Backtracking with 3: 6 dead ends, 27 placements, first dead end at region 5.

## Known gaps
- The colour chips use fixed hues with dark text; check contrast in both themes.
- The NP-completeness sentence (c5) rests on Karp 1972, cited from the brief and not yet opened. All claims are unverified.
