# Fact-check: cut-the-rod-for-more (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo PRICE = [1,5,8,9], shown in the predict stem and stage note. CLRS Figure 14.1 prices from memory (1 5 8 9 10 17 17 20 24 30), not opened; the prices are a lesson convention either way. |
| c2 | verified | node rod.mjs, Demo solve(): 1 5 8 10, cut 2+2. Own enumeration of the 8 ordered cuttings of 4: 4 7 7 9 7 10 9 9; only 2+2 = 10. |
| c3 | verified | Derivation: every cutting has some first piece k, and the rest is a cutting of n-k worth at most best(n-k), achieved by its best cutting; so best(n) = max_k p(k) + best(n-k). Matches Demo solve() and the choice list. CLRS 14.1 from memory, not opened. |
| c4 | verified | Demo TABLE = solve(PRICE) computed once; choices(n) reads TABLE[n-k] for k = 1..n, all already filled because the learner fills in order. |
| c5 | verified | node: Demo solve on 1 5 8 9 10 17 17 20 gives best 1 5 8 10 13 17 18 22, pieces 2 + 6; own brute force over all 128 compositions of 8 also gives 22. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
