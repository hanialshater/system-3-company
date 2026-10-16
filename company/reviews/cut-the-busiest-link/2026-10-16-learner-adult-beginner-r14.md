*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: cut-the-busiest-link
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows what a shortest path in a graph is and that a person between two groups carries many shortest paths; does not know that link loads must be recounted after each cut, has never heard of Girvan-Newman, and has never seen a path count split into halves.
Screenshots seen: yes (artifacts/walkthroughs/cut-the-busiest-link/sheet.png, recorded 2026-10-16T11:19:45Z, phone viewport, option 1 chosen; frame 02-step-1.png opened to check node labels)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Transcript read cut at the trust-sheet appendix (ruling R1); no build notes in the brief.

1. **Where understanding first broke.** Right after the first cut (step 1), in two places at once.
   - **Half paths.** The links now read 12.5, 7.5, 5.5, 4.5, 3.5, 1.5. The stage says the number on a link is the "shortest paths it carries". With what I know, a path is a whole thing; I cannot carry half of one. Nothing on screen says that when two shortest paths tie, each gets half. I stopped trusting the numbers here.
   - **Names I cannot find.** The status line, button and log refer to "5–6", "3–7" and "0–3" ("First cut 5–6: 3–7 12 → 24, 0–3 5 → 12.5"), but the nodes on the picture carry no numbers (checked in 02-step-1.png: plain white circles). I could find 3–7 only because it is the thick link labelled 24; "0–3 5 → 12.5" I could not place at all.

2. **What the prediction felt like.** A fair, quick reasoning step. Two links, 12 each; cut one. "24" is reachable if I think "the same people still need to cross", "12" is the stay-put intuition. I chose 12 and the first cut showed 24 on the other bridge clearly. This part works.

3. **Whether the reveal answered the question I actually had.** For the bridge, yes: "all 24 had to squeeze through the other, so its count doubled". My real follow-up was "why did links inside the left group change, and to fractions?", which the reveal waves at ("links inside the groups changed too") but does not explain. The second idea, "A list ranked once goes stale after every cut", is told, not shown: in this network the original ranking (12, 12, then 5s) would also have cut the other bridge second, so following the stale list gives the same split I got. I never see a case where recounting changes what gets cut, so I have no reason of my own to believe the stale list matters.

Verdict reason: after the first cut the stage shows half-path counts with no explanation, and the text names links by node numbers the picture does not show; together they make the recount (the lesson's point) unreadable to this learner.

## After reading meta.json (claims and learner field; build.md not read)

- c5 records the half-path rule ("a pair with several shortest paths sharing its 1 evenly among them") with the stage as its address, but the walkthrough's stage text never shows the sharing part: the only legend I saw is "Number on a link: shortest paths it carries. Tap a link to cut it." Either the rule appears somewhere the walkthrough did not reach, or c5's address points at text that is not on screen. That is the claim behind my finding 1 (half paths); flag for the fact-checker to confirm where c5's second clause is visible.
- c1 and c2 name links by node numbers (5–6, 3–7, 0–3, 0–5); the stage uses the same names without numbering the nodes, as I found.
- The misconception is "rank the links once, then cut down the list". In this network the once-ranked list (12, 12, then 5s) also cuts the second bridge next and gives the same split, so the lesson refutes "loads stay where they were" (true: 12 → 24 is seen) but not "the once-ranked cutting order fails". The c4 sentence is therefore told, not shown, as finding 3 says.
- I did not read build.md. Verdict unchanged: revise.
