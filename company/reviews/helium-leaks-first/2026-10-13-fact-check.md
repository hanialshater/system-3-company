# Fact-check: helium-leaks-first (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | IUPAC atomic weights He 4.0026, N 14.007 (N2 28.014). |
| c2 | verified | Graham's law of effusion; node: sqrt(28.014/4.003) = 2.645. |
| c3 | verified | Equipartition: mean translational KE = (3/2) kT for every ideal gas, so v_rms ~ 1/sqrt(m). |
| c4 | verified | node (standalone re-implementation of run()): seeds 100 and 102 give 1,166 He hits and 441 N2 hits, ratio 2.644. Over 30 other seed pairs the ratio ranged 2.35 to 2.97 (median 2.65). The source says 'between about 2.6 and 2.9'; the true spread is wider (about 2.35-3.0) but centred on 2.65, so the claim 'about 2.6' for the stage run stands. |
| c5 | verified | Stage chip states the simplifications. |
