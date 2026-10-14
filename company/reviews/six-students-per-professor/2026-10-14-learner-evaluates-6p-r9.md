*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): six-students-per-professor
lesson version: v1 (meta.json version 1)
boundary: evaluates-6p (the lesson's own: can read and evaluate an expression like 6 × P; does not know how to turn a "times as many" sentence into an equation, or that letters stand for numbers of things, not for the things). First learner review of this lesson.
Screenshots seen: yes (artifacts/walkthroughs/six-students-per-professor/sheet.png, release build recorded 2026-10-14T15:24Z, 4 frames; 04-reveal.png opened at full size)
Verdict: launch

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("6S = P"), the classic reversal; for my boundary it is the natural pick, because "six times as many students" puts 6 next to S.

1. **Where it first asks for an idea I don't have: at the commit, on purpose.** The question is exactly the gap (sentence to equation). Nothing else is assumed: S and P are defined in the stem, and evaluating 6 × P is inside my boundary.
2. **No answer before the commit: met.** Three equations of the same form. The locked stage shows 2 professors with 4 students each and "?" in all three rows, so it does not show 6 per professor or evaluate any equation. The panel after the commit says "Give each professor 6 students", which is fine after the commit.
3. **Shows the why: met.** After the first slider move I see columns of one P over six circles, "S = 12", and each equation with numbers substituted: "6S = P: 72 = 2 false", "S = 6P: 12 = 12 true". Substituting is the thing I can already do, so the stage turns my wrong equation into arithmetic I can check myself. "S = 24 students" beside the circles shows S as a count, which stands for "letters are numbers of things".
4. **The reveal shows most of the payoff.** "With 4 professors and 24 students you saw S = 6P read 24 = 24, while 6S = P read 144 = 4" quotes rows that are on screen at reveal (04-reveal: whole stage and last line on one screen, ~795 CSS px tall). "It stayed true when you changed the number of professors" refers to my earlier P = 2 frame (12 = 12), which is not on stage now; the current row still reads true, so it holds.
5. **One told sentence carries the misconception.** "6S = P actually says professors outnumber students six to one" is the sentence that would change my mind about why my reading was wrong, and nothing on the stage pictures a 6S = P world (one student per six professors). I see that my equation is false, not what it means. Context-sized, so not a revise, but it is the place a learner might still hold "6S means six students".
6. **Budget and fit: met.** Reveal 72 words; stage top and last reveal line on one 390×844 screen.
7. Not seen on this path: a Students-per-professor value other than 6 after the commit. If a learner leaves it at 4, all three rows read false; the hint covers it.
8. Trust line reads 0/5 claims checked: fact-checker's gate, not a learner finding.

Where understanding first broke: it did not break; the wrong guess is answered by numbers I computed-in-kind myself.

## After reading build.md

Read after the section above; no earlier reviews exist. Nothing in build.md changes the findings. Note for the category manager: finding 5 is the candidate to show rather than tell if a v2 is made; not a launch blocker.
