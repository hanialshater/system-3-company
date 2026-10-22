# Design note: four-cards-one-rule (math:conditional-falsification)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.discrete.md`, Wave J, brief 1 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (D1)

## The payoff
Testing a rule means hunting for the one case that could break it. The learner sees every possible back of every card and finds that only two backs, under E and under 7, can ever say "breaks". The 4, the card that feels like a test, can only ever agree.

## Knowledge boundary (meta.json `learner`)
- knows: what "if … then …" means in everyday speech; vowels and even numbers.
- doesNotKnow: that a rule "if P then Q" can only be broken by a case with P true and Q false, so you test it by hunting for that case, not by finding cases that agree.

## Misconception
To test "if vowel, then even" you turn the vowel and the even number (looking for confirmation). (Rationale only: Wason 1968; never quoted, no rate claimed.)

## Objective
The learner can say that only E and 7 can break the rule, because "if P then Q" fails only when P is true and Q is false, and that turning the 4 can only agree.

## Prediction
Brief's kit text with the condition the answer depends on stated first (copy-style: every condition stated; the D1 check assumes it): "You're handed four cards. Each has a letter on one side and a number on the other. Rule: if a card shows a vowel, its back is even. You see E, K, 4, 7. Which must you turn to test it?" (39 words). Options: E and 4 / E and 7 / E only / All four (answer B).

## Interaction
- Four cards in one row (≤ 72 px wide each), each a button. Tapping a card shows its two possible backs underneath as small cards (4 or 7 under a letter card, A or K under a number card), each tagged "breaks" (red outline plus the word) or "fine". An inspected card is active and disabled and keeps a tick.
- Readout above the row: "Could break the rule: ?" until a card that could break it is inspected, then the inspected ones in card order ("E, 7").
- Reset hides the backs (ticks and readout stay). At the reveal, every inspected card shows its backs again, so E's 7, 7's A and the 4's two "fine" backs are on the stage beside the reveal text.
- Possible backs are limited to 4/7 and A/K, as in the brief's D1 check; the claim c2 states this restriction.
- Milestones: `four` (the 4 inspected), `all` (all four inspected). minInteractions 2. QA path: the four card taps.

## Reveal (brief draft, 72 words, unchanged)
"Only two cards could hide a back that breaks the rule: E, with a 7 behind it, and 7, with a vowel behind it. The 4 could not break it whatever its back, because the rule never says even numbers need vowels; turning it can only agree. A rule 'if P then Q' fails only when P is true and Q is false, so you test it by looking for that case."

## Told vs shown
The cause (only P-true, Q-false can break it) is shown by the two red "breaks" backs and the six "fine" ones; the general sentence is claim c1.

## Recall
Parcels: "if fragile, then a red sticker"; fragile / not fragile / red sticker / green sticker → fragile and green sticker (claim c2).
