# Build note: insurance-fair-price

builder: demo-builder · 2026-10-13

- Intent: 10 × 10 houses, each an independent 1% chance a year of a $10,000 loss (mulberry32, seed 1, CHOSEN so year 1 has exactly one loss; disclosed in c4).
- Milestones: one year run, then 50+ years. Buttons +1 year, +100 years, Reset. Average payout hidden while locked.
- Reveal quotes the learner's own longest run (average, zero-loss years, 2+-loss years), computed from the same HISTORY.
- Brief's premium slider dropped (one representation, text budget).

## Revision v2 (wave D r5, 2026-10-14)

Title and hook no longer give $100. Customer's side on stage: an outlined 'your house' (house 1, hit in year 1 under seed 1) shows premiums paid against cover paid. Tally of years with 0 / 1 / 2+ losses on stage. In the reveal the stage shows the longest run and its controls lock (fixes the Reset contradiction). Alt text plural fixed. Reopened c4, c5; added c7.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.

## Pre-flight v3

Revision for r6 learner review (adult-beginner, revise): the outlined "your house" was a lucky draw. It was hit in year 1 and twice in 101 years, so it read as "insurance pays you back more than you pay", and the pool was only told.
Changes:
- "Your house" is now house 0. Seed 1 never hits it in 101 years, which is the commonest outcome (40 of 100 houses).
- A new stage line, "Houses hit 0 / 1 / 2+ times: 40 · 33 · 27", sets one house's record beside the pool's spread and the steady average.
- The year tally is reworded to the same 0 / 1 / 2+ form.
- The reveal quotes the house and the pool spread from the longest run, and it is under 120 words.
- The weak "$0" option is now "$50".
- c5 and c7 are set unverified, and c8 (the pool spread) is new.
Not changed: the seed, so year 1 still shows exactly one loss and $100 (minor finding 2). Changing the seed would move every verified number in c4. The 0 / 1 / 2+ lines show the lumpiness after the +100 press.
Stage text: after a run the stage has about 40 words (chip, year label, house line, two spread lines, readouts). That is over the 25-word budget, and I am flagging it.

1. **Title and hook.** "What does the insurer pay out?" / "Each house pays $120 a year against a 1-in-100 risk. What does that risk cost?" No: neither says $100.
2. **Options.** "$120", "$100", "$50": all dollar amounts, same precision.
3. **Locked stage.** 100 dim houses, "Each pays $120 a year", the chip, "?" readouts, blank lines. No $100 and no average is shown.
4. **Reveal values.** 101 years, average $99: (b) the longest run, recorded as `longest` (milestone `many-years`), and the reveal stage shows that run. $100 = 1/100 × $10,000: the answer, claim c1. 36 years with no loss and 28 with two or more: (b) the longest run, from the year tally line. $12,120, never hit: (b) the longest run, from the house line. 40 never hit and 27 twice or more: (b) the longest run, from the pool line. $20 above: c2.
5. **QA path.** +1 year (`one-year`) -> +100 years (101 years, `many-years`) -> Reset. Both milestones are reached. In the reveal phase the stage shows the longest run (101), with all three lines.
6. **Reset.** Reset sets the live years to 0, but `longest` stays at 101, and the reveal stage shows year 101. Reveal: "Over your 101 years the insurer paid an average of $99 per customer a year, close to 1/100 × $10,000 = $100. Single years were lumpy: the tally shows 36 with no loss and 28 with two or more. / The $120 premium is $20 above the average loss; in this model that covers the insurer's costs. Your outlined house paid $12,120 over 101 years and was never hit. In the pool, 40 houses were never hit, but 27 were hit twice or more. No house knows which it will be: each swaps a small sure cost for cover against a rare large loss, which the pool of 100 carries. / A model: independent risks, no fraud, one seeded run. Not advice about buying cover."
