# Fact-check: real-rate-illusion (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; formulas re-run in artifacts/scratch/fc-aiecongeo/rr.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 100 x 1.03 = 103; 100 x 1.05 = 105. |
| c2 | verified | 103 / 1.05 = 98.095; -1.90%. |
| c3 | verified | Real rate = (1+i)/(1+pi) - 1 follows from purchasing power (money grows by 1+i, prices by 1+pi); it is the Fisher relation. Verified by derivation rather than by the textbook citation. |
| c4 | verified | Exact -1.905% vs approximate -2.0%; error grows with larger rates (0.5 vs 0.6 gives -6.25% vs -10%), but the claim says 'for small rates'. |
| c5 | verified | Real change by inflation (0..10%): +3.0, +1.98, +0.98, 0.000, -0.96, ... The stage colour is 'even' exactly at 3%; the slider runs 0 to 8% in 0.5 steps. |
| c6 | verified | Reveal: 'A model with illustrative rates: one year, one basket, no tax.' |

Stage check: the reveal's 'You saw the colour flip exactly where prices rise 3%' presumes the learner moved the slider through 3%; the milestone is not gated on it (the page unlocks the reveal on any interaction). That is a wording dependency on learner behaviour, not a false claim. Unrecorded claims: none.
