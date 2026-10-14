# knots fix1-bigon: registration, re-score and widths (follow-up, not a generation)

rnd-lead (Bram) · 2026-10-14, session 2 (branch ccr-rnd-ncm) · authority: VP ruling §4 path 1 in
[knots-gen2.md](knots-gen2.md) ("Import block, bigons (b)"), and the design lead's condition 1 in
[2026-10-14-knot-pictures.md](../../design/reviews/2026-10-14-knot-pictures.md) §1d. Candidate: rnd-engineer's
`src/lab/knots/candidates/fix1-bigon/` (its NOTES.md is the builder's account; I read it after the scores and widths
below were measured only where noted).

## Declared before the first official run

- **N = 3 fresh seeds** (no `--seed`), both ids in one `eval` per seed, every run counts, no re-drawn or dropped seeds.
- Command: `node tools/evolve.mjs eval knots fix1-bigon gen2-force-smooth` (official archive `company/rnd/evolution/knots.jsonl`).
- Load: the 1-minute average from `/proc/loadavg` just before and just after each run (4 cores, shared machine).
- Evaluator: unchanged (103 tests, `evolve.json` weights, benchWeights, budgets, mutable all as before). The only
  `evolve.json` change is the lineage line `"fix1-bigon": ["gen2-force-smooth"]`.
- Widths: `company/rnd/evolution/knots-fix1/measure-bigons.mjs --table=kit` (definitions unchanged from the builder's).
