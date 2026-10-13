# Fact-check: salt-water-hides-silver (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | AgCl is sparingly soluble (Ksp ~1.8e-10). |
| c2 | verified | Ksp(AgCl) = 1.77-1.8e-10 at 25 C (CRC Handbook lists 1.77e-10; 1.8e-10 is the usual rounding). |
| c3 | verified | node: sqrt(1.8e-10) = 1.34e-5 mol/L. |
| c4 | verified | node: exact quadratic gives 1.8e-9 at 0.10 M; ratio 1.342e-5/1.8e-9 = 7,454 (about 7,500). True of free [Ag+] only; see the added claim about total dissolved silver. |
| c5 | verified | node: 1.8e-10/0.001 = 1.8e-7; /0.01 = 1.8e-8; quadratic agrees. |
| c6 | verified | Common-ion effect; standard. |
| c7 | verified | Square brackets denote amount concentration (mol/L). |
| c8 (added) | unverified | Reveal: 'Pile in chloride and silver has to drop out as crystals ... Solubility is not one fixed number; it shifts when the water already holds one of the ions.' (recorded for an independent check) |

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c8 | verified | Independent check of the pass-8 concern. node: free [Ag+] = Ksp/[Cl-] is 1.8e-9 at 0.10 mol/L (c4 holds even with complexes). With log beta1 3.04, log beta2 5.04, total dissolved silver is 1.35e-5 (pure) vs 2.1e-6 mol/L (0.10 mol/L), so real AgCl solubility still falls about 6x and silver does precipitate; 'solubility shifts' is literally true (it falls, then rises above about 0.5 mol/L). The 7,500x figure in the reveal is attached to [Ag+], not to solubility. Verified as written. Non-blocking suggestion for the builder: add 'ignores AgCl2- complexes' to the stage note. |
