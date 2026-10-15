*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): tote-balance-sides
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know The load’s centre is a mass-weighted average of positions. Moving some of the load to the other side can put that average under the handle while leaving total mass unchanged.)
Screenshots seen: yes (artifacts/walkthroughs/tote-balance-sides/sheet.png, recorded 2026-10-15T21:35, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Unequal sides"; tapped Balance sides; slid Left mass from 3 to 3.2 kg; opened reveal.

1. **The question answers itself.** "Which layout centres the shown load?" with an option called "Balance sides" is a word match, not a prediction.
2. **Where understanding first broke: the slider contradicts the picture.** In "Balance sides" the label says "Left mass 3.2kg" and "other=1kg", yet the picture shows two equal boxes and the load centre stays at 0 cm. With 3.2 kg on one side and 1 kg on the other the centre cannot be 0. I could not tell what "balance sides" did to the masses.
3. **I never saw the unequal number.** The predict picture does show the green centre line shifted toward the big box, which is good, but the readout (about 10 cm off centre at 3 kg vs 1 kg) stayed "?" and never appeared.
4. **"Mass-weighted average of positions" is beyond my boundary.** "The heavier side pulls the balance point toward it" is the plain version.
5. **The selected button looks reversed.**
6. The safety line ("a centred drawing does not certify a bag's strength") is sensible.

Fixes (for the builder):
- In Balance mode, show the masses actually moved (for example 2 kg and 2 kg) and make the slider meaningful, or hide it.
- Show both centres together (unequal: 10 cm left; balanced: 0 cm).
- Ask a question with tension, for example "Where is the balance point with 3 kg left and 1 kg right?"

Verdict reason: in the balanced layout the stage shows "Left mass 3.2kg" beside a 0 cm centre and equal boxes, which a learner cannot make sense of, and the unequal result never appears.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, picture, selected-button look, plain wording); Life Hacks category manager for whether the brief names a real beginner belief.
