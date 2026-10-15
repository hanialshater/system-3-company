*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): one-question-one-card
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Split a compound prompt into separately checkable cues.)
Screenshots seen: yes (artifacts/walkthroughs/one-question-one-card/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One target per cue"; tapped Split prompt, Cover, Swap 1↔2, Swap 2↔3, Check; opened reveal.

1. **Where understanding first broke: the compound card is never tested.** The claim is that a three-in-one card "can hide which one you missed". The stage begins with the compound card "who/where/when?", but nothing I can do checks it. My first move has to be "Split prompt". I never see a compound card that is graded right or wrong overall while one part is wrong, so the hiding is never shown.
2. **No miss ever happens.** As in other reconstruction lessons, the attempt row already holds Tuesday / Mina / library, the correct answers in the wrong order. I swap them into place and score 3/3. I never miss an item, so "a missed item is identifiable" stays words.
3. **The prediction is easy from the wording** ("one target per cue" sounds like "identifiable").
4. **The reveal half-answers.** "Separate cues expose separate gaps. A correct answer to one cue does not establish knowledge of the other two" is the right sentence, but it rests on nothing I saw.

Fixes (for the builder):
- Let the learner check the compound card first and get one overall "wrong" without knowing which part failed. Then split and see the single red slot.
- Seed the attempt with a wrong or missing value.

Verdict reason: the lesson never shows a compound card hiding a miss, and never produces a miss at all, so the reveal's sentence is not backed by anything on stage.

## After reading the brief (meta.json)

- The objective is "Split a compound prompt into separately checkable cues." The split happens, but checking the compound prompt is never possible, so the contrast is not shown (finding 1).
- Fix route: demo-builder.
