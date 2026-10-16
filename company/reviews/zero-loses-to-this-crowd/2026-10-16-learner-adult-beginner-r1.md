*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: zero-loses-to-this-crowd
lesson version: v1
boundary: adult beginner with the lesson's own boundary: knows the two-thirds game and its ladder to 0 under common knowledge of rationality; has never been shown that against a crowd that stops after one or two steps, the winning guess depends on what the crowd actually guesses, so 0 loses.
Screenshots seen: yes (artifacts/walkthroughs/zero-loses-to-this-crowd/sheet.png, recorded 2026-10-16T12:34:54.367Z; also 01-predict.png at full size)
Verdict: revise

Walked on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (R3 ancestor test passes for the lesson's last commit 379a759, the build the commit subject calls "v2"; meta.json still says version 1, so this record stamps v1).

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **cm-behavioral's question: does "between the other two" act as a middle-option cue? Yes.** The three options are glossed by role: "0, the equilibrium guess", "About 35, the crowd's average", and "About 23, between the other two". The first and third glosses name a concept. The middle one names only its position relative to the distractors. To this mind, that reads as the option the writer filled in, and a test-wise adult picks the middle of three numbers on that basis alone. It also tells me nothing about why 23 could win, so it does not invite me to reason about the crowd. Worse, the cue does not stand alone (finding 2).
2. **The answer is computable from the card, with no need to think about the crowd.** The hook says "closest to two thirds of the average wins". Option 3 says the crowd's average is about 35, and two thirds of 35 is about 23, which is option 2. The stage text also says "30% near 22 (two steps)". So a learner who still believes 0 wins can get the predict right by arithmetic on the options, plus the middle-cue. The belief the lesson exists to catch (0 wins) is caught only in learners who do not do that sum. For this boundary (knows the ladder), the natural wrong answer is 0, and the card makes it easy to dodge without giving it up.
3. **What the prediction felt like: a pick-the-number quiz.** It did not feel like a guess I would make in the game. The question "which guess lands closest ... your guess included?" refers to my guess before I have set one (the slider sits at 50). "your guess included" is a puzzle on first read.
4. **The predicted answer and the slider are disconnected.** I predicted 0, but the stage and the reveal judge my slider value (52 in the recorded path): "Your guess missed by 28.8; 86 simulated guesses were closer. Had you guessed 0, ... you would have missed by 22.9." A learner who predicted 0 is told their guess is 52. That is true of the slider and untrue of their prediction. The useful comparison for this boundary is 0 against about 23, and the stage never shows a 23 guess's miss next to 0's.
5. **Whether the reveal answered the question I had: mostly yes.** "Against a crowd that stops after one or two steps, the winning guess sits near two thirds of the crowd's actual average, not at 0" is the sentence I needed. The histogram with 23.2 and 34.8 marked, plus the dotted 22.9 gap from 0, makes it concrete. "Where it stops: a simulated crowd with a stated rule, not real players" is clear and honest.
6. **Jargon:** "seed 2" means nothing to an adult beginner and costs attention on the busiest line of the stage. "one step" and "two steps" are underlined, so presumably they define on tap; the walkthrough did not open them.

Verdict reason: the option glosses and option 3's stated average let a learner reach "about 23" by test-taking (middle position, plus two thirds of 35) without giving up the belief that 0 wins, so the prediction does not reliably expose the misconception (findings 1 and 2).

## After reading build.md / meta.json

Read after the findings above were committed (30fa641). I read meta.json only. build.md is unread.

- **The middle-option cue is also in the recall.** The recall's answer is "About 30, between the other two" (distractors "0, the equilibrium guess" and "About 60, the crowd's average"). Its target is "half the average" of 60, so it can be answered the same two ways as the predict: middle position, or arithmetic on option 3. A recall that is answerable by test-taking gives no retention signal. This extends finding 1 to c10.
- c2 confirms that 23 is the predict answer and that the slider was the intended "your guess". The recorded "86 simulated guesses were closer" (at g = 52) and c2's "84" (at g = 0) are consistent, being different guesses. This is not a claim error.
- c3 says the 100 dots average 34.6 alone. Option 3's "About 35" is that number, rounded, and the two-thirds rule is in the hook. So finding 2 holds as designed: the card states both inputs to the answer.
- The objective ("can explain that the winning guess is two thirds of what the crowd actually averages") is what the reveal line c7 says, and the stage shows it well (finding 5). My objection is to how the predict is built, and the content is fine.
- For cm-behavioral, in short: yes, "between the other two" reads as a middle-option cue to this mind. It is the only gloss that names a position and not a concept, and on its own it would be enough for a test-wise adult. Combined with option 3's stated average, the card hands over the answer. This is a finding about the artifact. How to fix it belongs to the builder and the CM.
