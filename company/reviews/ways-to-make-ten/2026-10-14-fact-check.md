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

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Re-verified pass 21: own brute-force combination counts match all three table rows (1..10); each mix is written once in 1s-2s-5s order (Demo mixes()). Derivation: split by use of the new kind; removing one coin is a bijection to the cell c left. Polya 1956 not opened, not relied on. |
| c6 | verified | Own enumeration of coin sequences by brute force: 1 1 2 3 5 9 15 26 44 75 128 for t = 0..10, identical to ANY[t] = ANY[t-1] + ANY[t-2] + ANY[t-5]; conditioning on the last coin is a partition. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.
