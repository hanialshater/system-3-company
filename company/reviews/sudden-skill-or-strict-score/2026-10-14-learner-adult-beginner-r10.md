*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): sudden-skill-or-strict-score
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a whole answer's probability is the product of its tokens'; does not know that an all-or-nothing score on a multi-token answer turns smooth per-token improvement into near-zero-then-shoot-up, so a "sudden ability" can be made by the metric)
Screenshots seen: yes (artifacts/walkthroughs/sudden-skill-or-strict-score/sheet.png, recorded 2026-10-14T18:53)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "Climb steadily"; tapped "Score whole answers", "Score each token", "Answers 1 token long", Reset; opened reveal.

1. **The prediction is genuine.** Evenly spaced 50→95% invites "Climb steadily"; my product knowledge is there but not yet applied to ten tokens. Good.
2. **The payoff is on the chart.** Whole answers: 0.1, 0.6, 2.8, 10.7, 34.9, 59.9%: flat, then up. Token scores: 50→95% in an even staircase, with the whole-answer bars dashed inside them. One picture holds both.
3. **The encoding flips between steps.** In step 1 "Filled" means whole answers; in step 2 "Filled" means each token and "dashed" means whole answers; after Reset "Dashed" means "scores you saw". The caption is updated each time, but I had to re-read it to know which bar was which. It is the one place I got lost.
4. **Where the idea I lack first appears: none that blocks.** "ten tokens all right is p to the tenth power" is the product rule I already have, applied; 0.9¹⁰ ≈ 34.9% is on the XL column. The "1 token long" preset (whole = token) is a good control case.
5. "Before calling an ability emergent, check whether a smoother score shows it growing all along." Usable take-away. "Toy: each token right or wrong independently" is said.
6. Reveal fits with its picture (06-reveal, dashed both series on screen).
7. Trust link reads "0/3 claims checked" (fact-checker's lane).

Verdict reason: the metric-made jump is seen next to the smooth token curve; the reveal names only what is on screen.

Fixes (hypotheses for the builder, not tested):
- Keep one encoding throughout (e.g. whole answers always dark/filled, tokens always light/outlined).

## After reading build.md (Pre-flight v1)

- The flip of "filled" between presets (finding 3) is deliberate: whatever is current is filled, earlier sets are dashed. Coherent as a rule, but a beginner has to learn the rule while learning the idea. Hypothesis for the builder.
- Fix route: none required for launch.
