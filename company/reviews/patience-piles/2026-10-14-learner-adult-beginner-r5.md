*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): patience-piles
lesson version: v2
boundary: an adult beginner who has played patience/solitaire; can find a rising run by eye in a short list but has no method.
Screenshots seen: yes (artifacts/walkthroughs/patience-piles/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Predict: "Pick cards left to right, skipping any, so each is bigger than the last" is a clear plain-words definition of a rising run. Options 3/4/5. The locked stage shows the 8 cards and an empty "new" pile; the dealing rule is not yet stated, so nothing leaks. I could find 1 4 5 6 by hand, so 4 is guessable.
- Explore: "Deal one by the rule" deals 3 to a new pile with a caption ("3 → a new pile"). Then "Deal the rest" deals all seven remaining cards at once: "Every card dealt by the rule." I saw the rule applied to exactly one card, the trivial one. Why 1 lands on 3, why 4 starts pile 2, why 2 goes under 4 is never captioned. The panel states the rule ("leftmost pile whose top is not smaller") but I did not watch it decide anything.
- "Trace from last pile" highlights 1 4 5 6 across piles 1 to 4 and in the card row. That is the payoff: 4 piles, run of 4, visible. Tapping pile 1 gives "Traced back from pile 1: 1", a one-card run; it is a curiosity, not a lesson.
- Where understanding broke: the reveal's "every card on pile k points back to a smaller, earlier card on pile k − 1". Nothing on stage draws such a pointer; the only arrow on stage, "←", means "this pile's top card" (legend: "← marks each pile's top card"). So "points back" collides with the stage's own arrow meaning. The "why piles = longest run" argument is told and dense for this boundary.
- One example only: the claim "always" rests on a single deal; there is no second hand to test it on.
- Reveal: "3 4 5 9 is another" is checkable against the row. Chip 70 s.

## 2. Earlier findings (v1 review, 2026-10-14)

1. Tracing not mentioned; the useful trace (last pile) not reached: **fixed** ("Trace from last pile" button, named in the panel; highlights 1 4 5 6 in piles and row).
2. "Deal the rest" hides 7 of 8 applications of the rule: **not fixed**. Still the top problem.
3. Reveal quotes runs never visited: **partly fixed** (1 4 5 6 is now traced on stage; 3 4 5 9 is still only quoted, but is checkable by eye).
4. Pile "top" ambiguous: **fixed** ("←" on each top card, legend under the piles).
5. Back-pointer argument told, no pointers drawn: **not fixed**, and now the "←" top-card marker makes "points back" read like it means that arrow.

## 3. New findings / what would move this to launch

- Top: let the learner watch the rule decide at least the interesting cards (1 onto 3, 4 to a new pile, 2 onto 4): step-by-step "Deal one" as the main path, or animate "Deal the rest" with a caption per card.
- During the trace, draw the back-links (6 -> 5 -> 4 -> 1) as lines between piles, so "points back to pile k − 1" is seen, and use a different glyph from the top-card "←".
- Minor: chip 70 s.
- No FATAL.
