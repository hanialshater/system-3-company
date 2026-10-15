*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): buffer-for-a-late-finish
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know to distinguish planned slack from overlapping bookings)
Screenshots seen: yes (artifacts/walkthroughs/buffer-for-a-late-finish/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Both clash by 5 min"; tapped A · Touching, B · 5-min gap; slid call Start to 27; opened reveal.

1. **Where understanding first broke: the notes block jumps.** Pressing B moves the call from 20–35 to 25–40, as expected, but it also moves "notes" from 35–45 to 45–55. That is a second 5-minute gap after the call that nobody mentioned. When I then slide the call to 27–42, notes stays at 45–55, so the second gap silently shrinks to 3. I could not tell whether notes belongs to the plan, whether it moves with the call, or why the day now ends 10 minutes later. The cost of a buffer (the day ends later) is real and worth teaching, but here it shows up as an unexplained jump and goes unnamed.
2. **What the prediction felt like.** The hook and the question both tell me the overrun ("runs 5 minutes over"), and the options name the fix ("Gap, call at 25"). With the overrun given, adding 20 + 5 is all it takes. The real-life difficulty, that you don't know in advance whether or how much a task will overrun, is gone, so the prediction tests arithmetic, not the habit of booking slack before you know you need it.
3. **Did the reveal answer my question?** It says "a gap can absorb up to its length of delay", which is correct and honestly caveated. It does not say what the gap costs or how to choose its size when the overrun is unknown, which is the question a planner actually has.

Verdict reason: B moves the notes block 10 minutes with no explanation (and the slider then leaves it behind), and with the overrun stated up front the prediction tests addition rather than the decision to plan slack before you know the delay.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective ("distinguish planned slack from overlapping bookings") shows in the table (gap vs overlap rows). The slack is chosen with the overrun already known, so "planned" is weak (finding 2).
- Misconception ("back-to-back blocks are fine; a delay will be absorbed somewhere") is a real belief. The prediction would test it better if the overrun were revealed only after the plan was chosen.
- Recall ("may run up to ten minutes over") already uses uncertain wording, which is the framing the main card lacks.
- Fix route: demo-builder (explain or remove the notes shift; name the buffer's cost in the reveal).
