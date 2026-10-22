*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: new-friend-loosens-the-circle
lesson version: v1
boundary: a learner who knows what a friend pair is and can count pairs among n people (handshake counting: 4 people make 6 pairs, 5 make 10), but has never met clustering and believes a new friend who knows some of your friends makes your circle tighter.
Screenshots seen: yes (artifacts/walkthroughs/new-friend-loosens-the-circle/sheet.png, recorded 2026-10-22T12:00:08.527Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The predict card defines clustering in place ("of the 6 pairs among them, 3 are friends with each other: a share of 0.5, called Ana's clustering"), so the one new idea arrives before it is used. I traced every line in the screenshots against the readouts: before Fay, blue B–C, C–D, D–E (3) and dashed B–D, B–E, C–E (3) = 3 of 6. Fay knows 1: blue 3 + green E–Fay = 4, dashed 6 (the old 3 + B–Fay, C–Fay, D–Fay) = 4 of 10. Fay knows 2: green D–Fay, E–Fay, 5 of 10. Fay knows 3: green C–Fay, D–Fay, E–Fay, dashed B–D, B–E, C–E, B–Fay = 6 of 10. "No Fay" returns to 3 of 6. Picture, readout, chip ticks (✓ 0.4 / 0.5 / 0.6) and reveal agree in every state.
2. What the prediction felt like: a real pull. "She knows one of your friends, so it adds a link" makes "Higher" tempting, which is the misconception; the question is answerable by counting (5 friends → 10 pairs) but most first-timers will not count before choosing. Good.
3. Whether the reveal answered the question I had: yes. My question after choosing "Higher" and seeing 0.4 is "why did a link make it go down?", and the reveal answers exactly that: Fay adds 4 pairs to the bottom but only 1 to the top per friend she knows, so she must know 2 of 4 to hold 0.5. It quotes the values I saw (0.4, 0.5, 0.6). It fits the phone with the stage top visible.

Notes (not blocking):
- The stage has no key for its three line styles: grey solid (Ana's own friendships, which are not counted), blue/green solid (linked pairs) and dashed (unlinked pairs). A learner counting lines could include Ana's grey spokes. The readout "linked pairs n of m" rescues the count, and the reveal says what the pairs are, so this is polish, not a break.
- "In your class, Ana has 4 friends" reads slightly oddly (whose class?); "Ana has 4 friends" would do.
- In the predict state the chips sit below the stage, greyed, with "No Fay" highlighted; fine, but the highlighted "No Fay" before anything is pressed may read as a preselected answer for a second.

Verdict reason: no finding blocks a first-time learner at this boundary; picture, numbers and reveal agree in every recorded state and the reveal answers the misconception directly.

## After reading build.md / meta.json

- Read only meta.json's `version` field to stamp this review; build.md and design.md not read.
