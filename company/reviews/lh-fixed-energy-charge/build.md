# Build notes: lh-fixed-energy-charge

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "Halve your usage. Does the bill halve?" options ['No: the fixed charge stays', 'Yes'], answer index 0 ("No: the fixed charge stays").
- Hook: "Halve your usage. Does the bill halve?". Title: "The fixed charge changes the bill".
- Claims reset to unverified (fact-checker re-verifies): c2, c7, c8.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
