*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): folded-shirt-stack-height
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: An ideal incompressible sheet trades footprint for thickness. Doubling the layers doubles the height of an equally sized stack while conserving material volume.)
Screenshots seen: yes (artifacts/walkthroughs/folded-shirt-stack-height/sheet.png, recorded 2026-10-15T21:32:05.024Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One fold"; tapped Two folds; slid Count 6 -> 8; opened reveal.

1. **Where understanding first broke: I never saw the one-fold height.** The predict stage hides the height ("?"), and the only number I ever saw was for two folds (9.6 cm, then 12.8 cm). The question is a comparison ("which gives the taller stack?") but the stage never put the two numbers side by side, so I was told I was wrong without seeing by how much (one fold would be 4.8 cm for 6 shirts, but I had to work that out myself from "0.4 cm × layers").
2. **The buttons do not tell me which layout I am looking at.** After I tapped "Two folds", the "One fold" button is the one drawn raised and bold, while the readout says 4 layers. I could not tell which state was active from the control.
3. **The prediction was fair but thin.** "Fewer folds, flatter stack" is a natural guess, and "Same outcome" is a real tempting option (same shirts, same cloth). Good options.
4. **The reveal does not answer the question I had.** "Not quite. The current two folds setting gives 12.8cm" compares nothing. The sentence "Doubling the layers doubles the height of an equally sized stack while conserving material volume" is close to the point, but "equally sized stack" and "incompressible sheet" are physics-speak. The practical hook (smaller folds can make a drawer too shallow) appears only in the trust sheet, never on stage.
5. Recall card uses 5 shirts × 0.4 × 4 = 8 cm, a case the stage never showed (stage had 6 and 8 shirts). Minor, but it reads as a new problem rather than a recap.
6. "Sheet=0.4cm" is label-speak; a learner wants "each layer of shirt is about 0.4 cm thick". The green arc under the stack has no meaning I could find.

Verdict reason: the reveal reports only the two-fold number, so the comparison the question asks for (one fold vs two folds, same shirts) is never shown on stage.

## After reading the brief (meta.json)

- doesNotKnow is the reveal sentence itself. The "doubling layers doubles height" half is shown (4 layers drawn, 9.6 cm), but only for one side of the comparison (finding 1). "Conserving material volume" is asserted, never shown (no footprint number on stage, though claim c3 defines footprint fraction = 1/layers).
- The brief's practical question ("why can smaller folded shirts make a drawer too shallow?") never reaches the stage.
- Fix route: demo-builder (show both heights after unlock; fix chip state; use a recall example that matches the stage).
