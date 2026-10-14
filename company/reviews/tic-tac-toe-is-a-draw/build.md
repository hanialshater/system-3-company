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


## r5 revision (v3, 2026-10-14, wave D)
Answers 2026-10-14-learner-adult-beginner-r5.md (revise, top finding: the empty-board answer was told, not seen).
- New bridge row under the endgame tree: the empty board (X to move) and X's three kinds of first move (corner, edge, centre). It unlocks after the endgame's top board is scored. Tapping a first move shows its value from the same two rules, computed in Demo.tsx by a memoized minimax (`solve`); tapping the empty board lets X pick the best and lines up the draws.
- Gate: milestones o-scored, top-scored, empty-scored (minInteractions 3), so the reveal needs the empty-board state it explains. DOM order: 3 middles, top, 3 first moves, empty: 8 controls, each reachable by one press in order.
- Leaves that O's pick avoids and that were better for X are struck through (minor finding 2); leaf captions and labels larger (finding 3).
- Reveal and hook rewritten; c1, c2, c4 reworded and set unverified. The other six first moves are mirror copies: in a code comment and c1's source, not on the stage.
- Not run (coordinator order): next build, QA, walkthrough, tsc. A TypeScript transpile (syntax only) passed; `npm run registry` and `npm run check` passed. The bridge SVG has max-height none so its overlay tap targets line up; check the total stage height on a phone in the walkthrough.
