# Fact-check: lh-fixed-volume-fill

Independent claim checks for src/demos/lifehacks/lh-fixed-volume-fill. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at Bucket 10 L A = 10/5 = 2 min, B = 10/2.5 = 4 min, shown '2 min' / '4 min'; readouts '10 L at 5 L a minute' / '10 L at 2.5 L a minute'. Water timer picture: arc = value / fixed scale (max 8 min over 1-20 L). |
| c5 | verified | Hook scenario (10 L bucket, two flow rates) is the stage start; both cards deliver the same 10 L. No other assertion. |
| c6 | verified | Title and question are questions. Answer 'Same: 10 L either way' (spec index 1) follows from the fixed-volume, no-spill model: both readouts name 10 L; only the time differs (2 vs 4 min). |

**W-1078 (trust sheet matches the stage):** still open. c4 recall uses 4 and 2 L/min (6 vs 3 min for 12 L). The stage's rates are 5 and 2.5 L/min; at 12 L it shows 2.4 and 4.8 min. The recall arithmetic is true and stays verified; the row clears when the recall uses the stage's fixture (demo-builder, recall text from learning-designer or cm-lifehacks), then a fact-checker re-verifies c4.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
