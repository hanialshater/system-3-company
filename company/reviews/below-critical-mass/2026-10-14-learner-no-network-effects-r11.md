# Learner review r11 (re-walk): below-critical-mass

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v4
boundary: knows a product is worth buying if value exceeds price; has never met network effects or a tipping point (same as the earlier final review)
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-no-network-effects-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v4 (10:26) changed the reveal text after that walkthrough; the final review said itself that "the transcript's reveal text is stale" and judged the code, not the screen. The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. The chart is hidden until you answer ("The chart appears after you answer"), and the four options are balanced.

**Prediction feel.** "18% holds at 18%" is a natural guess for someone who thinks a product just keeps whoever bought it. Good trap.

**Where understanding first broke.** It did not, on the main path. 18% gives 18 → 11 → 0 and 19% gives 19 → 16 → 0, while 21% climbs to 80% in 8 rounds; the cobweb steps on the chart go down-left below the ringed 20% crossing and up-right above it.

**Told vs shown.** Shown: the chart labels "20%: round changes nothing", "shrinks" and "shaded green: grows" sit on the curve, and 19 against 21 lands on opposite sides. "Why 80% not 100%" is told, but the curve visibly meets the dashed line again near 80%.

**Reveal quotes reached states?** Yes: the 19% and 21% runs, both done. The v4 text ("Above 80% it dips below again, so the share falls back to 80%") is now what the screen shows.

**Answered the learner's question?** Yes: "why does the same product die at 19% and win at 21%?"

**Findings (not blockers).**
1. On phone the reveal frame is scrolled past the chart: only the slider, Step and To the end are in view, while the reveal talks about "the ringed crossing" and the curve. The learner must scroll up. Kit reveal layout; route to demo-builder/design.
2. 18% → 11% → 0% in two rounds feels abrupt; the cobweb makes it visible but a learner may want one more intermediate step.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (below critical mass shrinks to nothing, above it grows to a large stable share) matches. The earlier final review flagged a stale transcript and a 9/11 trust line; both are resolved in this walk (v4 reveal text on screen, 11/11 checked).

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
