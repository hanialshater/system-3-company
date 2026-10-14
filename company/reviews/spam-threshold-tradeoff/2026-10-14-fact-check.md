# Fact-check: spam-threshold-tradeoff (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Counted from Demo.tsx SPAM/REAL with >= t: t=50 spam 90 80 70 50 = 4, real 60 = 1; t=25 spam 5, real 60 40 30 = 3; t=65 spam 90 80 70 = 3 (2 through), real 0. Predict answer index 2 = "3" matches; buttons Try 0.25 / Try 0.65 and milestones gate the reveal as the v2 note says. |
