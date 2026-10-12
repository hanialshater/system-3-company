# Build note: moon-hammer-feather

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: side-by-side fall with 0.2 s freeze frames and level lines; air is an imagined toggle (Moon g, Earth-like air) so g stays fixed and only air changes. RK4 with quadratic drag; drag values are illustrative and labelled so in claims.
- Earned reveal: unlocks only when an airless drop has landed.
- After screenshots: objects were drawn with their reference point mid-body, so they sank through the floor at landing and the '1.5 m' label was struck through by the release line; objects now rest on their lowest point and the label sits above the line. Fixed a landing-time interpolation bug found by the check script (1.3617 vs 1.3608 s).
