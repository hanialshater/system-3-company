# Decision: the evolution stop rule is measured on paired seeds, on the evolvable term, with a noise floor; knots runs generation 2

owner: vp-rnd (Vera) · date: 2026-10-14 · status: accepted · board: W-161 · inputs: [knots-gen0.md](../rnd/evolution/knots-gen0.md), [knots-gen1.md](../rnd/evolution/knots-gen1.md) ("Stop rule", "Gen 2 plan"), `src/lab/knots/evolve.json`, `company/rnd/evolution/knots.jsonl`

## Context
[evolution.md](../rnd/evolution.md) step 6 said to stop "when a generation improves the best score by less than 2 %". In knots, the score is `100 × tests + (−0.002 × mean lesson bytes) + bench`.
- The tests term is 10,100–10,200, and every gated-in candidate has the same tests term, because the gate requires all tests to pass.
- What evolution can change is the size term plus the bench term. Call that the **evolvable term**, E = score − weights.tests × tests passed. For gen1-force, E is about 337. For gen0-baseline, it is about 292 on the 102-test evaluator.
- So 2 % of the total is about 208 points, which is two-thirds of all of E. No generation can pass. The rule stops every project after one generation, whatever it learns. Bram (rnd-lead) raised this in the gen-1 record and correctly did not rescale the rule himself.
- Noise is real. The gen-0 record measured about ±15 points of bench movement across seeds for one candidate. In gen 1, gen1-force's paired gain over gen 0 ranged from 25 to 58 points across six seeds.
- "Relative to headroom" does not work here. The bench has no ceiling (`layoutSpacing` and `jonesSpeed` are unbounded), so headroom is not defined.

## Decision

### 1. The stop rule (replaces step 6 of evolution.md)
At selection, the lead scores the generation's candidates **and the current champion** (the previous generation's winner) in the same `eval` runs, on the evaluator of the generation being judged, with **at least 3 fresh seeds**. Every run counts. A seed may not be re-drawn or dropped, for load or any other reason, and the lead records the load average for each run.

- **Paired gain, per seed:** g_s = score(best candidate) − score(champion) in the same run. The best candidate is the one the lead selects, which must be gated in on every seed. When both pass all tests, this equals the difference in E.
- **Threshold:** T = max(2 % × median E of the champion, noise floor).
  - **Noise floor (knots): 15 points**, the seed noise recorded in knots-gen0.md.
  - For a new project, the floor is half the range of the gen-0 baseline's E over at least 3 seeds, written in its gen-0 record.
  - If the lead changes `weights` or `benchWeights` between generations, the lead re-measures the floor the same way on the champion, and the larger of the old and new floors applies.
- **The generation counts as an improvement only if both hold:**
  1. median over seeds of g_s ≥ T;
  2. g_s > 0 on **every** seed. With 3 seeds, a sign that is the same on every seed by chance alone has about a 1 in 8 chance.
- **Otherwise stop.** Promote the champion, or the new best if the lead judges the difference worth taking for reasons recorded outside the score (size or looks, for example). Then follow `evolve.mjs promote`, the EDD and the principal engineer's review.
- **The budget still caps everything.** Passing the rule never extends the generation budget set in [README.md](../rnd/README.md).
- **Who computes it:** the lead, in the generation record, as a table of seeds, g_s, the median, T and the verdict. The VP checks it before the next generation is dispatched.

### 2. Did gen 1 pass? Yes, clearly.
The champion is gen0-baseline. Paired gains come from `knots.jsonl`:

| evaluator | candidate | g_s on the three seeds | median | champion median E | T | verdict |
|---|---|---|---|---|---|---|
| 102 tests (re-scored, the evaluator in force) | gen1-force | 24.95 / 30.04 / 45.72 | **30.04** | 291.87 | max(5.84, 15) = **15** | **pass**: every seed > 0, median 2.0 × T, +10.3 % of E |
| 101 tests (as briefed) | gen1-ortho | 47.44 / 47.90 / 48.53 | 47.90 | about 300 | 15 | pass |
| 101 tests (as briefed) | gen1-force | 57.64 / 29.59 / 45.14 | 45.14 | about 300 | 15 | pass |

gen1-force's lowest gain (24.95) came from the run where it paid −11.71 in slowness under a load average of 20. That run counts, and it still passes.

### 3. Knots generation 2 goes ahead, with Bram's plan as amended below
- **Generation budget for the knots bet: 2 generations left after gen 1 (gen 2 and gen 3), out of the default 4.**
  - Gen 3 is dispatched only if gen 2 passes the rule above.
  - Gen 3 does not have to be layout. If layout passes but is visibly saturating, the lead may propose another target, such as hard-unknot `simplify` (60–77 % solved, a real gradient), in the gen-2 record.
  - After gen 3, the bet promotes whatever is champion. No further generations without a new VP decision.
- **Champion entering gen 2:** gen1-force.
- **Promotion (W-162) does not stop.** The rnd-lead keeps drafting the EDD on everything that does not depend on the layout winner: the API, Jones, `simplify`, and the SnapPy/GPL data provenance (W-145). The EDD goes to the principal engineer only after gen-2 selection, with the gen-2 winner's `draw.mjs`/`layout*.mjs`.
  - Reason: reviewing a layout that may be replaced within a day wastes the principal engineer's review.

### 4. What the gen-2 brief (`company/rnd/evolution/knots-gen2-brief.md`, rnd-lead) must contain
1. **Parents and slots:** gen1-force and gen1-ortho as parents, with exactly three slots, each with an idea the others may not use:
   - `gen2-ortho-force` (crossover): ortho's grid drawing as the start, relaxed by force's crossing-preserving moves on every diagram outside the packing branch.
   - `gen2-force-smooth` (mutation of force): one smooth curve per edge, an angle spring, and anisotropic 8-sector PrEd zones.
   - `gen2-ortho-round` (mutation of ortho): a packing branch for reduced diagrams where it is planar, ortho elsewhere, and flow-based compaction. **No force relaxation**, so it stays a distinct idea from the crossover.
2. **The looks gate, stated up front.** `test/draw.test.mjs`, "table knots look like the textbook": at most 30 % straight runs and at most 3 % sharp corners on every prime table knot. Gen-1 engineers were not told about it, and gen-2 engineers must be.
   - The brief repeats that keeping a round branch for reduced diagrams is general behaviour, but detecting the table is disqualifying.
3. **The evaluator, frozen for the generation:** 102 tests, `evolve.json` as it stands (weights, `benchWeights`, `sizeBudgetGzBytes` 12,288, `mutable`), and the ortho stretch allowed for every candidate.
4. **The bundle requirement, a selection condition and not a gate:**
   - The gen-2 **winner** must leave at least 512 B of headroom on every lesson entry. That means the random-knot entry must be ≤ 11,776 B, which is 12,288 − 512.
   - For `gen2-force-smooth`, that means shrinking the random-knot entry by **at least 319 B** from force's 12,095 B. Bram's 150 B is not enough: it would leave 340 B, which one bug fix can spend.
   - A candidate that misses this may still be a parent, but it is not promoted.
   - Any candidate that grows a lesson entry must say by how much, and why, in NOTES.md.
5. **The internal-objective rule (new from gen 2).** Any internal score a candidate optimises (for example, choosing an outer face, or keeping or dropping the packing) must be named in NOTES.md as a design goal in its own terms. It may not reproduce the bench's formulas or constants: spread and spacing as the bench computes them, the 1.5 cap, the weight 5, or the 4 % sampling radius.
   - The lead checks this in the gate audit. A copy of the evaluator disqualifies the candidate, as gaming does.
6. **Scoring:**
   - At least 3 `eval` runs on fresh seeds, each run scoring all gen-2 candidates **plus gen1-force** (the champion) and gen0-baseline (as a reference).
   - Every run counts, with the load average recorded.
   - The stop-rule table follows section 1 of this decision.
7. **Looks evidence:** the gen-2 record includes rendered pictures of 3_1, 4_1, 5_2 and the random 12-crossing knot (`randomKnot(20261014, {strands: 3, length: 12})`) from each gated-in candidate and the champion, kept as a file in the repo.
   - The looks gate is a floor and the bench does not see wiggle, so the pictures are part of selection.
8. **Independence:** separate worktrees, no reading of other gen-2 candidates, and no edits outside `mutable`.

## Objections, and what happened to each

- **Bram (rnd-lead), in knots-gen1.md: "Restate the rule as 2 % of the bench term."**
  - **What happened:** adopted in substance, with two changes.
    1. The denominator is the evolvable term E (bench plus size), not the bench term alone. Size is something evolution is asked to improve, and gen 2 asks a candidate to shrink, so the rule should see it.
    2. The bare version would have let noise through. 2 % of about 300 is about 6 points, below the ±15 seed noise. One lucky seed could have kept a project running. So I added the 15-point floor, paired same-run comparison against the champion, and the requirement that the sign agree on every seed.
  - At the current scale the floor, not the 2 %, is the binding term. That is intended.
- **Counter-objection (VP, against my own rule): "E has no natural scale. Percentages of it depend on weights the lead sets, so a lead could reweight to make gains look large."**
  - **Answer:** three guards.
    1. The comparison is paired on one evaluator, so reweighting moves the champion's score too.
    2. Reweighting between generations triggers a re-measured floor, and the larger floor applies.
    3. The VP checks the stop-rule table before dispatch.
  - What is left is a lead who changes weights *and* the floor in their favour. That would have to happen in a recorded generation record, in the open, which is where we can catch it.
- **Counter-objection (anticipated, from the bet-cost side): "Gen 1's force already draws good pictures. Another generation is a library growing for its own sake."**
  - **Answer:** partly right, which is why the budget is capped at 2 and gen 3 needs gen 2 to pass.
  - Gen 2 pays for real defects that lessons will feel:
    - the random-knot lesson has 190 B of headroom;
    - force's wiggle on random knots;
    - force's exposure to slowness under load.
  - It is one generation of 3 agents. If none of the three beats force by the rule, we promote force with a better-understood design space.
- **Counter-objection (anticipated): "Holding the principal engineer's review delays lessons."**
  - **Answer:** no lesson can import `src/lab/` either way. The EDD keeps moving on everything except layout, and gen 2 is about a day of wall time. If gen 2 slips more than 2 days past dispatch, the rnd-lead sends the EDD with gen1-force and gen 2 becomes a follow-up EDD.
- **Counter-objection (anticipated): "Requiring g_s > 0 on every seed is too strict. One bad seed vetoes a real gain."**
  - **Answer:** with only 3 seeds, the median alone is easily moved by one seed. A real gain that is larger than the noise floor should not lose to the champion on any seed. If it does, the lead may run more seeds (all of them count). The rule then becomes: positive on at least 80 % of seeds, and median ≥ T.

## Would be wrong if
- **Too strict.** A generation that fails this rule is later shown to have been a real improvement: the next generation's champion re-scored against it on ≥ 5 seeds gains ≥ T.
- **Too loose.** A generation that passes is shown to be noise: a ≥ 5-seed re-run puts the gain under the floor.
- **Gen 2 wastes its slots.** No gen-2 candidate passes the looks gate and the bundle condition, and the pictures show nothing better than force. Then gen 2 was layout polish we did not need, and the R&D Review should say so.
