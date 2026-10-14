# Build note: fall-distance-squares

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: an 80 m cliff on a true scale with a depth ruler; one strip per whole second (4.9, 14.7, 24.5, 34.3 m), alternately shaded and labelled, so 1 : 3 : 5 : 7 is seen as strip lengths. "Watch it fall" replays the drop in real time, the strips appearing as each second ends.
- Departure from the brief: a 1-4 s slider instead of three presses of "add one second", because QA presses each control once (slider two steps from 1 s reaches 3 s). The slider still adds one second per step.
- Earned reveal: milestone 'three-seconds' (stack at 3 s or more). Strips, stone position and total hidden until the prediction.
- After screenshots: the QA reveal screenshot catches a replay mid-fall (3.3 m); the reveal text quotes the 3 s stack the learner built, not the replay frame. Left as is.

## Revision v2

Findings from 2026-10-14-learner-adult-beginner.md (revise).

Strip labels read as totals: now 'second 2: +14.7 m (total 19.6)'. Reveal said 'your stack passed 44.1 m' while a replay froze mid-fall: it now states the 3 s values without claiming what the stage shows at that moment. Hint says each strip is the distance during that second. Not done: forcing one-second-at-a-time slider steps (the labels now make a jump harmless). No claim text changed.

Kept `curriculum`; `format` set to single-card if it was missing. Version bumped to 2.
