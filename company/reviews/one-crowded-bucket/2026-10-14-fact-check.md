# Fact-check: one-crowded-bucket (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | own node re-implementation of plan() with the same counting rule (scratchpad fc22/bucket.mjs): spread 1, clumped 30, 50..41 descending 45, clumped hand reversed 28. |
| c2 | verified | same script: bucket counts [1,1,1,1,1,1,2,0,1,1]; only bucket 61-70 holds two (64, 70); its 1 comparison is the total. |
| c3 | verified | floor((v-1)/10) = 4 for v = 41..50; script puts all ten in bucket index 4; stage label reads 'all 10 numbers in bucket 41 to 50'. |
| c4 | verified | expected-linear result re-derived (E[n_i^2] = 2 - 1/n for n uniform keys in n buckets, so sum of insertion-sort costs is O(n) expected); search shows the CLRS bucket-sort section text (8.4) stating linear expected time under a uniform distribution, secondary copy only, edition not confirmed; book not opened. Learner sentence is the qualitative half, which the derivation and the stage support. |
| c5 | verified | if all n keys share one bucket the remaining cost is one insertion sort of n items (worst n(n-1)/2 = 45 for n = 10); stage shows 30 for this order, all in 41-50. |

**Result:** every claim open at this pass is now verified.
