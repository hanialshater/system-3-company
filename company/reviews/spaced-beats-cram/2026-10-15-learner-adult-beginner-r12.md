*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r12): spaced-beats-cram
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; has heard "don't cram" but does not know that a single block can tie or win on an immediate test while spacing wins weeks later)
Screenshots seen: yes (artifacts/walkthroughs/spaced-beats-cram/sheet.png, recorded 2026-10-15T22:20; Day slider also checked in the browser at 1, 2, 3, 5, 10)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Plan A" (the wrong answer, on purpose); tapped Test right after, Test a month later; slid Day to 28; opened reveal. In a separate browser check after lock-in, I set Day to 1, 2, 3, 5 and 10.

r11 findings, checked against v2:
- r11 finding 1 (spacing won even at the first test): **fixed.** "Test right after" now shows A 93% vs B 90%, so cramming leads first, and "Test a month later" flips it to A 23% vs B 37%. Running the two tests one after the other gives me the reversal. That is the surprise, and it is now on the stage.
- r11 finding 2 (recall step confound): **fixed.** Both plans are "rereading" and the labels mention no recall step. The trust sheet says so outright.
- r11 finding 3 (code-speak labels): **fixed.** "A: 3 hours on day 0" and "B: 1 hour on each of 3 days" read at once.
- r11 finding 6 (no reason in the reveal): **fixed.** The reveal gives a one-line mechanism (a later session meets something half-forgotten) with a source behind it (c6).

1. **Where understanding first broke: nowhere that blocks.** The closest thing is the panel line "drag the day to see where the plans cross". The slider moves in whole days and the plans have already swapped by day 1 (A 82%, B 85%). So the "cross" is a flip between the first two slider positions, not a point I can find. A beginner might expect to hunt for a crossing somewhere in the middle of the month and find only "B ahead everywhere after day 0". This is a note, not a blocker: the two test buttons already carry the reversal.
2. **What the prediction felt like.** Fair, and no longer a straw-man set: "About the same: same 3 hours" is a real belief, and I could pick Plan A honestly. But the question asks only about "a month later", so the "cramming wins at first" trap appears only in explore, after I'm committed. A learner who picks B gets "your prediction held" and might never notice the 93/90 test. Not blocking: the reveal states the immediate result in its first sentence, so every learner reads it.
3. **Did the reveal answer my question ("what changes a month later?")?** Yes. It quotes both tests I ran, labels the numbers as toy, says research shows the same pattern (tie or win at once, spacing wins later), and gives a reason. Having been wrong, I now know why cramming felt right: it really does lead right after.
4. Minor: "Right after the last hour, A led" is slightly odd for A, which has a single 3-hour block. "Right after the last session" would read cleanly. The toy curves are still dramatic (23% vs 37%), but "toy model" and "not a forecast of your memory" appear on both the stage and the reveal.

Verdict reason: the r11 blocking finding (spacing won at every horizon, against c5) and the recall confound are both fixed. What remains is copy notes (the "where the plans cross" panel line, "last hour" wording) that don't stop a first-time learner.

## After reading meta.json

- Version 2, status review. The objective ("separate the research-supported spacing effect from invented memory curves") now shows on the stage: toy numbers are labelled at every result, and the research sentence (c5) describes the same pattern the toy shows instead of contradicting it.
- Misconception ("equal hours imply equal recall regardless of calendar") is answered by "About the same: same 3 hours" and the month-later test. With the recall step gone, the calendar is the only difference.
- Mismatch to route: learner.doesNotKnow says the long block "feels as good or better **the next day**". The stage shows A ahead only on day 0, and behind by day 1 (82% vs 85%). Either the brief's "next day" should become "right after", or the curves should keep A level through day 1. Owner: learning-designer / demo-builder. Not blocking: the learner-facing text says "immediate test", which matches the stage.
- The recall question (four one-hour sessions vs one four-hour session) fits the reveal.
- The claims c1, c3, c5 and c6 show "NOT YET CHECKED" on the trust sheet; fact-checker owns those before publish. This review does not cover claims.
