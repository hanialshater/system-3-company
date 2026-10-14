# gen2-force-smooth: one Bezier per edge, angle spring, 8-sector zones, and no circle packing

generation 2, slot `gen2-force-smooth` · rnd-engineer · 2026-10-14 · parent `gen1-force` · brief: `company/rnd/evolution/knots-gen2-brief.md`

## 1. The idea, in two lines
Each edge is drawn as one cubic Bezier (crossing, handle, handle, crossing), and the relaxation moves those control
points under anisotropic 8-sector PrEd zones, with an angle spring at handles and square crossings at the end. The
circle packing, which force kept from gen 0, is dropped: a Tutte start plus this relaxation passes the looks gate.

## 2. What changed
Only `draw.mjs` and `index.d.ts`. All other files are byte-identical to `gen1-force` (and so to `gen0-baseline`).

- **Removed** (what force carried from gen 0 and no longer needs): the circle packing (`ang`, the packing iteration,
  the placement BFS, `pl`), the `planar()` check that chose packing or Tutte, `clr()` and the keep-the-packing rule,
  the `iters` and `tutte` options, and the 3-segment Catmull-Rom edge drawing.
- **`layout(pd, { relax = 60 })`**: `tutte()` (unchanged from gen 0's fallback), then `force()`. Same output shape
  `{crossings, points, loops}`; `points` are now the 4 Bezier handles per crossing (see the crossing-change fix below).
- **`force()`** per piece: spring segments (crossing-handle, handle-handle except across a kink), strand triples
  (crossing, handle, next handle) for the angle spring, face pairs `W` (as gen 1); a tiny step (1/1000) toward each
  crossing's square frame to separate a kink's two handles, which Tutte puts on one point; `relax()`; the
  handedness guard; renormalise.
- **`relax()`**, as gen 1 plus:
  - **anisotropic zones** (ImPrEd's 8 sectors): for a face pair (v, segment ab) at distance d along the nearest-point
    direction e, v may approach by < 0.45 d along e and a, b by < 0.45 d towards v; a line across e then separates
    them for the whole step (the proof is in the code comment). Bounds are filed per 45-degree sector and a move is
    cut by the largest component it has inside each sector. Moves along or away from a near segment are free, so
    vertices are no longer frozen by a segment they are not moving towards. Pairs with d >= 0.6 k are skipped (a step
    is at most k/4, so they can never bind) - that is what keeps it fast.
  - **angle spring** at every handle b between its crossing a and the edge's other handle c: b is pulled toward the
    midpoint of a and c, a and c the other way, in proportion to the turn at b (offset / |ac|, scale-free). With the
    crossings' directions fixed, least total turning is the turn shared evenly between an edge's two handles.
  - **square crossings**: gen 1's square-frame pull (0.2) while cooling, then **12 steps of squaring alone, inside the
    same zones**: every strand runs straight through its crossing and crosses at 90 degrees, and planarity of the
    control polygons is kept (a hard snap instead broke it: -20 on the bench).
  - crossing-crossing repulsion x8 (was x2), to spread crossings.
- **`draw()`**:
  - each edge is one `C` cubic (crossing, handle, handle, crossing), cut at under-passes as before;
  - a **kink** (edge from a crossing to itself) has its handles taken twice as far out, so it draws a round curl,
    not a 2-unit hook;
  - the frame (bounding box) fits the curves (points at t = 1/4, 1/2, 3/4 of each edge), not their handles; a handle
    that then falls outside the view box is clamped onto it (test: all path numbers inside the box);
  - **stretch**: the short side is scaled by up to 1.2 x more to fill the square stage (the generic affine step the
    brief allows; capped so a two-piece link is not squashed).
- **Bug fix, pre-existing in gen 0 and gen 1: a stored layout did not survive `crossingChange`.** `crossingChange`
  rewrites the PD tuple from the new incoming under-strand, so `load` renumbers that crossing's slots by one, and a
  stored layout (indexed by dart) attaches the strands to the wrong arms. The unknot-game lesson does exactly this.
  The test only compares crossing positions, so it passes; the pictures were wrong (gen1-force's 5_2, 3_1 and 4_1
  after a crossing change show strands rerouted across the drawing). Here `points` are indexed from each crossing's
  first incoming slot (`at()`), which a crossing change does not move; after the change only over/under swaps.

## 3. Prior art and licences (ideas only; no code copied)
- **PrEd**: Bertault, "A force-directed algorithm that preserves edge-crossing properties", *IPL* 74 (2000):
  movement zones, node-edge repulsion (g - d)^2 / d.
- **ImPrEd**: Simonetto, Archambault, Auber & Bourqui, "ImPrEd: an improved force-directed algorithm that prevents
  nodes from crossing edges", *CGF* 30 (EuroVis 2011): 8-sector zones, face-limited pairs, cooling. My zone bound is a
  separating-line variant (each side < 0.45 d along e), with the sector cut computed exactly (cos(delta - 22.5 deg)).
- **Forces**: Fruchterman & Reingold, *SP&E* 21 (1991).
- **Start**: Tutte, "How to draw a graph", *Proc. LMS* 13 (1963), barycentric embedding (gen 0's code).
- **Curves**: cubic Bezier convex-hull property (textbook). KnotPlot (proprietary) informed nothing. No GPL code.

## 4. Internal objectives (what the code branches on or optimises)
None reproduces the bench or the looks test: no 4 % radius, no 1.5 cap, no weight 5, no spread or spacing formula, no
curvature measure, no 30 % / 3 % / 6 % / 2 x size.
1. **Outer face = each piece's largest region** (`tutte`, inherited from gen 0's fallback). Goal: the region with the
   most boundary goes outside, so the fewest strands are squeezed against the frame.
2. **Handedness guard** (`force`, `hand`): keep the relaxed drawing unless it has *more* crossings whose handles turn
   the wrong way than its start has. Goal: never draw a crossing mirrored. (gen 1 undid on *any* change of the sign
   string; in development, a Tutte start with a degenerate kink crossing was then left unrelaxed.)
3. **Stopping**: no score. min(60, 2e8 / N^3) cooling steps (gen 1's rule), then 12 squaring steps. Goal: bounded time.
4. **The inherited packing rule ("keep the packing unless relaxing raises clearance by > 60 %") is gone** with the
   packing. Nothing replaces it.
5. Not scores, named for completeness: kink detection (`t >> 2 == h >> 2`, combinatorial); the zone skip at d >= 0.6 k
   (a proof bound, not a tuning); the stretch cap 1.2 (a constant).

## 5. Bench numbers (`node tools/evolve.mjs eval knots gen2-force-smooth gen1-force --seed=s`, scratch archive)
Load average 1.5-2 during these three runs.

| seed | score (this) | score (gen1-force) | g | extra | planar % | spacing | spread | aspect | slow |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **10,578.42** | 10,559.32 | +19.10 | 0 (-1) | 100 (95) | 14.03 (14.46) | 69.63 (59.75) | 99.42 (94.77) | 0 (0) |
| 2 | **10,563.18** | 10,551.50 | +11.68 | 0 (0) | 100 (100) | 11.90 (12.08) | 66.23 (55.52) | 98.59 (96.79) | 0 (0) |
| 3 | **10,557.40** | 10,540.68 | +16.72 | 0 (0) | 100 (100) | 12.15 (12.22) | 68.17 (55.81) | 98.75 (94.16) | 0 (0) |

(gen1-force in brackets.) Median g = +16.7. Unknot and Jones metrics are identical code; their differences are timing noise.

- **Where it gains:** spread +10 to +12 (crossings un-bunched), aspect +2 to +5 (the stretch), size +1.5 points,
  planar share. **Spacing is level or slightly lower** (-0.1 to -0.4): square crossings cost a little spacing.
- **Wider check** (my layout-only copy of the bench, weighted layout term, seeds 1-12): 277.9 against gen1-force's
  264.2 (1-6: 280.1 vs 267.8; held-out 7-12: 275.8 vs 260.6). Constants were tuned on 1-6 and checked on 7-12.
- **Planarity:** the control polygons are planar on all 240 bench diagrams of seeds 1-12, at the start and after
  relaxing (checked). The drawn curves had extra crossings in 1 of 240 (seed 12, 2 crossings): two near strands
  whose control hulls overlap. The curve is inside its hull, but hulls are not kept apart.
- **Speed:** CPU per bench draw 9.3 ms against gen1-force's 11.0 ms (same machine, same diagrams, seeds 1-3).

## 6. Size (`node tools/evolve.mjs size knots gen2-force-smooth`)
| entry | this | gen1-force | delta |
|---|---|---|---|
| draw-a-table-knot | 5,459 | 6,203 | -744 |
| tricolour-check | 9,739 | 10,461 | -722 |
| unknot-game | 7,095 | 7,828 | -733 |
| **random-knot** | **11,377** | 12,095 | **-718** (target <= 11,776: **399 B under**) |
| whole library | 11,391 | 12,111 | -720 |

No entry grows. The packing removal paid for everything added (zones, angle spring, squaring phase, Bezier drawing,
kink curl, stretch, crossing-change fix) and left 399 B of the promotion headroom unspent.

## 7. Looks gate
**Pass.** Measured with my own copy of the measure in scratch (not in the library): worst table knot 7_7 at 23 %
straight; sharp 0.0 % on every knot (gen1-force: 18 % / 1.1 %). Per knot (straight %): 3_1 0, 4_1 5, 5_1 0, 5_2 14,
6_1 10, 6_2 19, 6_3 15, 7_1 0, 7_2 5, 7_3 8, 7_4 9, 7_5 18, 7_6 18, 7_7 23, 10_8 3. The margin to 30 % is smaller
than gen 1's, because the table knots are now relaxed, not packed.

## 8. What I expected, and what happened
- **Expected:** that I would have to keep the packing for the gate and find 319 B elsewhere. **Happened:** a Tutte
  start, relaxed with these forces and drawn as one curve per edge, passes the gate with 0 % sharp corners, so the
  whole packing could go. That is where the 718 B came from.
- **Wiggle:** gone by construction (one cubic per edge, straight through every crossing). Table knots are no longer
  the packing's textbook pictures: 3_1 and 4_1 are rounded and symmetric but less "circular"; 7_4 and the random
  12-crossing knot look better than gen 1's to me. The lead's renders decide.
- **Square crossings were the hard part.** A pull alone stalls at 35-60 degrees (it balances the springs). A final
  hard snap to 90 degrees broke control-polygon planarity (-20 on the bench). Squaring as 12 extra steps inside the
  same movement zones reaches 90 degrees on table knots and keeps every polygon planar.
- **Two start bugs found and fixed on the way:** (a) Tutte puts a kink's two handles on one point, and one bench
  diagram came out unrelaxed (straight Tutte lines): fixed by a 1/1000 step toward the square frame (a 1/9
  step crossed segments); (b) the bounding box over handles shrank the picture by about 10 bench points: the box now
  fits points on the curves.
- **Dead ends:** collinear-only crossings (no squaring, angle left to the forces) scored +1.4 but drew trefoil
  crossings at 40 degrees; a blend halfway to 90 degrees made 5_1's inner edges exactly straight (45 % straight, gate
  fail); stronger square pull (S >= 1) gave straight runs up to 44 %; handle-handle repulsion lower, PrEd range or
  strength changed, 90 relax steps: flat or worse for the time.
- **Known weakness: the Hopf link (L2a1) draws as a flat lens** (its four arcs crowd). Squaring a crossing whose four
  arms all point into the same half-plane rotates arms a long way. Not in any lesson entry or in the looks gate, but
  a linking lesson would see it.

## 9. What I would try next
- Keep strand hulls apart, not just polygons: add each edge's curve midpoint (t = 1/2) as a PrEd point against near
  segments, or shorten handles where two hulls overlap. That is the remaining source of extra crossings.
- Fix the Hopf case generically: square only crossings whose arms already span more than a half-plane, or start
  with the crossings off the outer circle.
- Spend part of the 399 B on a better start than Tutte's outer circle (outer-face crossings start with their arms
  folded inward, which costs relaxation steps).
- **Proposed test, for the lead (evaluator is not mine):** "a stored layout keeps the picture fixed across a crossing
  change" should also check that every edge except those at the changed crossing keeps its path, which would have
  caught the gen 0/gen 1 bug above.
