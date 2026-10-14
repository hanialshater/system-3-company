*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): wheel-number-pulls-guess
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a random number is irrelevant to a factual question; does not know that seeing a number first pulls estimates toward it, by a lot, because guesses start at the number and stop adjusting too soon)
Screenshots seen: yes (artifacts/walkthroughs/wheel-number-pulls-guess/sheet.png, recorded 2026-10-14T18:56)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 0 points apart"; dragged the wheel to 42; tapped "Wheel: 10", "Wheel: 65", "Hide wheel"; opened reveal.

1. **The prediction is genuine.** "The number is irrelevant" makes "About 0" the honest pick; "About 5" is the "a little nudge" answer. 20 is surprising.
2. **The picture shows insufficient adjustment well.** Each of 30 dots has a thin line from the red wheel mark toward where it stopped; at wheel 10 they bunch to the left of the hidden-wheel median, at 65 to the right. Medians 25 / 47 vs 35 with no wheel. "Started there and stopped too soon" is drawn, not just said.
3. **Where the idea I lack first appears: "Model: guesses go 60% from wheel to belief".** This is the first line I read and I could not parse it. I think it means "each guess moves 60% of the way from the wheel number to what the person believes". It also quietly contains the answer: with 40% left at the wheel, 55 points of wheel gap become about 22 points of answer gap. So the stage cannot surprise me about *whether* anchoring happens; it assumes it.
4. **The reveal blurs the model and the people.** "With the wheel at 10 the crowd's median was 25 ... The number told them nothing, yet every guess started there" reads as a finding about people, but the crowd is the model from finding 3. The real evidence is the next sentence ("In the original 1974 study the medians were 25 and 45") and the replication verdict. A learner could leave thinking the simulation proved the effect.
5. "Does it hold up? Yes ... Why it happens is still debated; insufficient adjustment, shown here, is one account." Honest and useful.
6. Trust link reads "0/6 claims checked" (fact-checker's lane).

Verdict reason: the size of the pull is seen and backed by the real study's medians; the model line and "crowd" wording are fixes, not falsehoods.

Fixes (hypotheses for the builder, not tested):
- Plain model line: "Model: each guess moves 60% of the way from the wheel to the person's belief".
- Reveal: "In this model the median was 25 and 47; in the 1974 study, with real people, 25 and 45."

## After reading build.md (Pre-flight v1)

- The builder added the 1974 medians "so the lesson's model crowd (47) is not mistaken for the study": the same worry as finding 4. From my seat the sentence before it ("The number told them nothing, yet every guess started there") still reads as a finding about people, so the fix is half done. The model line (finding 3) is the brief's chip, cut short for fit.
- Fix route: none required for launch; wording to cm-books / demo-builder.
