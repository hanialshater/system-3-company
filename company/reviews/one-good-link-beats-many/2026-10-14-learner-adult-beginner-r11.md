# Learner review r11 (re-walk): one-good-link-beats-many

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v5
boundary: has used search engines; knows a page can have links pointing at it; no PageRank, no damping
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-adult-beginner-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v4 (10:26) and v5 (10:44) changed Demo.tsx (round-51 wording, Run reaches round 51, reveal quotes reached rounds) after that walkthrough; the final review read the then-current reveal text from code, not from the v5 screen. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. At round 0 X and Y are drawn the same size, both 0.100. X visibly has three arrows in, Y one.

**Prediction feel.** "X, with 3 links in" is the honest naive guess, and Step 1 rewards it (X 0.270 vs 0.100, the panel says "X leads so far"), which sets up the surprise well.

**Where understanding first broke.** Briefly at "every page also gets 1.5% free, links or not": I did not know why that rule exists, but I did not need it to follow the run.

**Told vs shown.** The cause is on stage: at round 51 the arrows into X are labelled 0.013 each and the thick arrow H to Y 0.359. I can see that H has five arrows in (A, B, C, D, Y). The reveal points at exactly these numbers.

**Reveal quotes reached states?** Yes: round 1 (0.270/0.100) and round 51 (0.053/0.374), both reached.

**Answered the learner's question?** Yes: "how can one link beat three?" is answered by who the linkers are.

**Findings (not blockers).**
1. P, Q, R have no arrows in, but nothing on stage says "nobody links to these" until the reveal; a learner may not notice before reading it.
2. The 85% / 1.5% rule is stated, not explored. Fine for 60 seconds.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (a link passes on a share of the linker's score; one link from Y's well-linked H beats three from nobody-linked pages) matches the stage and reveal. v5's Run to round 51 means the reveal now quotes only rounds the learner reached, which closes the earlier final review's note. No claim in meta is open.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
