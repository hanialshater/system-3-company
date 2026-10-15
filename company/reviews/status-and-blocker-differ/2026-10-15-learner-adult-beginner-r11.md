*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): status-and-blocker-differ
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Separate completed work, blocker and next action.)
Screenshots seen: yes (artifacts/walkthroughs/status-and-blocker-differ/sheet.png, recorded 2026-10-15T21:34, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Done blocker next"; tapped Add Blocker, then Add Next; opened reveal.

1. **The question answers itself.** "Which update makes the obstacle explicit?" with options "Done blocker next" and "Busy today": only one option contains the word blocker. There is no trap.
2. **Where understanding first broke: I never see the "Busy today" note.** The lesson's claim is that an activity description ("busy today") hides the obstacle, but the stage only fills in a checklist. A side-by-side of the two notes (what a manager can do with each) is the contrast I needed.
3. **"Fields 3/3" turns it into form-filling.** The readout counts boxes, so the lesson reads as "fill every box" rather than "say what is stopping you and who can unstick it".
4. **The fixture values are code-like.** "data" and "ask-Bo" do not read as sentences. "Blocked: waiting for the sales data" and "Next: ask Bo for it by Tuesday" would show what a useful blocker line looks like.
5. **The reveal is accurate but thin.** "An activity description alone does not supply those fields" is true; it does not tell me why the blocker matters (someone else can act on it).

Fixes (for the builder):
- Show the two updates side by side and ask which one lets a reader help.
- Write the fixture values as short sentences.
- Replace "Fields 3/3" with something that shows the effect (for example "a reader can act: yes/no").

Verdict reason: the stage never shows the vague update the lesson argues against, so the reveal confirms an answer the option label already gave away.

## After reading meta.json

- Misconception field is "Busy today", which is the very note the stage never shows (finding 2). Objective "separate completed work, blocker and next action" is delivered as form-filling, not as why it helps.
- Fix route: demo-builder (side-by-side notes, sentence-like fixture values, readout).
