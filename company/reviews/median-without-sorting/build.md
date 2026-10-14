# Build note: median-without-sorting (demo-builder, algo-builder session, 2026-10-14)

- Design intent: 9 cards in positions 1-9 with position 5 outlined; Split partitions the current group around its first card; keep left/right (wrong side refused with the positions); dropped cards fade; 'Do the rest' finishes (QA path).
- Reveal gate: a pivot lands in position 5.
- Claim c5 (3,465 vs 11,003 on 1,000 cards) re-run over mulberry32 seeds 1-50 in node.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.
