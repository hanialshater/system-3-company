# Build note: clay-boat

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view of a tank; 1 kg of clay (0.556 L) as a ball or four open cylindrical cups drawn to scale, wall thickness solved so the clay volume is constant; floating draft = 1000 cm^3 / base area.
- Earned reveal: milestone 'floated' (first shape that floats); the deep 0.80 L cup sinks flooded, so 'bigger outside volume than 1 L' is what matters.
- After screenshots: no layout change needed; the 'water pushed aside' readout is hidden while locked.

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise); the fact-check routed nothing.

- Options invited arithmetic on "1800 kg/m³" (1.8 L, 0.56 L), and kg/m³ is unfamiliar: the density is gone from the question. It now reads "A 1 kg ball of clay (0.56 L) sinks ... how much water must it push aside to float?" with options "0.56 L, same as the ball" / "1 L" / "2 L".
- The upward push appeared first in the reveal: a force diagram beside the tank draws the water's push (green, up, length = kg of water pushed aside) against the clay's 1 kg weight (red, down). The ball shows push 0.56 kg vs weight 1 kg; a floating shape shows the two equal. The reveal now names the push the learner watched.
- Deep cup had two numbers (0.56 vs 0.80 L) never joined: the sinking caption says "Sank: held back at most 0.80 L, then flooded. Now only its clay pushes water aside." with the readout showing 0.56 L, and the reveal joins them in one sentence.
- "Your cup floated" when the cup was the one that sank: shapes renamed uniquely (ball, small cup, big cup, bowl, wide dish); the sinking one is "small cup", and the reveal names the first shape that floated.
- Ball's 0.56 L never seen (readout was "?" until moving): the readout and caption show the ball's 0.56 L from the predict state (the question states it anyway).
- Tank looked rescaled between shapes: the scale was already fixed (7 px/cm); the svg could shrink when the caption wrapped. Caption now has a fixed two-line height, and the shapes are drawn left of centre to leave room for the force diagram.
- "1 L of water weighs 1 kg" was only implied: the ball caption states it.
- Claim texts unchanged, so no status reset.
