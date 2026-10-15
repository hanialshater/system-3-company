# Fact-check: lh-pay-for-used-quantity

Independent claim checks for src/demos/lifehacks/lh-pay-for-used-quantity. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 5 used A = €0.50, B = 4 / min(5, 10) = €0.80, shown '€0.50/used' / '€0.80/used'; readouts '€0.50 for each single' / '€4 ÷ 5 pieces used' (no min on screen). Note for demo-builder: at 1 used the readout reads '1 pieces used'. |
| c5 | verified | The hook is a question; €0.50 singles and a €4 ten-pack are the stage's numbers. Answer depends on pieces used (pack higher below 8, equal at 8, lower above), which the slider shows. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall 8 used → €4 ÷ 8 = €0.50; 8 is a stop and card B shows €0.50/used there.

**Unrecorded learner-visible text, now recorded as unverified** (I wrote these entries, so I may not verify them; a different fact-checker must):
- c6, the prediction (question, options, answer index 0 'Singles'). My own reading: at 5 used €0.50 vs €4 ÷ 5 = €0.80; singles lower.

**Result (Pass 51):** 2 verified, 0 disputed, 0 withdrawn, 1 newly recorded unverified.
