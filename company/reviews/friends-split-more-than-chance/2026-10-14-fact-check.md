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
