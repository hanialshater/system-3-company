# Build note: confident-and-wrong

- Intent: one plot of penalty −ln(p) against the chance p given to the true answer, with a marker at the current p. Controls in order: 50% (start), 10%, 1%, slider 1–99%. Readouts: penalty, × the 50% penalty. Locked: axes and the 50% marker only (its 0.69 is in the question); curve hidden.
- Key states (milestones): "ten" (p ≤ 10%) and "one-percent" (p = 1%). QA path: 10% → 1% → slider.
- Options computed: 1.4 (= 2 × 0.69, the linear guess), 4.6 (−ln 0.01), 50.
- Node check: 0.693, 2.303, 4.605, 0.105; ratio 6.64 = log2(100). Recall: −ln 0.4 = 0.916, −ln 0.02 = 3.912.

## Revision v2 (wave C, 2026-10-14)

- Review (v1): -ln undefined, halving and no-ceiling told, hook leaked. Fix: stem defines the penalty as ln(1 / chance) with a 100% anchor; 'Halve the chance' button with a visible chain of halvings (each +0.69), axis extended to 8, down to 0.05%; reveal states what was seen and that other penalties exist; neutral hook.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.

## Revision v3 (wave C builder 13, 2026-10-14)

- Review (r2): reveal said 'each halving added the same 0.69' but the gate needed one halving. Fix: the reveal now counts the longest unbroken chain of halvings the learner made, and when it is one it says only that 50% to 25% added 0.69 on top of the 100% to 50% step.
- Edited claims were reset to unverified and match the stage text; version bumped. Local QA run; walkthrough sheet looked at.
