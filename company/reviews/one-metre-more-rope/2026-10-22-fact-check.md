# Fact-check: one-metre-more-rope v1

checker: fact-checker · date: 2026-10-22 · lesson version: v1
Read first: artifacts/walkthroughs/one-metre-more-rope/transcript.md and sheet.png, then meta.json claims, Demo.tsx (rendering and arithmetic), and brief company/domains/briefs/math.geometry.md #1. build.md and design.md not read.

Verdict: **revise** (c4 disputed).

| Claim | New status | Basis |
|---|---|---|
| math.one-metre-more-rope.c1 (circumference = 2πr) | verified | Definition: π = C ÷ d, d = 2r. |
| math.one-metre-more-rope.c2 (L ÷ 2π, 15.9 cm for ball/wheel/Earth; 2 m → ~32 cm) | verified | Re-derived (2πr + L) ÷ 2π = r + L ÷ 2π. Recomputed in node: gap = 0.159155 m for r = 0.11, 0.35 and 6,378,137 m, rounds to 15.9 cm; 2 ÷ 2π = 0.3183 m ≈ 32 cm. Demo.tsx computes `gapOf(r)` from the circle, not a constant. |
| math.one-metre-more-rope.c3 (Earth's equatorial radius ≈ 6,378 km) | verified | WGS 84 semi-major axis a = 6,378,137 m (EPSG registry, ellipsoid 7030 / WGS 84 realisations, citing NIMA TR8350.2 3rd ed. amd. 1, Jan 2000). NGA's primary PDF was not reached through the proxy; EPSG is the registry of record for the parameter. |
| math.one-metre-more-rope.c4 ("enough for a cat to crawl under") | disputed | See finding 1. |

## Stage checked against the claims (what the picture asserts)

- Zoom window is drawn at one scale (5 px per cm, 20 cm ruler = 100 px) for every circle; the ball (55 px radius) and wheel (175 px) arcs and the lifted rope (+79.6 px) are true to that scale in the screenshots.
- Earth drawn flat: the true sag across the 68 cm window is 0.34² ÷ (2 × 6,378,137) ≈ 9 × 10⁻⁹ m, far below a pixel. Honest.
- The corner icon draws the same lifted ring for all three circles; it is a schematic with no scale and makes no numeric claim. No finding.
- Readouts and chip traces ("gap 15.9 cm", "✓ 15.9 cm") match c2. Reset returns to 0.0 cm on the ball, consistent with the initial state.

## Findings (by class)

**Class A: claim not supported by its stated support/source (1 instance)**
1. c4 "A 15.9 cm gap is enough for a cat to crawl under" → support is `convention` and the source is "Illustrative comparison, not measured", so the trust sheet tells the learner it "rests on a definition or convention", which is false: it is an empirical claim about cats. The one study found (Pongrácz 2024, iScience, 30 cats, in-home openings) reports a mean height of 19.61 cm lying in sphinx posture and 27.97 cm at the withers, and cats hesitated at openings lower than withers height. So an average cat lying down is taller than the 15.9 cm gap; "crawl under" is not shown and may be false. → Required: cut ", enough for a cat to crawl under" from the reveal and withdraw c4 (the brief allows this; the reveal stands without it), **or** replace it with a comparison backed by a cited measurement, support `source`.

**Class B: claim scope narrower than what the learner sees (1 instance, minor)**
2. The recall uses a **running track**, which is not a circle (two straights plus two semicircles), and its "why" says the metre adds 1 ÷ 2π "to the radius of any circle … however big the track". c2 covers only circles. The ~32 cm answer is still correct for a track lifted evenly (the straights keep their length; the two semicircles together gain 2πd, so d = L ÷ 2π), but no claim states it. → Required: either make the recall object a circle (e.g. a round pond or a roundabout), or extend c2 (or add a claim) to cover an evenly lifted track/any convex loop, with the derivation above. A changed c2 goes back to `unverified`.

No other unrecorded learner-visible factual sentences found (hook, predict text, explore hint, reveal and recall checked).
