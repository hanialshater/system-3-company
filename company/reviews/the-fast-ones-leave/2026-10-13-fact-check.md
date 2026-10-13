# Fact-check: the-fast-ones-leave (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: in a classical liquid the translational velocity distribution is still Maxwell-Boltzmann (the configurational part factors out), so a spread of speeds with a fast tail holds. Applies to translational motion only. |
| c2 | Verified, and typical. Re-ran the lesson's generator (mulberry32 seed 1, three normal axes with sigma = 370.9 m/s, m = 18.015 u): mean speed 583.4 m/s; theory sqrt(8kT/pi m) = 591.8 m/s. Over seeds 1..500 the mean of the 60-molecule means is 591.2 m/s with a 5th-95th percentile of 538-649, so seed 1 (stated as untuned) is not a flattering pick. |
| c3 | Verified: removing the fastest molecule lowered the mean in all 500 seeds; for seed 1, 3 escapes give mean 553 m/s and 87% of the start's energy, 10 escapes give 504 m/s and 70%. |
| c4 | Verified as the kinetic interpretation (mean translational KE = 3/2 kT). Wording note, not a dispute: 'average energy of the molecules' motion' means translational kinetic energy; the stage's thermometer is mean v^2 as a share of the start, which matches. |
| c5 | Verified: evaporation removes the high-energy tail; sweat cooling is standard physiology. |
| c6 | Verified: 0.01 x 2440 kJ / (0.99 kg x 4.18 kJ/(kg K)) = 5.9 K, assuming no heat inflow (the reveal's 'cools the rest by about 6 C'). |
| c7 | Verified (convention): 60 molecules, disclosed in the reveal. |

The walkthrough never unlocked the reveal; reveal text was read from Demo.tsx (it prints the learner's own low point and mean values at run time). Recall (a lid slows cooling) is correct. No unrecorded claims.
