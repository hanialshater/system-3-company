# Build note: everyone-saves-nobody-does

builder: wave-i-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #58

- Intent: one chart of total saving per round (rounds 0-40, $0-$150), with "round N · income $X" printed at the top of the picture, so the learner watches one thing: saving jumps, then falls back while income sinks.
- Model (deterministic, Demo.tsx series()): spending_t = (100 − cut) + 0.8 × income_{t−1}; income_t = spending_t + 100; saving_t = income_{t−1} − spending_t. Whole-dollar display. Round 1 (cut $20): 880 / 980 / 120. Settled (income reads $900) from round 24; Run jumps to round 40 (900.01 / 100.00).
- Controls (one row): Next round, Run (to round 40, no animation), Reset (round 0), and cut chips $20 / $40 (switching resets to round 0). The cut chips are not rendered at the reveal (phone fit; the reveal does not refer to them, and the chip line still shows the spending rule).
- Milestones (both at the $20 cut): "round1" (saving $120 recorded) and "settled" (round ≥ 24: saving $100, income $900 recorded). Record row: "$20 cut: round 1 saving $120 · settled $100, income $900"; Reset and the $40 chip do not clear it.
- The readout row of the first draft was folded into the picture (top label) to fit the phone.
- The reveal names "the paradox of thrift" but no person; claim c4 asks the fact-checker to confirm the name (Keynes attribution is in the source field only).

## Pre-flight v1

1. **Title and hook.** "Everyone saves $20 more. Then what?" / "Every household spends $20 less so it can save. Does the whole country save more?" Neither names a total; $120, $100 and $80 all stay open.
2. **Options.** "$120" · "$100" · "$80". All bare dollar amounts.
3. **Locked stage.** Chip with the spending rule ("$80 + 80% of last round's income; investment fixed at $100; fixed prices"), empty axes (round 0-40, no dollar ticks, no points), "round ? · income ?", empty record row, controls disabled. No $100 tick or point is drawn while locked.
4. **Reveal values.** "$120": (b) milestone round1, record row. "$100" and "income settled at $900": (b) milestone settled, record row. "Each $20": the question's cut. "businesses invest: $100": the rule on the chip. "$100 less": computed from the recorded income (1,000 − 900).
5. **QA path.** DOM order: Next round (round 1: round1), Run (round 40: settled), Reset (round 0), "Cut $20" (disabled, active), "Cut $40" (cut switches, round 0). Both milestones in 2 presses; the record row holds them at the reveal.
6. **Reset.** Reset is pressed on the QA path (then the $40 chip). Reveal from that run: "Saving first jumped to $120, then fell back to $100 as income settled at $900. Each $20 not spent was someone else's lost income, so incomes fell until people could save only what businesses invest: $100. / Everyone tried to save more; together they earned $100 less and saved the same. This is the paradox of thrift, in a toy model. If extra saving funded extra investment, the answer would change." Matches the record row.
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 everyone-saves-nobody-does` (dev server, 2026-10-14): first run crop 47 px (readout row + two control rows); after folding the readouts into the picture and not rendering the cut chips at the reveal: verdict fit, **crop 0 px**, hiddenBelow 0, namedHidden 0, phoneFit true, **75 words**.

Known soft spot: after the QA path the stage shows the $40 cut at round 0 while the reveal talks about the $20 run (the record row carries it). Reviewers may prefer the chips to stay $20 at the reveal.

Not run (per dispatch): next build, QA, walkthrough. tsc and check pass.

## Fact-check rewording (W-938 (FC41), 2026-10-15, demo-builder)

- Reveal: 'This is the paradox of thrift, in a toy model' became 'That is a paradox, shown in a toy model' (support derivation from c1-c3). NOT fixed, outside my scope: the public /catalog map still shows the concept name 'Paradox of thrift (toy Keynesian model)' (content/curriculum/economics.json, owned by cm-economics), and meta concept/curriculum ids are 'paradox-of-thrift'. A checker may count the map label as learner-visible (the same question as patience-wins-the-split / Rubinstein).
- Claims reset to unverified: c4. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 74 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
