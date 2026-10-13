# Build note: confident-and-wrong

- Intent: one plot of penalty −ln(p) against the chance p given to the true answer, with a marker at the current p. Controls in order: 50% (start), 10%, 1%, slider 1–99%. Readouts: penalty, × the 50% penalty. Locked: axes and the 50% marker only (its 0.69 is in the question); curve hidden.
- Key states (milestones): "ten" (p ≤ 10%) and "one-percent" (p = 1%). QA path: 10% → 1% → slider.
- Options computed: 1.4 (= 2 × 0.69, the linear guess), 4.6 (−ln 0.01), 50.
- Node check: 0.693, 2.303, 4.605, 0.105; ratio 6.64 = log2(100). Recall: −ln 0.4 = 0.916, −ln 0.02 = 3.912.
