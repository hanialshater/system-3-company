*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): rectangular-bin-nesting
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: For these tapered ideal bins, nesting shares hollow height while each additional rim adds a small increment. Solid boxes without a nesting shape do not share the same geometry.)
Screenshots seen: yes (artifacts/walkthroughs/rectangular-bin-nesting/sheet.png, recorded 2026-10-15T21:33)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Separate bins"; after lock-in the stage showed Stack height 40 cm; tapped Nested bins (13 cm); slid Count to 6 (15 cm); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **Where understanding first broke: the picture never shows separate bins.** In both modes the drawing is one tapered outline with rim lines inside it. In "Separate bins" mode (40 cm) I see one tall bin with stripes, not four bins stacked on top of each other. Before I predict, the drawing already looks like a nested stack, which hints at the answer and leaves "separate" without an image.
2. **The numbers do land: 40 cm vs 13 cm.** But the reveal restates only the current one ("The current nested bins setting gives 15cm"), not the comparison.
3. **The title contradicts the content.** "Walls limit nesting depth" suggests walls are a limit. The lesson is about nesting saving height (each rim adds 1 cm). The slug talks about rectangular bins, but the drawing and the reveal say "tapered". I could not tell which idea I was meant to take away.
4. **Selected-state styling is inverted:** the current mode is grey and the other is white, so after tapping "Nested bins", "Separate bins" looked selected.
5. "Same outcome" is an odd option for "which ... has a shorter height".

Fixes (for the builder):
- Draw separate bins as a tall stack of four outlines, and put both heights (40 cm vs 13 cm) in the reveal.
- Match the title to the idea (nesting saves height when walls taper).
- Fix the selected-button highlight.

Verdict reason: the title ("Walls limit nesting depth") points to the opposite of what the stage shows (nesting saves height), and the separate-bins mode is never drawn as separate bins.

## After reading the brief (meta.json)

- The objective (tapered bins share hollow height; each rim adds a little) matches the numbers (40 vs 13 cm) but not the title "Walls limit nesting depth" (finding 3).
- The trust-sheet worked example uses 5 bins (14 cm vs 50 cm), while the stage default is 4 bins (13 vs 40). Not wrong, but a learner who opens the sheet sees different numbers. Route: fact-checker.
- Fix route: demo-builder (title; draw separate bins).
