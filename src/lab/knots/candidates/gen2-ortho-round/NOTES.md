# gen2-ortho-round: packing where the diagram is reduced, ortho elsewhere (mutation of gen1-ortho)

- Parent: `gen1-ortho`. Engineer: rnd-engineer (slot gen2-ortho-round), 2026-10-14.
- **Idea, in two lines.** A reduced diagram (no nugatory crossing) is drawn by gen 0's circle packing, as smooth curves, if the packing's skeleton is planar. Every other diagram keeps gen1-ortho's grid drawing. Flow-based compaction of the grid was built and measured, and then left out: it did nothing (numbers below).
- **The answer to the slot's question.** Ortho's spacing does **not** fully survive. Every table knot is round, and the looks gate passes at 18 % straight and 0.5 % sharp in the worst case. But the packing also takes 7 to 9 of the bench's 20 messy diagrams (the reduced ones), and there it spaces worse than the grid. Against gen1-ortho the layout term drops by 12 to 17 points per seed. The candidate is still +23 to +49 over gen0-baseline in the same runs.

## What changed

Only `draw.mjs` and `index.d.ts` differ from gen1-ortho. There is no new `layout*.mjs` and no `test/` folder.

- **`layout(pd, {tries})`.** If `nugatory(pd)` (from `core.mjs`) is empty, the diagram is reduced, so `pack()` is tried first. If `pack()` returns nothing, the diagram goes to gen1-ortho's `ortho()`, which is unchanged except that it no longer stretches (see `draw`).
- **`pack(M, F, P)`: new, ported from `gen0-baseline/draw.mjs`** (`layout`, `pl`, `planar`). The triangulation has crossing, edge and region vertices. Each piece's largest region goes at infinity, with the boundary radii fixed at 1. Radii come from the Collins–Stephenson iteration, and the centres are laid out by BFS, each new circle tangent to two that are already placed. The code was rewritten smaller, with `[x, y]` points and `pol`/`an` helpers, and it differs from gen 0 as follows:
  - **200 sweeps, not 600.** I measured the largest relative radius change per sweep: below 1e-8 by sweep 200 at 20 crossings (6.9e-9), and 1e-15 for the table knots by sweep 100. 600 only cost time.
  - **Each strand point is placed as in gen 0:** 0.6 of the way to its edge's circle, turned 30 % towards a right-angled cross. The angle wrap is `asin(sin(·))`, not `atan2(sin, cos)`, which is the same for the small angles that occur. I also tried a 4-fold average with an `atan(tan)` wrap. It was 26 B smaller and scored better on the looks numbers (worst straight 14 %), but the trefoil and the figure-eight then had S-shaped wiggles beside the crossings, so I reverted it.
  - **Planarity check on the straight skeleton** (crossing → strand point, and strand point → strand point; gen 0's segment test, with the orientation taken from `atan2`), plus a finiteness check. If either fails, `pack()` returns nothing and the grid drawing is used.
  - **Output** keeps gen1-ortho's label-keyed format: `points[label] = [point near the tail, point near the head]`, plus `round: 1`. A stored layout therefore still survives `crossingChange`, since labels are kept.
  - The Tutte fallback of gen 0 was **not** ported: the grid drawing is the fallback.
- **`draw`:**
  - **Round layouts** are drawn as one Catmull-Rom curve per edge, through crossing → 2 points → crossing. The curve continues across each end crossing (to the opposite strand's point), so a strand passes straight through. This is gen 0's curve rewritten for the label format.
  - **Grid layouts** keep gen1-ortho's straight runs and rounded bends.
  - Both kinds now build a list of cubics. One de Casteljau `cut` makes the under-pass gap for both (gen 0's bisection `cut` and gen1-ortho's endpoint shift were dropped).
  - **The ortho stretch moved from `ortho()` into `draw`:** each axis is scaled on its own to fill the square view box. This is the same generic affine step the brief allows, and now it also applies to the packing. It cannot shrink a distance.
  - Small rewrites to save bytes: `crossings`/`loops` built from `Q.crossings`, and `P = p.map(r).join(' ')`.
- `index.d.ts`: `Layout` documents both kinds (`w?`, `round?`), `layout` documents the branch, and `Drawing.edges` documents the cubic paths and the per-axis fill.

## Prior art and licence

- Collins & Stephenson, "A circle packing algorithm", *Comput. Geom.* 25 (2003): the radius iteration. It is ported from **this repository's gen0-baseline**, which is our own code. No outside code was used.
- Tamassia, "On embedding a graph in the grid with the minimum number of bends", *SIAM J. Comput.* 16 (1987), and Tamassia, Di Battista & Batini, *IEEE SMC* 18 (1988), via gen1-ortho: the shape (bends by min-cost flow), the rectangular refinement, and the compaction. The flow compaction I tried (below) is Tamassia's dual formulation: per axis, each edge length is the flow across that edge between the two faces on either side.
- Catmull & Rom (1974): the spline, as in gen 0.
- Spherogram (GPL): **not read, no code**. No dependency was added.

## Internal objectives (named, with where they are in `draw.mjs`)

1. **Which branch: reduced and planar.** The packing is used when (a) the diagram has no nugatory crossing (`nugatory(pd)` is empty; `layout`, first lines), and (b) the packing's straight skeleton has no two segments crossing away from a shared vertex and every coordinate is finite (end of `pack`). Goal: draw a diagram round only when the round drawing is a true picture of it. A nugatory crossing makes a cut-vertex in the triangulation, and the packing then pinches it (gen 0's kinks). A non-planar skeleton would draw extra crossings. **There is no score, no threshold, no crossing count and no name.** I also checked the packing's radius spread (smallest over largest crossing circle) as a possible extra condition. It does not separate textbook from messy diagrams (7_3: 0.17; bench reduced diagrams: 0.06–0.74), so it was not used.
2. **Outer region of the packing:** each piece's largest region (most sides), as in gen 0 (`pack`, `out`). Goal: the biggest region outside gives the round outer boundary a textbook drawing has.
3. **Packing iteration:** a fixed 200 sweeps (`pack`), with no stopping score (see above).
4. **Outer face of the grid drawing:** try each piece's 3 largest faces and keep the smallest grid `w` (`layout`, inherited unchanged from gen1-ortho). Goal: fewer grid units on the long side means bigger strokes and gaps in the square stage.
5. **Bends:** the min-cost flow, fewest bends for the chosen outer face (`ortho`, inherited).
6. **Compaction cost:** none in the final code. Balanced longest path, inherited.

None of these reproduces the bench's spacing or spread, the 1.5 cap, the weight 5, the 4 % radius, or the looks test's curvature measure or its 30 % / 3 % / 6 % / 2 × size constants. I measured the looks shares and the bench per diagram with **scratch scripts outside the library**, only to report them here. No library code computes them.

## No force relaxation

The candidate uses **no force relaxation of any kind**: no springs, repulsion, gravity, stress or PrEd/ImPrEd zones, and no iterative energy-driven node moves. I did not read `gen1-force` and used no code from it. The iterative parts are:
- the circle packing's radius iteration, which solves for radii from angle sums (gen 0);
- the Bellman–Ford loops of the bend flow and of the longest paths (gen1-ortho).

The tried-and-dropped compaction was a min-cost flow.

## Numbers: `node tools/evolve.mjs eval knots gen2-ortho-round gen1-ortho gen0-baseline --seed=s`

The scratch archive was used, not `company/rnd/evolution/knots.jsonl`. The machine was shared and heavily loaded (load average 35–42 on these runs), so `jonesSpeed` is depressed for everyone.

| seed | load avg | gen2-ortho-round | gen0-baseline | gen1-ortho |
|---|---|---|---|---|
| 1 | 34.9 | **10,527.43** (102/102) | 10,503.84 | 0 (101/102, looks gate) |
| 2 | 41.6 | **10,524.42** | 10,496.14 | 0 |
| 3 | 41.5 | **10,522.48** | 10,473.74 | 0 |
| E = score − 100 × tests | | 327.4 / 324.4 / 322.5 | 303.8 / 296.1 / 273.7 | |

Layout metrics. gen1-ortho is gated out, so the archive has no bench record for it. Its values come from running the same `bench.mjs` on the same seeds (seed 1 rechecked today, identical to its NOTES):

| metric (weight) | gen2-ortho-round | gen1-ortho | gen0-baseline |
|---|---|---|---|
| layoutExtraCrossings (2) | **0 / 0 / 0** | 0 / 0 / 0 | −1 / −1 / −2 |
| layoutPlanarShare (1) | **100 / 100 / 100** | 100 / 100 / 100 | 95 / 95 / 90 |
| layoutSpacing (5) | 11.35 / 10.83 / 11.71 | **13.30 / 12.85 / 13.11** | 8.87 / 7.20 / 6.94 |
| layoutCrossingSpread (1) | 39.03 / 38.55 / 41.73 | **46.29 / 45.06 / 46.29** | 37.64 / 36.14 / 28.60 |
| layoutAspect (0.5) | 99.75 / 99.50 / 99.89 | **100** | 90.54 / 94.59 / 93.41 |
| layoutSlowPenalty (1) | 0 / 0 / 0 | 0 | 0 |
| **weighted layout term** | 245.7 / 242.4 / 250.2 | **262.8 / 259.3 / 261.8** | 220.3 / 212.4 / 196.0 |

**Where the loss is.** On seed 1, 9 of the 20 messy diagrams are reduced: 2 projections without kinks and 7 of the 8 braid closures. All 9 are packed. On those 9, spacing averages about 10, against about 15 when gen1-ortho draws them on the grid. The 11 unreduced diagrams are drawn exactly as gen1-ortho draws them.

**Against the champion** (not run together; from the gen-1 record's re-score on this evaluator): gen1-force scored 10,514–10,538. This candidate is in the same band, so it is **unlikely to clear the stop rule's T = 15** against gen1-force.

**Speed** (per-diagram timing on the bench set, same moment, load 35–50):
- this candidate: 28–47 ms mean per `draw`, against gen1-ortho's 10–22 ms. The packing and its O(segments²) planarity check are the extra cost. Going from 600 to 200 sweeps, and replacing two `includes` scans in the BFS, took it from about 37 to about 13 ms per layout on 13-crossing random knots (measured under varying load, so approximate).
- slow penalty: 0 on all three runs.
- the slowest of the 168 robustness diagrams below took 142 ms (load about 40).

## Sizes (stripped gzip, `node tools/evolve.mjs size knots gen2-ortho-round`)

| entry | gen1-ortho | gen2-ortho-round | delta |
|---|---|---|---|
| draw-a-table-knot | 4,913 | 5,852 | +939 |
| tricolour-check | 9,170 | 10,107 | +937 |
| unknot-game | 6,537 | 7,482 | +945 |
| **random-knot** | 10,825 | **11,758** | **+933 (≤ 11,776: meets the bundle condition with 18 B to spare)** |
| whole library | 10,838 | 11,777 | +939 |

**Every entry grows by about 935 B, and the reason is the packing branch.** The packing, its planarity check and the Catmull-Rom path cost roughly 1.1 KB. Golfing gen1-ortho's own draw code won back part of that: the stretch moved into `draw`, one `cut` serves both kinds, and the crossing and loop output is shorter. Still compared with gen 0, the table-knot lesson is +759 B and random-knot +772 B.

## Looks gate

**Pass.** All 15 prime table knots take the packing branch. Straight share / sharp share per knot: 3_1 18/0, 4_1 8/0, 5_1 2/0, 5_2 7/0, 6_1 3/0, 6_2 9/0, 6_3 7/0, 7_1 0/0, 7_2 2/0, 7_3 3/0, 7_4 4/0, 7_5 10/0, 7_6 9/0, 7_7 12/0, 10_8 10/0.5. **Worst: 18.0 % straight (3_1), 0.51 % sharp (10_8).** The limits are 30 % and 3 %.

**Pictures** (rendered for myself; the lead renders the official set):
- 3_1, 4_1 and 5_2 are round, textbook drawings, as in gen 0.
- The random 12-crossing knot (`randomKnot(20261014, {strands: 3, length: 12})`) is reduced, so it is packed. It has **gen 0's cramped bigon in the middle**, the defect the gen-1 record describes. This candidate does not fix it.
- Unreduced messy diagrams are gen1-ortho's rectilinear pictures, unchanged.

**Robustness.** 168 diagrams: every table entry, `[]`, `[[1]]`, a 2-component unlink, both one-crossing kinks, split links with a free loop, a connected sum, 40 random knots, 30 scrambled table diagrams, 40 random projections of 6–36 steps and 30 disguised braids. 93 of them were packed. All drew with 0 extra intersections, inside the box, and nothing threw. Across 108 reduced diagrams in a separate sweep, the planarity check never rejected a packing.

## What I expected and what happened

1. **Packing branch.**
   - Expected: it fixes the looks gate. It did, with margin.
   - Expected: it costs some bench where messy diagrams happen to be reduced. It cost more than I guessed, because about 40 % of the bench's messy diagrams are reduced: braid closures nearly always are.
   - The brief's rule ("reduced and planar") gives no generic, honest way to tell a textbook diagram from a reduced messy one.
2. **Flow-based compaction: a dead end here, measured.**
   - I implemented Tamassia's dual min-cost flow (per axis, edge length = flow between the faces on either side, lower bound 1, or 2 between crossings) with a shared successive-shortest-path solver that also replaced gen1-ortho's bend solver.
   - Two versions: (a) unit cost on every edge, and (b) cost 1 on strand edges and 0 on refinement and frame edges, which is the textbook objective.
   - On 60 unreduced random projections: strand length per crossing was 9.91 (balanced longest path) against 9.94 (a) and 9.93 (b). The share of strand length in runs longer than 4 units was 38.3 % against 38.9 %. Grid extent was identical, at 14.1. Bench layout metrics were identical to two decimals on seed 1, and the pictures could not be told apart.
   - Cost: +187 B on random-knot for (a), more for (b), and slightly slower. That would have broken the bundle condition, so it was removed.
   - Why: after rectangular refinement, with min length 1 on every dummy edge and 2 between crossings, the grid is already rigid. Balanced longest path is at the LP optimum up to ties.
   - **Ortho's long parallel runs and thin U-turns come from the shape step (where the bends go and which face is outer), not from the metrics step.**
3. **Draw-side stretch:** +3 to +5 aspect points on the packed diagrams, and the table knots still pass.

## What I would try next

1. **A shape-step fix for ortho's runs and U-turns**, since compaction cannot reach them. For example, a bend cost that penalises two bends of opposite turn on one edge (a U-turn), or an outer face chosen by fewest such U-turns. This stays within "grid and flow computations".
2. **A packing outer face chosen by a picture goal**, not "largest region". A packing has a natural goal of its own: the smallest crossing circle as large as possible, so no crossing is drawn tiny. That could fix the cramped bigon in the random 12. It is an internal objective, and it would have to be named and argued as such, not tuned.
3. **A ruling for the lead, not something I did:** restricting the round branch to **reduced alternating** diagrams (Tait: the minimal textbook pictures) would keep every table knot round. On seeds 1–3 it gave exactly gen1-ortho's layout metrics (262.8 / 259.3 / 261.8), because no bench diagram is reduced and alternating. It would draw the random 12 rectilinear. I did **not** ship it, because "alternating" sits close to "detect the table" (all 15 prime table knots are alternating). I leave that call to the lead.
4. Speed for large diagrams: the planarity check is O(segments²). A bounding-box pre-filter would make it near-linear.
