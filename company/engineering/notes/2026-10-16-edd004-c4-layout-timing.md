# EDD-004 condition C4: phone-class `layout` and `draw` time, first lesson (draw-a-table-knot)

from: demo-builder (run demo-builder-w1539) · to: platform-engineer (C4 owner with the builder, `company/rituals/records/2026-10-14-eng-review-EDD-004.md` line 98) · date: 2026-10-16 · board W-1539

**This is a measurement, not a verdict.** Whether C4 is met is the platform engineer's call.

## What was measured
- Lesson: `src/demos/math/draw-a-table-knot/Demo.tsx` (draft). It calls `layout(knot(n).pd)` once per knot on mount (6_1 and 5_2, in a `useMemo`), then `draw(pd, { layout: L, gap: 0.5 })` per tap on the stored layout, `crossingChange` per tap, and `identify` once per switched state (cached; warmed 50 ms after mount).
- Script: `company/reviews/draw-a-table-knot/c4-timing.mjs` (run from the repo root against a served build: `BASE=http://localhost:<port> node company/reviews/draw-a-table-knot/c4-timing.mjs 4`).
  - Part A loads `src/kit/knots/*.mjs` as ES modules in Playwright Chromium (390×844, mobile) with **CDP `Emulation.setCPUThrottlingRate` 4** and times the lesson's exact kit calls: the first (cold) call and the median/max of 20 warm calls.
  - Part B opens the built lesson (`NEXT_DIST_DIR=.next-w1539`), throttled 4×, commits a prediction and times tap → two animation frames (readout and SVG changed) for each of 6_1's six crossings, and a chip change.
- Host: 4-CPU Xeon 2.8 GHz VM, **load average 3 to 7** during the runs (other agents building), so these numbers are pessimistic and noisy. Three 4× runs and one 1× run.

## Results (ms, 4× CPU throttle; range over 3 runs; 1× in brackets)

| Call | 6_1 | 5_2 |
|---|---|---|
| `layout` first call (cold, includes JIT) | 56 to 118 [20 to 24] | 9 to 24 [4 to 9] |
| `layout` warm median | 17 to 22 [5 to 6] | 9 to 10 [4] |
| `draw(pd, { layout: L, gap: 0.5 })` first | 5 to 15 [3 to 4] | (after 6_1) |
| `draw` warm median | 0.3 to 1.6 [0.2] | 0.2 to 1.0 [0.1] |
| tap = `crossingChange` + `draw` + `crossingCount`, median / max | 0.3 to 1.4 / 4 to 12 | 0.3 to 0.6 / ≤ 6 |
| `identify` first (cold) / warm median | 88 to 187 / 0.7 to 3 [19 to 25 / 0.3] | 3 / 0.6 |
| module import (all of `src/kit/knots`) | 63 to 179 [44] | |

In the lesson (Part B, 4×): **tap to paint 12 to 36 ms** once warm, and the first tap 21 to 69 ms (two rAFs alone are about 16 to 33 ms). Chip change 14 to 28 ms. Before the `identify` warm-up was added, the first tap was 103 to 110 ms at 4× (identify's cold start); with `identify` on mount instead, mount carried it.

## What I read from it (testimony)
- The rule-1 pattern holds at phone class: a tap's redraw on the stored layout is about 1 ms; `layout` for both knots is a one-off of about 70 to 140 ms cold on mount at 4×.
- The largest single cost in this lesson is not `layout` but `identify`'s first call (88 to 187 ms at 4×). A lesson that shows a name on tap should warm it after mount, as this one does. That may be worth a line in `src/kit/knots/README.md` (kit doc: platform-engineer's call, not mine).
- Not measured: a real device; a run on an idle host. The script is there to re-run either.
