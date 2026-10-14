# Build note: interpolation-guesses-the-page

Builder: algo-pair-08 · 2026-10-14 · status draft. Kept from evaluators until they report.

## What was built
Single stage per `company/design/specs/interpolation-guesses-the-page.md`: value plot (100 dots), dashed target line, aim line and drop ticks, tally lines. Six controls in DOM order: Guess, Values toggle, three Find chips (729,000 active by default), Guess until found. All render at first paint, disabled while locked. Milestones: `even-found`, `cubes-found` (`minInteractions=2`). QA path: Guess, Values: cubes, 1,000, 9,261, Guess until found.

## Decisions
- **Indexing:** the stage counts positions 1-100; the readout says "found at position 73". The brief's "position 72" is the 0-based index; claim c1 says so.
- **Spec number corrected:** the spec and wireframe print "(halving 7)" beside 9,261. Node says halving takes 5 looks for 9,261 (6 for 1,000, 7 for 729,000; 7 is the maximum over all values). The stage computes the real count, so it shows "halving 5". Claim c2 records this.
- "Guess until found" shows the finished search at once (no replay animation), so it is reachable within QA's 450 ms wait. The 21 ticks are all drawn together.
- Buttons use a local `.btn { min-height: 44px }`; there is no shared `.tap` class in the tree.
- The reveal is built from the learner's own tally. It says "21" only if the learner searched 9,261, and says aiming won if they only searched 729,000.
- The O(log log n) and O(n) facts from the brief are not on the stage; they were left out to stay inside the text budget. No claims for them.

## Numbers re-run in node (own code, TheAlgorithms not copied)
- Even, 730: 1 look at 0-based 72 (position 73); halving 6; all even values 1 look.
- Cubes: 729,000 -> 4 looks (positions 73, 88, 89, 90), halving 7; 1,000 -> 10, halving 6; 9,261 -> 21 (positions 1..21), halving 5; max 21; mean 8.86 vs 5.8.

## Not done / for others
All claims `unverified`. Evidence blocks empty. Needs fact-check, learner review, design review.
