# Build note: ambulance-pitch-drop

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: top view, slider places the ambulance -80..80 m (20 m steps); rings are sound sent 0.1 s apart from past positions; heard pitch uses the retarded emission time, so beside you it reads 704 Hz, not 700.
- Earned reveal: milestone 'going-away' (any position past you); reveal quotes the highest approach and lowest receding pitch heard. The brief's 'place the listener first' format was not built.
- After screenshots: the 15% bunching was hard to see; added labelled crest gaps (31.8 m ahead, 36.8 m behind).

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise) and 2026-10-13-fact-check.md:

- Options were number pairs a beginner cannot derive (755/652 vs 700/600): options are now qualitative ("stays 700 Hz the whole way" / "starts above 700 Hz, ends below it" / "starts at 700 Hz, then drops below it").
- "Hz" and "crest" never introduced: the predict-state caption says "Each ring is a crest, sent 0.1 s apart. Hz = crests per second." (recorded in new claim c7, unverified).
- Bunching was 31.8 vs 36.8 m with nothing to compare against, so the text did the work: the explore caption now gives the parked baseline ("Gaps: 31.8 m ahead, 36.8 m behind. Parked, they'd be 34.3 m."), and the reveal turns that ratio into the pitch (34.3 / 31.8 = 1.08 times as often, up to 755 Hz). All numbers come from the same constants that draw the rings.
- 755 vs 754 vs 755 (three numbers for one thing; also fact-check route 1): the option no longer quotes a number; the reveal says "you heard 754 Hz" (the reading at 20 m) and "up to 755 Hz" (the limit). c3 reworded to "about 754 Hz", reset to unverified.
- "Head-on" unexplained: the word is gone; the reveal says "up to" / "down to" for the limits.
- Beside-you reading 704 Hz unexplained: the reveal now says it read 704 Hz because that sound left a moment earlier, still approaching.
- "The drop is quick because you stand close" was asserted, not shown: removed. c6 text shortened to the still-air model, reset to unverified.
- Explore path only visited "past you": not changed. The ambulance starts 20 m before you, so the 754 Hz approach reading is on screen from the moment the stage unlocks; the QA path then visits beside (704) and 20 m past (653). Gate stays 'going-away'.
- Hook tension ("the siren never changes"): answered by the crest-spacing ratio above; not reworded.

## v3 (claim fix 2026-10-13)

Pass 4 disputed-claim fix: learner-visible wording and claim rewritten per the fact-check; claim set to unverified, awaiting re-check. See claim source for old/new detail.

## v4 (revision 2026-10-13)

- Review: reveal enabled after one nudge and 754/704 Hz never shown. Fix: readout 'Heard at -20 / 0 / +20 m' fills as visited; two milestones (approach reading seen, going-away reached) gate the reveal; hook no longer states the answer; reveal readings come from the same heard() calls.

## Revision v5 (wave C)

Hook no longer states the effect. Reveal now needs three milestones (approaching at -20 m, beside you, 20 m past), so 754 / 704 / 653 Hz were all shown in the readout. Caption explains rings. c8 reworded, unverified.

## Revision v6

Fact-check c8: locked caption says rings mark sound sent 0.1 ... 0.6 s ago and are not crests (70 crests between rings). Reveal now says 'each ring is sound sent a little earlier', drops the unseen 755 / 652 / 1.08 and shows the beside-you value only if the learner visited it. Locked svg aria-label no longer leaks the Hz. c7, c8 rewritten, unverified.
