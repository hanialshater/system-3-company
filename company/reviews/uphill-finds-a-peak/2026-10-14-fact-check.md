# Fact-check: uphill-finds-a-peak (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node run on 2 5 1 4 7 3 6: compares (4,7), (3,6); turns 4 cards; ends on 6 (neighbour 3). |
| c2 | verified | MIT 6.006 Fall 2011 lecture 1 (Demaine, Devadas): b is a peak iff b >= a and b >= c. Stage reveal says 'only has to beat its neighbours'; with distinct cards this is the same, but 'not be smaller than' would match c2 exactly (non-blocking). |
| c3 | verified | Re-derived with the invariant H[lo-1] < H[lo] and H[hi] > H[hi+1]; walk stays in the kept half. |
| c4 | verified | Own exhaustive check over all 5,040 permutations: always a peak; 4 turns 3,780, 5 turns 1,260. |

Non-blocking wording note: reveal says a peak 'only has to beat its neighbours'; c2 and the predict question say 'not smaller than'. Same thing for distinct cards; aligning the words would avoid a strict/non-strict mismatch.

**Result:** all claims in this pass verified.
