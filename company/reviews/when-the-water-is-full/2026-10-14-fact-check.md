# Fact-check: when-the-water-is-full, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 | verified | Derivation from the definition of saturation (solute in equilibrium with undissolved solid at given T, P): the limit is a state property; stirring thins the diffusion layer (Noyes-Whitney, dm/dt proportional to (Cs - C)), changing rate, not Cs. Stage: dissolved = min(added, 36), stir changes nothing but dot positions. |
| c4 | verified | Dynamic equilibrium of dissolution/crystallisation: at Cs the net rate is zero while both gross rates are positive (classic radiotracer exchange in saturated solutions; Ostwald ripening of crystals under their own saturated solution). Stage arrows are schematic and labelled "as many each way". |
| c7 | verified | Read Demo.tsx: dots(round(dissolved*2)) = 2 dots per gram; pile() one cube per gram; mulberry32(SEED 11 + stir*7919) positions only; dissolved = min(added, SOL) with no stir dependence; Stir only increments the seed offset. Note: the file-top comment still says "stirring dissolves it" (code comment, not learner-facing). |

Disputes: none.

Result: 3 verified, 0 disputed, 0 withdrawn.
