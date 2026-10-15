*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): unlock-the-following-work
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Identify the work that releases a blocked successor.)
Screenshots seen: yes (artifacts/walkthroughs/unlock-the-following-work/sheet.png, recorded 2026-10-15T21:36, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Input task"; tapped Run queue (polish, input, build), Swap first (input, polish, build), Try target (input, build, polish); opened reveal.

1. **Where understanding first broke: the stage's own numbers favour the wrong order.** Run queue gives Wait 35m; Swap first (input, polish, build) gives Wait 25m; the target order (input, build, polish) gives Wait 30m. Late is 0 and Prereq is 0 in all three. So by every number on screen, doing the unrelated polish before the build is better (or no worse). The reveal then says "Your order input → build → polish gives 30 total waiting minutes" and "Doing unrelated work first delays release". As a beginner I checked: 30 is worse than 25. The lesson's point is right in words and contradicted by its readouts.
2. **The metric does not measure the point.** The point is that the build finishes sooner if it starts sooner. The stage never shows when the build finishes (25 min in the target order, 40 min with polish first). Total waiting across all jobs is a different question, and here it rewards putting short jobs first.
3. **The reveal frame shows "Swap first" highlighted** while the text describes the target order, so I was not sure which order the reveal was about.
4. **The prediction is easy.** "Which goes before the dependent build?" with "Input task" vs "Unrelated polish": the build is labelled "←input", so the answer is on screen.
5. **Labels are compressed.** "15m/60due", "20m/60due←input" and the unexplained "80m" axis need decoding.

Fixes (for the builder):
- Report when the build is released (finish time of build) for each order; that is the number the reveal talks about.
- Either drop total waiting or explain why it moves the other way.
- Write the labels out ("15 min, due by minute 60; needs input").

Verdict reason: the stage's numbers (Wait 25m for input-polish-build vs 30m for the target order) contradict the reveal's claim, and the build's release time, which is the actual point, is never shown.

## After reading meta.json

- Objective "identify the work that releases a blocked successor" is right, but the readouts measure total waiting, under which the target order loses to input-polish-build (25 vs 30 min). Release time of the build is not displayed. This is a model/metric mismatch, not only wording.
- Fix route: demo-builder (add build release time, rethink the Wait metric); fact-checker to re-check the derivation claim for the displayed results once changed.
