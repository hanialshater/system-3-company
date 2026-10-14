# Fact-check: ways-to-make-ten (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own brute force: 10 (fives, twos, ones) mixes; own sequence recursion: 128 (row 1 1 2 3 5 9 15 26 44 75 128). |
| c2 | verified | Own brute-force enumeration per row matches all three rows exactly; Demo TABLE uses the same recurrence. |
| c3 | verified | Enumerated mixes: 6 with no five, 4 with at least one; cell above = 6, cell five left = 4. |
| c4 | verified | Total 3: {1+1+1, 1+2} = 2 combinations; sequences 1+1+1, 1+2, 2+1 = 3 (ANY[3] = 3). Stage MixStrip says exactly this. |
| c5 | verified | Derivation: each cell partitions mixes by use of the new kind; removing one coin of that kind is a bijection onto the cell c to the left, so no mix is double-counted; matches brute force. Polya 1956 not opened and not relied on. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
