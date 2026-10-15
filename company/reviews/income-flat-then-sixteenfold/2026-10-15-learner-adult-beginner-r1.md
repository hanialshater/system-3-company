*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: income-flat-then-sixteenfold
lesson version: v2
boundary: adult beginner (the brief's own boundary). Knows that people are richer now than in the past and that a growth rate compounds. Does not know that income per person barely moved for centuries, or that nearly all the growth came in the last 300 years. Has never read a log-scale chart. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/income-flat-then-sixteenfold/sheet.png, recorded 2026-10-15T10:04:21.976Z, production build on http://localhost:3590, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: step 4, "Log scale", and the reveal that follows it.** Up to step 2 the lesson is clear. The linear chart from 1270 to 2018 is flat and then shoots up, and the readouts say ×2.0 and ×15.8. Then step 3 adds a dashed "steady growth rate (our line)", and step 4 switches to a log scale. On the log chart the history line no longer looks flat: it climbs visibly from about 1650. For most of 1750 to 1950 it also sits well *below* the dashed 0.87% line and meets it only at 2018. Then the reveal opens on that log chart and says "That is why most of history looks flat **on this chart**." On the chart in front of me it does not look flat. I am left with two unanswered questions:
   - Which chart is "this chart"?
   - If the steady 0.87% line does not fit the data, was growth after 1700 steady or not?
   The reveal points at a state that is not on screen when it opens (it was on screen at step 2).
2. **What the prediction felt like.** It felt fair. With my boundary, "About 4 times" (a bit faster than before) is the natural pick and "About 2 times" is the steady-history pick. The hook's "What did Britain's next 318 years do?" teases a contrast but does not size it. One layout cue: "About 16 times" is the only option on its own full-width row, which sets it apart. That is minor; the wording is the same precision as the other options.
3. **Did the reveal answer the question I actually had?** Half. "0.16% a year is invisible in a lifetime, while 0.87% a year doubles income about every 80 years" is the sentence I needed, and the readouts back it up. But the log-scale step raises a new question (why does the data bend away from "steady growth"?) and the reveal never closes it. Someone who has never seen a log scale is not told what it is for: "a straight line here means a steady rate".
4. **Trust sheet.** The served build shows "8/10 claims checked", with c9 (the "Where it stops" sentence) and c10 (title, hook and question) as NOT YET CHECKED. I was told the claims are now verified, so the served build may predate the fact-check. This is a note for whoever rebuilds, not a teaching finding.

Verdict reason: the reveal says "most of history looks flat on this chart" while the stage shows the log-scale chart, on which it does not look flat, and the dashed "steady rate" line visibly misfits the data with no word on why.

Concrete fixes:
- Either end the explore on the linear chart (put "Log scale" before the spans, or make the reveal switch the stage back to linear). Or reword the reveal so it names the view: "On the ordinary scale, most of history looks flat; on the log scale, a steady rate is a straight line, and the record bends upward after 1700 because growth sped up within the period."
- Label the log scale for a beginner in the stage caption: "log scale: equal steps are equal multiples".
- If the dashed 0.87% line stays, say in one claimed sentence that 0.87% is the average and that actual growth was slower before about 1850 and faster after. Otherwise drop the dashed line on the post-1700 span.

## After reading build.md / meta.json

- The misconception ("living standards rose slowly and steadily") is exactly what the dashed steady-rate line on the log view visually *re-suggests* for 1700-2018. The finding stands, and it bears on the brief.
- The objective (about 2-fold at 0.16%/yr, then about 16-fold at 0.87%/yr, doubling about every 80 years, early values reconstructed) is met by the readouts and the reveal text.
- build.md's pre-flight lists "1700", "0.16% a year" and "0.87% a year" as the named elements, but not the "looks flat on this chart" phrase, which names the chart state. Reveal-fit cannot catch this, because the element exists; it simply shows the opposite.
- meta.json lists all 10 claims as verified; the served build's trust sheet shows 8/10 (see finding 4).
