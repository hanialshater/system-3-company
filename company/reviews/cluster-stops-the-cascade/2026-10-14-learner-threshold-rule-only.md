# Learner review: Where a spreading idea stops (boundary: threshold-rule-only)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:51Z (phone, option 1 = "2", a wrong pick, so the "Not quite" reveal), sheet.png seen (all 18 frames), Demo.tsx read for the branches the script does not show (saw8 line, fallback line).

Boundary used (the lesson's own, from meta.json `learner`): knows a 12-person friend network, the rule "join if at least half your friends have", and fractions like 1/4 and 3/4. Has never seen the idea that a cascade stops at a tightly knit group, or any cluster-density condition.

## Findings (artifact only)

1. **Where it first asks for something I lack: the reveal's second sentence.** "8 has 3 of 4 friends inside it, the others 3 of 3, so none can join first." Everything up to then I can do with the rule I was given. Here I need two ideas the card never gives me: (a) "inside it" is a count the stage never shows (the pill on a person shows adopted friends, not friends inside the outlined group), and (b) the step from "3 of 4 inside" to "cannot join" needs "so at most 1 of 4 can be adopted from outside, which is under half". That bridge is not written anywhere. I can see 8 sat at 1/4, but "3/4 inside" does not obviously mean "blocked". The closing line ("everyone has more than half their friends inside") repeats the claim without the complement step.
2. **The prediction is a calculation, not a belief.** The graph and the rule are both on the card before I lock in. I can run it by hand: person 2 has 1 of 2 friends adopted, so it joins (rules out "2" in one look), and I can walk along the path to 7, where 8 has 1 of 4. So I reach "8" by simulating, and the idea the lesson is about (why it stops) is never asked. A learner who simulates correctly and picks 8 gets "Your prediction held" and may not read why.
3. **Answer partly visible before predicting.** Hook: "then stalls. Too few fans, or something else?" says it stalls (not 12) and flags "something else" as the interesting answer before the reveal. The locked stage already has a "Start 8,9" button, which tells me the starting place matters before I have predicted anything.
4. **The wrong-pick path (2) is confronted well.** Tapping person 2 shows "1/2" and then one Step adds a third person, which contradicts "2" without a word. That is the best moment in the lesson. But nothing on the card says "1/2 meets 'at least half'", so a learner has to connect the pill to the rule unaided.
5. **The pill "1/2" has no key on screen.** The legend explains started / adopted / not yet / new / holdouts, not the pill. Its meaning ("adopted friends / all friends") is in the accessible name only. A sighted learner reading "0/4" next to person 8 has to infer it.
6. **Told vs shown.** Shown: the stall at 8 of 12 (dashed outline "holdouts" on the final), and 12 of 12 from 8 and 9. Told: why the group blocks itself. The outline appears only at the end of a run, so I can see which four stopped, but nothing lets me compare "friends inside" with "friends outside" for each of them.
7. **13 taps to see anything.** The scripted path tapped every person (12 taps) before the first Step. Nothing forces that, but a real learner told to "tap a person to see their friends" will, and the only thing it shows is a pill. The explore invitation is weak next to "To the end" and the two Start buttons, which carry the lesson.
8. **Possible misconception from the 8,9 contrast.** "Started at 8 and 9, the same two seeds reached all 12." A learner could take away "seed inside the tight group and it works". The fix sentence ("with none among the rest, it takes everyone") is the only guard, and it is the muted last line.
9. **Reveal quotes only states reached.** The "Person 8 had only 1 of 4 friends adopted" line is conditional on having tapped 8 on the final (code: saw8), else it falls back to "Each has most of its friends inside the group". In my path I tapped 8 on the final, so the quote matched what I saw. Good.
10. **Screenshots: legible.** The graph and dashed outline are clear on the phone frame, and in the reveal frame the stage is cropped to 7, 6, 5 and the cluster so the outline and "1/4" are what remain on screen. Fine.

Confidence: moderate. Findings 1 and 2 are the ones I would stand on.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: the reveal's explanation of why the group blocks itself ("3 of 4 inside, so none can join first") skips the step from inside-count to adopted-count, and the stage never shows an inside count.

## After reading the brief

Read meta.json objective and misconception, and build.md, only after the findings above were written.

- The objective is "explain that ... every member has more than half its friends inside the group ..., so none can be the first to join". The reveal says that in one clause. Finding 1 stands: the objective asks the learner to explain a step the lesson states but does not show or bridge, and the stage has no inside-count view.
- The misconception targeted is "stops because too weak or too few seeds". Finding 2 stands: the predict asks the count, and a learner who simulates it by hand gets 8 without meeting that misconception. The hook's "Too few fans" phrase does name it, but only in the hook.
- The build note says naming "0 and 1" in the question was a deliberate change from the brief; that is what makes the prediction computable (finding 2).
- Builder's reveal intent (quote 8's 1/4 only if reached) matches what I saw; no conflict.
- The unlabelled pill (finding 5) is not mentioned in the build note's legend list, so I think it was not considered.

Verdict unchanged: revise.
