# Experiments

`EXP-<n>-<slug>.md`. Owner: analytics steward (process) and the proposing role (content).

Required sections, in this order (`npm run check` enforces the order of the first two):

1. `## Hypothesis`
2. `## Committed prediction`, written and committed **before** any result exists, including a `would_be_wrong_if:` line
3. `## Design`: arms, including the simpler baseline that is allowed to win; sample; period; what each competing explanation predicts
4. `## Result`: added later, never by editing section 2
5. `## What changed because of it`

Before reading a result: check sample ratios, logging changes and novelty effects. Anything that
looks interesting is probably wrong until those checks pass.

| ID | Title | Status |
|---|---|---|
| EXP-001 | [Planted false claim](EXP-001-planted-false-claim.md) | designed, not run |
| EXP-002 | [Real-learner recall](EXP-002-real-learner-recall.md) | designed, not run |
