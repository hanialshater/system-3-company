# Fact-check: one-in-a-million-match (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/a14.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | 5,000,000 x 1e-6 = 5. Simulation over 20,000 seeds: mean 5.016, variance 4.986 (Poisson-like). |
| c2 | verified | For a person chosen only because they match: P(guilty | match) = (1/N)/((1/N) + (1-1/N) x 1e-6) = 1/(1 + (N-1)p) = 1/6 = 16.7%. Nuance: in a particular search with k innocent matches the chance is 1/(1+k) (stage shows this); averaged over searches E[1/(1+K)] = (1-e^-5)/5 = 19.9%. The claim and the reveal ("about 1 in 6") are correct for the stated expectation. |
| c3 | verified | Thompson & Schumann (1987), Law and Human Behavior 11(3): 167-187, introduced the "prosecutor's fallacy" label for exactly this confusion. |
| c4 | verified | 10,000 x 1e-6 = 0.01 (simulated mean 0.0097); 1/(1+0.01) = 99.0%. |
| c5 | verified | Seed 28 gives innocent matches at 0.559M, 1.785M, 3.122M, 4.497M, 4.819M (exactly 5, spread out), culprit at person 417. Seed choice is disclosed in the claim source and model.ts. Of seeds 1-3000, 564 (19%) give exactly 5 (Poisson: 17.5%), so the chosen seed is an ordinary draw in count; only the spread was selected. |

Non-blocking, routed to demo-builder (disclose-chosen-seeds): the reveal says "Your search found 5 innocent matches" about a seed chosen to show exactly 5. The "about 5" statement is the expectation and is fine, but a learner may read 5 as what always happens. Over 20,000 seeds the count ranges from 0 to 16 (about 93% of searches find 2 to 9), so a clause like "most searches like this find 2 to 9" would show the spread. The reveal's "assumes the culprit is in the database and always matches" is c2's assumption, stated.
