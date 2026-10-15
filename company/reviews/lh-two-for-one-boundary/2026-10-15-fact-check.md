# Fact-check: lh-two-for-one-boundary

Independent claim checks for src/demos/lifehacks/lh-two-for-one-boundary. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 3 items A = 3 × 3 = €9.00, B = 4 × ceil(1.5) = €8.00; readout B '4 × (3 ÷ 2 = 1.5, rounded up to 2 whole pairs)' (no ceil on screen). Note for demo-builder: at 1 or 2 items it reads '1 whole pairs'. |
| c3 | verified | ceil(3/2) = 2 pairs = €8; ceil(1/2) = 1 pair = €4 (stage at Items 1); even counts cost €2 per item (4 × n/2), odd counts do not. |
| c5 | verified | Pairs-only: 3 items → 2 pairs → €8 (spec index 1); €6 is half the pair price per item, €12 is €4 per item. Note for cm-lifehacks: a mixed purchase (one pair + one €3 single = €7) is cheaper and not modelled; €8 rests on the stage's 'pair-only purchase' assumption, which the question does not state. Not an option, so no learner is marked wrong. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall five items pairs-only = 3 pairs = €12; 5 is a stop and card B shows €12.00.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
