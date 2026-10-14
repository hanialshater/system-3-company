# Build note: turns-beat-first-come-first

builder: algo2-sd · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/turns-beat-first-come-first.md` (+ svg) and brief #80 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (node, own script, then the Demo.tsx logic itself transpiled and run)
A 10, B 1, C 1, all at 0, order A, B, C; wait = finish − work. First come: finishes 10, 11, 12; waits 0, 10, 11; average 7. Turns of 1: ABCAAAAAAAAA, waits 2, 1, 2, average 1.67. Turns of 2: AABCAAAAAAAA, 2, 2, 3, 2.33. Turns of 5: AAAAABCAAAAA, 2, 5, 6, 4.33. Matches brief and spec.

## Built as specced
Two stacked full-width timelines in one SVG on one clock (28 px a unit, ticks 0, 2 … 12), one dashed cursor across both. Blocks carry the job letter and differ by pattern (A solid, B striped, C dotted). A finished job gets a pin at its finish time with its wait. Under each lane "Waits: … · average …", filled job by job. Results line "First come 7 · turns of 5: ? · 2: ? · 1: ?". Five controls in DOM order: Tick, Run to the end (30 ms a unit), chips 5 · 2 · 1 (aria-labels "Turn length N"; 1 active and disabled at start). A chip clears only the turns lane; if both lanes had finished, the turns lane replays to 12. Averages to two decimals. Milestone `both-finished` (both lanes at 12 with turn 1); minInteractions 1. The reveal adds the 2.33 / 4.33 sentence only for chips the learner ran.

## Choices and deviations
- One clock: if a chip is pressed before the end, the turns lane restarts at 0 while the first-come lane keeps what it has drawn (never cleared); later ticks extend the first-come lane only past what it already showed.
- Lane readouts are drawn inside the SVG under each lane so the shared cursor can cross both lanes.
- All controls are disabled while a replay runs.
- Title and hook are my wording (from the wireframe's line).

## Problems found in the brief or spec
None. Claim c6 (Silberschatz, context-switch cost) has no edition or section yet.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.
