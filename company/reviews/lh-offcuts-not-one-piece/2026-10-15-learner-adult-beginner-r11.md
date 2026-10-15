*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-offcuts-not-one-piece
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Respect indivisible stock-piece boundaries when counting reusable offcuts.)
Screenshots seen: yes (artifacts/walkthroughs/lh-offcuts-not-one-piece/sheet.png, recorded 2026-10-15T21:35, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Separate"; tapped Test A, Test B; slid Piece-size 60 to 70cm; opened reveal.

1. **Where understanding first broke: the hook answers the question, and the question is hard to parse.** The subtitle says "A 90cm piece and a 50cm piece cannot supply two unjoined 60cm lengths." The question then asks "Which result represents usable separate pieces at 60cm?" with options "Separate", "Pooled length", "Both". That reads like "which label says separate?". I did not know what I was predicting.
2. **The readouts are lengths when I am thinking in pieces.** A shows "60cm" and B "120cm". I want "1 piece" and "2 pieces". At 70cm, A shows 70cm and B 140cm, which looks like A is still worse, but now it means one piece versus a pretend two.
3. **The working is outside my boundary.** "((floor((90÷60))×60)+(floor((50÷60))×60))" is unreadable for me.
4. **The picture does not show offcuts.** Two ring icons; two strips with a 60cm mark on each would show the idea at a glance.
5. **Does the reveal answer my question?** The first two sentences do ("each required piece has to fit within one offcut; count fits separately"). "Invents continuity" and "an intentionally infeasible comparison" are not my words.

Fixes (for the builder):
- Ask "How many 60cm pieces can you cut?" (0, 1, 2), and show piece counts.
- Plain working ("90cm gives one; 50cm gives none"); rewrite the hook so it asks.

Verdict reason: the hook states the answer, the options read as labels rather than beliefs, and the readouts are in centimetres when the question is about pieces.

## After reading the brief (meta.json)

- Objective: respect piece boundaries when counting offcuts. The objective says counting, but the stage reports centimetres (finding 2).
- Fix route: demo-builder (question, piece-count readouts, working, picture).
