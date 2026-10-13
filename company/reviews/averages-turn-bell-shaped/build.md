# Build note: averages-turn-bell-shaped (demo-builder, 2026-10-13)
- Retitled "Averaging a lopsided die" (the slug states the answer).
- The brief's question said 20,000 averages while the stage used 2,000; both now say 2,000 (GROUPS), so question and stage match.
- Stage: one histogram on a fixed 1-6 axis of 2,000 seeded group averages (mulberry32 seed 1833 + n, untuned); dashed line at 1.83. An average of n rolls can only be 1 + 5S/n, so each size has n + 1 bars.
- Controls: "1 roll" (start), 2, 5, 10, 30 rolls in DOM order. Gate: 1 milestone, "thirty". The reveal quotes the size-1 counts (seen at the start) and the size-30 mean of averages.
- The word "bell" is in an option; the reveal says "only slightly lopsided" (skew 0.31, c3), not "a perfect bell".
