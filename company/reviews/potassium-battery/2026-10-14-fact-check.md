# Fact-check: potassium-battery (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | ln(140/140) = 0, so E = 0; Demo.tsx setOutside() sets v = 0 (fresh cell) and the reveal prints MV(nernst(140)) = '0 mV'. |
| c6 | verified | Demo.tsx leak(): v + (e - v)/2; dots not redrawn. Own estimate: 10 um cell, 1 uF/cm2, 90 mV moves 2.9e-18 mol vs 7.3e-14 mol K+ inside (about 4e-5); membrane RC is about 1-100 ms. Stage: 'Very few ions had to cross.' |
| c7 | verified | RT/F at 310.15 K with CODATA R and F = 26.73 mV; x ln 10 = 61.5 mV per tenfold ('about 61'); 26.73 x ln(5/140) = -89.06 mV. Reveal shows '28 to 1' and the stage reads -89 mV. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
