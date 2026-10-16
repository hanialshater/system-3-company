*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: bk-emyth-owner-bottleneck
lesson version: v3
boundary: Adult beginner; can compare percentages and do basic arithmetic, but is new to this mechanism.
Screenshots seen: yes (artifacts/books100-v3-isolated-walkthroughs/bk-emyth-owner-bottleneck/sheet.png, recorded 2026-10-16; selected fullsize frame(s) listed in the aggregate review)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

These findings were first written in `company/reviews/books-100/2026-10-16-learner-seven-v3.md` before any metadata/account was read, and are copied here without changing that first-look judgment. Evidence is the private `transcript-artifact-only.md`, sheet, and selected fullsize PNGs; no shared walkthrough or live source inspection was used.

- **Question/prediction:** “B has capacities 6, 5 and 10 jobs/hour in sequence. What is B's toy result?” never says what “result” means. I can compare the numbers, but I have to supply both the throughput interpretation and the rule connecting three capacities. This is the first point where the new mechanism is required without being made concrete.
- **Inspectable cause:** A displays Owner 3, Handoff 10, Finish 10, with the owner outlined; B displays 6, 5, 10 with Handoff outlined. This suggests a limiting station, and the result changes from 3 to 5. B also has an unlabeled `1` and a small mark before the handoff. Neither the picture nor the prose explains what those marks measure.
- **Reveal:** “Creates a handoff limited to 5” supplies the selected bottleneck, but “Serial steady flow only” is specialist language for this boundary. It never plainly states that every finished job must pass all three stations, so no more than five jobs per hour can finish even though the owner can pass six.
- **Transfer:** The intended portable idea appears to be that relieving one constraint can expose another. I can infer it, but the beginner currently has to infer the reason for the minimum rule and decode the unlabeled `1` at the same time.
- **Required revision / owner:** The lesson builder should ask for completed jobs per hour explicitly, state that every job passes through all three stations, and name or remove the `1`/mark. The explanation should connect the handoff's five-job capacity to the maximum completed flow in ordinary language. Re-review the updated B and reveal frames from artifacts.

Verdict reason: The first encounter leaves completed-flow semantics, the serial capacity rule, and an unlabeled handoff marker for the novice to infer.

## After reading meta.json

- The current metadata reports version 3; objective: Calculate the new constraint after work is redistributed away from an owner.
- The objective requires the new capacity constraint to be calculated. Metadata includes a helpful recall explanation that every completed job needs the handoff, but this was not in the inspected prediction/explore/reveal path. The first-look revision remains necessary.
- This verdict addresses this learner-evaluator gate only. It is not overall launch permission, source/build verification, fact-checking, or evidence that any human learned. I authored no lesson surface and changed no claim status.
- Source/build identity supplied for this artifact set: `da62ea4379440a0186d0f09b78a5ecb820b162aa`; `dist.next-books100-seven-v3`; BUILD_ID `cxvdaIQSI167MmWWhah2L`. Not independently verified by this review.
