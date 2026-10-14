# Learner review r11 (re-walk): contact-order-matters

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v4
boundary: reads 'who met whom' diagrams and assumes anyone connected can pass infection on; has never thought about when contacts happen (same as the earlier final review)
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-static-diagram-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v4 (10:26) changed the learner-visible footer line in Demo.tsx after that walkthrough. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. The locked stage shows the contacts undated with "?" and "Reached ?".

**Prediction feel.** For a static-diagram reader "4" is the natural answer; the correct "1" is listed first, which a guessing learner could hit by chance, but the reasoning still has to come from the stage.

**Where understanding first broke.** It did not. E to A on day 4 reaches 1 of 4 (only B); A to E reaches 4 of 4; the "infected stretch" bars show infection moving forward in time only. Overlap and "tap E" both reach 4 of 4.

**Told vs shown.** Shown: the timeline puts each meeting on a day, so "A met B only on day 4, after the others were over" is visible. Overlap is correctly framed as a different change, not another order.

**Reveal quotes reached states?** Yes: E-to-A and A-to-E at day 4, Overlap from E. The reveal pins the stage back to E to A (Reached 1 of 4).

**Answered the learner's question?** Yes: "how can a connected chain not spread it?"

**Findings (not blockers).**
1. Phone reveal frame clips the top of the timeline (A and B rows above the fold); "Reached 1 of 4" stays visible. Kit reveal layout.
2. The v4 footer ("In models of real populations ... Morris and Kretzschmar, 1997") is told only, and correctly hedged.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (forward-only infection; reversed reaches only B, forward all four; overlap opens both directions) matches exactly. v4's footer hedge is on screen.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
