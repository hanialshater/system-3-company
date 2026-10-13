# Fact-check: doubling-speed-braking, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 With a steady braking deceleration a, the braking distance is v^2 / (2... | verified | v^2 = 2 a d: d = v^2/(2a). |
| c2 At 5 m/s^2, braking from 30 km/h takes 6.9 m and from 60 km/h takes 27... | verified | 30 km/h: 6.94 m; 60: 27.78 m (4.00x); 90: 62.50 m (9.00x); 120: 111.11 m (16.00x); 75 km/h: 43.4 m, 6.25 blocks (all match the stage). |
| c3 Movement (kinetic) energy is 1/2 m v^2, so twice the speed carries fou... | verified | KE = 1/2 m v^2, so doubling v gives four times. |
| c4 The same brakes remove the same energy per metre: the braking force ti... | verified | Constant force F: F d = 1/2 m v^2, so d proportional to v^2. |
| c5 A deceleration of 5 m/s^2 is a typical hard-braking value on a dry roa... | verified | a = mu g = 4.9 m/s^2 for mu = 0.5. UK Highway Code braking distances 14 m at 30 mph and 75 m at 70 mph (rule 126 table, as I recall it; not re-fetched) imply 6.4 and 6.5 m/s^2. So 5 m/s^2 is on the low side of "typical dry-road hard braking" (modern cars with good tyres can exceed 8), and the claim says "not a universal one". The lesson's conclusion (distance goes as speed squared) does not depend on a. |
| c6 The lesson shows braking distance only; reaction distance (speed times... | verified | Scope statement; total stopping distance = reaction distance + braking distance, both rising with speed. Highway Code rule 126 is the right locator. |

Disputed: none. Withdrawn: none.

Recall (10 km/h in 1 m -> 30 km/h in 9 m) correct.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
6 verified, 0 disputed, 0 added unverified.
