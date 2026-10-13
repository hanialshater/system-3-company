# Fact-check: rabbit-ratio (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 1,2,1.5,1.667,1.6,1.625; 89/55=1.6182, 144/89=1.6180. |
| c2 | verified | node: 12th ratio 1.6180 (1,3) and 1.6181 (3,1); both 1.618. |
| c3 | verified | Fixed point of x=1+1/x, (1+sqrt5)/2; ratios converge for any positive start. |
| c4 | disputed | node: for the start 3, 1 (offered on the stage) the ratios are 0.333, 4.0, 1.25, 1.8 ...: errors from 1.618 are 1.285 then 2.382, so the second ratio is farther, not closer. Alternation holds for all starts; 'closer each time' holds only from the second ratio on (and fails at step 2 for 3,1). Reveal says 'by less each time' too. Fix: 'getting closer after the first step or two' or 'and the gap shrinks'. |
