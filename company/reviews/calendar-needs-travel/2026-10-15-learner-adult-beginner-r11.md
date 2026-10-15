*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): calendar-needs-travel
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know to reserve travel as a separate time block)
Screenshots seen: yes (artifacts/walkthroughs/calendar-needs-travel/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Late by 5 min" (correct); tapped A · Meeting at 10, B · Meeting at 15; slid meeting Start to 17; opened reveal.

1. **Where understanding first broke: the calendar that "shows the slot free" is never shown.** The hook's premise is that the calendar looks free because travel isn't on it. But the predict stage already draws travel as its own block (0–15) overlapping the meeting (10–30). So the mistake the lesson is about, a calendar with no travel on it looking free, never appears. I see the answer drawn before I predict.
2. **What the prediction felt like.** "You leave at 0 and travel 15 minutes. The meeting is booked for 10." That is a subtraction with the answer in the picture. I had no real choice to make.
3. **Bare minute numbers read like clock times.** "Booked at 10, leaving at 0" made me think of 10 o'clock and midnight until I read "One person · minutes" in small type. "Gap before meeting: 5 min short" is also awkward; "5 min late" would say what it means.
4. **The slider adds a good wrinkle.** Moving the meeting to 17 makes it clash with email (2 min). That shows that pushing a meeting later has a cost too. The reveal reports it but doesn't comment.
5. **Did the reveal answer my question?** "Travel time occupies a block just as the meeting does" is the right idea. But since the stage always showed travel as a block, the reveal confirms what the picture had already told me, rather than correcting a belief.

Verdict reason: the stage draws the travel block from the first card, so the "calendar shows the slot free" situation the hook describes never appears and there is nothing to discover. The lesson needs a view of the calendar without travel (the one that looks free) to contrast with the one that has it.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective ("reserve travel as a separate time block"): the stage takes that habit as given rather than showing why it is needed (finding 1).
- Misconception ("a free calendar slot means the meeting fits, travel aside") needs a view where the slot looks free, i.e. a calendar without the travel block. The recall question ("your calendar is free 10:00–10:30 ... 25 minutes away") describes exactly that situation and is a better hook than the card.
- Fix route: demo-builder (an A view of the calendar without travel, B with it; spell out "minute 10" or use clock times).
