*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: draw-a-table-knot
lesson version: v3
boundary: knows a knot is a closed loop of rope and that a drawing shows which strand is on top at each crossing; does not know that the first number in a table name (the 6 in 6₁) is the fewest crossings any drawing of that knot can have, so a drawing can show more crossings than its name says, nor that the second number is only a place in the table (meta.json `learner`, the only field read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/draw-a-table-knot/sheet.png, recorded 2026-10-17T01:03:22Z, QA path, Pixel 7 profile; plus my own 390x844 probe frames, see Method)
Verdict: launch

## Method

- Built this worktree (head b14e8715, meta.version 3) into a private dist dir (`NEXT_DIST_DIR=.next-le-knot3`), ran `npm run walkthrough -- draw-a-table-knot --port 3793` (QA path: crossings 1-6 on 6₁, then the 5₂ chip, then reveal; option 1).
- Then a Playwright probe at 390x844 (isMobile, touch) on `next start -p 3794`, eight paths: (A) locked stage, (B) correct prediction + one switch, (C) one switch to 0₁ only, (D) switch 1, switch 2, Reset, reveal, (E) 5₂ chip then one 5₂ switch, (F) chips only, no switch, (G) option 3 + QA-like path ending on the 5₂ chip, (H) 6₁ switch, 5₂ chip, three 5₂ switches. Reveal text and stage text were read at reveal time on every path.

## Findings (written from the walkthrough and probe before reading build.md, design.md, meta.json claims or the earlier review)

1. **Where understanding first broke: it did not break at the core idea.** The first switch puts "Crossings drawn: 6 · Name: 4₁" on the stage. For a mind that thinks the name counts crossings in a drawing, that line is a direct contradiction it can see: six crossings, name says 4. The predict question also counts the opening drawing for me ("This drawing of 6₁ has 6 crossings") and I can count six in the picture, so the setup holds.

2. **What the prediction felt like.** Fair and live. Option 1 ("the crossings in any drawing of it") is what I would pick: the question has just told me the 6₁ drawing has 6. Option 2 ("the fewest...") reads as a strange qualifier until the stage shows a drawing with more crossings than its name. Option 3 ("loops") is a clean decoy. Controls are disabled while locked (probe A: all 9 controls disabled), so I could not peek.

3. **Whether the reveal answered my question: yes, and it now matches the stage on every path I tried.** On the QA path the last tap is the 5₂ chip (stage "5 drawn, 5₂"); pressing the reveal returns the stage to 6₁ with the switched crossing ringed and "Crossings drawn: 6 · Name: 4₁", and the reveal says "Your 6₁ still had 6 crossings drawn, but its name became 4₁." Probes C, D, E, G and H each quote the knot and number on screen at reveal (0₁ on 6₁; 3₁ on 5₂; 0₁ on 5₂). Probe F (chips only, no switch) keeps the reveal locked, so the reveal is never asked to quote a switch that did not happen.

4. **(Note, not blocking) Switches still restore silently.** A second crossing tap undoes the first without a word: crossing 1 gives 4₁, crossing 2 then gives 0₁ and the ring at crossing 1 is gone with its strand back as it was (probe D frames 1-2; QA steps 1-3 alternate 4₁ / 0₁ / 4₁). A learner who thinks switches add up may believe "two switches made a plain loop". That belief is wrong, but it does not touch the target idea (the drawing keeps 6 crossings while the name changes), so I do not block on it. The panel could say "one at a time".

5. **(Note, not blocking) The reveal moves the stage without a tap.** Probe D: after Reset the stage says "6₁"; pressing the reveal puts the 0₁ switch back on the stage. On the QA path the stage jumps from the 5₂ drawing to the switched 6₁. The jump is to the state the reveal sentence describes and the switched crossing is ringed, so it reads as "here is what you did", but it undoes my Reset without saying so.

6. **(Hypothesis, not blocking) "4₁ can be drawn with 4 and never with fewer" is told, not seen.** The stage never shows a 4-crossing drawing of 4₁ (or a crossing-free drawing of the 0₁ tangle). The lesson's argument against option 1 only needs the 6-drawn / 4₁ contradiction, which is seen; the "fewest" half is taken on trust. A curious learner's next question ("how would I know it can be done with 4?") is left open. Fine for 60 seconds; worth a human check of whether "fewest" sticks.

7. **(Note) "Your 6₁ still had 6 crossings drawn, but its name became 4₁."** "Your 6₁" refers to something that is no longer 6₁. I parsed it as "your drawing" on the second read. Minor.

8. **Layout at 390x844.** Reveal text, stage, chips and the trust link fit in one scroll; nothing clipped in the probe frames. Subscripts are legible.

Verdict reason: the reveal now quotes the knot and numbers that are on the stage at reveal time on the QA path and on every alternative path probed, the gate needs a real switch, and the remaining notes (4-7) do not stop a first-time learner from seeing a 6-crossing drawing whose name says 4.

## Earlier learner walk: is each finding closed?

Read after the findings above were written: `2026-10-16-learner-knows-drawings-not-names.md` (v1, verdict revise).

| v1 finding | Status at v3 | Evidence from this walk |
|---|---|---|
| 1. Break at the first tap: drawings of one knot differing is not in the boundary; "fewest" is never produced by exploring, only told | **Open, by design, not blocking.** Same as my finding 6. The 6-drawn / 4₁ contradiction is seen and refutes option 1; "fewest" is still told. v1 itself judged this acceptable; build.md/design.md give the picture-rule constraint behind it. | QA frames 02-07; probe B-H |
| 2. Options 1 and 2 both lean on "any" and can read as near-identical | **Open, minor.** Option text unchanged ("The crossings in any drawing of it" / "The fewest crossings any drawing of it can have"). I did not stumble on it this walk; a skimming human might. | transcript Predict |
| 3. Reveal answers "how can a 6-crossing tangle be 4₁?" only by assertion | **Open, not blocking.** Same as my finding 6. | reveal text unchanged |
| **4. QA path ends on "5 drawn, 5₂"; reveal says "6 crossings drawn ... 4₁"; last on-screen evidence agrees with the wrong option** | **Closed.** At reveal the stage now returns to the last switch: 6₁ chip active, crossing 6 ringed, bold "Crossings drawn: 6 · Name: 4₁", Seen line "Seen on 6₁: 6 drawn, name 4₁", and the reveal says "Your 6₁ still had 6 crossings drawn, but its name became 4₁". Screen and sentence now agree, and the last thing on screen is the counter-example, not the 5 = 5₂ case. Held on every other ending I probed (after Reset, after 5₂ switches, after a 0₁ switch, option 3). Side effect noted as my finding 5 (the reveal moves the stage without a tap and undoes a Reset). | QA 08-step-7 vs 09-reveal; probe C, D, E, G, H reveal stage text; probe frames kept only in the session scratchpad |
| 4 (sub). The 5₂ chip is never introduced | **Open, minor.** Still no word on what 5₂ is; on the QA path it is tapped and left unswitched. Switching its crossings now gives a reveal that quotes 5₂ correctly (probe E, H), so it is no longer harmful, only unexplained. | probe E, H |
| 5a. A second tap silently restores the first switch | **Open, not blocking.** Same as my finding 4. build.md documents one-at-a-time as intended; the learner is not told. | QA 02-04; probe D 1-2 |
| 5b. Trust link read 7/8 (c5 unverified) | **Closed.** Reads "8/8 claims checked"; all eight claims verified in meta.json. | sheet.png footer |
| 5c. Second number arrives as a bare fact | **Unchanged, accepted** in v1 and here. | reveal last sentence |

## After reading build.md / meta.json

- **Intent vs experience.** Objective: "explain that a knot's name number is the fewest crossings any drawing of it can have, using a drawing that shows more crossings than its name." The second half is on the stage at reveal time on every path; the "fewest" half is told (findings 6, v1 1/3). keyState ("a switched drawing whose crossings drawn differ from its name's first number") is now the state the stage shows at the reveal, which is the W-1602 change in build.md.
- **One switch at a time is intended** (build.md line 9: "tapping another restores the first"). My finding 4 is about telling the learner, not about the behaviour.
- **Unrecorded claims:** none found. Every factual sentence I saw maps to c1-c8 in the trust sheet; all eight are `verified` in meta.json.
- **Evidence link not added.** meta.json `evidence.simulatedLearner` lists only the v1 review. My brief says not to edit the lesson, so this record is not linked there; the builder or whoever owns meta.json evidence should add `company/reviews/draw-a-table-knot/2026-10-17-learner-walk-v3.md`.
- **Viewport.** The walkthrough tool uses the Pixel 7 profile (412 px wide), not 390x844; the 390x844 evidence is my probe. I did not walk 360x740, where build.md reports a 62 px stage-top crop at reveal (design lead's lane).
- **Recall** (9 crossings, name 5₂) is not shown in the walkthrough; it is a fair transfer test of the told half.
