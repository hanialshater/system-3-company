# Build notes: lh-voucher-minimum

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "€28 basket, €5 off from €30. Add a €2 item: does your bill go down?" options ['Yes, to €25', 'No'], answer index 0 ("Yes, to €25").
- Hook: "€28 basket, €5 off from €30. Add a €2 item: does your bill go down?". Title: "The voucher has a minimum".
- Claims reset to unverified (fact-checker re-verifies): c2, c5.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
