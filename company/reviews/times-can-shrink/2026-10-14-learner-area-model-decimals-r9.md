*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): times-can-shrink
lesson version: v1 (meta.json version 1)
boundary: area-model-decimals (the lesson's own: knows multiplication as a rectangle's area (split-the-sum) and decimals as parts of 1; does not know that multiplying by a number below 1 gives a smaller result). First learner review of this lesson.
Screenshots seen: yes (artifacts/walkthroughs/times-can-shrink/sheet.png, release build recorded 2026-10-14T15:24Z, 6 frames; 06-reveal.png opened at full size)
Verdict: launch

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("Above 0.7"), the "times makes bigger" pick my boundary would make.

1. **Where it first asks for an idea I don't have: nowhere before the reveal.** The stage uses only area (which I know) and decimals as parts of 1 (which I know); the gap is the question itself.
2. **No answer before the commit: met.** Options "Above 0.7 / Between 0.6 and 0.7 / Below 0.6", same form. Locked stage: an empty 0.6-wide strip outlined up to height 1, height 0, AREA "?". The presets h = 1.5 / 1 / 0.7 are visible but disabled; h = 0.7 is the question's own case, so it does not point.
3. **Shows the why: met.** At h = 0.7 the shaded 0.42 sits inside the solid 0.6-by-1 strip, visibly a part of it; the dashed 1-by-1 square shows that 0.6 itself is a part of 1. The traces "0.6 × 1.5 = 0.9 / 0.6 × 1 = 0.6 / 0.6 × 0.7 = 0.42" stack beside the picture, so the "only above 1 does it grow" contrast is on screen at once, not remembered.
4. **The reveal shows the payoff: met.** "the shaded area read 0.42" (readout and shaded label on screen), "keeps seven tenths of the 0.6 strip" (the strip outline and the shaded part are both visible), "At height 1 the area stayed 0.6; ... at 1.5, ... 0.9" (both traces on screen). Every number named is on stage at reveal.
5. **Fit and budget: met.** Reveal 62 words; 06-reveal is ~795 CSS px tall, stage top and last line on one 390×844 screen.
6. Minor: the trace for 1.5 is a short dotted stub at height 1.5 labelled with an area (0.9) on the right; a learner may briefly read "0.9" as a height. The labels say "0.6 × 1.5 = 0.9", which resolves it.
7. Minor: "smaller than 0.7" compares an area to a height; numerically fine, and it answers my "Above 0.7" pick directly.
8. Scope: "Times makes bigger only when the other number is bigger than 1" is true for positive numbers, which is all this boundary has; fact-checker's call whether it needs a scope word. Trust line reads 0/4 claims checked (fact-checker's gate).

Where understanding first broke: it did not, on this path.

## After reading build.md

Read after the section above; no earlier reviews exist. Nothing in build.md changes the findings.
