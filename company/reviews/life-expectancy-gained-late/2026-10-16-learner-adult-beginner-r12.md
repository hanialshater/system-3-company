*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: life-expectancy-gained-late
lesson version: v3
boundary: adult beginner (meta.json learner field, read before the walk as the role's input). Knows that people live longer now than in the past, and that life expectancy at birth is an average over everyone born. Does not know that almost all the gain came in one century: about 3 years in the 1800s against about 35 in the 1900s.
Screenshots seen: yes (artifacts/walkthroughs/life-expectancy-gained-late/sheet.png, recorded 2026-10-16T09:30:45.625Z, production build of HEAD c2923c9 on http://localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: nowhere that blocks.** All three r1 points are fixed:
   - The button is now "Years gained in each span", and the bars are labelled "1800 to 1900 (100 years)", "1900 to 2000 (100 years)" and "2000 to 2023 (23 years)". I no longer compare a 23-year bar with a century as if they were alike.
   - The 1800s gain now reads "+2.9 (30.6 → 33.5)" in the readout, the bar and the reveal, so it passes my subtraction.
   - The limit sentence now parses: "shown one year in every 25, so the chart hides single years when life expectancy fell sharply, such as epidemic years."
2. **What the prediction felt like.** Fair. "Crept up 3 years... What did the next century add?" suggests more but does not size it. "About 15" is the natural beginner pick. The locked y-axis stops at 40 and the line stops at 1900, which hints at nothing. The y-axis rescales from 40 to 80 at step 2, so the jump is felt.
3. **Did the reveal answer the question I actually had?** Yes, for "how much, and when": "about 12 times as much in one century as in the one before". "Why then" is not promised, so its absence is a note.
4. **Notes, not blocking:**
   - The third readout box is "IN 2023: 74.0 yrs", a level, next to two gains ("+2.9 yrs", "+34.7 yrs"). The bar chart gives the gain (+5.8), so it is recoverable, but the row mixes kinds.
   - +5.8 in 23 years is a faster pace than the 1900s average. The short third bar still invites "it's slowing" at a glance. The "(23 years)" label now guards against that reading; nothing more is needed.
5. **Trust sheet** reads 5/5 checked on the served build.
6. **Framing.** World averages only. No group or place framing.

Verdict reason: the r1 findings ("per century" on a 23-year bar, "+2.8" against 30.6 → 33.5, an unparseable limit) are fixed on the served build, so no finding blocks a first-time learner.

## After reading meta.json (build.md not read)

- The objective (2.9 against 34.7, about 12 times, one source at one point every 25 years) matches the walk number for number. The misconception ("risen gradually for centuries") is refuted by the line's bend at 1900 and by the bars.
