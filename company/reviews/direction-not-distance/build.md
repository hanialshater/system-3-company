# Build note: direction-not-distance

- Brief 42 (cosine-similarity). Title "Far away, yet the closest match?" (does not say which).
- Stage: one 2-D plane with arrows from the origin to Q (1, 1) (ring), C (1, 0.2) and B (k, k); Q's direction drawn dashed. Caption defines cosine (1 = same direction, length ignored). Locked: arrows only, readouts "–".
- Controls in DOM order: B's length slider (k = 1..10, starts at 10), Rank by distance (draws Q-B and Q-C segments, says C), Rank by cosine (thickens B, says B).
- Key states (milestones): "stretched-b" (B's length changed; cosine stays 1.00) and "ranked-cosine". QA path: k 10 → 9 → 8, rank by distance, rank by cosine.
- Node check: cos(Q, B) = 1.00 for k = 1..10; dist = 1.414(k − 1): 12.7 at 10, 9.9 at 8; cos(Q, C) = 0.832, dist 0.8.
- Reveal lists the lengths the learner visited and the largest distance among them; no number they did not see.
- Deterministic, no seeds.

## Revision v2 (wave C, 2026-10-14)

- Review (v1): 'Length is ignored' leaked the answer, doubled brackets, label collision. Fix: that caption half appears only after the prediction; brackets fixed; Q and C labels separated. The 12.7 figure is on the stage from the first unlocked frame (k = 10).
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
