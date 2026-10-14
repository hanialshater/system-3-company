# Final learner review: two-said-blue

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · FINAL pre-publish
boundary: knows a clue right 2 in 3 beats a coin flip and that more independent clues help; has never heard of information cascades or herding
artifacts: walkthrough regenerated at c9e4df0d (phone, option 0 path); sheet.png and single frames seen: yes. Demo.tsx reveal branches read (reveal text is current).
Kit note (not charged to the lesson): on phone the reveal frame crops/scales the stage.

## Part 1: findings from the artifact (before meta.json, earlier reviews, build.md)

**Idea the learner lacks:** once the earlier picks lead by two, later people copy and their own clue no longer matters, so the crowd stops adding information and can lock onto the wrong colour.

**Answer visible before predicting.** No leak now. Title "When 100 people pick the same colour" and hook "Is the crowd more reliable than one person?" are neutral. The question states the copy rule in full. "Almost never" is a natural lure for someone who believes in crowds; "about half" is too extreme for 2-in-3 clues. A learner can reason to 1 in 5 only by elimination, which is acceptable for a prediction card. Option 0 is the correct one in the script, so I cannot say how a wrong pick reads; Demo.tsx shows the reveal body is identical for any pick (only the header differs).

**Where understanding first broke.** Steps 1-3 (tapping 60 / 80 / 2 in 3): the stage stays empty ("No run yet"); only the "Clues right" readout changes. Three taps, no consequence. Step 4, Run 1: all 100 blue. The crowd looks perfect and the learner wonders where the tension is. Step 5, Run 100: 18 wrong of 101. Step 6, Run 10,000: 19.9% wrong, and the single crowd on stage is almost all red (1 blue of 100): the strongest image, nearly everyone wrong. Step 7, Pool: 62 of 100 clues blue against 1 blue pick in the same crowd. That contrast is the lesson, shown.

**Told vs shown.** The cause the brief promises (after a lead of 2 your clue is ignored) now has stand-ins on the stage: the ring where the lead of 2 first appears, outlined dots for people who picked against their own clue (61 in the last crowd), and the Pool toggle. The reveal points at all three. That meets the told-vs-shown decision. The missing anchor from earlier rounds is present: "Alone, one person is wrong 33.3%".

**Reveal quotes only reached states?** Yes: all numbers come from the learner's own tally, and the stage-pointing paragraph is about the last crowd shown.

**NEW problem at the reveal.** The scripted path ends in the Pool view. The reveal then says "the ring marks where the picks first led by 2 ... 61 people picked against their own clue (outlined). Tap Pool the clues". But in that view the stage shows clues (label "Each person's clue, counted as a vote"), no ring, no outlines, and the button now reads "Show the crowd", not "Pool the clues". The learner is told to tap a button that does not exist and to look for marks that are hidden; they must first tap "Show the crowd" to find the ring. On the reveal frame at phone size the stage is also tiny, so the small outlines are unreadable even in the picks view.

**Other.** "the exact chance is 20.0%" is mildly jargon; "Pooled wrong (ties excluded)" is long but clear. Locked predict stage clips the bottom controls (known kit/phone).

**Verdict for the current version: launch with notes.** No false claim, no dead control, no leak, and the why is on stage. Revise would be warranted only if the reveal instruction mismatch is judged to break the cause.

**Top remaining finding:** reveal text names the "Pool the clues" button and the ring/outlines, but the reveal opens in the Pool view where the button reads "Show the crowd" and the ring and outlines are not on screen. Route: demo-builder (make the reveal open on the picks view or word the pointer to both states).

## Part 2: after reading meta.json, the earlier reviews and build.md

- meta doesNotKnow: a copied pick is not an independent clue; the crowd stops adding information after two matching picks. The experience delivers both through the Pool contrast.
- Earlier r2 findings: neutral title/hook (fixed: the leak I reported is gone); no 1-in-3 anchor (fixed); rule withheld (fixed); reveal did not point at the stand-in (fixed, but see the new mismatch); dead taps in steps 1-3 (still there, minor); "exact: 20.0%" jargon (still there, minor).
- Nothing in meta.json changes the verdict.
