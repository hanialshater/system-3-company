*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): every-second-seat-out
lesson version: v1
boundary: knows recursion reduces a problem to a smaller case (hanoi-tower-doubles); does not know that a counting-out game has a closed form based on the binary of n (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/every-second-seat-out/sheet.png, integrated build 3 at :3470)
Verdict: revise

## 1. From the artifact

- Predict: the hook "41 in a circle, every second one out. Who is left?" is a clean question, and the options 1 / 19 / 41 are honest. "1" feels right because 1 is never removed on the first lap. The locked stage is a full circle of 41 with "Left: 41, next skip: 1" and the → ? readouts. It doesn't leak.
- Explore: "Remove next" removes 2, and the arrow moves to 3. "Run to the end" goes straight to "Left: 1, survivor: 19" and the readout 41 PEOPLE → 19. The reveal button unlocked here, after one jump. The slider has two ticks, "32 left" and "lap 1 done", which is a good stand-in for the cause. But the walkthrough's scrub went to removal 38 (3 left, next skip 35), not to the 32-left tick, and nothing required me to go there. Then 7 people gives 7 and 10 people gives 5. On those smaller circles the stage scrolls, and the top of the circle is cropped (step 4 shows 7 at the top edge, step 5 has the top cut off).
- Reveal: "Scrub to removal 9: 32 were left and the count started at 19." This is an instruction about a state I never saw. "With a power of two left, the person the count starts on always survives: each lap removes exactly half and comes back to them" is told. "In binary, write 41 as 101001 and move the leading 1 to the end: 010011 = 19" is told, and no binary appears anywhere on stage. "7 gave 7, 10 gave 5: the same rule". I saw 7 and 5, but nothing showed me how they fit the rule (7 = 4 + 3 → 7; 10 = 8 + 2 → 5).

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json.

## 3. Findings

1. **Revise (Show the why you promised):** the doesNotKnow item is the binary closed form, and the objective asks the learner to explain the power-of-two step. Neither has to be seen. The only milestone is "survivor-41", reached by "Run to the end", so the 32-left state is optional and binary is told only. The builder decides the fix. Some options: gate on landing at the 32-left tick, with the starter (19) highlighted; label the readouts with n = 2^m + L (41 = 32 + 9); show n's binary next to the survivor.
2. Moderate: the reveal's first sentence is an instruction ("Scrub to removal 9 ...") about a state the learner may never have visited (W-150 pattern).
3. Minor: on 7 and 10 people the circle is cropped at the top of the stage, and on the reveal frame only the lower half of the circle shows.
4. Minor: the 7 → 7 and 10 → 5 readouts are a nice check, but the "same rule" is never shown for them. A "4 + 3" / "8 + 2" label would let me test the rule myself.
5. Minor: the reveal is dense, two paragraphs of arithmetic plus binary, about 90 words, at the edge of the budget.
- No FATAL.
