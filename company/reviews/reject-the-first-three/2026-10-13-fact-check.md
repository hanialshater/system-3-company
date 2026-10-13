# Fact-check: reject-the-first-three (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx order()/pickIndex() implement exactly this rule; stage label states it. Set-up as in Ferguson (1989), 'Who solved the secretary problem?', Statistical Science 4(3): 282-289. |
| c2 | verified | node, my own enumeration of all 3,628,800 orders (Heap's algorithm): k=0..5 = 0.10000, 0.28290, 0.36579, 0.39869, 0.39825, 0.37282. |
| c3 | verified | Same enumeration: k=4 0.39825, pct1 = 39.8%. |
| c4 | verified | node: batch 0 reject-3 wins 7, reject-0 wins 1; batches 1-3: 10/3, 10/3, 5/4. |
| c5 | verified | node n = 1000: optimal k = 368, win 0.3682; limit 1/e = 0.3679 (Ferguson 1989). |
