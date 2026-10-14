# Fact-check: head-on-is-a-wall (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v1 first (target chips, speed chips that crash at once, chip disabling, the 400 ms rAF replay and its cleanup, crush bar with traces and the three milestone labels, meeting-point marker, reveal with '?' fallbacks; hook and recall), then claim text and support, then source fields. The replay has no reduced-motion branch, but it always ends at t = 1 and every number comes from energy(), not from the animation. Re-ran the energies in node.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: equal masses at equal and opposite speeds give total momentum 1500*(13.89) - 1500*(13.89) = 0, so a perfectly inelastic pair ends at rest; by symmetry the contact point stays at MID. Stage draws car B mirrored about MID and the dashed 'meeting point' line there; reveal sentence matches. |
| c2 | verified | Own node: 0.5*1500*(50/3.6)^2 = 144,676 J -> kJ() '145 kJ'. Demo computes energy(speed) for both targets, so 'car 50: 145 kJ' and 'wall 50: 145 kJ' are identical; the reveal reads runs['car-50'] and runs['wall-50'], both reached milestones. Physics: in the head-on case each car's own kinetic energy is dissipated in its own crumple zone (identical cars, symmetric), same as the wall. |
| c3 | verified | Own node: 0.5*1500*(100/3.6)^2 = 578,704 J -> '579 kJ'; ratio to 50 km/h is exactly 4 -> toFixed(0) '4'. Speed-squared dependence is the formula. |
| c4 | verified | Derivation, in the comparison the reveal makes (head-on at 50 + 50 against the 50 km/h wall): closing speed 100 vs 50 km/h, total energy dissipated 2 x 144.7 = 289 kJ vs 145 kJ, i.e. doubled, and split equally so each car gets 145 kJ. Note for the builder (not a dispute): as a free-standing rule the sentence would be false (the 100 km/h wall also has closing speed 100 and 4x the energy); it is true only in the context of the preceding sentence. |
| c5 | verified | Convention, consistent with code: M = 1500 for both cars, symmetric crumple, both stop (perfectly inelastic), wall fixed at MID, constant speed to impact (no braking). Stage label '1,500 kg cars, rigid wall'. |

**Result:** all five verified; one wording note on c4 (context-dependent sentence), not a dispute.
