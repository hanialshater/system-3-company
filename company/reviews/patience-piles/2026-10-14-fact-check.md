# Fact-check: patience-piles (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node deal: [3,1,1] [4,2] [5] [9,6]. |
| c2 | verified | Own O(n^2) DP: LIS = 4; 1 4 5 6 and 3 4 5 9 are both increasing subsequences in order (node). |
| c3 | verified | Follows from c2: 3 4 5 9 is maximal and starts at 3, not the minimum 1. |
| c4 | verified | Piles are non-increasing; a strictly increasing run cannot take two cards from one pile (equal 1s included). |
| c5 | verified | Back-pointer argument re-derived; own node check: piles = LIS length on 20,000 random sequences with repeats. Aldous and Diaconis, Bull. AMS 36(4) (1999). Stage trace from pile 4 gives 1 4 5 6. |

**Result:** all claims in this pass verified.
