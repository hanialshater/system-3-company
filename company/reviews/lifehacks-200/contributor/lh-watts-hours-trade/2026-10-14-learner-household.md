*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: lh-watts-hours-trade
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with this lesson's power-times-duration mechanism.
artifact: artifacts/walkthroughs/lh-watts-hours-trade/transcript.md, then sheet.png; recorded 2026-10-14T00:28:27.180Z.

## 1. From the artifact

Screenshots seen: all five frames in sheet.png. Findings written before reading meta.json or builder notes.

- Prediction felt useful: the high-power short run competes with the low-power long run. I can attempt 100×1 versus 20×5 with basic arithmetic, while the unit kWh needs the later expression's conversion.
- Understanding first broke at Test B's graph. The question says B runs five times as long as A, but both graphs label time 0→1h at the original setting. After A-hours becomes three, both label 0→3h. B's expression contains 20×5×3, so its run is fifteen hours, not the three printed under its graph.
- The graphs have matching slopes, heights and hour spans despite different powers. Taken literally as kWh over hours, they show the same power, obscuring the mechanism the comparison is supposed to explain. This is more than an unlabeled decorative scale: the hour unit is explicitly printed.
- The numeric outputs 0.1/0.1kWh and 0.3/0.3kWh are traceable from the expressions. The reveal explains that fivefold duration cancels fivefold power, but it does not resolve why the visible B time span equals A's.
- FATAL on this artifact: the explicitly labelled B time graph contradicts the declared B duration and reinforces a wrong energy-over-time picture. The objection blocks launch until the graph meaning is corrected or the judgement is rejected with a reason. This finding compares the lesson's own visible states; it is not general factual approval or claim verification.

## 2. After reading the brief

- The objective explicitly requires accounting for both constant power and duration. The recall also retains B's fivefold duration, so the graph-duration contradiction is central to the intended idea rather than incidental artwork.
- The arithmetic boundary fits the assigned boundary. The numeric expressions and recall are internally traceable, but they do not cancel the pictured contradiction.
- Status remains review. This record verifies no claims and provides no human-learning or browser/accessibility evidence. The fatal objection remains open against the recorded artifact.

Verdict: fatal

## 3. Fresh artifact recheck — resource fix

artifact recorded: 2026-10-14T00:49:21.028Z; build fc2b349 containing resource fix 52c3126.
Screenshots seen: all five fresh sheet.png frames, after the fresh transcript. New findings written before reopening meta.json.

- At the original setting, A's graph is labelled 0→1h and B's 0→5h. After A-hours becomes three, A is labelled 0→3h and B 0→15h. These actual rendered B durations now match both the question's fivefold relationship and the 20×5×3 expression.
- Both graphs explicitly share a 0.8kWh full vertical scale, and their endpoint heights grow when totals rise from 0.1 to 0.3kWh. The numeric energy equality and the explanation remain traceable.
- The historical FATAL B-duration contradiction is resolved in this fresh render. The old fatal record is retained above; it no longer describes the current artifact.
- Nonblocking limitation retained: the plots have equal pixel slopes because they use different hour spans. I must read those different labels rather than compare their apparent slopes as though the horizontal scales were shared. No fatal flaw or sustained understanding break observed after doing so.

### After reading the fresh brief

- Objective and four-hour-A recall retain the fivefold B-duration relationship, which the new graph labels now support. The historical fatal is resolved for this artifact; status stays review and no claims, human evidence or QA/accessibility gates are attested here.

Latest verdict: launch
