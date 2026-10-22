# Accept: Eight cores, not eight times

**Verdict: reject**

## Why
- The prediction works. "7.5 min" is the naive answer of 60 divided by 8, "30 min" is a plausible middle guess, and the right answer is close enough to "About 21 min". The learner has to commit before seeing anything.
- Exploring changes the learner's mind. Going from 2 to 4 to 8 to unlimited cores shows the green part shrinking while the grey 15 stays put. The running log (1.6x, 2.29x, 2.91x, 4x) makes the ceiling visible before the reveal explains it.
- All the numbers I recomputed are correct: 15+22.5=37.5 (1.6x), 15+11.25=26.25 (2.2857, shown as 2.29x), 15+5.625=20.625 (shown as 20.6, 2.909, shown as 2.91x), and with unlimited cores the time tends to 15 (4x). "Under 6" is right (5.625). The Amdahl formula is stated correctly.
- The trust sheet does not hold up. Claim c5 says "The 20 minutes that cannot split... at most 3 times faster". That contradicts the lesson's 15 minutes and 4x, and it is still marked CHECKED.
- It fits a phone: no overflow, readable text, and the controls are big enough to tap.

## Minor defects
- When the reveal appears, the chart is still on the reset 1-core / 60-minute state, while the text talks about 8 cores and 20.6 minutes. The reveal should show the 8-core (or unlimited) bar.
- The 8-core value is rounded to "20.6 min" (it is 20.625). The trust sheet then gives the speed-up as both "2.9" and "2.91x". This is acceptable but inconsistent.
- The alt text in Step 5 reads "Job bar on 1 cores" (should be "1 core"). The transcript says "45 ÷ 1" but the chart label shows "45".
- In the predict state, the chart sits in a large empty band with no axis or labels, which wastes vertical space on the phone.
- The CTA text "Try it first" stays visible but disabled until the learner tries unlimited cores, and nothing tells them it is disabled.

## Blocking defects
- Trust-sheet claim c5 (cs.eight-cores-not-eight-times.c5) is false for this lesson and marked CHECKED. It says 20 minutes cannot split and the maximum is 3x. The lesson's job has 15 serial minutes and a 4x ceiling. The learner sees this sentence when they tap "Why trust this?", and it contradicts the reveal. It must be removed or corrected to 15 minutes / 4x, and the verification that marked it CHECKED needs to be looked at again.
