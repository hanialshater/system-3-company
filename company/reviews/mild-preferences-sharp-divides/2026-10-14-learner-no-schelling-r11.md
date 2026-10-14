# Learner review r11 (re-walk): mild-preferences-sharp-divides

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v4
boundary: knows percentages and "neighbours"; has never seen an agent-based model, Schelling, or a threshold rule
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-no-schelling-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v4 (10:41) added the running unsettled total to the stage and the reveal after that walkthrough and after the review was committed (10:31). The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. The locked grid is visibly mixed, "Like neighbours 50%", end "?".

**Prediction feel.** "About 30%" is the tempting literal reading of the rule; "50%, no change" is the other naive answer. Both are real traps.

**Where understanding first broke.** It did not. One Step shows red rings (54 unsettled) and the like-share jumping to 60%; Run settles at 77% at tick 13 with "165 so far". The new top line "0 unsettled now, 165 so far" makes the cascade countable.

**Told vs shown.** Shown: the grid visibly clumps, the line chart records 10% → 52%, 30% → 77%, 50% → 87%, 70% → 98%. "Each move changed someone else's street" is backed by the on-stage count.

**Reveal quotes reached states?** Yes: the 30% run (77%, tick 13, 165) and the other thresholds tapped.

**Answered the learner's question?** Yes: "how can mild people make a sharp divide?" is answered by the cascade count.

**Findings (not blockers).**
1. The reveal says "The red rings show the rest", but at the settled state there are no rings; the learner saw them only on the first Step. Minor.
2. The duration chip says 75s, longer than the 60s format. Not my lane; noting for the editor.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (content-as-minority households still sort the grid, about 50% to 75%, because each move changes others' streets) matches: 77% here, and the v4 running unsettled total makes the "because" countable, which was the earlier final review's gap.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
