# Build note: outside-option-sets-the-split (ncm-e01, 2026-10-14)

Built from brief #14 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version). No spec or wireframe existed.

- Stage: a $1 split bar with three parts (A's fallback, A's half of the rest, B's half), a "No deal" line and a "Deal" line. Presets $0/$0.20/$0.40/$0.60 and a slider (0 to $0.80 in 10-cent steps, so every split is whole cents). B's outside option is fixed at $0. Milestone `at-question` (A's option = $0.40, the predict question).
- Slider stops at $0.80 rather than $1: above that the halves are too thin to label on a phone.
- Re-ran in node: A = 0.4 + 0.6/2 = 0.70; the Nash product (A - 0.4)B is maximised at A = 0.70; A = 0.5 + a/2 for a in 0..1.
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-knows-opportunity-cost-r6.md)
- Top finding (the locked stage printed the rule): "A's fallback, then half the rest" / "B: half the rest" now render only after the commit. The locked bar shows the $0 case only (two $0.50 halves, "Deal: A $0.50, B $0.50").
- Stem: "Under Nash bargaining, A gets?" became "A and B split $1 by bargaining (the Nash model). ... How much does A get?"
- Hook: "Does that $0.40 still change the deal?" leaned to yes; now "What does A end up with?"
- Hint: "Does A ever walk away?" (no promised event).
- Reveal values now come from the learner: the $0.40 case is recorded and a line stays on stage ("Your $0.40 case: A $0.70, B $0.30, deal made"); the last change is quoted from prev → current with a dashed "before" split line. Milestones moved, at-question (minInteractions 2). Claim c6 new.
- Minor: the half labels hide when a half is under 15 cents wide (no "$0.10$0.10" overlap).

## Pre-flight v2
1. Title and hook: "The offer you never take" / "A could walk away with $0.40 but never does. What does A end up with?" Nothing names a split or says the option matters.
2. Options: "$0.50" · "$0.70" · "$0.40". All in dollars and cents.
3. Locked stage: chip "Split $1 · B's outside option $0", "No deal: A $0.00, B $0.00", "Deal: A $0.50, B $0.50", one bar with two $0.50 halves and a "split" marker, readouts A gets $0.50 / B gets $0.50. No rule labels, nothing at $0.70.
4. Reveal values: "$0.40 ... $0.70 and B $0.30 ... $0.60 ... $0.40 + $0.30" (milestone at-question; recorded line "Your $0.40 case: A $0.70, B $0.30, deal made" stays drawn); "from $0.70 to $0.80 ... from $0.85 to $0.90" (current state: prev and a; dashed before line and "before $0.85"); "every 10 cents ... 5 cents" (derivation c3/c6).
5. QA path: $0.20 (moved), $0.40 (at-question), $0.60, slider two arrow presses ($0.70, $0.80). Both milestones in two presses; the question's case is a milestone and its line stays.
6. Reset: no Reset control. Reveal after that path: "With your $0.40 option, A got $0.70 and B $0.30, and the deal still happened: A never took the outside $0.40. Each side first gets its fallback, then what is left ($0.60) is split evenly: $0.40 + $0.30 = $0.70. / Your last change took A's option from $0.70 to $0.80 and A's deal from $0.85 to $0.90 (the dashed line): every 10 cents added to A's option moved 5 cents of the deal to A. The option works as a threat, not as a move: it matters even though A never uses it. / A model: money payoffs, both value a dollar the same, and the deal is sure to happen."

## Pre-flight v3

builder: demo-builder (wave G revisions, batch 2) · 2026-10-14 · answers r7 learner review `2026-10-14-learner-knows-opportunity-cost-r7.md`

Changes: the reveal quoted the last slider stop ("from $0.70 to $0.80"), which the two-press slider move passes in a blink; the learner saw $0.60 → $0.80. Now every option set is logged in a "Tried (option → A gets)" row under the readouts (sorted, shown after the commit), and the reveal quotes the lowest and highest entries of that row. Title and hook rewritten: "never does" told the learner A does not walk away, which ruled out the "$0.40" option before the commit. c6 reworded, unverified. Not changed: "(the Nash model)" in the stem (minor); the narrow B segment at $0.80 (its value is in the B gets readout).

1. **Title and hook.** "What is A's way out worth?" / "A could get $0.40 elsewhere; B gets nothing elsewhere. How does the $1 get split?" No amount, and neither says whether A walks away. No.
2. **Options.** "$0.50" · "$0.70" · "$0.40". All in dollars and cents.
3. **Locked stage.** Chip "Split $1 · B's outside option $0", "No deal: A $0.00, B $0.00", "Deal: A $0.50, B $0.50", one bar with two $0.50 halves and a "split" marker, readouts A gets $0.50 / B gets $0.50, empty Tried row. No rule labels, nothing at $0.70.
4. **Reveal values.** "$0.40 ... $0.70 and B $0.30 ... $0.60 ... $0.40 + $0.30": milestone at-question; the recorded line "Your $0.40 case: A $0.70, B $0.30, deal made" stays drawn. "from $0.00 to $0.80 (80 cents) ... from $0.50 to $0.90 (40 cents)": computed from the Tried row's lowest and highest entries, which are on stage in the same rounding. "Every 10 cents ... 5 cents": derivation c3.
5. **QA path.** $0.20 (moved), $0.40 (at-question), $0.60, slider two arrow presses ($0.70, $0.80). Both milestones. At reveal the Tried row reads "$0.00 → $0.50 · $0.20 → $0.60 · $0.40 → $0.70 · $0.60 → $0.80 · $0.70 → $0.85 · $0.80 → $0.90" and the $0.40 line is drawn.
6. **Reset.** No Reset control; the Tried row only grows. Reveal after that path: "With your $0.40 option, A got $0.70 and B $0.30, and the deal still happened: A never took the outside $0.40. Each side first gets its fallback, then what is left ($0.60) is split evenly: $0.40 + $0.30 = $0.70. / Your Tried row: raising A's option from $0.00 to $0.80 (80 cents) moved A's deal from $0.50 to $0.90 (40 cents). Every 10 cents added to A's option moves 5 cents of the deal to A. The option works as a threat, not as a move: it matters even though A never uses it. / A model: money payoffs, both value a dollar the same, and the deal is sure to happen." (Read from the code; this batch does not run QA.)
