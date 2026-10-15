# Design note: sure-million-or-long-shot (behavioral:allais-certainty-effect)

author: learning-designer (Lena) · date: 2026-10-15 · status: draft (no build) · brief: `company/domains/briefs/behavioral.md` §1 (cm-behavioral) · charter: `company/domains/behavioral.md` · numbers: `node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs` · sourcing: `company/research/notes/2026-10-15-w902-behavioral-economics-replication-sourcing.md` (Allais row)

**Not buildable yet.** `src/demos/behavioral/` cannot exist until W-981 (domain id). Builds also wait on Project Review 1 (2026-10-16) and the W-556 queue gate. The brief fields below are for the builder to copy into `meta.json` when it is scaffolded.

## The payoff (what this lesson is for)
A sure thing is not one block. The sure $1M is 89% of $1M that both options in the pair share, plus an 11% slice. Take the shared 89% away and pair 1 *is* pair 2. Expected utility cannot care about a block both options share, so "I'm cautious" cannot explain the sure $1M in pair 1 together with the long shot in pair 2. The procedure (writing out EU sums) is not the payoff. The payoff is seeing the certainty disappear when you remove the shared block.

## Knowledge boundary (meta.json `learner`)
- knows: "what an average (expected value) is"; "a felt value that rises more slowly than money can make a sure amount worth more than a gamble (`square-root-wealth`)".
- doesNotKnow: "that under expected utility, with any felt value that rises with money, a chance both options share cancels out, so two pairs that differ only in that shared chance must get the same answer".
- Has never seen: the phrase "expected utility", the Allais pairs, the name "certainty effect". The prerequisite lesson says "felt value", never "utility". **So the stage must gloss the model once** (see Interaction). Without the gloss the predict question asks about a term the learner has not met. That would be the theatrical-beginner failure turned around: a question nobody inside the boundary can reason about.

## Misconception (meta.json `misconception`)
"Taking the sure $1M in one pair and the 10% chance of $5M in the other just means I am cautious; some felt value for money fits that." (Brief wording, with "utility function" changed to "felt value for money" to match the boundary.) The predict's option C is this misconception.

## Objective (meta.json `objective`)
The learner can explain that removing the 89% both options in a pair share turns pair 1 into pair 2, so expected utility, whatever the felt value, gives the same answer in both, and the sure-then-long-shot pattern fits no felt value.

## Prediction (brief's wording, kept)
"Someone takes the sure $1M in pair 1. Under expected utility, which may they choose in pair 2?" (18 words)
A) Only the 11% chance of $1M · B) Only the 10% chance of $5M · C) Either one, depending on how cautious they are. Answer: A.
- Options are worded at the same precision (all name a card or a reason). No EV or probability is asked for (P0 condition 3).
- C is the misconception. B is the certainty effect read backwards ("they like safety, so in pair 2 they... take the bigger prize"). A wrong guess on either one is what the toggle answers.

## Interaction (what the learner does, and why each control earns its place)
Stage: two pairs of cards. Each card is a 100-cell bar split by outcome (brief). One constraint I'm adding: **no number on the stage except the stated chances and amounts.** No EV, no utility curve, no sums (P1; E1).
1. **Pair-1 choice (1A | 1B), milestone `pair1`.** The learner's own answer, after committing to the model's answer. That order is fixed by the kit.
2. **Pair-2 choice (2A | 2B), milestone `pair2`.**
3. **Toggle "Take away the shared 89%", milestone `shared`.** This is the payoff control. On the locked stage and in explore before the toggle, 1A's bar is one solid $1M block with **no internal divider** (a divider would point at the answer). When the toggle goes on, the same 89 cells grey out in all four cards (89% $1M in pair 1, 89% nothing in pair 2), and what is left lines up: 11 cells of $1M against 10 of $5M plus 1 of nothing, identical in both pairs. Turning it off restores the bars. The learner's choice marks stay on through the toggle.
- **Model gloss (stage caption, 16 words):** "Expected utility: give each amount any felt value, more money worth more, then weight by chance." It is shown from the locked frame onward, since the predict depends on it. It counts against the 25-word stage budget with the card labels; see open question 1.
- Why it isn't interactivity for its own sake: control 3 *is* the derivation, made visible. Controls 1-2 exist so the reveal can be about the learner's own pair (type b), which is the charter's strongest claim.

## What the learner should notice
1. With the toggle on, the two pairs show the same picture: 11 against 10 + 1.
2. The thing that made 1A "sure" was the greyed block, and 2A never had it.
3. Their own two marks are either on the same side of that picture (one felt value fits) or on opposite sides (none does).

## Reveal script (proposed; replaces the brief's draft; every branch ≤ 90 words)
Counted with the same rule as the check script (whitespace words). **cm-behavioral owns the script text.** If these are accepted, the check script's branch strings change too (open question 2).
- **1A + 2B (75 words):** "You took the sure $1M, then the 10% chance of $5M. Take away the 89% each pair shares, and both pairs become 11% of $1M against 10% of $5M. Expected utility must answer it the same way both times, so no utility function fits your two choices: a departure from the model, not a slip. This lean to the sure thing is the certainty effect. Where it stops: you chose knowing the pairs were linked."
- **1B + 2A (80 words):** "You took the 10% chance of $5M, then the 11% chance of $1M. [same middle] Leaning away from the sure thing is the reverse of the certainty effect. Where it stops: you chose knowing the pairs were linked."
- **1A + 2A (85 words):** "You took the sure $1M, then the 11% chance of $1M. Take away the 89% each pair shares, and both pairs become 11% of $1M against 10% of $5M. You answered it the same way both times, so one utility function fits your two choices: a cautious one, for which $1M is worth more than 10/11 of $5M. The sure $1M, then the 10% chance of $5M, would fit none: that is the certainty effect. Where it stops: you chose knowing the pairs were linked."
- **1B + 2B (83 words):** the same, opening "You took the 10% chance of $5M both times." and with "a bolder one, for which $5M is worth more than 1.1 times $1M".

What changed from the brief, and why:
- **The matched branches now name the effect.** In the brief they never say "certainty effect". The lesson's own seen-the-link design makes matched answers the likely branch, so most learners would leave without the concept's name or the pattern it names. Brief 2's matched branches already do this ("a switch ... would fit only ..."); I've made the two lessons parallel.
- **Shorter first sentence.** The learner's choices stay marked on the cards, so the reveal does not need to repeat the pair numbers. That frees the words for the line above and for the held line.
- **The reveal quotes what you saw.** "11% of $1M against 10% of $5M" is the picture with the toggle on, and the toggle is a required milestone. If the learner turns the toggle off again before opening the reveal, the picture no longer shows it. **The builder should force the toggle on when the reveal opens** (or keep it on once reached), so the quoted state is on screen.

**Held line (the one type d sentence; mixed branches only), revised for "smaller than the original":**
- 1A + 2B (89 words): after "...is the certainty effect.", add "Re-run with 4,098 people in 19 countries, it held up, weaker than first reported."
- 1B + 2A (88 words): replace the naming sentence with "That is the reverse of the certainty effect, which held up with 4,098 people in 19 countries, weaker than first reported."
- Why I changed it: the W-902 verdict is **robust but attenuated** (Cicerale et al. 2022, PMC9337702, reporting Ruggeri et al. 2020: "substantially confirmed ... albeit with attenuated effects, in a study enrolling 4098 participants from 19 countries"). The replication rule wants the source and sample with a robust claim. A reveal that says only "held up" would overstate it. "Weaker than first reported" is the limit, in the same sentence, so it stays one type (d) line (G1 condition 2). It is still **held**: Ruggeri 2020 was not opened, so the attribution is secondary, and the fact-checker decides whether "as reported by Cicerale et al." is enough. **Fallback unchanged:** cut the sentence and put back the unheld branch text. The lesson teaches fully without it.

## Recall (proposed alternative; see open question 3)
The brief's recall ($3,000 sure vs 80% of $4,000; 25% vs 20%) is a **common-ratio** pair: every chance divided by 4. The lesson teaches **common consequence**: remove a shared block. A learner who learned exactly what the stage showed has no shared block to remove in that question, so it tests a second idea that wasn't taught. My proposal, with the same idea and new numbers (37 words):
"Pair X: $2,000 for sure, or 20% of $3,000, 75% of $2,000 and 5% nothing. Pair Y: 25% of $2,000, or 20% of $3,000. Under expected utility, someone who takes the sure $2,000 must choose in Y:" A) The 25% chance of $2,000 · B) The 20% chance of $3,000 · C) Either, depending on how cautious they are. Answer A: removing the shared 75% of $2,000 from X leaves 25% of $2,000 against 20% of $3,000 and 5% nothing, which is Y. EU(X1) − EU(X2) = EU(Y1) − EU(Y2) = 0.25·u(2k) − 0.20·u(3k) − 0.05·u(0). I did this arithmetic by hand, so it is not a claim until the check script prints it.

## Open questions
1. **cm-behavioral / builder: stage word budget.** Card labels (four cards, up to three outcomes each), the toggle label (5 words) and the model gloss (16 words) may go over 25 stage words. If they do, I suggest shortening the gloss to "Expected utility: any felt value, more is better, weighted by chance" (11 words) and writing amounts as cell legends, not sentences. Do not drop the gloss itself: the predict depends on it.
2. **cm-behavioral: accept the revised branches and the held line?** If you do, the check script's strings and its "longest branch with held line" check need updating (your script; the fact-checker must not write it).
3. **cm-behavioral: recall.** Keep common ratio (it tests transfer to a second form of the paradox, which is harder and was not shown), or switch to my common-consequence pair? If you switch, add it to the check script.
4. **Fact-checker (via cm-behavioral): is a secondary attribution enough for the held line?** "As reported by Cicerale et al. 2022" for Ruggeri 2020's N and country count. If not, the fallback applies.
5. **Locked-stage hint, minor.** The toggle label "Take away the shared 89%" is visible but disabled before the commit. It says the pairs share something, without saying which option follows. I judge that acceptable. Evaluators should check it at Pre-flight Q3.
