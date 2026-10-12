```yaml
id: remove-the-easy-path
confidence: ""     # was "*" (2026-10-12 review). Zero cases and no constrained branch exists in the portfolio, so a star had nothing under it.
context: Several generations of a lesson have converged on the same representation (bars, a line chart, a slider and a number).
problem: Iteration polishes the familiar attractor; better bars are still bars.
therefore:
  - Impose a strategic constraint for one branch: no bars, no text on the stage, phone-only single representation, predict-only.
  - Judge the constrained branch pairwise against the incumbent.
would_be_wrong_if: Constrained branches lose pairwise in nearly every case across a quarter, so the constraint only adds noise.
documented_cases: []
known_failure:
  - "Never applied. The 18 lessons are one generation (v1, a few v2); the trigger in `context` (several generations converged) has not occurred, and the cycle-planning record's exploration-bets table is empty. Not a failure of the pattern; recorded so nobody reads the old star as evidence."
  - "Tension, not yet a case: the constraints it suggests ('phone-only single representation') are the same ones demo-standard already imposes on every lesson, so the 'incumbent' is already the constrained form. See creative-distrust 2026-10-12."
may_call: keep-a-strange-branch
```
