*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): earliest-deadline-first
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compare deadline misses instead of only completion count.)
Screenshots seen: yes (artifacts/walkthroughs/earliest-deadline-first/sheet.png, recorded 2026-10-15T21:35)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Urgent job first"; tapped Run queue, Swap first, Try target; opened reveal.

1. **The prediction is forced by its own numbers.** "Which order respects the minute-15 deadline here? Urgent job first / Short job first." The urgent job is 15 minutes long and due at minute 15. It must go first; the question has told me so. The label "urgent" gives it away again.
2. **The explore picture works.** In the first two orders the urgent bar starts at or after its red line and Late shows 1; urgent-first puts the bar right up to its line and Late goes to 0. I could see it.
3. **Where it first broke: Wait goes up and nothing explains why that is fine.** 25, then 20, then 35 for the "right" answer. The lesson never says what Wait counts. The reveal does say "This fixture rewards meeting due dates, rather than minimising average waiting", which is the important trade-off, but "average waiting" is not what the counter is labelled (it says "total waiting").
4. **Noise.** "Prereq 0" and "All jobs are ready except for the stated prerequisites" when there are no prerequisites. "Fixture" is jargon.
5. **Reveal versus my question.** The general rule ("do the earliest deadline first") is implied but never stated in plain words. The title "Read the due dates" is the takeaway; the reveal talks about red markers instead.

Fixes (for the builder):
- Make the trap real: give the urgent job slack (e.g. 10 minutes due at 20) so "quick one first" feels safe and only ordering by deadline works.
- State the rule in one plain sentence; define Wait or drop it; remove the prerequisite text.

Verdict reason: the prediction is answered by the numbers in its own question, and the Wait increase for the correct order is unexplained apart from a jargon sentence.

## After reading the brief (meta.json)

- Objective: 'Compare deadline misses instead of only completion count.' Late 1 vs Late 0 delivers it. 'Completion count' never appears on stage, and the reveal says 'average waiting' while the counter shows total Wait.
- Misconception field is 'Short job first', the foil label.
- Fix route: demo-builder.
