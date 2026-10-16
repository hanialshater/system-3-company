# Build note: tote-balance-sides

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; two options ("No: the total didn't change" / "Yes").
- Seen table (r11 finding 2, W-1076): Left side and Right side for both layouts (3 kg / 1 kg as packed, 2 kg / 2 kg evened out), and the balance point for both (−10 cm · left of the handle / 0 cm · under the handle). "Left mass 3.2 kg beside a 0 cm centre" can no longer appear.
- Slider: "Left side, as packed", 1 to 5 kg in steps of 2, so the evened-out sides stay whole kilograms; both columns move. Safety: weights stay at 6 kg or less (safety record), caption "Model; no safe load limit" and the limit line kept.
- Picture: the tote hangs from its handle and tilts until its balance point is under the handle, so "hangs straight" is visible.
- Idea in plain words ("the heavier side pulls the balance point towards it"), no "mass-weighted average".
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: Yes, 2nd of 2 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
