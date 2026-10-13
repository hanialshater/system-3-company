# Fact-check: the-contrary-program, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 If H says D halts, D loops forever; if H says D loops forever, D stops... | verified | Two-branch case analysis of D. |
| c2 From any checker H that claims to work on every program, we could buil... | verified | Sipser Thm 4.11 diagonal construction; stage simplification disclosed. |
| c3 Turing proved in 1936 that the halting problem cannot be solved by any... | verified | Turing 1936 proves undecidability (the "halting" phrasing and the exact halting-problem statement are standard but later formulations; the result is conventionally credited to Turing 1936). Acceptable as written; noted for the record. |
| c4 Particular programs can be checked: A (print, then stop) halts and B (... | verified | A prints then stops; B loops: verdicts on single programs can be right; reveal says exactly that. |

Result: 4 verified, 0 disputed, 0 added unverified.
