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

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node hopsDown(13) = 13, 12, 8 (1101, 1100, 1000); ranges 13, 9-12, 1-8 tile 1-13; sum 61 = RUN[13]. Prefix 15: 15, 14, 12, 8; prefix 7: 7, 6, 4. Reveal requires milestone tiled (start 13), so qSum exists. |
| c4 | verified | Own node hopsUp(1) = 1, 2, 4, 8, 16 (5 cells); every running total 1..16 includes position 1, so all 16 change. Stage readouts 5 and 16 match. |
| c5 | verified | Re-derived: down hops = popcount(i), up hops <= floor(log2 n) + 1. Own node over i = 1..16: max 4 down, max 5 up (from 1). 'About log2 n' accurate. Fenwick 1994 not opened; not needed. |
| c6 | verified | Own node prefix sums of V = 3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3: 3, 4, 8, 9, 14, 23, 25, 31, 36, 39, 44, 52, 61, 68, 77, 80. |

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Own node: i += i & -i from 1 gives 1, 2, 4, 8, 16 (each step doubles, since a power of two is its own lowest bit); independently, position 1 lies in cell j = (j - lowbit(j), j] only when j is a power of two, so for N = 16 the cells are exactly 1, 2, 4, 8, 16 (Fenwick 1994 not opened; not needed). Generated line: "Change position 1, hop up by adding the lowest 1 bit: 1=00001 → 2=00010 → 4=00100 → 8=01000 → 16=10000". up is never cleared (button disabled once set), so the line stays. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
