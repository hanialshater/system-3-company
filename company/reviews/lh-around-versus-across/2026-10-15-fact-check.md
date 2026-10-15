# Fact-check: lh-around-versus-across

Independent claim checks for src/demos/lifehacks/lh-around-versus-across. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at Width 4 m A = 2 × (4 + 3) = 14 m, B = sqrt(16 + 9) = 5 m; readouts '2 × (4 + 3)' and 'corner to corner: 5 × 5 = 4 × 4 + 3 × 3' (no sqrt on screen). Geometry picture: rectangle width x × 10 px, height 30 px (3 m), diagonal drawn corner to corner. Note for demo-builder: at non-integer diagonals the readout prints rounded values with '=' (e.g. Width 1: '3.162 × 3.162 = 1 × 1 + 3 × 3', where 3.162² = 9.998). |
| c3 | verified | 2 × (4 + 3) = 14; 4 + 3 = 7; 5 × 5 = 25 = 16 + 9. All match the stage at its only width (4 m) where these numbers apply, which is the start. |
| c5 | verified | 3 × 4 m room: stage is 4 m wide, 3 m high (fixed). Diagonal 5 m; 7 m is along two walls (4 + 3); options and spec answer index 1 = '5 m' match. |

**W-1078 (trust sheet matches the stage):** still open. c4 recall is an 8 × 6 m rectangle (diagonal 10 m, perimeter 28 m). The stage's height is fixed at 3 m, so 6 m cannot be set; at width 8 the stage gives 22 m and 8.544 m. The recall arithmetic is true and stays verified; the row clears when the recall uses the stage's fixture (demo-builder, recall text from learning-designer or cm-lifehacks), then a fact-checker re-verifies c4.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
