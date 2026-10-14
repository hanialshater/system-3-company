# gen2-ortho-force: orthogonal grid start, rounded by a crossing-preserving relaxation

slot `gen2-ortho-force` (crossover), generation 2 · rnd-engineer · 2026-10-14 · parents `gen1-ortho`, `gen1-force` · brief: `company/rnd/evolution/knots-gen2-brief.md`

## 1. The idea, in two lines
Draw every diagram first as gen1-ortho's planar grid drawing, cut each grid run into pieces of at most 4 grid units, and relax the result with gen1-force's PrEd relaxation, so the strands become round while staying planar.
There is **no packing branch**. The relaxed grid passes the looks gate on its own (worst table knot: 15 % straight, 1.0 % sharp), and that kept the bundle inside the 11,776 B condition.

## 2. What changed (only `draw.mjs` and `index.d.ts`; every other file is byte-identical to both parents)

The work started from a copy of `gen1-ortho` (as the brief says).

- **`layout(pd, { relax = 60 })`.**
  - Each piece's outer face is its **largest face**. This replaces ortho's `tries` loop, which kept the smallest of 3 grids.
  - It calls `ortho(...)` once, then `round(...)`.
- **`ortho` (from gen1-ortho, almost unchanged).**
  - Unchanged: the min-cost-flow shape, the directions, the rectangular refinement and the longest-path compaction.
  - Removed: the `w` field, the y-centring and the stretch, because the relaxation start does not need them. Pieces are still placed side by side.
  - It returns `{crossings, points}` in grid units.
- **`round` (new; the crossover point).**
  1. It cuts each straight grid run into `ceil(length / 4)` equal pieces. An edge between two crossings with no bends gets at least 2 pieces, so every edge has at least one inner point.
  2. It centres the drawing and scales it to radius 1.
  3. It builds the springs `E` (consecutive points along each edge).
  4. It builds the PrEd pairs `W` (vertex, segment) for each face. **The outer faces of all pieces count as one face**, so split links stay apart without per-piece relaxation. gen1-force relaxed each piece separately.
  5. It calls `relax`, then applies the **stretch** (below).
  - `points[label]` holds the relaxed inner points of each edge, keyed by PD label as in ortho. So a stored layout still survives `crossingChange`.
  - Free loops go to the right of the drawing.
- **`relax` (from gen1-force's `relax`).** It uses force's forces and constants unchanged:
  - all-pairs repulsion 0.12 k²/d, doubled between crossings;
  - springs d²/2k;
  - PrEd vertex–segment repulsion (g−d)²/d below g = k/2, ×4 for crossings;
  - pull −½·position;
  - step cap k/4, cooling linearly over 60 steps;
  - move clip 0.45 × the smallest distance in any `W` pair of the vertex.

  What changed:
  - it works on any vertex list, not 5 per crossing, so crossings are "index < n";
  - **the square-crossing pull is dropped**, because it gave no measurable gain (below) and cost about 200 B;
  - Float64Array force buffers, and `Math.sqrt` in place of `Math.hypot` in the inner loops, for speed.
- **Dropped from gen1-force:** circle packing, the Tutte fallback, `planar`, `clr`, `hand` and the de Casteljau `cut`/`split`. Without `hand` there is no "undo if a crossing's turn flipped" net. PrEd keeps the faces and so the cyclic order at each crossing, and the handedness check on 198 diagrams found nothing (below).
- **The stretch (ortho's, moved to the end).** After relaxation the short side of the bounding box is scaled up to the long side. This is the generic affine step the brief allows for every candidate.
- **`draw`.** Catmull-Rom cubics through: the first point of the opposite strand, the crossing, the edge's points, the next crossing, and the first point after it. This generalises force's 3-segment curve to any number of points.
  - At an under-pass, the curve's end moves back by the gap along its chord, **and its control point moves with it**. So the end keeps the strand's tangent through the crossing (the direction the handedness test reads). This replaces force's bisection `cut` and ortho's rounded-corner drawing.
  - The gap is unchanged: `gap` × the shortest crossing-to-first-point distance, capped at size/8.

## 3. Prior art and licences (ideas only; no code copied from outside the company)
- **Tamassia 1987** (SIAM J. Comput. 16), and **Tamassia, Di Battista & Batini 1988** (IEEE SMC 18): topology–shape–metrics, the min-cost-flow bends and the rectangular refinement. This code comes from gen1-ortho.
- **Bertault 2000** (IPL 74), "PrEd": the movement limit, so that no node crosses an edge, and the node–edge repulsion. This uses gen1-force's isotropic simplification (0.45 × the distance), not 8 sectors.
- **Fruchterman & Reingold 1991** (SP&E 21): springs, repulsion and cooling.
- **Catmull–Rom splines** (Catmull & Rom 1974), as in gen 0 and gen1-force.
- No GPL code (spherogram) and no KnotPlot. All code is the parents' or new. No dependency was added.

## 4. Internal objectives (what the code optimises or branches on)
None of these computes the bench's spacing or spread, the 1.5 cap, the weight 5, the 4 % radius, or the looks test's curvature measure or its constants.

| # | Objective, as a design goal | Where |
|---|---|---|
| 1 | **Outer face = each piece's largest face (most sides).** The picture is a disc whose rim carries the most strands, which is how textbook pictures are drawn. It also gives the relaxation the most room on the outside. It is a choice rule (compare face sizes, take the largest; the first one on a tie), not a score. It replaces gen1-ortho's "smallest of 3 grids" rule, which is gone. | `draw.mjs`, `layout` |
| 2 | **Fewest bends** in the grid start (Tamassia's min-cost flow), inherited from gen1-ortho. Fewer bends means fewer corners for the relaxation to round off. | `ortho`, "Shape" |
| 3 | **Shortest grid along each axis** (longest-path compaction, balanced), inherited from gen1-ortho. A compact start means the points are evenly spread before the relaxation. | `ortho`, "Metrics" |
| 4 | **Relaxation energy** (FR springs, repulsion, PrEd and centre pull), from gen1-force. It gives even spacing, strands kept off crossings, and a round outline. Each step moves along the force. No energy value is computed or compared. | `relax` |
| 5 | **Stopping rule: none.** The schedule is fixed: 60 steps, with the step cap cooling linearly. Nothing is measured to decide when to stop. | `relax` |
| 6 | **Keep or drop a packing: none.** There is no packing branch, and so no clearance rule. gen1-force's "keep the packing unless relaxing raises clearance by more than 60 %" is **not** carried over. | |
| 7 | **The stretch: none.** It is unconditional and has no branch. | `round` |

**How the constants were chosen** (offline, not in the code). I tuned the run length of 4 grid units and the drop of the square-crossing pull with my scratch copy of the bench's layout section, my own picture renders, and a wiggle proxy (total turning and inflections per edge on random knots and cords).

| run length (grid units) | layout term, mean of seeds 1–3 (square pull on, 3 tries) |
|---|---|
| 1 | 256 |
| 1.5 | 263 |
| 2 | 269 |
| 3 | 272 |
| 4 | 271 |
| bends only | 266, with an extra crossing |

- **Without the square pull:** 3 units gave 272 and 4 units gave 271.
- **Final setup** (seeds 1–8, 1 outer face, no stretch): 3 units 273.9, 4 units 274.3.
- **Why 4 over 3:** less wiggle (1.61 against 1.82 inflections per edge), and rounder 4_1 and Borromean pictures.
- **Force's force constants are all kept.** On held-out seeds 4–8, ×1.5 to ×2 changes did not beat them: crossing repulsion ×2, crossing PrEd factor ×2, PrEd radius ×1.5, repulsion ×1.5. Only 80 steps instead of 60 gained a little (+1.3), and I kept 60 for speed.

## 5. Bench numbers, seeds 1–3, against gen1-ortho and gen1-force in the same runs

**How these were run.** `node tools/evolve.mjs eval` could not be run from this session: the worktree guard refuses any command line containing the word "eval", which gen1-ortho's engineer also hit. I did not work around the guard. Instead I reproduced the harness by hand:
- each candidate was staged with the fixed `test/` and `bench.mjs`;
- `bench.mjs` was run with `EVOLVE_SEED` = 1, 2, 3, with all three candidates back to back on each seed;
- the score is 100 × tests − 0.002 × mean lesson bytes + Σ benchWeights × metric;
- tests: this candidate 102/102 and gen1-force 102/102. gen1-ortho is 101/102: it fails the looks gate, so its official score is 0, and its row shows the formula only.

The machine load average was 21–27 on 4 cores during these runs. **The lead's official run is the first real score.**

| seed | candidate | extra | planar % | spacing | spread | aspect | slow | layout term (weighted) | bench term | score |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **gen2-ortho-force** | 0 | 100 | 14.39 | 61.13 | 99.70 | 0 | **282.9** | 386.96 | **10,569.78** |
| 1 | gen1-force | −1 | 95 | 14.46 | 59.75 | 94.77 | 0 | 272.4 | 374.72 | 10,556.43 |
| 1 | gen1-ortho | 0 | 100 | 13.30 | 46.29 | 100 | 0 | 262.8 | 364.23 | (10,448.50; gated 0) |
| 2 | **gen2-ortho-force** | 0 | 100 | 13.42 | 59.68 | 99.38 | 0 | **276.5** | 379.18 | **10,562.01** |
| 2 | gen1-force | 0 | 100 | 12.08 | 55.52 | 96.79 | 0 | 264.3 | 366.47 | 10,548.18 |
| 2 | gen1-ortho | 0 | 100 | 12.85 | 45.06 | 100 | 0 | 259.3 | 362.15 | (10,446.43; gated 0) |
| 3 | **gen2-ortho-force** | 0 | 100 | 13.34 | 62.51 | 99.33 | 0 | **278.9** | 372.70 | **10,555.52** |
| 3 | gen1-force | 0 | 100 | 12.22 | 55.81 | 94.16 | 0 | 264.0 | 355.37 | 10,537.07 |
| 3 | gen1-ortho | 0 | 100 | 13.11 | 46.29 | 100 | 0 | 261.8 | 356.26 | (10,440.53; gated 0) |

- **Against the champion gen1-force:** g = +13.35, +13.83, +18.45 (median **+13.8**; g > 0 on every seed).
  - The layout term accounts for +10.5, +12.2 and +14.9. Size accounts for +1.1. The rest is `jonesSpeed` timing noise.
  - **On these seeds the median is just under the stop rule's T = 15. On the layout term alone it is +12.2.** Whether it passes on the official seeds is the lead's call.
- **Held-out seeds 4–8** (layout section only): layout term 270.7–279.2, mean 276.3. gen1-force on the same seeds: 247.9–271.0, mean 262.8.
- **Planar on every run:** 0 extra crossings on seeds 1–8.
- **Speed (CPU ms per `draw`).** Measured on the 60 bench-like messy diagrams of seeds 1–3, at load 20–40, each candidate in the same window:

  | | cold first pass | warm minimum |
  |---|---|---|
  | **gen2-ortho-force** | 7.3 | 3.4 |
  | gen1-force | 11.4 | 7.6 |

  The bench's draws are effectively cold. **This candidate is about a third faster than the champion,** so it is less exposed to `layoutSlowPenalty` under load.
  - What it costs: the relaxation is about half; the grid drawing and setup are the rest.
  - Large diagrams (single wall-clock draws at load ≈ 20, so noisy; none of these is on the bench):

    | | this candidate | gen1-force | gen1-ortho |
    |---|---|---|---|
    | 98-crossing cord | 348 ms | 479 ms | 162 ms |
    | 128-crossing cord | 326 ms | 310 ms | 553 ms |
    | the lesson's `randomKnot(3)` (10 crossings) | 27 ms | 172 ms | 9 ms |

## 6. Sizes (stripped gzip, `node tools/evolve.mjs size knots gen2-ortho-force`)

| entry | gen1-ortho | **gen2-ortho-force** | Δ vs ortho | gen1-force | Δ vs force |
|---|---|---|---|---|---|
| draw-a-table-knot | 4,913 | **5,639** | +726 | 6,203 | −564 |
| tricolour-check | 9,170 | **9,899** | +729 | 10,461 | −562 |
| unknot-game | 6,537 | **7,275** | +738 | 7,828 | −553 |
| **random-knot** | 10,825 | **11,535** | **+710** | 12,095 | −560 |
| whole library | 10,838 | **11,550** | +712 | 12,111 | −561 |

- **The bundle condition is met.** The random-knot lesson is 11,535 B, **241 B under the 11,776 B condition** and 753 B under the gate.
- **Why every entry grows about 720 B over gen1-ortho:** `round`, `relax` and the Catmull-Rom path builder are new.
- **What paid for part of it:**
  - dropping ortho's `tries` loop, its y-centring and its in-grid stretch;
  - dropping ortho's rounded-corner path builder;
  - dropping force's packing, Tutte, `planar`, `clr`, `hand`, the square-crossing pull and `cut`/`split`.
- **Where the first version stood:** a straight port (per-piece relaxation, the `hand` net, the square-crossing pull and the bisection cut) was 12,209 B, over the condition.

## 7. The looks gate
- **Pass.** 102/102 tests in the staged copy.
- I measured with my own scratch copy of the test's measure, never in the library:
  - **worst straight share 15.1 % (7_4)**; then 3_1 at 7.9 % and 7_6 at 6.8 %;
  - **worst sharp share 1.0 % (7_2)**; then 10_8 at 0.9 % and 7_5 at 0.6 %.
- The parents: gen1-force was 18 % / 1.1 %, and gen0's packing 18 % / 0.3 %.
- **What the pictures show (rendered from SVG paths to PNG in the scratchpad):**
  - **Table knots** are round and smooth, with no corners or long runs. They are **less symmetric than the packing**: the trefoil is a recognisable trefoil, but its lobes are unequal, and 5_2 and 7_x look hand-drawn rather than textbook. That is the price of having no packing branch.
  - **The random 12-crossing knot** is round and evenly spread, with some gentle waves. By my wiggle proxy, on 31 random knots and cords it wiggles a little less than gen1-force:

    | | this candidate | gen1-force |
    |---|---|---|
    | total turning per edge (radians) | 1.67 | 1.78 |
    | inflections per edge | 1.61 | 1.77 |

## 8. What I expected, and what happened
- **Expected:** a uniform start would make the relaxation faster than force's, and better spaced. **This happened.** It is 7.3 against 11.4 ms cold, with the best spread of the three parents (60–62 against 55–60) and full planarity.
- **Expected:** a packing branch would be needed for the looks gate. **This was wrong.** The relaxed grid passes with margin, and there was no budget for a packing: the 951 B went on the relaxation and the curve drawing.
- **Surprise 1: one outer face beats three.** ortho's "smallest of 3 grids" outer face was *worse* after rounding than simply the largest face: a layout term of 271 against 273 on seeds 1–8. Grid compactness is not what matters once the strands are relaxed. So `tries` went, which also saved bytes and time.
- **Surprise 2: fine subdivision made wiggle.** At 1 grid unit per point, the chains rippled (high-frequency waves on 20+ crossings), and the run was slow (with `Math.hypot` and per-pair array allocation in the PrEd loop, 2× force's CPU). Coarser runs (3–4 units) fixed both.
- **Surprise 3: the square-crossing pull no longer matters.** Ortho's start is already square at every crossing, so the pull added nothing measurable (±1 on the layout term).
- **Surprise 4: equal points per edge.** I tried this to make symmetric knots relax to symmetric pictures. The trefoil got rounder and more symmetric, but the other knots got boxy, and the outer strands crowded. I dropped it.
- **The stretch** adds about 3 to the layout term (aspect 96 → 99.4) and does not visibly skew the pictures, because the relaxed drawing is already near-round.
- **Handedness without a safety net.** I checked 198 diagrams with the test's own mirror check: every table entry, the trivial and kink cases, 40 random knots, 60 scrambled trefoils and unknots, 40 cords, 30 disguised braids and a connected sum. **No mirrored crossing, no extra crossing, nothing outside the box.**

## 9. What I would try next
1. **Textbook symmetry for the table knots** without a packing. For example, after relaxing, resample each edge to the same number of points along the (now smooth) curve, then run a short second relaxation. Check planarity after the resample. This targets the lopsided trefoil.
2. **A packing branch for reduced diagrams where it is planar,** if a later generation frees about 600–900 B (for example by sharing `relax` with something else, or by a smaller `ortho`). The 241 B left here is not enough.
3. **Speed on 50+ crossings:** a topological-order longest path in `ortho` (as gen1-ortho suggested), and a cap on steps by vertex count (as gen1-force had) for very large cords.
4. **Hand the wiggle question to the pictures.** The bench cannot see wiggle, and my proxy is crude. The lead's looks renders (3_1, 4_1, 5_2, random 12) should decide between this candidate and the smooth-curve slot.
