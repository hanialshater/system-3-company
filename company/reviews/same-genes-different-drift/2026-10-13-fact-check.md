# Fact-check: same-genes-different-drift (2026-10-13)

Checker: fact-checker (independent). Scripts: artifacts/scratch/fc-problife/l10.mjs (my own Wright-Fisher simulation plus an exact Markov-chain calculation) and l10b.ts (copy of the lesson's seeded simulate()). Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Haploid Wright-Fisher resampling changes allele shares by chance alone with no selection (Gillespie 2004; Hartl & Clark). |
| c2 | verified | Shares 0 and 1 are absorbing in the model (every draw copies the same colour); no mutation or migration in the lesson. |
| c3 | verified | Exact absorption probabilities from the Wright-Fisher transition matrix: N = 20 fixed by generation 30: 69.9%, by 60: 93.6%, by 100: 99.2%; N = 200 fixed by generation 100: 14.1%. My 20,000-run (N = 20) and 6,000-run (N = 200) simulations agree. These match the ledger's 71%, 94%, 99%, 14% within its sampling error. The lesson's seed 1: N = 20 lanes fixed at generations 41, 23, 12, 8, 14 (all five by 41); N = 200: one of five lanes fixed (generation 71, so fixed at 100). Across 2,000 other seeds, with 20 beetles at least 3 of 5 lanes are fixed by generation 30 in 82% of seeds; with 200 beetles at least 3 of 5 lanes are still mixed at generation 100 in 97.5% of seeds. So "most ... within a few dozen generations" and "most still mixed" hold generally, not only for the stage seed. |
| c4 | verified | For neutral variants the fixation probability equals the starting frequency (Kimura 1962, Genetics 47: 713-719); simulation: red took over in 49.7% of fixed runs at both sizes (the exact value is 50%). |
| c5 | verified (convention) | Stated in the reveal ("no mutation, no selection, no beetles arriving from elsewhere"). |

No unrecorded claims found.
