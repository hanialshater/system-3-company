*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): work-in-process-limit
lesson version: v3
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Compare serial completion to round-robin partial progress.)
Screenshots seen: yes (artifacts/walkthroughs/work-in-process-limit/sheet.png, recorded 2026-10-15T21:37, build f1832fa on localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Whole jobs, one at a time"; tapped Run queue, Whole jobs, 5-min turns; opened reveal.

1. **The prediction has some tension.** Rotating 5-minute turns feels fair and busy, and some adults expect it to get something done sooner. The question is plain and the two options are real plans.
2. **The stage shows the difference.** The timeline draws whole jobs as solid blocks and turns as slices, and "First" reads 10 m for whole jobs against 15 m for turns. I could see A finishing early when run whole.
3. **The reveal answers my question, with the twist.** "Run whole, A is done at minute 10. In 5-minute turns the first job done is C, at minute 15, and A waits until minute 20." The point that the short job C finishes first under rotation, and A is pushed to 20, is the useful surprise.
4. **Where I wobbled:** "Run queue" gives the same result as "5-min turns" (both 15 m), so it looks like a duplicate button. "Late 0" and "Prereq 0" never change and do not matter here. "10m/50due" needs decoding, and the "80m" axis leaves most of the chart empty.
5. The two reveal paragraphs repeat each other ("Starting and finishing are different events" / "... different counts").

Notes for the builder (not blocking):
- Remove the Late/Prereq readouts or explain them; make Run queue's role clear or drop it.
- Write labels out ("A: 10 min, due by 50") and shorten the axis to about 35 minutes.
- Merge the two reveal paragraphs.

Verdict reason: the stage and reveal show, with numbers, that whole jobs finish A at 10 while rotation finishes nothing until 15 and A until 20; the rest is clutter.

## After reading meta.json

- Objective "compare serial completion to round-robin partial progress" matches what the stage and reveal show. Misconception "Rotate 5-minute turns" is a belief some adults hold, so the prediction is real.
- Version 3 walked. The "work in process limit" phrase in the slug is never named to the learner; the title "Finish before starting more" carries the idea in plain words, which is fine at this boundary.
- No route needed for launch; polish notes go to demo-builder.
