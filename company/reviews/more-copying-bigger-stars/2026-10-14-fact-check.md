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

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | From the code: copier picks target[1 + floor(r2 (i - 1))], uniform over the i - 1 links, so page j is hit with chance deg(j) / (i - 1); 500 links -> 500 times a 1-link page. E&K ch. 18 not opened; sentence rests on the derivation. |
| c6 | verified | Own node replay of simulate() (mulberry32, two draws per page): lead[9] seed 1 = 0 / 9 / 576, seed 2 = 0 / 9 / 416, seed 3 = 0 / 9 / 468; max 12 / 160 / 6,278 (ratio 523) and top 1% 7% / 27% / 84% for seed 1 also reproduce. |
