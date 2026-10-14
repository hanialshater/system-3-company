# Build note: one-crowded-bucket

builder: algo2-sd · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/one-crowded-bucket.md` (+ svg) and brief #43 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (node, own script, then the Demo.tsx logic itself transpiled and run)
Buckets 1-10 ... 91-100, insertion sort inside each, every `b[j] > v` test counted including the one that stops the slide. Spread hand 95 12 37 64 28 81 3 46 59 70: 1 comparison (70 against 64, bucket 61-70; bucket 71-80 empty, nine buckets used). Clumped hand 47 43 50 41 45 49 42 48 44 46: 30, all in 41-50. Descending 50..41: 45; the clumped hand as written, reversed: 28. Matches the spec, which corrects the brief's check line (the shared bucket is 61-70, not "12 and 3"; 45 is "descending", not "reversed"). Claims c1 and c2 use the spec's wording.

## Built as specced
Before / after toggle on the hand. Rule line, hand row of 10 tiles (hollow and dashed once dropped), ten 32 px open columns, 22 px tiles stacking from the bottom (ten reach the rim), lower bounds under each column, per-bucket count under any bucket that sorted, caption "each bucket holds ten values". Readouts: Comparisons, Spread ?, Clumped ?. Four controls in DOM order: Drop into buckets (10 drops at 35 ms), Sort buckets (each comparison flashes the pair with a 2 px `--fg` outline), chips Spread (start, active, disabled) and Clumped. Switching after a sorted hand replays drop + sort for the new hand (12 ms drops, 8 ms comparisons, about 370 ms). Instant under reduced motion. Milestones `spread-sorted`, `clumped-sorted`; minInteractions 2. The reveal reads the counts from the results line.

## Choices and deviations
- All controls are disabled while an animation runs (busy), so a press cannot cut one in half.
- With only one comparison (spread hand) the flash lasts 120 ms so it can be seen; with 30 it is 12 ms each (360 ms).
- The bucket-row `aria-label` follows the spec form, e.g. "Clumped hand: all 10 numbers in bucket 41 to 50, 30 comparisons".
- Title and hook are my wording ("Ten buckets, one of them crowded"; the hook is the wireframe's line).
- `.tap` min size (44 px) is set in the lesson's own CSS module.

## Problems found in the brief or spec
The brief's check line is wrong in two places (see above). The spec already routes this to cm-cs-algorithms; the lesson follows the spec.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.

## Revision v2 (wave E r6, 2026-10-14)

r6 (knows counting sort, revise): the Hand toggle was clipped below the phone frame; the clumped sort was instant, so 30 was a number, not work; the tower overflowed; "30" was the only exact option. Fixes:
- The stage is shorter: tiles stack 18 high instead of 22 (viewBox 340 x 282, was 330), so a ten-tile tower fits with its caption. The readouts moved below the controls, so Drop / Sort / Hand sit right under the buckets. DOM order is unchanged: Drop, Sort, Spread, Clumped.
- Switching hand after a sort now drops (6 ms a number) and then sorts one comparison per frame (10 ms, flashing each pair, the Comparisons readout climbing), about 370 ms, inside the QA wait.
- After a sort, each tile shows a small number for the tests it made sliding into place. The caption reads "small number on a tile: tests it made sliding into place". On the clumped tower they add to 30. The reveal points at them. New claim c6.
- Options: "About 1, as before", "About 10", "About 30".
- Not run: build, QA, walkthrough, tsc.

## Pre-flight v2

1. Title and hook: "Ten buckets, one of them crowded" / "Is a sort that never compares across the whole list always fast?" The title says a bucket is crowded but gives no comparison count. "About 10" (a crowded bucket, but cheap) and "About 30" both stay open. This is my judgement; a reviewer may disagree.
2. Options: "About 1, as before", "About 10", "About 30". All "About" plus a number.
3. Locked stage: ten empty buckets labelled 1 ... 91, the spread hand's tiles, the caption "each bucket holds ten values", and readouts at 0 / ? / ?. Nothing shows 30 or a tower.
4. Reveal values: 1 comparison, 64 and 70 sharing: (b) milestone spread-sorted (readout Spread 1; the "1" under bucket 61); 30 and "all ten fell into 41-50": (b) milestone clumped-sorted (readout Clumped 30, the tower, "30" under it); "42 and 44 made 6 tests each": (b) the same milestone, shown as the small numbers on the tower's tiles.
5. QA path: Drop into buckets (spread, 350 ms), Sort buckets (spread-sorted), Spread (disabled), Clumped (drop + sort about 370 ms, clumped-sorted). Both milestones reached, the question's own case included. At the reveal the clumped tower with its per-tile counts and both readouts are on stage.
6. Reset: no Reset control; the Spread / Clumped readouts never clear. Reveal on the QA path: "Spread out, the ten numbers landed in nine buckets. Only 64 and 70 shared one, so sorting took 1 comparison. Clumped, all ten fell into 41-50, and the "tiny" sorts became one insertion sort of ten numbers: 30 comparisons. The small numbers on the tower's tiles add up to that: each newcomer slides past every bigger number already there, and 42 and 44 made 6 tests each. / Bucket sort only splits the work when the values spread evenly over the buckets. When the data clump, it is as slow as the sort inside the one crowded bucket."

## Pre-flight v3 (demo-builder, 2026-10-14, wave G, r7 knows-counting-sort)

Fixes: (top) the stage is more compact (tiles 16 high, viewBox 340 x 260, was 282) so the tower of ten sits closer to the controls, and the tallies the reveal adds up now also print as a stage row, "Seen, clumped: all 10 in 41-50; 1+1+3+3+2+6+3+6+5 = 30 comparisons", so the sum is checkable without the tower. (should fix) "Seen, spread: 9 buckets, 64 & 70 shared one; 1 comparison" keeps the spread layout the reveal quotes after the clumped view replaces it. Both rows appear when their sort finishes and survive switching hands. The phone scroll on reveal is the kit fix in progress; not worked around here.
1. Title and hook: "Ten buckets, one of them crowded" / "Is a sort that never compares across the whole list always fast?" Unchanged; no count.
2. Options: "About 1, as before", "About 10", "About 30". Same precision.
3. Locked stage: ten empty buckets, the spread hand, caption "each bucket holds ten values", readouts 0 / ? / ?; no Seen rows. Nothing shows 30.
4. Reveal values: 9 buckets, "64 and 70", 1 comparison: (b) spread-sorted, computed from PLANS.spread and on the "Seen, spread" row. 41-50, the terms 1+1+3+3+2+6+3+6+5, 30, "42 and 44 made 6": (b) clumped-sorted, on the "Seen, clumped" row and the tower's tile tallies.
5. QA path: Drop into buckets, Sort buckets (spread-sorted, Seen spread row), Spread disabled, Clumped (drop + sort, about 370 ms, clumped-sorted, Seen clumped row). Both rows and the tower are on stage at the reveal.
6. Reset: no Reset; switching hands keeps both readouts and both Seen rows. QA-path reveal: "Spread out, the ten numbers landed in 9 buckets. Only 64 and 70 shared one, so sorting took 1 comparison. Clumped, all ten fell into 41-50, and the "tiny" sorts became one insertion sort of ten numbers. Each newcomer slid past every bigger number already there: 1 + 1 + 3 + 3 + 2 + 6 + 3 + 6 + 5 = 30 comparisons, and 42 and 44 made 6 tests each. Both runs are on the Seen rows. / Bucket sort only splits the work ..."
- meta.json 2 -> 3; c6 text changed (unverified). Not run: build, QA, walkthrough, tsc.

## v4 (demo-builder, 2026-10-14, answering 2026-10-14-learner-knows-counting-sort-r8.md, board W-317)
- Fit (top finding): at 390x844 the open reveal cropped the stage top by 227 px (tool; "44" hidden; 108 words with the verdict). Stage 536 -> 346 px:
  - The hand row left the picture: it is now the stage's first line, "Spread hand: 95 12 37 ..." / "Clumped hand: 47 43 ...", with dropped numbers struck through and faded, then "Drop into buckets of ten, then sort each." (the old rule line, shorter).
  - Picture viewBox 340x260 -> 340x184: tile rows 16 -> 14 px, the per-bucket count row under the buckets is gone, and the picture's bottom line is now the live total, "Comparisons: 30 · small number on a tile: its tests".
  - The three readouts (Comparisons / Spread / Clumped) are gone: the live total is in the picture and both results are on the Seen rows. The four buttons share one row: "Drop", "Sort", "Spread", "Clumped" (hand chips in a group labelled "Hand").
  - Labels at least 10 px: tile numbers, tallies and bucket labels 8-10 -> 12 px in the viewBox (about 10.8 px drawn after the kit's small fit, 157/164).
- Reveal ~103 -> 75 words (tool 108 -> 80 with the verdict). Cut "42 and 44 made 6 tests each" (labels the r8 learner could not read; c6 text narrowed and reopened) and "Both runs are on the Seen rows."; "ten numbers" -> "the hand" / "of ten"; the sum is printed as on the Seen row (1+1+3+...). Kept the mechanism sentence ("Each newcomer slid past every bigger number already there") and both payoff sentences (c4, c5). cm-cs may still choose a different cut.
- The "Seen, spread" row now reads "9 buckets, 64 & 70 shared; 1 comparison" (was "shared one").

## Pre-flight v4
1-2. Unchanged.
3. Locked stage: "Spread hand: 95 12 37 64 28 81 3 46 59 70", the how line, ten empty buckets, "Comparisons: 0 · each bucket holds ten values"; no Seen rows, no readouts. Nothing shows 30.
4. Reveal values: 9 buckets, 64 and 70, 1 comparison (b) spread-sorted, on the "Seen, spread" row; 41-50, 1+1+3+3+2+6+3+6+5 = 30 (b) clumped-sorted, on the "Seen, clumped" row and the picture's total.
5. QA path: Drop, Sort (spread-sorted), Spread disabled, Clumped (drop + sort, clumped-sorted).
6. Reveal on that path: "Spread out, the hand landed in 9 buckets; only 64 and 70 shared one: 1 comparison. Clumped, all ten fell into 41-50, and the "tiny" sorts became one insertion sort of ten. Each newcomer slid past every bigger number already there: 1+1+3+3+2+6+3+6+5 = 30 comparisons. / Bucket sort only splits the work when the values spread evenly over the buckets. When the data clump, it is as slow as the sort inside the one crowded bucket."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 one-crowded-bucket`, dev server, 2026-10-14): before crop 227 px, namedHidden 1, 108 words; after crop 0 px, hiddenBelow 0, namedHidden 0, 80 words (75 without the verdict). Stage 346 px (picture 157 of 164 natural, controls 44, text 102), reveal 247 px, window 618 px (a few px spare; a longer Seen line on another path could tip it). The hand line, the whole tower with its tallies, both Seen rows and the reveal's last line are on screen.
