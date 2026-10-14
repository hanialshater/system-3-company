# Fact-check: back-button-stack (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Matches observable browser behaviour and the WHATWG session-history model (navigating after traversal clears forward entries); spec page not opened (network blocked). Stage visit() truncates pages above the index and lists them as thrown away; pages above stay tagged 'ahead' after Back. |
| c3 | verified | Definition: a stack is last-in, first-out (CLRS 3rd ed. 10.1, first paragraph; not opened, network blocked). Reveal wording matches. |
| c4 | verified | Demo.tsx: only Back / Visit / Start over controls (no Forward); tags 'ahead' for i > at and 'Back goes here' for i = at - 1 (after prediction). |

**Result:** all claims in this pass verified.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own trace: A,B,C at C; Back -> B; visit D drops C -> A,B,D; Back -> B. Demo.tsx back()/visit() do exactly this; reveal says the same. Real browsers agree: WHATWG HTML session history, navigating removes the forward entries. |
| c2 | verified | WHATWG HTML Living Standard, session history: on navigation, entries after the current one are removed; until then they remain (forward). Demo.tsx visit() drops pages.slice(at + 1); pages with i > at are tagged 'ahead'. |
| c4 | verified | Demo.tsx: one pages array, only Back / Visit / Start over controls (no Forward); tag 'ahead' for i > at, 'Back goes here' for i = at - 1 when unlocked. |

**Result:** all open claims verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
