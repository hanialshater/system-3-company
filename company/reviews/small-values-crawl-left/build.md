# Build note: small-values-crawl-left (demo-builder, algo2-sa, 2026-10-14)

- Design intent (spec `company/design/specs/small-values-crawl-left.md`): two lanes, X = 2 3 4 5 6 1 and Y = 6 1 2 3 4 5, one shared control. Every press is one sweep in each lane that is not done; each sweep appends a row, so each lane becomes a ladder. A 3 px `--fg` line follows the 1 in X and the 6 in Y between rows (it runs in the gap between rows, so cards stay readable); other values get faint `--line` lines. Cards that changed place in a sweep get a 2.5 px `--domain` outline (thicker than the 1 px default, so not colour alone). The no-swap row is drawn faded.
- Controls in DOM order: Sweep both, Sweep to the end (replays each remaining row at 50 ms, max 5 rows = 250 ms; instant under reduced motion). No reset, as specced. Both disabled while locked, during the replay and once both lanes are done.
- Key state: milestones `x-done`, `y-done` (each lane's no-swap sweep), minInteractions 2. QA path: Sweep both (Y in order, X's 1 one place left), Sweep to the end (X 5 · done, Y 1 · done).
- Numbers: re-ran in node (scratchpad script): X 5 swapping sweeps, Y 1, each plus one no-swap sweep; all 720 orderings of 1-6 move a value left at most one place per sweep. Recall list 1 2 3 4 5 6 7 0 = 7 sweeps vs 7 0 1 ... 6 = 1. Brief answer A held.
- Deviations from spec: the "↔" glyph between swapped cards was dropped (no room in a 171 px lane); the thick outline carries the swap. Counters are two kit Readouts ("X swapping sweeps", "Y swapping sweeps").
- Not run (shared machine, by instruction): next build, typecheck, QA, walkthrough. Screenshots not yet looked at.
- Claims c4 and c5 cite Lacey and Box (Byte 1991) and Dobosiewicz (1980) from the brief; flagged "check before building".
