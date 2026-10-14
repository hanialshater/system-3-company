# Build note: duplicates-in-the-test

- Intent: one grid of 20 test items; copied items tinted and tagged "copy"; ✓/✗ per item (hidden while locked). Controls: "Score fresh items only" toggle (dims copies and unlocks the Fresh items readout), then a copied-share slider 0–50% step 10 (starts at the question's 20%). Readouts: Full test, Fresh items.
- Toy change from the brief: "guesses 50/50 on anything new" became "always says yes on new items, and half the true answers are yes" so the fresh score is exactly 50% on the stage (no seed luck). Fresh counts at every slider stop are even and fresh answers alternate yes/no.
- Key states (milestones): "fresh-only" (toggle on) and "share-moved" (slider off 20%). QA path: toggle, then slider (20 → 40).
- Reveal quotes the question's case (60% = 4 copies + 8/16 fresh), the fresh-only 50% if reached, and the last other share the learner visited with its full-test score (visible on the stage).
- Node check: scores(v) all = 0.5 + v/200 (50, 55, 60, 65, 70, 75%), fresh = 0.5 for v = 0..50.
- Seed: mulberry32(1) shuffle decides which cells are copies; untuned, layout only.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- "copy" tag: lighter/darker domain mix per theme (class copyTag); the dimming of copy items under "fresh only" now applies to the box only, so the tick/cross and tag stay at full contrast.
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

