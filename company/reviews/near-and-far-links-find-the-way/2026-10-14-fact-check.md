# Fact-check: near-and-far-links-find-the-way (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own independent implementation (fc21/sw.mjs), same model and seeds 1-5 with pairs from mulberry32(100 + seed): 38.32, 28.52, 212.59. Robustness, seeds 11-15: 37.86, 29.04, 203.61; seeds 21-25: 37.88, 29.03, 192.61. Order 1/d < uniform << 1/d^2 holds each time; the stage quotes this model's means only. |
| c2 | verified | Own sum over all 1,999 other people: mean ring distance 500.25 = 1,000,000 / 1,999; ring-only routing moves one place per step. Stage 'Ring only 500'. |
| c3 | verified | Own sum: uniform links longer than 500 have share 999/1999 = 0.4997. The 2D/2000 chance per holder near the target follows. Qualitative sentence supported. |
| c4 | verified | Own sums with weights 2/d^2 (1 at d = 1000): length 1 share 0.608, longer than 31 share 0.0187. |
| c5 | verified | Own sums on this ring of 2,000: each doubling band of lengths gets 9-13% of 1/d links (0.134, 0.111, 0.101, 0.097, 0.095, 0.094, 0.093, 0.093, 0.093, 0.090); source's '10-15% on a ring of 1,024' is for the sibling lesson. Qualitative sentence supported. |
| c6 | verified | Kleinberg, 'Navigation in a small world', Nature 406, 845 (2000), doi 10.1038/35022643: citation confirmed by search; result (greedy routing efficient iff the exponent equals the lattice dimension) confirmed via secondary sources in search snippets (Cartozo and De Los Rios 2009, arXiv 0901.4710; course slides). Papers not opened. Easley and Kleinberg ch. 20 'The Small-World Phenomenon', with sections on decentralized search and an advanced section analysing it: confirmed by library-catalog search snippets (book host blocked); matches my own knowledge of the book. 'Proved' is fair: Kleinberg's theorems give polylog delivery at the matching exponent and polynomial lower bounds otherwise. |

**Result:** all open claims verified.
