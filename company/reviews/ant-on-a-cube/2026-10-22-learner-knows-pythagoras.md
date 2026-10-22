*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: ant-on-a-cube
lesson version: v2
boundary: a learner who knows Pythagoras (a² + b² = c² on a right triangle, and that a straight line is shortest on a flat sheet) and can read a drawn cube; has never met nets or "unfold the surface" as a way to find shortest paths; expects the shortest walk to be along edges or a face diagonal.
Screenshots seen: yes (artifacts/walkthroughs/ant-on-a-cube/sheet.png, recorded 2026-10-22T12:05:45.958Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: nowhere blocking. I traced each drawn route against its readout: "Along the edges" runs bottom front edge, up the front-right vertical edge, then back along the top-right depth edge (3 edges, 3.00 m); "Diagonal then edge" crosses the front face corner to corner, then the top-right depth edge (1 + √2, 2.41 m); "Unfold two faces" shows a 2 m by 1 m rectangle with the shared edge dashed and a straight line crossing it at its middle (√(1² + 2²) = 2.24 m); "Fold back up" draws the bent path across the front face to the midpoint of the front-right vertical edge, then across the right face to the far top corner (2.24 m). Pictures, labels and numbers agree in every frame.
2. What the prediction felt like: a real choice. The three options map to the three routes a learner can imagine (edges 3.0, diagonal + edge ≈ 2.4, something cleverer ≈ 2.2), and the 2.4 decoy is exactly the misconception "the face diagonal is the cleverest straight line". "about" in the question covers 2.2 vs 2.24. The predict picture marks both corners clearly.
3. The key move (unfolding) is shown, not told: the flat rectangle with the shared edge dashed and the crossing point dotted, then the same dot on the folded cube, lets me see that the bent path is the straight line folded. This is the payoff and it lands.
4. Small note: the reveal names "front and right faces" but the stage never labels faces; the picture is clear enough that this costs nothing. Note only.
5. Small note: the reveal says "no route over other faces is shorter". The stage never shows another pair of faces, so a learner who wonders "what about top and front?" has to take this on trust (it is in the trust sheet). By symmetry a curious learner may guess it; not a block.
6. After Reset the bent path stays dashed on the cube and into the reveal, and the chips keep their recorded lengths, so the reveal's numbers can be checked against the stage.
7. Whether the reveal answered the question the learner actually had: yes. My question was "why is 2.24 possible when no straight line I can see on the cube is that short?" The reveal answers with the unfold and Pythagoras, and states the general rule (unfold, then draw a straight line). It fits on screen under the picture.

Verdict reason: no finding blocks a first-time learner; notes only (faces unnamed on stage; "no other faces are shorter" asserted, not shown).

## After reading build.md / meta.json

- Read only meta.json's `version` field (2) to stamp this review. build.md and design.md not read.
