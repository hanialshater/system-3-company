# Fact-check: land-hemisphere (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: rebuilt the 2-degree land mask with geoContains on the kit land polygon (0 of 16,200 cells differ from mask.ts) and searched every 2-degree centre: maximum 47.1% at 42 N, 2 E. Nantes (47 N, 2 W) gives 47.1% too; published land hemisphere is near Nantes, about 47-49%. |
| c2 | verified | node: planet 29.0% land (NOAA/USGS about 29%). |
| c3 | verified | node: Northern Hemisphere 39.5% land (rounds to 40%). |
| c4 | verified | node: minimum 10.9% at 42 S, 178 W, east of New Zealand's North Island. |
