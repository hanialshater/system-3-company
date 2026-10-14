# Fact-check: harm-prices-clear-the-market (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own enumeration of all 6 assignments of V = [[12,4,2],[8,7,6],[7,5,2]]: totals 21, 23, 14, 17, 15, 16, so the maximum, 23 (x-a 12, y-c 6, z-b 5), is unique. It matches the stage message 'Best assignment outlined: total 23'. |
| c2 | verified | Own code (fc23/vcg.mjs). Without x the others' best is 14 and with x they get 11. Without y: 17 and 17. Without z: 19 and 18. Harms 3, 0, 1, total $4. The reveal (lines 120-122) and the stage message 'Without b, the others' best is W; with it they get w' print exactly these. |
| c3 | verified | Own copy of clearingPrices(), with both the smallest and the largest constricted set raised first: it ends at a 3, b 1, c 0, total 4. Own brute force over integer prices 0-12 finds the unique smallest-total clearing vector, [3,1,0]. Harm on each buyer's own item: x/a 3, z/b 1, y/c 0, which equals the column prices. Source correction (not learner-facing): my brute force counts 124 clearing vectors in 0-12, not the source's 79. The difference does not touch the claim; the builder should recount or drop the figure. |
| c4 | verified | Leonard (1983) and E&K ch. 15 were NOT opened (every scholarly host was unreachable through the proxy); the theorem (VCG prices = the minimum Walrasian prices in assignment markets; also Demange-Gale-Sotomayor 1986) is from my own knowledge, confident. It does not rest on that alone. In my own randomized test (fc23/vcg.mjs, vcg4.mjs), across 3,000 random 3x3 markets (values 0-8) and 150 random 4x4 markets (values 0-6), VCG prices always cleared, and no integer clearing vector had any price below VCG. That is 0 counterexamples, so VCG was the componentwise minimum every time. Reveal footnote (line 130) matches. |
| c5 | verified | Reveal footnote reads 'Invented values.' Demo.tsx V is a hard-coded table taken from the brief, with no real-world referent claimed. |

**Result:** every claim in this lesson is now verified.
