# Fact-check: fair-shuffle-trap (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own enumeration of all 27 runs: ABC 4, ACB 5, BAC 5, BCA 5, CAB 4, CBA 4. |
| c2 | verified | 5/4 = 1.25. |
| c3 | verified | 27/6 = 4.5, not an integer. |
| c4 | verified | Own enumeration: positions 1, 2 swap with 0..2 and 1..2 give 6 runs, each order once. Knuth TAOCP Vol. 2, 3.4.2 Algorithm P (shuffling); CLRS 3rd ed. 5.3 RANDOMIZE-IN-PLACE. |
| c5 | verified | Each of n! orders must get R/n! runs; necessary condition, stated as such in the source. |

**Result:** all claims in this pass verified.
