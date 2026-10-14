# Build note: whose-cutoff-wins

- Intent: 100 people as a 10-band grid (B as circles on top, A as squares below); one cutoff slider; mistakes turn red. "Let the model learn" jumps to the fewest-mistakes cutoff.
- The reveal unlocks only when the cutoff sits at the minimum (50), so the learner sees that both mistakes are group B.
- Dropped the brief's second slider (B's share) to keep one control and one picture. Per-group readouts are "?" while locked.
- After screenshots: the dashed group lines were unlabelled; added "B qualifies from 30" and "A qualifies from 50" and dropped the redundant "fail" label.

## Revision v2

Review 2026-10-13: the locked stage coloured mistakes and the path skipped 40. Mistakes show only after the guess; the reveal is gated on two milestones (stand on 40, then 50); slider ArrowRight twice from 30 passes both. 'Let the model learn a step' is a one-step button. Question defines 'qualified'. Reveal trimmed for phones. c4 reworded, unverified.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v3.
- What changed: 'at-40' needs the cutoff to rest at 40 for 300 ms (a drag past it does not count). 'Let the model learn a step' moved first in DOM order and reports the total before/after each step. Reveal quotes mistakes(40) live. QA path: Step (30 -> 40, rests 450 ms), slider x2 (50 = best, 60).
- Claims reopened (status unverified): c4; new c6.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.
