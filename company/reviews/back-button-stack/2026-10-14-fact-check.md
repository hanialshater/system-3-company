# Fact-check: back-button-stack (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Matches observable browser behaviour and the WHATWG session-history model (navigating after traversal clears forward entries); spec page not opened (network blocked). Stage visit() truncates pages above the index and lists them as thrown away; pages above stay tagged 'ahead' after Back. |
| c3 | verified | Definition: a stack is last-in, first-out (CLRS 3rd ed. 10.1, first paragraph; not opened, network blocked). Reveal wording matches. |
| c4 | verified | Demo.tsx: only Back / Visit / Start over controls (no Forward); tags 'ahead' for i > at and 'Back goes here' for i = at - 1 (after prediction). |

**Result:** all claims in this pass verified.
