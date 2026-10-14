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
