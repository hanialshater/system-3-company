# Fact-check: rolling-hash-window (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: window sums 15 16 20 18 16 18 16 15, pattern 15, flags at windows 1 and 8. |
| c2 | verified | node: s[i+1] = s[i] - v(out) + v(in) reproduces all 7 slides (15-5+6=16, 16-2+6=20, ...). Matches stage msg. |
| c3 | verified | 5 + 7x2 = 19, 8x5 = 40; Demo counter K+2i and K(i+1) at i = 7. |
| c4 | verified | EBCDA = 5+2+3+4+1 = 15; check stops at letter 1 (E vs A); sum is order-invariant. |
| c5 | verified | Derivation: the update touches 2 letters regardless of k. Rabin-Karp: CLRS 4e 32.2; Karp and Rabin 1987, IBM J. Res. Dev. 31(2) (citations from memory, not opened; verdict rests on the derivation). |

**Result:** all 5 claims verified. Lesson fully verified.

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node roll.mjs on FEBCDAFFABCDE: 9 windows, sums 20 15 16 20 18 16 18 16 15, pattern 15, flags at windows 2 (EBCDA) and 9 (ABCDE). Matches Demo SUMS. |
| c2 | verified | node: s[i+1] = s[i] - v(out) + v(in) reproduces all 8 slides; first two 20-6+1 = 15, 15-5+6 = 16, as the stage message prints. |
| c3 | verified | Demo counter K + 2i and K(i + 1) at i = 8: 21 and 45 (node). The reveal is gated by milestone 'second-flag' (i = 8). |
| c5 | verified | Derivation: a slide touches 2 letters whatever the width k. Karp and Rabin 1987 and CLRS 32.2 from memory, not opened; verdict rests on the derivation. |
| c6 | verified | Demo: '-' chip at i-1, '+' chip at i+K-1, 'kept' bracket from xOf(i) to xOf(i+K-1) spans letters i..i+3 = 4 letters shared with the previous window. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
