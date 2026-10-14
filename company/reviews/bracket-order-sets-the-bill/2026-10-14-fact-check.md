# Fact-check: bracket-order-sets-the-bill (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: each of the p x r entries is a length-q dot product, q multiplications; own triple-loop count for 10x30 by 30x5 = 1,500. CLRS 4e 14.2 / 3e 15.2 attribution consistent with my knowledge; book not opened, the claim does not depend on it. |
| c2 | verified | Arithmetic re-run: 1,500 + 3,000 = 4,500; 9,000 + 18,000 = 27,000; ratio 6. Own DP gives 4,500 as the optimum for dims [10,30,5,60]. Builder's recalled CLRS example (10x100, 100x5, 5x50) also matches my knowledge (7,500 vs 75,000); not learner-visible. |
| c3 | verified | Associativity derivation as given; result rows of A by columns of C = 10 x 60. Stage '✓ same 10×60 as above' only after both orders run. |
| c4 | verified | 9,000 = 2 x 4,500. |
| c5 | disputed | The method is right but the wording is not: 'cheapest sub-chains first' reads as processing sub-chains in order of cost. MATRIX-CHAIN-ORDER (CLRS 4e 14.2, recalled, not opened) solves sub-chains in order of length, shortest first. Own check: bottom-up by length equals brute force over all bracketings on 2,000 random chains (fc21/mc.mjs). Fix (builder): 'shortest sub-chains first' in Demo.tsx reveal and claim text. |

**Result:** 4 verified, 1 disputed, 0 withdrawn.

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Reveal text matches. Re-derived optimal substructure (cost = left + right + p(i-1)p(k)p(j)); own bottom-up-by-length DP equals brute force over all bracketings on 2,000 chains of 2-7 matrices. CLRS not opened; not relied on. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
