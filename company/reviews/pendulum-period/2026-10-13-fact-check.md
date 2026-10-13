# Fact-check: pendulum-period, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c12+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c7 Gravity pulls 20 times harder on a 2 kg bob than on a 100 g bob, and t... | verified | Weight m g and inertia m both scale with m; 2 kg / 0.1 kg = 20. (Claims c1-c6 were verified by an earlier checker and not re-opened except where c7-c11 rely on them.) |
| c8 With a 20 degree release, a 1 m pendulum has a period of 2.02 s and a ... | verified | Re-ran the lesson's own RK4 equation (theta'' = -(g/L) sin theta, 20 degree release, step 1/20000 s, period from successive zero crossings) and the exact AGM formula: 0.25 m 1.0107 s, 1 m 2.0215 s, 1.75 m 2.6741 s, 2 m 2.8588 s. Both methods agree to 4 d.p. T(1)/T(0.25) = 2.000. Stage readouts (2.02, 2.67, 2.86) match. |
| c9 A playground swing that takes 3 seconds per back-and-forth with a chil... | verified | A swing is a compound pendulum, so the claim is an approximation. Modelling a 3 m-chain-length-equivalent swing with a 3 kg chain (uniform rod) and a point rider at the end: 25 kg child 2.947 s, 75 kg adult (3x heavier) 2.966 s, a 0.6% difference; the stated "about 3 seconds" and "twice as heavy" hold comfortably (the swing's effective length for a 3 s period is 2.24 m). |
| c10 The lesson's pendulum is ideal (point weight, light string, no air), s... | verified | The integrated equation has no mass term. Quadratic or linear drag acceleration scales as 1/m for a bob of fixed size, so the lighter bob loses amplitude faster: right. Stage labels IDEAL PENDULUM · NO AIR agree. |
| c11 A bob k times heavier is pulled k times harder by gravity and is k tim... | verified | Weight and inertia both scale linearly with m; the caption uses k = mass/100 g (400 g -> "pulled 4x harder, 4x harder to speed up") correctly. |

Disputed: none. Withdrawn: none.

Reveal numbers (2.02 s, 1.01 s at 0.25 m, 2.86 s at 2 m) re-derived. The predict text says "about 2 seconds" for an ideal 1 m pendulum: 2.0 (small angle) / 2.02 (20 degrees). Deterministic model, no seeds.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
