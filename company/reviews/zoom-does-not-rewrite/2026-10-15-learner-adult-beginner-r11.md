*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): zoom-does-not-rewrite
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Distinguish view magnification from stored content edits.)
Screenshots seen: yes (artifacts/walkthroughs/zoom-does-not-rewrite/sheet.png, recorded 2026-10-15T21:37, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Stored text"; tapped Zoom in (150%), then Zoom out (80%); opened reveal.

1. **Where understanding first broke: the zoom does not zoom.** At 150% and at 80% the "Map" and "Key" boxes and their letters are the same size as at the start. Only the readout changes. The lesson is about the screen size of letters changing while the text stays the same, and the screen size of letters never changes on stage.
2. **The prediction is easy.** "What remains unchanged when zooming?" Anyone who has pinched a phone screen knows the text stays the same. There is no trap.
3. **The units do not match.** The readout says "Zoom 80%"; the reveal says "View scale is 0.8". Small, but it makes me check whether they are the same thing.
4. **The readout switches meaning.** It starts as "Tokens 2" and then becomes "Zoom 150%". "Tokens" is jargon for "words".
5. **The reveal is accurate** ("view magnification and document content are separate"), but it describes a change I did not see.

Fixes (for the builder):
- Scale the letters visibly with zoom, and keep a word count beside it that stays at 2.
- For tension, ask something people actually get wrong (for example, "if you zoom in before printing, is the printout bigger?").
- Use one unit (percent) and say "words", not "tokens".

Verdict reason: the stage never makes the letters bigger or smaller, so the one change the lesson is about is not shown.

## After reading meta.json

- Objective "distinguish view magnification from stored content edits" cannot be met when the magnification is not drawn (finding 1). Misconception "Screen size of letters" (thinking letter size stays the same) is not a belief anyone holds after one phone pinch.
- Fix route: demo-builder (scale the letters, units); possibly QA, since a zoom control that does not change the drawing may be a rendering bug rather than a design choice.
