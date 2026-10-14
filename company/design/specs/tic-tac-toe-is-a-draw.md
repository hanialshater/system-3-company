# Spec: tic-tac-toe-is-a-draw

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #24 · wireframe: `tic-tac-toe-is-a-draw.svg`

Brief updated 2026-10-14: first option taken: the question stands, and one reveal sentence is told, not shown (the empty board is a draw). It is now claim (4) in the brief, simulation support: memoized full search, 5,478 positions, value 0, 255,168 games (131,184 X wins, 77,904 O wins, 46,080 draws), every first move worth 0. Endgame table re-run and matches this spec. The learner-facing sentence must say it comes from a computer search, not from the tree on the stage.

**Brief check (node, 2026-10-14): the answer is correct.** Memoized minimax from the empty board gives 0 (draw). Every first move for X (corner, edge, centre) is also worth 0. There are 255,168 complete games.

## Brief problem (route to the learning designer and cm-cs)
**The key state cannot show the answer.** The learner scores a 3-empty-square endgame by hand. That shows the *method*, and it shows a draw in miniature, but nothing the learner can reach on the stage shows that the *empty board* is a draw. A full-game button would be a jump straight to the answer, and the full tree (255,168 games) cannot be done by hand in 60 seconds. So one reveal sentence is told, not shown: "The same two rules, run by computer over every game from the empty board, give a draw at the top too." It is a claim (simulation). Options for the owners: accept that one told sentence (this spec's default), or change the question to the endgame the learner scores (a change to what the lesson teaches, which I may not make).

Also: the slug states the answer. It shows only in the URL (`/d/<slug>`), but the hook title must not say "draw".

## The endgame (chosen by the designer, node-checked)
Searched every reachable position with X to move, 3 empty squares, no winner and no immediate X win, for one where the top value is a draw, some X moves lose, and X-win endings still exist under the moves. Chosen:

```
X O X
O O .      empty: 5 (right middle), 6 (bottom left), 8 (bottom right)
. X .      X to move
```

| X plays | O replies → final (X's last move is forced) | O's best |
|---|---|---|
| 5 (blocks O's row) | O 6, X 8 → **X wins** (right column) · O 8, X 6 → **draw** | draw |
| 6 | O 5 → **O wins** (middle row) · O 8, X 5 → **draw** | O wins |
| 8 | O 5 → **O wins** · O 6, X 5 → **X wins** (right column) | O wins |

Top: X's best = draw. Two of X's three moves have an X win underneath, which is the misconception in small: X *can* win if O slips, but O's best reply always takes it away.

## Why this format: Single card (changed from the brief's Storyboard / scrub)
The payoff is not *when* something happens; it is a value the learner carries up a tree. Storyboard would give a scrubber that plays the scoring for them. Here every node is a tap, and each tap is one application of the rule (O takes the worst for X, X takes the best), so the learner does the whole computation with four taps. Single card is ✅ in the kit.

## Stage at 390×844 (~380 px at predict, ~480 px in explore)
1. Rule line (muted, 17 words): "Bottom row: finished games. Tap a board: O picks the worst result for X; X picks the best."
2. **The tree**, top to bottom (drawn in SVG, with buttons over the scoring nodes):
   - **Top:** the endgame board, 72 px, "X to move", value badge "?".
   - **Middle:** three boards, 64 px, one per X move, the new X highlighted with a ring; "O to move", badge "?".
   - **Bottom:** six finished boards, 52 px (17 px cells), two under each middle board, each with its result in words under it: "X wins" / "Draw" / "O wins". The forced last X move is drawn in a lighter ring so the learner sees it was forced.
   - Lines join parents and children. When a node is scored, the line to the child it picked turns thick.
3. Readout: "Scored 1 of 4".

## Controls, in DOM order (4)
| # | Kind | Label (`aria-label`) | Behaviour |
|---|---|---|---|
| 1 | Control (middle board) | "After X plays right middle: O picks" | fills its badge with the lower of its two children for X (here "Draw"), thickens that line |
| 2 | Control (middle board) | "After X plays bottom left: O picks" | same ("O wins") |
| 3 | Control (middle board) | "After X plays bottom right: O picks" | same ("O wins") |
| 4 | Control (top board) | "X to move: X picks" | disabled until all three middle boards are scored; then fills the top badge with the best of them for X ("Draw") and thickens that line |

The tree is drawn top-down but the controls are in DOM bottom-up (middle row first, top last; CSS places them), so DOM order is the order the rule needs and keyboard focus follows the work. A scored node becomes `active` and disabled (no dead presses). No reset. All 4 render at first paint, disabled while `locked`; each board button is at least 64 × 64 px (the top one 72), well over `.tap`.

QA path: middle 1 (Draw: milestone 1) · middle 2 (O wins) · middle 3 (O wins) · top (Draw: milestone 2). The reveal stage is the fully scored tree.

## States
- **Predict:** the whole tree visible, finished games labelled, the four upper badges "?". Controls disabled. Nothing on the stage is about the empty board, so the question's answer is not on it.
- **Middle boards scored:** each badge fills; the thick line shows which reply O chose. The learner sees an "X wins" ending under two moves, and O steering away from it.
- **Top scored:** "Draw", with the thick line down to "X plays right middle" (blocking O's row).
- **Reveal:** stage unchanged (the scored tree). The reveal quotes it: "X had two moves with a win underneath, but in each O's best reply took it away. Your top board came out a draw. The same two rules, run by computer over all 255,168 games from the empty board, give a draw at the top too: perfect players always draw. Chess has far too many games to finish this way."

Milestones (`minInteractions=2`): `o-scored` (any middle board scored), `top-scored` (the top board scored).

## Shown, not told
The learner never reads "minimax": they apply "O picks the worst for X" three times and "X picks the best" once and watch the draw arrive at the top, even though X-win endings are right there in the bottom row. The one told sentence is the full-game result (see the brief problem above).

## Colour and access
Results are words first: "X wins" / "Draw" / "O wins" (`--good` / `--fg` / `--bad` text, all text-safe). X and O are glyphs, not colours. Thick picked lines `--fg` 3 px, others `--line` 1.5 px. Tree `aria-label` on the svg: "Top: X to move, value Draw". 17 px cells are the minimum for the bottom boards to read; the accessibility reviewer checks them on a 390 px contact sheet.

## Claims this spec adds
(a) the endgame values in the table (simulation, the designer's node search; the builder re-runs it). (b) 255,168 complete games (simulation, same script). Brief claims (1)–(3) unchanged.
