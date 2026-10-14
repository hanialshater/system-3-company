# Fact-check: digits-are-logs, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 Ten doublings give 1024. Times 1000 adds three zeros, so about 3 more ... | verified | 2^10 = 1024; own node: digits(2^d) - digits(2^(d-10)) = 3 for every d = 10..100 (1 digit at 2^0, 31 at 2^100). Note: x1024 not x1000, the text says about. |

Result: 1 verified, 0 disputed.
