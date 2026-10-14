*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): wheel-needs-four-colours
lesson version: v2
boundary: adult-beginner (knows backtracking tries a choice and undoes it on a dead end; has never thought about map colouring or odd rings)
Screenshots seen: yes (artifacts/walkthroughs/wheel-needs-four-colours/sheet.png)
Verdict: launch

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "2"; Run backtracking (3 colours, ring of 5); 4 colours; Ring of 4; tapped regions C to 4; tapped red, blue, yellow, purple; Undo; opened reveal.

1. **The hook points away from 3, and so toward 4 (revise).** "Surely three colours keep every neighbour different?" is rhetorical doubt: the "Surely ...?" frame tells the reader that three fails. The centre plus a ring makes 2 look too few to most adults, so the hook leaves 4. That is the phrase case of "No answer before the commit". The title "How few colours for the plaza?" is neutral, and so are the options (2 / 3 / 4, bare numbers).
2. **The why is on the stage.** After "Run backtracking" the ring of five reads blue, yellow, blue, yellow, and region 5 is outlined red with "region 5: no colour left". With the red centre, you can see the two ring colours alternating and region 5 meeting both. "Ring of 4" then alternates cleanly with 3 colours. The odd/even contrast, which is the idea, is drawn and not only told. A first-time learner can get it from the two wheels.
3. **Backtracking itself is not seen.** One tap jumps to the end state: "6 dead ends, no colouring." The learner never watches a try and an undo. The manual region and colour buttons and Undo exist, but they come after the key states, on the ring of 4. The closing line "trying and undoing is often the tool" is mostly told. Minor for the main idea, since the parity argument carries it.
4. **Reveal vs stage.** "6 dead ends" appeared only in the step-1 status line. When the reveal opens, the stage shows the ring of 4 and the run trace says "5 ring, 3 colours: dead end" with no count. The ring-of-five picture is no longer on the stage either, but the trace row carries the result. Minor.
5. **Phone layout:** with five setup buttons, six region buttons and four colour chips, the colour chips are clipped at the bottom of the stage in steps 3 to 8, and the wheel scrolls off the top by steps 9 to 13. A learner picking a region then a colour has to scroll inside the stage. Moderate friction, not blocking.
6. A learner who chose "2" gets no direct line on why 2 fails (the centre touches every ring region, so at least 3). The reveal covers 3 vs 4 only. Minor.

## After reading the brief and the r6 review

Second look at finding 1: r6 read "Surely three colours...?" as fair bait toward 3. The standard's own model hook ("Splitting looks like extra work. It isn't.") uses the same tension style. So I downgrade finding 1 from revise to **minor (judgment call)**: some readers will take "Surely" as a trick signal, others as the naive baseline. Worth a pedagogy-critic look, not a block.

r6 (v1) findings:
1. The ring-of-four contrast was told only: **fixed**. "Ring of 4" is a button on the same wheel; it alternates with 3 colours, and the reveal points at it.
2. The locked frame cropped the colour row: **partly fixed**. The locked frame has fewer rows now, but the colour chips are still clipped in steps 3 to 8.
3. "6 dead ends" with no undo ever seen: **not fixed**, minor.
4. The "no fast method" sentence is told context: unchanged, fine if claimed.

Verdict reason: the odd/even parity that decides 3 vs 4 is drawn on the same wheel and the learner reaches both cases. The remaining items are friction, not loss of the idea.
