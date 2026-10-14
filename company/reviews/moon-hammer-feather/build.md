# Build note: moon-hammer-feather

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: side-by-side fall with 0.2 s freeze frames and level lines; air is an imagined toggle (Moon g, Earth-like air) so g stays fixed and only air changes. RK4 with quadratic drag; drag values are illustrative and labelled so in claims.
- Earned reveal: unlocks only when an airless drop has landed.
- After screenshots: objects were drawn with their reference point mid-body, so they sank through the floor at landing and the '1.5 m' label was struck through by the release line; objects now rest on their lowest point and the label sits above the line. Fixed a landing-time interpolation bug found by the check script (1.3617 vs 1.3608 s).

## Revision v2

Findings from 2026-10-13-learner-adult-beginner.md (revise).

'Air: off' looked like a status: the button now says 'Add air' / 'Take air away'. Readouts are 'Hammer lands at' / 'Feather lands at' with 'not yet'. Objects labelled. Hint is ordered (no air first, then air). Reveal quotes any air drop the learner ran. Not changed: feather art and a feather mass (would need a new claim). The gate was a driver limit; QA presses Drop and waits for the landing.

Kept `curriculum`; `format` set to single-card if it was missing. Version bumped to 2.
