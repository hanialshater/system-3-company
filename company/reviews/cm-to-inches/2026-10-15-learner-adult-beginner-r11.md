*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): cm-to-inches
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The inch is defined as exactly 25.4 millimetres. Dividing centimetres by 2.54 gives inches; using 2.5 is a convenient approximation with a visible error that grows with length.)
Screenshots seen: yes (artifacts/walkthroughs/cm-to-inches/sheet.png, recorded 2026-10-15T21:33)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Use rough 2.5" (wrong); tapped Use exact 2.54; slid Length to 30.2; opened reveal.

1. **The prediction is given away twice.** The title says "An inch is exactly 2.54cm", and the question asks which conversion "avoids the shown rounding shortcut", with options "Use rough 2.5" and "Use exact 2.54". I only had to read.
2. **Where it first broke: I never saw the rough answer.** The reveal says using 2.5 has "a visible error that grows with length". On my path the rough number never appeared (the readout was "?" before I switched to exact). I saw 11.81in and 11.89in, both exact. The error the lesson is about (12.00 vs 11.81 at 30cm) was never on screen.
3. **The slider barely moves.** 30 to 30.2cm changes 11.81 to 11.89. It does not show the error growing, which is the claim.
4. **The rulers are nice.** A cm ruler over an inch ruler is the right picture; I could see 15in sits a bit short of 40cm.
5. **Reveal versus my question.** My question is "does the 2.5 shortcut matter for a shelf, a TV, a suitcase?" The lesson never says how big the error is (about 1.6%), so I cannot decide when to bother.

Fixes (for the builder):
- Show both readouts at once (rough and exact) with the difference, and let the slider go long enough (for example 200cm) that the gap is visible.
- Ask something uncertain: "30cm in inches with 2.5 is 12. The exact answer is: a bit less / a bit more / the same".
- Toggle highlight looks inverted (white button was "Use rough 2.5" after selecting exact).

Verdict reason: the learner's path never displays the rough result, so the error the reveal describes as "visible" was not seen, and the prediction is answered by the title.

## After reading the brief (meta.json)

- Objective claims 'a visible error that grows with length'; on the walked path the error was never visible (finding 2). This is a mismatch between a claim and what the learner sees, not only a wording issue.
- Fix route: demo-builder (show both readouts); fact-checker may want to re-check the 'visible' wording against the stage.
