# Build note: shrink-toward-zero

- Intent: one number line with the truth (0.5, dashed), 40 sample estimates (c × average) and their centre. Controls in order: A ×1 (start), B ×0.5, ×0.2, shrink-factor slider 0–1 step 0.05. Readouts: bias, spread, long-run squared error (exact formula, not the 40 dots). Caption defines bias and spread on the stage.
- Key states (milestones): "half" (c = 0.5) and "too-far" (c ≤ 0.3). QA path: ×0.5, ×0.2, slider (→ 0.3).
- Brief's key state said the error rises "below ~0.6"; in this setup the optimum is exactly 0.5 (μ²/(μ² + σ²/n)), so the "too far" state is ≤ 0.3 (×0.2: 0.170 vs 0.125 at ×0.5).
- Node check: mse(1) = 0.25, mse(0.5) = 0.125, mse(0.2) = 0.17, mse(0.6) = 0.13.
- Dots: mulberry32(1), Box-Muller, untuned; illustration of spread only (c4).

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. A's numbers (bias 0.00, spread 0.50, error 0.250) are now on the stage from the start: readouts are live (no dashes) and the caption states them. The question defines average squared error in a clause. c3 reworded to include that definition, unverified.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
