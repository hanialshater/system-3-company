# Build note: selfish-routes-cost-a-third-more

Builder: ncm-c · 2026-10-14 · from brief cs.systems, Course NCM #1 (single card, split slider drives live chart), accepted version.

- Road A 60 min; road B 60 × share. Average = 60 − 60x + 60x². Node grid search (scratchpad ncmc/check.mjs): minimum 45 at x = 0.5, ratio 60/45 = 1.333.
- Stage: one chart, average trip against share on B, current split marked; slider (0-100%, step 5, starts at 100% = the selfish equilibrium), presets "All on B (selfish)" and "Half on each", readouts for A, B and average. The note says at each split whether drivers on A want to switch, which stands for the selfish pull (the why).
- Milestones `tried-a-split` (any split below 100%), `found-best` (50%). QA's two slider presses reach the first; the "Half on each" preset reaches the second. The preset hands the answer over after the commitment; a slider-only gate would not be reachable by QA's one-press contract.
- The 4/3 bound is told in one claimed sentence (c4, Roughgarden and Tardos 2002); the externality is told in one claimed sentence (c3) and shown only indirectly (the average curve rises as B fills).
- Not run here: next build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 5 claims `unverified`.
