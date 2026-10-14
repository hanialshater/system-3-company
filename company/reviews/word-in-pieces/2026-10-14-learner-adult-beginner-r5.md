*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): word-in-pieces
lesson version: v2
boundary: an adult who uses chatbots; knows a language model reads text; has heard "tokens" but does not know what one is.
Screenshots seen: yes (artifacts/walkthroughs/word-in-pieces/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "token" is now defined ("one piece of text that a model reads as a unit") and the greedy rule is given. With the list un / happi / ness on screen, 3 is now derivable by reading; the prediction tests whether I believe the definition, which is acceptable. The locked stage shows the word whole, "TOKENS –".
- Explore: my first tap (as the panel invites, "Switch pieces off") turned "un" off: u | n | happi | ness = 4, then 8, then 11, each box with a made-up piece number (#21, #7031 ...). The piece numbers make "a row of numbers" visible. Good.
- **Where it broke: the answer state (un | happi | ness = 3) never appeared on stage.** Unlocking leaves the word unsplit and the panel tells me to switch pieces off, so the 3-token split is only in the reveal text ("With all three pieces on ... split into un | happi | ness").
- "zyxxy" = 5 was tried with all pieces off, so it does not show a rare string costing more than a common one; with the pieces off, unhappiness cost 11. The "common chunk costs one; a rare string falls into many" contrast is told, not seen.
- Reveal stage still shows zyxxy with pieces off, not the 3-token split.

## 2. Earlier findings (v1 review)

1. "Token" undefined before the question: **fixed**.
2. The 3-token split never shown; reveal opens with it: **not fixed**.
3. Reveal stage shows zyxxy, not the split: **not fixed**.
4. Piece IDs to make "a row of numbers" visible: **fixed** (#numbers under each box).
5. Empty area above the boxes: **not fixed** (minor).

## 3. New findings

- **Revise:** show un | happi | ness = 3 on stage as soon as the prediction is locked (before any toggle), so the answer is seen.
- Minor: the zyxxy comparison happens with pieces off; with pieces on it would show 3 vs 5 for words of 11 vs 5 letters, which is the real contrast.
- No FATAL.
