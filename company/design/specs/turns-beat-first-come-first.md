# Spec: turns-beat-first-come-first

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #80 · wireframe: `turns-beat-first-come-first.svg`

**Format: Side-by-side comparison, as two stacked timelines on one shared clock.** One button ticks both schedules, so at time 2 the learner sees B already finished in the turns lane while it has not started in the first-come lane. Each lane is a full-width Gantt row: twelve time units need the width.

## Brief check (re-run in node, 2026-10-14)
Jobs A 10, B 1, C 1, all arriving at 0, served in order A, B, C. Wait = finish time − work.
- First come, first served: finishes 10, 11, 12; waits 0, 10, 11; **average 7**.
- Turns of 1: finishes A 12, B 2, C 3; waits 2, 1, 2; **average 1.67**. Turns of 2: waits 2, 2, 3, average 2.33. Turns of 5: waits 2, 5, 6, average 4.33. **The brief is right.**

## Stage at 390×844 (~300 px at predict, ~430 px in explore)
1. Rule line (muted, 13 words): "A, B, C arrive together, needing 10, 1 and 1. Wait = finish − work."
2. **Lane "First come, first served"**: a row 0–12 at 28 px per unit (336 px), with tick labels 0, 2, 4 … 12. Each unit run is a block with the job's letter, and the jobs differ by pattern as well as hue (A solid, B striped, C dotted). A finished job gets a pin at its finish time carrying its wait as a bare number ("10").
3. **Lane "Take turns (turn = 1)"**: the same row. The turn length in the title follows the active chip.
4. **Shared clock**: one vertical cursor across both lanes at the current time.
5. Readout under each lane: "Waits: – · average –", filled job by job ("Waits: 0 · 10 · 11 · average 7").
6. **Results line** (readouts): "First come 7 · turns of 5: ? · 2: ? · 1: ?".
7. Controls, below.

Stage words at the busiest moment: rule line 13 + lane titles 7 (numbers not counted) + readout labels 4 = 24.

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Tick" | advances the clock by one unit. Each lane runs one unit of its next job: the block appears and any finished job gets its flag. Disabled at time 12 |
| 2 | Control | "Run to the end" | ticks to 12 one unit at a time, about 30 ms each (≤ 400 ms; instant under reduced motion) |
| 3–5 | Control chips | "5" · "2" · "1" (group "Turn length", aria-labels "Turn length 5" etc.) | start: **1** active and disabled (the question's case). Switching clears only the turns lane and restarts it at time 0 with the new turn. **If both lanes had finished**, the turns lane replays to 12 at once, as #2. The first-come lane is never cleared. Chips run longest to shortest, so the QA path ends back on the question's turn of 1 |

All 5 controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset: chips restart one lane only, and the results line keeps every finished run.

QA path (each control once, DOM order): Tick (time 1: both lanes ran A) · Run to the end (first come 7; turns of 1 1.67: milestone `both-finished`) · 5 (replayed: 4.33) · 2 (replayed: 2.33) · 1 (re-enabled; replayed: 1.67). The stage ends on the question's schedule, and the results line is full.

## States
- **Predict:** two empty rows with the axis, the cursor at 0, the jobs listed in the rule line, "Waits: – · average –". The first-come average of 7 is in the question, but it is not drawn on the stage until that lane runs.
- **On unlock:** nothing moves until a press. Exploration hint: "Tick both schedules and watch when B and C finish."
- **Time 1:** both lanes show one A block.
- **Time 2:** first come: A, A. Turns: A, B, with B's pin "1". The lanes part.
- **Time 3:** turns: C finishes, pin "2". From here the turns lane runs A to the end.
- **Time 12:** first come: pins 0, 10, 11, "average 7". Turns: A finishes at 12 with pin "2", "average 1.67".
- **Turns of 5 / 2:** the turns lane redraws with A blocks of 5 or 2 before B and C. B and C slide right, and the averages 4.33 and 2.33 sit between 1.67 and 7.
- **Reveal:** the stage stays on turns of 1, with both lanes full. The reveal: "First come, first served made B and C sit behind A's 10 units: average wait 7. Taking turns of 1 let B finish at 2 and C at 3. A finished at 12, only 2 later than if it ran alone. Average wait about 1.67. Longer turns crept back toward 7: turns of 2 gave 2.33, turns of 5 gave 4.33. Turns help short jobs without knowing anyone's length. Real systems pay a little for each switch, which this model leaves out."

Milestones (`minInteractions=1`): `both-finished` (both lanes reach 12 with turn 1).

## Shown, not told
The learner's second Tick is the lesson: B's pin appears at time 2 in one lane while the other lane is still only A. The chips then show turns sliding back toward first-come as they lengthen.

## Colour and access
Job blocks differ by pattern plus letter; pins carry numbers. Lane `aria-label`: "Turns of 1: A waited 2, B waited 1, C waited 2, average 1.67".

## Notes for others
- **Builder:** the turn order is A, B, C, then back to A; a finished job leaves the cycle. Show averages to two decimals, and quote 1.67 as "about 1.67".
- **Brief owner (cm-cs-algorithms):** the brief's "tick on each lane" is one shared Tick (the lanes stay on one clock), and the chips are ordered 5 · 2 · 1 so that the QA path ends on the question. Teaching unchanged.
- No illustration (CS).
