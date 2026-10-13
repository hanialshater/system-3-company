# Fact-check: never-flag-99 (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; score() re-implemented in artifacts/scratch/fc-aiecongeo/nf.mjs. Deterministic. The grid layout uses a fixed shuffle seed (99001) only for where the dots are drawn, not for any number.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | TOTAL 1000, 10 frauds, labelled invented. |
| c2 | verified | flag 0: 990/1000 = 99.0%, 0 caught. |
| c3 | verified | flag 20: frauds at ranks 0,1,3,5,8,11,15,19 -> 8 caught, 12 false alarms, (8+978)/1000 = 98.6%. Ranking labelled invented. |
| c4 | verified | accuracy = (caught + 990 - FA)/1000, so +0.1 pt per fraud caught and -0.1 per false alarm. Second half holds in this toy: the most frauds caught while accuracy stays above 99% is 5 of 10 (flags 1..11 region); catching 6 or more needs accuracy <= 99.0%. The phrase 'pull against each other' is a fair summary of that, though accuracy only falls below the baseline once false alarms outnumber catches. |
| c5 | verified | 492/284,807 = 0.173%. Dal Pozzolo et al. 2015 (IEEE SSCI) is the ULB data set paper; He & Garcia 2009 (IEEE TKDE 21(9)) surveys imbalanced learning. Two distinct sources. |

Stage check: the reveal says 'Real card-fraud data can be far more lopsided: one public set has 492 frauds in 284,807 payments' - accurate (data set calls them transactions). 'lower than doing nothing' true at 20 flags (98.6 < 99.0). Unrecorded claims: none.
