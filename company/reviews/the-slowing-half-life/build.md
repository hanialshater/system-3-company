# Build note: the-slowing-half-life
- Key state: second order halved twice (waits 10 then 20 min, milestone 'second-twice'), then first order halved twice (10, 10, milestone 'first-twice'). QA path: slider (two presses = two halvings) then the '1st order' chip.
- Design change from the brief: halvings on a slider (0-3) rather than a 'wait for half' button, so QA's two arrow presses land on the key state; the other order's curve stays as a dashed ghost so both curves share one chart.
- All times from timeTo() (1/[A] = 1/A0 + kt, k = 1/800 L/(mmol min)); question options computed from wait().
- After screenshots: 'mmol/L' collided with the 80 tick and then clipped; widened the left margin. Wait brackets alternate colour so adjacent waits read as separate.

## Revision v2

Review 2026-10-13: 'order' and k[A] undefined, the why told. Question defines half-life and second order (molecules must meet in pairs); buttons renamed; k[A] formula dropped; new 'Rate vs start' readout shows 1/4 per halving (2nd order) against 1/2 (1st order). c2, c4 reworded, unverified.
