# Build note: push-the-swing-in-time

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: three rhythm buttons (the three options), each a 1-3 s time-lapse (8x) of 8 forward kicks on a damped small-angle oscillator; green/red dots show shoves that added vs met the swing coming back; arc shows the highest reach.
- Earned reveal: milestone 'resonant-run' at the end of the 2 s run. Buttons are disabled while a run plays, so QA's first press (Every 2 s) completes; there is no separate step button (runs are short).
- After screenshots: a grey 'from still' dot was unexplained; shoves from still now count as green (they add energy).

## Revision v2

Findings from 2026-10-13-learner-adult-beginner.md (revise).

Hook 'or does timing?' leaked: now 'Which rhythm builds the biggest swing?'. Hint explains green and red dots. The three runs' highest swings sit side by side as readouts ('not tried' until run); the rope readout is gone. The reveal no longer quotes rhythms the learner did not run. The gate stays at the 2 s run: QA cannot press the other two while a run plays.

Kept `curriculum`; `format` set to single-card if it was missing. Version bumped to 2.
