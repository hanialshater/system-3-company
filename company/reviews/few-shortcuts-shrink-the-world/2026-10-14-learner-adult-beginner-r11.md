# Learner review r11 (re-walk): few-shortcuts-shrink-the-world

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v5
boundary: knows people can be linked and a step is one link; no network science (same as the earlier final review)
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-adult-beginner-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v5 (10:36) changed Demo.tsx and styles (route people drawn as dots so steps can be counted) after that walkthrough. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. The ring shows the 24-step A-to-B route; nothing hints at the 5-shortcut average.

**Prediction feel.** "12 steps" (a few links barely matter) is the natural trap and I took it.

**Where understanding first broke.** It did not. 1 shortcut: route 9, average 10.3; 5: route 5, average 6.8; 20: route 4, average 4.9. The v5 route dots let me count the steps on the thick line.

**Told vs shown.** The main effect is shown. The clustering sentence (0.500 to 0.435, random network near 0.04) is told only and adds a second idea at the end; it is defined in plain words, so it does not confuse, but nothing on stage shows it.

**Reveal quotes reached states?** Yes: 5 and 20 shortcuts, both pressed.

**Answered the learner's question?** Yes: "how can five links matter in a hundred people?"

**Findings (not blockers).**
1. On phone at predict the readout tiles ("24 steps", "12.9") are clipped at the bottom of the stage; the question repeats 12.9, so no information is lost.
2. Clustering is told, not shown; fine as a coda.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (12.9 to 6.8 with 5 links, 4.9 with 20) matches; clustering is not in the objective (dropped in v4), so the reveal's clustering sentence is extra, not a gap. v5 route dots make the 24 / 5 / 4 step counts checkable.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
