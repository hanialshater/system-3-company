# Fact-check: closer-in-winter (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; Kepler model re-implemented in artifacts/scratch/fc-aiecongeo/orbit.mjs; NASA values checked through a web search of the NASA NSSDCA Earth Fact Sheet (nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html), which lists perihelion 147.095 and aphelion 152.100 million km and obliquity 23.44 degrees. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | NASA fact sheet perihelion 147.095 Mkm (rounds to 147.1); model minimum 147.10 on day 3 (3 Jan). Perihelion falls on 2-5 January in recent years (NASA APOD 4 Jan 2025 'Welcome to Perihelion'); 'early January' is correct. |
| c2 | verified | NASA aphelion 152.100 Mkm; model maximum 152.10 on day 186 (5 Jul). |
| c3 | verified | (152.10 - 147.10) / 149.598 = 3.34%. Reveal rounds to 3%. |
| c4 | verified | Obliquity 23.44 deg (NASA); the model's declination peaks at +23.44 on 21 Jun and -23.44 on 21 Dec; reveal says 'about 23.4' and 'overhead at about 23 N'. |
| c5 | verified | Model declination positive Mar-Sep (northern spring/summer) and negative Sep-Mar; the stage's season() maps opposite seasons by hemisphere. |
| c6 | verified | Orbit drawn at 100/149.598 px per million km: radii 98.3 to 101.7 px; semi-minor/semi-major = 0.99986, visually a circle. Earth's disc not to scale, said on the stage. |
| c7 | verified | Declination is +23.4 deg at the June solstice, i.e. the northern hemisphere is tilted toward the Sun; long days and steep Sun are the standard consequence. The sentence cites NASA Space Place, which I did not open. |

Stage check: monthly mean distance: Jan 147.19, Feb 147.78 ... Jul 152.02, Dec 147.25, so 'January' is the right answer for the closest month. Unrecorded claims: none.
