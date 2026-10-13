# Fact-check: tournament-second-best, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 With 8 players in knockout rounds, the champion is found in 7 matches ... | verified | 7 matches, 3 rounds, champion plays 3. |
| c2 The second best can only lose to the best, so it must be one of the pl... | verified | Proof by contradiction; re-simulated brackets agree. |
| c3 On this bracket the true second best, F, was knocked out in round 1, n... | verified | Replayed STRENGTH = [3,5,1,6,8,7,2,4]: E champion, final loser D, second best F lost to E in round 1. |
| c4 2 more matches among the 3 candidates find the runner-up: 9 matches in... | verified | 2 more matches among 3 candidates = 9; 7 + 6 = 13; Knuth 5.3.3 n + ceil(lg n) - 2 = 9 for n = 8. |

Result: 4 verified, 0 disputed, 0 added unverified.
