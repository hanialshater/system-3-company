*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): margin-before-cut
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The finished face is narrower than the blank when two side folds consume material. Adding one allowance at each edge gives the required blank width in this ideal paper model.)
Screenshots seen: yes (artifacts/walkthroughs/margin-before-cut/sheet.png, recorded 2026-10-15T21:36:19.443Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Finished width" (wrong); tapped "Include two folds"; slid Face width 20 to 22 cm; opened reveal.

1. **Where understanding first broke: which layout am I looking at?** The tapped layout button does not look selected: after I tapped the second layout, the stage highlighted the first one (white, bold) and greyed the one I chose, so I was not sure which layout the readout described. On the predict frame the "Blank width ?" readout is cut off at the bottom of the stage.
2. **What the prediction felt like.** Given away. "Which blank includes the two shown fold allowances?" with options "Finished width" and "Include two folds": the right option repeats the question's words. "Same outcome" is not a believable choice.
3. **I never saw my own choice's number.** The walk showed the folds layout (24 cm, 26 cm) but never the finished-width blank (20 cm) next to it, so the 4 cm shortfall that would have surprised me is never on screen. The ruler and strip are clear, but the fold marks are tiny.
4. **Whether the reveal answered my question.** "Adding one allowance at each edge gives the required blank width" is the rule. "The current include two folds setting gives 26cm" is robotic.

Verdict reason: the right option echoes the question, the selected-layout styling points at the wrong button, and the learner never sees the finished-width blank fall short; ask "how wide must you cut the blank for a 20 cm face with 2 cm folds?" and show both blanks.

## After reading the brief (meta.json)

- The meta.json learner.doesNotKnow field holds the reveal paragraph rather than a knowledge gap, so the boundary is under-specified (category manager). I used the boundary "everyday objects have sizes, positions and amounts".
- The selected-state styling (tapped layout shown unselected) recurs across this layout template (lids-match-by-size, margin-before-cut, measure-diagonal-for-square, measure-inside-not-outside, mug-handle-packing, nested-box-retrieval): likely one kit or template fix; worth a QA check.
- Fix route: demo-builder (prediction wording; show both blanks).
