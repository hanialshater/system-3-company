# Build note: race-down-the-ramp

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view, two parallel lanes on one 30 degree, 2 m ramp; a solid disc (filled) and a thin hoop (ring) roll with a spoke so the spin is visible. Positions follow x = a t^2 / 2 with a = g sin 30 / (1 + k). The race plays at a third of real speed with a clock in real seconds marked "slow-mo"; finishing times appear at each lane's end and in the readouts.
- Controls (DOM order): "Make hoop 2 kg" toggle (resets the race), Release (becomes "Race again"), Jump to finish (step button, per the play-button rule; also guards the QA wait).
- Earned reveal: milestones 'mass' (hoop mass changed) and 'finished'. QA path: hoop -> 2 kg, Release, Jump to finish. The last screen shows a 2 kg hoop still losing to a 1 kg disc, 1.28 s vs 1.11 s. The reveal quotes both times and the hoop masses the learner actually raced.
- Departure from the brief: the brief had many shapes and no text; two shapes, a mass toggle and a one-line caption keep it to one comparison on a phone. "No slipping, no air drag" is on the locked stage.
- Numbers (node): disc 3.270 m/s^2, 1.106 s; hoop 2.453 m/s^2, 1.277 s; a frictionless slide would take 0.903 s (not shown).
- After screenshots: moved the finishing-time labels clear of the wheels and the ramp caption to the top left.

## Revision v2

Findings from 2026-10-13-learner-adult-beginner.md (revise).

The predicted race (hoop 1 kg, equal masses) now runs first. The hoop-mass button races at the other mass at once; the gate needs a finished 1 kg and 2 kg race, and both hoop times stay as readouts. A bar under each lane shows the spin share of energy (disc 33%, hoop 50%); claim c4 reworded, unverified.

Kept `curriculum`; `format` set to single-card if it was missing. Version bumped to 2.
