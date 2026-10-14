# Fact-check: clear-the-lowest-one (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Node: 10110 -> 10100 -> 10000 -> 0, 3 repeats. |
| c2 | verified | Derivation re-checked; (22-1).toString(2) = 10101. |
| c3 | verified | repeatsToZero(255) = 8. |
| c4 | verified | repeatsToZero(2^30) = 1; 31 right shifts to 0; power-of-two test x & (x-1) = 0 checked for 1..4999. K&R 2e exercise 2-9 cited from memory, not opened; the sentence does not depend on it. |
