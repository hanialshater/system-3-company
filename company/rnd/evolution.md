# Code evolution: how R&D works

owner: rnd-lead (Bram) · reports to: vp-rnd (Vera) · since 2026-10-13 (founder: "R&D should be multiple collaborative agents, because we are basically doing code evolution")

R&D work is search, not construction. For a library like the knot library, the hard parts have many possible approaches, and the best one is found by trying several and keeping what scores best:
- laying out an arbitrary diagram cleanly;
- simplifying hard unknots;
- computing Jones fast;
- keeping the bundle small.

So each R&D project runs as a **population of variants**, written by several R&D engineers in parallel and scored by a **fixed evaluator** that none of them can edit.

## Roles in a generation
| Who | Does | May not |
|---|---|---|
| **rnd-lead** | Owns the evaluator: `src/lab/<p>/test/` (the correctness tests), `bench.mjs` (the quality metrics) and `evolve.json` (weights and budget). Writes each generation's brief: which part to evolve, the parents, the mutation ideas. Selects survivors. | Write candidates in the generation they judge |
| **rnd-engineer × N** (3–5 per generation) | Each writes one candidate, `src/lab/<p>/candidates/<gen>-<name>/`: a full copy of the library source with one distinct idea (mutation), or a **crossover** that combines two parents' strengths. Each writes a short `NOTES.md`: the idea, what it changes, what it expects. | Edit tests, the bench or the evaluator, or read another candidate's code during the same generation (independence) |
| **research-scientist** (when useful) | Feeds ideas into the next generation from papers and prior art | |
| **principal-engineer** | Reviews the final winner before promotion into `src/kit/` (EDD) | |

## The loop
1. **Seed (generation 0):** one engineer builds a working baseline, and the lead fixes the evaluator around it. The evaluator's tests check correctness against published values. They are the gate, not the goal.
2. **Generation brief:** the lead names the target (e.g. "diagram layout for arbitrary PD codes: fewer edge crossings, more even spacing") and the **diversity rule**: every engineer gets a different approach to try. For layout, that might be Tutte embedding, force-directed, orthogonal, or a circle-packing start.
3. **Variants in parallel:** each engineer works in its own worktree and writes its candidate.
4. **Score:** `node tools/evolve.mjs eval <p>`. A candidate scores 0 unless every test passes and it fits the gzip budget. After that the score is the weighted tests, size and bench metrics. Results append to `company/rnd/evolution/<p>.jsonl`.
5. **Select and recombine:** `node tools/evolve.mjs board <p>`. The lead keeps the top 2–3. The next generation gets mutations of the best, plus at least one crossover. Parents are recorded in `evolve.json` so the lineage shows in the archive.
6. **Stop** ([decision 2026-10-14](../decisions/2026-10-14-evolution-stop-rule.md)) when the generation fails the improvement test below, or when the bet's generation budget (default 4, set in README.md) is spent. Then run `node tools/evolve.mjs promote <p> <id>`, and the EDD and engineering review follow.
   - **Scoring for the test.** Score the generation's best candidate **and the current champion** in the same `eval` runs, on at least 3 fresh seeds. Every run counts: no re-drawn or dropped seeds, and record the load average for each run.
   - **Paired gain.** For each seed, g = score(best) − score(champion).
   - **Threshold.** T = max(2% × the champion's median evolvable term E, noise floor).
     - E = score − weights.tests × tests passed, which is the bench term plus the size term.
     - The noise floor is half the range of the gen-0 baseline's E over at least 3 seeds, recorded in the gen-0 record. It is 15 points for knots.
     - If weights change between generations, re-measure the floor on the champion, and the larger floor applies.
   - **Improvement test.** The generation counts as an improvement only if the median g ≥ T **and** g > 0 on every seed. With more than 3 seeds, g > 0 on at least 80% of seeds is enough.
   - **Record.** The lead puts the table (seeds, g, median, T, verdict) in the generation record, and the VP checks it before the next generation is dispatched. Passing never extends the budget.
7. **Record:** a short generation record in `company/rnd/evolution/<p>-gen<N>.md` lists the variants, scores, the winner, and what was learned, including the ideas that lost and why. These records feed the R&D Review.

## Evaluator mechanics (tools/evolve.mjs; see knots-gen0.md for the reasons)
- **Seed.** Each `eval` run draws one bench seed (`EVOLVE_SEED`, or `--seed=N`) for every candidate in it, and records it in the archive. Bench inputs must be generated or disguised from that seed by evaluator code that does not call the candidate. The board ranks each candidate's latest run, and warns when the seeds differ.
- **Size.** `sizeEntries` are evaluator-owned lesson programs in `test/lessons/`. Each is measured as the gzip of its real module closure (found by Node's loader) with comments and whitespace stripped, and each must fit `sizeBudgetGzBytes`. A project without `sizeEntries` keeps the old raw whole-library gate.
- **Weights and frozen files.** `benchWeights` weights each metric. `mutable` names the files a generation may change; every other file must equal a parent's, and candidates must be listed in `parents`.
- **Self-test.** `node tools/evolve.mjs selftest` checks the harness after any change to it.

## Rules
- **The evaluator is fixed within a generation.** If the lead changes the tests or the weights, every surviving candidate is re-scored before selection.
- **Diversity over polish:** two candidates with the same idea waste a slot.
- **No Goodhart:** a candidate that games the bench, for example by special-casing the test knots, is disqualified, and the lead adds a test that closes the gap.
- **Budget:** a generation is 3–5 agents. The VP sets the generation budget per bet in `company/rnd/README.md`.
