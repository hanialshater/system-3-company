# Fact-check: protein-search-space (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | BigInt 3n**100n = 515377520732011331036461129765621272702107522001 (48 digits); sci() shows 5.15 x 10^47; stage line '10^47 means 1 followed by 47 zeros'; option 'About 5 with 47 more digits after it'. |
| c3 | verified | 5.1538e47 / 1e13 / 3.15576e7 = 1.63e27 years; Demo.tsx timeFor(100) and reveal print 1.63 x 10^27; stage says 'a generous guess'. |
| c6 | verified | Folding-rate literature (Protein Folding Kinetics Database summary: most two-state folders about a millisecond, median about 5 ms; Kubelka, Hofrichter, Eaton 2004 speed limit about N/100 us; folding-rate prediction papers report microseconds to an hour). The stated range 'about a millisecond to a few seconds' is the typical range; faster and slower outliers exist and only strengthen 'not a blind search'. Secondary sources only (search snippets), papers not opened. Non-blocking wording: 'microseconds to seconds, most around a millisecond'. |
| c7 | verified | 3 bends x 100 links = 300; stage line 'Judge each link's bend on its own: 3 tries x 100 links = 300 tries' and marker 'one link at a time: 300 tries'; reveal says 300; labelled a toy. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).
