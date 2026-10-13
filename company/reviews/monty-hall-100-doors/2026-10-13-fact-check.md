# Fact-check: monty-hall-100-doors (2026-10-13)

Checker: fact-checker (independent). Scripts: artifacts/scratch/fc-problife/a12.ts, a12b.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Independent simulation (200,000 plays, knowing host, 100 doors): stay 0.9905%, switch 99.01%. Exact: 1/100 and 99/100. |
| c2 | verified | 3 doors, knowing host: stay 33.5%, switch 66.5% (exact 1/3, 2/3). |
| c3 | verified | At least 98 of the 99 unpicked doors are empty in every case, so the host's move is always available and carries no information about your door: 1/100 stays 1/100. |
| c4 | verified | Bayes: (1/100)/(1/100 + (99/100)(1/99)) = 1/2. Simulation of a random-opening host, keeping only plays where every opened door was empty: 50.0% each way (100 doors, 39,859 kept plays) and 49.8/50.2% at 3 doors. |
| c5 | verified | Stage batches start at round 100000 + 100 x batches (Demo.tsx), and the claim's numbers reproduce exactly: first batch at 100 / 10 / 3 doors gives stay 2 / 7 / 30 and switch 98 / 93 / 70; over 100 batches 92/9,908, 1,002/8,998, 3,303/6,697. Exactly one of stay or switch wins in every round (0 violations in 15,000 checks). The seed is not shown to be chosen; the 100-batch totals sit at 1/N, so it is typical. |

The reveal's live line ("staying won 51/200, switching won 150/201") is a tally of batches plus manual rounds; the denominators differ because the learner played one extra round by switching, which is correct. No unrecorded claims found.
