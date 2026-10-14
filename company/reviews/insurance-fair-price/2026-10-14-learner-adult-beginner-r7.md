*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): insurance-fair-price
lesson version: v3
boundary: adult-beginner (meta.json learner field). Reads "1 in 100" and knows what a premium is. Has never computed an average payout (chance × loss), and does not know why paying more than the average loss can still be sensible. Same mind as r6.
Screenshots seen: yes (artifacts/walkthroughs/insurance-fair-price/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact (written before reading r6)

- Predict: the options $120 / $100 / $50 are at the same precision, and $120 (the premium) is the natural trap. I took it. The title "What does the insurer pay out?" and the hook "What does that risk cost?" are neutral. The locked stage shows 100 empty houses and "?" readouts.
- Explore: "+1 year" turns one house red ("Year 1: paid $10,000"), and the average reads $100. "+100 years" brings the average to $99 and adds two tallies: "Houses hit 0 / 1 / 2+ times: 40 · 33 · 27" and "Years with 0 / 1 / 2+ losses: 36 · 37 · 28". The outlined "your house" paid $12,120 over 101 years and got $0 back.
- That combination works for the second idea. My house paid every year and was never hit. In the same pool, 27 houses were hit twice or more. The pool's average stayed near $100. From the stage I can see that no single house knows which group it will be in, and that the pool carries the losses. The reveal points at exactly those numbers.
- Reveal: $99, $100, 36 / 28, $12,120, 40 / 27 all match the stage, and the year-101 state is on stage when the reveal opens.
- Minor findings, not blocking:
  1. Year 1 still lands on exactly $100 after one year (one loss among 100). A first-timer could think every year costs exactly $100. The "Years with 0 / 1 / 2+" tally corrects this, but only after +100.
  2. After Reset (frame 04: year 0, "?"), opening the reveal brings the stage back to year 101 (frame 05). It is correct for the quotes, but the jump surprised me. One line such as "showing your 101-year run" would explain it.
  3. The 2+ houses are shown as counts, not dollars. "Hit twice = $20,000 without cover" would make the rare large loss felt next to my $12,120.
  4. Stage text after +100 is about 30 words, a little over the budget.

## 2. Earlier findings (r6, on v2)

1. The outlined house was a lucky draw (hit twice, came out ahead), which taught the opposite lesson: **fixed** (it is never hit, pays $12,120, and the pool tally sits beside it).
2. Year 1 lands exactly on $100: **not fixed** (minor 1).
3. "$0" was a throwaway option: **fixed** ($50).
4. Alt text "1 house lost": fine now.

## 3. After reading the brief

- doesNotKnow (a), chance × loss: shown (the average settles at $99-$100, and the reveal names 1/100 × $10,000).
- doesNotKnow (b), why paying above the average can be sensible: shown by the outlined never-hit house next to the pool's 40 / 33 / 27 tally. The "small sure cost versus rare large loss" sentence now points at what is on stage. "The $20 covers the insurer's costs" is one sentence of told context.
