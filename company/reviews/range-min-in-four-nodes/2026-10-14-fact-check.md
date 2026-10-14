# Fact-check: range-min-in-four-nodes (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node re-implementation of the take/skip/split cover (fc21b/seg.mjs): [3,12] -> [3,3], [4,7], [8,11], [12,12] = 4 nodes. |
| c2 | verified | Own node check: [1,14] -> 6 nodes; maximum over all 136 ranges of 16 positions = 6. Matches Demo WIDE_COUNT / MAX_COUNT. |
| c3 | verified | Re-derived and checked: at most 2 nodes taken per level (own check, n = 4..1024: max taken per level = 2); log2 n + 1 levels; observed maxima 2, 4, 6, ..., 18 = 2 log2 n - 2 for n = 4..1024, all within 2 log2 n. 'At most about' is accurate. |
| c4 | verified | Own check: 31 nodes over 5 levels (16, 8, 4, 2, 1 per node); every position lies in exactly one node per level, so 5 nodes contain position 9 (Demo PATH_LEN = 5). Update rewrites those; query visits O(log n) nodes (c3). |
| c5 | verified | Matches Demo BLOCKS: levels d = 0..4, sizes 16/2^d, aligned, 31 nodes; each displayed node value is min over its slice. Hand-picked values do not affect the counts (cover() uses only positions). |
| c6 | verified | Own randomized check: combining the cover nodes with min, max and + gives the same result as directly over the range, for all 136 ranges. Only associativity of the combine is needed. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node of cover(): 5 to 14 -> [5], [6-7], [8-11], [12-13], [14] = 5; 5 to 12 -> 4; max over all 136 ranges = 6 (only 1 to 14). Reveal computes the learner's own range with the same cover(). |
| c3 | verified | Re-derived (pass 21 still applies): at most 2 nodes per level, log2 n + 1 levels; observed max 6 <= 8 for n = 16. Gloss 'halvings from n down to 1 (4 for 16)' is correct. |
| c4 | verified | Own node: 5 blocks contain position 9 (one per level, 16/8/4/2/1); milestone changed is required, so the learner pressed the change. |
