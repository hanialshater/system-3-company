*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): digits-are-logs
lesson version: v2
boundary: adult beginner (school arithmetic and place value; has not met logarithms, or has forgotten them).
Screenshots seen: yes (artifacts/walkthroughs/digits-are-logs/sheet.png, all 5 frames of the second run)
Verdict: launch

## 1. From the artifact (written before reading the earlier reviews)

- Tooling note: the first walkthrough run caught "Run to 100" mid-animation (2^55, "Doubling…") and the reveal never unlocked. A second run, same command, reached 2^100 and the reveal; that run's sheet is the one reviewed. A patient learner gets there; the flake is the driver's settle time (QA lane).
- Predict: "ten doublings give 1024" in the question is an anchor, so 21 / 31 / 100 is a guess with a handle. The hook ("its digit count marches in a straight line") tells the shape but not the slope, so it does not decide between the options.
- Explore: the slider to 2 (2² has 1 digit), then +10 to 2¹² = 4096, 4 digits, with a "+3" tick at 10 and the caption "Every 10 doublings: ×1024, about ×1000. Times 1000 adds three zeros, so 3 more digits." Run to 100 grows the strip with a "+3" under every ten, ending at "2¹⁰⁰ has 31 digits", ten "+3" ticks, DIGITS 31. The straight line is the row of identical "+3"s; a learner can count them.
- The rule "×1000 means 3 more digits" is captioned at the first +10 rather than discovered, but the strip confirms it ten times, so it is told and then seen.
- Reveal: "Start at 1 (one digit), add 3 ten times: 31" is exactly the stage. The second paragraph names the logarithm. "log₁₀(2¹⁰⁰) = 100 × 0.301" is told and 0.301 is unexplained; for this boundary, "a logarithm counts digits" is the takeaway, and that is earned.
- Legibility: at 2¹⁰⁰ the digit boxes and tick labels are tiny on a phone; the "+3" labels are just readable. Before the run, a third of the stage is empty space.

## 2. Earlier findings

From v1 (2026-10-13):
1. Prediction without an anchor: **fixed** (1024 in the question).
2. "×1000 means +3 digits" asserted: **fixed** ("adds three zeros").
3. Ticks unexplained: **fixed** (caption and "+3" labels).
4. Digit strip noisy, counter small: **not fixed**, minor.
5. Reveal not seen: **seen** on the second run.

From r2 (2026-10-14):
- Run to 100 slower than the walkthrough's settle time: **not fixed**. It reproduced on the first run today (QA or kit lane, not a lesson flaw).
- "0.301" unexplained: **not fixed**, minor.

## 3. New findings

- For QA: the walkthrough is flaky on this lesson (one of two runs never reached the reveal). Either shorten the Run to 100 animation or have the driver wait for "Show me why".
- Minor: the strip and tick text are tiny at 2¹⁰⁰ on a phone.
- No FATAL.
