*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): next-word-tally
lesson version: v2
boundary: adult beginner; uses phone predictive text, can count; nothing about language models.
Screenshots seen: yes (artifacts/walkthroughs/next-word-tally/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Predict: "the" with its followers (cat ×2; dog, fish, mat, rug ×1) and the three training sentences in the question. No leak; "No, it never saw that sentence" is a real pull. The rug row is half cut off by the list box at predict (minor).
- Explore: tapping cat then sat shows each word's followers, so the model's whole memory is visible. After Start over, tapping mat gives "the mat." with "Not new: it is a piece of the training text." That label is now honest.
- **Where it loses me:** the gate ("Show me why") opened on "the mat.", a verbatim fragment. A learner who predicted "No" can reach the reveal without ever building "the dog sat on the mat" or any sentence that is new. On this path the stage only ever showed things the model *had* read, which supports the wrong prediction; the counterexample arrives as reveal text. A learner who follows the panel's suggestion would see it, but the gate does not require it. Suggest: open the gate only once a sentence the stage marks as new has been built (the target or any other).
- Reveal: answers the question I had: it lists dog→sat, sat→on, on→the, the→mat and says each pair is in the training text. It matches the counts I saw. The nonsense example "the cat sat on the cat ate the fish" is told, not built (fine as an aside). The LLM paragraph is properly bounded ("not one word").
- Minor: the sentence box still jumps vertically between frames (top at predict, middle in explore) as the follower list grows and shrinks.

## 2. Earlier findings (v1 review, 2026-10-13)

1. "New: not in the training text" badge fired on the fragment "the mat.": **fixed** (now "Not new: it is a piece of the training text", and the reveal says so).
2. Told-not-shown when the learner does not build the target sentence: **not fixed**, and now the main finding, because the gate still opens on a non-novel sentence.
3. Sentence box jumps vertically / empty area above it: **not fixed** (minor).

## 3. New findings

- Rug row clipped at predict (minor).
- No FATAL.
