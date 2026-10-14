# Fact-check: pennies-dont-add-up (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node long division of 1/10 in base 2, 24 digits: 000110011001100110011001; remainder 0.4 recurs after 4 digits, so 0011 repeats. |
| c2 | verified | Node over all k in 0..4095: nearest k/4096 to 0.1 are 410 (0.10009765625, over by 0.0000976...) then 409 (0.099853515625). 4096/10 = 409.6 not whole; 2^n never divisible by 5. Matches NEAREST = round(409.6) = 410 and reveal "still over". |
| c5 | verified | node (0.1).toPrecision(25) = 0.1000000000000000055511151, (0.2).toPrecision(25) = 0.2000000000000000111022302; both above. Stage strings match. |
