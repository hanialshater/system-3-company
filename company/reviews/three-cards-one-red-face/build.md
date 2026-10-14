# Build note: three-cards-one-red-face (demo-builder, 2026-10-13)
- Intent: three cards drawn as their two sides (each face labelled with its colour, not colour alone). "Keep the red faces" dims the 3 blue faces; "Turn them over" lists each red face and its back (red, red, blue). "Draw 60 cards" adds seeded draws (seed 1889, untuned, max 600) to a tally.
- Gate: 2 milestones, red faces kept and turned over. The second button enables after the first, so QA reaches both; the draw button comes third.
- The answer 2/3 comes from exact() enumeration. The reveal quotes the learner's own draw tally only if they drew (QA path: 18 of 23, 78%; noisy at 60 draws, disclosed in c3).
- Bertrand attribution omitted (not on the stage).
- Iteration after screenshots: widened the "card N, side N" chips; colours moved to CSS variables.


## Revision v2

Review: reveal clipped, rebuttal cut off; sampling noise unaddressed. Changes: reveal leads with 'counts cards, but the clue is about a face' and then the learner's draws with 'short runs wobble around 2/3'. c3 unverified. Version 2.
