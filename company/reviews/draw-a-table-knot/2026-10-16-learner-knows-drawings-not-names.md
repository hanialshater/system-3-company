*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: draw-a-table-knot
lesson version: v1
boundary: knows a knot is a closed loop of rope and that a drawing shows which strand is on top at each crossing; does not know that the first number in a table name (6 in 6₁) is the fewest crossings any drawing of that knot can have, so a drawing can show more crossings than its name says, nor that the second number is only a place in the table (meta.json learner field; only that field was read before writing the findings)
Screenshots seen: yes (artifacts/walkthroughs/draw-a-table-knot/sheet.png, recorded 2026-10-16T23:39:46Z, phone viewport, choice option 1; frames 01 to 04 also opened and cropped to check that tapping a new crossing restores the previous one)
Built from: 5c5c719e (worktree build, NEXT_DIST_DIR=.next-le-knot, next start on port 3743)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: step 1, the first tap (frame 02).** The readout changes from "Crossings drawn: 6 · Name: 6₁" to "Crossings drawn: 6 · Name: 4₁". The idea this needs, and the boundary does not give, is that *a knot is the same knot however the rope is rearranged, so one knot has many drawings with different crossing counts*. My mind knows "a knot is a closed loop" and "a drawing shows over and under"; it has never been told that drawings of one knot can differ. So "6 crossings, name 4₁" reads as a label that disagrees with the picture, not as "this tangle can be pulled into a 4-crossing drawing". I have to take the name on trust: nothing on the stage shows a 4-crossing drawing of the thing I am looking at. The 0₁ result (frames 03 and 06: a 6-crossing tangle called "plain loop") is the stronger surprise, and also the harder one to believe, for the same reason: I never see it come apart.
   What does get through: "the 6 is not just the crossings in this drawing", because the same 6 drawn crossings give names 4₁ and 0₁. That refutes option 1 well. What does not get through from the exploration: *fewest*. Nothing I do produces a drawing with fewer crossings, so option 2 is only reached by the reveal telling me.

2. **What the prediction felt like.** Fair and quick. The card says "This drawing of 6₁ has 6 crossings", so option 1 ("The crossings in any drawing of it") is the obvious pick, and option 2 sounds like a hedge I have no reason to prefer. That is a real misconception to test, which is good. One wobble: "any" carries both options ("in any drawing" / "any drawing of it can have"), and at first read the two differ only in "fewest". A reader who skims sees two near-identical answers.

3. **Whether the reveal answered the question I had.** My question after exploring was "if the name is not the crossings drawn, what is it, and how can a 6-crossing tangle be called 4₁?". The reveal answers the first half directly ("the fewest crossings any drawing of that knot can have", "4₁ can be drawn with 4 and never with fewer"), and "The table draws each knot with that fewest, so 6₁ had exactly 6" neatly resolves why the starting picture matched its name. "Your switch made a new knot" answers why the name changed at all. It answers the second half only by assertion; acceptable for 60 seconds, but this is the point a sceptical learner stops believing rather than understanding.

4. **The design-lead's question: ending on 5₂ while the reveal talks about 6₁ → 4₁ (frames 08 and 09).** Partly, with a stumble. On the QA path my last action was tapping the 5₂ chip. The stage at the reveal reads "Crossings drawn: 5 · Name: 5₂" in bold; directly below it, small and blue, "Seen on 6₁: 6 drawn, name 4₁"; and the reveal opens "Yours still had 6 crossings drawn, but its name became 4₁". Two problems:
   - The reveal's "Yours still had 6 crossings drawn" sits under a stage whose large text says 5. My first reading is "mine has 5", a direct contradiction. The reveal never says "on 6₁" or "before you switched to 5₂", so the only bridge is the small "Seen on 6₁" line, and "Seen on 6₁:" is a cryptic label (I read it as "last thing seen on the 6₁ drawing" only on a second look).
   - Worse for the idea: the last evidence on screen before the reveal, "5 drawn, name 5₂", *agrees with my wrong prediction*. The final picture supports option 1 at the moment the reveal tells me option 1 was wrong.
   I think most learners on this path still make the connection, because 4₁ appeared on four of the six taps a few seconds earlier and memory carries it. But it is carried by memory, not by the screen; the screen argues the other way. The 5₂ chip is also never introduced: I don't know what 5₂ is or why it's offered, and I did not switch any of its crossings, so it added nothing on this path.

5. Smaller notes, not blocking:
   - Tapping a second crossing silently restores the first (crop of frames 02 to 04: the earlier crossing returns to its original over/under). Nothing says so; a learner may think switches accumulate and read "0₁" as the result of two switches.
   - The trust link reads "7/8 claims checked" on every frame.
   - The second number ("only its place in the table") arrives in the last sentence with no moment in the exploration that bears on it; it lands as a fact, which is fine.

Verdict reason: on the QA path the reveal's "Yours still had 6 crossings drawn, but its name became 4₁" sits under a stage reading "Crossings drawn: 5 · Name: 5₂", the last on-screen evidence agrees with the wrong answer, and only the small "Seen on 6₁" line links them; the reveal (or the stage at reveal time) needs to name 6₁ so the learner does not have to rebuild the connection from memory.

## After reading build.md / meta.json

Read after the findings above were written: meta.json (all but the claims array, which I saw as the trust sheet in the transcript), then the 5₂/Seen/reveal lines of design.md and build.md.

- **Intent vs experience, objective.** The objective is "explain that a knot's name number is the fewest crossings any drawing of it can have, using a drawing that shows more crossings than its name". The second half is met on the stage (6 drawn, name 4₁; finding 1). The "fewest" half is told in the reveal, not shown. design.md (Interaction) explains why: extra-crossing drawings of the same knot are blocked by the picture rules, so a switched table knot is the only stand-in. I accept that constraint as given; my finding 1 is the cost of it, written so whoever owns the rule can weigh it, not a request to break it.
- **Seen line was built for exactly the design-lead's case.** build.md (strict count) says "on" was added to the Seen line so the reveal's 6₁ sentence is visible after the learner moves to the 5₂ chip. In my walk the line does carry the fact, but at small size under a bold "Crossings drawn: 5 · Name: 5₂", and the reveal text does not point at it (finding 4). The fix belongs to the builder and the design lead, not here.
- **Misconception in meta.json** ("counts something you can see in its drawing, such as the crossings or the loops") matches what my mind brought. The 5₂ chip, unswitched, shows count = name and so supports that misconception; design.md (Interaction) makes the same point about tap-to-count ("Counting the table drawing shows count = name. That supports … the misconception"). The QA path ends on that state.
- **Unrecorded claims:** none found; every factual sentence I saw maps to c1 to c8 in the trust sheet. The trust link reads 7/8 because c5 is back to unverified after the W-1591 wording change (build.md); that is the fact-checker's lane.
- **Recall** (9 crossings, name 5₂) is a fair transfer test of the told idea; not shown to me in the walkthrough.
