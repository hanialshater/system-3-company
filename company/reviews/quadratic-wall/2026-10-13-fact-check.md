# Fact-check: quadratic-wall, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Checking every pair among n files takes n × (n − 1) ÷ 2 comparisons: 5... | verified | n(n-1)/2: 10, 45, 190. |
| c2 1,000 files need 1,000 × 999 ÷ 2 = 499,500 comparisons.... | verified | 1000 x 999 / 2 = 499,500. |
| c3 Doubling from 10 to 20 files multiplies the pairs by 4.2, not 2; 100 t... | verified | 190/45 = 4.22; 499,500/45 = 11,100 for 100x the files. |
| c4 Work that grows with the square of the input hits a wall long before t... | verified | Theta(n^2); qualitative. |

Result: 4 verified, 0 disputed, 0 added unverified.
