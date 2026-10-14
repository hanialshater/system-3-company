# Learner review r11: a-star-heads-for-goal

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v8
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: adult-beginner (same tag as r5-r7). Knows cheapest-first search settles cells in order of cost so far and has watched a search spread in rings; does not know that a guess of the distance left can focus it, or why an honest underestimate keeps the shortest route.
artifact: `WALKTHROUGH_URL=http://localhost:3590 npm run walkthrough -- a-star-heads-for-goal` (release build I served on :3590 myself because nothing was listening there), transcript.md read first, then sheet.png. Screenshots seen: all 6 frames.
path walked: chose 7; Settle next; Settle to goal; Wall: off (now on, guided run); Guess: on (now off, flood with the wall); reveal.

## Findings (written before reading meta.json)

- **The prediction is a real question for this mind.** I know cheapest-first floods in rings, so 25 or 49 is a natural pick; 7 is only available if you see that the score is flat along row 3. Good tension.
- **The open-grid run makes the point visually:** frame 3 shows 1 to 7 in one row with a dashed fringe either side. Shown, not told.
- **Wall contrast lands.** 16 cells with the guess vs 46 without, both route 10, sit side by side in the table (frame 5). This is what actually answers "does it still flood?".
- **Weak spot (not a blocker):** the open-grid "No guess" cell stays "?" on this path, so the open-grid flood is never shown; the "instead of flooding" contrast exists only for the wall layout. That is enough for me, but the open grid alone does not show a flood.
- **Weak spot (not a blocker):** in the guided wall run the search settles cells behind S (9, 7, 5, 8, 6 on the left columns) before going round. Nothing tells me why the aimed search goes backwards. I accept it as "the wall made the guess wrong", which is what the reveal implies, but it is a question I had that the reveal does not answer.
- **Weak spot, carried from r7:** "never too high, so it never makes a shorter route look worse" rests on one shown underestimate (6 vs 10). No overestimate is ever shown, so the guarantee is told, not seen.
- Buttons are state labels ("Wall: off" turns it on); readable after one tap.
- Reveal fits on the phone frame with the stage still visible; no clipping seen.

## After reading the brief

The objective names "7 instead of 31 on the open grid"; on the QA path the 31 is never shown (optional run). The wall pair 16 vs 46 does the same job, so the experience still matches the misconception it targets ("you have to spread out in every direction"). The underestimate guarantee is in doesNotKnow and is still the told part. Neither is a fatal flaw: no false claim seen, no dead control, no reinforced misconception.
