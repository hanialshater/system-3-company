# Fact-check: clear-the-lowest-one (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Node: 10110 -> 10100 -> 10000 -> 0, 3 repeats. |
| c2 | verified | Derivation re-checked; (22-1).toString(2) = 10101. |
| c3 | verified | repeatsToZero(255) = 8. |
| c4 | verified | repeatsToZero(2^30) = 1; 31 right shifts to 0; power-of-two test x & (x-1) = 0 checked for 1..4999. K&R 2e exercise 2-9 cited from memory, not opened; the sentence does not depend on it. |

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v2 wave E revision. Method: read v2 Demo.tsx (caption, three rows, runs list, toggles, Back to 10110, conditional reveal clauses) before the sources, then re-ran the numbers in my own node port (scratchpad fc24/clr.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | 10100 - 1 = 10011, three digits flipped; reveal value comes from the deterministic 10110 run, so it cannot change. For x up to 2^20, x XOR (x - 1) is exactly the lowest 1 and the zeros below it. |
| c3 | verified | chainFrom(255): 8 repeats = 8 ones; repeats = popcount for every x up to 2^20. |
| c4 | verified | chainFrom(16) = [16, 0]; x & (x - 1) = 0 iff power of two, for x up to 2^20. Reveal quotes whichever one-repeat run the learner made. |

**Result:** every claim open at this pass is now verified.
