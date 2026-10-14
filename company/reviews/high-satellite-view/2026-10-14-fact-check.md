# Fact-check: high-satellite-view, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c10 from 400 km about 3% | verified | (1 - R/(R+h))/2 at h = 400: 2.954% (R 6371 or 6371.0088); stage pct() shows 3.0%. The reveal quotes min of the low heights tried, as the claim says. |

Result: 1 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
