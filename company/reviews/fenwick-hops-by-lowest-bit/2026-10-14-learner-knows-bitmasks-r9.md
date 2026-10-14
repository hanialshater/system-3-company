*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): fenwick-hops-by-lowest-bit
lesson version: v4
boundary: knows-bitmasks (from meta.json learner: knows bit masks and two's complement; does not know that x & -x gives a hop that makes prefix sums and updates both take about log n cells)
Screenshots seen: yes (artifacts/walkthroughs/fenwick-hops-by-lowest-bit/sheet.png and 05-reveal.png; walkthrough re-run 2026-10-14T15:28 after the first attempt timed out)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "13"; tapped "Read a cell, hop down", "Hop to 0", "Change position 1"; opened reveal.

1. **The prediction fits this mind.** I can compute 13 & −13 = 1, but I do not yet see how cells chain. 13 / 3 / 1 are the same shape.
2. **Possible lean in the locked stage.** The range bars (16, 8, 4, 12, …) are drawn before the commit, and cell 13 is outlined. A careful reader could count the bars that tile 1–13 and get 3 without the hop rule. I think that is the structure, not a leak, because the question is about using it. I note it as a hypothesis.
3. **The payoff is shown.** "13=1101 → 12=1100 → 8=1000 → 0=0000" plus the three green bars tiling 1–13 is the hop rule. The update path 1 → 2 → 4 → 8 → 16 is drawn in red on exactly the bars that contain position 1, against a Σ row with all 16 boxed red. "Running totals are quick to read but slow to change" (the hook) is paid off on screen.
4. **Where the idea I lack first appears:** "about log2 n hops" is told. I saw 3 and 5 hops for n = 16, and log2 16 = 4, so "about" carries it. Fine as one sentence.
5. **The reveal fits with its picture.** In 05-reveal the stage caption, the hop line, the bars, the Σ row and the last reveal line are all on screen. 73 words.
6. Small: the red outline on cell 8 sits on top of its green fill, so 8 is both "read" and "changed". That is correct, but it took me a second look.
7. The trust link reads "1/7 claims checked" (fact-checker's lane).

Verdict reason: both halves of the idea (read by clearing bits, update by adding them) are drawn and quoted from my own run.

## After reading build.md (Pre-flight v4) and the r8 review

- r8's revise (bar picture off screen at the reveal) is fixed: everything the reveal names is drawn inside the picture and on screen in the release frame.
- The builder flags that dropping the 1–15 / 1–7 targets removes some exploration (design-lead board item). From the learner side I did not miss them: one query plus one update carried the idea.
- The builder's open minor, that "Change position 1" does not say what the change is, matches my reading. I noticed it only as a mild "change to what?".
- Fix route: none required for launch.
