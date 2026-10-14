# Build note: steeper-is-not-taller (demo-builder, 2026-10-13)

- Intent: ramps A (3 over 12) and B (2 over 4) on one square grid from the same foot; an Across slider (step 2) moves an upright line and reads each ramp's climb; B continues dashed as "if it kept going".
- Key state: the line at 4 across (A 1, B 2). Readouts "?" while locked.
- Deviation from brief: the hidden-track car-speed matching game was dropped (needs drag and a second representation).
- After screenshots: the "B, if it kept going" label sat on its own dashed line; moved above the grid.
- All numbers recomputed with node; all claims unverified, for the fact-checker.


## Revision v2

Review: title stated the answer; reveal quoted 4 across, which the slider could skip. Changes: title and hook neutral; buttons Line at 4 across and Line at 12 across, both required; B's dashed extension hidden while locked. c3 unverified. Version 2.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: Locked stage shows only the grid, ground and the shared foot; ramps appear after the prediction. Hook neutral.
- Claims reopened (status unverified): new c4.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.
