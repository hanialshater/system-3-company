# Build note: wrench-throw-recoil

Built by demo-builder (sonnet build, EXP-003). Kept from evaluators until they report.

- Key states: first throw ("thrown") and a second, different throw ("varied"). Defaults 2 kg and 10 m/s are the question's numbers, so the first Throw on the QA path shows exactly the question. While thrown, moving a slider re-throws live; before the first throw sliders only change the wrench picture and label.
- DOM order: Throw, mass slider, speed slider, so the QA path is Throw (2 kg, 10 m/s), then a varied throw.
- Idealisation stated on stage: "No outside force. Speeds from the start frame." Drift 0.25 m/s is tiny against the wrench, so the picture shows the astronaut barely moving; the momentum bars carry the point.
- Reveal quotes the learner's first and last distinct throw from the same drift() function the readouts use.
- Screenshot looked at: QA phone-3-reveal (4 kg at 14 m/s, 0.7 m/s, bars 56) and my earlier shot. First pass had too-short bars and the total label over the axis; fixed.

## Revision v2 (batch 02, 2026-10-14)

The astronaut's drift is drawn 10x larger (labelled) with a dashed ghost at the start and a distance label, so the thrower is seen to move. Momentum glossed as mass x speed; "start frame" jargon removed from the stage. New claim c6 (drawing scale), unverified.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.
