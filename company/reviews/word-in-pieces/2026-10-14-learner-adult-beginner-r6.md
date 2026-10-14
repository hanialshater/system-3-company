*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): word-in-pieces
lesson version: v3
boundary: adult-beginner. An adult who uses chatbots, knows a language model reads text, has heard "tokens" but does not know what one is (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/word-in-pieces/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: hook and question are neutral. "Token" is defined in the stem and the longest-piece rule is given. The locked stage shows "unhappiness" whole with TOKENS "–", so it does not leak the split. The options 11/3/1 match three real beliefs (letters, chunks, whole word).
- Explore: each toggle re-splits the word at once (4, then 8, then 11), with a piece number under each box. "zyxxy" then falls into 5 letters. The gate opened after the rare word. The record line ("Tokens seen · 11 letters, all pieces: 3 · no pieces: 11 · zyxxy, 5 letters: 5") is a ruler for "a chunk costs one, a string with no piece costs one per letter".
- Where I first hesitated: in the walkthrough frames, "all pieces: 3" is already in the record after my first tap, but I had never seen a 3-box split in any frame. The walkthrough records no frame between commit and the first tap. The stage code (`locked ? … : split`) renders un | happi | ness = 3 as soon as the prediction is locked in, so a real learner sees it before tapping. I treat this as a gap in the walkthrough, not in the lesson, but I did not see that frame.
- Reveal: it compares with what was seen (3, 11, zyxxy 5), points at the record line, and the stage returns to un | happi | ness with #412 #7031 #1297. "The model receives only the row of piece numbers" points at the #numbers that were on stage throughout. "Real tokenizers learn their lists from text" is one sentence of told context, outside the brief's gap.
- Minor: on predict there is a large empty band between the toggles and the word buttons.

## 2. After reading the brief

doesNotKnow: (a) text is cut into pieces from a fixed list before the model sees it, (b) rare strings cost more pieces than common ones. Show-the-why check: (a) is on stage (the toggles are the list; switching one off re-splits the word). (b) is on stage in the record line (11 letters cost 3, 5 letters cost 5), and the reveal points at it. The objective's "the model sees the pieces, not the word" is stood for by the piece numbers. Passes.

## 3. Earlier findings (v2 review, r5)

1. The 3-token split never appeared on stage: **fixed** (it renders on unlock, per the stage code, though the walkthrough has no frame of it; it is also on the reveal stage).
2. Reveal stage showed zyxxy, not the split: **fixed**.
3. The zyxxy contrast was made with pieces off, so "rare costs more than common" was told: **fixed** in effect. The record line puts "11 letters: 3" beside "5 letters: 5", and zyxxy costs 5 under any subset.
4. Empty area above the boxes: **not fixed** (minor).

## 4. New findings

- Minor (walkthrough tooling, owner qa-tester): no frame is captured between commit and the first stage action, so a reviewer cannot see the unlocked starting state.
- Minor: the empty predict band (above).
- No FATAL.
