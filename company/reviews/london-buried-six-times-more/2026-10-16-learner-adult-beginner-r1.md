*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: london-buried-six-times-more
lesson version: v4
boundary: adult beginner (meta.json learner): knows the Great Plague was bad; does not know how a year's burials compare with a normal year, or that the city's own weekly bills let us see it. Has never heard of Creighton or Campbell.
Screenshots seen: yes (artifacts/walkthroughs/london-buried-six-times-more/sheet.png, recorded 2026-10-16T12:35:02Z; walkthrough against http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Input: transcript cut at "## Appendix: trust sheet" (sed, r2 R1) plus sheet.png. Path: phone, option 1 ("About 30,000"), presets left to right.

1. **Where understanding first broke.** Not at the core. Predict gives 1664 = 15,453 and three options at about 2x, 6x and 20x, so the beginner has a baseline and a real magnitude guess to make. Steps 1-2 land: 1665 jumps to 97,306, labelled "6.3x", and 1666 falls back to 12,738. The first soft spot is step 5, "Christenings that year": the readout says "DEATHS PER CHRISTENING, 1665 9.8", and the reveal turns it into "about 10 deaths for every child christened". The beginner has no normal-year ratio to compare with (no 1664 deaths-per-christening is shown anywhere), and nothing says why christenings matter (a stand-in for births). So 9.8 reads as "a big-sounding number" rather than a comparison. Non-blocking: the lesson's point (6x) is made before this step.
2. **Second soft spot: the axis rescale.** Between step 1 and step 2 the y-axis jumps from 20,000 to 100,000 and every earlier bar, including the 1636 outbreak, shrinks to a sliver. The "6.3x" label carries the comparison, so this works, but a beginner who watches the bars rather than the labels sees "the old bars got smaller" first. The 1636 preset then highlights a bar that is now barely visible (05-step-4, small orange bar near 1636); its readout (10,400 of 23,359, 45%) does the work instead.
3. **What the prediction felt like.** Fair and answerable. "About 30,000" (a doubling) is the natural beginner guess, and being wrong by 3x is a genuine surprise. The citation inside the question ("Creighton, 1965 edition; Campbell") is noise to this learner: two unknown names before the question is even asked.
4. **Whether the reveal answered the question the learner had.** Yes for the asked question (how many: 97,306, 6.3x, 70% plague). The question this learner has next is "why was 1666 *lower* than 1664?" (12,738 vs 15,453). The chart makes the learner notice it, and the reveal repeats it ("back to 12,738") without a word on why, not even a "we can't tell from these records". The "Where it stops" line (recorded deaths and causes, later compilations) is the right caveat and is readable.
5. **Small visual.** In 01-predict a white pill-shaped element is cut off at the bottom edge of the stage, under the preset buttons (likely the readout before it has a value). The step 4 readout is drawn as a larger left-aligned box, unlike the centred pills in the other steps. Neither blocks understanding.

Verdict reason: no finding blocks a first-time learner; the 6x jump is predicted, explored and revealed with a baseline. Notes 1 and 4 (christening ratio without a comparator; 1666 dip left unexplained) are the ones worth fixing next.
