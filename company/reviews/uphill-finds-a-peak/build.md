# Build note: uphill-finds-a-peak (demo-builder, algo-builder session, 2026-10-14)

- Design intent: 7 face-down cards; only the middle card and its right neighbour can be turned; turned cards show a bar for their height; keep left/right (downhill refused); 'Finish by the rule' is the QA path.
- Deviation: brief says 'tap a card to turn it'; I only let the two cards the rule needs be turned, so QA (and a learner) cannot just turn everything.
- Hidden order 2 5 1 4 7 3 6 written for the lesson: 4 turns, ends on 6, a peak that is not the maximum (claim c1).
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.
