# Fact-check: one-metre-more-rope (v2, second check)

checker: fact-checker · date: 2026-10-22 · read first: artifacts/walkthroughs/one-metre-more-rope/transcript.md and sheet.png, then meta.json claims, Demo.tsx and brief company/domains/briefs/math.geometry.md #1. Builder notes not read.

| Claim | New status | How checked |
|---|---|---|
| math.one-metre-more-rope.c1: rope length round a circle = 2πr | verified | π is defined as circumference ÷ diameter and diameter = 2r, so C = 2πr. |
| math.one-metre-more-rope.c2: adding L raises the radius by L ÷ 2π, whatever r; 1 m → 0.159 m (15.9 cm) for r = 0.11 m, 0.35 m and 6,378 km; 2 m → about 0.318 m (about 32 cm) | verified | (2πr + L)/2π − r = L/2π. Recomputed in node: 0.159155 m for all three radii (the Earth's float error is 1e-10 m); 2/2π = 0.3183 m. `math-wave-j-check.mjs` G1 gives 0.1592 for all three. The stage's gapOf() is this formula, and the display rounds to 15.9 cm. The recall's "about 16 cm" per metre and "about 32 cm" agree. |
| math.one-metre-more-rope.c3: Earth's equatorial radius about 6,378 km | verified | WGS 84 semi-major axis a = 6,378,137 m (NIMA TR8350.2, as cited in the EPSG registry, e.g. epsg.io/4978 and epsg.io/7659), which rounds to 6,378 km. |

## Learner-visible sentences checked for unrecorded claims

- The stage readouts "gap 15.9 cm" / "✓ 15.9 cm" and the chip radii fall under c2 and c3.
- Reveal: "the same 15.9 cm", "adds 1 ÷ 2π, about 0.159 m … whatever the size" and "the Earth's huge radius never enters the sum" fall under c1 and c2.
- Brief claim 4 ("enough for a cat to crawl under") is not in the rendered lesson (it was cut), so no claim is needed.
- The zoom scale is honest: it is drawn at 5 px per cm for every circle. For the Earth, the true sag across the 68 cm window is x²/2R ≈ 9e-9 m, so drawing the ground flat is correct.

## Observation (not a claim defect, advisory)

- The top-left icon draws the rope ring 3 px outside a 20 px circle for every circle. It is a schematic and states nothing, but at true scale the ball's rope would sit at 2.4× its radius and the Earth's would be indistinguishable from the ground. If a later version labels the icon, it must not imply proportion.

Verdict: pass. All 3 claims verified.
