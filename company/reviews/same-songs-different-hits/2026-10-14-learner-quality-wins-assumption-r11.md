# Learner review r11 (re-walk): same-songs-different-hits

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v3
boundary: knows some songs are better liked than others and can read percentages and ranks (1st of 8); has never seen rich-get-richer / preferential attachment (same as the earlier final review)
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-quality-wins-assumption-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). 0b7277e (10:43) changed Demo.tsx (gated early 100-listener checkpoint, reveal compares early and final rank) after that walkthrough and after the review was committed (10:30). The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. The 8 worlds are empty with "?" ranks.

**Prediction feel.** "2nd of 8" is exactly the quality-wins guess; 7th is a genuine surprise.

**Where understanding first broke.** It did not. +100 listeners already shows world 3's best song at 7th; All 1,000 keeps it 7th; copying off gives 1st or 2nd everywhere with flat bars. The "Best song finishes: on 1st–7th · off 1st–2nd" line summarises it.

**Told vs shown.** Shown: tall bars with copying on vs flat bars off; the early checkpoint shows the rank was fixed by 100 listeners ("900 more listeners did not move it"). "Early luck compounds" is still told, but the early-vs-final comparison is now on screen, which was the earlier review's main gap.

**Reveal quotes reached states?** Yes: 100 and 1,000 listeners, copying on and off.

**Answered the learner's question?** Yes, and it pre-empts the follow-up "so quality doesn't matter?" with "4 of 8 worlds either way".

**Findings (not blockers).**
1. The answer depends on this one seed; a learner might ask whether 7th is typical. The reveal says "toy model", which is honest.
2. Duration chip says 70s. Editor's lane.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (early luck compounds; different hits per world, best song can finish near the bottom; without copying stable and close to quality) matches. The earlier final review called it "close to revise on the told-only compounding"; the gated 100-listener checkpoint now shows the compounding (7th at 100, still 7th at 1,000), so that concern is addressed.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
