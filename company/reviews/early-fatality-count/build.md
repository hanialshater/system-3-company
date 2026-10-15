# Build note: early-fatality-count (demo-builder, wave-i-life, 2026-10-14)

Brief: `company/domains/briefs/life.health-epidemiology.md`, spare-capacity batch item 2. Status draft, version 1. Claims c1-c4 unverified.

- Stage: readout "Deaths so far ÷ cases so far: 1 in N" above one timeline (days 0-135). Bars are daily cases and red dots are daily deaths drawn x50, both up to today. A dashed "15 days" bracket runs from today's death dot back to the case bar it came from: the dot sits level with that bar because 0.02 x 50 = 1. That bracket is the cause the reveal names, shown on the stage. After the commit a dashed day-45 line keeps the label "day 45: 1 in 405". The y axis scales to the largest day so far and says so ("top: N a day").
- Departure from the brief: the brief has one slider. I added preset chips "Day 45 / Day 90 / Day 135" before the slider (slider step 5, start 45), so the QA path passes day 120 (two slider presses from 45 could not). Possible reviewer concern: the auto-scaling y axis changes the bar heights as the learner scrubs.
- Milestone: "late" (day >= 120; the day is recorded). The day-45 value is the start state of the explore and stays as a trace.
- Node check: day 30 1 in 443, 45 1 in 405, 60 1 in 401, 75 1 in 88, 90 1 in 53, 105-135 1 in 50.

## Pre-flight v1
1. **Title and hook.** "The early death count" / "Early in an outbreak, people divide deaths by cases. What does that number tell you?" Neither says whether the ratio is high or low.
2. **Options.** "About 1 in 50" / "About 1 in 100" / "About 1 in 400": all numbered, same form.
3. **Locked stage.** The 19-word brief message, readout "?", case bars to day 45 only (top label "top: 5,120 a day"), chips and slider at 45. There are no death dots, no 15-day bracket and no day-45 label.
4. **Reveal values.** "On day 45 the readout said 1 in 405": (b) the question's case is the start state, kept on the chart as the "day 45: 1 in 405" trace. "1 in 50 cases die", "15 days", "8 times fewer (three doublings)": model constants. The 15-day bracket and the x50 dots show them. "by day d it was 1 in N": (a) current day when it is >= 120, otherwise (b) the day recorded by the late milestone. Either value is computed with the readout's rounding.
5. **QA path.** Day 45 chip is disabled (current), then Day 90, then Day 135 (milestone late), then slider at max, ArrowLeft x2 to day 125. At the reveal: readout "1 in 50", day-45 trace "day 45: 1 in 405", bracket "15 days" visible.
6. **Reset.** There is no Reset control. Reveal on the QA run: "On day 45 the readout said 1 in 405, though 1 in 50 cases die. Each day's deaths come from cases counted 15 days earlier, when there were 8 times fewer (three doublings). Once cases fell, the ratio climbed: by day 125 it was 1 in 50. While cases grow, deaths so far ÷ cases so far runs low."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3537 early-fatality-count`: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0 ("deaths so far ÷ cases so far" and "15 days" visible). The tool counts 66 words with the verdict line; the reveal body is 59. Stage 381 px (picture 175, controls 85, text 79), reveal 184 px, window 618 px. Screenshot `artifacts/reveal-fit/early-fatality-count.png`. The first measurement cropped 16 px. Fixed by cutting the told "Toy rule" sentence from the reveal (the locked stage text already states the rule) and the "Day N." prefix from the stage caption. Measured on a `next dev` server started from this worktree (/home/user/s3c-rel, port 3537, stopped afterwards): the shared dev server on 3530 serves /home/user/system-3-company, which does not contain this lesson.

Not run: next build, QA, walkthrough (per task). tsc and check pass. A local Playwright pass of the QA contract's steps (scratch script) found no dead controls, no errors, no small controls and no overflow.

status draft → review (W-996): launch r10, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
