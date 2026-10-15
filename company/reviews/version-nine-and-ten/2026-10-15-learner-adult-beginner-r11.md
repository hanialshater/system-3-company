*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): version-nine-and-ten
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Pad numeric version fields before lexicographic sorting.)
Screenshots seen: yes (artifacts/walkthroughs/version-nine-and-ten/sheet.png, recorded 2026-10-15T21:36, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "v09 and v10"; tapped Sort plain (v10, v2, v9), then Pad versions (v02, v09, v10); opened reveal.

1. **The plain sort is a real surprise, and the stage shows it.** Seeing v10 come before v2 and v9 is the "huh" moment, and it happens on screen. Good.
2. **Where understanding first broke: the reveal never says why.** The reason (text is compared one character at a time, and "1" comes before "9", so v10 sorts before v9) is the whole idea. The reveal says only "The padded versions have the same width", which tells me what padding does, not why plain text sorting went wrong.
3. **The readout is broken-looking.** "Order 3" in both modes, and the reveal opens with "The current result reports 3 order". It does not change and means nothing to me.
4. **The question is phrased backwards for a beginner.** "Which names sort v9 before v10 alphabetically?" assumes I already know plain names do not. I would have predicted better from "Sorted as text, which comes first: v9 or v10?", which is also where the surprise lives.
5. **The rows show a second column (09, 10, 02) even before padding**, which half gives away the padded form.
6. **The closing note is useful and honest** ("many real file browsers already use natural numeric sorting").

Fixes (for the builder):
- Add one sentence of why: characters are compared left to right, so "1" in v10 beats "9" in v9.
- Replace "Order 3" with the first item of the list, or remove it.
- Predict on the plain sort ("v9 or v10 first?") before showing padding.

Verdict reason: the stage shows the surprising order but the reveal never explains why text sorting puts v10 before v9, and its only readout ("3 order") is meaningless.

## After reading meta.json

- Objective "pad numeric version fields before lexicographic sorting" is delivered as a procedure; the reason (character-by-character comparison) is missing (finding 2). Misconception field "v9 and v10" is the wrong option.
- Fix route: demo-builder (one sentence of why, readout, question order).
