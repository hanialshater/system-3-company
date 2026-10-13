# Fact-check: bisect-the-bad-commit, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Testing the middle of the suspects rules out half of them whichever an... | verified | Re-ran with the stage mid(): 999, 500, 250, 125, 63, 32, 16, 8, 4, 2, 1 (10 tests) for BAD = 737. |
| c2 Halving 999 suspects down to 1 takes at most 10 tests, because 2^9 = 5... | verified | ceil(log2 999) = 10; all 999 positions take at most 10 tests (974 take 10, 25 take 9, re-run). |
| c3 Testing one by one from v2 would have taken 736 tests to reach v737.... | verified | v2..v737 = 736 versions tested one at a time (v1 known good). |
| c4 The method works only because once a version breaks, every later versi... | verified | Monotone good-then-bad is the method assumption (git bisect docs). |
| c5 git bisect finds the commit that broke a program this way.... | verified | git-bisect(1): "Use binary search to find the commit that introduced a bug". |
| c6 A test away from the middle can rule out fewer than half the suspects ... | verified | An off-middle test splits unequally; worst case is the larger side. |

Result: 6 verified, 0 disputed, 0 added unverified.
