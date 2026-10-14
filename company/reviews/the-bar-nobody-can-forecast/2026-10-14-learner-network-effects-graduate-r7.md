*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): the-bar-nobody-can-forecast
lesson version: v2
boundary: network-effects-graduate (knows network effects make things more valuable as more join; does not know that with a crowding cost, any forecast everyone believes makes itself wrong)
Screenshots seen: yes (artifacts/walkthroughs/the-bar-nobody-can-forecast/sheet.png)
Verdict: revise

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "50"; Forecast says 50; Forecast says 70; 1 night; +10; +100; Reset; opened reveal.

1. **The title rules out the trusted-forecast answer before the commit (revise).** "Why can't anyone forecast this bar?" assumes the forecast fails. The question then asks what happens when everyone trusts "50 will come", and "50" is the believed-forecast option, the one the misconception picks. A learner who reads the title knows 50 is wrong and is left with 60 vs 100. The wrong guess the reveal is built to answer ("the forecast comes true") is ruled out by the title. The hook ("Everyone trusts one good forecast. Then?") is fine by itself.
2. **The idea is on the stage.** "Forecast says 50" draws one bar to 100, above the dashed "60: crowded above" line: "100 came". "Forecast says 70" draws a bar at 0. The self-defeating forecast is seen in two taps, and the trace row keeps "forecast 50 → 100 came · forecast 70 → 0 came" on screen. A first-time learner gets it from the stage.
3. **The second idea (random 60% coin) is shown too.** The bars hover around the dashed line, pink above it and green below, and the readouts reach avg 60.1 with 49% crowded after 111 nights. The reveal's "average at the limit, nearly half above" points at that picture. "In the long run 46.2%" is told context (it is P(more than 60 of 100 at 0.6), which looks right).
4. **The reveal survives Reset.** After Reset the chart is empty, but the trace row keeps "longest run: 111 nights, avg 60.1, 49% crowded", and the reveal quotes exactly that.
5. **Minor:** "longest run: 1 nights" (grammar) after one night. Two ideas in 60 seconds (self-defeating forecast, then coin-flip crowding) is a lot. The second is good, but it splits attention from the question.
6. The "60: crowded above" line is drawn in the locked stage. It matches the option "60", but 60 is a wrong option and the limit comes from the question, so it does not point to the answer.

## After reading the brief and the r6 review

r6 (v1) findings:
1. The reveal read the stage after Reset ("your 0 random nights"): **fixed**. It now quotes the recorded longest run (111 nights, 60.1, 49%), which stays visible in the trace row.
2. The zero-height bar for forecast 70: **fixed** (a "0" marker at the base).
3. The reveal frame scrolls the chart away: **not fixed**, minor. The trace row carries the values.
4. Why 60% was never said: **fixed** ("so on average 60 come").
5. Trust link 0/6: now 4/6 (fact-checker lane).

New blocking item (not raised in r6; it falls under the 2026-10-14 "No answer before the commit" decision): the title "Why can't anyone forecast this bar?" rules out the "50" option before the commit. Fix route: demo-builder (a title that keeps the question open, for example "Will the forecast come true?").
