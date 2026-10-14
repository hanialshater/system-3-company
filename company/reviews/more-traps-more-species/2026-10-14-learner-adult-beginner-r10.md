*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): more-traps-more-species
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows estimating a population from a sample; does not know that species found grows ever more slowly with effort, because the common species turn up first and the rare ones last)
Screenshots seen: yes (artifacts/walkthroughs/more-traps-more-species/sheet.png, recorded 2026-10-14T18:57)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "About 200"; tapped Catch 50, Catch 500, Catch 5,000, New forest seed; opened reveal.

1. **The prediction is genuine.** "Ten times the insects" invites "ten times the species" (200). 35 and 20 are the alternatives. Fair.
2. **The species strip is the best part.** A row of boxes from "commonest" to "rarest" fills left to right: after 50 catches the left is solid and the right is gappy; after 5,000 all 40 are filled. That shows "common first, rare last" without words.
3. **The chart hides the idea it is meant to show.** The x-axis is "insects caught (log scale)" (1, 50, 500, 5,000 equally spaced), so the curve rises like a fairly steady ramp from 20 to 34 to 40. The lesson's claim is that discovery "grows ever more slowly"; on a log axis that slowing is flattened away. Read the way a beginner reads a chart, the picture says "steady growth". The numbers (20 → 34 → 40 for 10× steps) carry the idea; the curve does not.
4. **The reveal compares against a number that contradicts the setup.** The question says "Team A catches 50 insects ... and finds 20 species", and my first catch showed 20. After "New forest seed" the 50-catch point became 17, and the reveal says "about twice the 17 at 50". So the reveal's anchor is not the 20 the question gave me.
5. **Possible stage bug (for QA):** after "New forest seed (now 3)" only the 50-catch point changed (20 → 17); the 500 and 5,000 points still read 34 and 40, exactly as on seed 2, and the curve looks the same. Either the new seed did not rerun the catches or the coincidence is very large. A learner who notices will distrust the simulation.
6. "Compare two places only at the same catch size" is a useful takeaway. Trust link "0/6 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Show the curve on a linear catch axis (or add a linear inset) so the flattening is visible.
- Anchor the reveal to the question's 20 at 50, or reset the seed before the reveal so the numbers match.
- Check that "New forest seed" reruns all three catch sizes.

Verdict reason: the strip shows the mechanism, but the main chart flattens the "ever more slowly" idea, the reveal's numbers drift from the question's, and the reseed may not rerun.

## After reading the brief (meta.json)

- doesNotKnow ("grows ever more slowly") is what finding 3 is about; "common first, rare last" is delivered by the strip.
- Fix route: demo-builder; finding 5 to qa-tester.
