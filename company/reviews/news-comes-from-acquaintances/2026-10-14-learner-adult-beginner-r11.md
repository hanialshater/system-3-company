# Learner review r11 (re-walk): news-comes-from-acquaintances

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v3
boundary: knows people have friends and what a tie is; has heard "weak ties are good for jobs" as a slogan, not the rule
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-adult-beginner-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). The lesson's own learner-visible files have not changed since v3 (09:48-09:50), only meta.json evidence links. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** Weakly. The hook ("News from another friend group has one way in. What kind of tie is it?") and the slogan this learner already knows both point at "acquaintance", and it is the first option. A learner can be right from the slogan without the rule.

**Prediction feel.** Easy for this boundary; the work is in seeing why the rule forces it.

**Where understanding first broke.** At step 1: after locking, A–B shows as close without my having set it, and the first check says "C–E tie ✓, but no B–C tie ✗". It took a moment to see that the ✗ is about A–B being close. Once I switched A–B to acquaintance ("the rule holds everywhere"), it clicked.

**Told vs shown.** Shown: the broken triangle (red dotted B–C) and the fix. "The same break hits D and E, and on B's side F, G and H" is told, not checked on stage, but follows by symmetry. Send news shows H's news crossing A–B.

**Reveal quotes reached states?** Yes: the broken triangle, the switch, the news.

**Answered the learner's question?** Yes: why the bridge must be weak, not only that weak ties carry news.

**Findings (not blockers).**
1. The default "close" state of A–B after locking is not announced; one line ("A–B starts close") would remove the stall at step 1.
2. Trust line reads 4/5 claims checked: one claim is not verified. Fact-checker's gate, not mine; noting it because a learner sees it.
3. Phone reveal frame clips the top nodes (C, F); readable.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (strong triadic closure forces the only bridge to be an acquaintance; news crosses it) matches. Correction to finding 2 after reading meta: the 4/5 count comes from claim c5 being withdrawn but still counted in the denominator, not an unverified claim. That is a trust-line counting issue for the kit owner, not this lesson.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
