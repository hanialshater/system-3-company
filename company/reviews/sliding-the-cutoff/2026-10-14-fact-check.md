# Fact-check: sliding-the-cutoff (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own Python with exact erf: new test at cutoff 1 gives Phi(-1.5) = 1 - Phi(1.5) = 6.68% for both; old test 15.87% for both. For every cutoff Phi(c-2.5) < Phi(c-2) and 1-Phi(c+0.5) < 1-Phi(c), so both fall. Claim text matches model.ts (BETTER 2.5, BETTER_HEALTHY -0.5). Note for the builder: the source field is stale (it describes a healthy-fixed, sick-at-3 model at c = 1.5); text and stage are right. |

**Result:** all claims in this pass verified; no disputes.
