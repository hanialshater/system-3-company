# Fact-check: running-median-two-heaps (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node (fc21/med.mjs) with sorted prefixes: 5, 10, 5, 4. |
| c2 | verified | Own trace of the stated rule: lower [5]; 15 up; 1 down; 3 down makes lower 3 vs upper 1, so 5 moves up; final lower {1, 3}, upper {5, 15}, (3 + 5) / 2 = 4. Same as Demo feed(). |
| c3 | verified | Invariant argument checked; own random test (5,000 streams up to 15 numbers) of the same insert-and-rebalance rule always matched the true median. |
| c4 | verified | Insert and extract on a binary heap walk one root-to-leaf path, height floor(log2 n): re-derived. 2^18 = 262,144 <= 500,000 < 2^19, so 19 levels (Demo MILLION_LEVELS). CLRS 4e ch. 6 cited from memory, not opened; the sentence does not depend on it. |
| c5 | verified | Max-heap and min-heap definitions; stage labels 'Lower · biggest on top' and 'Upper · smallest on top'; Demo uses maxFirst for lower, minFirst for upper. |

**Result:** all open claims verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own two-halves run of 5, 15, 1, 3: 5 lower; 15 > 5 upper; 1 <= 5 lower (2\|1, no move); 3 <= 5 lower, 3\|1 too big, 5 moves up; end 1 3 \| 5 15, median 4. Log template gives '3 → lower, 5 crosses · median 4'; other three rows 'nothing crosses'. |
| c6 | verified | Own run: after 5, 15, 1 halves sorted '1 5 \| 15'; on 3 exactly one move (5). Matches question text and answer index crossings() = 1. |

**Result:** all open claims verified; no disputes.
