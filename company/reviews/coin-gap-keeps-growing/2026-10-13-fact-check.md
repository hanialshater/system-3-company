# Fact-check: coin-gap-keeps-growing (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/a6.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Sum of n independent +1/-1 steps has variance n, SD sqrt(n) = 100 at n = 10,000. |
| c2 | verified | Exact binomial E abs(H-T): 2.461 (n=10), 7.959 (100), 25.225 (1,000), 79.786 (10,000); rounds to the claimed 2.5, 8, 25, 80. |
| c3 | verified | Exact binomial: P(abs(share - 0.5) <= 1 point) at n = 10,000 is 95.6% (95.3% for strictly under 1 point). "Within about 1 point in 95% of runs" holds. |
| c4 | verified, with a caveat | Re-run of runs(1713): mean abs gap 2.5 / 8.3 / 16.3 / 86.1 at 10 / 100 / 1,000 / 10,000; largest gap 204; shares 0.4898-0.5089, so "between 49.0% and 50.9%" is right. This is specific to seed 1713: over 300 other seeds the 20-run average gap at 10,000 flips has a 95% range of 57-107 (median 79), and all 20 shares fall inside 49%-51% in only 42% of seeds (extremes 48.4%-51.8%). The claim says "seeded", so it is true as written. |
| c5 | verified | Law of large numbers is a statement about the share (relative frequency); it does not imply the difference H - T converges or shrinks (Feller vol. 1, ch. III and X). Re-computed fact: the gap SD grows as sqrt(n). |

Caveat routed to demo-builder (not blocking): the reveal says "every run ended between 49.0% and 50.9%". That is true of the stage's runs but not a general bound; adding "(in these 20 runs)" or "about 95% of runs land within 1 point" keeps a learner from reading it as a hard limit. Also the stage's own 1,000-flip average is 16.3, well under the 25 the reveal quotes (the 20-run sample is low there, about 2 standard errors); the reveal's "about ... 25 at 1,000" is the exact figure, so it is correct, but a learner scrubbing to 1,000 will see 16, not 25. The source for c4 does not say whether seed 1713 was chosen; it should (disclose-chosen-seeds).
