# Fact-check: seventy-two-doubling (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | node: 100 ln 2 = 69.31; divisors of 72 in 2..12: 2 3 4 6 8 9 12 (also 18 24 36). Note: 72 also fits better than 69.3 at everyday rates because ln(1+r) < r; at 8% the exact constant is 8 x 9.006 = 72.05. The claim's "which is why" gives the two reasons stage and reveal give; acceptable. |

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | node: /72/r - ln2/ln(1+r)/ for r = 5..20 max 0.202 (20%), 0.193 (5%); 8% gives 9.0 vs 9.006; 9% prints 8.0 vs 8.0 (8.043). Reveal computes the other rate live. |
| c5 | verified | Divisors of 72 include 2, 3, 4, 6, 8, 9, 12 (node). 'One reason' corroborated by web-search copies of Wikipedia 'Rule of 72' ('a convenient choice of numerator, since it has many small divisors'); Wikipedia itself and Brealey, Myers & Allen not opened. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
