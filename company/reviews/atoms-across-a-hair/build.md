# Build note: atoms-across-a-hair
- Intent: powers-of-ten zoom, one square window, a dashed box showing where the next x10 lands; atoms appear as circles only at the last two steps.
- "Atom widths across window" readout is hidden ("?") while locked, since at zoom x1 it plus the 70% hair width gives the answer.
- CM's hair citation (Ley & Bartlett, J. Cosmet. Sci. 2008) could not be confirmed; replaced with The Physics Factbook compilation and flagged for the fact-checker.
- After screenshots: the middle zoom levels were a featureless grey square, so I added "still inside the hair" and "a row of atoms, too small to see" labels, thickened the atom row, and moved the label off the next-zoom box.

## Revision v2
Fixes from the v1 learner review: the reveal now unlocks only after the learner has reached the deepest zoom step (interact() fires when the deepest step is first reached; a "Zoom in automatically" button walks the five steps so the learner still sees each one), so the five-step list in the reveal describes steps they took. Added a 'Hair width in atoms' readout that fills in (350,000) once they reach atoms, so the payoff is on the stage. Defined µm and nm in the question. Removed 'powers of ten' language. Claim c3 reworded (unverified), c5 reset to unverified.
