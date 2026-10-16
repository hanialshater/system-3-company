*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: more-boys-christened
lesson version: v2
boundary: adult beginner (meta.json learner field, read before the walk as the role's input). Knows that about as many boys as girls are born. Does not know that a small surplus of boys showed in every one of 82 years of London's christenings, because the counts were large. Thinks of each year as a coin that could go either way.
Screenshots seen: yes (artifacts/walkthroughs/more-boys-christened/sheet.png, recorded 2026-10-16T09:30:56.575Z, production build of HEAD c2923c9 on http://localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: nowhere that blocks.** The r1 break (the cause "once the counts are in the thousands" told with nothing on the stage) is fixed:
   - The yearly scale is in the chart title from the first tap: "boys minus girls, of 5,612–16,145 a year".
   - Step 2, "If only 100 a year (simulated)", redraws the same split with small counts. Red bars drop below zero, and the readout says "girls ahead 23 of 82". This is exactly the coin-flip picture I came in with, and it is now shown as what happens when counts are *small*. The reveal's cause sentence ("5,612 to 16,145 babies a year, so the small surplus showed every year") points at two things I saw.
   - The r1 overprint (tick labels on the bars) is gone. The labels sit left of the axis.
2. **What the prediction felt like.** Fair. "41 of 82" is the honest coin-flip pick, the hook does not lean, and the totals in the question give a careful learner a fair chance to reason it out.
3. **Did the reveal answer the question I actually had?** Yes. After step 1 ("82 of 82") my question was "why so consistent?", and step 2 answers it before the reveal does. Closest (1703, 101) and widest (1661, 116) show that the floor stays above zero.
4. **Notes, not blocking:**
   - From step 3 on, the real chart carries the caption "simulated, 100 a year: girls ahead 23 of 82" just under its zero line, while the simulated bars themselves are gone. In the reveal frame the real chart shows both "82 of 82 years above zero" (top) and "girls ahead 23 of 82" (inside the plot). A hurried learner could read the second as describing the real bars. Moving the simulated caption out of the plot area, or greying it, would remove the collision. The word "simulated" leads the caption, which is why this is a note.
   - The simulation is one draw. "Girls led in 23 of 82" is stated as a single figure. A learner does not need the spread, but the trust sheet should say it is one seeded draw (I did not check whether it does).
   - The closest-year marker is a full-height thin line, so it looks like a tall bar at 1703 until I read the label "101 per 100".
5. **Trust sheet** reads 5/5 checked on the served build (r1 saw 4/4, so one claim was added, presumably the simulation).
6. **Framing.** Sex ratio at christening in early-modern London. The limit sentence (christenings, not births, so unchristened babies are missing) is the honest caveat. No group-framing issue seen. Whether the record's exclusions (for example non-Anglican families) need a cultural note is for the cultural route, not this review.

Verdict reason: the r1 finding (the "large counts" cause told with nothing on the stage) is fixed by the yearly-count title and the 100-a-year simulation, so no finding blocks a first-time learner.

## After reading meta.json (build.md not read)

- The objective's cause clause ("a small steady difference shows every year when the counts are large") now has two things on the stage standing for it: c3 (the axis title's yearly counts) and c5 (the simulation). That meets the told-vs-shown decision that r1 cited.
- c5's source discloses seed 1 as the first seed tried, with the spread over 1,000 seeds (median 27.5 girls-ahead years). That answers finding 4's second note in the record. The learner-facing claim text says only "This is a simulation, not data", which is enough for a learner.
- The caption collision in finding 4 is acknowledged in c5's own wording ("back on the real chart, the line ... below zero"). It is deliberate. My note is that its placement inside the real plot can be misread, which is a layout note for demo-builder.
