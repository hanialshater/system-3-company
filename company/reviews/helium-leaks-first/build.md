# Build note: helium-leaks-first

builder: demo-builder (sonnet build, EXP-003) · 2026-10-13

- Retitled "Which gas leaks fastest?" (the slug says helium; the title does not).
- Real simulation, not a drawn ratio: 20,000 non-colliding particles in a 2-D box, normal velocity components with spread proportional to 1/sqrt(mass), a fixed window, count crossings of the pinhole. The 36 arrows shown are the first 36 particles of the same run (arrow length = speed).
- Seeds are 100 + gas index, taken as first tried; helium:nitrogen came out at 1,166 : 441 (2.64). Other seeds I tried gave 2.6 to 2.9; disclosed in claim c4.
- Milestones: He run, N2 run. Counts and the readout are "?" until a gas is run and while locked. Neon and argon are extras, not quoted in the reveal.
- Brief said "hundred shots" and no slider; this uses buttons only and a counter.
