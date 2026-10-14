# Build note: shell-gaps-shrink-the-shuffles (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #41 (company/domains/briefs/cs.algorithms.md) and spec company/design/specs/shell-gaps-shrink-the-shuffles.md (+ .svg).

## What was built
- Two stacked full-width lanes of 16 reversed cards (20 px tiles, shaded by value, number printed). Top: plain insertion sort. Bottom: Shell, gaps 8, 4, 2, 1. Each lane shows "Shifts" and "Farthest from its place". A tally line under the Shell lane fills per pass and shows the total at the end.
- Controls in DOM order (5, as spec): Plain insertion sort · Sort 8 apart · Sort 4 apart · Sort 2 apart · Sort 1 apart. Passes are enabled in order. Plain replays 15 insertions at 20 ms; each Shell pass replays its 8 shifts at 35 ms with arcs (group raised 4 px while running). Reduced motion: instant.
- Milestones (minInteractions 2): plain-sorted, shell-sorted.

## Checks run
- Node (own script) and the Demo's own tables run through a syntax-only transpile with stubbed imports: plain 120; Shell 8, 8, 8, 8 = 32; farthest 15, 7, 3, 1, 0; gaps 4, 1 = 48 (not on stage). The hand before the last pass is 2 1 4 3 ... 16 15.

## Choices to challenge
- Replays use the swap form of each shift (same count as the copy form) so no card is shown twice mid-insertion.
- Readouts sit in the SVG on the lane title line at 9 px; may be small on a phone.

## Not run
next build, typecheck, QA, walkthrough (as instructed). Only `npm run registry` and `npm run check`. All claims unverified.
