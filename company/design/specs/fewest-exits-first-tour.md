# Spec: fewest-exits-first-tour

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #52 · wireframe: `fewest-exits-first-tour.svg`

**Format: Side-by-side comparison.** Two 5×5 boards side by side (170 px each, 34 px squares), one shared "Move" button. Same knight, same start, same move list; only the rule for picking differs. The boards are small enough for true side-by-side panels, and the moment they part (move 2) is seen, not remembered.

## Brief check (re-run in node, 2026-10-14)
Squares (column, row) with (0, 0) the top-left corner. Moves tried in order (1,2) (2,1) (2,−1) (1,−2) (−1,−2) (−2,−1) (−2,1) (−1,2), as (right, down). Rule A takes the first legal move in that order. Rule B takes the legal move whose square has the fewest onward moves to unvisited squares, with ties going to the first in that order.
- 5×5 from (0,0): **A visits 21** and is stuck at (1,3). The four squares it never reaches are (0,2) (0,3) (0,4) (1,4), the bottom-left corner. **B visits 25** and ends at (0,2). 8×8: **A 36, B 64.** **The brief is right.**
- Both rules take (1,2) first (both legal squares have 5 onward moves; the tie goes to the first). They part at move 2: from (1,2) the legal squares have 3, 3, 3, 3 and 1 onward moves, so A goes to (2,4) and B to (0,4).

## Stage at 390×844 (~330 px at predict, ~470 px in explore)
1. Rule lines, one per board, above it (muted, 13 words in all): "A: first legal move in the fixed order" · "B: fewest onward moves".
2. **Move-order glyph** beside A's title: a tiny knight with the eight targets numbered 1–8. This is the fixed order, shown without words.
3. **Two boards**, 170 × 170 px each, 8 px gap. A visited square is filled with the `--domain` tint and shows its visit number (1 = start). The knight is a glyph on the current square. Each **legal next square** has a dashed outline and a small badge with its number of onward moves. On B, the square the rule will take next has a solid 2 px outline. On A, the first square in the order has that outline.
4. Under each board: "Visited: 1". When a board is stuck, the knight gets a ring, "stuck at 21" appears, and the unvisited squares are hatched.
5. **Results table**, two rows × two columns (readouts): rows "5×5" and "8×8", columns A and B. Cells read "?" until a run ends.
6. Controls, below.

Stage words at the busiest moment: rule lines 13 + "Visited" ×2 + "stuck at" 2 + table labels 2 = 19.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Move" | each board that is not stuck makes one move by its rule: the knight moves, the square is numbered, and the badges update. Disabled when both boards have ended |
| 2 | Control | "Move until stuck" | replays the remaining moves on both boards one at a time, about 16 ms each (≤ 400 ms; instant under reduced motion). Every square is numbered as it is visited |
| 3 | Control toggle | "Board: 5×5" / "Board: 8×8" (`aria-pressed`) | switches both boards to the other size, knight in the corner. **If the 5×5 runs had ended**, the 8×8 runs replay to the end the same way as #2 (64 moves, ≤ 400 ms). On 8×8 the squares are 21 px: visit numbers stay (10 px), and the onward badges are hidden |

All 3 controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset: the toggle restarts, and the table keeps every finished run.

QA path (each control once, DOM order): Move (both at (1,2), visited 2) · Move until stuck (A stuck at 21 with the bottom-left corner hatched; B 25: milestone `both-ended-5x5`) · Board 8×8 (replayed: A 36, B 64; table full). The table holds all four numbers at the reveal.

## States
- **Predict:** two identical boards, the knight on (0,0) numbered 1, the two legal squares (1,2) and (2,1) outlined with badges ("5" on each, the same on A and B). "Visited: 1" on both. Table "?". No count of 25 is shown, and the board has no "squares left" counter, so nothing hints at 21.
- **On unlock:** nothing moves until a press. Exploration hint: "Move both knights and watch where the rules part."
- **Move 1:** both on (1,2). **Move 2:** A takes (2,4), B takes (0,4): the boards differ for the first time. At that moment the five legal squares read 3, 3, 3, 3 and 1: A takes the first 3, B takes the 1.
- **A stuck:** 21 numbered squares, the knight ringed on (1,3), four hatched squares in the bottom-left corner. "stuck at 21".
- **B done:** all 25 numbered, ending on (0,2). "Visited: 25".
- **8×8:** both boards redrawn and replayed. A ringed at 36 with 28 hatched squares; B full at 64.
- **Reveal:** the stage stays on 8×8; the table holds 5×5 and 8×8. The reveal: "Rule A got stuck after 21 squares. It left the bottom-left corner for last, and by then no move reached it. Rule B always stepped to the square with the fewest ways on, so awkward squares were used while they could still be reached, and it visited all 25. On 8×8: A 36, B 64. The rule is a rule of thumb, not a guarantee: it can fail on some boards and starts."

Milestones (`minInteractions=1`): `both-ended-5x5`. (8×8 is extra evidence, not a gate.)

## Shown, not told
The badges are the rule made visible: the learner can check each B move against the smallest badge. The hatched corner on A's board is "used up the hard squares too late", drawn.

## Colour and access
Visited tint `--domain` with `--fg` numbers; legal squares dashed `--line` (shape); the next pick a solid outline; stuck squares hatched, not just coloured. Each board's `aria-label`: "Rule A: stuck after 21 squares, 4 unvisited".

## Notes for others
- **Builder:** the onward count excludes visited squares and the current square. The tie-break is first in the fixed order. Both are claims and must match the node check.
- **Brief owner (cm-cs-algorithms):** the brief's two "step" buttons and restart are one shared Move (lanes stay in step) and the size toggle (restarts on a new board). The 8×8 numbers are on the stage, so the reveal may quote them. Teaching unchanged.
- No illustration (CS).
