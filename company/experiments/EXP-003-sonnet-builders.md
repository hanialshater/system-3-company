# EXP-003: Sonnet builders vs Opus builders

owner: chief-of-staff · analytics: analytics-steward · registered: 2026-10-13 21:50 UTC, before any result

## Question
Can Sonnet builders make new lessons at close to Opus quality for much less budget? The answer decides how many agents can run in parallel under the usage limit.

## Design
- **Treatment:** economics wave 5 and chemistry wave 5, 10 lessons each, built by Sonnet.
- **Comparison:** the Opus-built waves of the same day (physics w5, math w5, probability w4; plus cs, life and geography w4 as history).
- **Same everything else:** brief template, rules, gates and reviewers. The reviewers don't know which model built a lesson; build.md says it, but reviewers read build.md only after section 1.

## Committed predictions
| Metric | Prediction | would_be_wrong_if |
|---|---|---|
| Build tokens per lesson | Sonnet ≤ 60% of Opus | > 80% |
| First-review launch rate | Sonnet within 10 points of Opus | more than 15 points lower |
| Disputed claims per 10 lessons | about equal (≤ 1 apart) | Sonnet ≥ 3 more |
| QA failures at merge | 0 for both | any Sonnet merge fails QA |

## Decision rule
If Sonnet comes within the bounds, new lessons default to Sonnet builders and Opus is kept for new interaction types and hard domains. Otherwise Opus stays the builder default and Sonnet keeps revisions.
