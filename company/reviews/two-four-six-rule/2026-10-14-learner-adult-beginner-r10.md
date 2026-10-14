*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): two-four-six-rule
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows evidence that fits your idea supports it; does not know that tests chosen to fit your idea can't tell it apart from a broader one, or that a test which could prove you wrong tells you more)
Screenshots seen: yes (artifacts/walkthroughs/two-four-six-rule/sheet.png, recorded 2026-10-14T18:55)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "No, it breaks the pattern"; stepped each number down and up, "Flip order", "Test these" (6-4-2), "Test 1-2-10"; opened reveal.

1. **The prediction is genuine, if two-way.** "No, it breaks the pattern" is the honest answer for my boundary. The framing ("which breaks 'add 2'") hints at a trick, and with two options a guess is 50/50, so the surprise is weaker than a three-option question.
2. **The table carries the argument.** Columns "fits +2?" and "fits secret rule?" for every test: the three given tests ✓ ✓; 6-4-2 ✗ ✗ ("your guess and the secret rule agree"); 1-2-10 ✗ ✓ "← differ". The "differ" row is the one that teaches, and it is marked.
3. **The free-build controls are fiddly and the panel's advice goes unrewarded.** Nine ± steppers to build three numbers; on the walked path the first five taps returned to 2-4-6 and "Tests run: 0". The panel says "Try ones your guess says will fail", and the natural first such test (6-4-2) agrees with the guess, which could teach "disconfirming tests also just agree". Only the preset "Test 1-2-10" delivers the differ row.
4. **Where the idea I lack first appears: none that blocks.** The secret rule ("any three increasing numbers") is shown at the reveal, and "they fit 'any three increasing numbers' just as well, so they couldn't tell the two rules apart" is exactly the gap. "Where it stops: testing cases that fit is often sensible" is a fair limit.
5. Reveal fits with its picture (11-reveal: the table with all rows and the secret rule banner).
6. Trust link reads "0/5 claims checked" (fact-checker's lane).

Verdict reason: the test that could prove the guess wrong is seen to be the only informative one, in a table built from my own tests.

Fixes (hypotheses for the builder, not tested):
- After a learner test that agrees (like 6-4-2), add a nudge: "this broke your guess and the rule agreed: try one that breaks +2 but still rises".
- Consider a third option to reduce 50/50 guessing (e.g. "Can't know without testing").

## After reading build.md (Pre-flight v1)

- The note says Wason is credited on the stage caption. I did not see a Wason credit in any frame or in the transcript (the reveal-phase caption reads "Secret rule: any three increasing numbers"). Either the credit is not rendered on this path or I missed it at sheet size; worth a check by qa-tester / fact-checker.
- 6-4-2 is the designed "no-fit" milestone; finding 3 is about what a free-building learner may conclude from it, a hypothesis.
- Fix route: none required for launch.
