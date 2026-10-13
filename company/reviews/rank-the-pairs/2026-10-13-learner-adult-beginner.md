*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: rank-the-pairs
lesson version: v1
boundary: adult beginner (knows a spam filter scores emails and a cutoff decides; never heard of AUC or ROC).
Screenshots seen: yes

## From the artifact
- First needed an idea I didn't have: "the chance the spam scores higher" over random pairs; I could follow it, but the question asks me to compute rather than guess.
- Prediction leak: options are 50%, 86%, 100%. 86% is the only specific number, and 50% / 100% are visibly wrong once you glance at the lists (some spam is lower, most higher). The answer is picked by elimination, not by having an intuition.
- Shown well: the 5 x 5 grid with green ticks, red crosses and a grey "½" for the 0.3 tie; "SPAM HIGHER 21.5" of "25 of 25". Counting pairs is visible and concrete.
- Told, not shown: the lesson's title question ("before any cutoff") and the warning "it can hide how the scorer behaves at the cutoff you actually use" are reveal text only; no cutoff ever appears on stage, so I cannot see what AUC ignores. "Check all pairs" fills rows 2-5 at once.
- Layout: on the reveal frame the grid shrinks to a thumbnail and the ticks and labels are unreadable.

## Fix suggested
Make the options closer and non-giveaway (e.g. 70%, 86%, 95%) or ask a gut question ("closer to 50% or 100%?"); add one cutoff slider showing that two scorers with the same AUC can differ at a chosen cutoff, or drop the warning; keep the grid full size in the reveal.

## After reading the brief
Learner field assumes threshold/precision-recall knowledge, which makes the title question meaningful; the leak remains. Claims 4/4 checked; 21.5/25 = 86% agrees.

Verdict: revise
