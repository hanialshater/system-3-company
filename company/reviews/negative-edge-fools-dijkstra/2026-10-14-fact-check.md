# Fact-check: negative-edge-fools-dijkstra (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node Bellman-Ford to fixed point (fc9): A 1, B 3, C 3; by hand S-B-A = 3-2 = 1, S-B-A-C = 3. |
| c2 | verified | Own node settle-once trace, matching Demo.tsx tapTown(): settle S (A 2, B 3), A (C 4), B offers A 1 to a settled town, ignored (stage 'too late'); final A 2, B 3, C 4. |
| c3 | verified | Own node relax-all-out-edges (CLRS 4e 22.3 DIJKSTRA relaxes every edge out of u with no settled check): order S, A, B, C ends A 1, B 3, C 4. Reveal text matches. |
| c4 | verified | Own node over PASS_ORDER (B>A, A>C, S>A, S>B, as in Demo.tsx runPass): pass 1 {A 2, B 3, C inf (shown as no label)}, pass 2 {A 1, B 3, C 3}, pass 3 unchanged. |
| c5 | verified | CLRS 4e section 22.3 states Dijkstra for nonnegative edge weights and proves correctness (Theorem 22.6) under that assumption (3e 24.3, Thm 24.6); counterexample c1-c2 shows the failure. Book not re-opened this pass; section numbering confirmed against 4e chapter layout (ch. 22 Single-Source Shortest Paths). |
| c6 | verified | CLRS 4e 22.1: BELLMAN-FORD makes /V/-1 passes relaxing every edge, O(VE), vs Dijkstra O((V+E) lg V) with a binary heap; here 3 x 4 = 12 relaxations vs 4. Bellman 1958, 'On a routing problem', Quart. Appl. Math. 16(1): 87-90 (citation details recalled, not opened). |

**Result:** 6 verified, 0 disputed, 0 withdrawn.

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own trace of v3 runPass over PASS_ORDER [S>A, A>C, S>B, B>A]: pass 1 A 2, C 4, B 3, then A 1; pass 2 C 3; pass 3 no change. Reveal text matches. |
| c4 | verified | Same trace: after pass 1 {A 1, B 3, C 4}, after pass 2 {A 1, B 3, C 3}. |
| c5 | verified | Settled-label failure shown by c1-c2; the Dijkstra correctness proof needs non-negative weights. CLRS 4e 22.3 / Thm 22.6 (3e 24.3 / Thm 24.6) from my knowledge, not opened this pass; the sentence rests on the counterexample and the standard proof. |

**Result:** 3 verified, 0 disputed, 0 withdrawn.
