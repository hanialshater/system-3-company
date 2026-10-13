# Build notes: four-decimals-of-latitude

v1 (2026-10-13, Wave 5 geography, sonnet build, EXP-003). Brief 43 [toy].

- Labelled toy on the stage: a red bar for one step of the last latitude digit, drawn to scale (2.4 px per metre) beside a 105 x 68 m pitch. Bar, readout and reveal numbers come from one function (stepMetres, 111,195 m / 10^d). Node check: 11.12 m, 1.112 m, 0.1112 m.
- Brief's "grid cell" and "house" dropped: a longitude step at 51.5 N is shorter than a latitude step (6.9 m vs 11.1 m), so a square cell would be wrong; and a house size has no source. The bar moves north only, which the stage says.
- Controls are six buttons (1-6 decimals) rather than a slider because QA only gives a slider two arrow presses. Start at 3 so every button changes the stage. Gate: 4, 5 and 6 decimals each visited. Step readout "?" while locked.
- Pitch size and GPS accuracy are from memory (c3, c4), unverified.
