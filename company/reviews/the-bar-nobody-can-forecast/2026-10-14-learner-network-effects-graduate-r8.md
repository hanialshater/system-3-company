*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8, build 5 walkthrough): the-bar-nobody-can-forecast
lesson version: v3 (meta.json version 3; the walkthrough shows the v3 title "Will the forecast come true?")
boundary: network-effects-graduate (knows network effects make things more valuable as more join; does not know that with a crowding cost, any forecast everyone believes makes itself wrong). Same tag as r6/r7.
Screenshots seen: yes (artifacts/walkthroughs/the-bar-nobody-can-forecast/sheet.png, 8 frames; 08-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- No answer before the commit: pass, and the r7 blocking finding is fixed. "Will the forecast come true?" leaves 50 open. Options 50 / 60 / 100, bare numbers. The dashed "60: crowded above" line comes from the question's limit and matches the wrong option 60.
- The self-defeating forecast is shown in two taps (100 came, 0 came), and the trace row keeps "forecast 50 → 100 came · forecast 70 → 0 came · longest run: 111 nights, avg 60.1, 49% crowded" after Reset. The reveal quotes exactly that row. "1 night" grammar fixed.
- **Main finding (The reveal fits with its picture): the stage top is cut off at the reveal.** In 08-reveal.png the stage begins at the "50" tick: the model chip "Model: 100 people · fine up to 60 · seed 1", the "100" tick and "attendance by night" are above the visible top. Stage-top crop is not 0.
- Moderate (Show the why you promised): after Reset the chart is empty when the reveal opens, so "the average sits right at the limit, so nearly half the nights land above it" points at bars that are no longer drawn. The numbers survive in the trace row; the picture of pink bars above the line does not. Keeping the longest run's bars (or not clearing the chart on Reset) would let the reveal point at them.
- Kit (W-287): the chart is shrunk at the reveal ("60: crowded above" and the ticks about 3–4 px) and also in the locked predict frame (01-predict: axis labels about 4–5 px). Recorded as kit findings, not lesson revises.
- Reveal ~88 words including the El Farol note: within budget.
- Minor: "In the long run that share is 46.2%" is told context (claimed).

## 2. Earlier findings (r7), read after section 1

1. Blocking, title ruled out "50": FIXED.
2. Minor, "1 nights": FIXED.
3. Minor, two ideas in 60 s: unchanged (minor).
4. r6 minor, reveal frame scrolls the chart away: NOT FIXED; under the 2026-10-14 fit rule it is now blocking.

## 3. After reading build.md (Pre-flight v3)

- Pre-flight 5 says the trace row is on stage at the reveal: true. No Pre-flight item 7; "Not seen in a browser".
- Verdict: revise (stage-top crop at the reveal). No FATAL.
