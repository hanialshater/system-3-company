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

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node of plan(): clumped tests per number in arrival order 0, 1, 1, 3, 3, 2, 6, 3, 6, 5 = 30; equals (# bigger earlier) + (1 if any smaller earlier) for every number; 42 and 44 tie at 6. Spread hand: 1 (70 vs 64). Tile with 0 tests (47) shows no number. |

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | plan() tests 0,1,1,3,3,2,6,3,6,5 = 30, equal to the independent count; Seen row and reveal terms match; 42 and 44 at 6. |

**Result:** every claim open at this pass is now verified.
