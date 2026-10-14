*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): window-forgets-start
lesson version: v2
boundary: an adult with school-level maths and science, new to the topic; no trig, no specialist vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/window-forgets-start/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the hook ("You told it your cat's name twenty words ago. Can it still see it?") sets up the right worry. The question (20 tokens, last 8 seen, fact at a random spot) is answerable by dividing 8 by 20, so for an adult with percentages it is near arithmetic rather than a belief test. The 100% option still catches the "it remembers everything" belief, and the walkthrough learner picked it. The locked stage (window 20, every tile lit, readouts blank) leaks nothing.
- Explore: Window 4 / 8 / 12 grey out the early tiles, and the star at 5 goes dark with "MODEL CAN USE ★: no: outside". "Positions inside window" gives 4 of 20 = 20%, 8 of 20 = 40%, 12 of 20 = 60%. That is clear, and it comes from the stage. Moving the star with ◀ ▶ at window 20 changes nothing (always "yes"), which is correct but teaches nothing; it would only bite at a small window. "Drop at 20 random spots" at window 20 gives "20 of 20 (window 20)". This is the experiment that turns "positions" into "chance", but on this path it runs at the one window where it is trivial.
- Reveal: "With a window of 8, only positions 13–20 reach the model: 8 of 20, so 40%... Your fact at position 5 went dark." Seen. The next sentence, "Your 20 random drops at window 20 put 20 inside, 100%; the long-run share for window 20 is 100%", is true but answers a question I didn't ask. It reads like filler and doesn't connect the drops to the 40% in the question. "Not remembered faintly; not there at all" is supported by the greyed tiles. "Real models have windows of thousands of tokens or more" is told, which is fine as context.
- The trust link reads "2/4 claims checked" on every frame.

## 2. Earlier findings (2026-10-14 review, v1, verdict revise)

1. The drops ran at the selected window while the reveal quoted window-8 numbers ("1–15 inside... on average 8") that were never seen: **fixed**. The reveal now reports the drops for the window they actually ran at. It is honest but unhelpful at window 20 (new finding 1, minor).
2. Unexplained green dots: **fixed**. The stage label now reads "DOTS = DROPS".
3. 40% for window 8 only told: **fixed**. "POSITIONS INSIDE WINDOW: 8 of 20 = 40%" is on stage.
4. The core idea "outside = not there" is shown: still true.

## 3. New findings

1. Minor: the random-drop experiment can be run at window 20, where it shows nothing, and the reveal then reports it verbatim. Option: lock the drops to the question's window 8, or have the reveal say "try the drops at window 8" when they were run at 20.
2. Minor: the prediction can be computed (8/20) by anyone who reads it as a fraction question, so it tests arithmetic more than the belief "the model remembers everything". The 100% option still serves the belief.
3. Minor: the hook says "twenty words" and the stage says "tokens"; tokens are never glossed. A beginner treats them as words, which is harmless here.
4. Routed, not mine: the trust sheet shows 2/4 claims checked (fact-checker).
5. No FATAL. The core idea (outside the window means gone, and the share inside is window ÷ length) comes from the stage.
