# Fact-check: pick-two-or-pick-four (v1)

checker: fact-checker · date: 2026-10-22
Read first: artifacts/walkthroughs/pick-two-or-pick-four/transcript.md and sheet.png; then meta.json, Demo.tsx, brief math.discrete.md #5 (D5). Builder notes not read.

| Claim | New status | Basis |
|---|---|---|
| math.pick-two-or-pick-four.c1 | verified | Recomputed C(6,0..6) = 1, 6, 15, 20, 15, 6, 1 (20 is the maximum) and C(10,2) = C(10,8) = 45 in a fresh script; `math-wave-j-check.mjs` D5 prints the same. Stage counters and "groups of 3: 20" are lengths of `subsets(6,k)` in Demo.tsx, not typed numbers. |
| math.pick-two-or-pick-four.c2 | verified | Complement is its own inverse, so it is a bijection between k-subsets and (n−k)-subsets; C(n,k) = C(n,n−k) checked for all n < 12. Chips in Demo.tsx fill the pair and leave the other four hollow; the 3 × 5 grid in sheet.png runs AB…EF in lexicographic order, as `subsets` gives. |

## Coverage of learner-visible sentences
- Reveal: "every pair left exactly four behind… each four left behind exactly one pair" and "in general, k of n = n − k" → c2. "15 pairs, 15 fours" and "Groups of 3 are the most, 20" → c1. "goers and stayers are the same size" is 3 = 6 − 3, which is true and part of c1's group-of-3 case.
- Recall answer (45 each) → c1.
- Stage: the counters (15 of 15) and "groups of 3: 20" → c1. The 3-and-3 split picture (ABC / DEF) is correct.
- I found no unrecorded factual claim.

## Notes (not defects)
- "fours seen" equals "pairs seen" by construction (one four per pair chip). This is right under c2, because each chip draws its four as hollow dots.
- After Reset, the reveal stage shows the AB split (`Math.max(0, view.pair)`). It is a valid pair, so this is not a factual error.

Verdict: pass. Both claims are verified.
