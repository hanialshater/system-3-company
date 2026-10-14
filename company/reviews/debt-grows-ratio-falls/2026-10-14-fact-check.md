# Fact-check: debt-grows-ratio-falls

Independent claim checks for src/demos/economics/debt-grows-ratio-falls. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read Demo.tsx first. Own port of run(3, 5): year 10 debt 139.62, GDP 162.89, ratio 85.71%. usd() and pct() render '$140', '$163', '85.7%' in the readouts, the record row and the reveal (from qr, recorded at year 10 at 3%/5%, the 'question' milestone). Debt rises in every year 1 to 10 (borrowing > 0) and the ratio falls in every year. |
| c2 | verified | Definition: ratio = 100 × debt / GDP (Demo.tsx run()). Borrowing adds b% × GDP_t to the numerator; growth multiplies the denominator by 1 + g. The reveal sentence matches the claim. |
| c3 | verified | Own port: run(5, 5) year 10 = 101.93%, shown as '101.9%'. Every slider pair whose year-10 ratio rounds above 100.0% (27 pairs, e.g. 3/3 100.8%, 6/0 160.0%) can set the 'climb' record. The reveal and the record row both print cr (the first such state), so the quoted rates and ratio are the learner's own and the word 'climbed' is always true (above 100%). |
| c4 | verified | Stage chip: 'Model: start debt $100, GDP $100. Each year GDP grows, then borrowing adds a % of it.' The reveal: 'A toy model with fixed rates, not any real country.' run() grows GDP first, then adds b% of the new GDP. There is no separate interest term, so 'interest included' is the model's reading of b, and fixed non-negative g means no recessions. The source field quotes the chip as '...a % of that GDP'; the stage says '...a % of it'. Same meaning; the source note is stale, not the claim. |

**Result:** 4 verified, 0 disputed, 0 held unverified.
