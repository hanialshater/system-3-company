# Build note: probing-clusters-grow (demo-builder, algo-builder session, 2026-10-14)

- Design intent: 10 slots with 2, 3, 4, 7 full; bands under the slots show each empty slot's catch area (n/10), updated after each insert; the probe walk is drawn as an arrow.
- Seed: hash values from mulberry32 seed 2, CHOSEN from seeds 1-8 because its 2nd and 3rd keys fall inside the 2-4 run. Disclosed in claim c5.
- Reveal gate: longest full run reaches 5. 'Until a run of 5' is the QA path; 'Fill the table' shows probes growing (2, 3, 5, 5, 3, 6).
- Known: the wrap-around probe arrow runs to the right edge instead of wrapping to slot 0.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.

## Revision v2 (batch 02, 2026-10-14)

Catch-area bands and n/10 chances are hidden until the prediction is committed. A log shows every key as hash -> slot (probes), so the reveal's quoted hashes are on screen. Button renamed "Until a run of 5 or more". Title and hook rewritten so they do not state the idea.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.
