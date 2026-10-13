# Fact-check: dropped-vs-fired-ball, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Without air drag, a ball's fall depends only on gravity and the height... | verified | Independence of x and y motion with only weight acting (no drag): y = h - g t^2/2 for both. Re-integrated numerically (dt = 1e-5 s, no drag): both hit the ground at 2.0193 s. |
| c2 From 20 m, both balls land 2.02 s after release (g = 9.81 m/s^2). | verified | sqrt(40/9.81) = 2.0193 s ("2.02"). |
| c3 Fired at 15 m/s, the ball lands 30.3 m from the foot of the cliff; the... | verified | Ranges 5,10,15,20,25 m/s: 10.10, 20.19, 30.29, 40.39, 50.48 -> 10.1, 20.2, 30.3, 40.4, 50.5 m after rounding. All match. |
| c4 The lesson ignores air drag; with drag the fast ball would be slowed a... | verified | Added a drag term to my own integrator (k = 0.0013 /m, roughly a small dense ball): dropped lands 2.028 s, fired at 15 m/s lands 2.035 s and 29.87 m out, so drag makes a small difference as the claim says. Locator Taylor ch. 2 is right (projectile motion with air resistance). |
| c5 Gravity pulls only downwards, so it changes the vertical motion and le... | verified | Weight has no horizontal component, so horizontal velocity is constant. |

Disputed: none. Withdrawn: none.

Recall (bullet fired level vs dropped bullet land together, ignoring air) correct. Deterministic; no seeds involved.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
