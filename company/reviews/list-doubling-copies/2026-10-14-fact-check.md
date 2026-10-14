# Fact-check: list-doubling-copies, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 after copying 8 into room for 16, 8 more appends | verified | grow() at len 8, cap 8 sets cap 16 ("Copied 8 items into room for 16"); Append is enabled until len = cap = 16: 8 appends. |

Result: 1 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
