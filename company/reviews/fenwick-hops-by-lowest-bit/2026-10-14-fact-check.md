# Fact-check: fenwick-hops-by-lowest-bit (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo CELL[i] = sum V[i-low(i)+1..i] with low(i) = i & -i; -i = ~i + 1 isolates the lowest set bit. Fenwick 1994, Softw. Pract. Exp. 24(3):327-336 (DOI 10.1002/spe.4380240306) confirmed bibliographically by web search; paper not opened (host blocked). Definition verified against the code and derivation. |
| c2 | verified | node fen.mjs: hopsDown(13) = 13, 12, 8 covering [13], [9..12], [1..8]; 15 -> 15 14 12 8; 7 -> 7 6 4. |
| c3 | verified | node: cells 1..16 = 3 4 4 9 5 14 2 31 5 8 5 21 9 16 9 80; 9 + 21 + 31 = 61 = direct prefix sum. The digits are those of pi (3.141592653589793). |
| c4 | verified | node: hopsUp(1) = 1 2 4 8 16; every running total 1..16 contains position 1. |
| c5 | verified | Derivation re-done; node n = 1024: at most 10 down hops, 11 up hops (floor(log2 n) + 1). |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
