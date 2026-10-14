# Spec: a-star-heads-for-goal

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #18 · wireframe: `a-star-heads-for-goal.svg`

**Format: Before / after toggle.** One grid, one change: the search's ranking gains a guess of the steps left. "Before" (no guess) floods out in rings; "after" (with guess) runs straight at the goal, and the after state persists into the reveal. A comparison would put two 7×7 grids side by side at about 22 px a cell, too small to read the settle numbers. One grid with a ghost of the "before" run keeps one representation on the phone.

## Brief check (re-run in node, 2026-10-14)
7×7 open grid, 4-way moves, start (col 0, row 3), goal (col 6, row 3), Manhattan guess, the goal counts as settled when it is taken off the frontier.
- With guess: **7 settled**, route 6 steps. Without: **31 settled**, route 6. Both hold for every tie-break I tried (toward more steps taken, first-in-first-out, toward fewer steps). **The brief is right.**
- Wall (col 3, rows 2–4), added by this spec in place of the brief's drag: with guess **16 settled**, route 10 steps; without guess **46 settled** (every open cell), route 10. The 16 depends on the brief's tie-break (toward more steps taken); first-in-first-out gives 32. The tie-break must be disclosed in the claim and used exactly in code.

## Stage at 390×844 (~420 px at predict, ~520 px in explore)
1. Rule line (muted, 13 words): "Score = steps so far + steps left (no diagonals). Lowest score settles next." With **No guess** active the line reads "Score = steps so far. Lowest score settles next." The stage starts in the question's search (With guess), so the line never contradicts the question.
2. **Grid**, 7×7 cells of 44 px (308 px square), centred. Start = filled circle labelled S, goal = ring labelled G. Settled cells are filled `--domain` tint with their **settle order number** (1, 2, 3…). Frontier cells have a dashed outline. When the goal settles, the route is drawn as a thick `--fg` line through the cell centres.
3. **Ghost of the other mode**: after a mode switch, the previous run's settled cells stay as small hollow dots, so the 31-cell flood is still visible under the 7-cell line.
4. **Result table**, 2×2, full width, ~56 px (readouts, not controls). Rows "No guess" / "With guess", columns "Open" / "Wall". Each cell reads "?" until that run reaches the goal, then "31 settled · route 6". This is what the reveal quotes.
5. Controls (two rows of 44 px), see below.

Stage words at the busiest moment: rule line 13 + table labels 6 + one table cell 4 = 23.

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Settle next" | settles the lowest-score frontier cell in the current mode and numbers it. Disabled once the goal is settled |
| 2 | Control | "Settle to goal" | computes the rest synchronously, then replays **every settle in order** (≤ 13 ms per cell, ≤ 400 ms total; instant under reduced motion). Each cell gets its number as it settles, the count climbs, the route draws last. Disabled once the goal is settled |
| 3–4 | Control chips | "No guess" · "With guess" (group "Rank by") | start: **With guess** active and disabled (the question's search). Switching mode restarts from S in the new mode and leaves the old run as a ghost. **If the old run had reached the goal**, the new mode is replayed to the goal the same way as #2 (the ABM pattern approved in `mild-preferences-sharp-divides`) |
| 5 | Control toggle | "Wall: off" / "Wall: on" (`aria-pressed`) | places or removes the 3-cell wall at col 3, rows 2–4. Restarts the current mode; if the current run had reached the goal, replays it to the goal with the new wall |

All 5 controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset button: the chips and the wall toggle are the restarts, and none empties the stage.

**Not a jump to the answer.** #2 and the replay in #3–5 never set an end state directly: they play every settle in order, and the numbered cells stay on the stage. The 7 is something the learner watches being counted, cell by cell. The learner who wants to can do the guided run by hand: 7 presses of "Settle next".

QA path (each control once, DOM order): Settle next (S settled, 1) · Settle to goal (7 numbers along row 3, route 6: milestone `guided-at-goal`) · No guess (the 7 ghosted; the plain run replays in rings: 31, route 6: milestone `plain-at-goal`) · With guess (re-enabled; the 31 ghosted, the guided run replays: 7) · Wall on (the guided run bends round the wall: 16, route 10). The QA path ends on the "after" (With guess), and the table holds three of the four cells.

## States
- **Predict:** empty grid, S and G, rule line in the With guess wording, the With guess chip active but disabled like every control, table all "?". No numbers on any cell, no route, no frontier. Nothing on the locked stage implies 7, 25 or 49 (no counter with a maximum, no shaded rectangle).
- **On unlock:** nothing moves until a press. Exploration hint: "Settle to the goal, then try it with no guess."
- **With guess, Settle next ×n:** each press numbers the next cell along row 3; the frontier above and below stays dashed, unsettled.
- **With guess, at goal:** numbers 1–7 along row 3, route 6. Table: "7 settled · route 6".
- **No guess, Settle next ×n (or the replay):** numbers spread from S in diamond-shaped rings, as in wave-from-the-corner, over hollow dots marking the guided run.
- **No guess, at goal:** 31 numbered cells, a diamond cut off by the grid edges, the route as a straight line along row 3. Table: "31 settled · route 6".
- **Back to With guess:** hollow dots on the 31 old cells; numbers 1–7 run along row 3 only. The "after" sits on top of the "before".
- **Wall on, with guess:** settles 3 cells along row 3, then fans out round the wall's left side, then runs along row 5 and back down: 16 numbers, route 10.
- **Reveal:** the stage stays as left (no reset). The after state (With guess) is what QA leaves on it. The reveal quotes only filled table cells: "Without the guess, your search settled 31 cells in rings. With it, 7: just the route. Both routes were 6 steps." If the wall cell is filled: "With the wall, the guided search settled 16 and still found a 10-step route." The 10-step-is-shortest sentence appears only if the learner also filled "No guess · Wall" (46, route 10), so the guarantee is read off two equal numbers rather than asserted. Otherwise the guarantee is stated once and sourced (claim 2).

Milestones (`minInteractions=2`): `plain-at-goal` (No guess reaches G on any wall setting), `guided-at-goal` (With guess reaches G on any wall setting).

## Shown, not told
The learner first watches their own guided search count to 7 along one row. Then one chip removes the guess and the same grid floods: 31 numbers in rings, the misconception ("you must spread out in every direction") played out under their hands. Switching back lays the 7 over the ghost rings. "Never overestimates" is visible in the table: the route length is the same in both rows.

## Colour and access
Settled tint `--domain` with the number in `--fg` (dark ink on the pastel); frontier dashed `--line`; ghost dots `--muted` hollow; wall cells solid `--fg` with a cross-hatch, so it is not colour alone; route thick `--fg`. Numbers integer, 12 px minimum. Grid `aria-label`: "With guess: 7 cells settled, route 6 steps".

## Notes for others
- **Builder:** the tie-break (equal score: more steps taken first, then first added) is a claim and must match the node check. The goal counts when it is settled, not when it is first seen.
- **Brief owner (cm-cs-algorithms):** drag-a-wall and hold-to-auto-step are replaced by the wall toggle and "Settle to goal" (drag is not on the QA path). The teaching is unchanged.
- No illustration (CS).
