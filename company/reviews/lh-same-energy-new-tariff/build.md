# Build notes: lh-same-energy-new-tariff

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "Moving to a cheaper tariff: do you use less energy?" options ['Yes', 'No: same kWh, lower price'], answer index 1 ("No: same kWh, lower price").
- Hook: "Moving to a cheaper tariff: do you use less energy?". Title: "Same energy, different tariff".
- Claims reset to unverified (fact-checker re-verifies): c2, c7.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
