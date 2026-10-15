*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): packing-cube-walls
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Container walls consume some of its external volume. Multiplying the outer dimensions counts material as storage; subtracting both walls in each direction gives the ideal inner capacity.)
Screenshots seen: yes (artifacts/walkthroughs/packing-cube-walls/sheet.png, recorded 2026-10-15T21:32)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Outer volume"; after lock-in the stage showed Outer volume 6,000 cm³; tapped Usable volume (4,032 cm³); slid outer width to 32 (4,320 cm³); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build: it reads "Outer volume 6,000cm³".)

1. **The contrast lands, one number at a time.** 6,000 cm³ outside against 4,032 cm³ inside is a clear "a third of my cube is wall and air" moment, and the inner rectangle shrinking in the drawing helps. The reveal sentence "Multiplying the outer dimensions counts material as storage" answers the question I had ("why is my cube smaller than its label?").
2. **Where I wobbled: which button is selected.** The current mode is drawn grey and the other mode is drawn white/raised. After I tapped "Usable volume", "Outer volume" looked selected. The readout label ("Usable volume") rescued me, but I had to look twice. This pattern recurs across this lesson family.
3. **The reveal only restates the current number** ("The current usable volume setting gives 4,320cm³"). Putting 6,000 next to 4,032 (or 6,400 next to 4,320) in the reveal sentence would close the loop.
4. "Same outcome" is an odd third option for "which figure describes space available".
5. The seams/zips caveat is good and honest.

Notes (not blocking):
- Show both figures in the reveal sentence.
- Selected-state styling: the current choice should look chosen (kit or shared control, not this lesson alone).

Verdict reason: the learner sees outer vs usable volume on stage and the reveal explains the gap; the remaining issues are clarity notes.

## After reading the brief (meta.json)

- The objective (walls consume external volume; subtract both walls in each direction) is delivered by the 6,000 → 4,032 cm³ step. The trust sheet's worked example (28 × 18 × 8 = 4032 vs 6000) matches the stage at 30 cm.
- Correction to my first draft: the outer figure (6,000 cm³) does show right after lock-in. The recorded sheet skips that state, and I confirmed it with a browser probe.
- Selected-state styling (current mode grey, other white) appears in every toggle lesson in this family. Route: demo-builder / kit owner.
