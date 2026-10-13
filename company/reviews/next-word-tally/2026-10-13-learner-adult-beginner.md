*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: next-word-tally
lesson version: v1
boundary: adult beginner; uses phone predictive text, can count; nothing about language models.
Screenshots seen: yes (sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- No missing idea at predict: the three training sentences are on screen and the question is concrete. "No, it never saw that sentence" is the natural pull. Good prediction.
- Explore is a nice mechanic: after each word I see "After 'cat', training had: ate ×1, sat ×1", so the model's whole memory is visible as I tap.
- Main finding: in this path I tapped the → mat and got "the mat." with a green badge "New: not in the training text." and "new sentences: 1". But "the mat." is the last two words of the first training sentence. As a beginner I read the badge as wrong, and the reveal opens by praising it ("Your last sentence, 'the mat.', was not in the training text"). This undermines the lesson's own claim of novelty. The badge should fire only when the whole sentence is not a substring of training text (or require a minimum length).
- Told-not-shown: if the learner does not build "the dog sat on the mat", the reveal tells the four pairs instead. Acceptable, but the stage could check the target sentence for them.
- Layout: explore frames have a large empty area above the sentence box; the box jumps vertically between frames (top at predict, middle later). The locked bars are faded but readable.

## 2. After reading the brief

- Learner field (phone suggestions, counting) matches my boundary exactly. Intent delivered when the learner follows the suggested sentence.
- Suggested fix: stricter novelty check (not a contiguous piece of training text) and say "new sentence" only then; keep the sentence box fixed in place.
