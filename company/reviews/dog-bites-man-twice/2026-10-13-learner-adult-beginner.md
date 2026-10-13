*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: dog-bites-man-twice
lesson version: v1
boundary: adult beginner; has heard "attention" and "vectors" as words, cannot compute a dot product.
Screenshots seen: yes (sheet.png, 4 frames)
Verdict: revise

## 1. From the artifact

- First idea I didn't have: "gathers a summary of its sentence by dot-product attention" in the question. Nothing on the stage tells me what a summary is beyond "the arrow". I can still guess "same words, same summary", so the prediction is reachable, by intuition not by the toy.
- Told-not-shown (main finding): the reveal says "both orders gave the summary (0.79, 0.79)". I only saw one summary with tags off: the readout was "–" for "dog bites man" and showed (0.79, 0.79) only after the swap. I never saw the two orders side by side. With tags on I saw one order only, as the reveal itself admits. So the lesson's point (tags make order matter) has no visible contrast in this path: I saw (0.79, 0.79) then (1.62, 0.59), which differ because of tags, not because of order.
- Layout: on the locked predict frame the chart is a thumbnail; the word pills and axis labels are unreadable. The hollow circle in the chart is never labelled. In the reveal frame the chart shrinks again to unreadable size.
- Reveal answers "does attention notice order?" in words; the stage did not earn it.

## 2. After reading the brief

- The learner field assumes "attention mixes word vectors using weights"; my boundary is below that and the question's jargon shows.
- Suggested fix: show the summary for the current order from the start (not "–"), and keep a small "dog bites man: (…) / man bites dog: (…)" pair for each tag setting so the learner sees same/different directly; label the hollow circle; keep the chart legible when locked and at reveal.
