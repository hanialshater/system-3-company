# Fact-check: lh-water-meter-units

Independent claim checks for src/demos/lifehacks/lh-water-meter-units. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 1,500 L A = 1500/1000 = 1.5 m³, B = 1500 (deliberately wrong), shown '1.5m³' / '1,500m³' (the claim's '1500' is the same number without the thousands comma). Readouts '1,500 L ÷ 1,000 litres in each m³' / 'same digits, unit swapped'. |
| c5 | verified | 1.5 m³ × 1,000 L/m³ = 1,500 L; spec index 2 = '1500'. The stage runs the same pair in the other direction (1,500 L → 1.5 m³) at its start. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall 1,800 L = 1.8 m³; 1,800 L is a stop and card A shows 1.8m³ there.

**Result (Pass 51):** 2 verified, 0 disputed, 0 withdrawn.
