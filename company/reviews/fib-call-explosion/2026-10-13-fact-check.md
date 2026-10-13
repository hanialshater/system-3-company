# Fact-check: fib-call-explosion (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: counting calls of naive fib with fib(0)=fib(1)=1 gives 3, 5, 9, 15 for n=2..5. |
| c2 | Verified: calls per argument in fib(5) are {0:3, 1:5, 2:3, 3:2, 4:1, 5:1}; fib(3) twice, fib(2) three times. |
| c3 | Verified: memoized fib(5) (left child first) computes 6 values, 3 cache hits (fib(1) under fib(3), fib(2) under fib(4), fib(3) under fib(5)), 9 calls total. Matches the stage's MEMO_COMPUTED / MEMO_LOOKUP sets and the 'Computed 6' readout. |
| c4 | Verified: naive fib(30) = 2,692,537 calls (C(n)=C(n-1)+C(n-2)+1); memoized computes 31 values with 28 hits. |

Deterministic, no seeds. Reveal text matches the claims (transcript). Stage hint 'Repeats: ...' derives from the visible tree and is consistent with c2. No unrecorded claims.
