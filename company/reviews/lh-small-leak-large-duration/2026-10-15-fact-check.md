# Fact-check: lh-small-leak-large-duration

Independent claim checks for src/demos/lifehacks/lh-small-leak-large-duration. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 5 mL/min A = 5 × 1440 / 1000 = 7.2 L, B = 5 × 60 / 1000 = 0.3 L; readouts '5 mL × 1,440 minutes in a day' / '5 mL × 60 minutes in an hour'. Note for demo-builder: the readout omits the mL to L step (÷ 1,000), which only the assumptions line states. |
| c5 | verified | 5 mL/min × 1,440 min = 7,200 mL = 7.2 L per day, so 'about 7 L' (spec index 1) is right; 0.3 L is one hour, 70 L is ten times too much. Stage start shows 7.2L. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall 10 mL/min for a day = 14.4 L; 10 mL/min is a stop and card A shows 14.4L there.

**Result (Pass 51):** 2 verified, 0 disputed, 0 withdrawn.
