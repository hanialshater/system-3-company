# Build note: shrink-toward-zero

- Intent: one number line with the truth (0.5, dashed), 40 sample estimates (c × average) and their centre. Controls in order: A ×1 (start), B ×0.5, ×0.2, shrink-factor slider 0–1 step 0.05. Readouts: bias, spread, long-run squared error (exact formula, not the 40 dots). Caption defines bias and spread on the stage.
- Key states (milestones): "half" (c = 0.5) and "too-far" (c ≤ 0.3). QA path: ×0.5, ×0.2, slider (→ 0.3).
- Brief's key state said the error rises "below ~0.6"; in this setup the optimum is exactly 0.5 (μ²/(μ² + σ²/n)), so the "too far" state is ≤ 0.3 (×0.2: 0.170 vs 0.125 at ×0.5).
- Node check: mse(1) = 0.25, mse(0.5) = 0.125, mse(0.2) = 0.17, mse(0.6) = 0.13.
- Dots: mulberry32(1), Box-Muller, untuned; illustration of spread only (c4).
