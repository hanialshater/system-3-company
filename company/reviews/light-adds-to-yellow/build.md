# Build note: light-adds-to-yellow (demo-builder, 2026-10-13)

- Design intent: one big swatch painted with exactly rgb(r, g, b), its code under it, and three rows of steps (0, 128, 255) for red, green, blue. The step in use is an active, disabled button, so every enabled button changes the pixel. The line under the swatch names only the eight corner colours ("Looks yellow."); swatch and name are black/blank while locked.
- Key state: (255, 255, 0) reached, then blue raised with red and green still full. Milestones ["yellow", "blue-up"], minInteractions 2. QA path: red 128, red 255, green 128, green 255 (yellow), blue 128 (paler), blue 255 (white). Reveal names yellow and the blue level reached, and says "white" only if the stage is at 255/255/255.
- Removed in build: a "light %" readout (channel values are gamma-encoded, so 128 is not half the light; the number would mislead).
- Retitled: slug says the answer; title "Red light plus green light makes…?". Hook rewritten so it does not hint "not brown".
- Claims: c4 discloses that "green" and "magenta" are everyday names (CSS: lime, fuchsia); c6 "dark brown" for paint stated as typical, not exact.
- After screenshots: reads on phone; no changes.
