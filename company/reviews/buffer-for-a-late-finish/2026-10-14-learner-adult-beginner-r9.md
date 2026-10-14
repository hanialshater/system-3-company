*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9, release-build walkthrough): buffer-for-a-late-finish
lesson version: v1 (meta.json version 1, status review)
boundary: adult-beginner (keeps a calendar; books things back to back; has never planned a gap for overruns).
Screenshots seen: yes (artifacts/walkthroughs/buffer-for-a-late-finish/sheet.png, 5 frames; walkthrough re-run 2026-10-14 because the earlier transcript was an aborted page.goto timeout)
Verdict: revise (blocking finding below)

## 1. From the artifact (written before reading meta.json, build.md or the crit)

- BLOCKING: the late finish never happens. The hook says "One task runs five minutes late", but no control makes the draft run late. With touching blocks (0–20, 20–35, 35–45) "Test plan" reports Overlap 0m. So the stage shows the wrong option ("Touching blocks") working perfectly. A beginner leaves with evidence that buffers are unnecessary. The only thing the buffer visibly does is push Finish from 45m to 55m, a cost with no benefit on screen.
- Where I first lose it: the hook asks "Which appointment absorbs it?", but the options are "A five-minute gap / Touching blocks". Neither is an appointment. And "A five-minute gap" for "five minutes of delay" is the option worded to match the question.
- Amounts the reveal explains are not shown. The reveal says "A gap can absorb up to its length of delay". The delay (5 min) is not on the stage, the gap length is never labelled (I infer 5 from 20 → 25), and nothing shows delay ≤ gap → no overlap, delay > gap → overlap.
- The Start slider moves the call to 27–42; notes stay at 45–55. Overlap stays 0. It is not clear what the slider is for in this lesson.
- Reveal quotes my state (0 overlap, finish 55) correctly, but that state is the same as with no buffer, so it proves nothing.
- Bars are not drawn to the 0–100 axis scale in an obvious way; "0" and "100" labels with small blocks make overlaps hard to see (minor).
- Recall (answer text from the trust sheet: "ten minutes of overrun needs a ten-minute gap, so 9:40"): needs the gap ≥ delay rule, which the lesson tells but does not show; an adult could also get it from common sense. See section 3.
- Phone fit: pass.

## 2. Earlier findings, read after section 1

None. This is the first learner review of this lesson (evidence.simulatedLearner was empty).

## 3. After reading meta.json, builder notes and the crit

- Version recorded: meta.json version 1. Boundary in meta.json: knows ["reading short labels and comparing simple counts"]; I used the same, made concrete as an adult beginner.
- meta.json doesNotKnow: 'Distinguish planned slack from overlapping bookings.' The stage never produces an overlapping booking from a delay, so the distinction is never visible.
- Recall: call 9:00–9:30 may run ten minutes over (9:30 / 9:35 / 9:40), key 2. Good transfer: 9:30 is the touching-blocks misconception, 9:35 a slip. It needs the gap ≥ overrun idea. But the stage never showed an overrun, so this recall tests something the lesson only told.
- Builder notes: No build.md. Trust-sheet c1 says the fixture is stipulated; nothing there adds a delay control. The blocking finding stands.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, read after section 1): its reusable lesson 1, 'Draw the base, not only the result... stages that show only totals plus a formula move the mechanism into the reveal's prose', matches what I found here independently: the delay the reveal explains is never on the stage.
- Verdict: revise (blocking finding below).
