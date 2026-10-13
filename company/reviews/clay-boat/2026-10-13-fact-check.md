# Fact-check: clay-boat, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 The upward push of water on an object equals the weight of the water i... | verified | Archimedes: buoyant force = weight of fluid displaced; floating -> displaces its own weight. Standard (HRW ch. 14 locator; book not reachable, principle undisputed). |
| c2 1 kg of fresh water has a volume of 1.00 L, so a floating 1 kg object ... | verified | 1 kg / 1000 kg/m^3 = 1.00 L. At 20 C water is 998.2 kg/m^3, so 1 kg is 1.002 L, still "1.00 L" to 2 d.p. (the claim already says idealised). |
| c3 1 kg of clay at about 1800 kg/m^3 has a volume of 0.56 L, so as a sunk... | verified | 1/1800 m^3 = 0.5556 L. The density 1800 kg/m^3 is a typical-value assumption; I did not find an independent source in this session, but the lesson's logic holds for any clay denser than water (c6), so the conclusion does not depend on the exact figure; only the 0.56 L, and the 0.80 L cup's sinking at 1.00 L needed, are insensitive to it. |
| c4 The stage draws to scale four open cylindrical cups of 1 kg of clay wi... | verified | Rebuilt the geometry from the Demo.tsx formulas: cups with outer volumes 800/1250/1800/2500 cm^3 and clay volume held at 555.6 cm^3 (checked). Drafts 8.95 (needs more than its 7.16 cm height, so it sinks), 5.88, 3.98, 2.81 cm; freeboards +1.47, +3.18, +4.21 cm. Matches stage captions (4.0 cm, 2.8 cm under water; 0.80 L cup sank). |
| c5 A cup that sinks fills with water and then pushes aside only its clay,... | verified | Flooded: only clay excludes water: 0.556 L. |
| c6 Clay is heavier than water litre for litre, so a solid lump of it neve... | verified | Solid lump of volume V: buoyancy 1000 g V < weight 1800 g V at any V. |

Disputed: none. Withdrawn: none.

Recall (3 kg steel pot floats -> displaces 3 L) correct. Reveal "A hollow shape encloses air and can" is the floating-cup case. Reveal "exactly 1 kg of water, the clay's own weight" is c1/c2.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
6 verified, 0 disputed, 0 added unverified.
