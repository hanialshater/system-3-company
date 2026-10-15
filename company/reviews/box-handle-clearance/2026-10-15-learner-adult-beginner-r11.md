*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): box-handle-clearance
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows that everyday objects have sizes, positions and amounts; does not know that a box's outer envelope includes its handles)
Screenshots seen: yes (artifacts/walkthroughs/box-handle-clearance/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Yes, with room to spare"; tapped A · Body only, B · Include handles; slid Shelf opening to 44 cm; opened reveal.

1. **Where understanding first broke: what the black frame lines are.** On the predict card, two vertical lines sit around the box body above "42 cm opening", so I read them as the shelf opening, with the handles poking past. After A the same lines are labelled "40 cm" (the body), and after B they are labelled "46 cm" (the handles). The opening is never drawn as its own object, so the frame changes meaning from card to card. The numbers in the table (46 cm vs 42 cm opening, −4 cm too wide) carry the idea, so I recovered, but the picture is doing less than it could.
2. **What the prediction felt like.** Fair. The drawing shows handles, the label says 40 cm and the opening is 42 cm, so "Yes, with room to spare" is a natural first answer for someone trusting the label. The question says "as drawn", which points at the handles without giving away their size. The 3 cm per handle is never shown on its own, only the 46 cm total.
3. **The reveal reports the slider state.** After moving the opening to 44 cm, the reveal gives "+4 cm (fits)" and "−2 cm (too wide)". These are not the 42 cm numbers the question used. The verdict ("too wide") still matches, so the learner isn't misled.
4. **Did the reveal answer my question ("why doesn't it fit if the label says 40?")?** Yes. The label measures the body, the handles stick out, and you measure the outermost points. The note that soft handles may flex is a useful, honest caveat.

Verdict reason: no blocking finding. The shifting frame lines and the reveal quoting slider-state numbers are notes for the builder.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective (outer envelope includes protrusions) is delivered: the B view and reveal state it directly.
- Misconception ("the size on the label is the size that has to fit through the opening") matches the hook and the tempting option. It is answered by the 46 cm vs 42 cm contrast.
- Recall (38 cm body, 4 cm handles) fits.
- Notes for demo-builder (not blocking): draw the opening as its own outline so the frame doesn't change meaning; show the 3 cm per handle; have the reveal quote the 42 cm numbers the question used, not the slider state.
