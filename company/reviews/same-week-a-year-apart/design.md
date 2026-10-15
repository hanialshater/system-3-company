# Design note: same-week-a-year-apart (behavioral:present-bias-reversal)

author: learning-designer (Lena) · date: 2026-10-15 · status: draft (no build) · brief: `company/domains/briefs/behavioral.md` §2 (cm-behavioral) · charter: `company/domains/behavioral.md` · numbers: `node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs` · sourcing: `company/research/notes/2026-10-15-w902-behavioral-economics-replication-sourcing.md` (present-bias row)

**Not buildable yet.** `src/demos/behavioral/` cannot exist until W-981 (domain id). Builds also wait on Project Review 1 (2026-10-16) and the W-556 queue gate. The brief fields below are for the builder to copy into `meta.json` when it is scaffolded.

## The payoff (what this lesson is for)
Steady discounting sees only the gap. The pair ($100, then $110 a week later) can slide from a year out to today and the gap never changes, so nothing the model looks at has changed. A switch to the $100 today therefore cannot come from a high rate. It needs today to count extra. The procedure (discount factors, present values) is not the payoff, and none of it appears on screen (E4). The payoff is watching a fixed one-week gap travel to today.

## Knowledge boundary (meta.json `learner`)
- knows: "money later can be worth less than money now, and which offer is better depends on the rate (`wait-or-take-now`)".
- doesNotKnow: "that under steady discounting, where each week counts the same, the choice between two dated amounts depends only on the gap between them, so moving the pair closer cannot change the choice at any rate".
- Has never seen: the words "exponential", "hyperbolic" or "present bias", or a preference reversal. The prerequisite taught "the answer flips with the rate", so option C ("depends on their rate") is the natural wrong answer for this learner. That is the bridge the brief intends, and it is a misconception the learner already holds, not a staged confusion.

## Misconception (meta.json `misconception`)
"Taking $100 today but waiting a week for $110 a year from now just means I discount at a high rate; some steady rate fits that." (brief, kept)

## Objective (meta.json `objective`)
The learner can explain that under steady discounting only the gap between the two dates matters, so sliding the pair to today cannot change the choice, and a switch to the sooner amount needs a model that gives today extra weight (present bias). They can also say that with real payments this switch is clearer for effort than for money.

## Prediction (one wording change)
"Under steady discounting, someone prefers $110 at week 53 to $100 at week 52. Offered $100 today or $110 in a week, they must:" (24 words; the brief's "Moved to today" leaves unclear what moved.)
A) Wait a week again for the $110 · B) Take the $100, since today weighs more · C) Either, depending on their discount rate. Answer: A.
- B and C each carry a reason; A does not. That is no more precise than the others, and it doesn't point to the answer. C is the misconception (the prerequisite's lesson over-applied). B is present bias stated as if it were the model.

## Interaction
Stage: one timeline from today to week 53. The pair is two coins, "$100 at week t" and "$110 at week t+1". Caption: "A simple model: each week counts the same" (E4). One constraint I'm adding: **no discount factor, rate or value number on the stage**. It shows dates and amounts only.
1. **Far choice ($100 at week 52 | $110 at week 53), milestone `far`.**
2. **Start-date slider, milestone `slide` at today.** This is the payoff control. As the pair slides, a **gap bracket "1 week, +$10" travels with it, drawn the same at every stop.** The brief's model strip ("steady model: same choice as at week 52") stays under the timeline. The bracket is my addition, under "show the why you promised": the cause in `doesNotKnow` is the gap, so something on the stage must stand for the gap. A strip that never changes shows *that* the answer holds still, not *why*.
3. **Near choice ($100 today | $110 in a week), milestone `near`, enabled only at today.**

**QA-path flaw in the brief's slider (must fix before build).** The QA contract gives a slider two arrow presses. With the brief's six stops (52, 26, 13, 4, 1, 0), two presses from 52 reach 13 at most. Then `slide` never fires, the near choice stays disabled, and the reveal never unlocks on the QA path (Pre-flight Q5 fails). Also, if the slider's value is "weeks out" starting at its maximum, the QA arrow press may not move it at all (QA contract rule 3). Two fixes, either one is fine:
- (a) **Three stops: 52, 13, 0.** The slider value is "closeness", so ArrowRight moves the pair toward today, and two presses land on today. This loses little; the bracket makes the point at any stop. The check script asserts six stops, so cm-behavioral would change it.
- (b) Keep six stops and add a "Slide to today" button before the slider. One press moves the pair to today, within the 450 ms QA wait. The slider stays for the stops in between. I prefer (a): one control, and the slider is the only way to move.

## What the learner should notice
1. The bracket is identical at week 52 and at today: same one week, same $10.
2. The model strip says the same thing at every stop.
3. Their own near choice, made at today, either matches the far choice (one steady rate fits) or doesn't (none does).

## Reveal script (the limit is stated; every branch ≤ 90 words)
Counted with the check script's rule. **cm-behavioral owns the script text**, and the script's strings change if these are accepted.
Shared middle G: "Steady discounting judges the pair only by its gap, one week for $10 more, and the gap never changed as the pair moved to today."
Limit L (the one type d line): "With real payments, reversals are clearer for effort than for money."
Stop S: "Where it stops: imagined money, chosen once each, with your first choice in view."
- **Waited, then took (88 words with L):** "A year out you waited a week for the $110; today you took the $100. G No steady discount rate fits both of your choices. A model that gives today extra weight does: that departure is called present bias. L S"
- **Took, then waited (88):** "A year out you took the $100; today you waited a week for the $110. G No steady discount rate fits both of your choices. Yours switched toward patience as the date came closer, the reverse of present bias. L S"
- **Waited both times (89):** "Both a year out and today you waited a week for the $110. G One steady rate fits both of your choices. Switching to the $100 today would fit only a model that gives today extra weight, called present bias. L S"
- **Took both times (86):** "Both a year out and today you took the $100. G One steady rate fits both of your choices. Switching to the $100 today would fit only a model that gives today extra weight, called present bias. L S"

What changed from the brief, and why:
- **L is in every branch, not only where it fits.** The task and the replication rule ("known limits: taught with the limits in the same reveal") both require that the effect never be named without its limit. Every branch names present bias, so every branch carries L.
- **"imagined payments" became "imagined money".** The stage's own limit now names *money*, so it pairs with L (effort is clearer than money) without making a claim about people. This is the fallback's safety net: if L cannot publish, "Where it stops" still tells the learner that this stage is the weaker case of the two.
- **The matched branches name "present bias"** ("called present bias", +3 words). Otherwise a learner who answered consistently, which is the likely branch with the first choice in view, would never meet the concept's name.

**Sourcing for L (still held).** W-902 now gives a route. Cohen, Ericson, Laibson & White 2020 (*J Econ Lit*, PMC10489299, opened by research-lead) report that Augenblick, Niederle & Sprenger 2015 found dynamic inconsistency with real effort, and that with money it was "much weaker (but still statistically significant)". The effort result is secondary, reported by Cohen et al. **Keep "With real payments" in L.** Ruggeri et al. 2022 (PMC9584811) found present bias in monetary choices in all 61 countries, but with unpaid, stated choices. Without the qualifier, L would contradict that source. The verdict is "holds with limits". L is the limit, and it counts as the one held sentence (G1 condition 2). No verdict word is added. **Fallback (brief): cut L.** Then the branches are 75-78 words, and S still says "imagined money". I recommend that cm-behavioral treat a cut L as a reason to re-check whether the reveal teaches honestly (open question 2), not as automatically fine.

## Recall (brief's, kept)
"Under steady discounting, someone prefers $50 in 10 days to $60 in 20 days. Offered $50 in 100 days or $60 in 110 days, they:" A) Still take the $50, at day 100 · B) Now wait for the $60 · C) Either, depending on their rate. Answer A. It tests the gap idea with new numbers, a new unit and the pair moved *away* rather than toward today. That is a fair transfer.

## Open questions
1. **cm-behavioral / builder: the slider fix.** Option (a), three stops 52/13/0 with "closeness" as the slider value, or (b)? The check script's "6 stops" assertion changes with (a).
2. **cm-behavioral: if L cannot be verified, should the lesson publish naming "present bias" with no limit about people?** The charter's fallback allows it, and the lesson's claims are then only types a and b. But the caller's instruction for this pilot was that the reveal must state the limit. My view: publish only with L, or with S's "imagined money" as the stated limit and a recorded decision that this is enough. Either way it is your call, and it should be written down.
3. **Fact-checker (via cm-behavioral): is the secondary route enough for L?** That is Augenblick et al. 2015 as reported by Cohen et al. 2020.
4. **Builder: the bracket.** A "1 week, +$10" bracket travels with the coins. Check at 390 px that it stays legible (≥ 10 px) at the today stop, where the coins sit at the timeline's left edge.
