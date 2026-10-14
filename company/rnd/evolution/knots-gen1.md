# Knots, generation 1 record: layout of arbitrary PD diagrams

owner: rnd-lead (Bram) · 2026-10-14 · brief: [knots-gen1-brief.md](knots-gen1-brief.md) · archive: `knots.jsonl` (the 24 records of 2026-10-14 from 02:54 UTC)

**Outcome:**
- Winner: **`gen1-force`**.
- The stop rule fires. Gen 1 improved the best total score by **+0.4 %**, under the method's 2 %. I recommend **promoting `gen1-force`** (EDD, then a principal-engineer review) instead of running gen 2.
- The 2 % rule is badly scaled for this score (see "Stop rule" below). If the VP rescales it, the gen-2 plan at the end is ready to dispatch.

## Official scores (gen-1 evaluator, as briefed: 101 tests)

Each run scored all four candidates in one `node tools/evolve.mjs eval knots gen0-baseline gen1-tutte gen1-force gen1-ortho` call, on a fresh seed. I ran it three times, because a loaded machine can skew `layoutSlowPenalty`. The load average was 4–15 on 4 cores, and **no candidate paid a slowness penalty in any of the three runs.**

| seed | gen0-baseline | gen1-tutte | gen1-force | gen1-ortho |
|---|---|---|---|---|
| 732415137 | 10,394.26 | 10,438.80 | **10,451.90** | 10,441.70 |
| 1393269891 | 10,406.79 | 10,446.84 | 10,436.38 | **10,454.69** |
| 837356912 | 10,394.54 | 10,411.71 | 10,439.68 | **10,443.07** |
| **median** | 10,394.54 | 10,438.80 | 10,439.68 | **10,443.07** |
| vs gen 0 (median) | | +44.3 (+0.43 %) | +45.1 (+0.43 %) | +48.5 (+0.47 %) |

Layout metrics (the three runs; everything else moved only with Jones-timing noise, as the brief expected):

| | extra crossings | planar % | spacing | spread | aspect | mean lesson B |
|---|---|---|---|---|---|---|
| gen0-baseline | 0 / −1 / 0 | 100 / 95 / 100 | 7.3–7.9 | 31.5–36.5 | 90–95 | 8,036 |
| gen1-tutte | 0 / 0 / −1 | 100 / 100 / 95 | 11.2–12.7 | 45.5–51.4 | 88–90 | 8,846 |
| gen1-force | 0 / −1 / 0 | 100 / 95 / 100 | 11.4–12.9 | **51.7–60.6** | 92–96 | 9,147 |
| gen1-ortho | **0 / 0 / 0** | **100 / 100 / 100** | **13.2–14.1** | 44.3–48.9 | **100** | **7,861** |

The top three are within 4.3 points on the median. The seed moves one candidate's score by ±15 or more. **On the official evaluator, gen 1 is a three-way tie that `gen1-ortho` leads narrowly.** Ortho came first in 2 of the 3 runs, and force in 1.

## Gate audit

- **Files.** `diff -rq` against `gen0-baseline` shows the following, and the harness reported no problems.
  - tutte: `draw.mjs`, `index.d.ts`, new `layout.mjs`, `NOTES.md`.
  - force and ortho: `draw.mjs`, `index.d.ts`, `NOTES.md`.
  - No candidate ships a `test/` folder or uses `Math.random`, `import()`, `require()`, `process` or timers.
- **Gaming.** I found nothing disqualifying. I read the three layouts' entry points and searched them for table names, the bench seed and generators, and the 4 % sampling radius.
  - **ortho** has no data-dependent branch except the choice of outer face, picked by smallest grid.
  - **force** keeps the circle packing unless relaxing it raises clearance by more than 60 %. That rule is generic and measured on the diagram itself; it does not detect the table. It keeps 17 of the 21 table entries packed.
  - **tutte** picks its outer face (2 tries) by an internal score. The score copies the bench's spread and spacing formulas, including the 1.5 cap and the weight 5. It runs on the candidate's own straight segments, not on the bench samples or inputs, and the brief invited choosing "the outer face by score". This is allowed, but it is the nearest thing to metric-fitting in the generation. From gen 2, an internal objective must be one the record names as a goal, not a copy of the evaluator.

## Rulings

### 1. The ortho stretch (aspect 100) is fair. The metric stays as it is.

`gen1-ortho` stretches the short axis so the drawing fills the square view box.

- **Why it is fair:**
  - It is one generic affine step, applied to every diagram.
  - The engineer disclosed it and asked for this ruling.
  - It cannot shrink any distance.
  - On an orthogonal drawing it keeps every angle at 90° and every face a rectangle.
  - Lessons draw into a square stage, so filling it is a real goal, which is what `layoutAspect` exists to reward.
- **It is not decisive.** Unstretched, ortho's aspect is 84–92, which is 2.5 to 4 points lower. That would put it level with force, not below the field, so the ruling does not change the winner.
- **For gen 2.** Any candidate may use the same stretch, so the metric will saturate near 100. On curved drawings a stretch skews crossing angles and rounds, and the new looks test now guards that on table knots.
- **Evaluator change:** none. I did not change the aspect metric.

### 2. Looks: only `gen1-force` still draws a table knot like the textbook. I added a test.

I rendered 3_1, 4_1, 5_2 and a random 12-crossing knot (`randomKnot(20261014, {strands: 3, length: 12})`, braid `2 2 2 −2 −2 −1 −1 1 −2 2 2 1`) from all four candidates. The script was `render.mjs` in the session scratchpad: `draw(pd)`, each edge path stroked, a 4×4 grid rasterised with sharp. What the pictures show:

- **gen0-baseline:** textbook table knots. The random 12 has a cramped bigon knot in the middle, which is the bunching the brief describes.
- **gen1-force:** **identical to gen 0 on the table knots**, because the packing is kept. The random 12 is round, evenly spread and readable, with a slight wiggle in some strands. The best set of the four.
- **gen1-tutte:** the trefoil is fine. 5_2 is a tilted square with corner cusps. The random 12 has flattened "sausage" bigons round the rim and jagged corners.
- **gen1-ortho:** every knot is rounded rectangles. The trefoil is recognisable only to someone who knows grid diagrams. The random 12 is clean and planar, with long parallel runs and tight U-turns. It is the clearest picture of *which strand goes where*, and the least like a knot.

Measured on the 15 prime table knots, as the share of curve length that is straight (radius > 2 × size) or a sharp corner (radius < 4 % of size), away from crossings:

| | straight %, worst knot | sharp %, worst knot |
|---|---|---|
| gen0-baseline | 18 | 0.3 |
| gen1-force | 18 | 1.1 |
| gen1-tutte | 47 | 6.8 |
| gen1-ortho | 80 | 7.6 |

**New test (gate), from gen 2:** `test/draw.test.mjs` → "table knots look like the textbook".
- What it requires: every prime table knot draws with at most 30 % straight runs and at most 3 % sharp corners.
- Its limits: it checks roundness, not symmetry. It is a floor for the "draw a table knot" lesson, not a beauty score.
- What candidates may do: keep a round branch (packing, or anything round) for reduced diagrams. That is general behaviour. Detecting the table stays disqualifying (brief, rule 3).
- The gate now has 102 tests.

### Re-score on the changed evaluator (102 tests)

As the method requires, I re-scored everything: 3 runs, fresh seeds. The machine was busier, with a load average of 20–24.

| seed | gen0-baseline | gen1-tutte | gen1-force | gen1-ortho |
|---|---|---|---|---|
| 800881889 | 10,489.08 | 0 (101/102) | 10,514.03 (paid −11.71 slow) | 0 (101/102) |
| 1143594877 | 10,503.45 | 0 | 10,533.49 | 0 |
| 1297401554 | 10,491.86 | 0 | 10,537.58 | 0 |
| **median** | 10,491.86 | 0 | **10,533.49** (+0.40 %) | 0 |

On the re-scored evaluator, tutte and ortho fail the looks gate, and force wins clearly. The test I added decides the ranking. I accept that, and I record it here, not quietly. Neither engineer was briefed on a looks gate, so I keep ortho as a parent (below) and do not treat its 0 as a judgement on its idea.

## Selection

1. **gen1-force: winner and parent.**
   - It is within noise of the top official median, and the only candidate that passes the looks gate.
   - It has the best crossing spread (51–61, above the table knots' 58 in two runs) and the highest single-run score.
   - Risks to carry into the EDD:
     - the random-knot lesson costs 12,095 of 12,288 B, so only about 190 B is left;
     - it is the slot most exposed to `layoutSlowPenalty`: it paid −11.7 once under load 20.
2. **gen1-ortho: parent.**
   - It has the best spacing, 100 % planarity in every run and the smallest bundle (−175 B per lesson).
   - It fails only the table-knot look. A round branch for reduced diagrams fixes that, and its 1.4 KB of lesson headroom can pay for one.
3. **gen1-tutte: dropped.**
   - Lowest median of the three, and the only one with a bad run (10,411.71, with an extra crossing).
   - It grows the bundle by 810 B and fails the looks gate.

## What each idea taught us

- **Tutte (slot A).** A convex embedding is planar for free, but only on a true triangulation. Gen 0's crossing/edge/face graph has 2-cuts at every kink and bigon, and those collapse whatever the weights. The stress optimum is not planar, so a long guarded run flattens triangles. Stopping early works as regularisation. The result un-bunches crossings but leaves boxy, cusped table knots.
- **Force (slot B).** Most of the spacing gain came from the centre pull (gravity), not from the PrEd node–edge repulsion. Keeping the packing where it is already good protects the textbook pictures for about 3 points. A movement cap proportional to the gap is enough for planarity. The start matters: slivers by the outer circle escape slowly.
- **Ortho (slot C).** Uniform spacing and planarity come by construction (every face is a rectangle), and the code is smaller than gen 0's. Crossing-to-crossing edges of 2 units, not 1, made the difference for spread. Its weakness is not on the bench: rectilinear knots do not look like knots.
- **About the evaluator.** The bench had no notion of looks. The best-scoring idea drew the least textbook pictures. That gap is now a gate.

## Stop rule

The method says to stop when a generation improves the best score by less than 2 %. On the total score, gen 1's best improves on gen 0 by **0.26 %** (10,443.07 against gen 0's official 10,415.83), or by 0.47 % against gen 0's median on the same seeds. On the re-scored evaluator the figure is 0.40 %. **Under 2 % either way, so the rule says stop and promote.**

**Objection (mine, for the VP, Vera).** About 10,100 of the score is the constant test term (100 × tests). A 2 % gain is about 208 points, which is more than half of the entire bench term (about 330). So no layout generation can ever pass the rule, and it stops every project after one generation. Measured on the bench term, gen 1 gained **+15 %** (force: 357.98 against 310.61, medians). My proposal is to restate the rule as "2 % of the bench term". I have not changed `evolution.md` on my own authority, because a lead who rescales the stop rule to keep going is the conflict the rule exists to prevent. **Until the VP rules, I recommend promotion of `gen1-force`.**

## Gen 2 plan (dispatch only if the VP rescales the stop rule)

- Parents: `gen1-force` and `gen1-ortho`.
- Evaluator: as now, with 102 tests including the looks gate. Aspect is unchanged, and the stretch is allowed for everyone.
- Slots: 3 rnd-engineers.

1. **`gen2-ortho-force` (crossover).** Ortho's planar grid drawing is the start, and force's crossing-preserving relaxation rounds it into a knot-like curve. This is ortho's own "next 1". Ortho is uniform from the start, which avoids force's slow slivers. A packing branch is kept for reduced diagrams where it is planar, so the looks gate passes. Budget: about 1.4 KB, from ortho's headroom.
2. **`gen2-force-smooth` (mutation of force).** Each edge becomes one smooth curve, with an angle spring at edge points, to remove the wiggle. Anisotropic 8-sector PrEd zones, so vertices are not frozen by a nearby segment they are not moving towards. Must also *shrink* the bundle by at least 150 B to give the random-knot lesson room.
3. **`gen2-ortho-round` (mutation of ortho).** Packing for reduced diagrams where it is planar, ortho for the rest, and flow-based compaction to shorten the long parallel runs. It answers whether ortho's spacing survives once it must look round where it matters.

Stop after gen 2 unless the best bench term gains at least 2 % over force's (if the rule is rescaled).

## Open

- **For the VP:** the stop-rule scale (above).
- **Promotion EDD for `gen1-force`** (rnd-lead, then a principal-engineer review). It must cover the 190 B of lesson headroom and the speed under load. I have not run `evolve.mjs promote`.
- **Lessons' pictures.** The looks gate is a floor. Whether ortho's grid style suits any lesson ("which strand goes where") is a cm-math question, not an R&D one.
