*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): reverse-the-flashcard
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish two directions of an arbitrary word-pair mapping.)
Screenshots seen: yes (artifacts/walkthroughs/reverse-the-flashcard/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Hide the word"; tapped Reverse, Cover, Swap 1↔2, Swap 2↔3, Check; opened reveal.

1. **Where understanding first broke: the "attempt" row hands me the answers.** After Reverse and Cover, the brown row already holds zib / dax / wug, the three right words in the wrong order. I swap them into place and get 3/3. That is unscrambling, not recall of a word from its meaning. The hard part of the reverse direction (producing "wug" from "blue" with nothing on screen) never happens.
2. **I never see the one-direction result fail the other direction.** The hook is "Knowing a word from its meaning does not check the reverse direction". I never test the first direction (dax → red) at all, since my first tap is Reverse. So there is no moment where one direction passes and the other fails.
3. **The prediction is a definition** ("meaning-to-word" means hide the word). Easy if you read slowly, but I had to parse it twice: is "meaning-to-word" the cue or the answer?
4. Nonsense words (dax, wug, zib) are a good choice: no prior knowledge leaks in.
5. The reveal sentence ("A result in one direction is not a test of the other") is right, but it is backed by nothing on stage.

Fixes (for the builder):
- Run the forward check first (easy, 3/3), then reverse with an empty answer row or with distractors, so the reverse direction can fail.

Verdict reason: the reverse test is done by reordering answers already on screen, and the forward direction is never checked, so the contrast the hook promises never appears.

## After reading the brief (meta.json)

- The objective is "Distinguish two directions of an arbitrary word-pair mapping." Only one direction is tested, by reordering supplied answers (findings 1–2).
- Fix route: demo-builder.
