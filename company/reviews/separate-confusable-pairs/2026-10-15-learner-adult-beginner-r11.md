*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): separate-confusable-pairs
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Check the specific difference between two arbitrary codes.)
Screenshots seen: yes (artifacts/walkthroughs/separate-confusable-pairs/sheet.png, recorded 2026-10-15T21:36)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Code plus distinguishing field"; tapped Add digits, Cover, Swap 1↔2, Swap 2↔3, Check; opened reveal.

1. **Where understanding first broke: the codes are identical, not "almost identical", and the confusion never happens.** The hook promises "Two almost identical labels". The stage shows three codes that are all exactly "AX", each with a value (left / right / centre). With no distinguishing cue, I am never asked to recall which AX meant which and fail. My first useful tap is "Add digits", so the confusable state is never tested.
2. **The reconstruction is unscrambling again.** After Cover, the attempt row holds centre / left / right, the right answers in the wrong order, and I swap them into place for 3/3. Nothing here tests whether the digit helped me tell the codes apart.
3. **The reveal miscounts.** "The last digit distinguishes the two codes in the fixture" — there are three codes on stage (AX1, AX2, AX3).
4. **The prediction answers itself** ("Code plus distinguishing field" vs "Shared description only").

Fixes (for the builder):
- Use genuinely similar codes (AX1 / AX7 or AX-L / AX-R), and let the learner try recall before and after adding the distinguishing field, with an empty answer row.
- Fix "two codes".

Verdict reason: the confusable state is never tested and recall is done by reordering supplied answers, so the lesson never shows the distinguishing cue preventing a mix-up, and the reveal text miscounts the codes.

## After reading the brief (meta.json)

- The objective is "Check the specific difference between two arbitrary codes." The brief says two codes, while the stage has three identical codes, which matches the reveal's "two codes" slip (finding 3). The checking of the difference is never tested (findings 1–2).
- Fix route: demo-builder.
