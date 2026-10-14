# Spec: each-element-pops-once

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #63 · wireframe: `each-element-pops-once.svg`

**Format: Side-by-side comparison** (as briefed). One list row on top is shared, and under it are two panels driven by **one** "Next number" control. On the left, **Scan**: for the new position, a row of comparison ticks running right until a bigger number is found. On the right, **Stack**: the new number is compared with the stack top, pops what it beats, and is pushed. Each panel draws its comparisons as ticks, so the cost is an **area**: the scan becomes a 36-tick triangle, the stack a thin column of 8.

The question's list (9 8 … 1) never pops, and the lesson's title is about pops. So the spec adds a second list chip, **8 7 6 5 4 3 2 1 9**. The stack fills, then the 9 arrives and pops all eight waiting values in one go: 15 comparisons against the scan's 36. That chip is the "each is popped once" picture the payoff names. Its numbers are a new claim (below).

## Brief check (re-run in node, 2026-10-14)
- 9 8 7 6 5 4 3 2 1: scan 8+7+…+1 = **36**. Stack: each new number is compared once with the top, which is bigger, and pushed: **8**. **The brief is right.** Answer C holds.
- The brief's other list 5 3 8 1 9 2 7 4 gives stack 10 against scan 11. That is true, but on this stage it would make the stack look no better, so the spec does not use it.
- **Added list (new claim, needs a fact-check):** 8 7 6 5 4 3 2 1 9: scan **36**, stack **15** (7 compares while pushing, then 8 compares as the 9 pops 8 values). 9 pushes + 8 pops = 17 ≤ 2n = 18. Answers 9 9 9 9 9 9 9 9 none.

## Stage at 390×844 (~380 px at predict, ~520 px in explore)
1. Rule line (muted, 14 words): "For each number, find the next bigger one to its right. Count comparisons."
2. **List row**: 9 cells of 36 px (324 px). The current position has a caret under it. Under each cell is an **answer slot** ("?" → the answer, or "none" once the pass ends).
3. **Scan panel** (left, ~172 px): one row per position, holding as many 8 px ticks as that scan's comparisons. Rows stack downward into a triangle. Counter: "Scan: 36".
4. **Stack panel** (right, ~172 px): a vertical stack of cells (bottom = oldest). A pop slides the value up and out into its answer slot (150 ms) with a ✓. Beside the stack, one row of ticks per arriving number (its comparisons). Counter: "Stack: 8".
5. **Table** (readouts): "9 8 … 1: scan ? · stack ?" / "8 … 1 9: scan ? · stack ?".
6. Controls, see below.

Stage words at the busiest moment: rule line 14 + panel counters 4 + table 6 = 24.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Next number" | advances the caret one position. Scan draws that position's tick row; stack compares, pops (each pop fills an answer slot) and pushes. Both counters update. Disabled at the end of the list |
| 2 | Control | "All the rest" | replays every remaining number in order (40 ms each, ≤ 360 ms), ticks and pops included. At the end, values still on the stack get "none" |
| 3–4 | Control chips | "9 8 … 1" · "8 … 1 9" (group "List") | start: **9 8 … 1** active and disabled (the question's list). Switching loads the other list from the start. **If the current list was finished**, the new one is replayed to its end as #2 (the replay pattern from `a-star-heads-for-goal`). Each list's table row is kept |

All 4 render at first paint, disabled while `locked`, class `.tap`. No reset.

QA path (each control once, DOM order): Next number (9 pushed, no comparison yet) · All the rest (scan triangle 36, stack column holds all nine, 8; milestone `descending-done`) · 9 8 … 1 (disabled, skipped) · 8 … 1 9 (replay: the stack fills with 8…1, then the 9 pops all eight; scan 36, stack 15; milestone `pops-seen`). The stage ends with both table rows filled.

## States
- **Predict:** the question's list, empty answer slots, empty panels, counters "?", table "?". The 36 is in the question, so no tick triangle is pre-drawn and no counter shows it.
- **On unlock:** exploration hint: "Feed in the numbers and watch both counts."
- **Descending, done:** the scan triangle is full (36 ticks). The stack is 9 cells tall with 8 single ticks beside it. Every answer slot reads "none".
- **8 … 1 9, before the 9:** the stack holds 8…1, 7 ticks.
- **The 9 arrives:** a burst of 8 ticks in one row, 8 values leave the stack one after another, and each answer slot flips to 9. The stack holds only the 9.
- **Reveal:** stage as left. Reveal quotes the table: "On 9 8 … 1, scanning took 36 comparisons and the stack 8. When the 9 arrived at the end, it popped eight waiting numbers at once: 15 in all, still against 36." Then the payoff: every value is pushed once and popped at most once, so the work is at most 2n (claim 2).

Milestones (`minInteractions=2`): `descending-done` (the question's list finished), `pops-seen` (the second list finished).

## Shown, not told
The learner sees the cost as two shapes, a triangle against a column. Then they see the stack's one expensive moment, eight pops in one press, and the count still stays small. "Each element pops once" is something they count with their eyes before the reveal says it.

## Colour and access
Scan ticks `--muted`; stack ticks `--domain`; popped values carry a ✓ and land in `--good` answer slots. Counters are text. Caret `--fg`. Panel `aria-label`s: "Scan: 36 comparisons" / "Stack: 15 comparisons, 8 pops".

## Notes for others
- **Fact-checker / builder:** add claim "8 7 6 5 4 3 2 1 9: scan 36, stack 15, 8 pops" (simulation). Comparison convention: a stack comparison is one test of the new value against the current top. The scan stops at the first bigger value.
- **Brief owner (cm-cs-algorithms):** second list added; the brief's 5 3 8 1 9 2 7 4 example is dropped from the stage (it stays true as a claim if the reveal uses it, which this spec does not).
- No illustration (CS).
