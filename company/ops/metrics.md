# Metrics

owner: analytics-steward (definitions) · chief-of-staff (collection) · command: `npm run metrics` (`-- --md` for records)

Two kinds of numbers, never mixed:

## A. Company health (what the repo can tell us)

| Metric | Definition | Healthy | Why it matters |
|---|---|---|---|
| Lessons by status | count per draft / review / published / retired | review queue < 2 waves deep | Throughput without a backlog of unchecked work |
| Claims verified % | verified ÷ all claims on non-retired lessons | rising each wave | A lesson cannot publish on unchecked claims |
| Disputed claims | count | 0 open for > 1 wave | A dispute blocks a launch; it must be answered |
| Fact-checked / learner-reviewed / QA pass | lessons with each record | = lessons in review | Gates coverage |
| Fatal rate | lessons with a learner verdict "fatal" ÷ reviewed | falling each wave | Is the builder brief learning from the reviews? |
| Build / check tokens per lesson | from `ops/waves.json` | check ≤ build | Thesis 1: checking is the bottleneck |
| Merge QA failures | contract failures on the integrated tree after a wave | 0 | Parallel branches that pass alone and fail together |
| Board age | days the oldest open item has waited | < 7 | Things that get forgotten |
| Rituals on cadence | `company rituals` shows nothing overdue | yes | Mechanisms that keep running |

## B. Learning (what only real learners can tell us)

| Metric | Definition | Status |
|---|---|---|
| Prediction commit rate | predictions ÷ lesson views | needs deployed traffic |
| First-revisit recall | correct first revisits ÷ first revisits | needs deployed traffic (EXP-002) |
| Borrowed-mind hit rate | real confusion points predicted by learner reviews | EXP-002 |

Until B has data, every claim that the company "works" is about A.
