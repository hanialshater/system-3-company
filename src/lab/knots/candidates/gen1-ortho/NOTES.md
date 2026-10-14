# gen1-ortho (slot C): orthogonal grid layout, smoothed for drawing

- Parent: gen0-baseline. Engineer: rnd-engineer (slot C), 2026-10-14.
- **Idea, in two lines.** A knot diagram is a 4-regular plane graph, so every crossing can be a grid point with its four strands leaving E, N, W, S. Bends come from Tamassia's min-cost flow between faces. Faces are cut into rectangles, compacted by longest paths, and each bend is drawn as a rounded corner.

## What changed

Only `draw.mjs` and `index.d.ts` changed. No `layout*.mjs` file was added, and no frozen file differs from gen0.

- `layout(pd, {tries = 3})` now calls `ortho(M, F, P, outerFaces)` with each piece's k-th largest face as the outer face (k < `tries`). It keeps the result with the smallest grid. **Circle packing and the Tutte fallback are gone**: one method draws everything, including the table knots.
- `ortho`, the topology–shape–metrics pipeline:
  1. **Shape (Tamassia 1987).** Every crossing angle is 90°, so the only unknowns are bends. `b[d]` is the net count of right bends along dart d's edge. Face f needs Σ b = 4 − |f| (inner) or −4 − |f| (outer). The demands are met by successive shortest paths on the dual graph: Bellman–Ford, with residual cost −1 where a unit cancels an opposite bend. That is a min-cost flow, so the bend count is minimal for the chosen outer face. The solver is about 10 lines.
  2. **Directions.** Slot s of crossing c points `base[c] + s`, propagated by BFS through `dir(o[d]) = dir(d) − b[d] + 2`.
  3. **Rectangular refinement** (Tamassia's method). Each bend becomes a degree-2 vertex in a graph whose neighbours are indexed by direction. A frame around each piece, bridged from a convex corner, makes every face bounded. Then every *reflex, convex, convex* turn pattern in a face gets an edge that cuts off a rectangle. Each face is finished in one pass.
  4. **Metrics.** Longest paths along each axis, from both sides, averaged (balanced). An edge joining two crossings directly is 2 units long, and every other edge is 1. The short axis is then stretched so the drawing fills a square.
- `draw` renders each edge as straight runs with quadratic-rounded bends. The radius is at most half a grid unit and half of either leg. Under-passes are cut on the straight first and last run, so `cut`/`split` were dropped.
- **Layout format.** `points` is now keyed by **PD edge label**: `points[label]` is the bend list, tail to head. `crossingChange` keeps labels, so a stored layout keeps the whole picture, not only the crossings (gen 0 kept its points by dart index, and those rotate at a changed crossing). A `w` field (grid size) was also added. This is plain data, and the test shape is kept.

## Prior art and licence

- R. Tamassia, "On embedding a graph in the grid with the minimum number of bends", *SIAM J. Comput.* 16 (1987): the network flow and the rectangular refinement. Written from the paper's description; it is a public algorithm.
- Tamassia, Di Battista & Batini, *IEEE SMC* 18 (1988): the topology–shape–metrics pipeline. Di Battista, Eades, Tamassia & Tollis, *Graph Drawing* (1999), ch. 5: the refinement and compaction as textbook steps.
- Spherogram's orthogonal link diagrams (GPL) and Knottingham (MIT): **not read, and no code from either**. The brief allowed their documentation, but I did not need it.
- No dependency was added. All code is original to this candidate.

## Numbers (own runs, scratch copy of the library plus the evaluator's `test/` and `bench.mjs`)

Tests: 101/101. Lesson sizes (stripped gz):

| entry | gen0 | ortho |
|---|---|---|
| draw-a-table-knot | 5,093 | 4,913 |
| tricolour-check | 9,353 | 9,170 |
| unknot-game | 6,713 | 6,537 |
| random-knot | 10,986 | 10,825 |
| whole library | 11,001 | 10,838 |

Every entry is about **−170 B**, because dropping circle packing and Tutte paid for the new code.

Layout metrics (seeds 1 / 2 / 3):

| metric (weight) | gen0 | ortho |
|---|---|---|
| layoutExtraCrossings (2) | −1 / −1 / −2 | **0 / 0 / 0** |
| layoutPlanarShare (1) | 95 / 95 / 90 | **100 / 100 / 100** |
| layoutSpacing (5) | 8.87 / 7.20 / 6.94 | **13.30 / 12.85 / 13.11** |
| layoutCrossingSpread (1) | 37.64 / 36.14 / 28.60 | **46.29 / 45.06 / 46.29** |
| layoutAspect (0.5) | 90.54 / 94.59 / 93.41 | **100 / 100 / 100** |
| layoutSlowPenalty (1) | 0 | 0 |
| **weighted layout term** | 220.3 / 212.4 / 196.0 | **262.8 / 259.3 / 261.8** |

On seeds 4–8 (layout only), there were 0 extra crossings on every seed, spacing was 12.1–13.6 and spread 44–47. The other metrics only move with noise (hard unknots 73.3 / 70 / 63.3 %, Gordian 20.6 / 23.4 / 18.4 %, Jones correct), as expected, since `moves`, `invariants` and `core` are untouched.

**Score, computed by hand** from the harness formula: 100 × tests − 0.002 × mean lesson bytes (7,861) + weighted bench.

- ortho: **10,447.9 / 10,444.0 / 10,437.9** on seeds 1, 2, 3.
- gen0, same formula, seed 1: 10,406.4.

`node tools/evolve.mjs eval` itself could not be run from this worktree, because the session's command guard refuses any command line containing "eval". So the lead's run is the first official score.

Robustness: 227 diagrams (every table entry; `[]`, `[[1]]`, a 2-component unlink and the one-crossing kinks; 40 random knots, 40 scrambled trefoils and unknots, 40 random 3-D projections of up to 46 steps, 40 disguised braids of 2–6 strands, and a connected sum) all draw with 0 extra intersections and stay inside the view box. Determinism comes from the PD alone: there is no randomness.

Speed: 7–20 ms per `draw` at bench sizes (8–20 crossings), against a 100 ms penalty threshold. It is about 160 ms at 38 crossings and 700 ms at 128 (gen0: 89 and 315 ms). The refinement's array allocations and the O(V²) longest-path relaxation dominate.

## Expected versus what happened

- **Expected:** uniform spacing by construction, so a large `layoutSpacing` gain, a smaller spread gain, and a planar drawing every time. **That happened.** Planarity is a theorem here, not a hope: every face is a rectangle.
- **Surprise 1:** plain unit compaction gave spread 34, *below* gen 0. Two adjacent crossings 1 unit apart set the minimum. Making only crossing-to-crossing edges 2 units raised spread to about 43 and spacing to about 12.5, while making crossing-to-bend edges longer too made both worse. 1.5 and 2 scored the same on seeds 1–3, and I kept 2 as the round number, so it is not tuned to a seed.
- **Surprise 2:** balanced compaction leaves the drawing 84–92 % square. Stretching the short axis to fill the square view box raises aspect to 100 and cannot shrink any distance. *The lead should judge whether this counts as a layout choice or as metric-fitting.* I think it is a layout choice: the view box is square, and an orthogonal drawing stays orthogonal and planar under axis scaling. Without it, aspect is about 84–92 and the layout term about 5–8 lower.
- **Surprise 3:** a degenerate zero-length straight cubic (two rounded bends that meet) produced a floating-point "self-intersection" in the bench's sampler, so `draw` now skips zero-length runs.
- Trying the 3 largest faces as outer face gains about 2.5 spread and 0.3 spacing. Trying all faces gains no more and costs about 120 ms.

## Trade-off

The picture of the table knots is now rectilinear: rounded rectangles, not the round circle-packing trefoil of gen 0. It is clean and correct (no extra crossings, right handedness), but it does not look like a textbook trefoil. Long parallel runs and thin U-turns also appear on random diagrams. Keeping circle packing for the diagrams where it is planar would cost about 1 KB and lose the uniform look on about 30 % of the messy inputs.

## What I would try next

1. **Crossover with slot B.** Use this planar ortho drawing as the start of a crossing-preserving relaxation (PrEd), to round it into a knot-like curve without losing planarity.
2. **Better compaction.** Drop refinement edges that only the bridge or frame needs, or use flow-based compaction (the dual of the longest path), to shorten long runs.
3. A circle-packing branch for reduced alternating diagrams *if* the lessons want the textbook look. That is a product question for the lead and cm-math, at about 1 KB.
4. Speed for 50+ crossings: a topological-order longest path instead of repeated relaxation, and an incremental face walk.
