### 2026-10-16 · algorithms-200-renderer · demo-builder
- did: Implemented bounded algorithm trace types, shared row/graph stage, immutable question-case witness, opt-in validator/materializer and focused tests.
- learned: Run must synchronously complete case zero; Step may witness only its final frame; Reset keeps Seen proof (src/components/algorithms/AlgorithmState.ts).
- know: Each wrapper must directly render Lesson and Control for the existing source checker; the materializer preserves that contract (tools/materialize-algorithms-200.mjs).
- open: Full integration/browser review and independent claims checks remain before promotion (tools/algorithms-200-check.mjs).
