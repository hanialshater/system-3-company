*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): drawer-divider-cost
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Dividers occupy space too. The usable width of each compartment is the drawer width minus the internal walls, divided by the number of compartments.)
Screenshots seen: yes (artifacts/walkthroughs/drawer-divider-cost/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Ignore walls" (wrong); tapped Count walls; slid Inside width to 42; opened reveal.

1. **The idea is a real everyday trap.** People do divide 40cm by 4 and buy 10cm boxes. Dividers taking width is worth 60 seconds, and the drawing (thin lines versus thick brown walls) shows it.
2. **Where it first broke: the question.** "Which estimate leaves room for four compartments?" Both estimates "leave room for four compartments"; the question I needed was "how wide is each compartment?" I picked "Ignore walls" partly because the question did not make sense to me.
3. **The option labels give it away.** "Ignore walls / Count walls". Put that way, nobody chooses to ignore.
4. **I never saw the wrong number.** The readout was "?" before I switched, so 10cm (ignoring walls) never appeared next to 9.25cm. The 0.75cm loss per compartment, which is the whole point, I had to work out myself.
5. **How many walls?** 40 minus 3 walls, divided by 4, is 9.25. The reveal says "internal walls", which is right, but the stage never says there are 3 (not 4 or 5). A beginner may wonder about the outer walls; "inside width" answers it only if you notice.
6. **Reveal versus my question.** It gives the rule in words (width minus internal walls, divided by the number of compartments) and a sensible "use actual material thickness" note. That answers my question. The slider (40 to 42cm) adds nothing; a wall-thickness slider would.

Fixes (for the builder):
- Show both numbers at once: "Ignoring walls: 10cm. Actually: 9.25cm."
- Ask "40cm drawer, 4 compartments, 1cm dividers. How wide is each?" with 10 / 9.25 / 9 as options.
- Make the slider wall thickness or compartment count.

Verdict reason: the prediction's wording is confused and its options give the answer, and the learner never sees the ignore-walls figure beside the real one, so the loss is not shown.

## After reading the brief (meta.json)

- Objective (width minus internal walls, divided by compartments) is stated in the reveal and computed correctly on stage (40 - 3 = 37; 37 / 4 = 9.25). The wrong-estimate figure is the missing piece.
- Fix route: demo-builder.
