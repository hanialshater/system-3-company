# Build note: ten-times-links-hundred-times-rarer

builder: ncm-p1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. A chart of share ∝ 1/k² for k = 1 to 1,000 (relative to k = 1), with dots at k = 1, 10, 100 and 1,000. The axis toggle switches between linear axes, where everything past k ≈ 10 hugs zero, and log–log axes, where the curve is a straight line with a "÷100" label on each decade step. The k slider (1, 10, 100, 1,000) moves the highlighted dot. Readouts: share vs k = 1 (1/k²) and "Rarer than k/10: 100×". The readouts and ÷100 labels are hidden until the prediction. It starts on linear axes at k = 100. Controls in DOM order: Log–log axes, Linear axes, k slider. Milestones: loglog, k1000.

## Answers re-run in node
- (1/100²)/(1/1000²) = 100; 10 vs 1,000 = 10,000; log–log slope −2. These match the brief.

## Choices
- Brief claim 3 (web in-links exponent about 2.1, Broder et al. 2000) is kept out of learner text and out of meta claims, as the brief asks, until a human checks the source.
- The y axis on log–log runs 1 to 1/10⁶ with superscript labels so they fit at 390 px.

## Known gaps
- Format: the brief says "Single card (axis toggle)"; interactions lists toggle-before-after for the toggle.
