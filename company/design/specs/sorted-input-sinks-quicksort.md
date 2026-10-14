# Spec: sorted-input-sinks-quicksort

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #2 · wireframe: `sorted-input-sinks-quicksort.svg`

**Format: Before / after toggle** (as briefed). It is one machine (quicksort, first card as pivot) with one change: the hand it is given. "Before" is the shuffled hand `3 4 1 6 2 5`, the everyday case the question compares against. "After" is the sorted hand `1 2 3 4 5 6`, and it persists into the reveal. Each hand keeps its own split ladder and count, so the toggle compares like for like and never resets.

## Designer's node check (2026-10-14, re-run of the brief)
Comparisons = every non-pivot card compared once with the pivot of its group (n − 1 per split).
- Sorted `1..6`: 5 splits, each leaving 0 cards on the left: 5 + 4 + 3 + 2 + 1 = **15**.
- Shuffled `3 4 1 6 2 5`: pivot 3 → `[1 2] | [4 6 5]` (5) · pivot 1 → `[] | [2]` (1) · pivot 4 → `[] | [6 5]` (2) · pivot 6 → `[5] | []` (1) = **9**.
- All 720 orders: mean 7416 / 720 = **10.3** exactly; maximum 15.
The brief is correct, with one wording caution: **32 of the 720 orders tie at 15** (the reversed hand `6..1` is one of them). "15 is the most possible" is true; "the sorted hand is the worst case" must not be read as "the only worst case". The reveal says "no order of 6 cards costs more".

## Stage at 390×844 (~300 px at predict, ~500 px in explore)
1. Model line (muted): "Toy quicksort: the first card is the pivot. Each card checked against it counts 1." (15 words)
2. **Tally strip**, both hands always visible: "Shuffled: ? · Sorted: ?" (counts fill in as each hand is split; a finished hand gets a small tick).
3. **Split ladder** for the hand on screen. The top row is the hand (six 40 px cards). Each split adds a row: the group, the pivot card outlined, an arrow left to "smaller" and right to "bigger", and the row cost as a run of small squares, one per comparison (12 px each, **no scale end, no maximum marked**). An empty side is drawn as a dashed empty slot with "0 cards". Groups still waiting are listed at the bottom: "To split: [4 6 5]".
4. Readout, large: "Comparisons: ?" while locked, then the running count for the hand on screen.

Stage words: model line 15 + "Shuffled" "Sorted" "To split" "smaller" "bigger" = 21 (counts and "0 cards" are readouts).

The answer is never on the locked stage: no "max", no "/15", no worst-case badge, and the cost squares have no scale end.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control `.tap` | "Split next group" | partitions the first waiting group of 2 or more cards on the hand on screen around its first card. Adds one ladder row and its comparisons. Disabled when that hand has nothing left to split |
| 2 | Control toggle `.tap` (`aria-pressed`) | "Give it the sorted hand" / "Back to the shuffled hand" | switches the hand on screen. Each hand keeps its own ladder and count. Never resets |
| 3 | Control `.tap` | "Finish both hands" | splits every waiting group of both hands. The hand on screen is drawn row by row (≤ 80 ms per row, ≤ 400 ms; instant under reduced motion), and the other hand's count fills in the tally. Disabled when both are finished |

Control 3 is not a jump: it adds the same rows that "Split next group" would, in the same order, and the counter ticks once per row (sorted: 5, 9, 12, 14, 15). The other hand's ladder is one toggle away. The brief asks for the sorted hand "step by step": a learner can press control 1 five times; QA's one-press path uses control 3, which still draws every step.

QA path: Split (shuffled: pivot 3 cuts `[1 2] | [4 6 5]`, 5 comparisons) · Give it the sorted hand (sorted hand on screen, 0 so far; the tally keeps "Shuffled: 5 so far") · Finish both (sorted ladder grows to five rows, each with "0 cards" on the left, count 15; the tally shows "Shuffled: 9"). Both milestones are reached, and the stage ends on the "after" hand.

## States
- **Predict:** the shuffled hand on screen as the top ladder row, the sorted hand named on the toggle, tally "Shuffled: ? · Sorted: ?", readout "Comparisons: ?". Controls disabled.
- **Shuffled, first split:** 3 lands in the middle with 2 cards left and 3 right. Later splits are tiny.
- **Sorted:** every row the pivot is the smallest card. The left slot is empty ("0 cards") and the right side holds everything else, so the ladder is a **staircase**: groups of 6, 5, 4, 3, 2, cost squares 5, 4, 3, 2, 1.
- **Reveal:** the stage shows the sorted ladder (the toggle view switches to it if the learner left the shuffled hand on screen; nothing is cleared, and the toggle label agrees). The tally shows both counts. Reveal text (≤ 90 words), quoting the learner's counts: "Your sorted hand took 15 comparisons; the shuffled one took 9. Every sorted split left 0 cards on one side, so each split peeled off only its pivot: 5 + 4 + 3 + 2 + 1. No split can be more lopsided than that, so no order of 6 cards costs more (checked over all 720). For n cards that is n(n − 1)/2. Picking the pivot at random makes this run vanishingly unlikely."
If the learner finished only one hand, the reveal is not yet unlocked (both milestones are needed), so it never quotes a count the learner did not reach.

Milestones (`minInteractions=2`): `sorted-done` (sorted hand fully split; count 15), `shuffled-done` (shuffled hand fully split; count 9).

## Shown, not told
The learner sees the staircase: the pivot always the smallest, the empty "0 cards" slot on every row, and cost squares that shrink by one each row, beside a shuffled ladder that was done in four short rows. "The most work possible" is visible as "no row could have been more lopsided". The only told part is the 720-order check, which is a claim (brief claim 1).

## Colour and access
Cards `--bg-2` with `--line` outline; the pivot card outlined `--fg` 2 px plus a small "pivot" caret (shape, not colour). Cost squares `--domain` fill with `--fg` outline. Empty slot dashed `--line`. Ladder rows each get an `aria-label` ("Split 3: pivot 3, 0 smaller, 3 bigger, 3 comparisons"). Controls 44 px high (`.tap`); the toggle shows `aria-pressed`. No illustration (CS).
