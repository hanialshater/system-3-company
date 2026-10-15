*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): select-before-replace
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish replacing a selected occurrence from replacing all.)
Screenshots seen: yes (artifacts/walkthroughs/select-before-replace/sheet.png, recorded 2026-10-15T21:35)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Selected replacement"; tapped Replace selected, Replace remaining; opened reveal.

1. **Where understanding first broke: no selection is shown.** The hook is "Replacing a selection affects that selection, not every matching word". The editor shows cat / cat / dog with no highlight, cursor or box marking which cat is selected. I only learn it was the first one after "Replace selected" turns it into fox. The thing the lesson is about, the selection, is invisible.
2. **The option names do not match the buttons.** The prediction offers "Replace all", but the stage button is "Replace remaining", and it changes only the second cat. I am not sure whether "remaining" equals "all".
3. **The prediction answers itself** ("Which limits the edit to the selected occurrence?" → "Selected replacement").
4. The reveal's "inspect that scope before applying a broad edit" is good advice. The "displayed results of the two named commands" wording is system-speak.

Fixes (for the builder):
- Highlight the selected cat before any tap (as a text editor would).
- Name the second command "Replace all" and let it act on every cat (including one already changed, or show 2 matches).

Verdict reason: the selection, the lesson's subject, is never drawn, so the learner cannot predict or see what "selected" covers.

## After reading the brief (meta.json)

- The objective is "Distinguish replacing a selected occurrence from replacing all." The selection is not drawn, and "Replace remaining" is not "replace all" (findings 1–2).
- Fix route: demo-builder.
