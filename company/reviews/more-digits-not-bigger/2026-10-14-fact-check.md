# Fact-check: more-digits-not-bigger

Independent claim checks for src/demos/math/more-digits-not-bigger. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read Demo.tsx first. NUMS digits [3], [2,5], [1,2,5]. Each press draws d pieces of width SCALE/10^(p+1), so the bars are 3 blocks; 2 blocks and 5 slivers; 1 block, 2 slivers and 5 hairlines. Own port of the drawn widths: 74.4, 62.0 and 31.0 px of 248, i.e. 0.300, 0.250 and 0.125. |
| c2 | verified | Own port: thousandths() full values 300, 250, 125, sorted 0.3 > 0.25 > 0.125. The reveal's largest = NUMS[order[0]].label = '0.3'. The bar widths are to scale (74.4 > 62.0 > 31.0 px), so the longest bar is 0.3 once all are built, and 'built' requires all of them built. |
| c3 | verified | The reveal prints show(b25h × 10) = show(50) = '0.05'. 0.25 has 2 tenth-blocks against 0.3's 3, so it is one block (0.1) short at the tenths place, and its 5 slivers add 0.05 < 0.1. Arithmetic checked in node. |
| c4 | verified | Place value: 10^−(p+1) per place, each a tenth of the one to its left. That is the definition of decimal notation (convention), drawn on stage as width SCALE/10^(p+1). Comparing from the first digit after the point is valid here because every number has integer part 0, and the reveal says it in that context. |
| c5 | verified | Caption after the prediction: 'Block = 0.1 · sliver = 0.01 · hairline = 0.001', exact. The CSS classes are tenth, hundredth and thousandth, with widths 24.8, 2.48 and 0.248 px on the 248 px scale. |

**Result:** 5 verified, 0 disputed, 0 held unverified.
