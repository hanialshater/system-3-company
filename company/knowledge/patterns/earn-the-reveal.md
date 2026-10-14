```yaml
id: earn-the-reveal
confidence: "*"    # held at "*" (2026-10-12 review). 17 of 18 reviews now show the problem, but every one is from the wave that produced the pattern (order within the day not recorded) and the fix is untested on real learners or even on a wave-1 lesson. Raise only on wave-1 lessons built with the pattern.
context: Any lesson whose reveal explains something the learner was supposed to see on the stage.
problem: >
  The kit unlocks "Show me why" after any interaction, so a learner can reveal after one tap and be
  told the payoff they never saw. Worse, what they did see can confirm the wrong answer (base-rates at
  1 in 10 reads "99 of 108 are sick"), and the reveal then contradicts their own evidence.
therefore:
  - Name the key state: the moment that, once seen, makes the reveal obvious.
  - Call interact() only for steps that move the learner toward it, or call it once when the key state
    is reached and set minInteractions to match.
  - Write the reveal from the state the learner actually reached. Never narrate a run they did not have.
  - Never let the question's numbers differ from what the stage draws. (Split out 2026-10-12 as its own pattern, numbers-from-the-stage; kept here as a pointer.)
  - Keep the state the reveal cites alive on the QA path. Reset, wall taps and slider sweeps must not erase or skip it; if a seen line survives, say so, because nothing else rescues a wiped picture. (Added 2026-10-14, crit candidate 2.)
would_be_wrong_if: In EXP-002, learners on gated lessons recall no better than learners on ungated versions, or abandon at the gate more than 20% more often.
documented_cases: [merge-sort-payoff, base-rates, half-life, binary-search, natural-selection, herd-immunity, birthday-paradox, mercator-greenland,
  odd-numbers-make-squares, pendulum-period, projectile-angle, compound-interest, exponential-growth, gradient-descent, overfitting, ph-log-scale, supply-demand]
# 2026-10-14 cases (not produced by the first wave; still simulated readers, still same-day rules): the-bar-nobody-can-forecast (Reset last, reveal reads "your 0 random nights"), ternary-asks-more, patience-wins-the-split, four-in-a-row-two-thirds, range-min-in-four-nodes (decisions/2026-10-14-reveal-quotes-what-you-saw.md: about 25 of 64 revise files), twenty-then-ten-off (seen lines rescue Reset) and wave-from-the-corner (wall taps wipe labels, nothing rescues it; a published lesson, demo crit pair 5).
excluded_cases: [binary-numbers]   # its reveal gate was not flagged; its problems are the prediction and the reveal density
known_failure:
  - "Applied inconsistently by reviewers: the same condition (reveal reachable without the key state) was FATAL for half-life, odd-numbers-make-squares, pendulum-period, projectile-angle and base-rates, but 'revise' or 'borderline, not marked fatal' for binary-search, natural-selection, birthday-paradox, herd-immunity and ph-log-scale. Either the fatal rule needs a threshold (key state is the whole payoff vs a supporting one) or the verdicts are noise. Routed to the evaluation-steward."
  - "Reviews and retro disagree on the count (the pattern said 7 of 18, the retro 18 of 18, this review 17 of 18 by reading the findings). The count is not a measurement of anything until the key state is named in meta.json per lesson."
  - "2026-10-14: the same condition was a published lesson's failure (wave-from-the-corner) after the fix was available, so the pattern was not applied to published lessons retroactively, and the 'about 25 of 64' count is a keyword grep, not a measurement."
  - "The told-vs-shown record (decisions/2026-10-14-told-vs-shown.md) scopes the 'why' rule by the brief, which narrows this pattern's claim: not every causal sentence must be on stage."
part_of: demo-standard
may_call: predict-before-reveal
```
