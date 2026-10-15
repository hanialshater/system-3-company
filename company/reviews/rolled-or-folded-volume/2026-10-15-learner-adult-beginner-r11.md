*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): rolled-or-folded-volume
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Changing shape does not remove material. This ideal sheet has the same volume rolled or folded. Real space differences come from air gaps, compression and how shapes share a bag.)
Screenshots seen: yes (artifacts/walkthroughs/rolled-or-folded-volume/sheet.png, recorded 2026-10-15T21:34)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Fold it"; after lock-in the stage showed Material volume 1,440 cm³ (folded stack); tapped Roll it (1,440 cm³, cylinder); slid Sheets to 14 (1,680 cm³); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **The surprise is real for me.** I believed rolling saves space. Seeing 1,440 cm³ folded and 1,440 cm³ rolled, with a flat stack becoming a fat cylinder, makes "same outcome" land. The reveal says it straight: "Changing shape does not remove material ... Real space differences come from air gaps, compression and how shapes share a bag." That answers my actual question ("so why do people say rolling saves space?"): if it does, it is through air and fit, not less cloth.
2. **Where it wobbled: the question reads like a trick.** "With no compressed air, which uses less cloth volume?" Once you read "cloth volume" literally, it cannot change, so a careful reader gets it right by parsing and a careless one feels caught out. I would rather be asked "which takes less space in the bag?" and then shown that the cloth is the same and only the air differs.
3. **"Sheets" vs clothes.** The slider counts "sheets" of 30×20×0.2 cm, while the title and hook are about cloth and packing. I worked out that a sheet stands for a garment, but it is not said.
4. **Selected-state styling is inverted** (current mode grey, other white), as elsewhere in this family.

Notes (not blocking):
- Reframe the prompt around bag space and keep the conservation check as the reveal.
- Label sheets as garments ("12 shirts, each 30×20×0.2 cm").

Verdict reason: the stage shows equal volumes for both shapes and the reveal answers the learner's real question (any saving comes from air and fit, not less cloth).

## After reading the brief (meta.json)

- The objective (shape does not remove material; real differences come from air, compression and fit) is delivered: equal 1,440 cm³ readouts in both modes, plus the reveal.
- Fix route: demo-builder for the prompt wording (note only).
