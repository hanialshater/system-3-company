# Final learner review: contact-order-matters

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · FINAL pre-publish
boundary: reads 'who met whom' diagrams and assumes anyone connected can pass infection on; has never thought about when contacts happen
artifacts: walkthrough regenerated at c9e4df0d (phone, option 0 path); sheet.png and single frames seen: yes. Demo.tsx reveal branches read (reveal text is current).
Kit note (not charged to the lesson): on phone the reveal frame crops/scales the stage.

## Part 1: findings from the artifact (before meta.json, earlier reviews, build.md)

**Idea the learner lacks:** infection only moves forward in time, so the order of the same four contacts changes who can be reached.

**Answer visible before predicting.** No. Title "Who can catch it, and when?" hints at time but not the count. The stem lists the contacts and the order and says "(meetings run E to A)", which also defines the A-to-E / E-to-A chips. The locked stage states the rule ("whenever one side was infected on an earlier day") and shows the undated diagram with a "?". A static-diagram learner will say 4; I said 1, the right answer, from the rule. The rule line makes the trap weaker than it could be but does not give the number.

**Prediction feel.** Traceable if read carefully: D-E first, E not infected, so nothing happens until A-B last. Needs the stage to confirm.

**Where understanding first broke.** The stage has a slider, a Day 4 button, three order chips, a day axis, bars, and a six-item legend. Decoding takes the first seconds. "tap E" is a hidden control; the script found it only because it was told to. Stepping E to A (1 of 4) then A to E (4 of 4) on the same four contacts is the lesson and lands clearly.

**Reveal frame.** Fixed from the earlier round: the reveal opens on A first, E to A, day 4, reached 1 of 4, matching the first paragraph. A and B rows are visible in the single frame (08-reveal.png), though the stage is scaled small (kit issue).

**Told vs shown.** "Infection only moves forward in time" is shown by the infected stretch and the day line. "A diagram of who met whom can overstate who can be reached" is shown by the learner's own comparison. Overlap is a second idea: the reveal says it is a different change, and the claim "from E all four were reached" is quoted only after the gate required that state (first case E in Overlap). The paragraph on A to E from E (only D) appears only if visited.

**Reveal quotes only reached states?** Yes, gated by three milestones.

**Verdict: launch with notes.**

**Top remaining finding:** two ideas share one stage. Overlap (every pair meets every day, "infection can run both ways") is a second contrast, and the closing sentence calls it concurrency, which is a stretch of what the cited paper means by overlapping partnerships; the card's one idea is order. Route: learning-designer. Minor: the six-item legend and the "tap E" affordance are heavy.

## Part 2: after meta.json, the earlier reviews and build.md

- meta doesNotKnow is the time ordering only; the objective adds the overlap clause, so the second idea is in the brief.
- Earlier findings: reveal frame pinned to Overlap contradicting paragraph one (fixed); order chip notation undefined (fixed by the "(meetings run E to A)" gloss in the stem and the "Meetings run" label); overlap framed as another order (improved, now labelled "a different change"); "tap E" affordance (unchanged); concurrency wording (hedged with "In real populations" and "Real contacts are not certain to pass it on").
