# Build note: two-pointers-meet (demo-builder, algo-builder session, 2026-10-14)

- Design intent: the sorted list is the top edge of the 28-pair triangle grid (row = left number, column = right number), so the list and the grid are one picture. Too-small sums grey out a whole row.
- Deviation: no separate 'sum' button; the sum shows after every move. Moves against the rule are refused with the reason. 'Follow the rule' finishes the search (QA path).
- Reveal gate: 4 + 15 = 19 reached.
- After screenshots: the grid footer was clipped; viewBox made taller.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.
