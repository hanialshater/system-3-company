*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): one-percent-a-day
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows small improvements add up; does not know that 1% a day compounds to about 37.8 times, not 4.65 times, or that measured skill gains usually slow down with practice, so a constant 1% a day is arithmetic, not what learning data show)
Screenshots seen: yes (artifacts/walkthroughs/one-percent-a-day/sheet.png, recorded 2026-10-14T18:58)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "About 4.7 times"; slid daily gain to 0.7%; tapped Add practice curve, Compound at 1%; opened reveal.

1. **The prediction is genuine.** "1% × 365 = 365%, so about 4.7 times" is the natural beginner sum, and the reveal confirms that is the trap. The dashed "no compounding" line ending at 4.7 is a good touch.
2. **The compounding half lands.** The grey curve bends upward to 37.8× at 1%, against the dashed 4.7×. Sliding to 0.7% (12.8×) first shows how sensitive the result is. Clear.
3. **The "does it hold up" half rests on a made-up curve presented as evidence.** The practice curve is labelled "illustrative, skill ∝ day^0.4", but the reveal says "when skill is measured, gains come fast at first and then slow, as your practice curve showed (10.6× after a year)". As a learner I read that as "data show practice gives about 10.6× in a year". But the curve is an assumed shape, and 10.6× is just 365^0.4 (it depends entirely on the chosen exponent and on calling day 1 "1×"). The lesson quotes an invented number as if it were measured, in the very paragraph that criticises a book for quoting arithmetic as if it were data.
4. **Where my boundary stops: "skill ∝ day^0.4".** The proportional sign and the exponent are formula-speak. I can ignore it, but then I cannot tell how made-up the green curve is.
5. The comparison of 37.8× with 10.6× also invites a wrong lesson ("practice beats compounding until month 10, then loses"). The crossing point of the two curves on the chart has no meaning, since one is arithmetic and the other is illustrative.
6. Reveal fits: 37.8×, 4.7× and 10.6× are all on stage. *Atomic Habits* is named. Trust link "0/6 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Drop the 10.6× figure from the reveal, or call it "an illustrative curve" in the same sentence; point to what measurement shows in words ("practice studies find gains slow down over time").
- Replace "skill ∝ day^0.4" with plain words ("a made-up curve that rises fast, then slows").

Verdict reason: the compounding arithmetic is shown well, but the lesson's critique uses an invented curve's number as if it were measured, which teaches the same error it warns against.

## After reading the brief (meta.json)

- doesNotKnow item 2 says "not what learning data show". The stage shows no learning data, only an assumed shape (finding 3). Item 1 is delivered.
- Fix route: demo-builder (reveal wording); fact-checker for the claim behind "when skill is measured".
