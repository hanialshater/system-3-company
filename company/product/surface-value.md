# Surface Value: the written objective

owner: founder · protected (constitutional surface) · version: 1 · 2026-10-12

If the objective is not written down where someone can argue with it, it enters through
invisible overrides. This is the objective. Changing it is an amendment.

## For a lesson

A lesson is better when, in this order:

1. **It is true.** Every claim is verified; no unrecorded claims on the stage. *(Hard gate.)*
2. **It works.** Every control does something; no errors; it fits a phone. *(Hard gate: QA.)*
3. **It teaches the payoff.** Borrowed-mind reviewers can name the idea after the reveal, and the reveal answers the question the learner actually had. *(Pairwise judgement, recorded with reasons.)*
4. **It is remembered.** First spaced-revisit recall rate. *(The closest metric we have to learning; real learners only.)*
5. **It is finished.** Prediction → reveal completion. *(Necessary, not sufficient.)*

Engagement (dwell, swipes, shares) is reported, labelled as engagement, and **never** used to rank
lessons against each other or to choose what to build.

## For the feed

- The default order is subject round-robin, published first, then lessons in review, labelled as such. Every subject chip shows it, and the All feed shows it when the company flag is off. Where the default order is shown, the feed says it is not personalised.
- With the company build flag `NEXT_PUBLIC_NEW_LESSON_ORDER` on, the All feed's new lessons follow the frozen candidate named in AMD-015, for every learner. There is no learner switch. The flag is on only when its value is exactly that candidate's name (today `reachable-v3`). It is read once at build and is off in the repository. Inside the pilot subjects the candidate reorders pilot lessons among the slots the default order gives them. Every other lesson keeps its default slot. Due revisits still come first. Every card it moves says why, and the reason is true.
- On a device with no history the order uses no learner data, and the feed says what its order is. With the flag on, a new device sees the candidate's own empty-history order: in the pilot subjects, lessons that build on fewer others come earlier, the same order on every new device. In that order a lesson in review can come before published ones, still labelled as in review. A different candidate, or a different cold-start behaviour, needs a further amendment.
- Revisits come before new lessons when due.
- Nothing autoplays. There are no streaks and no guilt.

## Trade-offs we accept, in writing

| Trade-off | Accepted cost | Owner |
|---|---|---|
| Predict-before-reveal adds friction | Some learners will leave at the prediction | founder |
| Gates slow publishing | Fewer lessons per cycle | founder |
| No learner data at cold start: a new device gets a fixed order, the same for everyone | A less "magical" first minute | head-of-product |
| The All feed's new-lesson order is personalised for every learner, with no learner switch (founder, 2026-10-17) | A learner who dislikes the order cannot turn it off. The company flag and its withdrawal (AMD-015 Part B) are the only off | founder |
| At cold start, with the flag on, lessons in review can come before published ones in the All feed | A learner may meet a labelled in-review lesson earlier than the default order would show it | head-of-product |
| No live comparison group unless the founder decides one (O2) | The live effect is not measured. It is reported before/after, as description, never as cause | founder |
