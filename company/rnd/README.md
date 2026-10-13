# R&D and Research (floor 4)

owner: vp-rnd (Vera, CEO office) · since 2026-10-13 (founder request)

There are two orgs, and both report to the VP of R&D in the CEO office:

| Org | Lead | Members | Makes |
|---|---|---|---|
| **R&D** | rnd-lead (Bram) | rnd-engineer (one per project) | Libraries and engines that make new kinds of lesson possible: knot theory, agent-based simulation, and others |
| **Research** | research-lead (Wen) | research-scientist (one per question), researcher (learning and teaching) | Domain science (what is true and teachable) and learning science (misconceptions, recall), as sourced notes in `company/research/notes/` |

## From lab to lesson
1. **Bet:** the VP adds a project to the bet list below, with a user (which briefs or lessons need it) and an exit criterion.
2. **Lab:** an R&D engineer builds it in `src/lab/<name>/`. That means plain JavaScript (ESM) with JSDoc types or a `.d.ts`, no dependencies, tests run by `node --test`, and a README covering the API, examples, budget, prior art and licences.
   - Lessons may **not** import from `src/lab/`.
3. **Promote:** the R&D lead writes an EDD (`company/engineering/edd/`). The principal engineer reviews it, because this is a tier-2 change. The library then moves to `src/kit/<name>/`, and lessons can use it.
4. **Use:** a category manager writes the briefs, a designer specs them, and builders build them.

**Budget:** a lesson is ≤ 15 KB of its own code. A kit library should cost a lesson ≤ 10 KB gzipped for what it imports, so keep it tree-shakeable.

## How R&D works: code evolution
Several R&D engineers write competing variants in parallel, and a fixed evaluator owned by the R&D lead scores them (`tools/evolve.mjs`). The best are kept and recombined over a few generations. See [evolution.md](evolution.md). Each bet below has a generation budget (default 4 generations of 3–5 agents).

## Bet list
| Bet | Org | Needed by | Exit criterion | Status |
|---|---|---|---|---|
| Knot theory JS library | R&D (+ Research for which invariants are teachable) | Knot theory lessons (math discrete strand), Life Hacks knots | Draws the knots up to 7 crossings from a table; computes crossing data, writhe, linking number, tricolourability, the Alexander and Jones polynomials, matching published values; supports Reidemeister moves on a diagram; ≤ 10 KB gzipped for a typical lesson | started 2026-10-13 |
| Agent-based simulation engine | R&D | Schelling lessons (mild-preferences-sharp-divides, schelling-on-new-york) | Promote after both lessons ship (rule of two) | waiting on the two lessons |

## Ritual
**R&D Review** (`company/rituals/templates/rnd-review.md`). It runs when a bet changes status, every 14 days, or when an incident touches lab code. The VP chairs. The two leads present, and the principal engineer and the design lead attend.
