*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): ruler-on-mercator
lesson version: v2 (meta.json version 2)
boundary: scale-bar-knower (the lesson's own). Knows that maps have scale bars; does not know that on a world map a scale bar is true only along one line (meta.json learner field, same as r6).
Screenshots seen: yes (artifacts/walkthroughs/ruler-on-mercator/sheet.png, build 5, 6 frames; 05-step-4.png and 06-reveal.png opened at full size)
Verdict: revise (narrow: word budget only)

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("1,000 km"). For my boundary the natural pick would be 2,000 km; I took 1,000 to check the "held" reveal.

1. **No answer before the commit: met.** Options 1,000 / 2,000 / 4,000 km, all numbered alike. Locked stage: bar at the equator, yellow and green dashed bars equal, "2,000 km", "1.00×", "Seen: nothing yet". Nothing says 1,000. (The 60°N preset is visible but disabled while locked; it is also named in the question, so it points at the case, not the answer.)
2. **Shows the why: met.** At 60°N (05-step-4.png) the green dashed "true 2,000 km here" is about twice the yellow "same bar" (measured ~233 px vs ~119 px), and the grid rows visibly get taller toward the north, so "the map there is stretched" has a picture. MAP STRETCH 2.00× and YELLOW BAR ON THE GROUND 1,000 km are readouts. The 30°N stop (1,732 km, 1.15×) shows the stretch growing.
3. **The reveal quotes what I saw: met.** "at 60°N the bar spanned 1,000 km with a map stretch of 2.00×" matches the Seen line and readouts on stage at reveal; "the green bar ... was twice as long" matches the picture.
4. **Fit: the picture fits, the words do not.** In 06-reveal.png the stage top (map) and the reveal's last line are both on screen (stage-top crop 0). But the reveal is 97 words (> 90), and v2 is a new version of an unpublished lesson, so the budget binds. On the Equator-last path build.md says the reveal adds a further clause, which makes it longer still. Candidates to cut are told context: "It is the same north–south as east–west, which is why shapes look right while sizes do not." (category manager's call).
5. **Labels at the reveal are unreadable (kit, W-287).** The map is shrunk to about a third of its width; "same bar" and "true 2,000 km here" are about 4 px. The two bars themselves are still visible, so "twice as long" can be seen. The locked frame (01-predict) also draws the map small with tiny labels. Kit finding W-287, not a lesson revise.
6. Minor: the bar the stage and question call "yellow" renders as dark gold/brown in light theme (frames 02–06). A learner told "Yellow: the same bar" may hunt for a yellow line.

Where understanding first broke: it did not, on this path. A 2,000-km guesser would get the contradiction from the 1,000 km readout and the green bar together.

## After reading build.md (Pre-flight v2)

Pre-flight v2 answers items 1–6; the reveal text is "composed from the code, not from a run", and it matches the run. Item 7 (phone fit) is not answered; the run shows fit holds and the word count is the only miss. r6's one rule failure (narrow) appears fixed: both quoted numbers are on the Seen line and readouts at reveal.

**Top finding (revise, text budget):** reveal 97 words on v2 (> 90), more on the Equator-last path. Cut told context (category manager picks) to ≤ 90 on every path. Everything else meets the craft rules on this walkthrough; label shrink is kit W-287. Minor: "yellow" bar renders dark gold.

| r6 finding | Status |
|---|---|
| Finding 1 (narrow rule failure) | fixed: Seen line records 60°N → 1,000 km, stretch 2.00× and it is on stage at reveal |
