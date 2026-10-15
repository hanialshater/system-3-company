# Build notes: lh-around-versus-across

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "A 3×4 m room. Corner to corner is how far?" options ['7 m: along two walls', '5 m', '3.5 m'], answer index 1 ("5 m").
- Hook: "A 3×4 m room. Corner to corner is how far?". Title: "Around is not across".
- Claims reset to unverified (fact-checker re-verifies): c2, c3, c5.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
