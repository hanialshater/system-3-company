*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): empty-ponds-still-left
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows less area holds fewer species; does not know that a species living as many small populations needs empty patches to be refilled faster than occupied ones die out, so it is lost before the last good patch goes)
Screenshots seen: yes (artifacts/walkthroughs/empty-ponds-still-left/sheet.png, recorded 2026-10-14T18:54)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "19 or more"; tapped Drain 30, Drain 50, Drain 70, New seed; opened reveal.

1. **The prediction is genuine.** "30 good ponds left, 19 with frogs" makes "19 or more" feel safe. Three well-separated options.
2. **The grid works.** Green frogs, empty circles and crossed-out drained ponds are easy to read, and 70 drained → "gone, year 23" (seed 1) and "gone, year 21" (seed 2) with 30 empty good ponds on screen is a strong picture of "habitat outlasts its species".
3. **Where I first needed something I do not have: the model line.** "an empty pond refills with chance 1 − 0.995ⁿ, n = frog ponds" is formula-speak my boundary cannot read. The plain "refill chance 19% / 14% / 9% a year" under the grid is what I actually use, and it is good. The formula could go to the trust sheet.
4. **The reveal's threshold contradicts what I saw.** "The species is lost once the drained share reaches ... 60% here." But I drained 50 (less than 60%) and the frogs were "gone, year 67" (seed 1) and "gone, year 83" (seed 2). So by my own runs the line is at or below 50%, not 60%. "In the simplest version of this model" is meant to cover this (chance extinctions of a small population), but nothing tells me that, so I either distrust the 60% or distrust my runs.
5. **Seed variation is large and unexplained.** Drain 30 gave 33 ponds on seed 1 and 8 ponds on seed 2. The reveal quotes only the 8. That is honest (it is the current run), but a learner may wonder whether the lesson is noise. One line ("each run is random; small populations can also die by bad luck") would cover both 4 and 5.
6. Reveal fits: year 21, 30 good ponds, 8 ponds are on the stage. Trust link "0/6 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Reconcile the 60% line with the 50-drained extinctions: e.g. "on average the frogs settle at about 10 ponds when 50 are drained; a population that small often dies out by chance".
- Move the refill formula to the trust sheet; keep the % a year line.

Verdict reason: the central picture is right, but the reveal's one number (60%) is contradicted by two runs the learner made, with no explanation.

## After reading the brief (meta.json)

- doesNotKnow ("lost before the last good patch goes") is shown clearly by the 70-drained runs. Finding 4 is about the extra threshold claim in the reveal, which goes beyond the brief and conflicts with the stage.
- Fix route: demo-builder (reveal wording); fact-checker may want to check the threshold claim against the stochastic runs.
