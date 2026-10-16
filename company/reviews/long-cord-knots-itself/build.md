# Build note: long-cord-knots-itself

Kept from evaluators until they report.

## Revision v1 → v2 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2, on its own cord stage (like square-bow-stays-tied on the bow stage). Title, question and options from the plan as written; hook = question.
- Stage (r11 findings 1 and 3): the experiment is named in plain words under the picture ("Raymer and Smith (2007) tumbled one string at a time in a 30 cm box, one turn a second, for 10 seconds"), and the caption says "Each drawing is a simulated string at the study's rate. Plain cord; storage only." No "seed", "p=", "model draws" or "study-conditioned" anywhere on screen or in the reveal. Buttons "Tumble 0.3 m" / "Tumble 3 m"; counts read "13 of 20 knotted".
- Reveal first sentence: "This simulation knotted 0 of 20 short strings and 13 of 20 long ones; the study's 55% is about 11 in 20." (says plainly that 13/20 is a simulation of the 55%). Idea rewritten (who, what box, how long; end-weaving reason). Safety caption "Plain cord; storage only" kept (safety record condition).
- meta.json learner.doesNotKnow still holds reveal-like text (r11 "after reading" note): cm-lifehacks content, not changed.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence; new `.stage` claim for the stage text. Nothing marked verified. Version bumped.
- Correct option: About half the time, 2nd of 3 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
