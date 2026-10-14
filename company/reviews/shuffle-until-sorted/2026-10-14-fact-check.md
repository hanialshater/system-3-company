# Fact-check: shuffle-until-sorted (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node shuf.mjs with kit mulberry32 + Demo fisherYates: first sorted 5-card deal on seed 47 at shuffle 183; seed 4205 100 runs mean 112.76 (113), min 2, max 695; n=3: 12, mean 6.64 (7); n=4: 43, mean 22.08 (22). Run length is counted from runStart = 0 whatever the press order. 200 other seeds: 5-card means 87-156, so 113 is one example (as the source says). |
| c2 | verified | Derivation (geometric waiting time, mean 1/p = n!); Demo shuffles from 1..n every time. Knuth 3.4.2 Algorithm P cited from memory, not opened; the verdict does not rest on it. |
| c3 | verified | 3! = 6, 4! = 24; stage averages 7 and 22 are consistent with 'about'. |
| c4 | verified | node: 10! = 3,628,800; n! = n x (n-1)!. |
| c5 | verified | Demo fisherYates(n) starts from base(n) each call, so successive rows are independent; exactly one of n! orders passes inOrder(). |
| c6 | verified | Derivation: uniform shuffles until sorted have expected n! shuffles whatever the history. Gruber, Holzer, Ruepp, FUN 2007, LNCS 4475 pp. 183-197 confirmed bibliographically by web search; paper body not opened (host blocked), so the verdict rests on the derivation. |

**Result:** 6 verified, 0 disputed, 0 withdrawn.
