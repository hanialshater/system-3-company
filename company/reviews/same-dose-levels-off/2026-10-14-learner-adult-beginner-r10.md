*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): same-dose-levels-off
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows half disappears each half-life; does not know what happens when the same amount keeps being added, that the level rises only until the amount cleared per interval equals one addition)
Screenshots seen: yes (artifacts/walkthroughs/same-dose-levels-off/sheet.png, recorded 2026-10-14T18:51)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 200"; tapped "Every 6 h", "Every 12 h", "Every 3 h"; opened reveal.

1. **The prediction is genuine, though the walked path guessed right.** "About 4,000" is 40 x 100 with no clearing; "About 2,000" is a vague "it piles up a lot". With only "half disappears" in my head, I would expect it to keep growing, more slowly. 200 is not obvious.
2. **The payoff is on the stage.** The 6 h sawtooth climbs and goes flat at 200 inside the first day; "first 5: 100, 150, 175, 188, 194" makes the approach readable. The 3 h curve flat at 341 kills the "more often means it never stops" reading.
3. **Where the idea I lack first appears: "Clearing half removes more when there is more" (reveal).** This is the whole mechanism, and the stage never shows the amount cleared per interval. I see levels, not outflow, so "at 200, half is 100, exactly one addition" is told. I can check it in my head from the first-5 line (150 → half is 75), but the lesson does not invite that.
4. Three overlaid sawtooths are dense at phone size; in 04-step-3 the 6 h and 12 h traces merge into a grey band. The end labels ("3 h: 341", "6 h: 200", "12 h: 133") carry the reading.
5. "Adding twice as often settled at 341" matches the stage. Good.
6. "A made-up substance; this is not about any real medicine or dose." is said. Good.
7. Trust link reads "0/4 claims checked" (fact-checker's lane).

Verdict reason: levelling off, and that it still levels off at a different rate, are seen. The balance mechanism is told but checkable from shown numbers.

Fixes (hypotheses for the builder, not tested):
- Add a "cleared this interval" readout next to the first-5 line (50, 75, 88, 94, 97 → 100), so in-equals-out is seen, not told.

## After reading build.md (Pre-flight v1)

- Model uses continuous decay between additions; the shown numbers match. Nothing in the note addresses showing the amount cleared (finding 3), so it stands as a hypothesis for the builder.
- Fix route: none required for launch.
