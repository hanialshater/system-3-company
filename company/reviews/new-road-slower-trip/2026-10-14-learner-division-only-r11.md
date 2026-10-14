# Learner review r11 (re-walk): new-road-slower-trip

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v3
boundary: can divide and add; believes a new road cannot hurt; never heard of Braess or equilibrium
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-division-only-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). The lesson's own learner-visible files have not changed since v3 (10:07), only claim statuses in meta.json, which change the trust line. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. Hook and title are neutral; the locked stage shows only the before state (65, new route "?").

**Prediction feel.** The 40-minute trap works: 20 + 0 + 20 = 40 is the obvious reading of the empty link, and I took it.

**Where understanding first broke.** It did not break. After opens at 40 vs 65; Switch 1,000 shows 50 on the new route vs 70 on the old ones, so I can see why more drivers keep moving; Run ends at 80 with Switch back 85. Every step is a sum I can check with the "cars ÷ 100" rule in the legend.

**Told vs shown.** The cause (each driver's switch loads both busy roads) is on stage: the 20/25/40 labels on both solid roads climb together. "Every one of them lost 15 minutes" is 80 vs the Before link 65 tile, both visible.

**Reveal quotes reached states?** Yes: 40, 65, 80, 85, all seen.

**Answered the learner's question?** Yes: "why would anyone take a road that makes things worse?" is answered by "switching back would take 85".

**Findings (not blockers).**
1. Phone reveal frame clips the top of the diagram (A is cut at the card edge); the numbers the reveal quotes stay visible. Kit layout, demo-builder/design.
2. "Switch back: one driver leaving the new route" is a dense line; I read it twice. It works once Run shows 85 > 80.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (explain 65 to 80, why both busy roads carry 4,000, and that nobody can fix it alone) matches what the artifact delivers; "Switching back would take 85, so nobody leaves" covers the equilibrium half. The earlier final review (launch) still agrees with this walk; no new finding beyond the reveal-frame crop.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
