# Learner review r11: palindromes-grow-from-centres

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v4
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: knows-two-pointers (same tag as r6-r8). Knows two fingers moving apart or together over a list and what a palindrome is; does not know palindromes can be counted by growing each centre outward, or that n letters have 2n − 1 centres.
artifact: walkthrough against a release build on :3590 (I started it). transcript.md read first, then sheet.png. Screenshots seen: all 9 frames.
path walked: chose 4; tapped all 7 centres left to right; reveal.

## Findings (written before reading meta.json)

- **Prediction:** 4 (just the letters) is the natural low guess; 10 needs you to see that every substring of "aaaa" is a palindrome. Real tension.
- **Two-pointer link is direct:** each centre tap draws a bracket that widens until "word ends" or a red dashed "letters differ". That is my two fingers moving apart. The idea arrives through the hands.
- **The paired row "abaa" earns its place:** gap 1 shows +1 above and +0 below at once, and the red dashed underline marks where the mirror broke. I checked the counts: abaa's palindromes are a, b, a, a, aba, aa = 6, matching ABAA FOUND 6.
- **Gaps as centres:** the row of dot and bar buttons (4 dots, 3 bars) shows the 7 centres before the reveal names 2n − 1. The formula is told but sits on a picture I already used.
- **Weak spot (not a blocker):** the hook asks "Do you have to test every piece?" and the answer on stage is "9 of 10". That saving is real but small, so a sceptical reader of this boundary may think "so nearly every piece". The reveal does explain the one skipped test ("ba" failed, so "abaa" was never tried), which is the right reason; it just lands softly at this size.
- **Wording nit:** "Your tested readout reads 9 / 10, not "abaa"" is slightly awkward, but the readout on stage matches it exactly.
- No layout clipping seen; reveal fits with the stage visible.

## After reading the brief

Objective (every palindrome has one centre; grow 2n − 1 centres; 1 + 1 + 2 + 2 + 2 + 1 + 1 = 10) is what the stage shows and the reveal adds up. The misconception "you must test every substring" is answered by the 9/10 readout; the margin is thin at n = 4, as noted above. No false claim, dead control or reinforced misconception seen.
