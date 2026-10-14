# Fact-check: capped-doubling-game (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c2 | verified | Own node sum of 2^k (1/2)^k for k = 1..20 = 20 (all-heads pays 0, adds nothing); matches fairPrice() and the v2 reveal working ($2 half the time, $4 a quarter, $8 an eighth). |

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node: sum_{k=1..20} 2^k (1/2)^k = 20; reveal text ($2 half the time, $4 a quarter, $1 per flip, 20 flips make $20) matches fairPrice(). |
| c6 | verified | Readout 'Your profit' = sm.total - price x n with sign, matches the sentence. |
| c7 | verified | shares(): out[log2 v] += v / n, so bar k = count_k x 2^k / n; own re-run: bars sum to the average at 200, 250, 550, 600, 1050, 2050 games. Dashed $1 line (.one has stroke-dasharray), bars capped at $2 with money() label (.barOver). |
| c8 | verified | Own mulberry32(2500 + g) re-run at 550 games: shares 0.99 0.93 1.12 1.05 1.22 0.93 0.93 0.93 0.93 1.86 0 0 14.89 0 ... (avg 25.79); readStrip -> flips 1-9 about $1, flip 13 one win, 9 empty. Stage prints money(14.89) = '$14.9'. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
