# Build note: caesar-falls-to-frequency (demo-builder, algo-builder session, 2026-10-14)

- Design intent: one card with the message on top and its 26 letter-count bars below; a 'shift back' dial (slider plus -1/+1) moves the text and bars together; E's column is outlined.
- Reveal gate: reaching shift 19 (text reads). 'Tallest bar to E' does the frequency attack in one tap and is the QA path.
- Deviation: the message is 94 letters, not about 120, to stay near the stage text budget. It was written for the lesson and over-represents E (23 of 94); disclosed in claim c3.
- After screenshots: the tallest off-E bar used the domain green, the same as 'good'; it now uses the warn colour.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.
