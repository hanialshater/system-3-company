# Fact-check: push-the-swing-in-time, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A swing has its own rhythm, set by its length: a 2.0 s period needs a ... | verified | L = g T^2/(4 pi^2) = 0.994 m for T = 2.0 s ("0.99 m"). |
| c2 Shoving every 2 s, each shove meets the swing moving forward and adds;... | verified | Re-ran the lesson's damped-oscillator model (Euler-Cromer, dt = 1/2400 s; w = pi rad/s, zeta 0.01, kick = 4 degrees' worth): 8 shoves every 2 s reach 25.55 degrees (reveal prints 26). Same with dt = 1/50000: 25.55. Analytic envelope of 8 in-phase kicks with the same damping: about 26. The model is deterministic (no seeds). Robustness over the illustrative parameters: damping zeta 0.001-0.05 and kick 2-8 degrees: the in-step rhythm always ends far above the others (6.3 to 62.5 degrees versus 1.9 to 8). Also a full nonlinear pendulum (sin theta) with the same kicks: 25.68 degrees, so the small-angle shortcut costs 0.1 degree. |
| c3 Shoving every 1 s or every 3 s, every other shove hits the swing comin... | verified | Every 1 s or 3 s: 3.94 degrees in the lesson's model (3.94 with fine dt; 3.94 nonlinear). Each second shove meets the swing moving backward through the bottom and cancels the first. Claim says "about 4 degrees"; the stage text says 3.9; both fine. |
| c4 Driving a lightly damped oscillator in step with its natural period bu... | verified | Driven damped oscillator resonance; HRW ch. 15 (forced oscillations and resonance) is the right locator. |
| c5 Model: small swings, light friction, equal brief forward shoves, playe... | verified | Stated scope. At 26 degrees the exact pendulum period is 1.3% longer than small-angle (series), so "about 1%" is a touch low (1.3%); immaterial to the lesson, and the nonlinear re-run above confirms the result. |

Disputed: none. Withdrawn: none.

Recall (3 s swing -> push every 3 s, not every 1.5 s) is the same resonance statement, correct. Caveat not claimed in the lesson: pushing at a subharmonic (every 4 s, every second swing) would also add, because the model's shoves always point the same way; the lesson only compares 1, 2 and 3 s and says "out of step" shoves undo each other, which is true for those three rhythms. Reveal read from Demo.tsx (not unlocked in the walkthrough).

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
