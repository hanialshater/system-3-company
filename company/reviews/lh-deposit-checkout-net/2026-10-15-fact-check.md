# Fact-check: lh-deposit-checkout-net

Independent claim checks for src/demos/lifehacks/lh-deposit-checkout-net. Newest pass at the bottom.


## Pass 51 (2026-10-15, W-1101)

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of the claims I verify here. Scope: the claims demo-builder reset in v2 (merge d20a39a, branch lh-res, fix plan W6/W7: TP-7 plain-words stage, TP-8 answer positions), plus this lesson's W-1078 trust-sheet row. Method: I read the rendering code first (Demo.tsx, src/components/lifehacks/ResourceLesson.tsx, src/lib/lifehacks/resource-model.ts with this lesson's `display: "plain"` spec in resource-specs.json), then ran a copy of resource-model.ts in node (scratchpad fc51/dump.mts) to print every card value, readout, slider text, assumptions line and reveal sentence at the start, the slider ends and the A/B crossings. The same dump listed the claim texts beside the stage output; I read the claim sources and build.md only after that. No build, server or screenshot. Every claim here is a derivation from declared fictional inputs; no outside source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own run: at 4 containers A = 4 × 2.40 = €9.60, B = 4 × 2.65 = €10.60; readouts '4 × €2.40, deposits refunded' / '4 × (€2.40 + €0.25 deposit)'. |
| c5 | verified | The hook is a question; on the stage the checkout is higher (€10.60) and the after-return amount equals the no-deposit price (€9.60). No other assertion. |
| c6 | verified | At the stage start the total deposit is 4 × €0.25 = €1.00 (€10.60 − €9.60), so the question's '€1 deposit' is the stage's number. Refunded in full, the net cost equals no deposit (spec index 0); '€1 more' is the checkout moment. |

**W-1078 (trust sheet matches the stage):** closed. c4 recall ten items: €26.50 at checkout, €24.00 after return; 10 is the slider maximum and the cards show those amounts.

**Result (Pass 51):** 3 verified, 0 disputed, 0 withdrawn.
