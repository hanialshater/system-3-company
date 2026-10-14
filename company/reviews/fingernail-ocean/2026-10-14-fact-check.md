# Fact-check: fingernail-ocean (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v4 first ('Run to 3,000 km', +1/+10/+100 million years up to 300, 'Back to today', the caption that hides the conversion while locked, readouts, Seen line kept after Back to today, reveal; hook and recall), then claim text and support, then source fields. Re-ran the arithmetic in node.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: TARGET_MYR = 3000 x 1e5 cm / 2.5 cm/yr / 1e6 = 120 exactly (so v === TARGET_MYR fires both from the Run button and from 100 + 10 + 10 steps); gapKm(1) = 25 km; gapKm(120) = 3,000. Caption code adds ' = 25 km per million years' only when not locked. Reveal: '120 million years', 3,000 km = 300 million cm. |
| c5 | verified | Convention, consistent with code: the shift is geoRotation([-shiftDeg, 0]), a rotation about the Earth's axis, so every point moves along its parallel (due west) by rate x time measured at 10°S; the rate is a constant. The caption reads 'Toy: South America rides its plate west at 2.5 cm a year'; the file header says 'A toy, not a plate model'. |

**Result:** both open claims verified. No disputes.
