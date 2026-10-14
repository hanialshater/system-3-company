*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): rubber-band-hull
lesson version: v2
boundary: adult beginner who has never programmed; knows left and right turns (meta.json learner field); has not met convex hulls.
Screenshots seen: yes (artifacts/walkthroughs/rubber-band-hull/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "Which pins does the band touch?" The hook ("A rubber band round 10 pins. One walk, left turns kept, right turns dropped, finds it.") names the method before the question. That is jargon-ish for a beginner, but it doesn't leak the count. The question offers 4 / 6 / 10. "4" is the natural "the band touches the corners" belief, and the walkthrough learner chose it. The locked stage shows the 10 pins unnumbered with "On band: ?". A careful learner could count the outer pins by eye, which is fine: it makes the prediction a looking task, and the 4-corners belief still trips people. The locked frame's picture text reads "1 pins on the band", which is odd alt text.
- Explore: the panel says to tap pins 1 to 9 in order. Each tap extends a green band from "start". When the turn is left, the pin gets "↺ keep"; when the turn is right, the previous pin gets a red "↻ drop" and a cross, and the band snaps past it. Pins 3, 4, 5 and 7 are dropped, each one visibly inside the shape. The band closes on 6 pins, shaded. Watching inside pins get crossed out as the band snaps outward is clear and satisfying.
- But: the learner only taps in a prescribed order and never decides anything; the stage makes every keep/drop call. Why the pins are numbered in that order (sorted by angle round the start) is never shown. The numbers just appear once the stage unlocks. Why a right turn means "inside" is not said either, though the picture (a dent in the band) carries it fairly well.
- Reveal: "Your band closed on 6 pins... pins 1 and 6 are none of those [extremes], yet the band turns there. Your walk dropped 4 pins, each at a right turn." All seen. The reveal frame adds ← → ↑ ↓ arrows on the four extreme pins, which is a nice touch. "Sort the pins round the start once" is told; the sort was done for me, invisibly. "Graham's scan, about n log n steps for n pins" is jargon beyond this boundary ("n log n" means nothing to a non-programmer).
- Status chip DRAFT; trust link 0/5 claims checked.

## 2. Earlier findings

There is no earlier learner review for this lesson; this is its first. The folder holds only 2026-10-14-fact-check.md and build.md, and I did not read build.md.

Process note, for honesty: I checked meta.json for the version number and saw its learner field before writing section 1. The field is two lines ("knows left and right turns (shown on the stage as keep and drop)"; "does not know how a program finds the outline... that checking left or right turn... is all the geometry needed"), and it did not change what I wrote above. Against it: the "left/right turn is all the geometry" idea is shown. The "how a program finds the outline" idea is shown except for the sort step (new finding 1).

## 3. New findings

1. Minor: the numbering-by-angle is the algorithm's first step, and it is invisible. A brief sweep animation (a ray from the start rotating, numbering pins as it passes) at unlock would put "sort round the start" on stage.
2. Minor: "about n log n steps for n pins" is beyond the boundary. "Fast even for thousands of pins" would say the same thing to this learner.
3. Minor: the learner is passive (tap the next number). One decision, such as "keep or drop?" on one pin before the stage answers, would make the left/right rule something they apply.
4. Minor: the locked-stage alt text "1 pins on the band" is wrong or odd (QA / builder).
5. Routed, not mine: DRAFT status, 0/5 claims checked (fact-checker).
6. No FATAL. The headline (the band touches 6 pins, not just the 4 extremes, and inside pins drop at right turns) comes from the stage.
