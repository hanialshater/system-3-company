*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-count-before-dispatch
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Propagate a counted inventory discrepancy through a later transaction.)
Screenshots seen: yes (artifacts/walkthroughs/lh-count-before-dispatch/sheet.png, recorded 2026-10-15T21:37:20.288Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Counted"; tapped Test A; Test B; slid Record 10 -> 12; opened reveal.

1. **The hook asks a good question; the prediction asks an easier one.** The hook ("The record says ten, the shelf has eight. Which count remains after shipping three?") is the real question: 5, not 7. But the predict step asks "which remaining count is lower?" Since the shelf count is already two below the record, the counted line is lower by construction. I did not need to think.
2. **Where understanding first broke: the working hides the correction.** Counted shows "5 items (10-5)". I expected "(8-3)" or "(10-2-3)". "10-5" merges the two-unit error and the three shipped, which is the very step the lesson wants me to see. I had to work out where the 5 came from.
3. **The slider only moves both lines up together.** Record 12 gives 7 vs 9; the two-unit error stays two. That confirms "the error persists" but does not add anything.
4. The reveal says the right thing in plain-ish words: "Shipping three from an already incorrect record preserves its two-unit error. A corrected observation needs to travel into the next calculation."
5. Drawings (two lists with arrows) do not show shelf vs record. "Full scale:17items; count difference=2; dispatch=3; no receipts" is builder text on stage.

Verdict reason: the prediction asks "which is lower" (answered by the setup) instead of the hook's "how many remain", and the working "(10-5)" hides the correction step the lesson is about.

## After reading the brief (meta.json)

- Objective "propagate a counted inventory discrepancy through a later transaction": the reveal states it, but the working "(10-5)" collapses the two steps (finding 2) and the prediction is decided by the setup.
- Fix route: demo-builder (ask for the remaining count with 7 as the tempting wrong option; show "(8-3)" or "10 − 2 − 3").
