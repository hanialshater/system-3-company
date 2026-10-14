# Build note: puck-on-ice-no-push

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: four lanes (friction high/medium/low/none), one tap-to-slide button per lane; ghost dots once a second make constant speed visible as even spacing. Buttons instead of the brief's slider so 'none' is one tap, not a slider end.
- Earned reveal: unlocks only when the no-friction run has finished AND another lane has been run (the comparison).
- After screenshots: the '20.0 m' label clipped above the lane and sat on the puck; moved it left of the puck with a halo. Removed a reveal number (1 m/s after 10 s) that the stage never shows.

## Revision v2

Findings from 2026-10-13-learner-adult-beginner.md (revise).

Pucks started at different moments made Low look ahead of None. One button now starts all four together; lane names are labels, not buttons; the reveal unlocks when the race ends. The caption no longer says 'nobody pushes' before the frictionless lane is seen; it explains that equal dot gaps mean steady speed. Not done: a friction arrow.

Kept `curriculum`; `format` set to single-card if it was missing. Version bumped to 2.


## Revision v3

Phone reveal: the lanes clipped at about 15 m. Cause: the reveal-phase rule '.stage .stage-svg {flex: none; height: auto}' (globals.css) let each lane svg keep its natural width. Fixed with !important on .track flex and width; probe at Pixel 7: stage scrollWidth 362 = clientWidth 362, 20.0 m label and the 20 m tick are visible at the reveal.

QA (QA_ONLY, phone and desktop) passes; I looked at the walkthrough sheet. Edited claims are unverified.
