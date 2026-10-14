*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: short-jobs-clear-a-queue
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with total-waiting-time scheduling.
artifact: artifacts/walkthroughs/short-jobs-clear-a-queue/transcript.md, then sheet.png; recorded 2026-10-14T00:39:56.086Z; home/study build be775a7.

## 1. From the artifact

Screenshots seen: all five frames in sheet.png. Findings written before reading meta.json or builder notes.

- Prediction felt plausible but usefully testable: short jobs first might clear more people while the total forty-five minutes of work is unchanged.
- No sustained representation break. Run queue reports 65m for long→quick→small; Swap first gives 40m for quick→long→small; Try target gives 20m for quick→small→long. The staggered blocks move while durations stay visible, allowing me to infer starts 0/5/15 in the final arrangement.
- The first explanatory break is the reveal's "Moving a short job ahead reduces how long later jobs wait". In the first swap the long job moves later and now waits five minutes instead of zero, while the small job still starts at thirty-five. The reduction is in total waiting via a trade between jobs, not a visible reduction for every later job. The statement needs that distinction to explain the observed change.
- "Total waiting is the sum of each start time" does explain 0+5+15=20, and the final state is reported correctly. Late and Prereq counters stay zero throughout; they add concepts beyond the tested waiting objective without a visible competing constraint.
- Specific objection: the general mechanism sentence obscures which waits shrink and which grow even though the numeric total is traceable. No separate source/factual or QA approval is implied.

## 2. After reading the brief

- The objective is comparing total waiting under two orders. Three observed orders and their totals address it, while the mechanism sentence still needs to explain the trade in individual start times.
- The recall repeats the prediction's fixture-bound question and order labels without the durations or a new queue. It can be answered by remembering Short jobs first rather than calculating or explaining total waiting.
- Status remains review; no scheduling-source claims, human-learning evidence or QA/accessibility gates are verified by this record.

Verdict: revise
