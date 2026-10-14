# Build note: every-base-fools-fermat

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #69 (single card).

- Brief numbers held in node (BigInt): 320 of 320 coprime bases give 1; base-2 Miller-Rabin chain 263, 166, 67, 1, 1 (composite); 9 strong liars in 2..560 (50, 101, 103, 256, 305, 458, 460, 511, 560 — the count includes 560 = -1, a trivial liar); 22 base-2 pseudoprimes below 10,000 (not used on the stage); 561 is the smallest Carmichael number.
- Chosen bases 2, 5, 7, 10, 13 are disclosed in claim c6: all are caught by the strong test. A liar base (e.g. 50) is not offered; the reveal states the 9-of-320 count instead.
- Tapping a base runs Fermat at once (so QA's one-press-each reaches three bases); "Stronger test on <base>" shows the squaring chain a^35 .. a^560 with the stray square root of 1 in red.
- Milestones `three-bases`, `strong-test`. modPow uses plain numbers (products < 561^2).
- Theorem numbers in c1/c5 are cited by 3rd-edition numbering; the fact-checker should check them against 4e.
- Not run here: build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 7 claims `unverified`.

## v3 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-adult-beginner-r6.md), disputed c7
- Leak: title "The number that fools every base" and hook "...whatever base you try. It isn't." answered "All 320". New title "A quick prime test meets 561", hook "561 = 3 × 11 × 17 is not prime. How often does Fermat's quick test notice?"
- Options all numbered: "None of the 320" · "About 160 of the 320" · "All 320".
- Reveal quoted base 2's chain whatever the learner ran. It now quotes the chain of the base the stronger test last ran on; that chain stays drawn (labelled "stronger test on 13: ...") until the test runs on another base. The button no longer relabels itself ("Stronger test on this base").
- Squaring arrows carry a "²" mark (minor finding).
- c7 (disputed, pass 23: "never more than a quarter" fails at n = 9, and the bound's papers were not opened): reduced to the 561-only fact "10 of the 320 here, about 3%, so several random bases make a miss on 561 very unlikely". c4 reworded to list all five stage chains. Both unverified.

## Pre-flight v3
1. Title and hook: "A quick prime test meets 561" / "561 = 3 × 11 × 17 is not prime. How often does Fermat's quick test notice?" Neither says how many bases pass; "None" stays plausible.
2. Options: "None of the 320" · "About 160 of the 320" · "All 320". All numbered at the same precision.
3. Locked stage: note "Pick a base. A prime would give 1 every time.", five base chips, an empty chain of "?" boxes ("stronger test: not run yet"), readouts Bases tried 0 / Gave 1 0. Nothing shows 320 or "all".
4. Reveal values: "All 5 bases you tried" (current state, tried.length, matches the Bases tried readout); 320 coprime bases and Carmichael (told context, claims c2/c3); a^35, 4 squarings (constants of the test, drawn as box labels); "Your run on base 13 went 208, 67, 1: 67 squared leaves 1" (current state: the chain drawn on stage, milestone strong-test); 10 of 320, about 3% (told context, claim c7).
5. QA path: a = 2, 5, 7, 10, 13 (three-bases at the third), then "Stronger test on this base" on 13 (strong-test). Both milestones in 6 presses; the question's case (bases giving 1) is the Gave 1 readout, which stays visible, and the 13 chain stays drawn.
6. Reset: no Reset control; nothing clears tried or the chain. Reveal from that run: "All 5 bases you tried gave 1, and so do all 320 coprime bases. 561 is a Carmichael number, the smallest: Fermat's test cannot tell it from a prime. / The stronger test starts at a^35 and squares 4 times. Your run on base 13 went 208, 67, 1: 67 squared leaves 1. Modulo a prime, only 1 and n − 1 square to 1, so 561 is caught. A few bases still slip past (10 of 320 here, about 3%), so several random bases make a miss on 561 very unlikely."
