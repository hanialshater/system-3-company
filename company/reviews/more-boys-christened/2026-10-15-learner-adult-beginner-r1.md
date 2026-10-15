*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: more-boys-christened
lesson version: v1
boundary: adult beginner (the brief's own boundary). Knows that about as many boys as girls are born. Does not know that a small surplus of boys showed in every one of 82 years of London's christenings, or that this is because the counts were large. Has no intuition for how noise shrinks with sample size. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/more-boys-christened/sheet.png, recorded 2026-10-15T10:06:30.893Z, production build on http://localhost:3590, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: the reveal's middle sentence.** "A small, steady difference shows every single year once the counts are in the thousands." This is the idea the lesson is built around, and it is told, not shown. Nothing on the stage shows how many christenings there were in a year: the question gives totals over 82 years, and the chart shows only boys minus girls. Nothing lets me see what happens when the counts are small. So my question after seeing 82 of 82, "why so consistent, when a coin can come up tails several times running?", gets a one-line assertion I cannot check against anything I did.
2. **What the prediction felt like.** It felt fair and well built. With my boundary, "41 of 82" (any year could go either way) is the honest pick, so the wrong guess the reveal needs is likely. The hook "How often were boys ahead?" does not lean. The options are the same precision. The question's totals (484,382 vs 453,841) give a careful learner a fair chance to reason it out.
3. **The chart.** The "+400" and "0" labels sit on top of the first bars at the left edge, and the y-axis looks lopsided: "+400" sits near the top of the bars, while "−400 (more girls)" floats far below with nothing near it. I could read it, but the zero line, the one thing the explore hint asks me to watch, is easy to lose among bars that start right on it.
4. **Did the reveal answer the question I actually had?** The *what* is answered well: 82 of 82, 107 per 100, closest 1703 at 101, widest 1661 at 116. The closest and widest presets are good because they show the floor stays above zero. The *why* is not answered (finding 1).

Verdict reason: the lesson's explanation ("once the counts are in the thousands") is told in one sentence with nothing on the stage standing for it, and the yearly counts it depends on are never shown (demo standard, "show the why you promised").

Concrete fixes:
- Put the yearly scale on the stage: a readout "about 11,000 christenings a year" on the "Boys per 100 girls" step, or a caption on the closest year ("1703: 101 per 100, about N boys more out of M").
- Better: one control that shows the same 107:100 split with small counts, for example "If only 100 a year" with seeded draws, so the learner sees the line start crossing zero. Disclose the seed in a claim.
- Move the "+400"/"0" tick labels left of the axis so they do not overprint the bars.

## After reading build.md / meta.json

- The brief's doesNotKnow names the cause directly ("because the counts were large"), and the objective asks the learner to say that "a small steady difference shows every year when the counts are large". By the told-vs-shown decision (company/decisions/2026-10-14-told-vs-shown.md), a cause listed in doesNotKnow needs something on the stage that stands for it. Here it has nothing. That confirms finding 1 as a revise.
- meta.json lists all 4 claims verified; the served trust sheet shows 4/4.
