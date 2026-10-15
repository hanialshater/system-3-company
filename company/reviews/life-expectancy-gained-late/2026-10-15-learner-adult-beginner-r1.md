*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: life-expectancy-gained-late
lesson version: v2
boundary: adult beginner (the brief's own boundary). Knows that people live longer now than in the past, and that life expectancy at birth is an average over everyone born. Does not know that almost all the gain came in one century. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/life-expectancy-gained-late/sheet.png, recorded 2026-10-15T10:06:07.670Z, production build on http://localhost:3590, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: step 4, "Years gained per century".** The button says "per century", but the third bar is 2000-2023, which is 23 years. I compare +5.8 with +34.7 and conclude that the gains have nearly stopped. Per century, 5.8 years in 23 years is roughly the same pace as the 1900s. The chart title ("Years of life expectancy gained") is right; the button label and the "IN 2023" readout lead me to a wrong comparison that the reveal does not correct.
2. **Visible arithmetic that does not add up.** The question says the 1800s went "from 30.6 to 33.5". The readout says "+2.8 yrs", and the step-4 bar says "+2.8 (30.6 → 33.5)". 33.5 − 30.6 = 2.9. I distrust the numbers at the exact moment the lesson needs me to trust them. The other two bars add up (68.2 − 33.5 = 34.7; 74.0 − 68.2 = 5.8).
3. **What the prediction felt like.** It felt fair. The hook "crept up 3 years in the 1800s. What did the next century add?" implies more but does not size it. With my boundary "About 15 years" is the natural pick. The options are the same precision. The locked y-axis stops at 40, which hints at nothing.
4. **Did the reveal answer the question I actually had?** For "how much and when", yes: the line bends sharply after 1900, and "about 12 times as much" lands. For "why then", no. That is not promised, so it is a note. The limit sentence is hard to parse: "single years, such as epidemic years, fell sharply". What fell? I think it means life expectancy fell sharply in single epidemic years, which the one-point-every-25-years chart hides.

Verdict reason: the "per century" button makes a 23-year bar look like a century's gain and invites a false "it's slowing" reading, and "+2.8 (30.6 → 33.5)" visibly fails a beginner's subtraction.

Concrete fixes:
- Rename the button "Years gained in each span" (the chart title already says this) and label the third bar "2000 to 2023 (23 years)". Or show all three as years per decade.
- Show the 1800s endpoints with one more decimal (30.64 → 33.46) or quote +2.9 if that is what the rounded endpoints give. The question, readout and bar should agree to a beginner's arithmetic.
- Limit sentence: "the chart shows one year in every 25, so it hides single bad years, such as epidemics, when life expectancy fell sharply."

## After reading build.md / meta.json

- The misconception ("risen gradually for centuries") is refuted by the picture. The objective includes "the series is one source's estimate shown at one point every 25 years", which is the limit sentence I could not parse (finding 4).
- The +2.8 vs 30.6 → 33.5 mismatch is a display-rounding issue, not a false claim. I route it as a fix, not a fact-check.
- meta.json lists all 5 claims verified; the served trust sheet shows 5/5.
