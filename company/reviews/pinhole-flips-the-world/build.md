# Build note: pinhole-flips-the-world

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: one side view, candle / card with hole / screen on one true scale (4.2 px per cm on both axes), so the drawn triangles are the similar triangles. Three rays (tip, middle, base). Image and rays are hidden until the prediction is locked.
- Sliders instead of dragging (brief said drag): candle-to-hole 10-40 cm, screen-to-hole 5-30 cm, hole 1-5 mm (blur = outline thickness, from a (d_o + d_s) / d_o).
- Earned reveal: milestones 'traced-tip' (button highlights the tip ray and its landing point) and 'moved' (either distance slider). Both on the QA path (first two controls).
- Brief said "no text on stage"; kept one model chip ('No lens. Straight rays.') per label-the-model, plus the image readout.
- After screenshots: a 6 cm candle drew 25 px tall and the image was a few pixels; candle raised to 10 cm (illustrative, disclosed in c3), so the default image is 5.0 cm.
- Numbers: 10 x 15 / 30 = 5.0 cm, range 1.25-30 cm, checked in node.
