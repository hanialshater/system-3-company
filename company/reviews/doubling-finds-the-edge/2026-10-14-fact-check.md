# Fact-check: doubling-finds-the-edge (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node mirror of doubleOnce/halveOnce (fc21/dbl.mjs): 11 doubling probes to 1024, gap 513-1023, halvings 768, 896, 960, 992, 1008, 1000, total 17. Reveal reads these from FULL. The brief's 18 is a different counting convention, as noted. |
| c2 | verified | Positions 0..1000 = 1,001 comparisons; Demo SCAN = POS + 1. |
| c3 | verified | Sortedness argument; value(i) = 3i + 7 is strictly increasing. |
| c4 | verified | Derivation re-run: for every target position 2..65,536 the count is at most 2 ceil(log2(p+1)) + 1. Bentley & Yao (1976), 'An almost optimal algorithm for unbounded searching', IPL 5(3):82-87, bibliographic details confirmed via web search (Wikipedia 'Exponential search', XJTU scholar listing); full text not opened, the sentence rests on the derivation. |
| c5 | verified | Own run: position 1,000,000 gives 21 doubling + 13 halving = 34; position 4,000 gives 19. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
