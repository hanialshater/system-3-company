# Fact-check: two-stacks-make-a-queue (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node sim of the rule: 1 pour, moved {1:1,2:1,3:1,4:1}, left 1 2 3 4; matches simulate() and the reveal. |
| c2 | verified | Derivation: items move only in->out, so moves <= adds (own random sim of 100,000 ops confirms). CLRS 3e exercise 10.1-6 and ch. 17 accounting method (4e: ch. 16). |
| c3 | verified | Direct from the rule; stage note 'out not empty: no pour' on removals 2-4. |
| c4 | verified | Both are the accounting method (CLRS 3e 17.2, dynamic tables 17.4); lesson list-doubling-copies exists in src/demos/cs. |

**Result:** all claims in this pass verified; no disputes.
