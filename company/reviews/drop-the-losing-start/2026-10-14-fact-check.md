# Fact-check: drop-the-losing-start (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node brute force (fc19b6/kad.mjs): 45 pairs, max 6, unique at days 4-7. |
| c2 | verified | Own cumulative sums -2 -1 -4 0 -1 1 2 -3 1; max 2. |
| c3 | verified | Own reset-below-0 pass: -2 / 1 -2 / 4 3 5 6 1 5, best 6; matches advance() auto rule in Demo.tsx. 6 is only at days 4-7, so any walk reaching 6 restarts after day 3. |
| c4 | verified | Derivation re-done: T < 0 implies T + rest < rest. Note: CLRS exercise 4.1-5 is the 3rd edition numbering; the maximum-subarray section is not in CLRS 4e. |
| c5 | verified | Own check: one-pass equals brute force on this list and 50,000 random lists (0 mismatches). Bentley, CACM 27(9) 1984, credits Kadane. |

**Result:** all claims in this pass verified; no disputes.

## Pass 20

Checker: fact-checker (did not write these claims). Source-only audit: the builder edited the source field, not the claim text; checked the new source against Demo.tsx/model.ts and the cited reference.

| Claim | Result | Basis |
|---|---|---|
| c4 | verified | Pass 20 source audit: search results (walkccc CLRS solutions, SLU course notes, Rutgers ch. 4 solutions) confirm 3e exercise 4.1-5 is the nonrecursive linear-time maximum-subarray exercise; 4e chapter 4 listings run 4.1 Multiplying square matrices to 4.7 Akra-Bazzi, with no maximum-subarray section. Derivation unchanged and still sound. Source correct. |
