*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): seasonal-bin-rotation
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Access cost should be counted across uses. Moving the frequently requested bin to the front reduces repeated blocker removals in this particular queue; the rarely requested bin can tolerate a longer path.)
Screenshots seen: yes (artifacts/walkthroughs/seasonal-bin-rotation/sheet.png, recorded 2026-10-15T21:35)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Frequent bin at back"; after lock-in the stage showed Total removals 28; tapped Frequent bin at front (7); slid Back position to 10 (9); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **The count makes the point.** 28 removals with the often-used bin at the back against 7 with it at the front: four times the work, over the same requests. The reveal's line "Access cost should be counted across uses" is the idea I take away, and it answers "why bother moving it?".
2. **Where I wobbled: what the numbers mean.** "Back position 8 depth" and "Frequent=4 uses · rare=1 use" are terse. I had to work out that "depth 8" means seven boxes in front of it, and that the frequent bin is fetched 4 times. Nothing says which box is the frequent one. The highlighted box 1 helps, but it is not labelled.
3. **The prediction is low-tension** (most people already guess "front"), but the size of the difference is new.
4. The predict-state drawing (a 2×4 grid with an arrow) is a different picture from the explore drawing (a row of 8). Briefly confusing.
5. **Selected-state styling is inverted.** Reveal caveat about chosen frequencies is good.

Notes (not blocking):
- Label the frequent and rare bins in the drawing, and say "7 boxes in front" rather than "8 depth".
- Put both totals (28 vs 7) in the reveal sentence.

Verdict reason: the stage shows 28 vs 7 removals for the same requests and the reveal explains why frequency matters; the labels are clarity notes.

## After reading the brief (meta.json)

- The objective is delivered (28 vs 7 removals).
- The trust-sheet worked example counts 16 vs 4 ("each of the 4 uses moves 4 blockers"), while the stage default shows 28 vs 7 at depth 8. The sheet describes a different fixture. Route: fact-checker.
