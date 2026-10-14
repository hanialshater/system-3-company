# Fact-check: two-bets-split (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node outcomes(2): -10% 0.25, +5% 0.5, +20% 0.25; loss = 25%, the loss value is -10%. Reveal pins n = 2 (pinned = phase === 'reveal'), chip text matches. |
| c8 | verified | node outcomes(3): -10, 0, +10, +20; ticks are every bar's return (plus a 0% tick only when no bar is within 4 points: n = 1, 2). 'break even' label on r === 0 bars (n = 3, 6; exact zeros in floating point). |

**Result:** every claim open at this pass is now verified.
