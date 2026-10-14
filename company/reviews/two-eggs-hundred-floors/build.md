# Build note: two-eggs-hundred-floors

Builder: algo-pair-04 (demo-builder). Status: draft. Kept from evaluators until they report.

## What was built
- Two towers (100 floors) side by side. Plan A: drop at 50, then halve what is left (50, 75, 88, 94, 97, 99, 100). Plan B: shrinking gaps, computed in code from "smallest g with g(g+1)/2 >= 100" (14, 27, 39 ...). Nothing in the UI starts at 14.
- Break-point chips (the only controls, 5, DOM order): 1st, 2nd, 3rd, 4th, Never ("Egg 1 breaks on drop"). An adversary makes egg 2 climb the whole gap below the break.
- Plan B is hidden until the prediction: before it the B tower is empty with the label "B: after you predict", no drop counts, no gaps.
- Counters per run (Drops, Worst) and a "Your tries" table with A and B cost per chip tried.
- Milestones (minInteractions 2): `early` (the 1st chip, halving costs 50) and `three` (any three distinct chips). QA path: press the chips in order; reveal unlocks at the third chip.
- Reveal quotes only reached states: halving cost 50 on the first-drop break, the worst of A and B across the learner's own tries, and the "Never" line only if that chip was pressed.

## Checks run
- Node: exhaustive DP f(2, 100) = 14; 13 x 14 / 2 = 91, 14 x 15 / 2 = 105; 2 eggs, 10 floors = 4 (recall).
- Node over the stage's plans: A costs 50, 26, 15, 9, never 7 (worst over every break floor 50); B costs 14, 14, 14, 14, never 12 (worst 14).
- Reference only: TheAlgorithms/Python dynamic_programming/egg_dropping.py. No code copied.
- All 8 claims in meta.json start `unverified`.

## Choices to challenge
- Reveal shows 14, 13, 12 and "14 cover 105 floors" after the learner has prediction and tries. Plan B's title reads "B: shrinking gaps", not the number.
- Halving rounds the midpoint up (88 and not 87). Rounding down gives other costs; the claim states the rounding.
- "Never" shows B costing more than A (12 vs 7). Kept on purpose: the price of capping the worst case.
- The chips do not enumerate every break floor; "14 always works" rests on the DP and the k(k+1)/2 derivation, not on the five chips. The reveal wording says "across your tries".
- Format id `side-by-side`.
