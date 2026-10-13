# Fact-check: call-stack-depth, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 At the deepest moment of factorial(3), 4 calls are open: factorial(3),... | verified | Instrumented recursion: max depth 4 for factorial(3). |
| c2 A new call does not replace the old one: each call keeps its own n and... | verified | Stack frames; Patterson & Hennessy 2.8 treats the recursive factorial. |
| c3 The answers come back as 1, 1, 2, 6: factorial(0) = 1, factorial(1) = ... | verified | Returns 1, 1, 2, 6. |
| c4 factorial(0) = 1 is the base case: the one call that answers without c... | verified | 0! = 1 by convention; base case defined in the question. |
| c5 Without a base case the calls never stop, the stack runs out of room a... | verified | Node: unbounded recursion throws RangeError (stack overflow). |

Result: 5 verified, 0 disputed, 0 added unverified.
