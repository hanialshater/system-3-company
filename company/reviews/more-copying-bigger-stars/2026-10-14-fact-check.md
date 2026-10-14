# Fact-check: more-copying-bigger-stars (2026-10-14)

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches Demo.tsx simulate(): i > 1 and r1 < c copies target[1 + floor(r2(i-1))], else floor(r2 i) on 0..i-1. Model checked against my knowledge of Easley & Kleinberg (2010) ch. 18 'Power Laws and Rich-Get-Richer Phenomena', section on rich-get-richer models (copy with some probability, else uniform): chapter placement confident; book host blocked, not opened. |
| c2 | verified | Own mirror (fc21/copy.mjs), seeds 1-3: 12/160/6,278, 18/179/4,537, 12/158/5,122. |
| c3 | verified | Own mirror, top 100 of 10,001 pages: 7.3/7.4/7.6%, 26.7/26.9/25.6%, 84.3/85.5/85.1%. (Seed 3 at 0% shows as 8% on stage after rounding; 'about 7%' holds.) |
| c4 | verified | Pages 1..i-1 each have exactly one out-link, so a uniform page is a uniform link; P(copy lands on j) = deg(j)/(i-1). 500 vs 1 gives a factor of 500 within the copy step. |
| c5 | verified | With c = 0, j = floor(r2 i), uniform on 0..i-1. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
