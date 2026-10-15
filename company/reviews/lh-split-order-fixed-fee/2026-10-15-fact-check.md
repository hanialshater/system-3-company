# Fact-check: lh-split-order-fixed-fee

Independent claim checks for src/demos/lifehacks/lh-split-order-fixed-fee. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 2 orders A = 24 + 4 × 2 = €32.00, B = 24 + 4 × 1 = €28.00; readouts '24 + (4 × 2)' / '24 + (4 × 1)'. The receipts print 'Goods €24.00', one 'Fee €4.00' line per order (2 and 1 at the start, up to 6) and the total. Note: this receipt prints exact amounts, so the claim's fixed-scale sentence describes no picture in this lesson; harmless, but the builder may trim it. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall three orders vs one: +€8; at 3 orders the cards show €36.00 and €28.00.

**Unrecorded learner-visible text, now recorded as unverified** (I wrote these entries, so I may not verify them; a different fact-checker must):
- c5, the hook 'The same goods can produce different totals when a fee repeats.' My own reading, for the next checker to redo: at Orders 2 the same €24 goods total €32.00 split vs €28.00 combined, so it holds in the model.
- c6, the prediction (question, options, answer index 1 'Combined'). My own reading: 24 + 4 × 2 = €32 vs 24 + 4 = €28; combined is lower.

**Result (Pass 51):** 1 verified, 0 disputed, 0 withdrawn, 2 newly recorded unverified.
