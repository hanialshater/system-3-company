# Build note: draw-the-xor-lines

- Intent: the four XOR dots on a plane shaded by what the model says; buttons turn (45° steps) and slide (3 offsets) line 1, add or remove line 2, and turn and slide line 2. With two lines, orange means "on exactly one line's side".
- Milestones: "one-line" (moved line 1 alone) and "solved" (4 of 4). The QA path (turn 1, slide 1, add 2) solves it; the default line 2 solves it only if line 1 is placed right, so learners still have to work.
- The reveal quotes the learner's best one-line score and the toy's best over all 24 lines (3 of 4). Dragging was replaced by buttons so QA and touch both work.
- After screenshots: no changes needed.

## v2 (claim fix 2026-10-13)

Claim c5 disputed ('band' only true for parallel lines). Reveal now says 'for example a band between them when the lines are parallel'; claim rewritten; unverified.

## v3 (revision 2026-10-13)

- Review: hook gave the answer; reveal 'best 1 of 4' contradicted opening 2 of 4. Fix: hook is now a neutral question; best-with-one-line starts at the opening 2 of 4 and the reveal says 'you began at 2'; the shared middle point is drawn on the stage; hidden units glossed.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v4.
- What changed: Line 1 starts at x = 0.85 (2 of 4); line 2 is added in a non-solving position (startLine2), so the learner must move it. Gate: 'ceiling' (one line at 3 of 4) + 'solved' (two lines, 4 of 4). Each line labels its 'on' side; the middle dot takes the model's colour. Title no longer states the answer. QA path: Turn 1 (1/4), Slide 1 (3/4, ceiling), Add 2 (3/4), Turn 2 (4/4, solved).
- Claims reopened (status unverified): c1, c4, c5.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.
