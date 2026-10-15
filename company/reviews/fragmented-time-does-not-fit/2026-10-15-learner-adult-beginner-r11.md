*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): fragmented-time-does-not-fit
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish total free time from one continuous interval.)
Screenshots seen: yes (artifacts/walkthroughs/fragmented-time-does-not-fit/sheet.png, recorded 2026-10-15T21:32:13.881Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "A continuous 30-minute gap"; tapped Test plan; tapped Use continuous gap; slid Start 40 -> 42; opened reveal.

1. **The prediction is answered by the question.** The hook already says "A thirty-minute task needs one continuous gap", and the question says "unsplittable". Choosing "a continuous 30-minute gap" is reading, not predicting. The tempting wrong belief (twenty free minutes here and ten there add up to thirty) is never given a chance to be tried.
2. **Where understanding first broke: I never saw the split version fail.** The stage shows the write block placed over the call (0-30), then moved to 40-70. There is no way to try putting the task into the two 10-minute gaps (0-10, 20-30), so "Any three 10-minute gaps" is never shown failing. The gaps are not even drawn as gaps; I had to infer them from the call and meeting boxes.
3. **"Test plan" is a strange first button.** It reveals overlap and finish for the starting layout; it took me a moment to understand that it does not change anything.
4. **The reveal reports my final layout (0 overlap, ends at 72) and restates the rule.** "Total available minutes and the longest continuous gap answer different questions" is the right sentence, but nothing on stage showed the total available minutes (20 before minute 40) next to the longest gap (10). The number that would make the point is missing.
5. Recall card says "25 < 40, whatever the total"; neither 25 nor 40 matches anything I compared (task 30, gaps 10). It reads as a typo.
6. Button highlight does not follow the tapped button (after "Test plan" the "Use continuous gap" chip is the raised one).

Verdict reason: the question gives the answer away and the stage never lets me try, and see fail, the scattered-gaps plan the lesson is about.

## After reading the brief (meta.json)

- Objective "distinguish total free time from one continuous interval": the stage never shows total free time as a number, and the split plan cannot be tried (findings 1-2). The objective is stated, not experienced.
- The recall claim "25 < 40" looks like a mismatch with the 30-minute task and 10-minute gaps; route to fact-checker.
- Fix route: demo-builder (a "split across gaps" action that fails visibly; show total free vs longest gap; remove the answer from the hook).
