# Build notes: lh-annual-label-cost

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "The labels say €60 and €105 a year. Over 8 years, the difference between two fridges is?" options ["€45: the label's gap", '€360'], answer index 1 ("€360").
- Hook: "The labels say €60 and €105 a year. Over 8 years, the difference between two fridges is?". Title: "Read the annual-energy number".
- Claims reset to unverified (fact-checker re-verifies): c2, c3, c6.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
