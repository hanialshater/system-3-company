*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: italy-poorer-in-1800
lesson version: v1
boundary: adult beginner (the brief's own boundary). Knows that income per person rises over time. Does not know that, on the best reconstruction, north and central Italy were poorer per person in 1800 than in 1450. Is a little sceptical of single comparisons between two years. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/italy-poorer-in-1800/sheet.png, recorded 2026-10-15T10:05:56.748Z, production build on http://localhost:3590, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **The yes/no title (the cm-history caution).** "Richer by 1800?" plus "Before industry, did people **at least** get slowly richer?" The words "at least" signal the expected answer ("no, not even that"). With my boundary I would honestly pick "About 150". The framing tells me before I commit that the lesson expects a "no", which pushes me to 75 or 100. On the recorded path option 1 (75) was picked and the reveal said "Your prediction held". I think the hook helped.
2. **Where understanding first broke: step 3, "1310 to 1871, the whole line".** Seeing the whole line, I notice that 1450 (the base, = 100) sits on a local spike: the locked frame already shows the line climbing to it, and the step-3 readout gives 1310 = 89. 1800 = 75 sits in a dip, and 1871 = 87. The red dashed line in step 4 runs from that peak to that trough. As a sceptical beginner I ask "is this just a high year against a low year?" Looking at the picture, most of 1500-1750 runs fairly flat at about 85. The reveal's "Income per person can shrink for centuries" is plausible, but the lesson never shows that the fall is robust to the endpoints, and the stage invites the doubt.
3. **What the prediction felt like.** Apart from the hook, fair: three options at the same precision, and the locked stage stops at 1450.
4. **Did the reveal answer the question I actually had?** Partly. "75% of the income of 1450" is clear. The question the stage raised (finding 2) is not answered. The limits sentence also uses in-house language: "the copy we opened states no unit, so it is read as an index". A learner does not know what "the copy we opened" is; it reads like a note from the builder.
5. **Explore effort.** "Show me why" unlocks after two presses (1450 and 1800). The two most useful views (whole line, change per year) are optional, so a learner can reach the reveal without seeing the context.

Verdict reason: the hook's "did people at least get slowly richer?" cues the answer before the commit, and the stage shows a peak-to-trough comparison (1450 spike, 1800 dip) that the reveal never defends, so a sceptical learner leaves doubting the claim.

Concrete fixes:
- An open title and hook, for example title "Italy, 1450 to 1800"; hook "North and central Italy before industry: what happened to income per person?"
- Show robustness on the stage: a smoothed line or 25-year averages (for example "1440-1460 average vs 1790-1810 average"), or one claimed sentence giving a smoothed comparison, if the source supports it. Make the whole-line view a required milestone.
- Rewrite the limit in learner words: "this is one reconstruction, it covers only the north and centre, and it gives an index, not money amounts."

## After reading build.md / meta.json

- The objective ("fell to about 75 in 1800 (1450 = 100), about 0.08% a year for 350 years, so income per person can shrink for centuries") rests entirely on the two endpoints I question in finding 2. If the smoothed series also falls, the lesson should show it; if it does not, the "shrink for centuries" claim needs the fact-checker's look. I have not checked the data. I route this as a question, not a finding of error.
- The misconception ("income per person only ever rose, even if slowly, before industry") is close to word for word what the hook asks the learner to doubt. Same pattern as wages-bought-more-wheat.
- meta.json lists all 6 claims verified; the served trust sheet shows 6/6.
