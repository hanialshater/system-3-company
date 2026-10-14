*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): running-median-two-heaps
lesson version: v1
boundary: knows that a heap hands back its top fast (heap-bubble-up) and what a median is; does not know that a max-heap of the lower half plus a min-heap of the upper half keep the median at their tops; assumes a growing stream must be re-sorted. (From meta.json learner field; there is no earlier learner review.)
Screenshots seen: yes (artifacts/walkthroughs/running-median-two-heaps/sheet.png)
Verdict: revise

## 1. From the artifact
- **Top finding: the prediction does not touch the idea.** The question asks for the medians after 5, 15, 1, 3. Anyone who knows what a median is (my boundary does) gets "5, 10, 5, 4" by sorting in their head, and that sorting is the very misconception the hook names. My prediction "held", so there was no surprise, and the reveal has nothing to answer. The distractors are "the last number" and a wrong mean, which test arithmetic, not heaps. The tension in the hook ("Must you re-sort?") needs a question about *how*, e.g. "When 3 arrives, which numbers must move?" (1 + one top move vs all four), or "How many numbers does the 1,000,001st arrival touch?".
- Shown well (when stepped): two halves with "biggest on top" / "smallest on top" labels, the median drawn between the two tops, and one rebalancing caption: "3 ≤ 5: into the lower half. Lower is too big: 5 moves up." That move, one number hopping across, is the heart of the method, and it is on stage.
- **The gate lets the method be skipped.** One "Next number" press, then "Feed the rest", unlocks the reveal. The 15 and 1 arrivals, including the state where the median is a single top (after 1: median 5), go by unseen. Only the last caption stays on screen. "Feed the rest" should step through each arrival, or the gate should need each one.
- Minor: on the recorded path the learner pressed "Start over" before the reveal, so the reveal's "the lower half held 1, 3 and the upper half 5, 15" sits beside an empty stage. Keep the final state on reveal, or make Start over not count.
- Minor: with 2 items per side, the "heaps" are a node and one child, so nothing heap-like is visible. "About log n steps: around 19 levels for a million numbers" is told context. That is fine as one claimed sentence, but "never re-sorts" is never contrasted with what a re-sort would cost on stage (e.g. a "touched: 2 of 4" readout).
- Minor: the hook (44 + chars) reads as a topic question. That is fine.
- No FATAL.

## 2. Earlier findings
None: this is the first learner review.

## 3. Against the brief (read after section 1)
doesNotKnow (two heaps keep the median at their tops) is on stage, in the median slot between tops, so show-the-why is met *if* the learner steps. The objective's "one heap insert and at most one move per number" is visible for 3 only, and the default path skips the other arrivals. The misconception "re-sort every time" is never put at risk by the prediction. That is the revise.
