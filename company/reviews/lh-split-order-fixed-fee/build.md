# Build notes: lh-split-order-fixed-fee

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "The same goods total €24. Each order adds a fictional €4 delivery fee. For two separate orders, which receipt is lower?" options ['Split', 'Combined', 'Equal'], answer index 1 ("Combined").
- Hook: "The same goods can produce different totals when a fee repeats.". Title: "One fixed fee per order".
- Claims reset to unverified (fact-checker re-verifies): c2.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
