# Fact-check: three-sticks-one-triangle v1

checker: fact-checker · date: 2026-10-22 · lesson version: v1
Read first: artifacts/walkthroughs/three-sticks-one-triangle/transcript.md and sheet.png, then meta.json claims, Demo.tsx (geometry) and brief company/domains/briefs/math.geometry.md #3. build.md and design.md not read.

Verdict: **pass**.

| Claim | New status | Basis |
|---|---|---|
| math.three-sticks-one-triangle.c1 (a ≤ b ≤ c form a triangle exactly when a + b > c) | verified | Euclid I.20 gives the inequality; the converse (I.22, or the law of cosines) holds because a + b > c gives \|x\| < a for x = (c² + a² − b²) ÷ 2c, so a real apex exists. Equality gives height 0. The source cites I.20 only; I.22 is the converse (not a defect). |
| math.three-sticks-one-triangle.c2 (2,3,6 never closer than 1 cm; 3,4,6 close; 2,4,6 flat only; recall) | verified | The free ends lie on circles of radius 2 about (0,0) and radius 3 about (6,0). The centres are 6 apart, more than 2 + 3 = 5, so the gap is ≥ 1 cm at **any** angles, not just equal ones. A brute-force grid over both angles (1° steps, −180° to 180°) gives a minimum of 1.000. With equal angles the gap rises steadily from 0° to 90° (1.000, 1.743, 2.564, 3.606, 6.083), so "raising them only widened it" holds. For 3,4,6 the apex is at x = 29/12 and h = 1.778, with angles 36.3° and 26.4°. For 2,4,6, h = 0. Recall: 1 + 2 < 4, 2 + 3 > 4 and 2 + 2 = 4 (flat only), so only 2,3,4 makes a triangle. |
| math.three-sticks-one-triangle.c3 (45° → 2.6 cm, 60° → 3.6 cm) | verified | Recomputed 2.5639 and 3.6056. These match the walkthrough readouts and chip traces. |

## Stage checked against the claims

- The drawing uses one scale (50 px per cm, base 300 px). The screenshots show the sticks at the stated angles, the 3,4,6 triangle filled with its apex left of centre (x ≈ 2.4), and 2,4,6 lying on the base.
- The hook and the predict text ("tilt … however you like") make a claim about all angles. c2 covers it through the any-angle bound above.
- No unrecorded learner-visible factual sentences in the hook, predict, explore hint, reveal or recall.

No findings.
