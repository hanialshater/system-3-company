# Build note: mouse-vs-elephant (demo-builder, 2026-10-13)

- Design: one animal silhouette drawn not to scale (size grows with log mass); its glow is energy per gram vs a 20 g mouse (mass^-0.25), with a full-glow mouse in the corner for comparison. Masses step tenfold to a rounded 3,200 kg elephant.
- Reveal gate (useMilestones): reach the elephant, and any mass in between. Elephant chip is first in DOM order so QA reaches it.
- Numbers (8,000 and 1/20) are computed from the same functions as the stage. Weak spot: at the elephant the glow is faint, so the felt contrast leans on the readouts.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.
