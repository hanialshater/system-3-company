# Fact-check: ball-at-the-top (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node: v(1.3) = 1.947, v(1.4) = 0.966, v(1.5) = -0.015, v(1.6) = -0.996, shown by signed() as +1.95, +0.97, −0.02, −1.00; every 0.1 s step from 0 to 2.9 s drops v by 0.981 (DV shown as 0.98). Reveal takes max of visited ups (v > 0.05) and min of downs (v < -0.05). |
| c4 | verified | Own derivation: a = dv/dt, and the force on the ball depends only on its state (position, velocity). If that force were zero at the top state (v = 0), staying at the top would solve the equation of motion, and by uniqueness it would be the motion: the velocity stops changing and the ball hangs. Reveal sentence matches the claim. |

**Result:** every claim in this pass verified.
