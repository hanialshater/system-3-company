*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): towel-thickness-hidden-volume
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Doubling thickness at the same width and length doubles material volume while keeping the two large face areas fixed. The area-to-volume ratio therefore halves.)
Screenshots seen: yes (artifacts/walkthroughs/towel-thickness-hidden-volume/sheet.png, recorded 2026-10-15T21:35, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Thin sheet"; tapped Double thickness; slid Thickness from 2 to 2.2 mm; opened reveal.

1. **Where understanding first broke: the question itself.** "Which sheet has less face area per material volume?" is a ratio question in technical words. As an adult beginner I had to reread it twice, and "cm⁻¹" (per centimetre) as a unit is past my boundary. I could not have a gut feeling about it, so my prediction was a coin toss.
2. **I never saw the thin sheet's number.** Double thickness gives 5 cm⁻¹ (4.55 at 2.2 mm). The thin sheet's 10 cm⁻¹ stayed "?" because the panel sent me to "the second layout" only. "The ratio therefore halves" needs both numbers on screen.
3. **The picture barely changes.** The double-thickness slab looks almost the same as the thin one, with the same four arrows on top.
4. **The slider is confusing.** It reads "Thickness 2.2mm" while the label underneath says "thickness=4.4mm", because the slider sets the thin sheet and the mode doubles it. I had to work that out.
5. **What it is for is unclear.** The title talks about cloth, but the reveal ends "this geometric ratio alone does not determine a fabric's drying time", so I am left without a practical reason to care.
6. **The selected button looks reversed.**

Fixes (for the builder):
- Ask in everyday terms ("Which towel has more surface for each bit of fabric?") and show both ratios side by side (10 vs 5).
- Draw the double sheet visibly twice as thick.
- Say in one line what the ratio is useful for, within the claims.

Verdict reason: the question is posed as an abstract ratio with a unit past the boundary, and only one of the two values ever appears, so "the ratio halves" is told rather than seen.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, picture, selected-button look, plain wording); Life Hacks category manager for whether the brief names a real beginner belief.
