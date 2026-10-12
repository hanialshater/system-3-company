*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: pendulum-period

Knowledge boundary used: remembers school arithmetic and everyday life (swings, clock pendulums, grams and kilograms); has never studied mechanics, gravity as a force, or period formulas. Phone viewport. Method: transcript + screenshots (walkthrough and QA phone), plus my own Playwright run (weight slider to its maximum at 1 m with and without Release, string to its minimum, a prediction of "the same time").

## 1. From the artifact (written before reading the brief)

**Where understanding first broke.** In the reveal, at "Gravity pulls 20 times harder on 2 kg than on 100 g, but 2 kg is also 20 times harder to speed up. The two cancel exactly, so mass drops out." I can follow "pulls harder" and "harder to speed up", but "cancel exactly" is asserted; I accept it only because the demo agreed. Before that, the stem is clear, though "takes about 2 seconds per back-and-forth" reads as period without saying so, and "t = 0.0 s", "YOURS 2.02 s" and "GHOST 2.02 s" appeared as bare labels: I did not know at first that the ghost is a fixed reference (the locked text says "Dashed ghost: 1 m, 100 g", which helped).

**Did the prediction allow a real guess?** Yes. Everyday intuition splits: heavier things fall harder, so "faster" feels right, while a child on a swing swings the same whatever their mass, so "same" also feels right. The three options are plain. This is a good guess question for a beginner. "Longer" and "less time" are equally plausible and I could commit.

**Did exploring answer the learner's actual question?** Partly. My question is "does the heavy one actually swing slower?". The answer to that is only visible by pressing Release with the weight changed and the string left at 1 m, and watching the bob stay on top of the dashed ghost (my own run: "2 kg vs 100 g: still in step with the ghost", YOURS 2.02 s = GHOST 2.02 s; the real bob sits exactly over the ghost, which is convincing, though it also hides the ghost completely so I had to read the caption). But:
- The walkthrough did something different. Its first move was the weight slider (to 400 g) without Release; the caption read "Dashed ghost: 1 m string, 100 g. Release them together." and no one was swinging. It then changed the string to 1.75 m, pressed Release, and every later screen says "Different string: out of step with the ghost." So at no point did that walkthrough watch a heavier bob at the same length swing. The only swinging it saw was "out of step", which looks like proof that the pendulum with the changes (heavier AND longer) is slower, the opposite of what the reveal says.
- The instruction text, "Release it, then change the weight. Then change the string.", gives the right order, but nothing enforces it.
- Changing both sliders at once is a confound a beginner cannot untangle; the caption "Different string" is the only hint of which change caused the drift.
- Driving it myself: moving the weight slider to 2 kg without ever pressing Release already unlocked "Show me why" (YOURS and GHOST both read 2.02 s). I never saw anything swing, yet the reveal button was live.

**Was the reveal earned by what was SHOWN or only TOLD?** Only told, for anyone who does not follow the right order. The reveal says "every weight stayed locked to the 100 g ghost" and "The longer string drifted out of step". A learner who moved sliders in the walkthrough's order saw the opposite (a heavy and longer pendulum drifting). The static numbers YOURS 2.02 s / GHOST 2.02 s do say the same, but they are a calculation I did not watch happen. The line "four times the length doubles the period, from about 1 s at 0.25 m to about 2 s at 1 m" is a formula-result quoted; the slider does show 1.01 s at 0.25 m in my run, but the learner has to find that.

**Smaller problems.**
- The timer text "t = 0.5 s" and the bob label ("1 kg" or "300 g") sit very close to the bob and shrink at the narrow phone view; in the reveal screenshot the whole drawing shrinks and the labels become unreadable (the reveal view is smaller than the explore view).
- "Not quite" is the reveal wording for both wrong answers; fine. A correct-answer learner (I picked "the same time") would see a different heading but the same walkthrough path.
- Units: "1.0 kg" vs "1 kg" vs "2 kg" and "300 g" differ between slider and bob label.

### Findings (problems)
1. FATAL: The reveal can be reached without seeing the key thing. "Show me why" unlocks as soon as any slider has moved, with the pendulum never released. Moving the weight slider alone (no Release) unlocks it in my run, and the walkthrough did this in its first step. The central observation (a heavy and a light bob at the same length swinging together) is optional.
2. The sliders move together (weight and string), so the only swinging the walkthrough watched was "out of step", from a changed string; a learner can reasonably conclude from what they saw that the heavier one swung differently. The lesson's one-variable-at-a-time instruction is just text.
3. The reason mass cancels ("20 times harder to pull, 20 times harder to speed up") is told with no picture or interaction behind it.
4. The ghost bob is hidden behind the real one when they agree; "still in step" is only legible through the caption.
5. Reveal numbers (1 s at 0.25 m, 2 s at 1 m) are stated, not something the learner is led to read off the YOURS tile.
6. Small: label formatting and small bob labels on phone.

## 2. After reading the brief

- Intended misconception: heavier means slower (or faster); mass sets the rhythm. The prediction targets it well and my experience of the prediction matches.
- Objective: explain that period depends on length, not mass, because extra weight pulls harder but is equally harder to accelerate, and that four times the length doubles the period. The lesson asks the learner to discover two things (mass irrelevant, length relevant) with two sliders; the design leans on the learner varying one at a time, and nothing guides that. That is the root of findings 1 and 2.
- The brief's boundary ("knows what a pendulum is, gravity pulls down; does not know F = m a") matches mine. The "pulls harder / harder to speed up" explanation in the reveal is the intended mechanism and it is only told, which fits finding 3. It uses no equations, which is right for the boundary.
- The simulation is described as a 20 degree release of the full equation, so the 2.02 s on screen is from a real integration, not a canned label; that is good, but invisible to a learner, so it adds nothing to the felt experience.
- Several claims have been marked verified by the fact-checker since I read the walkthrough (the trust sheet in the artifact showed all unverified). The fact-check does not address the unlocking behaviour; a true claim in the reveal can still be unearned by what was shown.

Verdict: fatal
