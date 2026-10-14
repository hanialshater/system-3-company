# Build note: back-button-stack (demo-builder, 2026-10-12)

- Design intent: browser history as one pile (A at the bottom, D on top, 'you are here' marker). Back moves the marker down; forward pages show dashed; visiting a new page after Back throws the dashed pages away and shows them struck out in red.
- Reveal gate: interact() only on a visit that discards forward pages, which is the moment the misconception breaks.
- Deviation from brief: no queue mode. One idea per card; the queue gets one contrast sentence in the reveal. No Forward button either; forward pages are shown, not navigable.
- After screenshots: the pile reads top-down cleanly on phone; no changes needed beyond confirming the start state gives nothing away (it only shows the premise A-D).

## Revision v3 (wave C, learner review)

- Reveal needed the final Back that was never shown: the page just below 'you are here' is now tagged 'Back goes here', so the answer is on the stage. The reveal quotes the learner's own discarding visit (page, from, thrown away) and then the question's A, B, E case.
- Reveal described C and D discarded although the path discarded only D: the reveal now uses the recorded visit; the question's case is described as the question's case.
- 'Forward' had no button: the reveal no longer uses it; the dashed tag now says 'ahead' (c2, c4).
- Hook leaked the trap: now asks 'Where does Back take you now?'.
- Queue paragraph removed (unearned); stack is defined in one clause (c3).
- Note: first attempt gated on a Back press after the discard; the QA path (Back, Visit, Start over) cannot reach that, so I showed the answer on the pile instead.

All changed claims are unverified, awaiting a fact-checker.

## Revision v4

r2: the question is shortened to A, B, C; Back once; visit D; Back once more, answer B, so one press of Back and of Visit reaches the exact sequence and the pile's 'Back goes here' tag shows B (QA presses each control once, so a gate on a second Back was unreachable). Copy bugs fixed ('was/were', 'Back from D'). c1 rewritten, c2 and c4 re-marked, unverified; hook and objective updated.
