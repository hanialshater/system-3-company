*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): coiled-cord-bend-radius
lesson version: v3
boundary: adult-beginner (from meta.json learner: knows that everyday objects have sizes, positions and amounts; does not know that a circle's curvature is the reciprocal of its radius)
Screenshots seen: yes (artifacts/walkthroughs/coiled-cord-bend-radius/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Twice as sharp"; tapped A · Base radius r, B · Double, 2 × r; slid Base radius to 11 cm; opened reveal.

1. **Where understanding first broke: the answer is printed on the predict card.** The table row on the locked stage reads "Bend (1 ÷ radius)". Anyone who reads it before predicting knows that doubling the radius halves the bend, so the prediction becomes a reading test. Anyone who doesn't read it and picks "Twice as sharp" (I did, reading "twice as wide" as "twice the bend") is corrected by a definition, not by something they saw.
2. **"0.100 per cm" means nothing to a beginner.** Bend sharpness as a number per centimetre is a physics unit. The words "sharper"/"gentler" help, but I can't tell whether 0.05 per cm is good or bad for a cord.
3. **Why should I care?** The hook and title imply a hack (coil cords loosely?), but the reveal says only "storage only; no electrical safety limit or product-specific bend radius". It gives no reason why a gentler bend is better for the cord. So the lesson teaches a definition of curvature with no payoff, and I can't say what I would do differently with my own cord.
4. **The drawing.** The coil is a single circle in both A and B. 3.18 turns vs 1.59 turns is in the text, but the picture doesn't show more or fewer loops.
5. **Did the reveal answer my question?** It answers "how sharp?" with the definition. It doesn't answer "so how should I coil it, and why?"

Verdict reason: the locked stage prints "Bend (1 ÷ radius)", which gives the answer away, and neither stage nor reveal says why a gentler bend matters for a cord, so there is no hack to take away.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective ("a circle's curvature is the reciprocal of its radius ...") is a geometry fact, and the lesson delivers it, mainly by printing it on the locked stage (finding 1).
- Misconception ("however you coil a cord, the bend is the same because it is the same cord") is the "Just as sharp: same cord" option. Few adults would pick it once the drawing shows a bigger loop.
- The "why it matters" gap (finding 3) looks like a scope choice ("storage only", no safety claim). But without any stated reason, a learner has nothing to act on. Owner: learning-designer to decide if there is a claimable everyday reason (e.g. tight loops leave kinks); otherwise the lesson is a curvature definition with a cord picture.
