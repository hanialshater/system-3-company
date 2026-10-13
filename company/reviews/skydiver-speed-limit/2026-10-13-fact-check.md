# Fact-check: skydiver-speed-limit, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Air drag on a skydiver grows with the square of speed, F = 1/2 rho C_d... | verified | Quadratic drag at high Reynolds number, F = 1/2 rho C_d A v^2: standard (HRW ch. 6). |
| c2 Speed stops growing when drag equals weight: v_t = sqrt(2 m g / (rho C... | verified | Setting drag = weight: v_t = sqrt(2 m g/(rho C_d A)). |
| c3 For 80 kg belly-down (C_d A = 0.7 m^2) the limit is 43.2 m/s, about 15... | verified | 80 kg, C_d A 0.7: 43.23 m/s = 155.6 km/h; C_d A 0.3: 66.03 m/s. Correct as arithmetic for the stated parameters. |
| c4 Belly-down at 80 kg she reaches 42.3 m/s after 10 s, within 3% of the ... | verified | Re-ran the lesson's RK4 (dt 0.01 s) and the closed form v = v_t tanh(g t/v_t): belly 80 kg 35.13 m/s at 5 s, 42.31 at 10 s (97.9% of the limit), 43.13 at 15 s; head-down 59.59 at 10 s (90.3%), 64.52 at 15 s (97.7%). The 97% crossing happens at 9.2 s (belly) and 14.1 s (head-down) in continuous time; on the slider's 5 s steps they are 10 s and 15 s, so "42.3 m/s after 10 s within 3%" and "head-down takes about 15 s" both hold. Across the whole mass slider (50-120 kg) the 97% time runs 7.3-11.3 s belly and 11.1-17.3 s head-down (deterministic, no seeds). |
| c5 Model: air density held at 1.2 kg/m^3 (sea level) and C_d A values of ... | verified | Convention, honestly labelled. Cross-check of realism: a 90 kg diver at 55 m/s (about 200 km/h, the commonly quoted belly-to-earth speed) needs C_d A of about 0.49 m^2 at sea-level density, so the lesson's 0.7 m^2 is on the high side, not "typical" for belly-down; the claim itself already says the model underestimates real speeds. |
| c6 A heavier skydiver has a higher limit speed, growing as the square roo... | verified | v_t proportional to sqrt(m): 50 kg 34.17 m/s, 120 kg 52.94 m/s (matches 34.2 and 52.9). |

Disputed: none. Withdrawn: none.

Recall (raindrop at terminal speed: steady) is the same physics and correct. Reveal read from Demo.tsx: "within 3%" figures are computed live from the same model.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

1. The reveal gives the belly-down limit as "about 156 km/h" in a lesson about a skydiver, next to the note "typical drag areas". Real belly-to-earth speeds are about 190-200 km/h (the claim record says so), so a learner may carry 156 km/h away as a real skydiver's speed. Either use a drag area near 0.5 m^2 (gives about 55 m/s) or say "in this model" next to the 156 km/h.

## Result
6 verified, 0 disputed, 0 added unverified.
