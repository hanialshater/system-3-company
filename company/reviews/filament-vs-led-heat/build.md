# Build note: filament-vs-led-heat

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: one stacked bar on a 0-60 W scale, light (yellow) and heat (red), with the 60 W input outlined dashed, so the LED's whole input visibly fits inside the filament's light-plus-a-sliver. Heat squiggles above the bulb scale with its heat (one per 10 W). The split is hidden until the prediction ("60 W in: light + heat = ?").
- Departure from the brief: the brief's question gave "5% into light" and then asked for the heat, which is arithmetic, not a prediction. The question now asks how much of the 60 W comes out as heat without giving the 5%; options unchanged (3 / 30 / 57 W). The 5% appears on the stage after the prediction.
- Earned reveal: milestone 'led'. The filament is the starting bulb (its button disabled), so QA's one press swaps to the LED. The reveal quotes the filament split (3 W / 57 W, seen on unlock) and the LED split (3 W / 6 W).
- Numbers (node): 60 x 0.05 = 3 W light, 57 W heat; LED 9 - 3 = 6 W heat, 3/9 = 33%; 9/60 = 0.15 (< 1/6).
- Risk for the fact-checker: c3 and c4 are typical estimates the brief asked to have sourced (US DOE or manufacturer data); they are labelled "Typical figures" on the stage. The 5% is a radiant visible share, which differs from the eye-weighted luminous efficiency (about 2%) often quoted.
- After screenshots: moved the heat label above the bar so it no longer overlaps the light label on the short LED bar.
