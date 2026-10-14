# Knots, generation 2 record: layout, round where it matters and even everywhere

owner: rnd-lead (Bram) · 2026-10-14 · brief: [knots-gen2-brief.md](knots-gen2-brief.md) · authority: [decision 2026-10-14-evolution-stop-rule](../../decisions/2026-10-14-evolution-stop-rule.md) · archive: `knots.jsonl`, the 25 records of 2026-10-14 for seeds 2063213053, 683509380, 1789421793, 716429024, 243182556 · pictures: [knots-gen2-looks/](knots-gen2-looks/)

**Outcome:**
- Winner, selected by the brief's rule (highest median score, gated in on every seed, bundle condition met): **`gen2-force-smooth`**.
- **Stop rule: fail.** Median paired gain over `gen1-force` is **+12.32**, under T = **15**, though positive on 5 of 5 seeds. Gen 3 is not dispatched. The knots layout bet stops here.
- **W-162: promote `gen2-force-smooth`** (the gen-2 best, taken over the champion for reasons outside the score: size, and the crossing-change correctness bug below). The EDD must carry its known defects (flattened bigons on small table knots, the Hopf lens, rare extra crossings from overlapping hulls).
- **For the VP, flagged openly:** `gen2-ortho-force` would pass the rule (median g +21.07, 5/5 positive) if I had selected it against the score on looks. I did not. The looks are split (below), the score difference is 3.3 points, and both judgement calls that would lead to a pass (choosing against the score, and running 5 seeds instead of 3) were mine. The section "Selection" gives my reasons. The VP checks this table before anything else is dispatched, so this is the place to overrule me.

## Official scores (gen-2 evaluator, frozen: 102 tests, `evolve.json` as briefed)

Every run was `node tools/evolve.mjs eval knots gen2-ortho-force gen2-force-smooth gen2-ortho-round gen1-force gen0-baseline`, on a fresh seed (no `--seed`), into the official archive. **Five runs.** I fixed the number at 5 after run 1 and before seeing runs 2 to 5, because the ortho-force and force-smooth self-checks put their median gains at +13.8 and +16.7, near T = 15. Every run counts, and none was re-drawn. The session guard against command lines containing "eval", which two engineers reported, did not fire in this session.

Load average is the 1-minute figure just before and just after each run (4 cores; the machine was shared with other sessions).

| run | seed | load (before → after) | gen2-ortho-force | gen2-force-smooth | gen2-ortho-round | gen1-force | gen0-baseline |
|---|---|---|---|---|---|---|---|
| 1 | 2063213053 | 5.8 → 22.2 | **10,565.35** | 10,547.22 | 10,525.94 | 10,543.57 | 10,500.59 |
| 2 | 683509380 | 22.7 → 34.3 | 10,555.79 | **10,559.12** | 10,516.00 | 10,541.81 | 10,500.83 |
| 3 | 1789421793 | 34.3 → 34.5 | **10,559.61** | 10,559.24 | 10,515.04 | 10,546.92 | 10,497.81 |
| 4 | 716429024 | 34.5 → 34.4 | 10,554.77 | **10,566.76** | 10,535.84 | 10,531.37 | 10,511.21 |
| 5 | 243182556 | 34.4 → 36.3 | **10,548.19** | 10,533.10 (paid −16.96 slow) | 10,518.39 | 10,527.12 | 10,491.71 |
| **median** | | | 10,555.79 | **10,559.12** | 10,518.39 | 10,541.81 | 10,500.83 |

All five candidates passed 102/102 tests on every run, so all are gated in on every seed.

Layout metrics per run (runs 1 / 2 / 3 / 4 / 5). The unknot and Jones metrics are shared code and moved only with timing noise.

| | extra crossings | planar % | spacing | spread | aspect | slow penalty |
|---|---|---|---|---|---|---|
| gen2-ortho-force | 0 / 0 / 0 / −1 / 0 | 100 / 100 / 100 / 95 / 100 | 12.4–14.5 | 59.1–62.4 | 99.4–99.5 | 0 on all |
| gen2-force-smooth | **−4** / 0 / 0 / 0 / 0 | 95 / 100 / 100 / 100 / 100 | 10.9–13.2 | **64.9–68.8** | 97.2–99.3 | 0 / 0 / 0 / 0 / **−16.96** |
| gen2-ortho-round | 0 on all | 100 on all | 9.5–11.8 | 34.6–43.2 | 99.6–99.8 | 0 on all |
| gen1-force | 0 / 0 / 0 / −1 / 0 | 100 / 100 / 100 / 95 / 100 | 10.7–12.8 | 51.0–58.4 | 92.5–95.4 | 0 on all |
| gen0-baseline | −1 / 0 / −1 / 0 / 0 | 95 / 100 / 95 / 100 / 100 | 7.0–8.7 | 32.3–38.6 | 90.6–95.0 | 0 on all |

Sizes (stripped gzip, identical on every run):

| entry | gen0-baseline | gen1-force | gen2-ortho-force | gen2-force-smooth | gen2-ortho-round |
|---|---|---|---|---|---|
| draw-a-table-knot | 5,093 | 6,203 | 5,639 | **5,459** | 5,852 |
| tricolour-check | 9,353 | 10,461 | 9,899 | **9,739** | 10,107 |
| unknot-game | 6,713 | 7,828 | 7,275 | **7,095** | 7,482 |
| **random-knot** (condition ≤ 11,776) | 10,986 | 12,095 ✗ | 11,535 ✓ (241 B spare) | **11,377 ✓ (399 B spare)** | 11,758 ✓ (18 B spare) |
| whole library | 11,001 | 12,111 | 11,550 | 11,391 | 11,777 |
| mean lesson (size term) | 8,036 | 9,147 | 8,587 | 8,418 | 8,800 |

## Gate audit (before scoring)

- **Files.** `diff -rq` against the parents: every candidate differs only in `draw.mjs`, `index.d.ts` and `NOTES.md`. `gen2-ortho-force` was checked against both `gen1-ortho` and `gen1-force`. No new `layout*.mjs` file, and no `test/` folder.
- **Forbidden calls.** No `Math.random`, `process`, timers, `Date`, `performance`, `import()` or `require()` in any `draw.mjs`.
- **Table detection.** None. I read all three `draw.mjs` files in full.
  - `gen2-ortho-force`: no branch on the diagram at all, apart from the outer face (largest face).
  - `gen2-force-smooth`: no branch apart from the handedness guard and the step count `min(60, 2e8/N³)`.
  - `gen2-ortho-round` branches on `nugatory(pd)` being empty (a reduced diagram) and on the packing skeleton being planar. That is the generic test the brief allows. It uses no name, PD code, crossing count or `KNOTS` match.
- **Evaluator constants and formulas.** None in library code: no 4 % radius, no 1.5 cap, no weight 5, no spread or spacing formula, no curvature measure, and no 30 % / 3 % / 6 % / 2 × size. The `0.3` in `gen2-ortho-round` is gen 0's "turn 30 % towards a right angle" for strand points, not the looks threshold.
- **Internal objectives, checked against each NOTES.md.** Every branch and score I found in the code is named in the NOTES:
  - **ortho-force:** largest face as the outer face; fewest bends; shortest grid; a fixed 60-step schedule; no packing; the stretch.
  - **force-smooth:** largest region on the circle; the handedness guard ("keep unless more crossings turn the wrong way"); the step rule; the packing rule dropped; and the 0.6 k skip and the 1.2 stretch cap, named as constants.
  - **ortho-round:** reduced and planar; largest region; 200 sweeps; smallest of 3 grids; fewest bends; no compaction cost.
  - I found no unnamed objective.
- **Tuning on a bench copy (noted, not disqualifying).** Both force-derived engineers chose constants offline with a scratch copy of the bench's layout section, and checked them on held-out seeds: ortho-force's run length of 4, and force-smooth's forces. That is ordinary selection pressure. The rule forbids the evaluator *inside the library*, and neither ships it. Both measured the looks shares with scratch copies outside the library, and say so.
- **Ruling requested by gen2-ortho-round: the unshipped "reduced alternating" branch.** It was not shipped and not scored, so it does not affect gen 2. **Ruling: not allowed under this evaluator.**
  - In itself, "reduced alternating" is a mathematical property of the diagram (Tait's minimal diagrams), not a lookup.
  - But the engineer measured that it separates the table from the bench exactly: every prime table knot is alternating, and no bench diagram is reduced and alternating. On this evaluator, the condition works as "is a table knot". A candidate shipping it would score the grid on the bench and the packing on the looks gate, which is the outcome the table-detection rule exists to prevent.
  - It becomes allowable once the bench samples reduced alternating diagrams that are not in the table. That is an evaluator change, made by the re-score rule. Recorded as an evaluator gap (below).
- **Result: all three candidates gated in. No disqualification.**

## Looks (part of selection)

Rendered from each candidate's `draw(pd)`, with every edge path stroked, as SVG in [knots-gen2-looks/](knots-gen2-looks/). Files are `<candidate>--<knot>.svg`, for 3_1, 4_1, 5_2, `random12` (`randomKnot(20261014, {strands: 3, length: 12})`) and L2a1, for the three candidates and `gen1-force`. I rasterised them with sharp (already a dependency) to look at them. I also looked at `randomKnot(s)` for s = 3 (the lesson's default), 1, 2, 4, 5, 6 for force, ortho-force and force-smooth (scratch only).

| | table knots (3_1, 4_1, 5_2) | random 12 and randomKnot 1–6 | Hopf link L2a1 |
|---|---|---|---|
| gen1-force (champion) | textbook (packing) | round, with wiggle and some small hooks | two rounded rectangles |
| **gen2-ortho-force** | round and readable, but lopsided: unequal trefoil lobes, a "hand-drawn" 5_2 | **the wiggle is not fixed.** Random 12: uneven, with small hooks and an S-squiggle near the centre (worse than force here). On randomKnot 1–6 it is about level with force | two ovals, fine |
| **gen2-force-smooth** | **flattened bigons.** 3_1 is a rounded triangle with each side a pair of near-parallel strands; 4_1 is the same. 5_2 is a diamond, readable | **clearly the best.** One smooth curve per edge, even spacing, square crossings, no wiggle, on every random knot I looked at | **a flat lens.** The two components almost coincide (the engineer's own report). Unreadable |
| gen2-ortho-round | textbook (packing, as gen 0) | the random 12 is packed and has gen 0's cramped bigon in the middle. Unreduced diagrams are rectilinear | two rounded rectangles |

Looks-gate shares, worst prime table knot, measured with the test's own measure in scratch (they match the engineers' NOTES):

| | straight %, worst | sharp %, worst |
|---|---|---|
| gen1-force | 18.0 (3_1) | 1.07 (7_3) |
| gen2-ortho-force | 15.1 (7_4) | 0.96 (7_2) |
| gen2-force-smooth | 22.8 (7_7) | 0.00 |
| gen2-ortho-round | 18.0 (3_1) | 0.51 (10_8) |

**The gate does not see slivers.** force-smooth's trefoil passes at 0 % straight and 0 % sharp, but its bigons are thin enough to read as doubled lines. This is the same "sausage bigon" defect I described for gen1-tutte. A bigon-width measure is a candidate for any future looks test. It is not in the evaluator, and I am not adding it after the fact.

## The crossing-change bug (reported by force-smooth's engineer): real, and wider than reported

**Claim.** In gen 0 and gen 1, a stored layout does not survive `crossingChange`: strands attach to the wrong arms. The existing test misses it, because it compares crossing positions only, on 5_2.

**Check.** Scratch script: for every `KNOTS` entry and `randomKnot(1..5)`, and every crossing c, I compared `draw(pd, {layout: L, gap: 0})` with `draw(crossingChange(pd, c), {layout: L, gap: 0})`. With the under-pass gap off, the two drawings must be the same set of curves. I measured the Hausdorff distance between curve samples, in units of a 100-unit view box.

| | cases that move more than 0.5 units | what it looks like |
|---|---|---|
| gen0-baseline | 179 (almost every case) | strands rerouted across the drawing, 5–22 units (3_1: 14; 4_1: 17) |
| gen1-force (champion) | 179 | same as gen 0 (the code is inherited) |
| gen1-ortho | 1: L2a1 at crossing 1 | |
| gen2-ortho-force | 1: L2a1 at crossing 1 | the Hopf link after a change draws a figure-eight with extra crossings |
| **gen2-force-smooth** | **0** (distance 0.0 everywhere) | correct |
| gen2-ortho-round | 1: L2a1 at crossing 1 | as ortho-force |

- **Why gen 0 and gen 1 fail:** the engineer's diagnosis is right. `crossingChange` rewrites the tuple from the new incoming under-strand, so `load` renumbers that crossing's slots, and a layout stored by dart index lands on the wrong arms.
- **Why the ortho line fails on Hopf only:** points are keyed by edge label and stored tail to head. On a component with only 2 edges, the orientation `load` infers comes from the under-strand. After the change it flips: on L2a1, labels 1 and 2 swap head and tail. So the stored points are walked backwards.
- **Why force-smooth passes:** its `at()` indexes handles from each crossing's first incoming slot, which a crossing change does not move.
- **What it means for lessons:** the unknot-game lesson does exactly this, on the trefoil. With the champion's code its picture is wrong after the first tap. This alone makes `gen1-force` unpromotable as it stands.

**Decision: a test, added at promotion (and as the first change of any later knots evaluator), not inside gen 2.**
- **Why not now.** Gen 2's evaluator was frozen by the brief, and the stop rule is judged on it. If I added the test now, the re-score rule would put the champion at 0, every paired gain at about 10,500, and only force-smooth gated in. The rule would become meaningless, and a test that only one engineer anticipated would decide the generation after the fact. That is the gen-1 looks-gate pattern, which I recorded then as a weakness.
- **When it enters.** In the promotion evaluator: it is added to `test/draw.test.mjs` before `evolve.mjs promote`. At that point every surviving candidate is re-scored on it, per the method, and this record gets an addendum with the result.
  - Expected: force-smooth passes. gen1-force, ortho-force and ortho-round score 0.
  - The winner does not change.
- **The test (owner: rnd-lead; text to add):**
  ```js
  test('a stored layout keeps every strand where it was across a crossing change', () => {
    const pts = (D) => D.edges.flatMap((e) => { const p = bez(e.d), o = []; for (let s = 0; s + 3 < p.length; s += 3) for (let i = 0; i <= 8; i++) { const t = i / 8, u = 1 - t; o.push([0, 1].map((k) => u * u * u * p[s][k] + 3 * u * u * t * p[s + 1][k] + 3 * u * t * t * p[s + 2][k] + t * t * t * p[s + 3][k])) } return o })
    const far = (A, B) => Math.max(...A.map((a) => Math.min(...B.map((b) => Math.hypot(a[0] - b[0], a[1] - b[1])))))
    const cases = [...Object.values(K.KNOTS).map((k) => k.pd), ...[1, 2, 3].map((s) => K.randomKnot(s).pd)].filter((pd) => pd.length)
    for (const pd of cases) {
      const L = K.layout(pd), A = pts(K.draw(pd, { layout: L, gap: 0 }))
      for (let c = 0; c < pd.length; c++) { const B = pts(K.draw(K.crossingChange(pd, c), { layout: L, gap: 0 })); assert.ok(Math.max(far(A, B), far(B, A)) <= 0.5, `${JSON.stringify(pd)} @ ${c}`) }
    }
  })
  ```
  (`bez` is the path parser the looks test already uses.) It covers links (L2a1 catches the 2-edge-component case) and requires `draw` to honour `gap: 0`, which every candidate's `draw` already does.
- **Credit.** force-smooth's engineer found the bug, fixed it in their candidate, and proposed the test. They were right, and the bug is wider than they knew: it also breaks the ortho line on links. Kudos is proposed in the handoff (I may not write `events.jsonl` in this session).

## Selection

1. **`gen2-force-smooth`: winner.**
   - It has the highest median score (10,559.12), was gated in on all 5 seeds, and its random-knot entry is 11,377 B (399 B under the condition).
   - It has the most even spread in the generation (64.9–68.8; the champion has 51–58).
   - It is the only candidate whose stored layout survives `crossingChange`.
   - It fixes the generation's named defect, wiggle: on every random knot I looked at, it draws the cleanest picture of the generation.
   - **Against it:**
     - flattened bigons on 3_1 and 4_1;
     - the Hopf lens;
     - 4 extra crossings on one bench seed: control hulls overlap and the drawn curves cross; the engineer disclosed this;
     - one slow penalty (−16.96, at load about 35). Its exposure to load is not better than the champion's (−11.71 at load 20 in gen 1).
2. **`gen2-ortho-force`: not selected; the best parent if anything follows.** Its median score is 3.3 below force-smooth's, and the paired difference is a tie (ortho-force − force-smooth = +18.13 / −3.33 / +0.37 / −11.99 / +15.09, median +0.37).
   - **For it:** the best paired gain against the champion; no slow penalty at load 34–36; readable table knots and a good Hopf link.
   - **Against it:** the wiggle is not fixed (the random 12 is worse than the champion's); it is 158 B bigger than force-smooth; it fails the crossing-change test on Hopf.
3. **`gen2-ortho-round`: not selected.** Its median gain against the champion is −17.63, and it beats the champion on only 1 of 5 seeds. Its random 12 keeps gen 0's cramped bigon, and it has 18 B of bundle headroom. Its finding stands (next section).

**Why I did not select ortho-force against the score.** The brief lets me select against the score for looks or size, and say why. The looks here are split.
- ortho-force draws the better small table knots, which 3 of the 4 lesson entries use: 5_2 in draw-a-table-knot, 3_1 in tricolour-check and unknot-game.
- force-smooth draws the better arbitrary diagrams. Those are this generation's stated target ("`layout(pd)` for arbitrary PD codes ... Wiggle").
- force-smooth also has the better size.
- A split verdict on looks does not justify overturning the score. Selecting ortho-force would also flip the stop rule from fail to pass on the strength of two calls of mine (the looks override, and running 5 seeds instead of 3: on the first 3 seeds alone, ortho-force's median g is 13.98, under T). The decision record names exactly that conflict. I would rather leave it to the VP than take it.

## Stop rule (decision §1), winner against `gen1-force`

E = score − 100 × tests passed. T = max(2 % × median E of gen1-force, 15) = max(2 % × 341.81 = 6.84, 15) = **15**. With 5 seeds, the sign condition is g > 0 on at least 80 % of seeds (4 of 5).

| seed | load avg (before → after) | score(gen2-force-smooth) | score(gen1-force) | g_s | E(gen1-force) |
|---|---|---|---|---|---|
| 2063213053 | 5.8 → 22.2 | 10,547.22 | 10,543.57 | +3.65 | 343.57 |
| 683509380 | 22.7 → 34.3 | 10,559.12 | 10,541.81 | +17.31 | 341.81 |
| 1789421793 | 34.3 → 34.5 | 10,559.24 | 10,546.92 | +12.32 | 346.92 |
| 716429024 | 34.5 → 34.4 | 10,566.76 | 10,531.37 | +35.39 | 331.37 |
| 243182556 | 34.4 → 36.3 | 10,533.10 | 10,527.12 | +5.98 | 327.12 |
| **median** | | 10,559.12 | 10,541.81 | **+12.32** | **341.81** |

**Verdict: fail.** The median g of 12.32 is under T = 15. The sign is positive on 5 of 5 seeds, so the gain is probably real but small: about +3.6 % of E, against the 15-point floor.

The same columns for every gated-in candidate (transparency, decision §1):

| candidate | g_s on the 5 seeds | median g | g > 0 | would pass if selected? |
|---|---|---|---|---|
| **gen2-force-smooth (winner)** | +3.65 / +17.31 / +12.32 / +35.39 / +5.98 | **+12.32** | 5/5 | **no** |
| gen2-ortho-force | +21.78 / +13.98 / +12.69 / +23.40 / +21.07 | +21.07 | 5/5 | yes (the first 3 seeds alone: 13.98, no) |
| gen2-ortho-round | −17.63 / −25.81 / −31.88 / +4.47 / −8.73 | −17.63 | 1/5 | no |
| gen0-baseline (reference) | −42.98 / −40.98 / −49.11 / −20.16 / −35.41 | −40.98 | 0/5 | — |

**What follows (decision §1 and §3).**
- Stop. Gen 3 is not dispatched.
- Promote the champion, or the gen-2 best if the record argues for it outside the score. It does: the champion fails the bundle condition (12,095 > 11,776) and the crossing-change test. **So the promotion candidate is `gen2-force-smooth`.**
- **If the VP overrules the selection** (ortho-force on looks, verdict pass), gen 3 is the last generation. My proposal for it is in "If gen 3 runs". Even then, I would not ask for gen 3 on layout:
  - the bench's layout term is saturating (planar 100 %, aspect 99+, spread mid-60s);
  - the defects that remain (slivers, wiggle on the crossover, table-knot symmetry) are ones the bench cannot see, so the stop rule cannot judge them.

## What each idea taught us

- **Crossover (ortho start + PrEd relaxation): the start matters more than the forces.** A uniform grid start, relaxed with force's unchanged forces, beat the champion on every seed (+12.7 to +23.4). It was faster (no slow penalty at load 34–36) and passed the looks gate with no packing at all. One outer face (the largest) beat ortho's "smallest of 3 grids" once the drawing is relaxed. But a chain of independently moved points still wiggles: the crossover did not fix wiggle, because the chain is the cause.
- **force-smooth (one cubic per edge, angle spring, 8-sector zones): the representation fixes wiggle.** One Bézier per edge cannot wiggle. Squaring crossings inside the movement zones keeps planarity, where a hard snap broke it. The packing could go entirely, which paid for everything (−718 B).
  - The cost: a Tutte start with crossings on the outer circle squeezes small diagrams' bigons into slivers. Squaring a crossing whose arms all point into one half-plane flattens the Hopf link.
  - Overlapping control hulls produce rare extra crossings: the polygons are planar, the curves are not guaranteed to be.
  - Indexing stored handles by the incoming slot fixed a bug that had been in the library since gen 0.
- **ortho-round (packing where reduced, grid elsewhere, flow compaction): two clean negative results.**
  1. "Reduced" does not separate textbook from messy diagrams: about 40 % of the bench's messy diagrams are reduced (braid closures nearly always are), and the packing spaces them worse than the grid.
  2. Flow compaction changes nothing after rectangular refinement: the grid is already rigid, and balanced longest path sits at the LP optimum. Ortho's long runs and U-turns come from the shape step, not the metrics step.

  It also ran into the honest limit of "generic branch": the one condition that would have worked (reduced alternating) works only because the bench has no such diagrams.
- **About the evaluator:**
  - The looks gate measures curvature, not width, so slivers pass it.
  - The crossing-change test checked positions, not strands. It let a bug live through two generations.
  - The bench has no reduced alternating diagrams outside the table, which makes "alternating" a table detector on this evaluator.
  - The noise floor did its job. Two candidates were positive on every seed against the champion, and the one the score picked still fell under T.

## Evaluator gaps found in gen 2 (none changed during gen 2)

1. **Crossing change:** the test above. It enters at promotion, with a re-score addendum here.
2. **Slivers:** a bigon-width (or minimum face width) floor on table knots. It would catch force-smooth's 3_1 and 4_1. Proposed for any future looks test, not added.
3. **Reduced alternating, non-table diagrams in the bench** (for example, random alternating diagrams). Needed before any round branch on "alternating" can be judged fairly.
4. **Links in the looks gate:** L2a1 is outside it. That is how the Hopf lens and the Hopf crossing-change failure both went unseen.

## W-162 recommendation

- **Promote `gen2-force-smooth`:** `draw.mjs` and `index.d.ts`. Everything else is byte-identical to gen 0/1.
- **The order of steps:**
  1. Add the crossing-change test to `test/draw.test.mjs` (rnd-lead).
  2. Re-score the survivors on it, and add an addendum to this record.
  3. Run `node tools/evolve.mjs promote knots gen2-force-smooth`.
  4. The EDD goes to the principal engineer with this record linked.
- **The EDD must state these as known defects, each with an owner:**
  1. Flattened bigons on 3_1 and 4_1. The tricolour-check and unknot-game lessons draw the trefoil. **cm-math or the design lead should judge whether the trefoil picture is acceptable for a lesson before a lesson imports it.** If it is not, the fix is a follow-up EDD with an rnd-engineer. It is not a generation.
  2. The Hopf link draws as a flat lens. No lesson uses links yet.
  3. Rare extra crossings where control hulls overlap (4 in 1 of 5 bench seeds; 1 of 240 diagrams in the engineer's run).
  4. Slowness under load: −16.96 once, at load about 35.
- **Size after promotion:** random-knot 11,377 B, which leaves 911 B under the 12,288 B gate and 399 B under the 11,776 B condition.

## If gen 3 runs (only if the VP overrules the selection above)

- Parents: `gen2-ortho-force` and `gen2-force-smooth`.
- One idea worth a slot: **ortho-force's grid start and schedule, with force-smooth's one-cubic-per-edge representation, angle spring and slot-indexed storage.** That combines the start that beat the champion on every seed with the representation that removed wiggle.
- Alternatively, the VP's own alternative target: `simplify` on hard unknots (67–73 % solved in these runs).
- The evaluator for gen 3 would include gaps 1 and 2 above, stated up front in the brief, and a re-score of the champion on it.

## VP ruling

vp-rnd (Vera) · 2026-10-14 · authority: [decision 2026-10-14-evolution-stop-rule](../../decisions/2026-10-14-evolution-stop-rule.md) §1 ("the VP checks it before the next generation is dispatched") and §3 (the budget)

**Ruling, in one line:** the selection stands (`gen2-force-smooth`). The stop rule fails, so there is no gen 3 and the knots layout evolution is closed. W-162 promotes `gen2-force-smooth` with the conditions below. The looks fix is a follow-up, not a promotion condition. But two defects block specific lessons from importing until they are fixed or accepted.

### What I checked, and how

I recomputed the stop-rule table from `knots.jsonl` myself, not from the table above.
- **The archive has exactly 25 gen-2 records:** 5 seeds × 5 ids, each run complete. The timestamps run contiguously from 08:49:44 to 09:01:02, with no partial run and no orphan gen-2 record on any other seed.
- **Every number in "Stop rule" and the transparency table matches.**
  - force-smooth g: +3.65 / +17.31 / +12.32 / +35.39 / +5.98, median +12.32.
  - ortho-force g: median +21.07, and +13.98 on the first 3 seeds.
  - ortho-round g: median −17.63.
  - Champion median E: 341.81. T = 15.
  - ortho-force − force-smooth, paired: +18.13 / −3.33 / +0.37 / −11.99 / +15.09, median +0.37.
- **I looked at the pictures:** 3_1, 4_1, 5_2, random12 and L2a1, for gen1-force, force-smooth and ortho-force, rasterised in scratch. Bram's descriptions are accurate.
  - force-smooth's trefoil is a triangle with doubled sides. The crossings are squeezed into the corners and the three arcs are hard to tell apart.
  - force-smooth's random 12 is the cleanest picture of the four.
  - ortho-force's random 12 has a squiggle near the centre.
  - force-smooth's Hopf link is unreadable.

### "Every run counts": honoured

- The rule says "at least 3 fresh seeds". Five is allowed, and the decision's own answer to the strictness objection anticipates more seeds, with all of them counting and the 80 % sign rule applying.
- No seed was dropped or re-drawn. The load average is recorded for all 5 runs. The run with the heaviest load (run 5, where force-smooth paid −16.96) is in the table and counts against the winner.
- **One thing to name.** N = 5 was fixed after run 1 had been seen, though before runs 2 to 5. Bram gives the self-checks as the reason, and the record says so in the open. That is not a breach, because extending N only adds runs that count. But choosing N after seeing data is the move that could be abused, so I am closing it for the future (see "Rule clarification" below).
- **The verdict for the selected winner does not depend on N:** force-smooth's median g is +12.32 on the first 3 seeds and on all 5. The count only matters for ortho-force, which is the next point.

### (1) The selection: accepted, on different grounds from the record's

- **On score, this is a tie, not a win.** The brief's metric (highest median of raw scores) favours force-smooth by 3.3. The mean of raw scores favours ortho-force by 3.7. The paired comparison, which is the one the decision trusts, puts ortho-force − force-smooth at a median of +0.37, positive on 3 of 5 seeds. Within the ±15 noise, the two candidates cannot be told apart on score. So "selected by score" is not the real basis. The real basis is the evidence outside the score, which the decision allows.
- **That evidence favours force-smooth:**
  1. **Correctness against a briefed requirement.** The gen-2 brief told every engineer that "a stored layout keeps the picture fixed across `crossingChange`" ("Keep the API"). force-smooth is the only candidate that honours it everywhere. ortho-force breaks it on the Hopf link.
     - Bram is right that the test cannot enter the gate or the stop rule after the fact.
     - But a stated API requirement is fair evidence at selection. That is not after the fact.
  2. **The generation's stated target.** The target was arbitrary diagrams, and their wiggle in particular. force-smooth fixes it. ortho-force does not, and its random 12 is worse than the champion's.
  3. **Size.** force-smooth is 158 B smaller on every entry, with 399 B of headroom against 241 B.
  - **For ortho-force:** the better small table knots, a readable Hopf link, and no slow penalty at load 34–36. These are real, and they are why it is the parent to keep (see (2)). They do not outweigh a correctness failure plus a miss on the target.
- **Overruling to ortho-force would be the exact conflict the decision guards against.** A tie on score would be broken by looks, on a seed count chosen after run 1, and the verdict would flip from stop to go. ortho-force's own pass is marginal: it fails on the 3 seeds the rule requires (13.98 < 15), and it passes only on the extension. I will not buy a generation with that.
- **Kudos to Bram** for flagging the conflict instead of taking it. That is the behaviour the rule depends on.

### (2) Stop vs gen 3: stop. The knots layout evolution is closed.

- **The rule fails for the selected best:** median +12.32 < T = 15, although the sign is positive on 5/5. The budget allowed gen 3 only on a pass, so gen 3 is not dispatched, on layout or on anything else.
- **This is not a near-miss worth rescuing.**
  - The gain is real but small: about +3.6 % of E.
  - The bench's layout term is saturating: planar 100 %, aspect 99+, spread mid-60s.
  - Every defect that remains (slivers, the Hopf lens, table-knot symmetry) is invisible to the bench, so a gen 3 on this evaluator could not be judged by the rule.
  - A gen 3 on a changed evaluator would be a new project, not the last generation of this one.
- **simplify on hard unknots (Bram's alternative, and mine in §3) is not opened either.**
  - No brief is blocked on it. The unknot-game lesson uses small diagrams, and the 67–73 % solve rate on the bench's hard unknots is not a lesson problem today.
  - Opening it now would be the "library that grows for its own sake" failure mode.
  - **Reopen it only if a category manager's brief needs a diagram that `simplify` fails on**, with a new VP decision and its own budget.
- **Against the decision's "would be wrong if" tests:**
  - **"Gen 2 wastes its slots": not met.** Gen 2 produced a candidate that passes the looks gate and the bundle condition, draws visibly better random knots, and is 718 B smaller than the champion. It also exposed a correctness bug that had lived in the library since gen 0. Gen 2 paid.
  - **"Too strict": inconclusive, and now untestable on knots.** force-smooth is a real-but-sub-T gain (5/5 positive). The test needs a next generation to re-score against, and there will not be one. This costs nothing here, because the stop rule still lets us promote the better candidate. It only refuses to buy another generation. I record it as the first data point on the "too strict" side, to watch on the next project.

### (3) What the promotion (W-162) must carry

These are **conditions before `node tools/evolve.mjs promote knots gen2-force-smooth`**. All are owned by the rnd-lead unless stated.

1. **The crossing-change test** (text in "The crossing-change bug" above) is added to `src/lab/knots/test/draw.test.mjs`.
   - Its case set must include L2a1. Check that `KNOTS` contains it, and if not, add L2a1's PD to `cases` explicitly. The Hopf case is the one that separates the ortho line.
2. **Re-score, with an addendum here ("## Promotion re-score").**
   - **Runs:** at least 3 fresh-seed `eval` runs of `gen2-force-smooth`, `gen1-force`, `gen2-ortho-force` and `gen2-ortho-round` on the 103-test evaluator. Every run counts, and the load average is recorded for each.
   - **Expected:** force-smooth 103/103, the other three gated out.
   - **If force-smooth fails the new test on any seed, promotion stops and comes back to me.** The expected result is a prediction, not a formality.
3. **The EDD states, with numbers:**
   - the sizes (random-knot 11,377 B; 911 B under the gate and 399 B under the condition);
   - the selection basis as ruled here: a score tie, decided outside the score;
   - each known defect in (4), with its owner and which lessons it blocks.
4. **The known defects, classified by what a learner would see:**
   - **a. Rare extra crossings where control hulls overlap.** These are the most serious, because the picture shows a crossing the diagram does not have: a false statement to the learner. They hit the random-knot lesson, which draws arbitrary diagrams.
     - **Measured so far:** −4 on 1 of 5 bench seeds (planar share 95 %), and 1 of 240 in the engineer's run.
     - **The EDD must state the rate measured at the random-knot lesson's own parameters** (default `randomKnot(3)` family, at least 1,000 seeds), with the counting method.
   - **b. Flattened bigons on 3_1 and 4_1.** The picture is misleading, but not false. The tricolour-check lesson asks the learner to tell three arcs apart, and that is exactly what the doubled sides hide.
   - **c. The Hopf lens.** Unreadable. No lesson draws links yet. The EDD states that link drawing is not supported for lessons.
   - **d. Slowness under load:** −16.96 once, at load about 35. The EDD reports draw time on an unloaded machine for the lesson diagrams (3_1, 5_2, `randomKnot(3)`) alongside the bench figure. Whether that is acceptable for a phone is the principal engineer's call, not mine.
5. **The principal engineer's review** of the EDD, as always. Lab code does not reach lessons without it. Where the promoted code lives in `src/kit` is the principal engineer's architecture decision, not mine.

### (4) Is a looks fix a promotion condition? No. It is a follow-up, with an import block on the lessons it affects.

- **Why not a condition on promotion:**
  1. **Holding the promotion would hold the correctness fix hostage.** The champion's crossing-change bug makes the unknot-game picture wrong after the first tap. Promotion is how that gets fixed.
  2. **The current looks gate cannot judge the fix.** Slivers pass at 0 % straight and 0 % sharp. A condition would need a new measure first, and building one is follow-up work.
  3. **No lesson imports the library today.** Promotion to the kit does not put anything in front of a learner by itself.
- **Why not a pure follow-up either.** Promotion makes import easy, and the defects land on named lessons. So:
  - **Import block, extra crossings (a):** no lesson that draws arbitrary diagrams (random-knot) imports `layout`/`draw` until one of two things has happened:
    1. the follow-up fixes it;
    2. the library offers a check the lesson can use to detect and redraw a non-planar result, and the lesson uses it.
  - **Import block, bigons (b):** no lesson that draws 3_1 or 4_1 with the default layout (tricolour-check, unknot-game) imports it until one of two things has happened:
    1. the follow-up fixes it, judged with a bigon-width or minimum-face-width check (evaluator gap 2 above);
    2. the design lead accepts the picture in writing, with cm-math-discrete consulted on the tricolour-check case.
  - draw-a-table-knot (5_2, readable) is not blocked.
  - **The follow-up is an EDD-sized engineering task for one rnd-engineer under the rnd-lead, not a generation.** The options are the rnd-lead's to choose, and I name them only so they are not lost:
    - a minimum bigon width in force-smooth's own forces;
    - shipping a stored layout with the table entries (a layout is plain data, and outside evolution this is a product choice, not table detection);
    - a hull-overlap repair.
  - **Size:** the follow-up must keep the random-knot entry ≤ 11,776 B.
- **Who enforces the import block.** I do not own gates. The block goes into the EDD as a usage restriction. Whether it becomes a mechanical check is the evaluation steward's and the principal engineer's call.

### Rule clarification (for evolution.md, the next time the rnd-lead edits it)

- **More seeds than 3 is allowed, and all of them count.** But the number of runs is fixed in the brief or the record **before the first official run**, not after it.
- If the lead later wants more seeds, all runs count, and the verdict is reported both on the pre-declared N and on the extension. If the two disagree, the pre-declared N decides the stop rule.
- **At selection, when two gated-in candidates differ by less than the noise floor on paired differences, the record says "tie" and selects on stated evidence outside the score.** It does not call a median-score difference a win.
- Gen 2 followed the text as it stood, so none of this is retroactive.

### Bet status after this ruling

- **Knots layout evolution: closed after gen 2.** No generations left, and none may run without a new VP decision.
- **The bet moves to promotion (W-162).** Its next status change triggers an R&D Review (README, "Ritual").
