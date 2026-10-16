*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: cut-the-busiest-link
lesson version: v2
boundary: adult beginner: knows what a network of friends looks like and that a "shortest path" is the quickest route; has never met betweenness, edge counts over all pairs, ties split fractionally, or the Girvan-Newman method.
Screenshots seen: yes (artifacts/walkthroughs/cut-the-busiest-link/sheet.png, recorded 2026-10-16T13:36:10.636Z)
Verdict: launch

Run: SO-10-3 batch=SO-10-3 [project:wave-j], board W-1326, r15. Walkthrough `npm run walkthrough -- cut-the-busiest-link --url http://localhost:3591`; shared review server built from 3bf1d341adc9871e1036cfecef083e093660732c (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD` read at start and end, unchanged); R3a check.sh exit 0. Inputs: transcript cut at the trust-sheet appendix, sheet.png. Path walked: option 1 ("12, the same"), Cut busiest (5–6), Reset, tap link 5–6, tap link 3–7, reveal.

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** At the predict frame: what the numbers on the links mean. The question says each bridge is "carrying 12 shortest paths", but on the locked stage the caption is only "Make a prediction to start."; the definition "Number on a link: shortest paths it carries. Tap a link to cut it." appears only after a Reset (step 2). "Shortest paths between whom?" is unanswered until the reveal ("the 24 pairs with one person in each group"). The prediction can still be made by intuition (traffic reroutes), so this is a note, not a block: putting the step-2 caption on the locked stage would fix it.
2. **What the prediction felt like.** Easy. For this mind "cut one of two roads and the other takes all the traffic" makes 24 the obvious answer; "12, the same" and "6" are weak distractors. The surprising part of the stage is what the prediction does not ask: links inside the groups also change (0–3 goes 5 → 12.5, link labels become 7.5, 3.5, 1.5). The stage shows it and the persistent footer names it ("First cut 5–6: 3–7 12 → 24, 0–3 5 → 12.5"), so a learner who looks gets it. Note to the CM: the prediction tests the expected part, the explore carries the unexpected part.
3. **Explore.** Works and reads well on the phone: the cut link turns into a red dashed line with an ✕, the bridge thickens and reads 24, and the button relabels itself to the next busiest link ("Cut busiest (3–7)"), which signposts the repeat step. Fractional labels are explained once ("Each pair counts 1, split evenly over its tied shortest paths."); a beginner accepts the rule without seeing why 0–3 is 12.5 specifically. The second cut splits the network; the nodes recolour into "group of 6" and "group of 4". The reveal stayed on "Try it first" until the split, but the button and the panel ("Then keep cutting the busiest") point at the action needed; not a dead end.
4. **Whether the reveal answered the question the learner actually had.** Yes for the asked question: 6 × 4 = 24 cross pairs, two links at 12 each, then all 24 through one. The learner's natural follow-up ("why did links inside the groups change too?") gets only "and links inside the groups changed too", with no reason (paths that used to reach the far bridge via 5 now go via 0–3). The Girvan–Newman paragraph is a fair one-line naming of what the learner just did ("cuts the busiest link, recounts every link, and repeats") and is earned by the two cuts.
5. **Small point.** After Reset (step 2) the footer still shows the first-cut result. Harmless as a memo, but it describes a state the stage no longer shows.

Verdict reason: launch: no finding blocks a first-time learner; the missing link-number caption on the locked stage (1) and the unexplained in-group change in the reveal (4) are notes for cm-cs.

## After reading build.md / meta.json

Read after the findings above were committed (9be5921): meta.json `learner`, `objective` and `claims` only. build.md, builder notes and rulings not read.

- **Boundary.** meta's learner already knows shortest paths and that a broker between groups carries many of them. For that learner finding 2 is stronger: 24 is the expected answer, and the prediction does not test either `doesNotKnow` item (recount after every cut; cut-and-recount finds communities). Those are carried by explore and reveal instead. Note for cm-cs, not blocking.
- **c5 address.** c5 says "Number on a link: shortest paths it carries." shows before any cut. In the walk it showed after Reset, not on the locked predict frame ("Make a prediction to start."). It probably also shows between commit and the first cut (no frame there). So finding 1 narrows to: the learner answers the question before the stage defines its numbers. Unchanged as a note.
- **c2 vs finding 4.** The claim records the in-group shifts (0–3 5 → 12.5 when 5–6 is cut); the stage footer shows it; the reveal states only "links inside the groups changed too". The objective asks the learner to explain that loads inside the groups shift, and the reveal gives no reason. That is the gap most likely to matter for the objective. Note for cm-cs.
- **c4** (Girvan–Newman description) is unverified on the ledger; the wording on screen matches the claim text.
- **Objective vs experience.** Every element of the objective appears on screen in this walk. This review cannot show that a learner can explain it.
