*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): packing-cube-walls
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Container walls consume some of its external volume. Multiplying the outer dimensions counts material as storage; subtracting both walls in each direction gives the ideal inner capacity.)
Screenshots seen: yes (artifacts/walkthroughs/packing-cube-walls/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Outer volume"; tapped Usable volume; slid outer width to 32; opened reveal.

1. **Where understanding first broke: I never see the number I predicted.** I chose "Outer volume", whose readout was "?" while locked. Explore told me to "try the second layout", so I did, and I only ever saw usable volume (4,032, then 4,320 cm³). The reveal says "Not quite ... the current usable volume setting gives 4,320cm³". The comparison that would make walls matter (30×20×10 = 6,000 against 4,032, about a third lost) is never on screen.
2. **The highlighted button contradicts the readout.** After I tapped "Usable volume", the "Outer volume" button is the one drawn white/raised, in step 1, step 2 and the reveal, while the readout says "Usable volume". I read that as "outer is selected" and could not tell which number I was looking at.
3. **The prediction is a definition question.** "Which figure describes space available to contents?" has three options, and "Same outcome" makes no sense for a question asking which figure. A beginner's real question is "how much do the walls cost me?", and only the missing comparison would answer it.
4. The 1 cm wall is not drawn to any scale I can read. The inner rectangle shrinks, which is a fine cue.
5. Reveal wording is good: "Multiplying the outer dimensions counts material as storage" and the seams/zips caveat.

Fixes (for the builder):
- Show outer and usable side by side (6,000 vs 4,032) and in the reveal sentence.
- Fix the toggle highlight so the selected option is the highlighted one.
- Drop "Same outcome", or reword the question so it fits.

Verdict reason: the reveal never shows the outer volume the learner predicted, so the size of the wall loss is never seen, and the toggle highlights the wrong option.

## After reading the brief (meta.json)

- The objective and the reveal text match (walls consume volume; subtract both walls). The trust sheet's worked example (28 × 18 × 8 = 4032 against 6000) is exactly the comparison the stage should show but does not (finding 1). It lives only behind "Why trust this?".
- Fix route: demo-builder (show the outer figure; toggle highlight).
