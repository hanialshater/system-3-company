# Build note: doubling-speed-braking

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: braking distance drawn as a row of blocks, each one 30 km/h stop (6.9 m), so 60 km/h visibly needs 4 blocks while the readout says speed is only 2.0x. Speed slider steps of 15 km/h; 'braking only' stated on stage.
- Earned reveal: unlocks only once 60 km/h is reached.
- After screenshots: no layout fixes needed; block count kept hidden while locked so the locked stage does not hint the square law.

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise); the fact-check routed nothing.

- 60 km/h never displayed in the recorded run: the slider starts at 30 km/h in 15 km/h steps, so the QA path's two steps land on 60 km/h, which is now a <Milestones> milestone ('sixty'). The reveal's 27.8 m and "4 blocks" are computed from the same dist() that draws the road.
- The "because" (energy goes as speed squared, brakes remove the same energy per metre) was asserted: the readouts are now "Speed vs 30", "Energy vs 30" (speed squared) and "Road", side by side, so at 60 km/h the learner sees 2.0× next to 4×. The caption says each block is "the 6.9 m of road the brakes need to remove a 30 km/h car's movement energy". The reveal points back at those readouts.
- Speed multiple vs block count left to the learner to compute: same readout change; the comparison is on screen.
- Striped bar at 16 blocks: blocks are numbered.
- "Movement energy ... (speed squared)" jargon: reworded to "grows with speed times speed".
- "Reaction time adds more road" was a new idea with no number: removed; the muted line now restates the scope ("Braking only, same brakes on the same road"). Claim c6 stays (the stage still says braking only); claim texts unchanged.
