*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): draw-the-xor-lines
lesson version: v4
boundary: adult-beginner. Knows that a straight line can split two groups of points and that a simple classifier labels points by their side of a line; does not know that some patterns cannot be cut by one line, or why networks need hidden layers (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/draw-the-xor-lines/sheet.png, all 7 frames)
Verdict: launch

## 1. From the artifact

- Hook: "How many straight cuts does it take to separate them?" is a question, but it quietly hints that the answer is more than one, which leans toward "No, never" before the learner commits. Minor leak.
- Predict: the question gives coordinates ((0,0), (1,1) blue; (0,1), (1,0) orange). The locked stage shows the same four dots with a vertical line at 2 of 4, so the learner can picture it without the coordinates. Option 3 ("if the blue dots are moved slightly") changes the question rather than answering it. It is a weak distractor, but it does no harm.
- Explore: one press of each control responds at once. The red dashed rings mark the dots that are wrong. "Not yet: 3 of 4 right" with one line, then "Add line 2" and one turn gives "Solved: all 4 right". The "middle" dot at (0.5, 0.5) takes the model's colour: it is orange at 3 of 4 with one line, so the learner can see that the middle goes with whichever pair the line puts together. The "on 1" / "on 2" labels give the XOR rule something to point at.
- The why: the reveal's midpoint argument ("a side that holds both blues must hold the middle dot") points at a dot that is on stage and coloured live. That is a stand-in, not only told text. The learner sees the middle change colour but never sees the "both pairs claim it" conflict drawn, so the last step still takes some reasoning. It is acceptable for 60 s.
- Reveal: "Your best with one line was 3 of 4" matches what was seen. "Exactly one line's on side" matches the labels on the final stage. The hidden-unit sentence is one claimed sentence of context.
- Minor: in step 3/4 the "middle" label and the "on 2" label overlap ("midd|e on 2"), which makes the key dot harder to read.
- Minor: on the reveal frame the stage scrolls so the top two dots are cropped, and the reveal talks about "the two blues" while one blue is out of view.

## 2. Earlier findings (r5 review, v3)

1. Line 2 started in a solving position, so "two can" was handed over: **fixed**. "Add line 2" now lands at 3 of 4, and the learner had to turn line 2 to reach 4 of 4.
2. The one-line ceiling (3 of 4) was told, not reached: **fixed**. One line reached 3 of 4 in this run, and the reveal now says "Your best with one line was 3 of 4".
3. "On" for a line's side was never shown: **fixed**. The "on 1" / "on 2" labels sit on each line's on side, and the reveal points at them.
4. Midpoint argument's last step was implicit: **fixed**. "A line's two sides cannot share a point" is now stated, and the middle dot is coloured live by the model.
5. The "middle" label was overprinted by line 1 when locked: **fixed** in the locked frame. A new overlap with "on 2" appears in step 3/4 (minor, above).
6. The stage was cropped at the reveal: **not fixed** (minor).

## 3. After reading the brief

- doesNotKnow "some patterns cannot be cut by one line": the learner reaches the 3-of-4 ceiling and the live middle dot stands for the reason. It is shown.
- doesNotKnow "why networks need hidden layers": the two lines the learner combines are the stand-in, and the reveal names them as two hidden units. That meets "Show the why you promised". The jump from two lines to "a hidden layer" is still one told sentence, which is acceptable as context.
- Remaining minors: the hook's "how many cuts" leans toward "more than one", the middle/on 2 labels overlap, and the reveal frame is cropped. None of these blocks launch. No FATAL.
