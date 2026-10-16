# Build note: sock-pairs-not-all-combinations

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan ("3" / "6" / "15").
- Picture (r11 findings 1, 4): the socks on a circle; A draws every possible pairing as a line (15 at 6 socks, 45 at 10); B draws only the partner lines with each pair's number. Nothing is cut off at the top.
- Both counts live with the slider (15 vs 3, 45 vs 5). "Combinatorial growth" replaced with "the pairings grow much faster than the socks" (finding 2).
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: 15, 3rd of 3 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
