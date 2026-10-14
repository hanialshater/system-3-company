# Fact-check: fair-game-still-ruins, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c7 martingale: 110 x chance = stake | verified | Own derivation: fair $1 bets make S_n a martingale; the stopped walk is bounded in [0, 110] and T is a.s. finite (E[T] = 10 x 100), so optional stopping gives 10 = 110 p, p = 10/110. Same as Feller vol. 1, ch. XIV section 2 (difference-equation solution q_z = 1 - z/a for p = q). Matches reveal text. |

Result: 1 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
