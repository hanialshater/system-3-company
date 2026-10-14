*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): one-ten-thousandth-apart
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows an exact rule gives exact predictions; does not know that in a chaotic system a tiny difference in the start roughly doubles each step, so making the start more precise buys only a few more steps of forecast)
Screenshots seen: yes (artifacts/walkthroughs/one-ten-thousandth-apart/sheet.png, recorded 2026-10-14T18:58)
Verdict: launch (pass)

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Still about 0.0001 apart"; tapped Run 30 steps, 1,000× more precise: run, Average 1,000 steps, Step 1, Reset; opened reveal.

1. **The prediction is genuine.** "The rule is exact" makes "still 0.0001 apart" the natural belief; the three options span "nothing happens" to "random".
2. **The two runs on one chart are the payoff.** Black and dashed cyan lie on top of each other, then come apart at a red "split 11" line; by step 30 the gap reads 0.616. The 1,000× more precise run moves the split only to 21 ("gap 0.356" at step 30). Seeing a thousandfold better start buy just ten steps is the forecasting lesson, and it is on the stage.
3. **Where an idea I lack first appears: "the gap roughly doubles each step".** The reveal states it, and it explains the 11 → 21 result only if I know that ten doublings is about 1,000. That link is not said. One clause ("ten doublings ≈ ×1,000, so 1,000× precision buys ten steps") would let me derive what I saw.
4. **"Where it stops" is a good counterweight.** The averages (0.51 and 0.48) as dashed lines show the long-run behaviour agrees even when the days do not. "Matched" is slightly generous for 0.51 vs 0.48, but fine.
5. **Fit:** the reveal opens after Reset, so the two traces are gone; only the split markers and the average lines remain. The words "wandered apart like strangers" point at a picture that is no longer there. Keeping the last run's traces would fix it.
6. "x → 4x(1 − x)" is readable as a rule, even if the learner never computes it. Trust link "0/5 claims checked" (fact-checker's lane).

Fixes (optional): add the ten-doublings link; keep the traces when the reveal opens.

Verdict reason: the sensitive dependence and the small payoff of better precision are both shown by runs I made, and the averages make the "limits" caveat visible.

## After reading the brief (meta.json)

- Both doesNotKnow items are delivered; item 1 ("roughly doubles each step") is stated rather than shown (finding 3).
