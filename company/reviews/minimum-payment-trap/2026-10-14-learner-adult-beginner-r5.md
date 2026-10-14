*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): minimum-payment-trap
lesson version: v1
boundary: an adult beginner with a credit card who divides balance by payment.
Screenshots seen: yes (artifacts/walkthroughs/minimum-payment-trap/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "Why $90 a month takes so long", with the hook "$3,000 owed, $90 paid every month. Simple division says 33 months. Does it?" The title ("takes so long") and the hook's rhetorical "Does it?" both tell me 33 is wrong before I predict. That leaves "50 vs never", which is still a real choice. The question is plain and gives the monthly rate (1.667%). The locked stage (one $3k bar at month 0, "?" readouts, default $150) leaks nothing beyond that.
- Explore: at $170 (slider), the curve hits zero at 22 months, against a dashed "no interest: 18 mo", with "Month 1: $50 interest, $120 off the debt." At $90 it is 50 months against "no interest: 33 mo", with "$50 interest, $40 off" and $1,415 in interest. The red curve visibly bows above the dashed straight line, so you can see where the time goes. At $50 the box stays flat at $3k ("still owed after 5 years", "never", "$50 a month, forever"). The three settings carry the idea entirely from the stage.
- Reveal: "paid off on the 50th payment... about $1,415 in interest" was seen. "Interest is charged first... only $40 of your $90 shrinks the debt" was seen as the month-1 caption. "As the balance falls, interest falls... which is why the curve bends" is told, but the bend itself was seen. Later months' splits are not on stage, which is acceptable. The model caveat is honest.

## 2. Earlier findings (2026-10-13 review, v1, verdict launch)

1. The locked slider starts at $150, not the question's $90, which is a little confusing: **not fixed**, minor. It is still optional, and arguably useful, since starting at $90 would let a learner read the answer the moment the stage unlocks.
2. Everything the earlier review marked as shown (the month-1 split, the bend against the dashed line, the $50 "never") is still shown.

The version is still v1, and I see no learner-visible change since the earlier review.

## 3. New findings

1. Minor: the title and hook pre-reject the 33-month answer ("takes so long", "Does it?"), which weakens the prediction for the most common belief. A neutral title (for example "How long does $90 a month take?") would keep 33 a live option.
2. Minor: the "interest falls as the balance falls" step could be on stage, for example as a month-24 caption ("Month 24: $X interest, $Y off").
3. No FATAL.
