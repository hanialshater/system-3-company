*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): the-pivotal-juror-convicts
lesson version: v2
boundary: knows-bayes (from meta.json learner.knows: Bayes' rule from which-coin-is-it, and that a unanimous jury needs every vote to convict. Does not know that your vote matters only when you are pivotal, or that being pivotal is itself evidence.)
Screenshots seen: yes (artifacts/walkthroughs/the-pivotal-juror-convicts/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "Three jurors, clues 70% reliable. Unanimity needed to convict. Your clue says innocent. In the one case your vote matters, how likely is guilt?" 30 / 50 / 70. 30% is the natural answer (my clue alone) and I took it. The stem does not say the prior is 50/50; someone who knows Bayes will notice that it is needed. The locked stage (all three innocent, "Chance of guilt from all three clues: 7%", "Your vote matters: No") does not give 70% away.
- Explore: "Juror 1 votes guilty" → 30%, still Acquit, "Your vote matters: No". "Juror 2 votes guilty" → "Your vote decides the verdict.", 70%, "Your vote matters: Yes". This frame is the lesson. I can see that pivotal = both others guilty, and the bar jumps to 70% while my clue is still innocent. Being pivotal is evidence, and it is shown.
- **Where it broke (top finding):** "You vote guilty" flips my figure's tag to "guilty", the verdict to Convict, and the bar still reads "Chance of guilt from all three clues: 70%". The tags under the figures are **votes**, but the bar says it is computed from **clues**, and on the stage they look the same. With three red "guilty" tags and a bar that says "all three clues: 70%", a Bayes-literate learner computes GGG ≈ 93% and decides the lesson is wrong. The reveal frame shows that same contradictory state. The lesson rests on the gap between my clue (innocent) and my vote (free), and the stage never shows my clue separately once I change my vote.
- Reveal: points at the pivotal case ("both other jurors voted guilty ... two guilty clues against your one innocent clue make guilt 70% likely"). "The same as one guilty clue alone" and "your clue by itself gave only 30%" are told. The 30% I saw was G-I-I with three clues, not my clue alone. Both happen to equal 30% under a 50% prior, but the stage never shows "your clue alone".

Told vs shown check (brief): doesNotKnow "your vote matters only when you are pivotal" is "Your vote matters: Yes" only at G-G. "Being pivotal is itself evidence" is the bar at 70% with my clue innocent. Both are shown, in step 3. The block is the vote/clue conflation, which makes the final state, and the reveal frame, contradict that evidence.

## 2. Earlier findings

No earlier learner review exists. Boundary taken from meta.json.

## 3. New findings

- **Revise:** separate clue from vote on the existing figures. For example, give each juror a small fixed clue chip ("clue: innocent" for You, never changing) and a vote tag, and label the bar "from the three clues". The others vote their clues, so their chips and tags move together; mine does not. Then "You vote guilty" changes the verdict and leaves the 70% plainly about clues.
- Moderate: state the 50/50 prior in the stem or on the stage ("guilty or innocent equally likely before the clues"). Without it, a Bayes-literate learner cannot get 30% or 70%.
- Minor: the claim "your clue by itself gave only 30%" is told; one line on stage ("your clue alone: 30%") would let the reveal point at it.
- Note: 3/4 claims checked (fact-checker's lane).
- No FATAL.
