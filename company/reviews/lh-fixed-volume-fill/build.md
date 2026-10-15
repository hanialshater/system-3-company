# Build notes: lh-fixed-volume-fill

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "Filling a 10 L bucket slowly or fast. Which uses less water?" options ['Slow', 'Same: 10 L either way'], answer index 1 ("Same: 10 L either way").
- Hook: "Filling a 10 L bucket slowly or fast. Which uses less water?". Title: "Does a slower tap save water?".
- Claims reset to unverified (fact-checker re-verifies): c2, c5, c6.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
