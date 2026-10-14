*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): quarters-add-to-a-third
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows 1/2 + 1/4 + 1/8 + ... gets ever closer to 1; does not know that 1/4 + 1/16 + 1/64 + ... approaches 1/3, or that a picture with three equal patterns proves it)
Screenshots seen: yes (artifacts/walkthroughs/quarters-add-to-a-third/sheet.png, recorded 2026-10-14T18:51)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "1/2"; tapped "Step", "To level 6", "Reset to level 1"; opened reveal.

1. **The prediction is genuine.** With the halves series in my head, 1/2 ("halve it again") or 3/8 both feel plausible; 1/3 looks odd because no third appears anywhere in the sum. Good options.
2. **The level-6 picture is the payoff and it is good.** 03-step-2 shows the nested corner with blue, dotted and hatched pieces and "solid, hatched, dotted 0.3333 each". I can see the three patterns match at each level.
3. **Where the idea I lack first appears: why there are hatched and dotted pieces at all.** The question is only about the solid (blue) total. At level 1 the stage silently paints two other quarters with patterns. Nothing says "these are the same size as the solid one; we are using them to count". The proof rests on that move, and it is the idea I do not have. I worked it out from the reveal's second sentence, after the fact.
4. **The reveal's picture is the wrong one.** At reveal (05-reveal) the stage shows level 1, "solid: 0.2500 of the square", because I pressed "Reset to level 1". The reveal says "By level 6 the solid pieces covered 0.3333" and "the leftover corner shrank toward nothing", but the leftover on screen is a full quarter. Only the small "Level 6: ... 0.3333 each" line backs it. The level-1 picture does show "three matching, one left over", so half the argument is visible; the "shrinks toward nothing" half is not.
5. "Left over: 0.2500" appears at level 1 but not at level 6, where it would be the strongest number (about 0.0002). The leftover's shrinking is the step that turns "three equal" into "each is 1/3".
6. "Reset to level 1" is an odd control: it is not a reset to the start (level 0), and its name hides that it undoes the payoff.
7. Trust link reads "0/3 claims checked" (fact-checker's lane).

Verdict reason: the proof's key step (the leftover vanishing) is not on the stage when the reveal names it, and the counting move (finding 3) is never said before the reveal. Not blocking: nothing is false and the controls work.

Fixes (hypotheses for the builder, not tested):
- Put level 6 back on the stage when the reveal opens, whatever the learner last pressed.
- Show "Left over: 0.0002" at level 6 next to the three 0.3333s.
- One line at level 1: "Hatched and dotted are the same size as solid: we will compare them."

## After reading build.md (Pre-flight v1)

- The builder chose "Reset to level 1" so the reveal still shows three matching patterns, and counts the level-6 trace line as the evidence for 0.3333. That covers "three patterns always matched". It does not cover "the leftover corner shrank toward nothing", which is the step a halves-series learner needs to get from "three equal" to "each is a third". Finding 4 stands; reveal-fit "namedHidden 0" passes because the named number is in the trace line, but the named picture is not.
- Fix route: demo-builder (reveal state / leftover readout), cm-math for the counting-move line.
