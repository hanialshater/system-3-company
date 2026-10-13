# Build note: stack-without-bend

- Brief 49 (nonlinearity-collapse). Title "Two layers or one in disguise?".
- Stage: one plot of the stack's output y against x on [−1, 2]; dots for every x fed in, a ring on the current x; after unlock a dashed reference line "one layer: y = 6x − 3". With the bend on, the curve goes flat at −5 left of x = −1/3 (labelled kink). Caption defines ReLU. Locked: axes and the layer formulas only, no curve or readouts.
- Controls in DOM order: input x slider (−1..2, starts at 0), Bend toggle. Readouts: h (h → ReLU(h) when bent), y.
- Key states (milestones): "three-points" (x = 0, 1, 2 all fed with the bend off) and "bend-on". QA path: x 0 → 1 → 2, then bend on.
- Node check: −3, 3, 9 at x = 0, 1, 2; −9 straight vs −5 bent at x = −1; kink at −1/3.
- The dashed reference shows option A after commit; it is the evidence the stack is compared with. If evaluators find it gives the answer away too quickly, gate it behind the first dot.
- Deterministic.
