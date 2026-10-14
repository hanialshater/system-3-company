*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5 wave; first learner review of this lesson): a-star-heads-for-goal
lesson version: v2
boundary: adult learner who has done the earlier lessons: knows cheapest-first search settles cells in order of cost so far, and has watched a search spread in rings; does not know that a guess of the distance left can focus it, or why an honest underestimate keeps the shortest route (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/a-star-heads-for-goal/sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact

- **Main finding (leak):** the hook reads "Add a guess of the steps left, and the search stops spreading in every direction." The question then asks how many cells get settled (7 / 25 / 49). The hook has already said the search does not flood, which rules out 49 and points at the smallest number. For this learner the misconception is "you must spread in every direction", and the hook contradicts it before the prediction. The prediction cannot catch it.
- Predict otherwise: the question gives the rule (score = steps so far + steps left), so 7 can be worked out. That is fine for this boundary. The tie-break rule ("more steps taken goes first") appears only in the reveal; on this open grid it doesn't change the count.
- Explore: "Settle to goal" with the guess settles a straight run of 7 along the middle row, "7 settled · route 6". "No guess" floods a 31-cell diamond-ish block, numbered in settle order, "31 settled · route 6". The 7-versus-31 contrast is strong and seen. "Wall: on" with the guess settles 16 cells, route 10, around a hatched wall.
- Told, not shown: "It never claims more steps left than there are, so it cannot hide a shorter route." The no-guess wall cell stays "?", so I never see that the guided 10-step route matches the flood's route. The second idea in the brief rests only on that sentence.
- Unexplained marks: the dashed-outline cells and the small "o" circles (frontier? scored but unsettled?) have no legend. The numbers on cells are settle order, not scores, though the caption above talks about scores. A learner may read "24" as a score.
- Layout: the reveal frame crops the grid at the top. Badge shows DRAFT and "0/5 claims checked" (fact-checker and product-owner lane).

## 2. Earlier findings

- No earlier learner review exists for this lesson.

## 3. New findings

- Rewrite the hook so it does not state the result (e.g. "Add a guess of the steps left. Does the search still flood?").
- Require or invite "No guess" with the wall on, so "same route length, fewer cells" is seen with the wall too.
- Label the dashed and circle marks, or drop them.
- No FATAL.
