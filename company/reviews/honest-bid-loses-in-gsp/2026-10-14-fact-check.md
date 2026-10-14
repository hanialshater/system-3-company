# Fact-check: honest-bid-loses-in-gsp (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own independent GSP script: bid 7 -> slot 1, price 6, 10 x (7 - 6) = 10. |
| c2 | verified | Own script, ties to other: bids 0-1 no slot, 2-6 slot 2 at $1 (24), 7-10 slot 1 at $6 (10); ties to X: 1-5 -> 24, 6-10 -> 10. $5 -> 24 and $8 -> 10 either way. |
| c3 | verified | Shown by c1-c2. Edelman, Ostrovsky & Schwarz, AER 97(1) 242-259 (2007) confirmed by search snippets (NBER w11765, citedrive DOI 10.1257/aer.97.1.242): GSP has no dominant-strategy equilibrium, truth-telling is not an equilibrium in general. Varian 2007 not found by search, not opened; E&K ch. 15 placement from own knowledge (GSP section, confident on chapter). Learner sentence does not depend on the unopened ones. |
| c4 | verified | Chip 'ties go to the other' and muted reveal line; gsp() holds Y, Z fixed, one round. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
