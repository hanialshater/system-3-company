### 2026-10-17 · w1612-tricolour-v2-reveal · design-lead
- did: W-1612 ruling on tricolour-check v2 reveal crop: accepted 77 px at 360x740 and 149 px at 360x640; tested reveal-time board caps 254 and 205 px on a main build
- learned: A reveal-only override needs a row-gone selector: wrap:not(:has(controls)) board, with hashed class names from the built CSS (company/design/reviews/2026-10-17-tricolour-check-v2-reveal.md)
- know: Zero reveal crop at 360x740 needs a 205 px board = 8.1 px stage text, under the 10 px floor; floor cap 254 only trims 77 to 49 (company/design/reviews/2026-10-17-tricolour-check-v2-reveal.md)
- know: S4 override numbers predicted v2 exactly; when an S4 fix leaves a crop, rule on it by name in the S4 record to avoid a second round (company/design/reviews/2026-10-16-tricolour-check-s4.md)
- open: W-1612 closes against the ruling; QA findings 3-4 to demo-builder (company/reviews/tricolour-check/2026-10-17-qa-v2.md)
