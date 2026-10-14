# Fact-check: start-after-the-deficit (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own prefix sums from A: 1, -2, 2, 0, 1; minimum after B. |
| c2 | verified | Own node over all starts: A 1,-2; B -3; C 4,2,3,4,1 (only success); D -2; E 1,2,-1. |
| c3 | verified | 1 - 3 + 4 - 2 + 1 = 1 >= 0; existence follows from c4. |
| c4 | verified | Proof re-derived (P_k - m >= 0 after j; P_total - m + P_k >= 0 up to j); own node check on 50,000 random loops with non-negative total: start after the minimum prefix never goes negative. |

**Result:** all claims in this pass verified.
