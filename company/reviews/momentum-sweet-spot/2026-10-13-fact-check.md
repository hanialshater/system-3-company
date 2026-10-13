# Fact-check: momentum-sweet-spot (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; descend() re-implemented in artifacts/scratch/fc-aiecongeo/mom.mjs. Deterministic (no seeds); I also varied the start point.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Rule matches Demo.tsx: v = beta*v - 0.07*grad, f = (x^2 + 25y^2)/2, start (4,1), tol 0.1. Labelled invented on the stage. |
| c2 | verified | Steps 51 / 21 / 19 / 30 for beta 0 / 0.5 / 0.8 / 0.9. |
| c3 | verified | beta 0.9: 3 sign changes of x, minimum x = -2.169; beta 0.8: 1 crossing, min -1.031; 0 and 0.5: none. |
| c4 | verified | Polyak 1964 (USSR Comput. Math. Math. Phys. 4(5)) introduced heavy-ball momentum; Goodfellow et al. 2016 s8.3.2 describes it for neural-network training. |

Generality (not a claim, a note): from other start points (3,2), (4,-1), (2,0.5) the order is the same shape (beta 0.8 fastest of the four offered at 19 steps for three of the four starts; for start (2,0.5), beta 0.5 needs 18 and beta 0.8 needs 19). So 'too much momentum slows you' (0.9 = 30 steps in every start) is robust, but 'the sweet spot is 0.8' is not: over all beta in steps of 0.01, the fastest is beta 0.67 at 10 steps. The reveal does not say 0.8 is the best, only that 0.8 beat 0.9 and 0.5. The title 'sweet spot' and the offered buttons (0, 0.5, 0.8, 0.9) may lead a learner to infer 0.8; demo-builder might note the offered values are a sample.

Unrecorded claims: none. Stage says the valley is invented.
