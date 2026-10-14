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

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | disputed | DISPUTED (two reachable mismatches). Own node port: cover(3, 12) = [3] + [4 to 7] + [8 to 11] + [12], 4 nodes; START min over 3..12 = 2; first change: prev 2, EDIT_VALUES[1] = 8, message 'Position 9 changed from 2 to 8: ...' (that part holds). (1) 'minimum 2': seenMin is written on every combine of 3..12, and combine is allowed again after each edit. Path: Change the value at 9 (2 -> 8), Positions 3 to 12, Combine: the row reads 'minimum 3'; Combine first, then Change, re-select 3 to 12, Combine: the row is overwritten to 'minimum 3'. The row does not keep the first record. (2) 'outlined dashed whenever they are not lit' (reveal: 'dashed when not lit'): trace = !on && !onPath && ..., so after a change [8 to 11], which contains 9, is drawn with the solid green path stroke instead. Path: combine 3..12, drag To to 15 and From to 0 (root lit), Change the value at 9, open the reveal: [3], [4 to 7], [12] dashed, [8 to 11] solid green. Fix (builder): record seenMin only once (or say 'minimum at the time' in the row and drop the fixed 2 from the claim), and either keep the dashed outline on Q blocks that are on the change path or say 'dashed when not lit or highlighted'. |

**Result:** 0 verified, 1 disputed, 0 held unverified, 0 withdrawn. The lesson cannot publish until the builder fixes the disputed claim and it is re-checked.
