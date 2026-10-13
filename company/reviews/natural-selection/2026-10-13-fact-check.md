# Fact-check: natural-selection, claims c1, c8-c12 (2026-10-13)

Checker: fact-checker (independent of the 2026-10-12 checker who added c9 and c10). Script: artifacts/scratch/fc-problife/l7.mjs (own recursion, closed forms, and a finite-population simulation). Stage text from the walkthrough transcript; darkShare() read from Demo.tsx.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Haploid, non-overlapping-generation selection p' = pw/(pw + 1 - p) gives p'/(1-p') = w p/(1-p): the dark:pale ratio is multiplied by (1 + edge) each generation. Demo.tsx's darkShare() uses the same form (odds x (1+edge)^g). |
| c8 | verified | 1.1^100 = 13,780.6; (1/99) x 13,780.6 = 139.2 dark to 1 pale; share 0.99287, 99 in 100. Iterating the recursion 100 times gives the same 0.99287. A finite-population check (Wright-Fisher, N = 10,000, 20 runs) averages 0.990, so "chance plays no part" is a good approximation at large N. |
| c9 | verified | 1% edge from 1% dark: first generation above 50% is 462 (closed form ln 99 / ln 1.01 = 461.8). At generation 100 the share is 2.66% ("about 3%", as the reveal says). |
| c10 | verified | Same recursion with w = 1.05: the A:B ratio is multiplied by 1.05 every generation; the share rises monotonically (checked over 500 generations; 50% after about 94 generations from 1%). It requires the 5% advantage to recur every generation, a constant relative advantage, a large population and no other forces. The recall card states "over many generations of droughts ... the 5% edge repeats every generation", but the ledger text of c10 omits that condition; it should include "when drought selects every generation". Non-blocking wording note for demo-builder. |
| c11 | verified (convention) | Scenario stated in the predict question; the mechanism (bird predation on peppered moths) is documented by Cook, Grant, Saccheri & Mallet (2012), Biol. Lett. 8: 609-612. The lesson marks the beetles and the 10% as invented. |
| c12 | verified (convention) | Demo.tsx draws round(100 x share) dark beetles; the stage label says "100 beetles stand for a huge population. Each generation is all new." |

Also checked in the reveal: "For the first 25 generations it stays under 10%": share at generation 25 is 9.86%, at 26 it is above 10%. "1.1^100 = about 14,000x" fine. Manchester claim (c6) was verified earlier and not reopened. No unrecorded claims found.
