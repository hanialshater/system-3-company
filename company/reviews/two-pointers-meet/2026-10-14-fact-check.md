# Fact-check: two-pointers-meet (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 8 x 7 / 2 = 28 (node). |
| c2 | disputed | The 3 sums are right (16, 18, 19) and the grey count is 13 (rows 1 and 3: 7 + 6), but 2 of those 13 pairs, 1 + 15 and 3 + 15, are the sums the learner just looked at. Own node trace: ruled out 13, never looked at 11. The claim ('ruling out 13 of the 28 pairs without looking at them') and the reveal ('13 of the 28 pairs, never looked at') say something false. Fix (builder): e.g. 'ruled out 13 of the 28 pairs; 11 of them were never looked at', or count only unseen pairs. Re-check after the fix. |
| c3 | verified | 15 = max; 1 + x <= 16 < 19 for every x. |
| c4 | verified | Own node: gap j - i starts at 7 and each check reduces it by 1; checks happen at gaps 7..1, so at most 7. Exhaustive over targets 0..40 on this list: max 7. |
| c5 | verified | Own node: rule's answer agrees with brute force for every target 0..40 on this list and on 20,000 random sorted lists (n 2..11), and never exceeds n - 1 sums. CLRS 3rd ed. exercise 2.3-7 is the pair-sum problem. |

**Result:** disputed: c2. Publishing blocked until the builder fixes and a fact-checker re-checks.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node trace of the rule on 1 3 4 6 8 11 13 15, target 24: sums 16, 18, 19, 21, 23, 26, 24 (7 checks, ends on 11 + 13). Ruled-out set (row < i or column > j at i = 11, j = 13) = 27 of 28; 27 - 6 checked = 21 never looked at; matches Demo.tsx reveal ruledCount - (checks - 1). Max over targets 0..60 is 7. |
| c3 | verified | Sorted list: 1 + x <= 1 + 15 = 16 < 24 for every x (own node check). Same sentence in the reveal. |
| c4 | verified | Gap j - i starts at 7 and drops by 1 per check, so at most 7 checks; own node over targets 0..60: max 7. Stage starts checks at 1 and moveLeft/moveRight refuse off-rule moves, so the reveal's 'This search used all 7' always holds. |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
