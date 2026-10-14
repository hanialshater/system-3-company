*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): screening-survival-clock
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows what "alive 5 years after diagnosis" means; does not know that the survival clock starts at diagnosis, so finding an illness earlier raises this count even when nobody lives longer, lead time)
Screenshots seen: yes (artifacts/walkthroughs/screening-survival-clock/sheet.png, recorded 2026-10-14T18:52)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "43%"; tapped "Test: off" (turns it on); moved "Found earlier by" to 3 yr; opened reveal.

1. **The prediction is genuine.** "Treatment changes nothing: every death stays on the same day" makes "43%, unchanged" the natural pick. It is exactly the misconception, stated in the learner's own logic.
2. **The picture is the argument.** Fourteen rows: dot (diagnosis), 5-year bar, cross (death). Turning the test on slides every dot left while every cross stays put, and red crosses inside the bar turn into black crosses past it. 6 → 10 → 12 of 14. I do not need any number to see it.
3. **Where the idea I lack first appears: two clocks on one axis.** The axis is "years from symptoms" but the count is "years after diagnosis". On the locked stage there is no legend (the "Dot: diagnosis. Bar: the 5 years after it. ✕: death." line only appears after locking in), so at predict time I see dots and red crosses with no key. I can still answer from the question text, but the picture does not help me predict.
4. The toggle is labelled with its state ("Test: off"), so the panel's "Switch the test on" means tapping a button that says "off". Small.
5. The reveal fits with its picture (04-reveal): all 14 rows, the moved dots, the unmoved crosses and "3 yr earlier: 12 of 14" are on screen. "compare deaths in whole groups" is a usable take-away.
6. "This toy makes no claim about any real test." is said.
7. Trust link reads "0/4 claims checked" (fact-checker's lane).

Verdict reason: lead time is seen directly (dots move, crosses do not), and the reveal names only what is on the stage.

Fixes (hypotheses for the builder, not tested):
- Show the legend on the locked stage too.
- Label the toggle as an action ("Turn test on") or add the state elsewhere.

## After reading build.md (Pre-flight v1)

- The locked readout "6 of 14 (43%)" is a wrong option shown on purpose (the brief asks for it). From my seat it is the right bait: it makes "unchanged, so 43%" feel safe. The missing legend at predict (finding 3) is not discussed in the note.
- Fix route: none required for launch.
