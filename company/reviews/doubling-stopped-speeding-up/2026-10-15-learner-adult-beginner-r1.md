*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: doubling-stopped-speeding-up
lesson version: v2
boundary: adult beginner (the brief's own boundary). Knows that world population grew fast and passed 8 billion. Does not know that the last doubling (4 to 8 billion) took no less time than the one before, or that the yearly growth rate peaked in 1963. Thinks of "growth" mainly as people added. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/doubling-stopped-speeding-up/sheet.png, recorded 2026-10-15T10:05:46.186Z, production build on http://localhost:3590, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **The options point to the answer.** The question gives 122 and 48 years. The options are "About 24" (half of 48), "About 96" (double 48) and "About 47". Two of the three are clean arithmetic from 48; the right one is the odd, oddly specific number. A test-wise learner picks 47 because nobody would invent it. That is "an option worded more precisely than the others" in practice. The hook adds a second cue: "Did the latest doubling keep up the pace?" is a yes/no question that reads as "no".
2. **Where understanding first broke: the reveal's last sentence.** "A doubling that takes as long as the last one, at a falling yearly rate, means growth is slowing, not racing." On my boundary I count people. The last doubling added 4 billion in 47 years; the one before added 2 billion in 48. That is twice as many people in the same time, which to me sounds like racing. The reveal never addresses this, and it is the most natural beginner objection to "growth is slowing". The step-4 rate chart (peak 2.25% in 1963, 0.88% now) is the right picture for the answer, but the reveal does not connect "people added per year is still huge" with "the rate is falling".
3. **What the explore did well.** The three doubling bars under the axis (122 / 48 / 47) are a clean, felt comparison, and the switch to the growth-rate chart at step 4 is the right second view. Both views stay on screen at the reveal.

Verdict reason: the options telegraph the answer (24 and 96 are derived from 48, so 47 stands out), and the reveal leaves the main beginner objection ("but it added twice as many people") unanswered.

Concrete fixes:
- Options all built the same way, for example "About 24 years", "About 48 years", "About 96 years" (half, same, double), with the reveal saying "47". Or four options, none derived from 48 ("About 20 / 35 / 47 / 70").
- Hook without a yes/no cue, for example "World population doubled in 122 years, then in 48. How long did the next doubling take?"
- One reveal clause on the objection: "It added 4 billion rather than 2 in that time, but as a share of the people already alive, growth has been falling since 1963."

## After reading build.md / meta.json

- The misconception ("population keeps doubling faster and faster") is refuted by what I saw. But the beginner version of the misconception is about *people added*, and that is the part the reveal leaves open (finding 2).
- The objective says "has fallen since (0.87% in 2023)", while the stage and reveal say "0.88%, 2022 to 2023". A small mismatch between brief and stage; the stage wording is the claimed one, so this is a note for the brief's owner, not the fact-checker.
- meta.json lists all 6 claims verified; the served trust sheet shows 4/6, so the served build may predate the last fact-check pass.
