# Fact-check: point-one-is-26-percent (2026-10-14)

Checked by: fact-checker. Method: own derivation / node re-computation (scratch p13.mjs), Demo.tsx constants read to confirm the stage makes the same claim, primary sources where support is "source".

## Pass 13

| Claim | Verdict | Method and evidence |
|---|---|---|
| chemistry.point-one-is-26-percent.c3 | verified | node: 10^0.3 = 1.995; Demo.tsx ratio(7.9) x 100 = 199.5, shown as about 200 against the 100 at pH 8.2. (Text reads "against 100 at pH 7.9"; the 100 is at pH 8.2: optional wording tidy, non-blocking.) |
| chemistry.point-one-is-26-percent.c4 | verified | IUPAC Gold Book pH = -lg a(H+); concentration-for-activity simplification stated in source. |
| chemistry.point-one-is-26-percent.c6 | verified | node: 10^0.1 = 1.2589; 1.2589^10 = 10.000 (1.26^10 = 10.09, "about 10"). |

## Pass 15

| Claim | Verdict | Method and evidence |
|---|---|---|
| chemistry.point-one-is-26-percent.c3 | verified | Re-checked after the builder's wording fix ("against 100 at pH 8.2"). node: 10^(8.2-7.9) = 1.9953. Demo.tsx: REF_DOTS = 100 inside the box at REF_PH 8.2; at DOUBLE_PH 7.9 the stage draws Math.round(100 x ratio(7.9)) = 200 dots, readout "+100%", reveal "about 200: double". Claim text now matches the stage. |
