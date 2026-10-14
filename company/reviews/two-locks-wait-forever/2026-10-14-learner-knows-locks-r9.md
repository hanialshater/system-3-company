*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): two-locks-wait-forever
lesson version: v1
boundary: knows-locks (from meta.json learner: knows two tasks can interleave and clash on shared data, and that a lock makes others wait; does not know that locks themselves can freeze two tasks for ever when each holds what the other needs, or that one agreed lock order prevents it)
Screenshots seen: yes (artifacts/walkthroughs/two-locks-wait-forever/sheet.png and 08-reveal.png, recorded 2026-10-14T15:14)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "No, one always finishes"; tapped "Step P", "Step Q" (jam); "Reset"; "P all, then Q"; "Q takes A first" (on); "Take turns"; opened reveal.

1. **The prediction is genuine for this mind.** "A lock makes others wait" naturally leads to "someone gets through". The options "some orders" / "every order" are the same shape. The locked stage shows the two step lists and two free locks, no arrows.
2. **The payoff is shown.** Two taps (Step P, Step Q) produce "Both wait: each holds the lock the other needs", red nodes, ⏳ on each worker's step 2, dashed red "waits for" arrows and the label "waiting in a circle". That picture is the idea. After the toggle, "Same order: Q waited for A, both finished" shows the cure in one run.
3. **At the reveal the circle drawing is gone.** The reveal says "Each waited for the other, a circle", but the stage at reveal shows the finished same-order run, and only the text line "Jam: P holds A, Q holds B." survives. The readout keeps the quoted state, so this passes the rule, but the picture that taught me is not what I see when the reveal names it.
4. **The "Jam:" line reads as current state.** After Reset (04-step-3) and in every later frame, "Jam: P holds A, Q holds B." sits under two locks marked "free". Other lessons label this "Seen:". Here I briefly thought the reset had not worked.
5. **"Both finished; Q had to wait" after "P all, then Q".** In that run Q never tried a lock while P held it: P took A and B and released them, then Q ran. From my side Q waited only in the sense of "had not started". This status string reads as if Q was blocked. It is worth checking with the fact-checker whether it is a stage claim. (The same string is right for the same-order "Take turns" run.)
6. "One agreed order prevents it" is shown for one interleaving (Take turns). "No circle could form" for every order is told. The argument in the reveal ("whoever got A could always get B") is enough for me.
7. Copy: "1 steps run." (02-step-1).
8. **The reveal fits with its picture.** In 08-reveal the stage caption, both workers' lists, the Jam and Same-order lines and the last reveal line are on screen. 73 words.
9. The trust link reads "0/5 claims checked" (fact-checker's lane; the gate also shows no learner review until this one).

Verdict reason: the deadlock and its cure are staged and quoted from my run. The issues are labelling and one ambiguous status line, not the teaching.
