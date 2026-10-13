# Fact-check: current-same-around-loop, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 In a single series loop the same current passes every point: charge ca... | verified | Single series loop: one path, charge conserved at steady state, so same current at every point (Kirchhoff current law). Standard. |
| c2 With a 6 V battery and two 6 ohm bulbs the current is 0.50 A; the batt... | verified | I = V/12: 6 V -> 0.50 A; 1.5 V -> 0.125 A; 12 V -> 1.00 A. Stage readouts 0.88 A (10.5 V), 0.63 A (7.5 V), 1.00 A (12 V) match. |
| c3 Each identical bulb takes half the battery voltage: 3 V each from 6 V.... | verified | 3.0 V per bulb at 6 V (I R = 0.5 x 6). Voltage as energy per charge is the definition. |
| c4 The battery and wires are ideal (no internal resistance) and the bulbs... | verified | Idealisation, correctly described (tungsten filament resistance rises with temperature). |
| c5 The moving dots show the direction of conventional current (out of the... | verified | Conventional current + to -; electron drift opposite in metals. Drift speed 1 A in 1 mm^2 copper = 0.074 mm/s, so "order 0.1 mm/s" holds. |
| c6 A bigger battery voltage raises the current everywhere in the loop at ... | verified | I = V/12 is one value for the whole loop; raising V raises it everywhere (the single reading is the same at every spot). |

Disputed: none. Withdrawn: none.

Recall (three bulbs in series, 0.30 A in -> 0.30 A out) correct. Small display artifact: at 10.5 V the stage prints "uses 5.3 V" on each bulb (5.25 rounded up), and 7.5 V shows 3.8 + 3.8; the rounded labels do not add to the battery voltage (10.6 vs 10.5, 7.6 vs 7.5). Not an error in the physics.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

1. At battery settings of 7.5 V and 10.5 V the two bulb labels round up (3.8 V + 3.8 V, 5.3 V + 5.3 V) and so do not add to the battery voltage the lesson says they share; a lesson about conserved quantities invites the learner to add them. Showing one more decimal (3.75, 5.25) or snapping the slider to values that halve cleanly would avoid it.

## Result
6 verified, 0 disputed, 0 added unverified.

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c2 | verified | With a 6 V battery and two 6 ohm bulbs the current is 0.50 A; the battery slider gives I =... | Node: I = V/12 at 2,4,6,8,10,12 V = 0.17, 0.33, 0.50, 0.67, 0.83, 1.00 A; per-bulb drop V/2 = 1..6 V; matches Demo.tsx amps() and drop. |
| c5 | verified | The moving dots show the direction of conventional current (out of the battery's + end); t... | Checked against the stage: battery drawn with long plate and '+' on top, dots path runs up from it (conventional current); dot speed scales with I/0.5; dot opacity steps 1, 0.5, 0.12 after each bulb (qualitative picture); electron drift in ordinary wires is of order 0.1 mm/s (Halliday-Resnick-Walker ch. 26). |
| c7 | verified | Amps measure charge passing per second; volts measure the energy each charge carries (or h... | SI: ampere = coulomb per second, volt = joule per coulomb (BIPM SI Brochure 9th ed.). 'Energy each charge carries' is read as energy per unit charge. |

## Result (pass 4)
3 verified, 0 disputed, 0 left unverified, 0 added unverified.
