# Learner review r11 (re-walk): two-said-blue

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v5
boundary: knows a clue right 2 in 3 beats a coin flip and that more independent clues help; has never heard of information cascades or herding (same as the earlier final review)
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-adult-beginner-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v4 (10:26) and v5 (10:36) changed Demo.tsx and model.ts (accuracy-aware plain-vote figure, reveal instructions matched to the stage view) after that walkthrough. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. The stage is empty ("Make a prediction to start").

**Prediction feel.** "Almost never" is the wisdom-of-crowds guess; "1 time in 5" is plausible to a careful learner. Real choice.

**Where understanding first broke.** At steps 1-3: tapping 60% / 80% / 2 in 3 before any run changes only the "Clues right" tile, so nothing seems to happen. Run 1 then makes it concrete (100 blue). Run 100 gives 17.8% wrong, Run 10,000 gives 19.9%, and the last crowd shown is a wrong one (1 blue of 100).

**Told vs shown.** Shown: Pool the clues turns the same crowd into its clues (62 of 100 blue) next to picks of 1 blue of 100; that contrast is the lesson's cause, on stage. The v5 reveal now tells me to tap Show the crowd to see the ring and the 61 outlined people, which matches the stage's button. The 11.1% two-wrong-starts line is told.

**Reveal quotes reached states?** Yes: 10,101 crowds, 2,009 wrong, pooled 2, crowd 10,101.

**Answered the learner's question?** Yes: the crowd beats one person (19.9% vs 33.3%) but loses badly to a plain vote (0.02%).

**Findings (not blockers).**
1. Phone reveal frame is scrolled past the dot grid to the stat tiles; the reveal says "Look at crowd 10,101 on the stage", so the learner scrolls up. Kit reveal layout.
2. Trust line reads 8/9 claims checked; one claim is not verified. Fact-checker's gate; noting it because a learner sees it.
3. The accuracy chips do nothing visible before a run; a learner may think they are broken.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (wrong about 1 time in 5; after a lead of 2 no clue changes the pick; plain vote wrong about 1 in 5,000) matches: 19.9%, 0.02%. v5 fixed the earlier final review's reveal-instruction mismatch (the reveal now names Show the crowd, which is the stage's button). Correction to finding 2 after reading meta: 8/9 comes from claim c8 being withdrawn but counted, not an unverified claim; kit trust-line counting issue.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
