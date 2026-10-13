# Fact-check: up-then-down-trap (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; arithmetic in artifacts/scratch/fc-aiecongeo/udt.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 100 x 1.5 = 150; 150 x 0.5 = 75. |
| c2 | verified | 1/1.5 - 1 = -33.3%; 150 x 2/3 = 100. |
| c3 | verified | 1/0.5 - 1 = +100%. |
| c4 | verified | -50% then +50% = 75 (multiplication commutes). |
| c5 | verified | Needed gain x/(1-x) exceeds x for x = 0.01, 0.1, 0.2, 0.5, 0.9 (and algebraically for 0 < x < 1). |
| c6 | verified | Reveal: 'Made-up example numbers, not a claim about any market.' |

Stage check: the four tiles contain exactly two pairs that return to $100 (+50% then -33 1/3% and -50% then +100%, in either order), so the explore task is solvable. Unrecorded claims: none.
