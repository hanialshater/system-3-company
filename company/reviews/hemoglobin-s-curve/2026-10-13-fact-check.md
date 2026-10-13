# Fact-check: hemoglobin-s-curve (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Hill equation in Demo.tsx sat(); P50 26.8 mmHg is the standard adult value at pH 7.4, PCO2 40, 37 C (Radiometer acutecaretesting 'What is P50' gives 26.7; Severinghaus-based curves 26.8). Stage label states the toy and fixed pH/CO2. |
| c2 | verified | Published adult HbA Hill coefficients about 2.5-3.0 (2.7 widely used, e.g. Dash and Bassingthwaighte curves; Comprehensive Physiology gives about 2.5-2.8). 'About 2.7' holds. n = 1 for one site (hyperbola) by definition. |
| c3 | verified | node with the same formula: 74.67, 31.21, drop 43.46; 59.88, 42.74, drop 17.15; ratio 2.535. Stage f1() gives 74.7, 31.2, 43.5, 17.1, 2.5. |
| c4 | verified | Resting mixed venous PO2 about 40 mmHg and alveolar about 100 mmHg (oxygen-cascade values); femoral venous PO2 at maximal exercise 22 mmHg (Richardson et al. 1995, J Clin Invest 96: 1916-1926), so 'can fall to about 20' holds. |
| c5 | verified | Cooperative binding: affinity of remaining sites depends on occupancy (MWC 1965 / Adair). The steep part of the n = 2.7 curve lies between 20 and 40 mmHg (node: 31% to 75%). |
