# Build note: jacket-last-first

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; starting count 3 items (jacket, sweater, shoes), extra items go between sweater and shoes.
- Picture (r11 finding 1): a top-opening bag drawn as a vertical stack with the item names; the jacket is marked; arrows show the items that must come off it. B reverses the stack.
- Seen table (findings 2, 3): "On top of the jacket" 2 items / 0 items, live with the count.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: The shoes, moved from 2nd to 1st of 3 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
