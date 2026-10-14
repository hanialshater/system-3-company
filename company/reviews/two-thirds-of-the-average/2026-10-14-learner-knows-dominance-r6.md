*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): two-thirds-of-the-average
lesson version: v1
boundary: knows-dominance (from meta.json learner.knows: a dominated choice is never best. Does not know that if everyone is rational and knows it, deleting dominated choices round after round leaves only 0.)
Screenshots seen: yes (artifacts/walkthroughs/two-thirds-of-the-average/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "Everyone picks any number from 0 to 100; closest to 2/3 of the average wins. All are rational and know it." 33 / 22 / 0. 33 is the classic first-level answer and the honest pick. The locked stage shows the full 0–100 bar with "ceiling 100.0" and ticks at 22 and 33. Nothing leaks, though the ticks quietly tell me the options will be tested against the bar.
- Explore: "Next round" cuts the bar to "ceiling 66.7", with the caption "Round 1: if all guesses are ≤ 100.0, the target is ≤ 66.7. Guessing above it always does worse." That caption is the dominance step itself, on stage. "4 more rounds" jumps to round 5: "ceiling 13.2", and the earlier ceilings stay as thin unlabelled ticks. 22 and 33 are now marked "22 ×" and "33 ×" in red. "Reset" goes back to round 0.
- Where it slipped: the reveal says "Round 2 cut above 44.4, and round 3 cut 33 itself (ceiling 29.6)". I never saw 44.4 or 29.6 as numbers, because "4 more rounds" skipped them. The past-ceiling ticks are there but unlabelled, so "round 3 is where 33 died" is told. The objective names these numbers (44.4, 29.6, ...).
- "Only 0 survives": the stage stops at 13.2. The shrinking-by-2/3 trend is plain, so extending it to 0 is a short, honest step, and the reveal makes it ("never stops shrinking").
- Reveal: in this run the stage was Reset to round 0 before the reveal (QA presses every control), so the reveal ("the ceiling reached 13.2") sits under a stage showing 100.0. A real learner who resets would hit the same mismatch.
- The closing caveat (needs common knowledge of rationality; drop it and the best guess changes) is fair, told context.

Told vs shown check (brief): doesNotKnow "deleting dominated choices round after round" is the round caption plus the shrinking ceiling, with 33 and 22 crossed out. The endpoint 0 is extrapolated from a visible trend. Shown well enough for launch.

## 2. Earlier findings

No earlier learner review exists. Boundary taken from meta.json.

## 3. New findings

- Moderate (not a blocker): label the past-ceiling ticks (66.7, 44.4, 29.6, 19.8), or have "4 more rounds" leave a short list, so the reveal's 44.4 / 29.6 and "round 3 cut 33" quote values the learner saw.
- Minor: write the reveal from the furthest round reached, and keep that value after Reset, or disable Reset once the gate opens.
- Minor: 0/4 claims checked (fact-checker's lane).
- No FATAL.
