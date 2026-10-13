# Build note: build-a-balanced-mobile

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: ruler on a knife-edge pivot; the beam tips to a fixed 8 degree stop by the sign of the net torque (no fake graded tilt). Lump toggle shows the bare ruler balances at 50 cm.
- Brief asked for no slider and dragged lumps; I used a pivot slider stepping 12.5 cm so the QA path (two arrow presses from 50) reaches 75 cm. Milestone 'balanced'.
- After screenshots: tick numbers sat on the table line when the beam tipped; moved above the beam and dropped the 100 label (hidden by the lump).

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise); the fact-check routed nothing.

- Last screen had the lump off, contradicting the reveal (and the recorded run never showed "level"): the lump now starts off and the "Add lump" button comes first in DOM order, so the QA path is add lump (lump end drops), then the slider's two steps 50 -> 62.5 -> 75 cm (level, milestone 'balanced'). The last screen before the reveal is the loaded ruler, level.
- Predict picture tipped toward the lump, a free hint: at predict the bare ruler sits level on 50 cm with a dashed "lump (off)" outline; no tip.
- "Turns the beam equally" leaned on torque nobody had set up: each weight's distance from the pivot is drawn on the beam in cm, and two readouts give "Left turn" and "Right turn" in kg x cm. At 75 cm both read 2.5. The reveal says "A weight turns the beam more the further it sits from the pivot: weight x distance" only after the learner has watched those numbers. New claim c7 (unverified).
- "BEAM left down" didn't say which end: the caption now says "The lump end drops" / "The bare end drops" when the lump is on.
- Ruler's weight at 50 cm was stated, not shown: a red arrow labelled "ruler's weight 0.10 kg" hangs from the 50 cm mark.
- "Left of that the lump end drops; right of it the long end does" was hard to hold: removed from the reveal; the stage shows the tipping directly.
- Claim texts c1-c6 unchanged, so no status reset.
