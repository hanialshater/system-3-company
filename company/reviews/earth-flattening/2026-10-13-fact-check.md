# Fact-check: earth-flattening (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: WGS84 a=6378.137, f=1/298.257223563 gives b=6356.752, 2(a-b)=42.77 km (43), f=0.335% (0.34%). WGS84 constants are the defining values (known standard; search could not open NGA but figures agree with all secondary sources). |
| c2 | verified | node: 300 mm*f=1.006 mm; US dime 1.35 mm and euro 1 cent 1.67 mm are thicker. |
| c3 | verified | node: a-b=21.38 km. |
| c4 | verified | node: Chimborazo (1.469 S, 6,263 m) 6384.39 km, Everest (27.988 N, 8,849 m) 6382.31 km. Search confirms Wikipedia/Guinness/NOAA give 6,384.4 vs 6,382.3 km (NOAA says Chimborazo is about 2 km farther; the exact margin varies by source, the ranking does not). |
| c5 | verified | Any visibly elliptical outline has flattening far above 0.34% (0.3 px at the stage's scale); statement is about the diagrams, not a survey. |
