*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): drying-room-water-load
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Water leaving laundry enters the surroundings. This example multiplies retained water per item by the item count; it is a mass balance, not a forecast of room humidity.)
Screenshots seen: yes (artifacts/walkthroughs/drying-room-water-load/sheet.png, recorded 2026-10-15T21:35)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "One item" (wrong); tapped Whole load; slid Count to 6; opened reveal.

1. **The prediction is a giveaway.** "Which number describes water released by all items? One item / Whole load / Same outcome." The question says "all items". This is reading, not belief.
2. **Where it first broke: the picture.** A box inside a box with a tab on top. I could not tell if it was a window, a clothes horse or a room. It changes only by getting a white border.
3. **The surprising part is missing.** The lesson's title ("The water goes somewhere") hints at the thing I do not know: a load of washing puts roughly a litre or more of water into the room. That should be the prediction ("How much water does a load put into the air? A cupful / about a litre / a bucket"). Instead the number appears after a trivially correct choice. "30m³ room" is shown and never used.
4. **The reveal is half caveats.** Two sentences say this is not a humidity forecast. Then the last line gives the practical advice (window or vent; damp and mould), which is the payoff and the best sentence in the lesson. It is a factual and safety claim; I trust it, but it should be checked.
5. **Reveal versus my question.** My question after the explore ("is 1.5kg of water a lot for a room?") is not answered; the lesson refuses to connect the number to the room it displays.

Fixes (for the builder):
- Make the amount of water the prediction, in kitchen units (a 1.5 litre bottle).
- Either use the 30m³ room (what that water does to it) or remove it; replace the abstract box with clothes on a rack.

Verdict reason: the prediction is answered by its own wording, and the surprising quantity the title promises is never the thing the learner has to guess.

## After reading the brief (meta.json)

- Version is v2. The mould/ventilation sentence is recorded as claim c6 and marked verified; good.
- The recall in meta uses 300 g per item (6 x 300 = 1800 g) while the stage uses 250 g; fine as a transfer question if intended, but the learner will notice the per-item number changed without a reason.
- Fix route: demo-builder (prediction about the amount; use or drop the 30 m3 room).
