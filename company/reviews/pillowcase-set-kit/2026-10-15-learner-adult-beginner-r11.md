*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): pillowcase-set-kit
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The example counts separate locations, not seconds. Keeping the chosen set’s pieces together replaces multiple location visits with one, while separating unlike sets can preserve identification.)
Screenshots seen: yes (artifacts/walkthroughs/pillowcase-set-kit/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Scattered pieces"; tapped One set kit; slid Locations to 6; opened reveal.

1. **Where understanding first broke: "Set=3 pieces · 4 places".** Three pieces in four places is a puzzle at once. Is one place empty? Is a piece split? Sliding Locations to 6 adds boxes, but with "One set kit" shown the count stays 1. The slider changes nothing I can read, which tells me nothing.
2. **The scattered count never appears.** I predicted "Scattered pieces", and that readout is cut off / "?" in the predict frame. After I switch to the kit, I only ever see "1". The reveal says "Not quite ... one set kit setting gives 1" but never gives the number to compare it with (3).
3. **The toggle highlight is inverted.** After I tapped "One set kit", "Scattered pieces" is the button drawn white/selected, through to the reveal.
4. **The question is nearly self-answering**, and the only surprise the reveal offers is the trade-off sentence ("separating unlike sets can preserve identification"), which the stage never shows.
5. Reveal text is honest that this counts places, not seconds.

Fixes (for the builder):
- Show both counts (3 vs 1) at once and in the reveal.
- Make the slider mean something in both layouts (number of pieces in the set?), or remove it.
- Fix the selected-button highlight.

Verdict reason: the reveal reports only the kit's count (1), never the scattered count the learner chose, and the Locations slider has no visible effect.

## After reading the brief (meta.json)

- The trust sheet's model is "scattered visits = min(locations, 3)". That explains why 4 places for 3 pieces still gives 3, but the stage never says so (finding 1). The "separating unlike sets can preserve identification" half of the objective is not shown on stage at all.
- Fix route: demo-builder.
