*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): every-base-fools-fermat
lesson version: v3
boundary: learner who knows fast powers mod n by repeated squaring and what coprime means; does not know that a composite can pass Fermat's test for every coprime base, or that checking square roots of 1 catches it (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/every-base-fools-fermat/sheet.png, 8 frames)
Verdict: launch

## 1. From the artifact (written before reading r6)

- Hook: "561 = 3 × 11 × 17 is not prime. How often does Fermat's quick test notice?" Neutral. It sets up the tension without giving the count.
- Predict: the options "None of the 320" / "About 160 of the 320" / "All 320" are at the same precision. On the locked stage every cell in the chain is "?" and both counters read 0. Nothing points at "All 320". "None" is a natural guess (the number is composite, so the test should notice), and that is the misconception.
- Explore: each base tap gives "a^560 mod 561 = 1: looks prime.", and "BASES TRIED / GAVE 1" climb together to 5 / 5. That counter stands in for "every base". "All 320" itself is told in the reveal, which is acceptable as a big number in the reveal.
- The stronger test runs on the last base tapped (13 on this path): 208 → 67 → 1 → 1 → 1, with ² on each arrow, 67 tinted red, and "67 squared is 1, but 67 is not 1 or 560: composite." The cause sits on the stage, and the reveal points at it.
- Reveal: "All 5 bases you tried" and "Your run on base 13 went 208, 67, 1" both match the stage, and the chain is still visible when the reveal opens. I checked all five offered bases: each chain contains 67 (2: 263,166,67,1,1; 5: 23,529,463,67,1; 7: 241,298,166,67,1; 10: 439,298,166,67,1; 13: 208,67,1,1,1). So whichever base the learner tries last, the stronger test catches 561.
- Minor findings, not blocking:
  1. A large empty band still sits above the status line in explore frames 02-07. The stage could be shorter.
  2. "10 of 320 here, about 3%" slip past the stronger test. This is told, and no liar base can be tried on stage. That is fine as claimed context.
  3. "Modulo a prime, only 1 and n − 1 square to 1" is told. The red 67 next to "not 1 or 560" is the stage pointer for it.
- Reset: not exercised on this path.

## 2. Earlier findings (r6, on v2)

1. The hook leaked "whatever base you try": **fixed** (new neutral hook).
2. The reveal quoted the base-2 chain the learner never ran: **fixed**. It now quotes the base the learner actually ran (13), and the chain is on stage.
3. "Squared" steps had no label: **fixed** (² on every arrow).
4. Empty band above the status line: **not fixed** (minor).
5. "Never more than a quarter" context: replaced by "about 3%", still told, acceptable.

## 3. After reading the brief

- The objective names the base-2 chain (263, 166, 67, 1). The lesson now quotes whichever chain the learner ran, which is better, but the objective text is stale. This belongs to the builder or the brief owner, not me.
- Both doesNotKnow items have something on stage: the 5/5 counter, and the red non-trivial square root.
