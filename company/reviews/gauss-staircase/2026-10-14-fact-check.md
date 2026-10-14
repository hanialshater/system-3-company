# Fact-check: gauss-staircase, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c2 Two staircases of n steps, one turned half a turn, fill an n-by-(n+1) ... | verified | Column i has i + (n+1-i) = n+1 dots, n columns: n(n+1), so the sum is n(n+1)/2. |
| c3 1 + 2 + ... + 100 = 100 x 101 / 2 = 5,050; two 100-step staircases fil... | verified | 100 x 101 = 10,100; half 5,050. |
| c4 The reveal quotes the largest step count the learner showed with the f... | verified | Demo.tsx: onBuilt(n) fires when the copy is shown, built = max; reveal prints built x (built+1) and half. m = 10: 110, 55. |

Result: 3 verified, 0 disputed.
