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

## Revision v2 (wave E r6, 2026-10-14)

r6 (adult beginner, revise): the parity contrast the objective names (a ring of four needs only three) was told and never seen. Two buttons relabelled themselves ("Let backtracking try k", "Allow a 4th colour" / "Back to 3 colours"). Fixes:
- Same wheel, now with a ring size: chips "Ring of 5" / "Ring of 4", and colour-count chips "3 colours" / "4 colours". Each chip is active and disabled when chosen, so no button changes its label. "Run backtracking" runs the current setting. Changing a chip re-runs backtracking if its result is on the wheel; a hand-painted wheel keeps the colours that still fit.
- Milestones (minInteractions 3): dead-end (ring 5, 3 colours), complete (ring 5 fully coloured), ring-of-four (ring 4 fully coloured using at most 3). Each result is recorded when first seen and listed in a runs line under the wheel: "5 ring, 3 colours: dead end · 5 ring, 4: done, 4 used · 4 ring: done, 3 used".
- The reveal quotes the recorded runs: the stuck region, the dead-end count, the colours used. It points at the 4-ring that worked ("Four is even").
- c4 reworded (now shown) and reopened; c6 added. Not done: a visible backtracking undo (minor finding; the boundary already knows backtracking). Not run: build, QA, walkthrough, tsc.

## Pre-flight v2

1. Title and hook: "How few colours for the plaza?" / "A plaza with six regions. Surely three colours keep every neighbour different?" It baits 3 (the wrong answer). Nothing points to 4.
2. Options: "2", "3", "4". All bare numbers.
3. Locked stage: the blank 5-ring wheel (C, 1 to 5), "Touching regions must differ.", "Runs: none yet", chips with "3 colours" and "Ring of 5" active, and the "Colours used 0" and "Coloured 0 / 6" readouts. The colour row shows red, blue and yellow only, so nothing hints at a fourth.
4. Reveal values: stuck region 5 and 6 dead ends: (b) milestone dead-end, recorded from the run; "4 colours used" on the ring of five: (b) milestone complete, recorded; "done with 3 colours" on the ring of four: (b) milestone ring-of-four, recorded. All three stay on the runs line.
5. QA path: Run backtracking (5, 3: 6 dead ends, dead-end), 3 colours (disabled), 4 colours (re-run 5, 4: complete), Ring of 5 (disabled), Ring of 4 (re-run 4, 4: uses 3, ring-of-four). All three milestones are reached, including the question's own case (the ring of five needs 4). The region and colour presses that follow can repaint region 4 purple ("Colours used 4"), but the runs line keeps "4 ring: done, 3 used", and that is what the reveal quotes.
6. Reset: there is no Reset. Undo and repainting do not touch the recorded runs. Reveal on the QA path: "With three colours on the ring of five, region 5 ran out: its neighbours held all three, and backtracking hit 6 dead ends with no way through. The centre takes one colour, so the ring regions have only two left, and two colours must alternate round the ring. Five is odd, so the last region meets both. A fourth colour finished the ring of five: 4 colours used. / On the ring of four the two colours alternated all the way round: done with 3 colours. Four is even, so the last region meets only one of them. For big maps no fast method is known for finding the fewest colours, so trying and undoing is often the tool."
