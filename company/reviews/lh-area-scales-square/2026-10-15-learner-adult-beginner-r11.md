*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-area-scales-square
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Apply square scaling to area coverage.)
Screenshots seen: yes (artifacts/walkthroughs/lh-area-scales-square/sheet.png, recorded 2026-10-15T21:35:27.494Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "A"; tapped Test A; Test B; slid Side 2 -> 4 m; opened reveal.

1. **Where understanding first broke: the answer is printed before I predict.** The title says "Double the side, quadruple area", and the question asks "Which area is four times the other?" A beginner who believes "twice as big" is told "four times" twice before choosing. The only honest wrong answer left is "Neither", and the title rules that out.
2. **The stage is good.** A = 4 m², B = 16 m², and the B square is drawn as a 2×2 grid of A-sized tiles. That picture is the whole lesson: four copies of the small square fit in the big one. The slider (side 4 m: 16 vs 64) shows it is always ×4.
3. **The reveal answers the hook's question** ("Is the second only twice as large?"): "Both dimensions double, so the product gets a factor of two twice ... four times the material ... rather than twice." Clear.
4. Notes: "Side-x / Side-2x" labels are algebra-speak; B's expression "(2×2×2×2)" is harder to read than "4×4"; "ideal area-only coverage model" is builder language.

Verdict reason: the title and the question both state "four times" before the learner commits, so the "only twice" belief the lesson targets is never actually tested; the stage and reveal are otherwise strong.

## After reading the brief (meta.json)

- Objective "apply square scaling to area coverage" is shown well on stage. The failure is only in the wording before the prediction (title and question contain "quadruple"/"four times").
- Fix route: demo-builder (neutral title before reveal, or a question like "How many times larger is B's area?" with 2× / 4× / 8× options).
