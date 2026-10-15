# Fact-check: lh-voucher-minimum

Independent claim checks for src/demos/lifehacks/lh-voucher-minimum. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at €28 A = €28.00, B = 28 − 5 × floor(min(1, 28/30)) = €28.00; readouts '€28 basket' / '€28 − €5 if the basket is €30 or more' (no floor or min on screen). B drops to €25.00 at €30 (slider stop). |
| c5 | verified | €28 + €2 = €30 meets the €30 minimum: €30 − €5 = €25 < €28 (spec index 0, 'Yes, to €25'). Stage at €30 shows B €25.00. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall €29 basket = €29 (below the minimum); €29 is a stop and card B shows €29.00.

**Result (Pass 51):** 2 verified, 0 disputed, 0 withdrawn.
