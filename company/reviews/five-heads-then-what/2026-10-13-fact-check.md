# Fact-check: five-heads-then-what (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/a9.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Independence: (1/64)/(1/32) = 1/2. |
| c2 | verified | P(five previous flips all heads) = 1/32; expected positions in 10,000 flips (10,000-5)/32 = 312.3; the stage's seed gives 321. Across 300 other seeds the count at 10,000 flips averages 312.8 (95% range 256-369). The brief's 1/64 was indeed the chance of six heads. |
| c3 | verified | makeFlips(5150): 21/39 heads at 1,101 flips, 38/75 at 2,000, 159/321 at 10,000, 341/667 at 20,000. The reveal's live example (167 heads, 170 tails of 337 at 11,202 flips) also reproduces. Across 300 other seeds the pooled heads share after five heads is 50.2%, with a 95% range of 44.6%-54.9% for single runs of about 312 cases, so the stage's 50-51% is typical and the claim "wanders near 50%, does not lean" holds generally. |
| c4 | verified | Five extra heads move the share by at most 5/n; dilution, not compensation (law of large numbers; independent flips). |

The reveal sentence "it wobbles less the more runs you catch" is consistent with the binomial spread (SD of the share is 0.5/sqrt(cases)); covered by c1/c3. No unrecorded claims found.
