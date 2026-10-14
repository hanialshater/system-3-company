# Fact-check: greedy-slot-machine (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | disputed | Own reimplementation and the extracted MODEL block of Demo.tsx agree: seed 5 first pulls are A LOST and B LOST (first = [0,0]); seeds 1-4 and 6 are A lost, B won. The stage prints 'first pulls: A lost, B lost', so the claim's '(A won, B lost)' contradicts the stage. The rest holds: B pulled 1 of 500, wins per 100 = 40, 29, 23, 30, 41 (163/500 = 32.6, 'about 30'), stuck. Since both looked 0%, greedy stayed on A only because ties go to A. Fix (builder): change the parenthetical to '(A lost, B lost; with both at 0% the tie goes to A)'. The reveal text itself is not wrong. |
| c4 | verified | node, own play() with kit mulberry32, seeds 1-2000: greedy stuck (under 50 B pulls in its last 100) in 30.2%; stuck runs average 29.8 wins in the last 100 and 30.0 per 100 over all 500; 601 of 604 stuck runs began with B's first pull losing; greedy last-100 mean 57.7, explorer 67.95. The learner's default path (Play run 1, Next run, Watch 100 more = seeds 5-106, 102 runs): stuck 33 (32%), greedy 57, explorer 67, so the reveal's hard-coded 'about 3 in 10' sits next to a matching tally. |

**Result:** c3 disputed (blocks publishing until the builder fixes the text and a fact-checker re-checks); the rest verified.
