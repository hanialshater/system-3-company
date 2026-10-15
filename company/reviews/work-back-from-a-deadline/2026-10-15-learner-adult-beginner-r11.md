*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): work-back-from-a-deadline
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Compute a latest start from duration and deadline.)
Screenshots seen: yes (artifacts/walkthroughs/work-back-from-a-deadline/sheet.png, recorded 2026-10-15T21:37, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Minute 10"; tapped Test plan (draft 20–50), Start backwards (draft 10–40); slid Start to 12 (draft 12–42); opened reveal.

1. **The prediction is a subtraction.** "Latest start for 30 minutes due at minute 40?" is 40 − 30 = 10, and "Minute 30" is not a tempting wrong answer. The real planning trap (forgetting the steps after the draft, or the time the next step needs) is on stage but not in the question.
2. **Where understanding first broke: "Due40 50m".** The readout reads as one code. From the alt text I learned it means "the draft finishes at minute 50; it was due at 40". A plain label ("Draft ends: minute 50 (due 40)") would have saved me.
3. **The schedule only half works backwards.** Review and send come after the draft's deadline (40–50, 50–55), so the deadline is for the draft alone. The title "Plan backwards" made me expect the final send to be the deadline and the whole chain to be worked back from it. When I slid Start to 12, the draft overlapped review by 2 minutes, but review did not move, which looks like a one-person clash the planner just accepts.
4. **The reveal mixes a success and a failure.** "Your prediction held" is followed by "Your layout has 2 overlapping minutes ... extends 2 minutes beyond its minute-40 deadline". It is reporting my slider at 12, which is fine, but on first read it sounds like my answer was wrong.
5. **The rule is clear**: "Latest start equals deadline minus duration".

Fixes (for the builder):
- Put the deadline on the last step (send) and ask for the latest start of the first step; that makes "work back" a real calculation (55 − 35 = ...).
- Plain readout labels.
- Open the reveal with the answer for the predicted start, then report the explored state.

Verdict reason: the prediction is plain subtraction, the key readout ("Due40 50m") is unreadable, and only the first task is worked back, so the lesson does not show what planning backwards adds.

## After reading meta.json

- Objective "compute a latest start from duration and deadline" is delivered, but it is one subtraction; the misconception field ("Minute 30") is not a belief most adults hold. The lesson would earn its title if the deadline sat on the last step of the chain (finding 3).
- Fix route: demo-builder (readout labels, reveal order); Life Hacks category manager for the premise (single subtraction vs a chain worked back).
