*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): flat-rate-costs-nearly-double
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a loan charges interest and is repaid in monthly instalments; does not know that a flat rate charges interest on the original amount for the whole term, even after half has been repaid, so the true yearly rate on what you owe is nearly double)
Screenshots seen: yes (artifacts/walkthroughs/flat-rate-costs-nearly-double/sheet.png, recorded 2026-10-14T18:55)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "10%"; tapped Flat 10%, True 10%; moved Term to 3 yr; opened reveal.

1. **The prediction is genuine.** "10% flat" sounds like 10%; 14% and 18% are a fair ladder.
2. **The key picture is good:** the owed line steps down from $10k while the flat interest bars stay a level "$83 a month". Seeing interest not shrink as the debt shrinks is exactly the idea.
3. **Where I first got lost: "$5,449" at month 12.** The reveal leans on it ("by month 12 you owed $5,449"). My own arithmetic says something else: each $500 payment is $83 interest plus $417 repayment, so after 12 payments I owe $10,000 − $5,000 = $5,000. Or, counting total cost, I have paid $6,000 of $12,000. Neither is $5,449. The lesson's number comes from a way of splitting payments I was never shown, and the same $5,449 dot stays on the chart for the true 10% loan too, which owes a different amount. A beginner who checks will stop trusting the numbers.
4. **The bars swap meaning.** With Flat 10% selected, the solid red bars are the flat loan's $83. With True 10% selected, the solid red bars are the true loan's shrinking interest and the flat loan becomes a hatched outline, but the red "flat: $83 a month" label stays. I had to work out which bars were which.
5. Moving the term to 3 yr changes only the true loan; the flat comparison stays at 2 yr, so the reveal stage compares a 3-year true loan with a 2-year flat one. The reveal quotes the 2-year figures ($1,075), which are now only in the summary lines.
6. "About half" ($1,075 vs $2,000) and "18.2%" are on stage. Trust link "0/7 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Either show the owed figure a beginner can reproduce (e.g. "after 12 payments you have repaid about half") or say in one clause how $5,449 is computed. Do not leave the dot on the true-loan line at the flat loan's figure.
- Keep one colour per loan (flat always red, true always teal, or similar).
- Apply the term slider to both loans, or reset to 2 yr when the reveal opens.

Verdict reason: the idea is pictured well, but the reveal's main evidence ($5,449 owed) contradicts the arithmetic a beginner would do and the bars change meaning between taps.

## After reading the brief (meta.json)

- doesNotKnow says "even after half of it has been repaid". That phrase is the fix for finding 3: "half repaid" is what a beginner can see; $5,449 is a figure they cannot. The brief's idea is right; the stage's number gets in its way.
- Fix route: demo-builder; $5,449 also to the fact-checker to confirm which balance it is.
