# Build note: shortest-job-first-wait (demo-builder, algo-builder session, 2026-10-14)

- Design intent: queue of 4 job buttons over a timeline (one row per job, shaded = waiting); total wait under it.
- Deviation: tap a job to move it one place earlier instead of drag. 'Longest first' and 'Shortest first' buttons are the QA path.
- Reveal gate: total wait 11.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.

## Revision v2

Review 2026-10-14: the hook stated the 3x ratio. Hook reworded to a neutral question. No code change. Known gap: starvation (c4) is told, not shown.
