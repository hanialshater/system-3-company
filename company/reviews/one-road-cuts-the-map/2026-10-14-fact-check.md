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

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Derivation: an edge uv is on a cycle iff u and v stay connected without it; on stage brute force (own node) only 3-4 disconnects (3 of 6 reachable), the other six each lie on a triangle. |
| c4 | verified | Own DFS copy (neighbours high first): disc 1:1, 3:2, 4:3, 6:4, 5:5, 2:6; low[4] = 3 > disc[3] = 2, so 3-4 is the only bridge (matches brute force). Reveal template gives 'town 4 was visited #3 ... ↑#3. Town 3 is #2'. |
| c6 | verified | Own DFS: tree roads 1-3, 3-4, 4-6, 6-5, 3-2; non-tree 1-2 and 4-5 drawn dashed '2 4' after the walk; 3-4 drawn thick domain colour and named in the note 'Bridge: 3–4' (with roads reopened). Badges '#disc ↑#low'. |

**Result:** all open claims verified; no disputes.
