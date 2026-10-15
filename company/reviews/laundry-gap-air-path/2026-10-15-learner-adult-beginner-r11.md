*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): laundry-gap-air-path
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: In this rack drawing, positive separation leaves an open channel. Packing more garments onto the same width eventually removes those channels; the count of gaps shows the trade-off.)
Screenshots seen: yes (artifacts/walkthroughs/laundry-gap-air-path/sheet.png, recorded 2026-10-15T21:34:46.514Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Touching rows"; tapped Spaced rows; slid Rack width 60 -> 62 cm; opened reveal.

1. **No real prediction.** The locked picture already shows five garments pressed together with no gaps, and the question is "which layout leaves clear paths between these items?" Of course the spaced one. The belief worth testing (spacing helps drying; or "I can fit more on if I squeeze") is not what is asked.
2. **Where understanding first broke: the trade-off in the reveal has no control.** The reveal says "packing more garments onto the same width eventually removes those channels; the count of gaps shows the trade-off". But I can only change rack width, not the number of garments, and the gap count is fixed at 4. The trade-off is never playable.
3. **The touching result (0 cm gap, 0 channels) is never shown after unlock.** Only 5 cm and 5.5 cm. Minor here since the picture makes it obvious.
4. The green up-arrows between spaced garments are a nice hint at airflow; the reveal honestly says airflow and drying time are not calculated. That means the lesson cannot tell me whether the gap matters, only that it exists.
5. Recall card uses a 52 cm rack (12 cm over 4 gaps = 3 cm); the stage started at 60 cm. Button highlight stuck on "Touching rows".

Verdict reason: the prediction is answered by the locked picture, and the garments-versus-gaps trade-off the reveal names cannot be explored because garment count is fixed.

## After reading the brief (meta.json)

- doesNotKnow names the trade-off ("packing more garments ... removes those channels; the count of gaps shows the trade-off"), but claim c3 fixes the garment count at 5 and the channel count at 4, so the trade-off has no control on stage (finding 2).
- Recall uses a 52 cm rack; route to fact-checker. Fix route: demo-builder (garment-count slider; show 0 cm/0 channels for touching).
