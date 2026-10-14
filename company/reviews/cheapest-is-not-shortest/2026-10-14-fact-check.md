# Fact-check: cheapest-is-not-shortest (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Dijkstra correctness for non-negative weights (CLRS 3rd ed. 24.3, Thm 24.6; Dijkstra 1959, Numer. Math. 1: 269-271; not opened). node run: settle S 0, A 2, B 4, G 6. The 'later route costs more' note appears when a settled town yields no changes (at G: 'Going on to S would cost 16, more than its 0'). |
| c5 | verified | Stage default message: 'A label is the cheapest cost from S found so far; infinity means not reached yet'; START labels A, B, G = Infinity rendered as the infinity sign. |

**Result:** all claims in this pass verified.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Tentative distance d[v] (CLRS 3rd ed. 24.1, 24.3 Theorem 24.6: with non-negative weights the extracted minimum's d equals the true distance). Stage default message and fmt(Infinity) = '∞' match; all road costs positive; ties allowed (tap rejects only label > smallest). |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
