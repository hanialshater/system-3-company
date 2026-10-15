# Build notes: lh-water-meter-units

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "The meter moved 1.5 m³. How many litres is that?" options ['15', '150', '1500'], answer index 2 ("1500").
- Hook: "The meter moved 1.5 m³. How many litres is that?". Title: "Litres and cubic metres".
- Claims reset to unverified (fact-checker re-verifies): c2, c5.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
