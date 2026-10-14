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

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node copy of v3 step() from empty: 17 steps, 16 tries, first solution at try 8, solutions 2-4-1-3 and 3-1-4-2; independent DFS also 16. Reveal uses the learner's clean run, which can only come from EMPTY via step(). |
| c3 | verified | A conflicting prefix has no conflict-free extension; refusing it skips all completions. Stage marks attacked squares with x. |
| c6 | verified | Own node: same step() at N=8 gives 2,056 placements and 92 solutions; 64 squares. The 16 = 16 match does not recur. |

**Result:** 3 verified, 0 disputed, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node copy of v4 step(): 17 steps from EMPTY, 16 tries, first solution at 8, solutions 1302 and 2031 (columns 2-4-1-3, 3-1-4-2). finishRun loops the same step(); result is set only when clean (no hand taps since EMPTY), so the line and reveal always quote a run from empty. Independent DFS: 16 for n = 4; 2,056 placements, 92 solutions, 16,777,216 boards for n = 8. |
