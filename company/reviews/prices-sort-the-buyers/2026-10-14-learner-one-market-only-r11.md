# Learner review r11 (re-walk): prices-sort-the-buyers

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v3
boundary: understands one market with one price; has never matched several people to different items
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-one-market-only-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v3 (10:41) changed the predict text (defines total value) and the Compare chips after that walkthrough and after the review was committed (10:31). The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** Partly. The correct option ("the highest total value") is the first and also the most natural guess, so many learners will be right for the wrong reason. The grid does not show which match prices produce.

**Prediction feel.** The new definition ("adds up what its three buyers value their houses, the first number in each square") makes the question answerable. Still a soft prediction: a learner has little reason to expect "middling".

**Where understanding first broke.** At round 3, "Raised a and b together; 3 buyers wanted only a or b" needed a second read; the dashed group around a and b helps. Then x–a, y–c, z–b with total 23 is clear.

**Told vs shown.** Shown: the "value − price" cells update each raise, the black cells mark who gets what, and Compare lists all six matches with 23 the highest. "z ends on b although it values a at 7" is checkable on the grid.

**Reveal quotes reached states?** Yes: the three raises (one by Raise, two inside Run) and the Compare chips.

**Answered the learner's question?** Yes: "nobody assigned houses, so how did it end up best?"

**Findings (not blockers).**
1. Run hides raises 2 and 3, which the reveal then narrates ("a went $1, $2, $3"); a learner who pressed Run once did not see $2. Low cost.
2. The prediction is easy to get right by guessing; the surprise is weaker than in sibling lessons. Not a blocker.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (prices raised only on over-wanted houses stop where each buyer takes a different favourite, and that match has the highest total) matches. v3's definition of total value and the decoded Compare chips ("xa = x gets a") fix the earlier final review's legibility notes. Remaining weakness: the correct option is also the easy guess.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
