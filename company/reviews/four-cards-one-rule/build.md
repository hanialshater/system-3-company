# Build note: four-cards-one-rule

builder: demo-builder (Meta M4, order O-3) · 2026-10-22 · v1 · brief: company/domains/briefs/math.discrete.md, Wave J, brief 1 (check D1) · design: company/reviews/four-cards-one-rule/design.md

- Intent: HTML stage (no SVG): readout, a 4-column grid of card buttons (E, K, 4, 7 in brief order), the two possible backs under each inspected card, Reset. `breaks(front, back)` in Demo.tsx = vowel on the letter side and odd number on the number side; the tags come from it, not from a table.
- Deviations from the brief, for cm-math:
  1. Predict question gains "You're handed four cards. Each has a letter on one side and a number on the other." The brief's check (D1) depends on it, and copy-style asks for every condition stated.
  2. Reset hides the backs but keeps the ticks and the readout; at the reveal, the inspected cards' backs show again (Reset is disabled then), so what the reveal names is on the stage. Without this, a Reset before the reveal left only "Could break the rule: E, 7" on screen.
  3. Readout before any breaker is inspected: "Could break the rule: ?" (no answer in the locked frame).
- Stage words at the busiest frame (all four open): readout 5 ("Could break the rule: E", "7" is 0) + card letters E, K 2 + back letters A, K, A, K 4 + tags 8 + Reset 1 = 20, as the brief counts.
- Title and hook are mine: "Which cards test the rule?" / "E, K, 4, 7, and the rule "a vowel has an even number on its back". Which do you turn?"

## Pre-flight v1

1. Title and hook: "Which cards test the rule?" / "E, K, 4, 7, and the rule "a vowel has an even number on its back". Which do you turn?" Neither names a pair.
2. Options: "E and 4" / "E and 7" / "E only" / "All four": all name cards, same precision.
3. Locked stage: four cards E, K, 4, 7 (no ticks), no backs, readout "Could break the rule: ?", Reset disabled. Nothing marks E or 7.
4. Reveal values: "E, with a 7 behind it" and "7, with a vowel behind it" = the "breaks" backs shown when those cards are inspected (milestone `all`; re-shown at the reveal; readout "E, 7"); "The 4 could not break it" = milestone `four` (its two "fine" backs, re-shown at the reveal). No number is computed from state beyond these.
5. QA path: E, K, 4 (four), 7 (all), Reset: both milestones by press 4. At the reveal all four cards show their backs again.
6. Reset: after E, K, 4, 7, Reset, the reveal read: "Only two cards could hide a back that breaks the rule: E, with a 7 behind it, and 7, with a vowel behind it. The 4 could not break it whatever its back, because the rule never says even numbers need vowels; turning it can only agree. | A rule 'if P then Q' fails only when P is true and Q is false, so you test it by looking for that case." The stage beside it shows all eight backs with the two "breaks".
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3103 four-cards-one-rule` on a production build of this worktree: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 79 words (tool count, verdict line included); controls 214 px, text 19 px. Screenshot artifacts/reveal-fit/four-cards-one-rule.png (git-ignored): readout, the four cards, all backs and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Text sizes (HTML): tags 0.7rem = 11.2 px, back faces 16 px, card faces 28.8 px, readout 15.2 px. Card buttons ≥ 72 px tall, Reset 44 px.
- `npm run check`: nothing for this slug. `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted). The last CSS tweak (the "breaks" outline drawn as border colour plus a 1 px shadow, so the red cards no longer grow 1 px) came after the measured build; it changes no size.
- Official QA is code's qa stage; not run by me.
