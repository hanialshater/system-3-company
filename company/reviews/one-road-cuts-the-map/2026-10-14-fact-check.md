# Fact-check: one-road-cuts-the-map (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran Demo.tsx reach() for each road: only 3-4 leaves {1,2,3}; others reach all 6. |
| c2 | verified | Degrees from ROADS: town 3 = 3, town 4 = 3; closing 2-3, 1-3, 4-5, 4-6 keeps all 6. |
| c3 | verified | Cycle/detour equivalence re-derived (both directions). |
| c4 | verified | Implemented low-link DFS (bridge iff low[v] > disc[u]) on this map: returns only 3-4. Tarjan (1974) IPL 2(6) and CLRS 4e problem 20-2 cited from memory, not opened; the description matches the standard algorithm. |
| c5 | verified | Demo.tsx fills reach(closed) towns var(--domain), others var(--bad). |
