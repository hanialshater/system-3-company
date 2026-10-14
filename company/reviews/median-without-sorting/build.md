# Build note: median-without-sorting (demo-builder, algo-builder session, 2026-10-14)

- Design intent: 9 cards in positions 1-9 with position 5 outlined; Split partitions the current group around its first card; keep left/right (wrong side refused with the positions); dropped cards fade; 'Do the rest' finishes (QA path).
- Reveal gate: a pivot lands in position 5.
- Claim c5 (3,465 vs 11,003 on 1,000 cards) re-run over mulberry32 seeds 1-50 in node.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.

## Revision v2

Fact-check c5: 'about 3,300 comparisons against about 11,000' (claim and reveal), with the expectation formulas as the source. Hook no longer states the method.

## Revision v3

r2: the 17 vs 18 payoff was too small and the 18 was never produced. The deck is now 101 shuffled cards as bars (mulberry32 seed 38, a disclosed typical draw: 297 vs 619 comparisons; seed means 292 vs 640). New "Sort instead" button runs the quicksort and fills a second counter bar beside the median-search bar; the reveal needs both (minInteractions 2) and quotes only counts on the stage. Explore hint no longer states the method (N1). Dropped-cards list removed. "Do the rest" still finishes in one tap (QA path); manual Split/Keep takes about 16 presses. Claims c1, c2, c4 rewritten for the 101-card deck, unverified; c3 and c5 unchanged. durationSec 60.
