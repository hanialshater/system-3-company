*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): common-letters-in-order
lesson version: v2
boundary: knows-edit-distance (has filled the flaw-to-lawn edit-distance grid; has not met "longest shared sequence with gaps" or its cell rule). Same tag as r6, from meta.json learner field.
Screenshots seen: yes (artifacts/walkthroughs/common-letters-in-order/sheet.png, 6 frames)
Verdict: launch

## 1. From the artifact (written before reading r6 or the brief)

- Hook and predict: "ABCBDAB and BDCABA share only 2 letters side by side. Allow gaps: how many now?" The hook gives a floor (2), not the answer. Options 3 / 4 / 5 letters are all numbered, same precision. Locked grid: zero border, empty cells, "?" in the corner. Fill the rest is greyed. Nothing leaks.
- Step 1 (Next cell): "Best for A vs B. A ≠ B: larger of up (0) and left (0) = 0. Fill unlocks after a match." An arrow from the cell above. The prefix label ("A vs B") tells me what the number means, and the gate tells me I must see a match first.
- Step 2 (Next row): "Best for A vs BDCABA. A = A: match. Diagonal 0 + 1 = 1." A diagonal arrow. With edit distance in my head I can see the rule is different: max on a mismatch, diagonal + 1 on a match. Both cases have now been shown on the stage before the shortcut unlocks. That is the cell rule, shown.
- Step 3 (Fill the rest): "The corner reads 4. Trace back to see which letters." Clear.
- Step 4 (Trace): "Picked B, C, B, A: 4 letters, in order, with gaps." Matched cells are dark, the path is tinted, and B, C, B, A are tinted on both axes (columns 1, 3, 5, 6; rows 2, 3, 4, 6). I can see the letters are spread out in both strings. That is the gaps idea, on the stage.
- Reveal: "Your corner read 4, and the trace picked BCBA" quotes what I saw, and the traced grid is still on the stage under it (Start over is disabled once traced). "Your first steps showed it" points back at the two arrows I saw. "Longest block side by side is only 2 (AB or BD)" is told, but it is the hook's premise, so it is context, not the gap. About 95 words.
- Where understanding might still slip (minor): in the reveal frame the phone has scrolled so the column header and row A are off screen; the tinted B, C, B, A letters on the top axis, the clearest picture of "gaps", are not in view when the reveal says "with gaps". The row labels on the left still carry it.
- Minor: Start over going grey after the trace is not explained. A learner who wants to try again may think the lesson froze.

## 2. Earlier findings (r6, read after section 1)

1. Main, "Fill the rest" lets a learner skip every match/mismatch step: FIXED. Fill is disabled until a match has been stepped ("Fill unlocks after a match"); the QA path saw a mismatch (step 1) and a match (step 2) first.
2. Minor, cell meaning not shown while stepping: FIXED. Each step now opens "Best for A vs B" / "Best for A vs BDCABA".
3. Minor, empty grid under "your corner read 4" after Start over: FIXED. Start over is disabled after the trace and the traced grid stays visible in the reveal frame.

## 3. New findings

1. Minor: on a phone the reveal scroll hides the top axis with the tinted picked letters. Consider keeping the header in view or repeating the picked positions in the reveal-time stage line.
2. Minor: Start over disabled without a word of why.
- No FATAL. A first-time learner with this boundary can get the cell rule and the gaps idea from the stage.
