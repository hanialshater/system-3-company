# Fact-check: sliding-the-cutoff (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own Python with exact erf: new test at cutoff 1 gives Phi(-1.5) = 1 - Phi(1.5) = 6.68% for both; old test 15.87% for both. For every cutoff Phi(c-2.5) < Phi(c-2) and 1-Phi(c+0.5) < 1-Phi(c), so both fall. Claim text matches model.ts (BETTER 2.5, BETTER_HEALTHY -0.5). Note for the builder: the source field is stale (it describes a healthy-fixed, sick-at-3 model at c = 1.5); text and stage are right. |

**Result:** all claims in this pass verified; no disputes.

## Pass 20

Checker: fact-checker (did not write these claims). Source-only audit: the builder edited the source field, not the claim text; checked the new source against Demo.tsx/model.ts and the cited reference.

| Claim | Result | Basis |
|---|---|---|
| c5 | verified | Pass 20 source audit: source names match model.ts (errors(cut, sickMean, healthyMean = 0), SICK 2, BETTER 2.5, BETTER_HEALTHY -0.5); own node with series erf: new test 6.68% both at cut 1, old 15.87% both. Source now correct. |
