# Fact-check: salt-water-hides-silver (2026-10-14)

Checked by: fact-checker. Method: own derivation / node re-computation (scratch p13.mjs), Demo.tsx constants read to confirm the stage makes the same claim, primary sources where support is "source".

## Pass 13

| Claim | Verdict | Method and evidence |
|---|---|---|
| chemistry.salt-water-hides-silver.c4 | verified | node: sqrt(1.8e-10) = 1.342e-5; quadratic free [Ag+] at 0.10 M Cl- = 1.80e-9; ratio 7,454, Demo.tsx RATIO rounds to 7,500. Model limitation stated in text. |
| chemistry.salt-water-hides-silver.c8 | verified | Pass 13 independent re-check: with log b1 3.04, log b2 5.04, total dissolved Ag is 1.36e-5 (pure) vs 2.17e-6 M (0.10 M NaCl), so solubility does shift; the product ceiling statement is the Ksp definition. Verified as written. |
| chemistry.salt-water-hides-silver.c9 | verified | node: 1 - 1.8e-9/1.342e-5 = 0.99987, shown as 99.99%. |
