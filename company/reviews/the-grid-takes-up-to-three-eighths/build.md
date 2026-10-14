# Build note: the-grid-takes-up-to-three-eighths

builder: ncm-m1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report
brief: company/domains/briefs/math.discrete.md, "## Course: NCM (2026-10-14)" #9 (accepted version: grid is the prediction, line is the warm-up/contrast)

## What was built
Single card (q chips, Step). The grid is a 41 x 41 8-neighbour grid with its outer ring frozen as a frame, so the 1,521 people inside each have exactly 8 neighbours. A centred 5x5 block starts. The stage draws the middle 11 x 11, which is the 5x5 block plus three rings.
- Controls: Run, Step, q chips (1/4, 3/8, 2/5, 1/2, 3/5; the active chip is disabled), "Bigger block: 7x7", Grid / Line and Reset.
- Each waiting cell shows its count of adopting neighbours: 3 beside the middle of a side, 2 near a corner, 1 off a corner. A cell whose count meets the rule gets a green outline. The note gives the rule ("Adopt once 3 of 8 neighbours have"), or the reason it stopped ("Stuck: newcomers see at most 3 of 8; they need 4").
- Line view: 12 people from the middle of a 201-person path, with counts "1/2".
- The state is (network, q, block, round). Chips keep the round, so after Run every chip shows its end state at once.
- A spread that stops counts as stopped only after one round in which nobody new adopts, so Run and Step are live in every configuration.
- The counts and the green outline are hidden before the prediction, because "3" next to "needs 4" would give the answer away.

The why on stage: the neighbour counts beside the block, and "Bigger block" stalls at 49 above 3/8, which answers the misconception directly.
Milestones: grid-stuck (grid at its end with q > 3/8), grid-full (grid at its end with q = 3/8, everyone in) and line-seen (line at its end). QA path in DOM order: Run (grid, 1/2, stuck), 1/4, 3/8 (full), ..., Line, which reaches all three.

## Answers re-run in node (Demo.tsx simulate(), extracted)
- 5x5 grid: q 1/4 gives all 1,521 in 34 rounds and 3/8 gives all 1,521 in 51; 2/5, 1/2 and 3/5 stay at 25. 7x7: 1/4 and 3/8 give all; above that it stays at 49.
- Line (201, middle two): all 201 in 100 rounds for q <= 1/2; only 2 at 3/5. An earlier standalone node check also matched the brief: 0.4 and 0.5 take all 201, 0.51 and 0.6 leave 2.
- At the stop, the largest count any newcomer sees is 3.

## Brief points that needed care
- The brief says "a cell next to a side of the block has 3 adopting neighbours". That holds for cells facing the middle of a side. The two end cells of each side see 2, and the stage shows those 2s. The reveal and c2 say so.
- "Build after brief 3 and cluster-stops-the-cascade": cluster-stops-the-cascade is not built on this branch. learner.knows still names it, as the brief does. The prediction states the rule itself, so the card stands alone, but the prerequisite link is unbacked until that lesson exists.
- The cascade-capacity value (3/8 for every finite seed, c5) rests on the citation. The stage shows square seeds on a finite grid only. Per the brief, do not present 3/8 as the book's figure until a human checks it.

## Known gaps
- Not run: next build, tsc, QA, walkthrough (per dispatch). There is no randomness.
- All claims are unverified.
