# Knots, generation 0 record: the baseline and the evaluator fix

owner: rnd-lead (Bram) · 2026-10-14 · board: W-143 (evaluator review), W-144 (size gate) · archive: `knots.jsonl`

## Score

| | evaluator | tests | size | bench term | score |
|---|---|---|---|---|---|
| before | gen-0 evaluator as shipped | 93/93 | 12,815 B gz, raw closure of `index.mjs`, against 10,240 | 308 (unweighted sum) | **0, gated out** |
| after | fixed evaluator (this record), seed 437101337 | 101/101 | mean lesson 8,036 B (4 entries, stripped; max 10,986) | 331.91 (weighted) | **10,415.83** |

After the fix, gen 0's bench reads:

- layout: extra crossings 0, planar 100 %, spacing 8.78, crossing spread 38.83, aspect 94.28;
- hard unknots solved 73.33 %, crossings removed 80.35 %, no false unknots;
- Gordian 17.02 %;
- Jones correct, speed 83.43.

Seeds 1–3 give a hard-unknot share of 63–73 %, spread 29–38, and Gordian 18–23 %. The bench term moves by
about ±15 with the seed, which is why every candidate in a selection is scored in one run with one seed.

## What changed in the evaluator, and why

1. **Size gate: per lesson, not the whole library (W-144).** The old gate measured the raw source closure of
   `index.mjs` (12,815 B) against 10,240. A lesson never imports everything, and comments are not shipped, so
   no honest variant of this scope could pass, while a variant that dropped features or comments would.
   - **Entries.** `evolve.json` now lists four lesson entries (`sizeEntries`), which are evaluator-owned programs in `test/lessons/`:
     - draw a table knot, 5,093 B;
     - tricolour check, 9,353 B;
     - unknot game, 6,713 B;
     - random knot, 10,986 B.
   - **Measure.** Each entry is the gzip of its module closure after comment and whitespace stripping. The closure is found by Node's own loader through a load hook, so no import syntax can hide a module.
   - **Gates.** Each entry must fit `sizeBudgetGzBytes`, and the whole library must fit `budgetGzBytes` on the same measure. The size term in the score uses the mean entry.
   - **Lesson budget: 12,288, not 10,240.** The stripped closure is an upper bound: whole modules, no tree-shaking, no renaming. Measured against the real cost (terser plus tree-shaking, `size.mjs`), it runs 1.18× to 1.9× higher. So 12,288 B stripped means at most about 10.4 KB real, which is the README's ≤ 10 KB lesson rule within measurement slack. Gating 10,240 on the upper bound would have shut out the random-knot lesson, whose real cost is 7.3 KB.
   - **Whole-library budget: 16,384** (gen 0 is at 11,001). This is a ceiling against bloat, not a lesson budget.
   - **Checks.** A test (`test/lessons.test.mjs`) runs every entry, so a candidate cannot shrink an entry by breaking it. Dynamic `import()` and `require()` are refused, because they would hide size.
2. **Hard unknots (W-143).** The old set was 12 scrambled diagrams that gen 0 solved 100 %, so it measured nothing.
   - **HARD.** The new `test/benchdata.mjs` has **10 unknot diagrams of 9–15 crossings that admit no R1, R2 or R3 move at all**, so any simplification must add crossings first.
   - **How they were derived.**
     - Start from R1/R2-reduced projections of random 3-D walks.
     - Make each shadow alternating, then switch whole small-face components. This keeps every bigon and triangle alternating, so no move appears.
     - Keep a diagram if it is the unknot.
   - **Independent check (Regina 7.4.1, offline):** no R1/R2/R3 at any crossing; complement a solid torus (so each is the unknot); distinct knot signatures. Derivation seeds and method are in the file header.
   - **Decoys.** A 17-crossing **decoy** from the same construction has trivial Alexander polynomial but is knotted (Regina). Seeded sums HARD # 3_1 and HARD # 4_1 are also decoys. A simplifier that reports any of these below its true minimum pays −100.
   - **Monster and Gordian.** The monster unknot stays. Gordian is now disguised too.
3. **Messy layout set (W-143).** The old 20 fixed braid closures are replaced by 20 diagrams generated at bench time:
   - 12 projections of random 3-D polygons (8–20 crossings, with kinks and bigons left in);
   - 8 random braid closures on 3–5 strands.
   
   **New metrics:**
   - `layoutCrossingSpread`: closest crossing pair ÷ (size/√n). This is where the Tutte fallback's bunching shows; gen 0 scores 29–39 against 58 on the table knots.
   - `layoutAspect`;
   - `layoutSlowPenalty`.
   
   **Stricter metric:** extra crossings now count any intersection that is not near a crossing *both* strands belong to, including self-intersections. The old rule excused anything within 3 units of any crossing, which a layout could game by spreading crossings everywhere.
4. **No metric can be special-cased.** Every bench input is generated or disguised at bench time by evaluator code (`test/benchgen.mjs`), which never calls the library under test.
   - **Generator.** It has its own braid closure, projection, relabelling, mirror, reversal, connected sum, and a reference Jones state sum.
   - **Seed.** It comes from `EVOLVE_SEED`, which `evolve.mjs` draws fresh for each `eval` run and records in the archive.
   - **Jones.** The Jones bench is checked against the reference (−100 per wrong polynomial), and each timed call gets a freshly disguised diagram, so caching by input string buys nothing.
   - **Tests.** `test/benchgen.test.mjs` pins the generators to the library's conventions.
5. **Harness (tools/evolve.mjs).** All of these are backward compatible: a project without the new keys scores exactly as before.
   - **New keys:** `benchWeights` (per-metric weights; layout is weighted up for gen 1) and `mutable` (files a generation may change; others must match a parent byte for byte, and candidates must be registered in `parents`).
   - **Board.** The board ranks each candidate's latest record, not its best, because best-of-N over fresh seeds would select noise. It warns when the seeds differ.
   - **Commands:** `size` prints per-entry sizes, and `selftest` checks the harness itself:
     - stripper cases (strings, regexes, templates, ASI);
     - the size gates on a scratch project;
     - frozen files;
     - the knot tests passing on fully stripped source.

## What we learned

- **Hard-unknot difficulty.** Random unknots are easy for gen 0's `simplify`. It solved all 21 random 3-D cord unknots of 24–58 crossings and all 12 sums up to 142 crossings that I tried. Only structure makes an unknot hard: no move available at all. Even then, gen 0 solves most disguises of most of them, so the 30-instance share (63–73 %) is a real gradient.
- **Monotone search.** Exhaustive monotone search showed that the 11–13-crossing cord unknots all reach 0 without adding crossings. Search budgets of 3,000 diagrams had suggested otherwise. Budgeted searches are not proofs.
- **Seed matters to `simplify`.** On the Gordian unknot, gen 0 reaches 117 with seed 1 and 0 with seed 15 after restarts. Disguises change its trajectory, which is one more reason to score on many disguised instances.

## Open

- **arXiv.** The Burton et al. (arXiv:2104.14076) and Juhász et al. (arXiv:2409.09032) hard-unknot datasets are still unreachable (egress). Add them when access allows.
- **README.** The library README's baseline paragraph now points here. The gen-0 engineer's NOTES.md is history and is left as written.
