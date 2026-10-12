```yaml
id: remove-the-easy-path
confidence: "*"
context: Several generations of a lesson have converged on the same representation (bars, a line chart, a slider and a number).
problem: Iteration polishes the familiar attractor; better bars are still bars.
therefore:
  - Impose a strategic constraint for one branch: no bars, no text on the stage, phone-only single representation, predict-only.
  - Judge the constrained branch pairwise against the incumbent.
would_be_wrong_if: Constrained branches lose pairwise in nearly every case across a quarter, so the constraint only adds noise.
documented_cases: []
known_failure: none recorded
may_call: keep-a-strange-branch
```
