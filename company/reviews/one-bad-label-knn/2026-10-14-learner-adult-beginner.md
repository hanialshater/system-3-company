*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: one-bad-label-knn
lesson version: 1
Screenshots seen: yes (sheet.png, 7 frames)
boundary: an adult with no machine-learning background; has never seen "k-nearest neighbours" or the letter k used this way.

## 1. From the artifact

- Where I first needed an idea I didn't have: the prediction. "With k = 1 it is labelled orange. With k = 5 ..." uses k before anything says what it is or that neighbours vote by majority. "Vote" first appears in explore ("the 3 nearest dots vote"). So for me the question is either a riddle (what is k?) or, if I guess "majority", a giveaway: the question itself says "4 blue, 1 orange". Either way the prediction does not test the idea.
- Explore is good: lines from the diamond to each voter, coloured by label, make "who votes" visible. k = 3, 5, 7 stay blue; k = 13 reaches across to the orange cluster and flips to orange. Moving the dot at k = 13 and staying orange supports "wherever it sat".
- Subtle count: at k = 13 the tile says "6 blue · 7 orange", but the right cluster has 6 orange dots; the 7th is the mislabelled one. Nobody says so; a careful learner may think they miscounted.
- Told-not-shown: "Choosing k trades following noise against blurring the borders" is told, earned by the k = 1 vs 13 contrast.
- Layout: at reveal the stage shrinks to a small thumbnail and the vote lines become hard to see; empty top band in explore. No clipping.
- Fix suggested: one line before the question ("A new dot takes the majority label of its k nearest dots"); ask the prediction about something not stated in the question (e.g. which k first turns it blue, or what k = 13 does); note "7 orange (including the mistake)".

## 2. After reading the brief

- Objective: several neighbours outvote one bad label; too large a k gives the overall majority. The brief says the learner does not know how k-NN votes, which confirms the prediction asks them to use a rule they have not been given. The explore delivers both halves of the objective.
- Claims: 3, all verified; I cannot vouch for them.

Verdict: revise
