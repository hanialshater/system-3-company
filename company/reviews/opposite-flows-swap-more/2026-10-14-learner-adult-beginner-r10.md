*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): opposite-flows-swap-more
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows things move from high to low concentration; does not know that side-by-side flows level off at halfway when they run the same way but keep exchanging along the whole length when they run opposite ways)
Screenshots seen: yes (artifacts/walkthroughs/opposite-flows-swap-more/sheet.png, recorded 2026-10-14T18:50)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "50"; tapped "Opposite way", "1 section", "4 sections", "10 sections"; opened reveal.

1. **The prediction is genuine.** "Same way gives 50" is given, and nothing on the locked stage tells me direction should matter. 50 is the natural pick for someone who only knows "high to low".
2. **The payoff is on the stage.** The 10-section opposite picture shows water 18, 27 ... 100 above blood 0, 9 ... 82, and I can read the constant gap of about 9-18 in every column. The running row "Blood out: same 10: 50 · opposite 1: 50 · opposite 4: 80 · opposite 10: 91" makes the trend with section count visible.
3. **Where the idea I lack first appears: "Numbers: level as each arrives".** Each box holds the level *arriving* at a section, not the level inside it, so in the first water box (18) beside blood 0 I expect them to "level off halfway" to 9, and only after checking the next blood box (9) does the rule click. A beginner may not do that check. Not blocking; the reveal sentence ("the water was still richer than the blood beside it") is enough without the arithmetic.
4. **The same-way picture is never seen on this path.** The panel says "Flip the water's direction", so I flipped first and never watched the same-way pipe stall at 50 with numbers. The reveal's first sentence ("met at 50 and stopped exchanging") describes a picture I did not see; the 50 only appears as a number in the summary row. A learner who taps "Same way" would see it, but the prompt sends me away from it.
5. 1 section opposite = 50, same as same-way, is a nice touch: it shows the gain comes from many sections, not from direction alone.
6. Reveal fits with its picture (06-reveal: stage, summary row and text all on screen). "Toy model." is said.
7. Trust link reads "0/5 claims checked" (fact-checker's lane).

Verdict reason: the opposite-way gain and its growth with sections are both on the stage and quoted in the reveal. Finding 4 is a wording fix to the explore prompt.

Fixes (hypotheses for the builder, not tested):
- Explore prompt: "Look at same-way first, then flip the water" (or show the same-way numbers on unlock), so the reveal's first sentence points at something seen.
- One short line under the stage: "each box: level arriving; they meet halfway inside it".

## After reading build.md (Pre-flight v1)

- Build note says the stage starts on "Same way, 10 sections" after locking in, so the same-way picture with 100/50/50 levels is on screen before the first tap. The walkthrough has no frame of that state, so I could not see it. Finding 4 softens to: a learner who taps "Opposite way" at once (as the prompt invites) sees the same-way picture for only a moment. The prompt fix still stands as a hypothesis.
- The "arriving levels" choice (finding 3) is deliberate: showing post-exchange levels would hide the gap. Agreed; a short label would still help.
- Fix route: none required for launch; prompt wording to demo-builder / cm-life if taken.
