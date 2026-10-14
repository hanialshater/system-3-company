# Build note: last-digit-first (algo-pair-09, 2026-10-14)

Built from brief #14 and the wireframe company/design/specs/last-digit-first.svg (no spec .md existed). Three pass buttons (one press = deal + collect), then an Order toggle that restarts first-digit-first and keeps each finished run's result on stage. Reveal unlocks after the third pass; it quotes only runs finished. No tap-each-card step (the wireframe uses pass buttons). Neighbour marks < / > show order after each pass.
Answers re-run in node (both orders, 20,000 random lists). All claims unverified.
Skipped (machine out of memory, coordinator order): next build, tsc, QA, walkthrough. Only `npm run check` run. Risk: untested typing and visuals; stage text near the 25-word budget at its peak.
