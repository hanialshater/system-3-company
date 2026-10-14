# Fact-check: truck-hits-car-force, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 | verified | Own semi-implicit Euler at 1e-6 s, same contact law (truck.mjs): 10,000 kg truck: truck 10 -> 7.591, car -10 -> +14.088; changes 2.41 and 24.09 m/s. |
| c5 | disputed | Reveal quotes end values for the current truck-mass slider and always says the lighter vehicle changes "much more" and "the car comes off worse". Own sim: at 1,000 kg (slider min) both change 13.25 m/s; at 2,000 kg ratio 2.00; 5,000 kg 5.00; 20,000 kg 20.00. At 1,000 kg the reveal contradicts its own numbers. |
| c6 | verified | 1000 N / 9.81 m/s^2 = 101.9 kg. |

Disputes: c5. Fix (demo-builder): pin the reveal figures to the 10,000 kg crash, or word the sentence by mass ratio (drop "much more" and "the car comes off worse" when the truck is not heavier), or raise the mass slider minimum above 1,000 kg. Then add a claim covering the mass-dependent reveal.

Result: 2 verified, 1 disputed, 0 withdrawn.
