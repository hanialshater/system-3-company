# Build note: quadratic-wall (demo-builder, 2026-10-13)

- Design intent: files as dots on a ring, every pair drawn as a line, the pair count in the centre. Buttons 5 / 10 / 20 / 1,000 files plus a 2-20 slider; a log line lists every size visited with its count. At 1,000 the dots are one path and no lines are drawn ("too many to draw").
- Key state: 5, 10, 20 and 1,000 all visited, so the learner sees 10, 45, 190 and 499,500. Milestones ["n5", "n10", "n20", "n1000"], minInteractions 4. QA path: the four buttons in order, then the slider.
- Numbers: question (10 → 45, 1,000), options and reveal (4.2x, 11,100x) all come from pairs() in Demo.tsx. Brief answer (B, 499,500) re-computed in Node and held.
- Locked: the stage starts at the question's 10 files and 45 lines (both already in the question).
- Deviation: added the 1,000 button so the question's second value is on the QA path (it cannot be drawn as lines).
- After screenshots: the log listed every slider stop (18, 19 ...); it now lists only the four marked sizes.
