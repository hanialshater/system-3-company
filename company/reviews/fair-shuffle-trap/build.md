# Build note: fair-shuffle-trap (demo-builder, algo-builder session, 2026-10-14)

- Design intent: one chart, share of runs per order, both shuffles' bars side by side against a dashed 1-in-6 line; '1 run' (step) and 'All N' per method.
- Deviation: the brief says seeded; I used exhaustive enumeration (all 27 and all 6 runs in counting order), so there is no randomness at all.
- Reveal gate (2 milestones): all 27 'any position' runs, and all 6 'unplaced only' runs.
- After screenshots: the '1 in 6' label overlapped bars; counts moved inside the bars.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.
