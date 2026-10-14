*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: word-in-pieces
lesson version: 1
Screenshots seen: yes (sheet.png, 6 frames)
boundary: an adult who uses chatbots; has heard "tokens" in pricing but does not know what one is.

## 1. From the artifact

- Prediction: "token" is never defined before the question. If I read it as "piece", the question lists un, happi, ness, which spell unhappiness, so 3 is immediate. I chose 11 (one per letter) because I did not know a token could be more than a letter. The prediction tests vocabulary, not the idea.
- Where understanding first broke: I never saw the answer on the stage. In explore the word sits unsplit; the panel says "Switch pieces off", so my first tap turned "un" off and showed 4 tokens (u | n | happi | ness). At no point did the stage show un | happi | ness = 3, yet the reveal opens with "With all three pieces on, 'unhappiness' split into un | happi | ness: 3 tokens". The headline state is told, not shown.
- Explore otherwise good: toggling pieces off visibly re-splits the word into numbered boxes (4, 8, 11), and "zyxxy" falls into 5 letters. "Common chunk costs one, rare string falls into many" is visible.
- Stage at reveal shows zyxxy with all pieces off, not the 3-token split.
- Told-not-shown: "does not receive the word or its letters. It receives a row of piece numbers" is told; the numbered boxes half-show it (they are positions, not piece IDs).
- Layout: clean; no clipping; big empty area above the boxes.
- Fix suggested: show the split un | happi | ness (3) as the first explore state, before any toggle; define token in the question ("a piece the model reads"); optionally show piece IDs (e.g. #412) under each box to make "a row of numbers" visible.

## 2. After reading the brief

- Objective: text is cut into pieces from a list; common chunks cost one, rare strings many; the model sees pieces. The rare-string half is shown well. The 'common chunk costs one' half depends on the 3-token state that the stage does not show by default.
- Claims: 5, all verified; I cannot vouch for them.

Verdict: revise
