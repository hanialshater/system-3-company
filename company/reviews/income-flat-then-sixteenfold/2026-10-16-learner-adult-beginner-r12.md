*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: income-flat-then-sixteenfold
lesson version: v4
boundary: adult beginner (meta.json learner field, read before the walk as the role's input). Knows that people are richer now than in the past, and that a growth rate compounds. Does not know that for centuries income per person barely moved, or that nearly all the growth came in the last 300 years. Has never read a log-scale chart.
Screenshots seen: yes (artifacts/walkthroughs/income-flat-then-sixteenfold/sheet.png, recorded 2026-10-16T09:31:08.630Z, production build of HEAD c2923c9 on http://localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: nowhere that blocks.** The r1 break (the reveal said history "looks flat on this chart" while the log chart was on screen) is fixed:
   - The reveal now names both views: "On the linear scale most of history looks flat; on the log scale the record sags below the dashed 0.87% average, as growth was slower before 1850 and faster after." It describes what I see at step 4: the record runs under the dashed line from about 1700 and meets it at 2018. It also answers r1's second question (was growth after 1700 steady? no).
   - The log view now carries a caption for a first-time reader: "log scale: each gridline is ×2", and the gridlines (50, 100, 200 ... 1,600) bear it out.
   - The dashed line is labelled "steady average rate (our line)", so I know it is a reference, not data.
2. **What the prediction felt like.** Fair. "About 4 times" is the natural beginner pick and "About 2 times" the steady-history pick. Still, as in r1: "About 16 times" is the only option on its own full-width row. That is a weak layout cue and does not decide the verdict.
3. **Did the reveal answer the question I actually had?** Yes. After step 2 (×2.0 at 0.16%/yr against ×15.8 at 0.87%/yr) my question was "how can a rate under 1% do that?", and "0.87% a year doubles income about every 80 years" answers it. "0.16% a year is invisible in a lifetime" reconciles the hook's "doubled" with "barely moved".
4. **Notes, not blocking:**
   - The reveal's first paragraph carries four ideas (two multiples, two rates, two scales, the sag). It is dense for 60 seconds, but each idea points at something I saw.
   - On the log view, the two legend lines and the "0.87% a year" label crowd the top-left corner next to the 1,600 and 800 tick labels. They are legible on the phone frame.
   - "Show me why" lights at step 2, so the log-scale step is optional. A learner who skips it gets a reveal sentence about a view they never opened. The sentence is still true and still readable. This is a note, since the reveal names the view explicitly.
5. **Trust sheet** reads 11/11 checked on the served build.
6. **Framing.** National income series ("England... then Britain, then the UK"). The "Where it stops" sentence flags England-only early values. No group framing.

Verdict reason: the r1 finding (a reveal that named a chart state the stage did not show, and an unexplained misfit to the steady line) is fixed by naming both scales and the sag, so no finding blocks a first-time learner.

## After reading meta.json (build.md not read)

- The objective (×2 at 0.16%, ×16 at 0.87%, doubling about every 80 years, a reconstructed early series) is met by the readouts and the reveal. The misconception ("rose slowly and steadily") is now refuted on both scales. The r1 worry that the dashed steady line re-suggests "steady" after 1700 is closed by "slower before 1850 and faster after".
- Per the five decision (2026-10-15), income is out of the launch-review five on the strand cap. This verdict makes it a normal publish candidate and does not change the five.
