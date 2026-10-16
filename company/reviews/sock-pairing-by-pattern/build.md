# Build note: sock-pairing-by-pattern

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; two options ("11" / "3"), numbers from case 'pair-search' at 12 socks with 3 patterns (values changed from 2 bins to 3, slider 6-18 in steps of 6 so every pattern holds whole pairs).
- Engine: Home v2 now accepts two options (engine-v2.ts HomeV2Fields.options and homeV2Problems); see the W3 readiness addendum.
- Pictures (r11 finding 1): A is a heap (socks on a spiral, rotated, patterns mixed) with the target sock marked; B is three bins, one per pattern, with the target's bin outlined and the other bins dimmed.
- Both counts shown together (finding 2): "Socks in the search" 12 / 4 and "Socks to check, at most" 11 / 3, live with the slider. The label says what the number means (finding 3).
- Open for cm-lifehacks: "how many socks do you check" is answered as the worst case (the partner turns up last; the limit line says so). A learner who reads "check" as "glance at the matching pattern" could argue for 3.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: 11, 1st of 2 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
