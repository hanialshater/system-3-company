# Fact-check: twenty-then-ten-off (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 100 x 20/100 = 20, 80 x 10/100 = 8, 72 (node: exact in floating point). Reveal prints $20, $80, $8. |
| c2 | disputed | The arithmetic is right (0.8 x 0.9 = 0.72, 28%), but the stage does not show 28%: TOTAL_PCT = ((100 - 72)/100) x 100 = 28.000000000000004 in JS (node), and that string is printed in the question option and the reveal ('28.000000000000004% off'). The stage makes a different claim from c2. Fix (builder): round TOTAL_PCT, e.g. Math.round(((PRICE - FINAL) / PRICE) * 1000) / 10, as the readout already does. Re-check after the fix. |
| c3 | verified | 100 x 10/100 = 10, 90 x 20/100 = 18, 72 (node). Reveal SWAPPED cuts $10 then $18, price $72. |
| c4 | verified | 0.8 x 0.9 = 0.9 x 0.8 = 0.72 (commutative); 28 < 30. Multiplication of factors (1 - p). |
| c5 | verified | Stage chip 'Model: two % discounts on one $100 coat' and reveal 'Illustrative numbers: one item, two percentage discounts.' |
