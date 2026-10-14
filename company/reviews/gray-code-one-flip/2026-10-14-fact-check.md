# Fact-check: gray-code-one-flip (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: gray(3)=010, gray(4)=110; popcount(011^100)=3, popcount(010^110)=1. Reveal renders str(gray(3)) to str(gray(4)). |
| c2 | verified | Own node: Gray sequence 000 001 011 010 110 111 101 100; binary flips 1 2 1 3 1 2 1 = 11, Gray 7 x 1 = 7. |
| c3 | verified | Stage rule matches gray() = n ^ (n >> 1). Derivation re-checked; own node check: g(n) XOR g(n+1) has one bit for all n < 4096. |
| c4 | verified | Follows from c3: neighbours differ in one bit, so a read during one transition gives one of the two neighbouring codes (ideal per-bit sensing). Search snippets on encoders (control.com 'An Introduction to Gray Code for Encoders'; Omron FAQ) say the same: a misread is at most one step. |
| c5 | verified | Patent US 2,632,058 NOT opened (patents.google.com blocked); search snippets give 'Pulse Code Communication', F. Gray, filed 13 Nov 1947, granted 17 Mar 1953, but the patent is about pulse-code transmission, not encoders, and is not on the stage. The learner sentence (encoders use Gray code to avoid mid-transition misreads) is corroborated by search snippets from several independent sources (control.com, Omron, NIST DADS entry with a rotary-encoder figure); no page opened. Knuth TAOCP 4A not opened. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
