# Build note: ph-log-scale

(No v1 build note was written. This file starts at the revision.)

## v2 (revision)

Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state: the stage reaches pH 2, so the learner has seen 10×, 100× and 1,000× (`reached-ph-2`). `minInteractions = 1`.

| Finding | What I did |
|---|---|
| Learner 1: the first move went up to pH 7, and the reveal was reachable without seeing 10×/100×/1,000× | Gated on reaching pH 2. The first control is now "pH down 1 (×10)". The slider runs toward acid (right means lower pH; its ends are labelled "pH 7 water" and "pH 2 lemon"). Pressing each control once walks 5 → 4 → 3 → 2. In the reveal phase the stage shows pH 2. |
| Fact-check F1: "about 1,000" read as a fact about real cups | Question: "Say black coffee is pH 5 and lemon juice pH 2 (round values)." Reveal: "For the round values pH 5 and pH 2 it is exactly 1,000; real coffees and lemon juices vary, from roughly 200 to 1,300 times." c7 reworded to match (unverified). |
| F2 / learner 3: the hook says "acid", the lesson says hydrogen ions | Hook: "Coffee is about pH 5, lemon juice about pH 2. How many times the hydrogen ions is that?" The stage caption adds "Lower pH, more ions.", and the slider says "slide right for more acid". New claim c8. |
| 2: pH 7 is unreadable ("a hundredth of the outlined square") | Above pH 5 the stage now draws a zoomed copy of coffee's square as a 10 × 10 grid: one strip at pH 6, one cell at pH 7, with dashed lines tying it to the small square. |
| 4: "powers of ten" and "a hundred trillion" are told, not shown | Removed from the reveal. c6 is `withdrawn` (true, but no longer shown to the learner). |
| 5: rod/flat language does not match the stage | The reveal now uses the stage's own shapes: "a strip of 10, a block of 100, then ten blocks". |
| 6: "Steps from coffee" has no direction; pH 3 and 4 have no label | Direction added ("2 down (100×)", "2 up (1/100)"). Rejected: inventing landmarks for pH 3 and 4. Only cited liquids are labelled. Adding, say, a soft drink needs a sourced value; a CM or the fact-checker could supply one. |
| 7: the wrong-answer reveal does not name the error | Added: "pH numbers count tens, not amounts, so 3 steps apart is not 3 times." |
| F3: open the cited sources | Fact-checker's job, not mine. |

Claims: c6 withdrawn. c7 reworded (unverified). c8 added (unverified). The hook changed.

QA-path trade-off: the DOM order is pH down, the slider, then pH up. The contract presses down (4), slides right twice (2, milestone), then presses up (3). In the reveal the stage is held at pH 2 to match the text. A reversed slider (right = lower number) goes against the usual left-to-right pH chart. I chose it because "right = more acid" matches the lesson's direction of travel, and the slider's ends are labelled.

## Revision v3
Fixes from the v2 learner review: title no longer says 'Three pH steps apart' and the buttons no longer say (x10)/(/10); the multiplication appears only on the stage once pressed. The slider now runs with the number (pH 2 left, pH 7 right, ends labelled) instead of against it. The question defines pH as 'lower pH, more hydrogen ions'. Removed the told '200 to 1,300 times' sentence from the reveal and from claim c7 (reworded, unverified); the 1/100 water figure now says to slide to pH 7 to see it. Added 'Step down automatically' (one pH step per 0.3 s to pH 2; other controls are disabled while it runs) because the QA contract presses each control once and the gate needs pH 2 now that the slider is not reversed. Phone clipping of the key sentence is the kit fix (W-135), not done here.
