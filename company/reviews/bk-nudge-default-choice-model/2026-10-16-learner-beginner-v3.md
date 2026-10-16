*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: bk-nudge-default-choice-model
lesson version: v3
boundary: Adult beginner; can compare percentages and do basic arithmetic, but is new to this mechanism.
Screenshots seen: yes (artifacts/books100-v3-isolated-walkthroughs/bk-nudge-default-choice-model/sheet.png, recorded 2026-10-16; selected fullsize frame(s) listed in the aggregate review)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

These findings were first written in `company/reviews/books-100/2026-10-16-learner-seven-v3.md` before any metadata/account was read, and are copied here without changing that first-look judgment. Evidence is the private `transcript-artifact-only.md`, sheet, and selected fullsize PNGs; no shared walkthrough or live source inspection was used.

- **Question/prediction:** Six followers plus four probabilistic choosers defines a ten-user expected-share task. The locked image hides both group counts and output; it does not show 80 before the choice.
- **Inspectable cause:** In A, followers contribute 6/6 and choosers 2/4, totaling 8/10. In B, followers contribute 0/6 while choosers remain 2/4, totaling 2/10. Only one subgroup changes. The labels and selection borders remain consistent in the original-detail frames.
- **Reveal:** “Only the six followers change” gives the causal comparison, and “following is assumed, not measured” places a useful limit on the toy result.
- **Transfer:** A default can change the total by changing the behavior assigned to one group while alternatives and the other group's rule remain fixed.
- **Visible issue:** The subgroup bars are labelled “Followers” and “Choosers,” but the diagram does not itself say their filled parts mean “choose X.” The output below supplies that reference. An explicit “expected X choices” legend would further distinguish expected 2/4 from a guaranteed exact count; not a blocker in this prompt's context.

Verdict reason: No specific finding in this observed artifact path blocks a first-time learner from inspecting the stipulated toy mechanism; minor clarity notes and scope limits remain recorded.

## After reading meta.json

- The current metadata reports version 3; objective: Identify which group changes when a default changes.
- The unchanged choosers and changed followers make the intended subgroup comparison inspectable. The 2/4 value is an expectation under the supplied probability rule.
- This verdict addresses this learner-evaluator gate only. It is not overall launch permission, source/build verification, fact-checking, or evidence that any human learned. I authored no lesson surface and changed no claim status.
- Source/build identity supplied for this artifact set: `da62ea4379440a0186d0f09b78a5ecb820b162aa`; `dist.next-books100-seven-v3`; BUILD_ID `cxvdaIQSI167MmWWhah2L`. Not independently verified by this review.
