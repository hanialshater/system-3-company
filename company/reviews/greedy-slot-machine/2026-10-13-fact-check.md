# Fact-check: greedy-slot-machine (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; play() re-implemented in artifacts/scratch/fc-aiecongeo/slot.mjs using the kit's mulberry32 (copied to rng.mjs) for seed-specific claims and Math.random for the general ones.

Seed disclosure (pattern disclose-chosen-seeds): run 1 = seed 5 is CHOSEN (c3 says so; greedy is not stuck in seeds 1-4, 6). The reveal does not generalise from it and reports the spread. Good.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Model matches PAY=[.3,.7], two opening pulls A then B, ties to A, eps 0.1 random pull. |
| c2 | verified | 0.9*70 + 0.1*50 = 68. Seeds 1-2000: explorer last 100 mean 67.95; 20,000 independent Math.random runs: 68.03; explorer on B 95.0 of last 100 (seeds 1-2000). Holds generally. |
| c3 | verified | Seed 5: greedy wins per 100 = 40, 29, 23, 30, 41; 1 pull on B of 500; stuck. Seeds 1-4 not stuck (disclosed as chosen). |
| c4 | verified | Seeds 1-2000: greedy stuck 30.2% (604 runs), last-100 mean 57.7 vs explorer 67.95. Independent 20,000 Math.random runs: stuck 30.5%, 58.1 vs 68.0. Conditional means: greedy 69.7-70.0 when it found B, 29.8-30.1 when stuck, so 'costs about 2' (70 vs 68) and 'saves about 40' (68 vs 30 = 38) hold. Seeds 1-200 give a similar picture (33% stuck, 56.4 vs 67.6) so it is not a large-sample artefact. |
| c5 | verified | Epsilon-greedy is defined in Sutton & Barto 2018 s2.3 (greedy action selection is s2.2); the text says greedy methods can get stuck. |

Stage check: 'In N runs you watched it was stuck K times' is learner state (seeds 5-10 gives 3 of 6), not a claim. The explorer almost never stays stuck (0 to 0.01% of runs). Unrecorded claims: none; the payout rates are labelled invented in c1.
