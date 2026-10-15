# Build notes: lh-standby-days-add-up

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "A 2 W standby all year. About how much energy?" options ['Almost nothing', '17.5 kWh'], answer index 1 ("17.5 kWh").
- Hook: "A 2 W standby all year. About how much energy?". Title: "A tiny load accumulates".
- Claims reset to unverified (fact-checker re-verifies): c1, c2, c7.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.
