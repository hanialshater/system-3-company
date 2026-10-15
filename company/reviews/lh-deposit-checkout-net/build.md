# Build notes: lh-deposit-checkout-net

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "€1 deposit, refunded in full. Net cost?" options ['Equal to no deposit', '€1 more'], answer index 0 ("Equal to no deposit").
- Hook: "You pay a deposit at checkout. Does it cost you anything?". Title: "Checkout cost versus net cost".
- Claims reset to unverified (fact-checker re-verifies): c2, c5, c6.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
