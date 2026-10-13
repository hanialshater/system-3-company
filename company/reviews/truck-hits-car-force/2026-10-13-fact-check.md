# Fact-check: truck-hits-car-force, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 When two objects push on each other, each feels a force of the same si... | verified | Newton III: equal and opposite at every instant for contact forces. Standard. |
| c2 The same force changes the 1,000 kg car's velocity ten times as much a... | verified | The same impulse changes velocity inversely with mass, so ratio = m_truck/m_car = 10 for the 10,000 kg truck. Re-ran the lesson's contact model with my own RK4 (dt 1e-5): truck 10 -> 7.59 m/s (change 2.41), car -10 -> +14.09 (change 24.09), ratio 10.00; impulse on truck = impulse on car = 24,088 N s. The ratio equals truck mass / car mass for every truck mass on the slider (1:1, 2:1, 5:1, 10:1, 20:1 at 1000, 2000, 5000, 10000, 20000 kg). |
| c3 In the crash shown (both at 10 m/s), the car's velocity reverses while... | verified | Momentum conserved: 90,000 kg m/s before and after (10,000 x 7.59 + 1,000 x 14.09). Car reverses (-10 to +14.09), truck slows 24%. |
| c4 The force sizes shown (peaks of roughly 300 to 400 kN over about 0.1 s... | verified | Peaks: 293 kN (1,000 kg truck), 338, 378, 395 kN (10,000 kg), 404 kN (20,000 kg); contact 78-108 ms (claim says 77-107; same to rounding). So "roughly 300 to 400 kN over about 0.1 s" holds. The record already says it is an illustrative contact model; also note the model's damper makes the force jump at first contact, which real crumpling does not. |
| c5 The car comes off worse because it changes speed far more abruptly, no... | verified | Occupant injury depends on acceleration (and duration, e.g. head injury criterion), so "scales with the acceleration" is a simplification; with equal forces the car's acceleration is 10 times the 10,000 kg truck's: correct. HRW ch. 9 locator not re-read. |

Disputed: none. Withdrawn: none.

Recall (mosquito and bus) correct (equal forces; mosquito suffers from its tiny mass). Deterministic model; no seeds.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
