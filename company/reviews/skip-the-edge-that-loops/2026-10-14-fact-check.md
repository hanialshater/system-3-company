# Fact-check: skip-the-edge-that-loops (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own union-find replay (fc21/mst.mjs): build AC, BC, DE; skip AB; build BD; skip AD, CD, CE; total 1 + 2 + 3 + 5 = 11. |
| c2 | verified | Same replay: after AC and BC, A and B share a root; AB (4) skipped, BD (5) built. Reveal reads CHEAPEST_SKIP and ROADS[4]. |
| c3 | verified | Cycle argument as given; Demo.tsx run() skips exactly when find(a) === find(b). CLRS 4e 21.2 recalled, not opened; derivation is self-contained. |
| c4 | verified | Own enumeration of all 4-edge subsets: 40 spanning trees, minimum 11, unique (AC, BC, DE, BD); n - 1 = 4 roads. CLRS section numbers recalled, not opened; the claim rests on the enumeration. |
| c5 | verified | Demo.tsx fills each town with COLOUR[group[t]]; union keeps the alphabetically smaller root, so the root is the group's first town. Stage note 'Same colour = already connected.' |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
