# Creative Distrust Session: 2026-10-12

owner: pattern-librarian

Zero repeated corrections could mean fluency. It could also mean a very polite echo chamber.
Once a month we reopen something trusted, on purpose, and say where we are breaking the chain and why.

Here the opposite held: many corrections repeated (the reveal gate, 17 of 18). So the echo-chamber risk is not in what reviewers said but in what none of them could say: all 17 learner reviews used one simulated reader and one boundary, and the brief told every builder the same rules. A finding that contradicts a rule in the brief has nowhere to go.

## The trusted thing we are reopening
**"One representation on a phone. If the learner must watch two places at once, cut one."** (`product/demo-standard.md`, marked `**`, repeated in the domain briefs for physics, life, cs, ai and probability.) Chosen over the 120-character reveal floor (a stub check; it constrains nothing) and over predict-before-reveal (already downgraded today and under EXP-003). This one is starred, has no pattern file, no cases, and no experiment, and every builder obeys it without being told why.

## Why it might be what is stopping the next idea
The rule is about attention (two places at once). Many of the learner findings are about memory, and a second view is the usual cure. In the 17 learner reviews, the same problem recurs: the learner has to carry a number or a state from one moment to another because the stage shows only one:
- gradient-descent: the 0.05 / 0.95 tie, the lesson's most surprising fact, "has no side-by-side view; it is a number I must remember across resets".
- overfitting: the straight-line miss (4.1) "must be carried in memory from setting 0".
- exponential-growth: "nothing contrasts early days with the last days in one view".
- compound-interest: the straight-line comparison and "doubles every ten years" are told, not drawn; the two readouts mix a sliding window and a running total.
- weaker: base-rates (the contrast between the three chips is never on one screen), herd-immunity (run vs typical figure look alike), binary-search (no bad guess to contrast with the middle).

That is 4 firm and 3 weak lessons of 18 where the reviewer asked, in effect, for two things to be seen together. Every builder was forbidden to supply it. The rule might be preventing a representation of the same idea that is not "two places": a pinned ghost of the previous run, a small side-by-side that persists, a before/after toggle, a comparison strip. The nearest in-house evidence for it working is `mercator-greenland`, where a toggle between maps made "a good silent contrast" (learner review) and `pendulum-period`'s ghost bob (which was hidden when the two agreed, so it failed differently).

What the rule protects, honestly: the birthday-paradox review found a reveal that said 253 pairs while the diagram showed 406, and a tangle of lines; projectile-angle has three arcs crowding the labels on a phone; merge-sort's placed row read as part of pile B. These are the cases where two places made a learner lose their place. The rule is therefore not wrong, but it may be coarser than the cause. The attention cost is simultaneous, independent things; the memory cost is things that must be compared but are never shown together. A single rule that treats both as "cut one" reaches the second by accident, and the second is the payoff of several lessons (the tie, the overfit gap, the hidden growth).

Limits of my case: one simulated reader and one boundary; I coded the findings myself from other people's wording; the lessons are all first drafts; nothing here says a real learner would watch two places fine on a phone. The rule might be right.

## The cheapest test that could change our mind
Two steps, the first needs no build.
1. **Code the findings (done above, redo by a second reader).** An independent coder, blind to this argument, tags every finding in the 17 learner reviews as `attention` (lost track of where to look) or `memory` (had to carry something to compare). Prediction if I am right: `memory` findings are at least as common as `attention` findings. The count above is 4 firm vs 3 attention (birthday, projectile, merge-sort), so the prior is close to a tie and could go either way.
2. **One variant.** Take gradient-descent only. Add a persistent comparison (a faint trace of the previous step size's path, or a pinned "last run" chip), staying within one stage. Run the same learner review, same boundary, plus one different boundary, and judge pairwise against the original (pairwise-not-scores, its first real use). Predict: the "must remember across resets" finding goes away and no "which do I watch" finding appears. Would be wrong if a new attention finding appears or the pairwise verdict goes to the original. Cost: one builder, one learner review; no new dependencies.

Neither step touches the rule's text. If the variant wins, the change to demo-standard is a clarification ("one place to look; comparison may persist"), made through Pattern Review, not an exception per lesson.

## Result / next step
Not run. Next: evaluation-steward assigns the independent coder for step 1 (this wave); learning-designer picks the variant brief for gradient-descent and files it as an `[exploration]` slot, which would also make cycle-planning's empty exploration-bets table non-empty for the first time. Owner of the decision to change the rule: head-of-product (demo-standard). I will add the outcome here and to a new pattern file only if step 2 produces a case. If the principle turns out to be a purpose (not an evidence) choice, it goes to the founder.
