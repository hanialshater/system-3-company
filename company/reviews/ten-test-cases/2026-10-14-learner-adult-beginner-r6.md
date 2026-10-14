*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): ten-test-cases
lesson version: v2
boundary: adult beginner (knows percentages and that models are tested on new data; no statistics; trusts a score as "the" accuracy).
Screenshots seen: yes (artifacts/walkthroughs/ten-test-cases/sheet.png)
Verdict: launch

## 1. From the artifact
- Predict: "How often will you see 6 or fewer right?" with an empty, locked histogram. Nothing leaks. "Almost never" was my honest pick, so the prediction pulls.
- Explore: "Run 100 tests" builds a 10-case histogram from 50% to 100% around the dashed 80% line, with red bars at 50% and 60%. Readouts say "60% OR LESS 9 (9%)" and "SPREAD ±12.4 pts". Pressing 100 redraws the chart as a narrower spike (±4.0, 0 red). Pressing 1,000 makes it narrower again (±1.2). Both halves of the idea are now on stage, on the same axis: a fixed model wanders, and bigger tests wander less. The reveal waits for the 1,000 run ("Show me why" unlocks only at step 4).
- Reveal: it points at what I saw ("9 times in 101 (9%)", "your 1,000-case tests: ±1.2") and is honest that 9% is a sample of the exact 12.1%. "Falls as 1/√n" is told, but 12.4 → 4.0 → 1.2 on stage is the evidence for it.
- Minor: when I switch size, the 10-case histogram is replaced rather than kept alongside. I have to remember how wide it was. A faint ghost of the 10-case bars would make the narrowing obvious at a glance.
- Minor: the pale-pink "60% or less" zone is still a large block that looks like a bar at first glance.
- Minor: "TESTS RUN" drops from 101 to 100 on switching, with no word that it is a new set of tests.
- No FATAL.

## 2. Earlier findings (v1 review, 2026-10-13)
1. Bigger tests shrinking the noise was told, not shown, and the reveal didn't require it: **fixed**. Switching size runs tests and draws a narrower histogram on the same axis, and the gate needs the 1,000 step.
2. Keep the 10-case histogram visible when switching: **not fixed** (minor now, because the spread readouts carry the comparison).
3. Pink zone dominates and can be mistaken for a bar: **not fixed** (minor).
4. "No tests yet" message left on screen at the reveal: **fixed** (the 1,000-case spike is what stays on screen).

## 3. Against the brief (read after section 1)
doesNotKnow: "a small test set gives a noisy score" (shown: the 10-case spread with red bars) and "the noise shrinks only with more test cases" (shown: ±12.4 → ±4.0 → ±1.2). Show-the-why is met for both.
