# Learner review: Same contacts, different order (boundary: static-diagram)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:52Z (phone, option 1 = "0", wrong pick, so "Not quite"; path slider to day 2, Day 4, A to E, E to A, Overlap, E as first case), sheet.png seen (all 8 frames), Demo.tsx read for the branches the script does not show (E first with A to E, the onlyD line).

Boundary used (the lesson's own): knows infection spreads along contacts, and a "who is connected to whom" diagram. Has never seen that infection moves only forward in time.

## Findings (artifact only)

1. **Where it first asks for something I lack: the timeline picture itself.** The stage is a dated timeline: five rows, days 0-4, vertical bars. Nothing says "a vertical bar is a meeting on that day", "a hollow dot is a meeting still to come", or "the thick line is an infected stretch". The legend covers first case / infected / healthy only. I worked it out from the slider moving the blue line and the dots filling in (frame 02), but I did it myself.
2. **The prediction is answerable from the text.** The order given (D-E, C-D, B-C, A-B) is the order a learner can simulate: A-B is last, so only B. I did not do that; I picked "0". The path from my pick to the picture was short: at day 4 the stage said "Reached 1 of 4, B" (frame 03), which contradicts my answer on its face. Good confrontation.
3. **Title and hook give the angle away.** "Same contacts, different order" and "Does the order ... change who can catch it?" make "yes, order matters" obvious, so the naive "4" (the static diagram answer) is the option a careful reader eliminates. It still reads fine, but the surprise is carried by the title.
4. **Terms.** "Contacts" means both a meeting between two people ("Four contacts happen") and, in the hook, the people on the line ("Four contacts join A to E"). I read the hook as four people between A and E, then re-read.
5. **The pair of orders is the strongest shown moment.** A to E gives 4 of 4 and E to A gives 1 of 4 with the same four contacts (frames 04 and 05); I could flip back and forth. That is shown, not told, and it is the lesson.
6. **"Tap E" has little affordance.** The hint says "then tap E", and the only cue on the stage is a dashed ring around A and E. I would not have found it without the hint; the walkthrough used the aria name "Make E the first case".
7. **Overlap is a different input.** The Overlap button is "every pair meets each day", so each pair meets four times, not "the same four contacts" in another order. The reveal ("With Overlap, all four were reached from E too") and the muted line ("Overlapping partnerships can spread infection further than the same ones in sequence") treat it as the same kind of change. The citation line says overlapping partnerships, while the stage shows repeated meetings. A learner can come away believing concurrency and repeated contact are the same thing.
8. **Reveal quotes only states reached,** and in my run each one matches a frame (E to A: 1 of 4, A to E: 4 of 4, Overlap from E: 4 of 4). The branch "From E, A to E reached only D" appears only if the learner tried that; I did not see it so I cannot judge it.
9. **Controls.** Slider, Day 4, three order chips, and the first-case buttons all worked. No dead control seen. "Reached 0 of 4" at day 2 in frame 02 is clear.

Confidence: moderate to good on 5 and 7; the rest are minor.

## Verdict for the current version: **launch with notes** (no fatal flaw found; findings 1 and 7 are worth a revise if the owner has time)

Top finding: the Overlap case is a different input (every pair meets each day) presented in the reveal as one more ordering of the same contacts, and the citation line then reads it as concurrency.

## After reading the brief

Read meta.json objective and misconception, and build.md, only after the findings above were written.

- The objective includes "overlapping contacts open paths in both directions", so the Overlap case is intended as the two-way payoff, and the builder's node re-run shows Overlap reaches 4 from A and from E. Finding 7 narrows to this: Overlap is built as every pair meeting on every day, which is repeated contact, and the reveal's citation line reads it as concurrency. That is a content call for the learning designer.
- The build note says the brief's 24-order distribution (1/k!) is not shown, which fits the lesson I saw (three specific orders only).
- The legend omission in finding 1 (rung and hollow dot meaning) is partly addressed by the build note's "future links hollow" change; the legend still does not say it.
- Finding 6 is consistent with the build note's dashed r = 22 ring as the affordance.

Verdict unchanged: launch with notes.
