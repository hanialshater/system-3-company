*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: noise-draws-dunning-kruger
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: the popular claim that the least skilled are the most overconfident. Does not know: that self-estimates with no link to skill at all already produce the famous chart; so the chart alone can't prove the effect. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/noise-draws-dunning-kruger/sheet.png, recorded 2026-10-15T10:09:31.781Z, build c0cfd14 served on localhost:3590)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: at the reveal's second paragraph. The panel said "Run the noise, then let guesses track skill, then add the shift", so I added the +15 shift while on track 1 and saw the bottom quarter guess 28. The reveal then says "Add a better-than-average shift and the bottom quarter now guessed the 63rd", and the stage has quietly switched to track 0 + shift. I never made 63. The 28 I did make goes unmentioned.
2. What the prediction felt like: easy once the question says "pure random noise, unrelated to their scores". The average of random percentiles is 50, so the prediction tests arithmetic more than the idea. The real surprise (the shape matches the famous chart) comes in explore.
3. Whether the reveal answered my question: the first and last paragraphs did ("noise drawing the shape doesn't prove there is no effect"). The middle one answered a run I did not do.

Verdict reason: following the panel's own order, the learner adds the shift on track 1 (bottom quarter 28), but the reveal quotes 63 from a track-0 + shift state the learner never set, and changes the stage to it without saying so.

## After reading build.md / meta.json

- r10 finding 4 was that the reveal described a run not on screen. Build v2 answered it by switching the stage to track 0 + shift when the reveal opens. My finding is the other side of that fix: the run is now on screen but was not made by the learner, and the learner's own shifted run (28) goes unmentioned. A one-clause change would settle both, for example "Add the shift to the pure-noise run and...", plus a word about the 28 they saw. This objection is to the fix, and it should travel with the next revision's decision.
- The 1999 ring ("1999 study: 62nd") now puts the famous point on the stage, which answers r10 finding 3.
