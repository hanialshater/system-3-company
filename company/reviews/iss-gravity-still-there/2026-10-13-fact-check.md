# Fact-check: iss-gravity-still-there (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Inverse-square gravity for a spherical Earth. |
| c2 | verified | node: 88.53, 25.00, 5.75, 2.28 percent; stage prints 88.5, 25.0, 5.7, 2.3. |
| c3 | verified | ISS about 400 km (NASA), GPS about 20,200 km (GPS.gov), geostationary 35,786 km; node: cube root of GM T^2/4pi^2 = 42,164 km minus 6,378 km = 35,786 km. |
| c4 | verified | Free-fall explanation of weightlessness in orbit (NASA microgravity explanation). |
| c5 | verified | node: 400/6371=6.3%. |
| c6 | verified | Stage chip 'To scale. Round Earth, spin ignored.'; equatorial-to-polar g difference is about 0.5%. |
