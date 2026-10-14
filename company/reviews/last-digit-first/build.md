# Build note: last-digit-first (algo-pair-09, 2026-10-14)

Built from brief #14 and the wireframe company/design/specs/last-digit-first.svg (no spec .md existed). Three pass buttons (one press = deal + collect), then an Order toggle that restarts first-digit-first and keeps each finished run's result on stage. Reveal unlocks after the third pass; it quotes only runs finished. No tap-each-card step (the wireframe uses pass buttons). Neighbour marks < / > show order after each pass.
Answers re-run in node (both orders, 20,000 random lists). All claims unverified.
Skipped (machine out of memory, coordinator order): next build, tsc, QA, walkthrough. Only `npm run check` run. Risk: untested typing and visuals; stage text near the 25-word budget at its peak.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: Two rows of pass buttons (last-first, first-first), each its own run; gate needs both runs finished. On a third pass the first bucket with two cards is ringed with 'Tie in bucket N: kept the order earlier passes gave it'. 'Flip the order' sentence removed. Retitled 'Sort by the last digit first?'.
- Claims reopened (status unverified): c2, c3.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.

## v4 (2026-10-14)
W-202: reveal names the tie bucket and cards from the last-digit-first pass-3 buckets and the first out-of-order pair from the first-digit-first ending, instead of pointing at the stage (c2, c3).
