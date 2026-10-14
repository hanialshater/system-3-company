# Build note: no-zip-shrinks-everything (demo-builder, algo-builder session, 2026-10-14)

- Design intent: 8 file tiles over 7 slots grouped by length (0, 1, 2 bits). Tap a file, tap a free slot; after each drop the next unplaced file is picked automatically, so pressing each slot once fills all 7 and strands one file.
- Deviation: tap-to-place instead of drag (drag is not on the QA path). Tapping a placed file takes it back.
- Reveal gate: all 7 slots full with one file left over.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.
