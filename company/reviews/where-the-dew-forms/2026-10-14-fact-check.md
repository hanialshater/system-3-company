# Fact-check: where-the-dew-forms (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Matches the stage model (vapour = min(E, es(t)), excess shown as dew) and the AMS Glossary definition of dew point (saturation on cooling at constant pressure and water content). Assumes equilibrium (no supersaturation), as the stage does. |

**Result:** all claims in this pass verified; no disputes.

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Convention matches WMO-No. 8 / AMS definition (from memory, not opened; the definition is standard). Demo Fullness = min(1, E/es(t)), shown beside Water and Max readouts; es(30)/es(10) = 3.46 supports 'far more'. |
| c3 | verified | node: es(30) = 4.2367, E = 2.1183 kPa, Td = 18.45 C (toFixed(0) = 18, as stage and reveal print); fullness 0.908 at 20 C, 1.0 at 15 C; 18.45 is in the 20-15 bracket (predict key). |
| c5 | verified | Demo: vapour = min(E, es(t)) stays 2.12 kPa above Td; es falls with t, so Fullness rises to 100% at Td. Minor display note: at 18.5 C the readout rounds 99.7% to 100% while Dew says none. |

**Result:** 3 verified, 0 disputed, 0 withdrawn.
