# Spec: small-values-crawl-left

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #42 · wireframe: `small-values-crawl-left.svg`

**Format: Side-by-side comparison** (as briefed). Two lanes, X (2 3 4 5 6 1) and Y (6 1 2 3 4 5), run under **one shared control**, so every press is one sweep in both lanes. Lockstep is the comparison: after the first press Y is already in order and X has moved its 1 by a single place. Each sweep adds a row under the last one, so each lane becomes a ladder of rows, and a line tracks the value that is out of place. In Y the 6 crosses the whole row in one rung. In X the 1 creeps one column per rung.

## Brief check (re-run in node, 2026-10-14)
- X: 2 3 4 5 6 1 → 2 3 4 5 1 6 → 2 3 4 1 5 6 → 2 3 1 4 5 6 → 2 1 3 4 5 6 → 1 2 3 4 5 6, then a sweep with no swap. **5 swapping sweeps.**
- Y: 6 1 2 3 4 5 → 1 2 3 4 5 6, then a sweep with no swap. **1 swapping sweep.**
- **The brief is right.** Answer A (X) holds.

## Stage at 390×844 (~330 px at predict, ~420 px in explore)
1. Rule line (muted, 15 words): "One sweep: left to right, swap neighbours that are out of order. Stop after a sweep with no swap."
2. **Two lanes side by side**, each ~172 px wide. Header: "X" / "Y". Each row is 6 cards of 26 px with 3 px gaps, and rows are 28 px apart. Row 0 is the start list. Each sweep appends one row (X reaches 7 rows: start, 5 swapping sweeps, 1 empty sweep). Pairs swapped in that sweep are outlined in `--domain` on that row.
3. **Tracker lines**: a thick `--fg` polyline joins the cell centres of the 1 in X and of the 6 in Y from row to row. All other values get a faint `--line` polyline. The 6's line is nearly horizontal (5 columns in one row); the 1's line is a slow diagonal (1 column per row).
4. **Counters** under each lane (readouts): "Swapping sweeps: 5", which becomes "Swapping sweeps: 5 · done" after the lane's no-swap sweep. The no-swap row itself is drawn in `--muted` with no outlines.
5. Controls (one row of 44 px), see below.

Stage words at the busiest moment: rule line 15 + "X" "Y" 2 + two counters 4 + 4 = 25.

## Controls, in DOM order (2)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Sweep both" | one sweep in every lane that is not done. Appends a row per lane, flashes the swapped pairs, extends the tracker lines, updates the counters. Disabled when both lanes are done |
| 2 | Control | "Sweep to the end" | computes the rest, then replays **every remaining sweep in order**, one row per 50 ms (≤ 300 ms total; instant under reduced motion). Disabled when both lanes are done |

Both render at first paint, disabled while `locked`, class `.tap`. No reset: the ladders are the result and the reveal reads them.

**Not a jump to the answer.** #2 adds each rung in turn, so the 1 is seen moving left rung by rung. Anyone who wants to can press "Sweep both" 6 times by hand.

QA path (each control once, DOM order): Sweep both (Y: row 1 is 1 2 3 4 5 6, the 6 line crosses the lane; X: row 1 is 2 3 4 5 1 6) · Sweep to the end (Y gets its no-swap row: done, 1; X gets rows 2–6: done, 5; milestones `x-done`, `y-done`).

## States
- **Predict:** both lanes show row 0 only, no tracker lines, counters read "Swapping sweeps: 0". Nothing hints at which lane is longer: no empty rows are drawn ahead of time.
- **On unlock:** nothing moves until a press. Exploration hint: "Sweep both lanes and watch where the 1 and the 6 go."
- **After sweep 1:** Y is in order (not yet "done": the rule needs a sweep with no swap). X's 1 has moved one place.
- **After sweep 2:** Y: no-swap row, "done", counter 1. X: the 1 at position 4.
- **Both done:** X ladder 7 rows, the 1's line a clean diagonal from the right edge to the left; Y ladder 3 rows. Counters 5 and 1.
- **Reveal:** the stage stays as left. Reveal quotes the counters: "X took 5 sweeps that swapped; Y took 1. In Y, one sweep carried the 6 past every card. In X, the 1 could only move one place per sweep." Then the brief's payoff (turtles; comb sort with a shrinking gap, claim 3).

Milestones (`minInteractions=2`): `x-done`, `y-done` (each lane's no-swap sweep).

## Shown, not told
The learner's own presses make the two ladders. The asymmetry is in the shape of two lines, not in a sentence: one crosses the lane in a single rung, the other takes five. The reveal names the lines ("turtle", "rabbit") only after the learner has drawn them.

## Colour and access
Cards white with `--fg` digits (14 px); swapped-pair outline `--domain` 2 px plus a small "↔" glyph between them, so it is not colour alone. The tracked line is 3 px `--fg`; the others are 1 px `--line`. Lane `aria-label`: "X: 5 swapping sweeps, the 1 moved one place per sweep".

## Notes for others
- **Builder:** a sweep compares every adjacent pair once, left to right, swapping as it goes (so the 6 is carried). The counted number is sweeps that made at least one swap (claim 1). The final no-swap sweep is drawn but not counted.
- **Brief owner (cm-cs-algorithms):** the brief's "tap sweep on each" lane becomes one shared "Sweep both" plus "Sweep to the end", so QA reaches both end states with one press each. The teaching is unchanged.
- No illustration (CS).
