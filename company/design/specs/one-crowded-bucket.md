# Spec: one-crowded-bucket

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #43 · wireframe: `one-crowded-bucket.svg`

**Format: Before / after toggle.** One row of ten buckets, one change: the hand. "Before" is the spread hand; "after" is the clumped hand, and it persists into the reveal. The buckets are the picture. Ten tiles piling into one column while nine stay empty shows the problem before any counter does.

## Brief check (re-run in node, 2026-10-14)
Buckets 1–10, 11–20, …, 91–100. Insertion sort inside each bucket. A comparison is the moving number checked against one number already in the bucket.
- Spread hand 95 12 37 64 28 81 3 46 59 70: **1 comparison**. Clumped hand 47 43 50 41 45 49 42 48 44 46: **30 comparisons**, all in bucket 41–50. **The answer (C, 30) is right.**
- **Two errors in the brief's check line (route to cm-cs-algorithms before build):**
  1. "12 and 3 share bucket 1" is wrong. 3 is in 1–10 and 12 is in 11–20. The one shared bucket is **61–70 (64 and 70)**, and that is where the single comparison happens. The stage shows 64 and 70 together, so a wrong sentence here would be contradicted by the picture.
  2. "the same clumped values reversed: 45". The hand as written, reversed (46 44 48 …), gives **28**. **45** is the values in descending order (50 49 … 41). Claim (1) must say "in descending order". This spec does not use either number on the stage.

## Stage at 390×844 (~380 px at predict, ~480 px in explore)
1. Rule line (muted, 15 words): "Drop each number in its bucket of ten, then insertion-sort inside each bucket. Count comparisons."
2. **Hand row**: 10 number tiles, 30 × 30 px, in arrival order. A tile goes hollow (dashed) when it has been dropped.
3. **Ten buckets**, each a column 32 px wide with a 2 px gap (338 px), open at the top, 230 px tall. Tiles stack from the bottom, 22 px each, so a full bucket of ten reaches the rim. Under each column, its lower bound in small type: 1, 11, 21 … 91. One caption under the row: "each bucket holds ten values".
4. Under each bucket that sorted anything, its own comparison count ("1", "30"). Total readout on the right: "Comparisons: 0".
5. **Results line**, two readouts: "Spread: ?" · "Clumped: ?". Each fills when that hand's buckets are sorted.
6. Controls, below.

Stage words at the busiest moment: rule line 15 + caption 5 + readout labels 3 = 23.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Drop into buckets" | drops the ten tiles in arrival order, one about every 35 ms (≤ 400 ms; instant under reduced motion), each falling into its column. Disabled once dropped |
| 2 | Control | "Sort buckets" | enabled once dropped. Insertion-sorts every bucket, left to right. Each comparison flashes the two tiles being compared (outline), about 10 ms each, so 30 comparisons fit in 400 ms. The counters climb. Disabled once sorted |
| 3–4 | Control chips | "Spread" · "Clumped" (group "Hand") | start: **Spread** active and disabled. Switching loads the other hand into the hand row and empties the buckets. **If the old hand had been sorted**, the new hand is dropped and sorted at once, replayed as #1 then #2 (≤ 400 ms in all), the pattern approved in `a-star-heads-for-goal` |

All 4 controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset: the chips are the restart, and the results line keeps both numbers.

QA path (each control once, DOM order): Drop into buckets (nine buckets used, 64 and 70 together) · Sort buckets (1 comparison, in 61–70: milestone `spread-sorted`) · Spread (disabled, active: skipped) · Clumped (re-dropped and sorted: one full column, 30: milestone `clumped-sorted`). The QA path ends on the "after".

## States
- **Predict:** the spread hand in the hand row, buckets empty, "Comparisons: 0", results "?". The clumped hand is not on the stage yet (the question lists it). Nothing hints at 30.
- **On unlock:** nothing moves until a press. Exploration hint: "Drop and sort the spread hand, then switch to the clumped one."
- **Spread, dropped:** one tile in each of nine buckets, two (64, 70) in 61–70, bucket 71–80 empty.
- **Spread, sorted:** 64 and 70 flash once. "1" under 61–70. Results: "Spread: 1".
- **Clumped, dropped:** all ten tiles in 41–50, filling the column to the rim; nine empty buckets.
- **Clumped, sorted:** the flashes run up and down the one column; "30" under 41–50. Results: "Clumped: 30".
- **Reveal:** the stage stays on the clumped hand, sorted. The reveal: "Spread out, the ten numbers landed in nine buckets. Only 64 and 70 shared one, so sorting took 1 comparison. Clumped, all ten fell into 41–50, and the 'tiny' sorts became one insertion sort of ten numbers: 30 comparisons. Bucket sort only splits the work when the values spread evenly over the buckets. When the data clump, it is as slow as the sort inside the one crowded bucket."

Milestones (`minInteractions=2`): `spread-sorted`, `clumped-sorted`.

## Shown, not told
The column filling to the rim while nine buckets sit empty is the misconception failing in front of the learner, before the counter says 30. The counter then shows the cost.

## Colour and access
Tiles `--bg-2` with `--fg` numbers; the compared pair gets a 2 px `--fg` outline (shape, not hue). Empty buckets are drawn in `--line`. Bucket row `aria-label`: "Clumped hand: all 10 numbers in bucket 41 to 50, 30 comparisons".

## Notes for others
- **Builder:** the comparison count must match the node check exactly. Count each `b[j] > v` test, including the last one that stops the slide.
- **Brief owner (cm-cs-algorithms):** "tap drop to place each number" is one "Drop into buckets" press that animates each drop, because QA presses each control once. Please fix the two check-line errors above in the brief and in claim (1).
- No illustration (CS).
