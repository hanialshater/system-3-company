# Fact-check: compound-interest (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | 1,000 x (1 + 0.07 x 40) = 3,800, interest 2,800. Demo.tsx simple() feeds the 'Plain 7% only' readout (slider reaches 40) and the reveal; money() rounds 3800.0000000000005 to $3,800. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c10 | verified | Own node: 1.07^10 = 1.967151, so pace 96.715/yr (rounds to 96.72); 1000 + 96.715 x 40 = 4,868.6; hundreds() rounds to $4,900, the stage label at line 142. |
