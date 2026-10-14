*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9, release-build walkthrough): desk-supply-near-use
lesson version: v1 (meta.json version 1, status review)
boundary: adult-beginner (walks to a cupboard for tape, pens or paper; can multiply; has never counted the round trips).
Screenshots seen: yes (artifacts/walkthroughs/desk-supply-near-use/sheet.png, 4 frames)
Verdict: revise (blocking finding below)

## 1. From the artifact (written before reading meta.json, build.md or the crit)

- The question answers itself. "Which location reduces this repeated retrieval route?" with "Across room / At work point / Same outcome"; the title "Store it where the route ends" says it. Nobody thinks across the room is shorter.
- Amounts the reveal explains are not shown. The reveal says retrieving across the room "multiplies the walking distance". The multiplied total (2 × 4 m × 6 uses = 48 m; 60 m at 5 m) never appears. The stage shows "4m one-way", "6uses · distance=4m" and, after I tapped At work point, "Walking route 0m". The Across-room route was "?" at predict and is never revealed. The one number that would make the idea felt (48 m vs 0 m) is missing.
- BLOCKING (misleading state): after tapping "At work point", the white bold toggle is "Across room", and the readout says "Walking route 0m" (02-step-1, 03-step-2 and the reveal). A beginner reads "Across room: 0 m". Nothing else marks which mode is in effect. Same pattern as bag, box, coil, circle. (The white button may be meant as "try this next"; either way nothing on the stage marks the mode in effect, and the lit button is the one not in effect.)
- The slider looks dead: Distance 4 → 5 m changes the label to "5m one-way" but Walking route stays 0m, because the copy is at the desk. The control does nothing visible to the result in the only mode the learner sees.
- The predict drawing (dense dashed lines between two boxes) is the only picture of the repeated trips; it disappears after the first tap.
- Phone fit: 01-predict clips the "Walking route ?" readout (minor). 04-reveal fits.
- Reveal: "The current at work point setting gives 0m" — no comparison.
- Recall (answer text from the trust sheet: "Each fetch is a 10 m round trip: 8 × 10 = 80 m"): arithmetic; the "round trip = 2 × one-way" step was never shown on stage (the stage only says "one-way"), so the lesson does not supply it, and an adult who thinks of round trips gets it without the lesson. See section 3.

## 2. Earlier findings, read after section 1

None. This is the first learner review of this lesson (evidence.simulatedLearner was empty).

## 3. After reading meta.json, builder notes and the crit

- Version recorded: meta.json version 1. Boundary in meta.json: knows ["Everyday objects have sizes, positions and amounts"]; I used the same, made concrete as an adult beginner.
- meta.json doesNotKnow: 'retrieving the same supply across the room repeatedly multiplies the walking distance.' The multiplied distance is the one number never shown.
- Recall: tape 5 m away, 8 fetches (40 m and 0 m / 80 m and 0 m / 80 m and 5 m), key 1. Good transfer: 40 m is the one-way slip. But the stage labels only 'one-way' and never shows the doubling, so the lesson does not prepare the slip it tests.
- Builder notes: No build.md. Trust-sheet c3 'Distance = 2 × input metres × 6 uses or 0 m at use point' confirms the 48 m is computed and never displayed.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, read after section 1): its reusable lesson 1, 'Draw the base, not only the result... stages that show only totals plus a formula move the mechanism into the reveal's prose', matches what I found here independently: the Across-room total (48 m) is never shown; the reveal says 'multiplies' over a stage showing 0 m.
- Not in the crit: the mode toggle. In the illustrative-model engine (bag, box, circle, coil, desk in this batch) the white bold button after a tap is the mode *not* in effect. The crit did not raise it. I could not tell from the artifact whether it is a 'try this next' hint or a selection bug; either way no element marks the current mode. QA should rule on it (board item for qa-tester).
- Verdict: revise (blocking finding below).
