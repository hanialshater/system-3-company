# Fact-check: spreaders-are-rare (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | (0.1/2.1)^0.1 = 0.7375; e^-2 = 0.1353 (own lgamma-based pmf, fc18/spread.mjs). |
| c3 | verified | Own independent slice allocation (quantile integral, not the Demo's loop): k = 0.1: 74 zeros, top 10 = 165 of 200 (82.5%, readout rounds to 83%); Poisson: 14 zeros, total 199, max 7; k = 1: 33 zeros, total 201. |
| c4 | verified | Lloyd-Smith, Schreiber, Kopp and Getz (2005), Nature 438: 355-359 (PubMed 16292310, DOI 10.1038/nature04153): contact-tracing data show infectiousness is often highly skewed around R0. Citation details confirmed via PubMed listing; full text not opened. The lesson's 'top 10 cause most' is its own model output (c3: 83%). |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
