# Build note: puck-on-ice-no-push

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: four lanes (friction high/medium/low/none), one tap-to-slide button per lane; ghost dots once a second make constant speed visible as even spacing. Buttons instead of the brief's slider so 'none' is one tap, not a slider end.
- Earned reveal: unlocks only when the no-friction run has finished AND another lane has been run (the comparison).
- After screenshots: the '20.0 m' label clipped above the lane and sat on the puck; moved it left of the puck with a halo. Removed a reveal number (1 m/s after 10 s) that the stage never shows.

## Revision v2

Findings from 2026-10-13-learner-adult-beginner.md (revise).

Pucks started at different moments made Low look ahead of None. One button now starts all four together; lane names are labels, not buttons; the reveal unlocks when the race ends. The caption no longer says 'nobody pushes' before the frictionless lane is seen; it explains that equal dot gaps mean steady speed. Not done: a friction arrow.

Kept `curriculum`; `format` set to single-card if it was missing. Version bumped to 2.
