# Fact-check: odds-average-the-bettors (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 300*0.8 + 100*0.4 = 280; 280/400 = 0.70; (80+40)/200 = 0.60. pool() and reveal match. |
| c2 | verified | (w p1 + w p2)/2w = (p1+p2)/2; preset 'Bettor 2 richer' with start beliefs: (100*0.8 + 300*0.4)/400 = 0.50. Presets keep the current beliefs, so the reveal's 'bettor 2's 40%' assumes the learner left beliefs at the start (non-blocking). |
| c3 | verified | algebra: sum w_i p_i / sum w_i; pool() computes exactly this. |
| c4 | verified | re-derived: maximise sum_i p_i log(b_i W o_i) subject to sum b_i = 1 gives b_i = p_i, independent of the odds, so it holds in a pari-mutuel pool with no take. Kelly, BSTJ 35(4):917-926 (1956) confirmed bibliographically via search; paper host blocked, not opened. Search found lecture notes on E&K 22.2 (horse races, betting, beliefs) stating the log-utility bettor bets fraction a_n and that odds are the wealth-weighted belief; E&K ch. 22 placement matches my knowledge (confident). |
| c5 | verified | Demo.tsx: two bettors, no house cut, all money bet by belief; chip and muted line say so. |

**Result:** every claim open at this pass is now verified.
