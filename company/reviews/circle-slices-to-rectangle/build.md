# Build note: circle-slices-to-rectangle (demo-builder, 2026-10-12)

- Intent: one SVG, two states. The circle (r = 10) sits in its 20×20 square made of four 10×10 boxes. "Unroll" flies the wedges into an alternating strip and slides the four boxes into a row underneath, so the learner sees the strip cover about 3.14 of 4 boxes.
- Wedge geometry places neighbouring straight edges exactly together (apex spacing r sin(π/N), down-wedges at depth r cos(π/N)); slices slider 4..64.
- Reveal unlocks once the circle is unrolled with 16+ slices.
- After screenshots: the slices hid the box borders, so "4 boxes" could not be counted; added dashed box outlines drawn over the slices.
