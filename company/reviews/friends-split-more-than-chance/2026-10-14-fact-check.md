# Fact-check: friends-split-more-than-chance (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: C(30,2) = 435, 20 x 10 = 200, 200/435 = 0.4598 -> 46%. |
| c2 | verified | Re-ran Demo.tsx REAL with mulberry32(7): 45 distinct friendships, 9 crossing (28 in A, 8 in B). 9/45 = 20%. Made-up class is a convention. |
| c3 | verified | drawClasses draws each of 45 friendships uniformly from 435 pairs, independently (repeats possible). Mean 45 x 200/435 = 20.69. Own seeded run mulberry32(41): first class 26, 1,001 classes average 20.877 (46.4%). |
| c4 | verified | Exact binomial in node: P(X <= 9), X ~ Bin(45, 200/435) = 0.000264 (1 in 3,790) -> 'about 1 in 4,000' fair. Seed-41 run: 0 of 1,001 had <= 9, fewest 11. |
| c5 | verified | 2 x 2/3 x 1/3 = 4/9 = 0.444. E&K (2010) not opened (host blocked); from my own knowledge the 2pq homophily test is in ch. 4 ('Networks in Their Surrounding Contexts'), section 4.1 'Homophily'. Placement: confident. |
| c6 | verified | E&K ch. 4, section 4.1 (not opened; own knowledge): 'if the fraction of cross-gender edges is significantly less than 2pq, then there is evidence for homophily'. Learner sentence matches that test. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I read the builder's pre-flight only after writing the verdicts. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: 435 pairs, 200 cross (45.98%). The pairs view draws CROSS_PAIRS; the reveal's '10 x 20 = 200 lines you counted' is backed by the required 'pairs' milestone. |
| c3 | verified | Own run with mulberry32(41): the first class has 26 crossing; 1,001 classes average 46.39%, 0 with 9 or fewer, fewest 11. rec is replaced only by a larger run and Start over reseeds 41, so the same 1,001 classes give the same record. Binomial mean 45 x 200/435 = 20.69 (46%). |

**Result:** 2 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
