# Fact-check: everyone-gets-hats-back (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx run(): Fisher-Yates uniform shuffle, 1,000 per run; stage label states it. |
| c2 | verified | node: 0.666667, 0.632121, 0.632121, 0.632121; derangement recurrence D10 = 1,334,961, 1 - D10/10! = 0.6321205. |
| c3 | verified | sum (-1)^k/k! -> 1/e; 1 - 1/e = 0.6321206. |
| c4 | verified | node, own copy of run(): batch 0 = 66.9 / 63.5 / 62.0 / 62.1, batch 1 = 67.8 / 61.6 / 63.5 / 62.9; sd sqrt(.632 x .368 / 1000) = 1.5 points. |
