# gen1-force: force-directed relaxation that keeps the embedding

slot B, generation 1 · rnd-engineer · 2026-10-14 · parent `gen0-baseline` · brief: `company/rnd/evolution/knots-gen1-brief.md`

## The idea, in two lines
Begin with gen 0's planar drawing (the circle packing, or the Tutte fallback), then relax it with spring, electric and
vertex–segment forces. Each move is clipped so that no vertex can cross a segment, so planarity and the faces hold by construction.

## What changed
Only `draw.mjs` and `index.d.ts`. All other files are byte-identical to `gen0-baseline`.

- `layout(pd, { relax = 60 })`: after packing or Tutte, it calls `force(M, F, P, X, Y, relax, ok)`. The output format is unchanged (`{crossings, points, loops}`).
- `force`, per piece:
  - copies the piece's 5n vertices (crossings and edge points) into typed arrays;
  - builds the segment list `E`;
  - builds a list `W` of (vertex, segment) pairs that lie on a common face;
  - runs `relax`, then renormalises the piece to radius 1.
- `relax`: a Fruchterman–Reingold-style step loop with a linearly cooling step cap (k/4 → 0), where k = √(π/N). The forces are:
  - all-pairs vertex repulsion 0.12 k²/d, doubled between two crossings;
  - springs d²/2k on the drawn segments;
  - PrEd vertex–segment repulsion (g−d)²/d below g = k/2, ×4 when the vertex is a crossing. It is applied only to `W` pairs, as in ImPrEd;
  - a pull of ½·position toward the piece centre (fixes aspect, and stops loops from flying out);
  - a "square crossing" pull of 0.2 that moves each crossing's four edge points toward a best-fit orthogonal frame.
- **Planarity guarantee.**
  - The rule: each step, a vertex moves less than 0.45 × the smallest distance in any `W` pair it belongs to, either as the point or as a segment end.
  - Why it holds: for any pair, the point moves less than 0.45δ and the segment, as a convex combination of its moving ends, moves less than 0.45δ. So they cannot meet. A first contact between a vertex and a segment can only happen across a face they share, so `W` pairs are enough (the ImPrEd observation).
  - Result: the straight-line drawing keeps its embedding, and so its handedness.
- **Two safety nets.**
  - `hand()` compares each crossing's orientation sign, the same chord `draw` uses for tangents, before and after relaxation. If any sign flipped, the relaxation is undone.
  - `clr()` measures clearance: the closest segment to a crossing it does not touch, over size. A *planar circle packing* is kept unless relaxing raises its clearance by more than 60%. This keeps the textbook pictures for 17 of the 21 table entries. The four that are relaxed, because their packings are cramped, are 7_3, 7_5, Borromean (L6a4) and the monster unknot U10. On the bench, almost every messy diagram is relaxed.
- **Work cap.** Steps = min(60, 2·10⁸/N³), with N = 5n. This is unchanged up to about 23 crossings, then falls off: a 47-crossing cord gets about 15 steps, so the lesson's draw stays fast.

## Prior art and licences (ideas only; no code copied)
- **PrEd.** Bertault, "A force-directed algorithm that preserves edge-crossing properties", *IPL* 74 (2000). This gives the movement zones and the node–edge repulsion (g−d)²/d. I used a simpler, isotropic zone (0.45 × distance) in place of PrEd's 8 directional sectors.
- **ImPrEd.** Simonetto, Archambault, Auber & Bourqui, "ImPrEd: an improved force-directed algorithm that prevents nodes from crossing edges", *CGF* 30 (EuroVis 2011). From it: limit node–edge checks to the faces around a vertex, and use a cooling cap.
- **Forces.** Fruchterman & Reingold, *SP&E* 21 (1991): d²/k attraction, k²/d repulsion, temperature.
- KnotPlot is proprietary. It informed nothing in the code.

All the above are papers; the implementation is our own.

## Bench numbers (layout metrics; same seeds, same machine load, gen 0 in brackets)
| seed | extra | planar % | spacing | spread | aspect | score (`evolve.mjs` eval) |
|---|---|---|---|---|---|---|
| 1 | −1 (−1) | 95 (95) | 14.46 (8.87) | 59.75 (37.64) | 94.77 (90.54) | **10,458.48** (10,409.06) |
| 2 | 0 (−1) | 100 (95) | 12.08 (7.20) | 55.52 (36.14) | 96.79 (94.59) | **10,450.42** (10,400.38) |
| 3 | 0 (−2) | 100 (90) | 12.22 (6.94) | 55.81 (28.60) | 94.16 (93.41) | **10,440.88** (10,374.85) |

- **Result.** +49 to +66 over gen 0. The layout term rises by about 55 (weighted), and size costs about 2.
- **Wider check.** On seeds 1–6, my layout-only copy of the bench gives a weighted layout term of 267.8, against gen 0's 216.
- **Not tuned to one seed.** Constants were chosen by a random search on seeds 1–3 and checked on held-out seeds 4–8.
- **The remaining extra crossing** (seed 1) is a Catmull–Rom curve crossing. The polyline is planar on every bench diagram (checked).
- **Handedness, against the test's own check, on 108 random, scrambled and cord diagrams:** gen 0 draws 4 diagrams with a mirrored crossing; this candidate draws 1.

## Size delta
- Each lesson entry is +1,110 B (stripped, gz). The random-knot lesson goes from 10,986 to **12,095 of 12,288**, so the headroom is nearly spent: about 190 B is left.
- The whole library goes from 11,001 to 12,111.

## Speed
Warm CPU per bench draw rises from 5 ms to 11 ms, and wall time is 10–16 ms on an idle machine.

**Risk.** `layoutSlowPenalty` is wall time. Earlier in the day, under load average 25–35 on 4 cores, an earlier 100-step version of this candidate paid −27 and −52. That is why the default is now 60 steps with face-limited pairs. If the official run is on a loaded machine, this slot is the one most exposed to the penalty.

## What I expected, and what happened
- **Expected:** a big spacing gain from node–edge repulsion. The spacing gain was real (+5 points), but most of it came from the **centre pull** (gravity). Without it, loops drift out, the bounding box grows, and spacing and spread fall: gravity at 0.05 scored 191, at 0.5 to 1 about 280.
- **Spread (bunching) went from about 35 to about 57**, the table-knot level.
- **The cost: looks.** Relaxed drawings are rounder and less symmetric than the circle packing. Strands wiggle a little, because each edge is three straight segments with free bends. Relaxing the table knots made 7_4 and Borromean look worse. Hence the "keep the packing unless clearly cramped" rule. It costs about 3 points against relaxing everything, and keeps the lesson pictures textbook.
- **Dead ends:**
  - a bending (straightening) force did nothing to the score;
  - a final hard squaring phase gave boxy strands and −60;
  - limiting vertex repulsion to face neighbours was −40.
- **Trade-off.** Face-limited node–edge pairs cost about 5 points of quality against all pairs, for about half the CPU.

## What I would try next
- **Crossover with slot A or C:** use their start (an un-bunched convex or orthogonal drawing) with this relaxation as the polish. The start matters: Tutte slivers next to the outer circle escape slowly, because the movement cap is proportional to the gap.
- Treat each edge as one smooth curve. For example, put a spring on the angle at each edge point, or place edge points from the crossings after relaxing, which also needs the clearance check. That would remove the wiggle.
- Anisotropic PrEd zones (8 sectors), so vertices are not frozen by a near segment on the side they are not moving towards.
- Spend the last ~190 B of headroom carefully: the random-knot lesson is almost at budget.
