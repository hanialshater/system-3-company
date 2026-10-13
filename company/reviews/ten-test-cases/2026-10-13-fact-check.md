# Fact-check: ten-test-cases (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; binomial and sampler re-run in artifacts/scratch/fc-aiecongeo/ten.mjs.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Model matches TRUE_ACC 0.8, independent draws, sizes 10/100/1000, mulberry32 seed 1. |
| c2 | verified | P(X<=6 | n=10, p=0.8) = 0.12087 (12.1%), 1/8 = 12.5%, so 'about 1 in 8' is fair. |
| c3 | verified | sd = 100 sqrt(0.16/n): 12.65 / 4.00 / 1.26 points at n = 10 / 100 / 1000. Simulation of 20,000 tests gives 12.55 / 4.01 / 1.27. |
| c4 | verified, with a note | In the toy the spread depends only on n. ESL (Hastie, Tibshirani & Friedman) s7.2 is about test-error estimation; it does not literally say 'only', so the 'only' is carried by the toy derivation and holds for a fixed model's score. Variance-reducing designs (paired comparisons, repeated resampling of the same cases) exist in the real world, so on a general reading 'only' is strong; the source field already scopes it to 'the score of a fixed model'. |

Seed disclosure: seed 1, untuned. First 101 tests at seed 1 give 9 scores of 6 or fewer (9%, the number the transcript shows); across 2,000 seeds the count in 100 tests is mean 12.1, 5th-95th percentile 7-18, so 9 is typical, not a chosen low. The reveal gives both the learner's own count and the exact 12.1%.

Unrecorded claims: none.
