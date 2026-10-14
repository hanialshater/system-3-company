*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): no-fraction-fits
lesson version: v2
boundary: adult beginner (even/odd, squares; proof by contradiction unfamiliar)
Screenshots seen: yes (artifacts/walkthroughs/no-fraction-fits/sheet.png, 4 frames)
Verdict: revise

## 1. From the artifact

- Predict: the hook "surely some fraction hits √2 exactly?" voices the misconception, which is fine. "Only with a calculator" is a weak third option (a calculator shows decimals, not fractions); nobody will pick it. The locked stage already prints "If p/q = √2, squaring gives p² = 2 × q². So: is 2 × q² ever a perfect square?": algebra a beginner who barely remembers squares must hold before choosing.
- Explore: the slider sets q; a number line between consecutive squares shows where 2 × q² lands (q = 3: 18 between 16 and 25, "off by 2"), and readouts give nearest p/q (4/3) and (p/q)² (1.7778). "Next close call" jumps to q = 5: 50 next to 49, "Off by 1: 49 is odd and 50 is even. Not equal." 7/5 squared = 1.9600. Seeing "off by 1" is good.
- Where understanding broke: the stage can only ever show misses, and the misses get *closer* (1.78 -> 1.96). What I see on stage supports "keep going and you'll hit it", which is my wrong belief. The "never" comes only from the reveal's proof.
- The parity caption is a false lead. "49 is odd and 50 is even" suggests odd-vs-even is why it fails. But 2 × q² is always even, and an even p² is possible (e.g. 16² = 256 near 2 × 12² = 288); the real argument (p even forces q even, so no lowest-terms fraction) is never on stage. I would leave thinking "it fails because odd ≠ even".
- Reveal: "2 × 12² = 288, 17² = 289" was not visited (only q = 1, 3, 5 on the walked path; the gate opened after one close call). "Close is not equal; this proves it" reads as if the near misses prove it. The lowest-terms proof is compact and correct, but told, with "lowest terms" and "contradiction" unexplained for this boundary.
- Layout: the stage has a large empty lower half; reveal fits. 6/6 claims checked.

## 2. Earlier findings (r2 review, same version v2)

1. 288/289 example unvisited on a one-tap path: **not fixed**.
2. "Close is not equal; this proves it" points at the near misses: **not fixed**.
(From v1, carried in r2:) near misses may reinforce "it will hit eventually": r2 said partly fixed; I think **not fixed**: the walked path shows (p/q)² climbing 1.78 -> 1.96 and nothing on stage says it can never arrive. Proof not prepared by the stage: r2 called the odd/even caption a fair seed; I read it as a **false lead** (see section 1).

## 3. Disagreement with r2, and what would move this to launch

r2 gave launch on the same version. I give revise because the bar for this wave is "the learner gets the idea from the stage without being told", and the idea here, *never*, is carried entirely by the reveal text. The stage shows misses that are getting closer, which is the misconception's own evidence.

- Top: put the real step on stage. E.g. after a close call, a "Suppose it worked" mode: pick p even (p = 2k), show 4k² = 2q² -> q² = 2k², so q must be even too, and halve the fraction, again and again, until the learner sees it can't stop. That is the proof as something to watch.
- Replace the q = 5 caption "49 is odd and 50 is even" with something that is the actual reason, or drop it; as written it suggests the wrong rule.
- Quote the learner's own closest miss, not 288/289; reword "this proves it" to point at the next paragraph.
- Minor: replace "Only with a calculator" with a believable third option (e.g. "Yes, but only with huge numbers like 99,999/70,710").
- No FATAL.
