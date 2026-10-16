# Build note: socks-use-shoe-space

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; two options.
- Seen table (r11 finding 1): "Volume the socks add" 200 / 0 cm³ and "Shoe and socks" 1,000 / 800 cm³.
- Slider (finding 2): range raised from 100-400 to 100-800 cm³ so it passes the 600 cm³ hollow and the inside column starts to grow; the picture labels the hollow "600 cm³ empty" and the idea says socks add nothing until they are bigger than the space.
- Safety line kept verbatim.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: None, moved from 2nd to 1st of 2 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
