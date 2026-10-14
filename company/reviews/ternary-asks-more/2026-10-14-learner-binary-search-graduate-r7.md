*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): ternary-asks-more
lesson version: v2
boundary: binary-search-graduate (knows binary search halves the list per question; does not know that cutting in thirds takes more comparisons in total, not fewer). Same tag as r6.
Screenshots seen: yes (artifacts/walkthroughs/ternary-asks-more/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact (written before reading r6 or the brief)

- Hook and predict: "Halves or thirds: which finds it first?" and "Cut a sorted list into thirds each round: do you find things sooner?" set the trap without tipping it. Options "Fewer than 10 / About 10 / More than 10" are worded at the same precision; none carries a lone exact number. The locked stage shows two full bars and an empty table of "?". No leak. I chose "Fewer than 10", the honest wrong guess.
- Step 1 (Ask one question): Halves "500? · Left: 500"; Thirds "334? · Left: 666". This is the moment: one thirds question keeps two thirds, not one third. Shown on the stage, side by side.
- Step 2 (Ask until found): 10 vs 13 on 721, and the table fills "left after 2: 249 / 333" and "721: 10 / 13". The cause (a thirds round costs two questions and keeps a third; two halvings keep a quarter) has a cell on the stage.
- Step 3 (Try all 1,000 targets): worst 10 / 13, average 9.0 / 11.2. My guess breaks on the table.
- Reveal: every number it names (10, 13, 9.0, 11.2, 249, 333) is in the table when it opens, at the stage's rounding. "Look at 'left after 2' in the table" points at a cell I can see. About 75 words, ends on the idea ("Per question, halving wins") then one line of context.
- Where it could still slip (minor): on this path I never watched the second question happen; "left after 2" was filled by "Ask until found". The number is on the stage, but the bars for that state flashed past. A learner who taps Ask one question twice sees it directly.
- Minor: after "Ask until found" both bars become a "701 · zoomed · 740" strip of unlabelled ticks. I cannot tell which tick is which question, and the switch of scale is abrupt. The table carries the lesson, so this is decoration that costs attention.
- Minor: in the locked frame "Try all 1,000 targets" is clipped at the bottom edge of the stage.
- Minor: question says "comparisons", stage says "questions"; the stage line "Each question compares 721 with one number" bridges it.

## 2. Earlier findings (r6, read after section 1)

1. "More: 13" was the only option with an exact number: FIXED (all three options now "… 10").
2. Main, reveal pointed at a two-question state never visited: FIXED in the sense the standard asks. "left after 2" is recorded at a milestone and shown in the table when the reveal opens. (The bars for that state are still not watched on the QA path, minor.)
3. Zoomed strip of ticks hard to read: NOT FIXED.
4. Tiny histograms as a third view: FIXED (removed; table only).
5. Trust link 0/9: now 7/8 claims checked (fact-checker's lane, not mine).

## 3. New findings

1. Minor: the zoomed tick strip is unreadable on a phone and could go or be labelled.
2. Minor: "Try all 1,000 targets" clipped in the locked frame.
- No FATAL. A first-time learner with this boundary can see the cause on the stage (500 vs 666 after one question; 249 vs 333 after two).
