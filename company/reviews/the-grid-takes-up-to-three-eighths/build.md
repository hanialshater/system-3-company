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

## Pre-flight v2

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-knows-threshold-rule-r6.md` and the QA failure reported by the coordinator

QA failure (v1, artifacts/qa-int3/contract-the-grid-takes-up-1eeeb-*/trace.zip): "controls that changed nothing observable: 1/2". After 2/5, pressing 1/2 left the same stuck 25-block, the same "they need 4" note and the same readouts (only the button class changed, which the fingerprint does not read). The test stopped there, so the reveal was never reached. Fix: the note now names q ("q = 1/2, stuck: newcomers see at most 3 of 8; they need 4."), so every q press changes the stage text.

Changes for the review: "Line" is now "Line at 1/2": it switches to the line at q = 1/2, the q where the 5x5 grid stalls, and runs it (milestone line-half replaces line-seen, which a 3/5 line run satisfied). A results table (rows 5x5 / 7x7 / Line, columns 1/4 ... 3/5, cells "all" or the count) keeps every finished run and survives Reset; the reveal quotes it. The block button keeps one label, "7x7 block", with an active state (it used to relabel to "Back to 5x5"). The corner-timing sentence ("the sides grow, and then the corners see 3 too"), which only Step could show, is gone.

1. **Title and hook.** "How picky can a grid be?" / "A block of early adopters on a grid. Can a big enough start beat any threshold?" No q is named. No.
2. **Options.** "1/2" / "3/8" / "1/4". All fractions. Yes.
3. **Locked stage.** Note "A 5x5 block has adopted."; the 11 x 11 window with the seed block and no neighbour numbers; Run, Step, the five q buttons (1/2 active), 7x7 block, Grid, Line at 1/2, Reset, all disabled; readouts Adopted 25 / 1,521 and Round 0; no results table. The q buttons show all five values the same way. Nothing marks 3/8.
4. **Reveal values.** "3/8 took all 1,521 people": (b) milestone grid-full, from the results table. "2/5, 1/2, 3/5 left the block at 25": (a) the grid5 cells above 3/8 the learner finished (milestone grid-stuck guarantees at least one). "3 adopters among 8 ... 2 ... 1": the neighbour numbers drawn on every stuck grid (told reading of them, claim c2). "your 7x7 block stalled too, at 49": (a) only if a 7x7 run above 3/8 is in the table. "Your line at 1/2, where the grid stuck, took all 201": (b) milestone line-half; "where the grid stuck" only if the 5x5 grid at 1/2 is in the table as stuck. "cascade capacity: 1/2 ... 3/8": told naming, claim c5.
5. **QA path.** DOM order: Run (grid at 1/2: grid-stuck), Step (disabled at the end), 1/4, 3/8 (grid-full), 2/5, 1/2, 3/5, 7x7 block (7x7 at 3/5: 49), Grid (disabled), Line at 1/2 (line-half), Reset: 3 of 3. Each enabled press changes the note or the picture. When the reveal opens after Reset, the table shows 5x5: 1/4 all, 3/8 all, 2/5 25, 1/2 25, 3/5 25; 7x7: 3/5 49; Line: 1/2 all.
6. **Reset.** Reset sets the round to 0 but not the table. Expected reveal after the QA path: "On the grid, 3/8 took all 1,521 people, while 2/5, 1/2, 3/5 left the block at 25. The numbers beside the block show why: a person facing the middle of a side sees 3 adopters among 8 neighbours, one near a corner 2, one off a corner 1. At 3/8, 3 is enough. / Above 3/8 a newcomer needs 4 of 8, which nobody beside a block has, so your 7x7 block stalled too, at 49. Your line at 1/2, where the grid stuck, took all 201: each newcomer sees 1 of 2. That largest q is the network's cascade capacity: 1/2 for a line, 3/8 for this grid." (Read from the code; this batch does not run QA.)
