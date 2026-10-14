# Build note: count-the-bread-once

builder: demo-builder (sonnet build, EXP-003) · 2026-10-13

- Retitled "What did the chain produce?" (the slug hints at the method).
- Intent: the learner fills the $6 bread bar one stage at a time, then switches to "count all sales" and sees the $10 bar that is longer than the bread.
- Milestones: all three stage buttons tapped (slices) and the all-sales toggle pressed. The reveal quotes both.
- Stage buttons do not print their slice in the label; the slice appears in the bar when tapped.
- Simplification: three-step chain, nothing imported; labelled on the stage.


## 2026-10-14 wave D revision (demo-builder), from the r5 learner review

- Version: v2.
- What changed: All-sales bar segments are drawn as the value-added slices inside them, in the same colours ($3 = $1 + $2; $6 = $1 + $2 + $3), caption 'wheat counted 3 times'. Locked stage no longer shows the $6 bar or its label.
- Claims reopened (status unverified): c4.
- Not run here (shared machine, OOM risk): build, typecheck, QA, walkthrough. Syntax parse and `npm run check` pass. Needs a local QA pass before evaluators see it.
