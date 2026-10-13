# Fact-check: same-sugar-more-water (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: IUPAC amount concentration c = n/V with V the volume of the mixture. |
| c2 | Verified: 1.0 mol/L x 0.100 L = 0.10 mol. |
| c3 | Verified: 0.10 mol over 0.5, 0.2, 0.3, 0.4 L gives 0.20, 0.50, 0.333, 0.25 mol/L; stage readouts (0.25 at 400 mL, 0.20 at 500 mL) match the transcript. |
| c4 | Verified (magnitude estimated by me, not looked up live). Using sucrose-solution densities at 20 C from the CRC table as I recall them (5% 1.0178, 10% 1.0381, 30% 1.1296 g/mL): 100 mL of 1 M syrup plus 400 mL water gives about 500.1 mL, i.e. the volume is additive to about 0.02%. Well under the 1% in the source note. I could not re-open the table here (no network), so a reader with the CRC table should confirm the three densities. |
| c5 | Verified (convention): 0.10 mol / 20 dots = 0.005 mol per dot. |
| c6 | DISPUTED (minor, blocks until fixed). The claim says the bottom 100 mL holds '20, 10, about 7, 5 and 4 dots' at 100..500 mL. The stage's own dots (stratified, mulberry32 seed 4242) show 20, 10, 6, 5 and 4: at 300 mL the readout is 6, not 7 (and 6 at 350 mL). The exact share is 6.67, so '6 or 7' is the honest statement: over 500 other seeds 300 mL gives 7 in 77% and 6 in 23%, never outside plus or minus one. The 20/10/5/4 values and the reveal's 'from 20 dots to 4' are right. Fix for demo-builder: change c6 to '20, 10, 6 or 7, 5 and 4 dots' (and state the stage seed 4242 gives 6 at 300 mL), or choose placement that yields 7. |

Reveal text ('same 20 dots', '0.10 mol / 0.500 L = 0.20', '0.25 comes from dividing by the 400 mL of water') checked: 0.1 mol / 0.4 L = 0.25. Seed 4242 is the dot layout only; the seed is not claimed to be typical. No unrecorded claims.
