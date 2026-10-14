# Learner review r11 (re-walk): web-bow-tie-reach

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v3
boundary: uses the web and knows what clicking a link means; never thought of links as one-way; never heard "bow tie"
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-adult-beginner-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). The lesson's own learner-visible files have not changed since v3 (09:55), only claim statuses in meta.json, which change the trust line. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** Mostly no. The predict stage draws faint arrows; a careful learner could count reach from A, but that is the task, not a leak. The stem says 10 are joined, which sets the trap (10).

**Prediction feel.** 7 vs 10 vs 4 is a real choice; "joined means reachable" pulls to 10.

**Where understanding first broke.** It did not. Tapping A, B, C, D gives 7 each; E gives 10, F 8, G 3, H 2, I 1, J 1, K 2, L 1. The IN/CORE/OUT/TENDRIL/DETACHED labels appear on the stage only after G is tapped, which is the right moment.

**Told vs shown.** Shown: the filled pages from each start make "you can go right but not back left" visible. The Broder (2000) paragraph is told, and fairly labelled a toy, not to scale.

**Reveal quotes reached states?** Yes: A 7, E 10, G 3, all tapped.

**Answered the learner's question?** Yes: "why not 10?" is answered by "joined is not reachable".

**Findings (not blockers).**
1. Phone reveal frame (14-reveal.png, opened at full size) shows the stage scrolled: the top row (F, G and G's dashed OUT ring) is cut off under the card header, while the reveal says "dashed rings mark the first IN and OUT pages you tried". The learner has to scroll up to see the OUT ring. Same kit-level reveal-crop pattern as in other lessons; route to demo-builder/design, not a blocker.
2. The walkthrough taps all 12 pages; a real learner following "middle, far left, far right" taps about 3, which is enough.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (core reaches core and OUT, never IN; OUT reaches almost nowhere) matches. The earlier final review's verdict holds; the reveal-frame crop of the OUT ring is the only new note.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
