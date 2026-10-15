# Fact-check: lh-coverage-whole-cans

Independent claim checks for src/demos/lifehacks/lh-coverage-whole-cans. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node run of resource-model.ts on the v2 spec: at Area 18.4 m² A = ceil(18.4/8) = 3 and B = 2.3, shown as '3L' / '2.3L'; card A reads '18.4 ÷ 8 = 2.3, rounded up to 3 whole tins', card B '18.4 ÷ 8' (no ceil on screen). 18.4 is a slider stop (4 + 36 × 0.4). Allocation picture: fill = value / resourceGraphicScale (fixed, max over the range). Note for demo-builder: at 4 to 8 m² card A reads 'rounded up to 1 whole tins' (plural). |
| c5 | verified | Hook scenario matches the stage start: 18.4 m² ÷ 8 m² per 1 L tin = 2.3 L = 2.3 tins exact need (card B). No other assertion. |
| c6 | verified | ceil(2.3) = 3; options 2.3 / 2 / 3, spec answer index 2 = '3'; stage card A shows 3L at the start. Note: the stage cards say litres, the hook says tins; the 1 L tin size is only in the trust sheet (c1) and in card A's 'whole tins' readout. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall uses the stage's fixture (8 m² per 1 L tin, whole tins). Its 17 m² lies between slider stops 16.8 and 17.2 (both 3 tins), so a learner can bracket it but not set it exactly.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
