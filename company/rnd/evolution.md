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
6. **Stop:** when a generation improves the best score by less than 2%, or after the bet's generation budget (default 4). Then `node tools/evolve.mjs promote <p> <id>`, and the EDD and engineering review follow.
7. **Record:** a short generation record in `company/rnd/evolution/<p>-gen<N>.md` lists the variants, scores, the winner, and what was learned, including the ideas that lost and why. These records feed the R&D Review.

## Rules
- **The evaluator is fixed within a generation.** If the lead changes the tests or the weights, every surviving candidate is re-scored before selection.
- **Diversity over polish:** two candidates with the same idea waste a slot.
- **No Goodhart:** a candidate that games the bench, for example by special-casing the test knots, is disqualified, and the lead adds a test that closes the gap.
- **Budget:** a generation is 3–5 agents. The VP sets the generation budget per bet in `company/rnd/README.md`.
