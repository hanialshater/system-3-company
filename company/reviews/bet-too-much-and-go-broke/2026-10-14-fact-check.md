# Fact-check: bet-too-much-and-go-broke (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own replay (mulberry32(2), 31 x 100 flips): middle player (16th by heads, ties by index) has 60 heads; ends x2.40, x4.50, x7.49, x4.37, x0.78, x0.00021 at 5/10/20/30/40/60%. |
| c2 | verified | Same replay: above start 31, 30, 27, 21, 13, 1 of 31. |
| c3 | verified | 1.6 x 0.4 = 0.64; stage line 'one of each, by 0.64' at 60% and the reveal. |
| c4 | verified | Derived: g'(f) = 0.6/(1 + f) - 0.4/(1 - f) = 0 at f = 0.2 (numeric argmax 0.2000); g = 0.0088, 0.0150, 0.0201, 0.0147, -0.0024, -0.0845. Kelly (1956), Bell System Technical Journal 35(4): 917-926 is the correct citation (not opened; the derivation carries the claim). |
| c6 | verified | Question: 60% heads, even money, same share each round; reveal 'for this model coin; real bets differ. Not advice.' |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
