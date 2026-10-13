# Fact-check: honolulu-overhead (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Obliquity about 23.44 degrees; Sun's declination spans +-obliquity; tropics at 23.4 degrees (standard). |
| c2 | verified | Standard coordinates: Honolulu 21.31 N, Miami 25.76 N, Cairo 30.04 N. |
| c3 | verified | node: model days 147 (27 May) and 197 (16 July) at declination 21.31. Real: Bishop Museum Lahaina Noon chart lists Honolulu 26 May and 15-16 July depending on year, so 'about' is right (within a day). |
| c4 | verified | node: model peak day 172 (21 June), declination 23.44. |
| c5 | verified | Noon elevation = 90 - /lat - dec/; below 90 outside the tropics. |
