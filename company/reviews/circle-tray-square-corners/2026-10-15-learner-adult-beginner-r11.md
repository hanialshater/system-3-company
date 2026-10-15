*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: circle-tray-square-corners
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: Everyday objects have sizes, positions and amounts. Does not know: A circle is unchanged by rotation. In the selected square-grid arrangement, rotating each disc cannot alter the row count; changing the arrangement would be a separate experiment.. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/circle-tray-square-corners/sheet.png, recorded 2026-10-15T10:09:51.637Z, build c0cfd14 served on localhost:3590)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: at the question itself. "How many 10 cm discs fit in this square grid once each is turned 45 deg?" A circle turned is the same circle; once I see "in this square grid", the answer is settled before I touch anything. Explore (A gives 4, B gives 4, the slider gives 9 and 9) only confirms it.
2. What the prediction felt like: no tension. "5 discs: corners fill" is the interesting option, because in a real 28 cm tray a fifth disc does fit in the middle with the four pushed into the corners. The new wording makes that choice wrong by definition.
3. Whether the reveal answered my question: no. My question was "can I fit more discs in my tray?", and the reveal says "changing the arrangement would be a separate experiment" and "it is not a best-packing solver". A learner who picked 5 is told nothing about why, and a learner who picked 4 leaves without the useful fact (rearranging, not rotating, can fit a fifth). The reveal also reports the 30 cm state (9 and 9) under "Your prediction held" when the question was about 28 cm.

Verdict reason: the payoff is that rotating a circle changes nothing, which the learner knew before starting. The real-life question the hook raises (can the corners be used?) is pushed aside, and the "5 discs" chooser, right in a real tray, gets no answer. This may be a premise problem for the category manager rather than a wording fix.

## After reading build.md / meta.json

- r9 blocked on the slider's 4-to-9 jump being read as rotation, and on an inverted mode indicator. Both are fixed: the A/B table shows both counts side by side and the selected button carries a check mark. My objection is different and upstream. The fact-check rewording (W-844: "in this square grid", "Discs in the grid") makes the lesson true by narrowing it until the answer is given away, and the fact-checker's own note says 5 discs fit a 28 cm tray outside the grid. A learner who picks the "5 discs: corners fill" option is right in a real tray and gets no answer.
- Route: the premise question (is "rotating a circle changes nothing" worth a lesson, or should the lesson show the 5-disc arrangement?) belongs to the Life Hacks category manager, not the builder alone.
