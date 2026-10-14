# Build note: harm-prices-clear-the-market

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #23 (accepted version: the question gives only the $4 total; the stage shows the valuation table).
- Intent: the 3 × 3 valuation table, best assignment outlined (x–a, y–c, z–b = 23). "Without x/y/z" greys that row, outlines the others' best assignment without it (dashed) and says "Without x, the others' best is 14; with it they get 11." Once tested, the buyer's cell shows "harm $3" directly above its column's clearing price (a $3, b $1, c $0, hidden while locked). Readout totals the harms found.
- Everything computed in Demo.tsx: best() enumerates assignments; clearingPrices() runs the ascending procedure (smallest constricted set, raise its items by 1, renormalise) and ends at 3, 1, 0. In scratch node I also checked the largest-constricted-set variant (same end) and brute-forced integer prices 0 to 12: 79 clearing vectors, unique smallest total 3, 1, 0. Harms 3, 0, 1 (total 4).
- The predict answer index is computed from HARM_TOTAL vs PRICE_TOTAL, not hard-coded.
- Theorem (VCG prices are the smallest clearing prices) is one claimed footnote sentence (c4), citation for the fact-checker.
- Milestones: out-x, out-y, out-z. QA's first three controls reach them.
- Not run (per dispatch): next build, QA, walkthrough, tsc.
