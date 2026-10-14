# Fact-check: four-queens-pruning (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 4^4 = 256. |
| c2 | verified | Own DFS and a copy of the stage's step(): 16 placements, first solution at 8, solutions 2 4 1 3 and 3 1 4 2. |
| c3 | verified | A conflicting prefix has no conflict-free extension; refusing it skips all 4^(rows left) completions. |
| c4 | verified | 8^8 = 16,777,216 (node). |
| c5 | verified | Own DFS, same counting rule: 2,056 placements, 92 solutions (2,057 nodes with the root). 92: Wirth, CACM 14(4) (1971). |

**Result:** all claims in this pass verified.
