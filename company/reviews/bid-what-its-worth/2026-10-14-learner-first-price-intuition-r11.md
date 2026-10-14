# Learner review r11 (re-walk): bid-what-its-worth

*Simulated learner. This review finds problems and hypotheses; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round r11 (pre-publish re-walk)
lesson version: v3
boundary: has bid in an ordinary auction (you pay what you bid) and wants to pay less than the item is worth
artifacts: fresh walkthrough on the release build at http://localhost:3590 (repo HEAD 1b4165e, build 22:41 UTC), phone, scripted option-1 path. transcript.md read first, then sheet.png; single frames opened where noted. Screenshots seen: yes.
why re-walked: the earlier final review (2026-10-14-learner-first-price-intuition-final.md) judged a walkthrough taken at c9e4df0 (10:08 UTC). v3 (10:41) changed Demo.tsx (locked-stage overprint, gate, pointer to the sweep chart, pinned reveal stage) after that walkthrough and after the review was committed (10:31). The shared lesson shell (src/components/DemoCard.tsx, src/kit/controls.tsx, globals.css) also changed after c9e4df0, so the earlier frames could not stand for what a learner sees now.

## Part 1: findings from the artifact (written before meta.json, earlier reviews and build.md)

**Answer visible before predicting?** No. The locked stage shows "?" bars and the rule. The question "never worse than any other, whatever the others bid" is precise.

**Prediction feel.** $50 is exactly what a first-price bidder picks (shade below value). The trap works.

**Where understanding first broke.** Briefly at the lower chart: "solid: $70 bid · dashed: your $30" is small, and the walkthrough left my bid at $30/$40, so the dashed line was not the $50 I had predicted. The bars above are clear: rival $60 makes $50 lose and $70 win +$10; rival $75 makes $90 win at −$5.

**Told vs shown.** The two halves of the argument (shading loses paying wins; overbidding adds losing wins) are each shown once on the bars, at rival $60 and rival $75. The reveal names both.

**Reveal quotes reached states?** Yes: rival $60 and rival $75, both tapped (the gate requires them). The reveal sets the slider to my $50 so the dashed line matches the text.

**Answered the learner's question?** Yes: "why not shade?" is answered by "your bid only decides whether you win; the price is the rival's bid".

**Findings (not blockers).**
1. Phone reveal frame (07-reveal.png at full size): the stage is scrolled so the profit bars and the sweep chart are above the fold; only the legend line and rival chips are in view, while the reveal says "the dashed $50 line sits under the solid $70 line". The learner has to scroll up to check it. Kit reveal layout; route to demo-builder/design.
2. The reveal silently moves the slider to $50; a learner who slid to $40 may not notice the change. Low cost.

Verdict: launch

## Part 2: after meta.json and the earlier final review

Objective (against a low and a high rival, shading gives up a profitable win and overbidding adds a losing win) is met by the rival $60 and rival $75 gate. v3's locked-stage fix holds (no overprint at predict). The new note is the phone reveal scroll position.

This is a simulated learner's verdict that nothing here blocks launch. It is not evidence that the lesson teaches; only human learners can show that.
