*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-duplex-sheet-rounding
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Compute whole-sheet needs for odd double-sided page counts.)
Screenshots seen: yes (artifacts/walkthroughs/lh-duplex-sheet-rounding/sheet.png, recorded 2026-10-15T21:32, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Single-sided"; tapped Test A, Test B; slid Pages 7 to 9; opened reveal.

1. **Where understanding first broke: the question does not ask the thing the hook raises.** The hook asks "what happens when the page count is odd?" The question asks which is smaller, single-sided or double-sided sheets. Anyone knows double-sided uses fewer sheets, so there is no wrong guess to make. The interesting question (is 7 pages 3.5 sheets or 4?) is never put to me.
2. **What the prediction felt like.** No stakes. I picked "Single-sided" only because the walk forced option 1.
3. **"ceil((7÷2))" is outside my boundary.** I do not know what "ceil" means. The reveal says "ceiling" once, without explaining it beyond "round up".
4. **The picture does not show sheets.** Each side shows a circle with a gap and a small page icon; I could not tell what it represents. Two pages on one sheet with a blank back would show the idea directly.
5. **Does the reveal answer my question?** Partly: "divide by two and round up; an odd final page still occupies a whole sheet" answers the hook, but the prediction never tested it.

Fixes (for the builder):
- Ask "Seven pages, double-sided: how many sheets?" with 3, 3.5, 4 as options.
- Replace "ceil" with "round up" on the stage; draw sheets.

Verdict reason: the prediction is about something no beginner gets wrong, so the odd-page rounding the lesson is about is never at stake.

## After reading the brief (meta.json)

- Objective: compute whole-sheet needs for odd double-sided page counts. The prediction never asks for a sheet count (finding 1); the count appears only as a readout.
- Fix route: demo-builder (question and options, "ceil" wording, picture).
