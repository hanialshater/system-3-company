# Learner review: A new road, a slower trip (boundary: division-only)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:53Z (phone, option 1 = "About 40 min", wrong pick, so "Not quite"; path After, Switch 1,000, Run), sheet.png seen (all 5 frames), Demo.tsx read for the branches the script does not show (the "At 2,000" line, furthest-state quoting).

Boundary used (the lesson's own): knows a road's trip time grows with traffic, and simple division. Has never seen that a free road can raise everyone's trip time, or the idea of an equilibrium where nobody gains by switching.

## Findings (artifact only)

1. **Answer visible before predicting.** The title is "A new road, a slower trip" and the hook is "What could it possibly make worse?". The three options are 40, 65 and 80, and only 80 is worse than today's 65. I could pick 80 from the title alone. My simulated pick of 40 came from doing the arithmetic on the new route (20 + 0 + 20), which the stage shows, so the predict is a trap only for someone who ignores the title.
2. **Where it first asks for something I lack: why the answer is 80.** The stage shows after the link opens: new route 40 against old 65, so everyone moves. Up to there I can follow. Then at 4,000 the pills read 40, 40 and the readouts 80 and 85. The reason (both busy roads, S to A and B to E, now carry all 4,000 cars, so each costs 40) is only in the picture, as two pill labels, and not in the reveal. The reveal names "Braess's paradox" and says each driver lost 15 minutes, but not why the number went up.
3. **"Old route 85" is a hypothetical I was never told about.** At 4,000 on the new route nobody is on the old route. The readout "Old route 85" is what one switcher would face. The reveal says "switching back would take 85" (good), but the readout label alone reads as a route someone is on. In frame 03 "Old route 70" with 1,000 on the new route reads the same way. A learner sees the two shared roads' pills change (25, 25) and has to work out that the old route also uses B to E.
4. **Shown: the equilibrium.** Run stops when the new route is no longer faster (80 versus 85), and the readout marks which is faster with a small triangle. That is a clean view of "nobody gains by switching" without the term. The reveal says it in plain words.
5. **"Switch 1,000" is vague.** Who switches, and from where? The code moves 1,000 drivers, 500 from each old route, but the card does not say. I understood it as "send more drivers onto the new route" from the readouts.
6. **Before and After are easy to compare:** frame 01 and frame 02 differ in one control; Before is disabled once the reveal is shown, so the comparison number (65) is in the reveal text only.
7. **Reveal quotes only states reached.** 40 versus 65, 80 and 85, "every one of them lost 15 minutes" (80 minus 65): all match frames 02-04. The "At 2,000 it was still faster" line appears only if the learner stopped at 2,000 (code), which I did not.
8. **Caveat present:** "A new road does not slow every network, but it can." Visible.
9. **No dead control seen;** Switch and Run grey out at 4,000, which is clear.

Confidence: moderate. Findings 1 and 2 are the ones I would stand on.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: the title and hook plus a single "worse" option give the answer away before the learner predicts, and the reveal names the paradox without saying why the number rose (both busy roads now carry all 4,000 cars).

## After reading the brief

Read meta.json objective and misconception, and build.md, only after the findings above were written.

- The objective covers "every driver on it, every trip slower, switching back slower still (85)", all in the reveal. It does not ask the learner to explain why the busy roads cost 40 each, so finding 2 is a gap in the objective as well as in the reveal.
- The build note says the hero and the reveal's before/after pair were not built, and that the graph renders at about 230 px with pills at about 9 px at predict. That is the stage I saw; the pill numbers are the only place the mechanism appears, and they are smallest where the learner is predicting.
- Finding 1 (title and hook telegraph "worse") is not mentioned in the build note or objective.

Verdict unchanged: revise.
