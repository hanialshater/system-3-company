*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: literacy-split-france
lesson version: v1
boundary: adult beginner (meta.json learner): knows France had regional differences; does not know how sharp the 1830s literacy split was. Does not know what a "department" or a "conic equal-area projection" is, or who Guerry was.
Screenshots seen: yes (artifacts/walkthroughs/literacy-split-france/sheet.png, recorded 2026-10-16T12:35:30Z; walkthrough against http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Input: transcript cut at "## Appendix: trust sheet" (sed, r2 R1) plus sheet.png. Path: phone, option 1 ("The south"), presets in order.

1. **Where understanding first broke.** It did not break on the main idea: step 1 outlines the north and east (55%), step 2 the rest (28%), against "All 86: 39%". The map shading makes the split visible before the numbers, which is the lesson's strength. The first friction is text on the stage the beginner cannot use: "Conic equal-area projection; today's outlines" sits on the map from the locked frame on, and "no value in Guerry's table" hatching (south-east border and Corsica-side) has no reason given. The learner wonders why some of France has no value; "today's outlines" in the reveal half-explains it, only at the end.
2. **Legibility (impression only).** The legend ("Conscripts who could read and write, %", 65-74 ... 12-19) and the map labels ("Seine 71%", "Meuse 74%", "Correze 12%") look small at phone width in sheet.png, about the size of the footer link. I did not measure; the computed font size at 390 px is the qa-tester's SO-10-1 check (History ask a). If they come in under 10 px, this becomes a revise finding.
3. **What the prediction felt like.** A guess, not reasoning: this beginner has no basis to choose between regions, so the prediction is a coin toss rather than a belief being tested. The options also do not line up with the split the lesson uses: "The south" and "The west" are both halves of the losing group "South, west and centre", and "The north and east" is the only compound option, which a test-wise reader picks for that reason alone. The hook ("Can one average describe all of France?") is the better question and the prediction does not ask it.
4. **Whether the reveal answered the question the learner had.** Yes for "which part" and "how sharp" (55% vs 28%, extremes Meuse 74% and Correze 12%, "an average of 39% hid two very different Frances"). The Paris (Seine) preset raises a question the reveal never returns to: Seine is 71% but not the top, so what was the learner meant to take from it? The "Where it stops" line (conscripts, not everyone; today's outlines) is clear and useful.
5. **Layout.** In 01-predict the readout row (North and east / South, west, centre / All 86) is cut off at the bottom of the stage. The same clipping appears in schooling-and-crime-1830s, so it may be shared. Footer: "Why trust this? (0/3 claims checked)".

Verdict reason: no finding blocks a first-time learner; the split is shown on the map and stated in the reveal. Finding 3 (options that do not match the lesson's split, with a compound-option cue) is the one worth fixing next; finding 2 turns into revise if QA measures labels under the 10 px floor.
