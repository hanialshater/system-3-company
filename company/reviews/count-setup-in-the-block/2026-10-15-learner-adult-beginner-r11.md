*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): count-setup-in-the-block
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know to include setup duration rather than just execution time)
Screenshots seen: yes (artifacts/walkthroughs/count-setup-in-the-block/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "The call starts on time"; tapped A · Book 10 min, B · Book 15 min; slid call Start to 17; opened reveal.

1. **Where understanding first broke: what I booked is never drawn.** The hook says I booked the task's ten minutes of work. But the stage always draws the task as its real 15 minutes ("setup 5 · work 10", 0–15), and pressing "A · Book 10 min" changes only a table cell ("Booked for the task: 10 min"), not the picture. I never see the 10-minute booking next to the 15-minute reality, which is the gap this lesson is about. The overlap is visible on the predict card (task bar runs past 10, call starts at 10), so the answer is drawn before I commit.
2. **What the prediction felt like.** Reasonable wording ("What is happening at 10?") and a real trap ("The call starts on time"). But the drawing undoes the trap, since the setup segment is visible in the task bar.
3. **Slider.** Moving the call to 17 makes it clash with "file" (2 min). That is a nice reminder that pushing things later has knock-on effects, though "Yours: Booked for the task –" is a dangling dash.
4. **Did the reveal answer my question?** "The task is five minutes of setup plus ten of work. Booking only the ten leaves the call starting while five minutes remain." That is clear and is the right habit. It would land harder if the stage had shown a booked block shorter than the real one.

Verdict reason: the stage never draws the 10-minute booking against the 15-minute task (A changes only a table number), so the mismatch the lesson is about is never shown, and the predict card already shows the overlap.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective ("include setup duration rather than just execution time") is stated in the reveal. The stage needs a drawn booked block (10 min) next to the real task (15 min) to show it (finding 1).
- Misconception ("a task's booking only needs its work time") matches the hook and the "call starts on time" option.
- Recall (print job, 10-min warm-up, 25-min slot) fits and is a good transfer case.
- Fix route: demo-builder.
