# Exploratory QA: price-floor-glut

date: 2026-10-14 · by: qa-tester (Rosa) · build: .next-qa2 · Playwright script (artifacts, not committed)

Phone 320x640 with touch; wrong-order taps, double taps, keyboard only, reload.

- 320px load: horizontal overflow 0px, phase predict
- force-click locked control before predict: stage text unchanged, phase predict
- reveal before predict: 0 reveal nodes, 0 buttons
- keyboard select option: commit enabled
- after double-tap commit: phase explore
- after keyboard on 1 controls: reveal button disabled
- reload: phase predict (state reset), overflow 0px
- page errors: none

Follow-up: with a keyboard, Arrow/End on the slider left the reveal disabled until the price reached $8. The on-screen hint says "Raise the lowest legal price to $8", so this is by design, not a dead control. Observation only: a learner who ignores the hint sees a disabled button with no other cue.

Result: no defects found. A passing run is not evidence of learning.
