# Build notes: lh-small-leak-large-duration

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "A tap drips 5 mL a minute. Per day, about how much?" options ['0.3 L', '7 L', '70 L'], answer index 1 ("7 L").
- Hook: "A tap drips 5 mL a minute. Per day, about how much?". Title: "Small flow, long duration".
- Claims reset to unverified (fact-checker re-verifies): c2, c5.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
