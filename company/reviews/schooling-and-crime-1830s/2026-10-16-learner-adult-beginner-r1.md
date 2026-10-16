*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: schooling-and-crime-1830s
lesson version: v1
boundary: adult beginner (meta.json learner): knows "schooling is said to reduce crime"; does not know the Guerry 1830s pattern. Does not know who Guerry was, what a French "department" is, or what r means.
Screenshots seen: yes (artifacts/walkthroughs/schooling-and-crime-1830s/sheet.png, recorded 2026-10-16T12:35:16Z; walkthrough against http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Input: transcript cut at "## Appendix: trust sheet" (sed, r2 R1) plus sheet.png. Path: phone, option 1 ("In the least literate, about 1.7 times as high"), presets in order.

1. **Where understanding first broke.** Step 4, "All 86 departments". Until then the bars are clear: 11.3 vs 18.9 property crimes per 100,000, "x1.7", and persons 5.9 vs 5.9. The scatter then shows three kinds of dots (filled black, open grey, gold) with no key, two horizontal lines labelled 11.3 and 18.9, one unlabelled outlier near 80 (far above everything else), and "r = 0.37". The beginner can guess black = least literate quarter and gold = most literate, but has to guess; "r = 0.37" means nothing to this mind; and the outlier invites "what is that?" with no answer. This is the one step where the learner is looking at something they cannot read. It comes after the answer is already on screen, so it does not block.
2. **Vocabulary the lesson assumes.** "Guerry's French departments" appears in the question with no gloss for either word. "Department" is never explained (a beginner may think of a government department). The hook says "young men could read"; the bars say "19% literate"/"63% literate"; only the scatter axis says "of conscripts who could read". A beginner reading the bars could think 19% of everyone. The basis (army conscripts) should arrive before the first percentage, not at the last step.
3. **Date mismatch.** Title "1830s"; hook and reveal "1825-30". The learner notices and does not know which is right (a published-in-1830s vs data-from-1825-30 distinction is not stated).
4. **What the prediction felt like.** Good tension. The hook ("did fewer crimes reach court?") primes the "schooling reduces crime" belief this learner holds, and the options are symmetric (1.7x one way, equal, 1.7x the other), so it is purely a direction question. The shared "1.7" in two options gives the magnitude away, which is fine because direction is the point. Being wrong here is the intended surprise and it lands.
5. **Whether the reveal answered the question the learner had.** Mostly. It answers "where were property crimes higher" and adds the persons result. The learner's next question is "so does reading cause theft?", and "Where it stops" answers it directly (cases brought to court, policing, departments not people, correlation alone). The question it leaves open is "why would literate places record *more*?"; "depend on policing as well as crime" is a hint, nothing more. Acceptable for 60 seconds.
6. **Layout.** In 01-predict the second row of preset buttons is cut by the bottom of the stage ("Crimes against / persons" clipped). Seen in literacy-split-france too, so possibly shared, not lesson-specific. The footer shows "Why trust this? (0/7 claims checked)" on every frame: a learner who taps it is told nothing has been checked yet.

Verdict reason: no finding blocks a first-time learner; the direction surprise is set up and resolved by the bars. Finding 1 (unkeyed scatter, r = 0.37) and finding 2 (conscript basis arrives last) are the ones worth fixing next.
