# Fact-check: heap-bubble-up, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 at most one swap per level: 2 for 6 items, 19 for a million | verified | Stage HEIGHT = floor(log2 6) = 2, MILLION_HEIGHT = floor(log2 1e6) = 19 (log2 1e6 = 19.93). CLRS 4th ed. 6.1 (height floor(lg n), Exercise 6.1-2) and 6.5 (insert O(lg n)). |
| c4 list layout; parent of i is floor((i-1)/2) | verified | Shift of CLRS 4th ed. 6.1 PARENT(j) = floor(j/2) with j = i+1: floor((i+1)/2) - 1 = floor((i-1)/2). Matches parent() in Demo.tsx. |

Result: 2 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
