*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: background-shortcut
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic (has heard "AI learns from examples"; has no sense of how a classifier picks its clue). Screenshots seen (sheet.png, all 4 frames).

## 1. From the artifact

- Prediction: a real guess. 95% is "it follows the better clue and stays good"; 80% the shape clue; 50% the coin flip. The question is long but readable: it gives the clue reliabilities (95% background, 80% shape) and says the model picks the more reliable one. The hook ("It aces the test photos. Has it learned what a cow looks like?") leaks the answer by its rhetoric: the answer to "has it learned what a cow looks like" is plainly no.
- The locked stage shows a grid of grey cows and camels on grass or sand with "TRAINING ?" and Model's clue pre-set to Background. The question's rule is on the stage; fine.
- Where understanding first broke: the training side. "19 of 20 right (95%)" appears only in the image description and the reveal text; on screen the TRAINING readout stayed "?" and, after shuffling, the training score is not shown. The "Back to training photos" button exists but nothing prompts it. The reveal's "right on 19 of 20 training photos", and "Shape held 80% on both sets", were never both displayed. The learner has seen 50% (background, shuffled) and 80% (shape, shuffled) only.
- What was SHOWN is strong: shuffling flips cows onto sand and the red crosses jump to half the photos; switching to Shape cuts the crosses to 4 of 20. The tick and cross marks on every photo make the result countable.
- AI claims: "A model takes the cheapest clue that works on its training data" is written as a general fact about models; in the toy the model is told to pick the more reliable clue by rule. The footnote says the toy uses one clue at a time and that real image models have been caught using backgrounds; that is the right caution, but the middle sentence reads as a law. "A high score proves the clue worked there, not that it is the clue you meant" is a fair general point.
- Reveal earned: 50% yes; the "cheapest clue" principle is asserted from one toy.
- Problems: (1) training 95% and shape-on-training never shown; (2) hook leaks; (3) toy rule stated as a law of models; (4) the learner is not asked to test shape on training, so "held 80% on both sets" is told.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows models are trained and tested and does not know that a model can learn a cue that travels with the label. The shuffle step delivers that well. The objective's "takes whichever clue works best" is the toy's rule and the reveal turns it into a general statement.
- Claims verified (5/5); the unshown part is the training-side 95% and the shape-on-training 80%.

Verdict: revise
