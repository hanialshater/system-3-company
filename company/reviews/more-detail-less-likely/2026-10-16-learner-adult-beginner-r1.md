*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: more-detail-less-likely
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows probability as a share of cases; does not know that 'A and B' can never be more likely than 'A', however well B fits the description.
Screenshots seen: yes (artifacts/walkthroughs/more-detail-less-likely/sheet.png, recorded 2026-10-16T12:42:39Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Walkthrough on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end). Ancestry test: the newest commit touching src/demos/<d>/more-detail-less-likely/ is a1e0547, and `git merge-base --is-ancestor a1e0547 bc0edc0` passes; since the newest commit of any kind passes, the newest non-evidence commit (W-1313 reading) passes too. No diff between bc0edc0 and main on the lesson directory. Transcript read cut at the trust-sheet appendix (R1); no build notes in the brief.

1. **Where understanding first broke.** It did not break; it wobbled on vocabulary. The readouts say "OUTER RING: LIBRARIANS" and "INNER RING: WITH A CLUB", but the picture is a rectangle of dots with an outlined strip inside it, not rings. I found the strip by its outline and the matching numbers (100/90, then 200/180). On the locked frame the "OUTER RING" label is cut off at the bottom of the stage. The second slider, "Librarians, of people like Sam", took a moment: I had to work out that it means "of the 1,000 people in the grid who fit Sam's description".

2. **What the prediction felt like.** Too easy for this mind, and the question gives it away. "In this town some librarians run book clubs, some don't" tells me in plain words that the club-runners are a subset, so "Sam is a librarian" is the safe pick. The description ("quiet and loves books") fits a librarian but barely points at a book club, so the conjunction never feels more fitting. I picked the right answer without feeling the pull the lesson's last line talks about ("can feel more convincing"). It is still a choice; it just is not a trap.

3. **Whether the reveal answered the question I actually had.** Yes. My question was "can the club option ever win if I push the club share up?", and the explore told me to push it to the top: 90 of 100, then 180 of 200. The inner count never reached the outer. The slider stops at 90%, so I never saw the equal case (every librarian runs a club), which is the one thing that would make "Equally likely" right. The reveal's "never more likely" is careful enough that this does not mislead.

Notes (do not block a first-time learner):
- "Ring" wording vs rectangular picture, and the clipped label on the locked frame.
- The prediction does not set up the feeling of a fitting detail; if the lesson wants the learner to be caught, the description would have to point at the extra detail.

Verdict reason: no finding blocks a first-time learner; the giveaway wording in the question and the "ring" labels are notes.

