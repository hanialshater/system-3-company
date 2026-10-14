*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): noise-draws-dunning-kruger
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows the popular claim that the least skilled are the most overconfident; does not know that self-estimates with no link to skill at all already produce the famous chart, so the chart alone can't prove the effect)
Screenshots seen: yes (artifacts/walkthroughs/noise-draws-dunning-kruger/sheet.png, recorded 2026-10-14T18:57)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "About the 12th percentile, like their scores"; tapped Run, track 0.3, track 1, +15; opened reveal.

1. **The prediction is half a trap.** The question says the guesses are "pure random noise, unrelated to their scores", so a careful reader gets "about 50th" by logic alone. The real surprise the lesson wants is not the number but that this flat line *looks like* the famous overconfidence chart. The question asks for the number; the hook asks about the shape.
2. **The chart I saw is clear:** a dashed diagonal of real scores (bottom ¼ at 12.5) and a flat cyan line of guesses near 50. "track 0.3" tilts the cyan line; "track 1" lays it on the diagonal ("lines met"); "+15" lifts it above. The dial from noise to perfect self-knowledge is a good control.
3. **Where I first needed something the stage does not give: the famous chart itself.** My boundary knows the popular claim, not the 1999 graph. The reveal says "Kruger and Dunning's 1999 chart had this shape", but I never see it, so I cannot judge the resemblance that the whole lesson rests on. I have to take "this is the famous pattern" on trust. A faint ghost of the published shape (bottom quarter guessing around the 60th percentile, top quarter around the 75th) behind my noise run would let me see it.
4. **The reveal opens on the wrong picture.** After "+15" with track 1, the stage shows the tracked-and-shifted lines (bottom guess 28). The reveal's lead ("the bottom quarter still guessed the 49th percentile ... the famous pattern") refers to the noise run, which is now only the small trace text. The picture on screen when I read "the famous pattern" is not the pattern.
5. "A better-than-average shift lifts every guess, so the bottom looks even more overconfident" is right but on stage it is shown only with track 1, where it makes the bottom look modestly overconfident and the top too. A noise + shift run would be the one that matches the published chart.
6. "Where it stops" is balanced and honest (artefact vs smaller real effect). Trust link "0/5 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Show the published shape as a ghost line so the comparison is on the stage.
- When the reveal opens, show the noise run (track 0), ideally with the shift, since that is what the reveal describes.
- Optional: ask the question about the shape ("which chart do you get?") rather than a number the wording gives away.

Verdict reason: the lesson's claim is a resemblance to a chart the learner never sees, and the reveal describes a run that is not on screen.

## After reading the brief (meta.json)

- doesNotKnow item 1 ("already produce the famous chart") depends on finding 3: without the famous chart on stage, "produce" is asserted. Item 2 ("chart alone can't prove the effect") is stated well in "Where it stops".
- Fix route: demo-builder; the published values for a ghost line would need a claim and the fact-checker.
