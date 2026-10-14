# Fact-check: rising-price-stops-at-second (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node re-run of inAt()/over(): from $30 by $1, 2 bidders in through $55, 1 at $56; Cal out at $41, Ben out at $56; 70 - 56 = 14. Stage 'quit at $value+1'. |
| c2 | verified | count of values >= p: 2 at 55, 1 for 56..70, 0 above 70 (node). E&K ch. 10 (matching markets, market-clearing prices) placement matches my knowledge; section not confirmed. |
| c3 | verified | second-highest value 55 vs 56 rising. Vickrey, J. Finance 16(1):8-37 (1961) confirmed bibliographically via search; not opened. E&K ch. 9 has a section 'Relationships between different auction formats' (TOC via search) covering ascending vs second-price. |
| c4 | verified | Demo.tsx rules and muted line match. |

**Result:** every claim open at this pass is now verified.
