# Fact-check: antarctica-vs-australia (2026-10-13)

## Pass 7

Checker: fact-checker (did not write these claims; builder-rewritten claims checked as rewritten). Numbers re-derived in node from the lesson's own constants or model.ts.

| Claim | Result | Basis |
|---|---|---|
| c1-c8 | verified | Re-ran the kit's d3-geo code in node on countries-110m.json: Mercator (scale 320/2pi, clip to 320x168) ratio 29.93; Equal Earth 1.589; sphere areas 12.24 and 7.70 million km2. With Australia rotated to centroid 72 S (kit moveToLatitude re-implemented): Equal Earth 1.602 (shows 1.6) and Mercator 3.49. c4: the 110m polygon runs to about 85 S across the Ross embayment (lon -170..-150), so the Ross Ice Shelf is outside the outline; consistent with 12.24 vs 14.2. c5: Geoscience Australia/ABS Year Book 7,692,024 km2; Antarctica 14.2 million km2 (CIA Factbook current edition, Wikipedia, Australian Army KYR; some older Factbook entries say 14 million). 14.2/7.69=1.85, 14.0/7.69=1.82, both 'about 1.8'. Note: the c5 source line should name Geoscience Australia for 7.69, since the Factbook gives Australia 7.74 million. c8 hook is a soft, true description of Mercator-style wall maps. |
