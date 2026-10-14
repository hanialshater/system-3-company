# Spec: one-cell-rule-30

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #78 · wireframe: `one-cell-rule-30.svg`

**Format: Side-by-side comparison** (as briefed). Two panels grow from the same single live cell under one shared "Step" control. Rule 30 is on the left (the question's rule) and Rule 90 on the right (the tidy contrast). The brief's "toggle for Rule 90" becomes a permanent second panel, so the learner never has to remember one picture while looking at the other. Each step adds one row underneath, and each panel prints its live count beside the newest row. At step 8, Rule 90's row has 2 live cells and Rule 30's has 7. Option A (2) is Rule 90's answer, which is the misconception's answer.

## Brief check (re-run in node, 2026-10-14)
- Rule 30 live counts, steps 0–8: 1, 3, 3, 6, 4, 9, 5, 12, **7**. Centre column 110111001.
- Rule 90: 1, 2, 2, 4, 2, 4, 4, 8, 2. Centre column 100000000.
- **The brief is right.** Answer B (7) holds.

## Stage at 390×844 (~300 px at predict, ~460 px in explore)
1. Rule line (muted). Over the left panel, the 8 rule tiles from the question: three small cells above one result cell (icons, no words). Over the right panel: "Rule 90: alive if exactly one neighbour is" (7 words).
2. **Two panels** of 17 × 9 cells at 10 px (170 × 90 px), side by side with a 16 px gap. Live = `--fg` square, dead = `--bg-2`. The centre column has a faint guide line in both panels.
3. **Count column** at each panel's right edge: the live count for every row, 10 px numbers, newest row bold. The row-8 counts are what the question asks.
4. **Centre-column strip** (shown by #3): under each panel, the centre column's bits as a row of 9 digits ("110111001" / "100000000"), and that column outlined in the panels.
5. Controls (one row of 44 px).

Stage words at the busiest moment: right-panel rule 7 + panel heads "Rule 30" "Rule 90" 4 + "Centre column" 2 = 13 (counts and bits are numbers).

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Step" | adds the next row to **both** panels, with that row's counts. Disabled at step 8 |
| 2 | Control | "Step to 8" | replays every remaining step in order (50 ms per row, ≤ 400 ms). Disabled at step 8 |
| 3 | Control toggle | "Centre column: off" / "on" (`aria-pressed`) | outlines the centre column and shows its bits under each panel. Never removes rows |

All 3 render at first paint, disabled while `locked`, class `.tap`.

QA path (each control once, DOM order): Step (row 1: 3 live / 2 live) · Step to 8 (rows 2–8; counts end 7 and 2; milestone `step-8`) · Centre column: on (110111001 against 100000000).

## States
- **Predict:** row 0 in both panels: one live cell each, counts "1". The rule tiles are visible. No further rows and no grid lines beyond row 0, so the triangle's size is not hinted.
- **On unlock:** exploration hint: "Step both rules and compare the rows."
- **Steps 1–4:** both grow into triangles. Rule 90's left and right halves mirror each other; Rule 30's right side already looks ragged.
- **Step 8:** Rule 90 shows a nested triangle with a row of 2 at the bottom. Rule 30's left edge is a regular stripe pattern and its right side is irregular, with 7 in the bottom row.
- **Reveal:** stage as left. Reveal quotes the counts: "Same single cell, same kind of rule. Rule 90's row 8 had 2 live cells, in a neat nested triangle. Rule 30's had 7, and its counts went 1, 3, 3, 6, 4, 9, 5, 12, 7 with no pattern." Centre column line (claim 3) only if the toggle was on.

Milestones (`minInteractions=1`): `step-8`.

## Shown, not told
The learner sees two triangles grow from one press each. One is regular from the start; the other stops being predictable within a few rows. The reveal's "looks random" names what the left panel already shows next to the right.

## Colour and access
Cells are `--fg` on `--bg-2` (works in both themes). The centre-column outline is a 2 px dashed `--domain` line plus the printed bits, not colour alone. Panel `aria-label`s: "Rule 30, step 8: 7 live cells" / "Rule 90, step 8: 2 live cells".

## Notes for others
- **Builder:** compute both rules from their numbers (bit l·4 + c·2 + r of the rule number) on a 17-cell row with dead cells beyond the edges. At 8 steps the pattern never reaches the edge (width 2·8 + 1). Cells are 10 px drawings, not controls, so the tap-target rule does not apply.
- **Brief owner (cm-cs-algorithms):** the Rule 90 toggle becomes a second panel (side-by-side format), and a centre-column toggle is added for the payoff's last line. The teaching is unchanged.
- **Fact-checker:** claim 3 (A New Kind of Science, p. 317) is still marked "check page before building" in the brief.
- No illustration (CS).
