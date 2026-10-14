# Build note: same-air-less-oxygen
- Brief 37. RETITLED: the brief's "Same air, less oxygen" gives the answer away. The learner sees "What runs short on Everest?" (slug kept).
- Key state: milestone `summit`, height exactly 8,849 m. The box thins from 203 to 63 dots while the oxygen share reads 21%, and oxygen reads 6.6 kPa. Climbing part-way with the slider does not unlock. DOM order: height slider, Sea level, Summit, so QA ends on the summit.
- Pressure comes from the ISA troposphere formula (31.44 kPa at 8,849 m, node). The question's "about 31 kPa" and the "6.6 kPa" option are computed from the same press() function. Brief option "6.5 kPa" became 6.6 kPa because the brief used 31 kPa flat; 0.2095 × 31.44 = 6.59.
- Model label on the stage: "standard atmosphere"; the measured summit pressure (about 34 kPa, West 1983) is in the reveal and claim c5. Toy scale "1 dot = 0.5 kPa" is on the stage (claim c6).
- After screenshots: dots and readouts fit a phone; no change.

## Revision v2
Fixes from the v1 learner review: the question no longer says '21% at every height' and multiplies for the learner; it asks what share of the summit air is oxygen (7% / 14% / 21%), so the unchanged 21% readout is the surprise and the misconception is tested. kPa is defined in the question. The reveal points at the Oxygen readout for the 21% x 31 kPa step. Added 'Climb 1,000 m' so the first tap makes a visible change (the 1 m slider step did not). c1 and c3 reworded (unverified).
