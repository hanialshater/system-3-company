# Fact-check: antibiotic-already-there (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l1.mjs. Stage text from the walkthrough transcript; model read from Demo.tsx (expected counts, no random draw of the count).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | 1e10 x 1e-8 = 100; 1e9 -> 10; 1e8 -> 1; 1e7 -> 0.1 (stage shows rounded expected counts: 100, 10, 1, 0). The reveal says "Counts are expected values", so it does not claim a draw gives exactly 100 (a real culture would give Poisson(100): 80 to 120 about 96% of the time). |
| c2 | verified | Luria & Delbruck (1943), Genetics 28: 491-511, and Lederberg & Lederberg (1952), J. Bacteriol. 63: 399-406 (replica plating) are the standard demonstrations that resistance mutants pre-exist selection. Citation details match. |
| c3 | verified | "Illustrative figure, real frequencies vary widely" is true: for wild-type E. coli, resistant mutants per cell run from about 1e-9 (nalidixic acid) to 1e-8 to 1e-7 (rifampicin) depending on assay and strain (PNAS and NAR tables found by search). The cited Drake (1991) PNAS 88: 7160-7164 is about per-genome mutation rates being roughly constant, not per-drug resistance frequencies, so it is a loose fit; a per-drug source (a table of rifampicin and nalidixic-acid resistance frequencies) would be a better citation. Non-blocking for the claim, which is true. |
| c4 | verified | exp(-0.1) = 0.905 (binomial gives the same). "Usually none", ~90% per dish. |
| c5 | verified (convention) | Toy-model statement consistent with Demo.tsx (mulberry32(3) places up to 100 ringed spots; 10 million shows none). |

Reveal sentences "Big populations almost always hold a few rare mutants" follows from c1/c4 at this illustrative rate. No unrecorded claims found.
