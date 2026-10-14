# Fact-check: knapsack-ratio-trap (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: 60/10 = 6, 100/20 = 5, 120/30 = 4. Shelf prints `$${usd/kg}/kg` from the same ITEMS. |
| c2 | verified | Own greedy by ratio, whole items: packs 10 + 20 kg, $160, 20 kg empty; 30 kg > 20 kg. WHOLE_START in Demo.tsx is this state. |
| c3 | verified | Own enumeration of 8 subsets: max $220 at {20, 30} = 50 kg; {10,20,30} = 60 kg too heavy. |
| c4 | verified | Own fractional greedy: 10 + 20 + 20/30 of the 30 kg = 60 + 100 + 80 = $240. CUT_START in Demo.tsx is this state; stage label "20 of 30 kg · $80". |
| c5 | verified | Exchange-argument derivation plus own grid search over fractional amounts (0.5 kg steps): max $240. CLRS 3e §16.2 / Fig. 16.2 / Ex. 16.2-1 numbering confirmed against exercise indexes; 4e has greedy as Chapter 15 (TOC confirmed) but §15.2 not opened. Note for builder: cite 4e as ch. 15 until the section is checked. |
| c6 | verified | Own 0/1 DP over an n x W table returns $220 without enumerating subsets. CLRS 3e Ex. 16.2-2 (O(nW)) confirmed against exercise indexes; 4e number not opened. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
