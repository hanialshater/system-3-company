# Fact-check: pennies-dont-add-up (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node long division of 1/10 in base 2, 24 digits: 000110011001100110011001; remainder 0.4 recurs after 4 digits, so 0011 repeats. |
| c2 | verified | Node over all k in 0..4095: nearest k/4096 to 0.1 are 410 (0.10009765625, over by 0.0000976...) then 409 (0.099853515625). 4096/10 = 409.6 not whole; 2^n never divisible by 5. Matches NEAREST = round(409.6) = 410 and reveal "still over". |
| c5 | verified | node (0.1).toPrecision(25) = 0.1000000000000000055511151, (0.2).toPrecision(25) = 0.2000000000000000111022302; both above. Stage strings match. |

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Walkthrough transcript exists (08:13Z); v3 number line checked against Demo.tsx.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node doubling: 0.1 in binary = 000110011001100110011001...; 409 = 000110011001 is the under value on the number line and in the reveal; it is the true expansion truncated to 12 digits, so the 0011 repeat is visible. |
| c2 | verified | Own node over all k in 0..4095: nearest 410 (0.10009765625, gap 0.00009765625), then 409 (0.099853515625, gap 0.000146484375). exact()/gapText() print those strings; message for k = 409 is 'Close, but under. One pattern just above is closer.' |
| c5 | verified | node toPrecision(25): 0.1000000000000000055511151, 0.2000000000000000111022302; stage labels 'above 0.1', 'above 0.2'. |
| c9 | verified | Same source family as c4 (verified 2026-10-13): IEEE 754 default rounding for binary formats is roundTiesToEven (from my knowledge, sec. 4.3.3 in 754-2008/2019; standard not opened). Analogy check: on the stage 410/4096 is nearer than 409/4096 (0.0000977 vs 0.000146), labelled 'over: nearer, kept'. |
