# Fact-check: stale-case-counts (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 100*2^(9/3)=800. |
| c2 | verified | node: 3-day delay 200; 12-day delay 1,600. |
| c3 | verified | Ratio infected/reported = growth over the delay; 1 on a flat curve. |
| c4 | verified | Stage muted line; Gostic et al. 2020, PLOS Comp Biol 16(12):e1008409 is real and covers variable reporting delays. |
