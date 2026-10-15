*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): garment-overlap-hides-face
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Overlap hides the contacting regions from surrounding air. Separating the illustrated sheets restores those regions, although the total amount of cloth stays the same.)
Screenshots seen: yes (artifacts/walkthroughs/garment-overlap-hides-face/sheet.png, recorded 2026-10-15T21:32:28.000Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Overlapped"; tapped Separate; slid Overlap 30 -> 32; opened reveal.

1. **Where understanding first broke: the overlapped number is never shown.** I saw 24,000 cm² for Separate, but never the overlapped value (it should be 24,000 - 2×30×60 = 20,400 cm²). The question is "which exposes more", so without the second number the comparison is in my head only.
2. **The slider does nothing in the state I am in.** On Separate, I moved Overlap to 32 cm; the readout stayed 24,000 cm² and the small label says "overlap=0cm" while the slider says 32 cm. That reads as broken.
3. **The Separate drawing is misleading.** The two sheets are drawn different sizes (one wide, one narrow) although the label says both are 100×60 cm. It looks as if the second sheet was cut, not moved.
4. **The prediction is too easy.** "Overlapped exposes more area" is not a belief a beginner holds; the interesting belief is "same cloth, same drying", which is the "Same outcome" option. The lesson would land if it showed why "Same outcome" is wrong with numbers.
5. Reveal sentence is clear ("total amount of cloth stays the same") and the hedge ("no universal time saving is claimed") is honest.
6. Recall card uses 20 cm overlap (2 × 20 × 60 = 2400); the stage used 30. Button highlight stuck on "Overlapped" after tapping Separate.

Verdict reason: the overlapped area is never displayed and the Overlap slider is inert on Separate, so the stage cannot show the hidden area the lesson is about.

## After reading the brief (meta.json)

- Objective is the reveal sentence. "Total amount of cloth stays the same" is never paired on stage with a lower exposed-area number (finding 1), so the contrast is told, not shown.
- Claim c3 says "contact hides 2×overlap×60": the stage never displays that hidden area. Recall card uses 20 cm overlap vs the stage's 30 cm; route to fact-checker.
- Fix route: demo-builder (show overlapped area; make the slider act or hide it on Separate; draw equal sheets).
