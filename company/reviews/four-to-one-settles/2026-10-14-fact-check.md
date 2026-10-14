# Fact-check: four-to-one-settles (2026-10-14)

Checked by: fact-checker. Method: own derivation / node re-computation (scratch p13.mjs), Demo.tsx constants read to confirm the stage makes the same claim, primary sources where support is "source".

## Pass 13

| Claim | Verdict | Method and evidence |
|---|---|---|
| chemistry.four-to-one-settles.c1 | verified | Derivation B/A = 4, A+B = 100 gives 20/80; own node simulation of the toy (P_FWD 0.2, P_BACK 0.05, 100 molecules, 20,000 steps) gives mean B = 79.98. Demo.tsx B_EQ = 80. |
| chemistry.four-to-one-settles.c3 | verified | node: 0.20 x 20 = 4 = 0.05 x 80. Matches Demo.tsx P_FWD/P_BACK. |
