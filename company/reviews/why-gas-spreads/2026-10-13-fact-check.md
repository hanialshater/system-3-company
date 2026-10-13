# Fact-check: why-gas-spreads (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: for an ideal gas each molecule's position is uniform, so P(left half) = 1/2, independently. |
| c2 | Verified: (1/2)^20 = 1/1,048,576. (And the recall: (1/2)^10 = 1/1,024.) |
| c3 | Verified: no force drives free expansion of an ideal gas; the multiplicity argument (S = k ln W). |
| c4 | Verified: one mole is 6.022e23 molecules and fills about 24 L at room conditions; 'about 10^23 or more' holds for any macroscopic sample. |
| c5 | Verified, and the seed does not matter. Re-ran the lesson's stream (mulberry32 seed 20, three draws per molecule). Seed 20 gives, for button orders 4,10,20: 69, 0, 0 all-left snapshots per 1,000; for 20 then 4: 0 and 46. Over seeds 1..500 the n=4 count per 1,000 has mean 62.3 (expected 62.5) with a 5th-95th percentile of 49-75; n=10 averages 0.90 (expected 0.98); n=20 was nonzero in 0 of 500 runs of 1,000 (the chance is 0.1% per run). The reveal quotes the learner's own tally (e.g. '135 in 2,000'), which varies with the press order, and 0 for 20 molecules is the overwhelmingly likely outcome. 'Untuned' is credible. |

Reveal sentence 'it never happens' for 10^23 molecules is true in the practical sense (probability 2^-(10^23)). The model treats snapshots as independent; the claim notes that. Reveal numbers depend on button presses, so they cannot be wrong, but a learner who presses 4 twice sees about 125 expected, not 62 per 1,000. No unrecorded claims.
