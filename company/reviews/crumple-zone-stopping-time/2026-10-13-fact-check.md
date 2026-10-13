# Fact-check: crumple-zone-stopping-time, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Average force times stopping time equals the change in momentum (impul... | verified | Impulse-momentum theorem: F_avg dt = change in p. Standard (HRW ch. 9 locator). |
| c2 A 1000 kg car at 15 m/s carries 15,000 kg m/s of momentum, all removed... | verified | 1000 x 15 = 15,000 kg m/s. |
| c3 Stopping in 0.10 s takes an average force of 150 kN; in 0.20 s, 75 kN ... | verified | 15,000/0.10 = 150 kN; /0.20 = 75 kN; slider values 0.05..0.30 s give 300,150,100,75,60,50 kN (stage readouts 60, 50, 100 kN at 0.25, 0.30, 0.15 s all match). |
| c4 At a steady force, a 0.20 s stop from 15 m/s means crushing about 1.5 ... | verified | Constant deceleration: d = v t/2 = 0.75 m at 0.10 s, 1.5 m at 0.20 s. Correct as arithmetic. Caution: for scale, a real 54 km/h (15 m/s) frontal crash with 0.6 m of crush lasts about 2 d/v = 0.08 s, so the lesson's 1.5 m is longer than a real crumple zone; the claim and the reveal both say "illustrative". |
| c5 The lesson uses average (constant) force and illustrative numbers; rea... | verified | Stated idealisation. |
| c6 A crumple zone protects by crushing, which lengthens the stopping time... | verified | Standard account of crumple zones (longer stopping time, lower force). Hewitt, Conceptual Physics has this in its Momentum chapter (ch. 6 in recent editions); not re-read. |

Disputed: none. Withdrawn: none.

Recall (0.05 s vs 0.25 s -> one fifth) correct.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

1. The predict card says the car "stops in 0.10 s" and "with a crumple zone it takes 0.20 s". Learners may read the 0.10 s case as a car with no crumple zone, but 0.10 s at a steady force already needs 0.75 m of crushing; a truly rigid car stops in a few centimetres, far faster. The framing could say "a short crush" versus "a longer crush" to avoid implying real no-crumple-zone numbers.

## Result
6 verified, 0 disputed, 0 added unverified.
