# Build note: tic-tac-toe-is-a-draw

builder: algo-pair-03 · 2026-10-14 · status: draft · kept from evaluators until they report

Built from brief #24 and the spec `company/design/specs/tic-tac-toe-is-a-draw.md` (single card, not the brief's storyboard).

## What it does
- Predict (X / O / draw, answer draw) about the empty board. The stage is the spec's endgame (X O X / O O . / . X ., X to move) as a tree of boards, four "?" badges, finished games labelled in words.
- 4 controls in DOM order: three middle boards (O picks the worst for X), then the top board (disabled until all three are scored). Scored nodes become `active` and disabled; the picked line goes thick. Milestones `o-scored` and `top-scored`, `minInteractions=2`. Tree values are computed from the boards in Demo.tsx, not typed in.
- Reveal: the scored tree stays. One sentence is told and not shown: the empty board is a draw, from all 255,168 games. It is claim c1/c2 with source "TOLD, NOT SHOWN".

## Re-run in node
`node company/reviews/tic-tac-toe-is-a-draw/verify.mjs`: empty board value 0, every first move 0, 255,168 games, endgame value 0, middle values draw / O wins / O wins, leaf results as in the spec table. Own memoized minimax; TheAlgorithms/Python not copied.

## Departures from the spec
- Controls are transparent HTML buttons laid over the SVG by percentage so they scale with it; each is at least 64 px at 360 px width. Dashed border marks a tappable board.
- Title/hook avoid the word "draw". Recall question added (X's three scores: win, draw, loss, so position value is X wins).
- Where O wins at once (O completes the middle row) the finished board has an empty square and no forced X move.

## Open
- c5 (von Neumann 1928, AIMA 5.2) and c6 (Shannon 1950, 10^120) are cited from memory, not rechecked: for the fact-checker.
- All claims `unverified`.

## Checks skipped (coordinator order, machine out of memory)
No next build, QA, walkthrough or full tsc ran. `npm run check` passed. An earlier tsc run found two missing-children errors in tic-tac-toe Demo.tsx, which were fixed but not retyped. Status stays draft; chief of staff runs integrated QA and walkthrough after merge.
