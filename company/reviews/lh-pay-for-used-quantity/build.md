# Build notes: lh-pay-for-used-quantity

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "Singles cost €0.50 each. A ten-pack costs €4. Unused pieces receive zero value in this model. If five pieces are used, which cost per used piece is lower?" options ['Singles', 'Ten-pack', 'Equal'], answer index 0 ("Singles").
- Hook: "Singles at €0.50 or a ten-pack for €4: which costs less per piece you use?". Title: "Price per item you actually use".
- Claims reset to unverified (fact-checker re-verifies): c2, c5.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
