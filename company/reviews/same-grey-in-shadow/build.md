# Build note: same-grey-in-shadow

Builder: demo-builder (demo-builder-bigideas-pilot) · 2026-10-14 · from brief big-ideas.md #8 with its W-537 re-check lines (they override the draft). Claimed with `claim.mjs next big-ideas`. Before / after toggle.

- Picture: our own 5 × 5 checkerboard (not traced) with a green cylinder on the right; its shadow is a black layer at opacity 3/7 with a blurred edge, clipped to the board. In the light: light squares 210, dark 120. In the shadow's core: light 120, dark about 69. A is a dark square in the light, B a light square deep in the shadow. A, B and the strip are drawn from one constant, SAME = #787878 (120), not a theme variable; B is drawn again on top of the shadow from SAME, so its value is exact by construction. Each cell carries data-fill.
- Caption under the board: "After a well-known checker-shadow illusion. Our own drawing." (brief: names no one until Adelson 1995 is confirmed).
- Presets, DOM order: Sample A / Sample B (milestone `sampled` after both; ring on the square, readout "A reads 120 · B reads 120 (screen brightness, 0 to 255)", the non-visual path) / Connect them (toggle: a 12-unit strip of SAME from A to B) / Remove the shadow (toggle; the cylinder and the shadow go, A and B keep their paint; milestone `noshadow`) / Reset (shadow back, strip off; the samples are records and stay). Reveal after `sampled` and `noshadow`.
- Departures, flagged for cm-big-ideas: (1) options "A is darker" / "B is darker" / "Neither is darker" (the brief's "Neither: they are the same" was the only longer, more precise option). (2) Question cut to 21 words. (3) "lighter than the light it receives" became "lighter than the light it sends" (the light from B to the eye). (4) "made before you notice" and "The illusion shows the assumption, not a fault" were cut for the word budget. (5) First build drew the shadow as flat darker squares; at 390 px the illusion barely showed, so the shadow is now a soft layer (checked on a 390 × 844 screenshot at predict: B reads clearly lighter than A).
- Claims c1-c6, all unverified. One held citation on the learner path (c4 Helmholtz, class P) with the brief's fallback in the claim. The limit is by derivation (c5), not the Adelson chapter.
- For the accessibility-reviewer at walkthrough (brief): this is a visual illusion; the sampler's text readout is the non-visual path to the answer.

## Pre-flight v1
1. **Title and hook.** "Dark square, light square" / "A checkerboard, a cylinder and its shadow. Which square sends less light?" They name the scene and ask which square sends less light; nothing says the squares match.
2. **Options.** "A is darker" / "B is darker" / "Neither is darker": same form, no numbers.
3. **Locked stage.** The board with A and B labelled, the cylinder and its shadow, the caption, readout "A reads ? · B reads ?". No strip, no value.
4. **Reveal values.** "120": (b) milestone `sampled`, recorded from the sampler; the readout keeps showing "A reads 120 · B reads 120" after Reset. Everything else in the reveal is told (c3, c4) or derivation (c5).
5. **QA path.** Sample A → Sample B (sampled) → Connect them → Remove the shadow (noshadow) → Reset. Both milestones in 4 presses; every press changed the stage (QA contract passed, phone and desktop).
6. **Reset.** Reveal after Reset: "Your sampler read 120 on both squares: the same grey. Your visual system knows shadows darken surfaces, so it judged B lighter than the light it sends. That is a guess about the world. Hermann von Helmholtz called perception “unconscious inference”. Where it stops: the light you see is lighting times how much the surface reflects. A shadowed square sending the same light really is lighter, so in a real scene the guess is usually right."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530` (next dev): fit, crop 0 px, namedHidden 0, phoneFit true, 83 words (tool count, includes the verdict line). Smallest stage text 11.2 px at predict and 10.5 px at the reveal (the card fits the board smaller at the reveal; builder's own font-size probe).

Stage text at any moment: caption 9 words, readout 11; preset labels 10.
