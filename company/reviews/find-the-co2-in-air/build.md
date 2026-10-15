# Build note: find-the-co2-in-air

Builder: demo-builder (wave-i-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.solutions-acids.md` #3. Status draft; every claim unverified.

Departures from the brief: instead of a "zoom ×10" that replaces the grid, a magnifier inset (9×9 cells at 10 px, about ×4.5) sits beside the grid with leader lines to one ringed CO₂, so the four ringed dots, the inset and the counts are all on screen at once. The counts row is a legend in the picture's right column (one line per tapped gas). The grid is 220 px square of 2.2 px cells (untapped texture, drawn as one pattern plus one path per rarer gas). Seed 42 was chosen so the four CO₂ rings sit apart and off the edge (claim c6 discloses it; no count depends on it). The breath line is added under the grid caption rather than swapping the caption.

## Pre-flight v1

1. **Title and hook.** "Find the CO₂ in the air" / "You breathe out carbon dioxide all day. How much of the air around you is it?" No share or count given.
2. **Options.** "about 4", "about 40", "about 400", "about 2,000": all numbered, all "about".
3. **Locked stage.** 10,000 grey dots and the caption "10,000 molecules of dry air". No colour, ring, legend or count.
4. **Reveal values.** "7,808", "2,095", "93", "4": milestone "all-gases" (each count appears in the legend when its chip is tapped). "420 ppm, 0.042%": told context (claim c2), the same share as the legend's 4 per 10,000. "5 × 10¹⁸": milestone "breath" (stage line "One breath, about 0.5 L: about 5 × 10¹⁸ CO₂ molecules").
5. **QA path.** DOM order N₂, O₂, Ar, CO₂ (milestone all-gases at the 4th press), "Magnify one CO₂" (milestone magnified), "One breath" (milestone breath). All 3 by the 6th press. When the reveal opens the legend with four counts, the four rings, the inset and the breath line are on the stage.
6. **Reset.** There is no Reset; chips and "One breath" are one-shot, and "Hide magnifier" only hides the inset. Reveal from the QA-path run: "Of your 10,000 dots, 7,808 were nitrogen, 2,095 oxygen, 93 argon and only 4 carbon dioxide: about 420 parts per million, or 0.042%. A part per million is a share, not an amount. One breath of about half a litre still holds about 5 × 10¹⁸ CO₂ molecules. A tiny share of a huge crowd is still a huge number, which is why trace gases are counted in ppm."
7. **Phone fit.** `node tools/reveal-fit.mjs` at 390×844, 2026-10-14: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, 71 reveal words (tool count, including "Your prediction held."), phoneFit true, picScale 1. Screenshot `artifacts/reveal-fit/find-the-co2-in-air.png`. The reveal points at the four counts and the breath line; all are visible, as are the CO₂ rings. Smallest picture label 10.5 px at scale 1; controls 35 px.

Measured on my own `next dev` of this worktree (port 3547), not on :3530 (main checkout). Stage text about 22 words. No console errors. Not run: next build, computer-use QA, walkthrough.

## Fact-check rewording (W-867 (optional wording, FC38), 2026-10-15, demo-builder)

- Reveal: 'about 420 parts per million, or 0.042%' became 'about 425 parts per million in 2025, or 0.043%' (NOAA GML global annual mean 2025, 425.62 ppm). Breath constant now uses 425e-6 (5.23e18, still shown as 5 × 10¹⁸). The '4 of 10,000' answer is unchanged.
- Claims reset to unverified: c2, c4. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 73 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
