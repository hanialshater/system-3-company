# Build note: molecules-in-one-drop

builder: demo-builder (sonnet build, EXP-003) · 2026-10-13

- Title "How many molecules in a drop?" (no number given).
- Intent: group by thousands until the tiles can be counted. Seven single steps would not fit the QA press-once rule, so there are jump buttons (to 10^12 and 10^21 per tile), an Ungroup button and a slider. The one-step button stays.
- Milestones: step 4 (10^12 per tile, still about 1.7 billion tiles, which matches the wrong option A) and step 7 (about 1.7 tiles). The reveal quotes both.
- Tiles are drawn only at steps 6 and 7; steps 0 to 5 show a dotted texture and a count, labelled "too many tiles to draw".
- The count, the readout and the reveal all come from one MOLECULES constant.
