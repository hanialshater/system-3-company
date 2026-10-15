*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): breeze-is-not-extra-surface
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The model keeps cloth area fixed and changes the assumed mass-transfer flux. Area and transfer conditions multiply; changing one does not secretly change the other.)
Screenshots seen: yes (artifacts/walkthroughs/breeze-is-not-extra-surface/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Still-air model" (wrong); tapped Moving-air model; slid Area to 1.2; opened reveal.

1. **Where it first broke: the first word.** "Which change alters flux while keeping exposed area fixed?" I do not know what "flux" is. The stage then says "Flux=1units/(m²·step)", and the reveal says "mass-transfer flux". This is drying laundry; I expected "a breeze dries clothes faster even though the cloth is the same size".
2. **The question does not fit the options.** It asks which "change" alters flux; the options are two models and "Same outcome". "Still-air model" is not a change. I picked it as a guess.
3. **The picture never changes.** Still air and moving air show the same cloth, the same four arrows and the same little arc. Nothing shows air moving. Only the small "Flux=2" text changed.
4. **I never saw the still-air number.** The Model rate is "?" until I tap; I tapped Moving air (2 units/step) and then area (2.4). The comparison the lesson is about (1 vs 2 at the same area) never sat side by side. Also the toggle highlight looks inverted: after I tapped Moving-air, the white "selected-looking" button was Still-air.
5. **Reveal versus my question.** It says area and transfer "multiply" and that the doubling is illustrative, "not a measured benefit from any fan". So my real question (does a breeze help, and roughly how much?) is explicitly left unanswered, and the only number on stage is made up. I leave knowing a formula, not anything about my washing.

Fixes (for the builder):
- Drop "flux"; say "drying speed per square metre" or similar. Show still-air and moving-air rates side by side at the same area.
- Animate or draw the moving air so the two layouts look different; fix the toggle state.
- Ask a prediction a person has: "Hang the same shirt in a breeze or spread it over more line: which changes what?"

Verdict reason: the key term (flux) is outside an adult beginner's vocabulary, the picture does not change between the two conditions, and the reveal declines to say anything about real breezes.

## After reading the brief (meta.json)

- The learner field says this learner knows only 'everyday objects have sizes, positions and amounts', yet the objective is phrased as 'mass-transfer flux'. The boundary and the stage vocabulary do not match (finding 1).
- Misconception field is the generic 'the two pictured methods are interchangeable without checking their mechanism', which this stage does not test.
- Fix route: demo-builder (wording, picture, side-by-side readout); fact-checker if any real-world breeze effect is added.
